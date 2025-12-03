<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class DriverDashboardController extends Controller
{
    /**
     * Display the driver dashboard.
     */
    public function index(): Response
    {
        try {
            $driver = auth()->user();
            $assignedBookings = $this->getAssignedBookings($driver);
            $availableBookings = $driver->isVerified() ? $this->getAvailableBookings() : collect([]);
            
            // Calculate driver statistics
            $totalRides = $assignedBookings->count();
            $completedRides = $assignedBookings->where('status', 'completed')->count();
            $pendingRides = $assignedBookings->where('status', 'pending')->count();
            $cancelledRides = $assignedBookings->where('status', 'cancelled')->count();
            
            // Calculate earnings
            $totalEarnings = $assignedBookings
                ->where('status', 'completed')
                ->sum(function ($booking) {
                    return $booking['total_amount'] ?? $booking['estimated_fare'] ?? 0;
                });
            
            $todayEarnings = $assignedBookings
                ->where('status', 'completed')
                ->filter(function ($booking) {
                    return \Carbon\Carbon::parse($booking['created_at'])->isToday();
                })
                ->sum(function ($booking) {
                    return $booking['total_amount'] ?? $booking['estimated_fare'] ?? 0;
                });
            
            return Inertia::render('driver/dashboard', [
                'stats' => [
                    'totalRides' => $totalRides,
                    'completedRides' => $completedRides,
                    'pendingRides' => $pendingRides,
                    'cancelledRides' => $cancelledRides,
                    'totalEarnings' => round($totalEarnings, 2),
                    'todayEarnings' => round($todayEarnings, 2),
                    'availableRides' => $driver->isVerified() ? $availableBookings->count() : 0,
                ],
                'assignedBookings' => $assignedBookings,
                'availableBookings' => $availableBookings,
                'driver' => [
                    'id' => $driver->id,
                    'name' => $driver->name,
                    'email' => $driver->email,
                    'phone' => $driver->phone,
                    'age' => $driver->age,
                    'address' => $driver->address,
                    'avatar' => $driver->avatar,
                    'avatar_url' => $driver->avatar_url,
                    'profile_completed' => $driver->profile_completed,
                    'verification_status' => $driver->verification_status,
                    'driver_license_front' => $driver->driver_license_front,
                    'driver_license_back' => $driver->driver_license_back,
                    'driver_license_front_url' => $driver->driver_license_front_url,
                    'driver_license_back_url' => $driver->driver_license_back_url,
                    'verified_at' => $driver->verified_at?->toISOString(),
                    'rejection_reason' => $driver->rejection_reason,
                    'is_profile_ready' => $driver->isProfileReadyForVerification(),
                    'is_verified' => $driver->isVerified(),
                    'has_completed_profile' => $driver->hasCompletedProfile(),
                    'is_verification_pending' => $driver->isVerificationPending(),
                    'is_verification_rejected' => $driver->isVerificationRejected(),
                ],
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Driver Dashboard Error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            
            // Return a simplified error view
            return Inertia::render('driver/dashboard', [
                'error' => 'An error occurred while loading the dashboard. Please check the logs.',
                'stats' => [
                    'totalRides' => 0,
                    'completedRides' => 0,
                    'pendingRides' => 0,
                    'cancelledRides' => 0,
                    'totalEarnings' => 0,
                    'todayEarnings' => 0,
                    'availableRides' => 0,
                ],
                'assignedBookings' => [],
                'availableBookings' => [],
                'driver' => [
                    'id' => auth()->id(),
                    'name' => auth()->user()->name,
                    'email' => auth()->user()->email,
                    'phone' => auth()->user()->phone,
                    'age' => auth()->user()->age,
                    'address' => auth()->user()->address,
                    'avatar' => auth()->user()->avatar,
                    'avatar_url' => auth()->user()->avatar_url ?? null,
                    'profile_completed' => auth()->user()->profile_completed ?? false,
                    'verification_status' => auth()->user()->verification_status ?? 'pending',
                    'driver_license_front' => auth()->user()->driver_license_front,
                    'driver_license_back' => auth()->user()->driver_license_back,
                    'driver_license_front_url' => auth()->user()->driver_license_front_url,
                    'driver_license_back_url' => auth()->user()->driver_license_back_url,
                    'verified_at' => auth()->user()->verified_at?->toISOString(),
                    'rejection_reason' => auth()->user()->rejection_reason,
                    'is_profile_ready' => auth()->user()->isProfileReadyForVerification(),
                    'is_verified' => auth()->user()->isVerified(),
                    'has_completed_profile' => auth()->user()->hasCompletedProfile(),
                    'is_verification_pending' => auth()->user()->isVerificationPending(),
                    'is_verification_rejected' => auth()->user()->isVerificationRejected(),
                ],
            ]);
        }
    }
    
    /**
     * Accept an available booking
     */
    public function acceptBooking(Request $request, $bookingId)
    {
        $driver = auth()->user();
        
        \Log::info('Accept Booking Started', [
            'booking_id' => $bookingId,
            'driver_id' => $driver->id,
            'driver_name' => $driver->name,
        ]);

        try {
            $booking = Booking::findOrFail($bookingId);
            
            \Log::info('Booking Found', [
                'booking_id' => $booking->id,
                'current_driver_id' => $booking->driver_id,
                'status' => $booking->status,
            ]);

            if ($booking->driver_id !== null) {
                \Log::warning('Booking already assigned', ['booking_id' => $bookingId]);
                return redirect()->route('driver.dashboard')
                    ->with('error', 'This booking has already been assigned to another driver.');
            }

            if ($booking->status !== 'pending') {
                \Log::warning('Booking not pending', ['booking_id' => $bookingId, 'status' => $booking->status]);
                return redirect()->route('driver.dashboard')
                    ->with('error', 'This booking is no longer available.');
            }

            // Assign the driver
            $booking->driver_id = $driver->id;
            $booking->save();
            
            \Log::info('Booking Saved', [
                'booking_id' => $booking->id,
                'new_driver_id' => $booking->driver_id,
            ]);

            // Refresh from DB to confirm
            $booking->refresh();
            
            \Log::info('Booking After Refresh', [
                'booking_id' => $booking->id,
                'driver_id' => $booking->driver_id,
            ]);

            // Handle chat thread
            $existingThread = Booking::where('user_id', $booking->user_id)
                ->where('driver_id', $driver->id)
                ->where('id', '!=', $booking->id)
                ->orderBy('created_at')
                ->first();

            if ($existingThread) {
                $booking->chat_thread_id = $existingThread->chat_thread_id ?? $existingThread->id;
            } else if (!$booking->chat_thread_id) {
                $booking->chat_thread_id = $booking->id;
            }
            $booking->save();

            // Send acceptance message
            $chatBooking = $booking->chat_thread_id === $booking->id
                ? $booking
                : Booking::find($booking->chat_thread_id) ?? $booking;

            $this->sendAcceptanceMessage($chatBooking, $driver, $booking);

            \Log::info('Accept Booking Complete', [
                'booking_id' => $booking->id,
                'driver_id' => $booking->driver_id,
            ]);

            return redirect()->route('driver.dashboard')
                ->with('success', 'Booking accepted successfully! You can now see it in your assigned rides.');
                
        } catch (\Exception $e) {
            \Log::error('Accept Booking Error', [
                'booking_id' => $bookingId,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            return redirect()->route('driver.dashboard')
                ->with('error', 'Failed to accept booking: ' . $e->getMessage());
        }
    }
    
    /**
     * Update booking status
     */
    public function updateBookingStatus(Request $request, $bookingId)
    {
        try {
            $validated = $request->validate([
                'status' => 'required|in:pending,in_progress,completed,cancelled'
            ]);
            
            $booking = Booking::findOrFail($bookingId);
            
            // Ensure this booking is assigned to the current driver
            if ($booking->driver_id !== auth()->id()) {
                abort(403, 'You are not authorized to update this booking.');
            }
            
            $booking->status = $validated['status'];
            $booking->save();
            
            return back()->with('success', 'Booking status updated successfully.');
        } catch (\Exception $e) {
            \Log::error('Update Booking Status Error: ' . $e->getMessage());
            return back()->with('error', 'Failed to update booking status. Please try again.');
        }
    }
    public function rides(): Response
    {
        $driver = auth()->user();

        return Inertia::render('driver/rides', [
            'assignedBookings' => $this->getAssignedBookings($driver),
            'driver' => [
                'id' => $driver->id,
                'name' => $driver->name,
            ],
        ]);
    }

    protected function getAssignedBookings(User $driver): Collection
    {
        return Booking::with('user:id,name,email,phone')
            ->where('driver_id', $driver->id)
            ->orderBy('created_at', 'desc')
            ->get([
                'id',
                'user_id',
                'driver_id',
                'pickup_location',
                'dropoff_location',
                'pickup_lat',
                'pickup_lng',
                'dropoff_lat',
                'dropoff_lng',
                'status',
                'estimated_fare',
                'total_amount',
                'distance_km',
                'created_at',
                'updated_at',
                'requested_at',
                'pickup_date',
                'pickup_time',
                'return_date',
                'return_time',
                'passengers',
                'vehicle_type',
                'payment_status',
                'notes',
                'special_requests'
            ])
            ->map(function ($booking) {
                return [
                    'id' => $booking->id,
                    'user_id' => $booking->user_id,
                    'driver_id' => $booking->driver_id,
                    'customer' => $booking->user ? [
                        'id' => $booking->user->id,
                        'name' => $booking->user->name,
                        'email' => $booking->user->email,
                        'phone' => $booking->user->phone ?? 'Not provided',
                    ] : null,
                    'pickup_location' => $booking->pickup_location,
                    'dropoff_location' => $booking->dropoff_location,
                    'pickup_lat' => $booking->pickup_lat,
                    'pickup_lng' => $booking->pickup_lng,
                    'dropoff_lat' => $booking->dropoff_lat,
                    'dropoff_lng' => $booking->dropoff_lng,
                    'status' => $booking->status,
                    'estimated_fare' => $booking->estimated_fare,
                    'total_amount' => $booking->total_amount,
                    'distance_km' => $booking->distance_km,
                    'created_at' => $booking->created_at->toISOString(),
                    'updated_at' => $booking->updated_at->toISOString(),
                    'requested_at' => $booking->requested_at ? $booking->requested_at->toISOString() : null,
                    'pickup_date' => $booking->pickup_date,
                    'pickup_time' => $booking->pickup_time,
                    'return_date' => $booking->return_date,
                    'return_time' => $booking->return_time,
                    'passengers' => $booking->passengers,
                    'vehicle_type' => $booking->vehicle_type,
                    'payment_status' => $booking->payment_status,
                    'notes' => $booking->notes,
                    'special_requests' => $booking->special_requests,
                ];
            });
    }

    protected function getAvailableBookings(): Collection
    {
        return Booking::with('user:id,name,email,phone')
            ->where('status', 'pending')
            ->whereNull('driver_id')
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get([
                'id',
                'user_id',
                'pickup_location',
                'dropoff_location',
                'pickup_lat',
                'pickup_lng',
                'dropoff_lat',
                'dropoff_lng',
                'status',
                'estimated_fare',
                'total_amount',
                'distance_km',
                'created_at',
                'pickup_date',
                'pickup_time',
                'passengers',
                'vehicle_type',
            ])
            ->map(function ($booking) {
                return [
                    'id' => $booking->id,
                    'user_id' => $booking->user_id,
                    'customer' => $booking->user ? [
                        'id' => $booking->user->id,
                        'name' => $booking->user->name,
                        'email' => $booking->user->email,
                        'phone' => $booking->user->phone ?? 'Not provided',
                    ] : null,
                    'pickup_location' => $booking->pickup_location,
                    'dropoff_location' => $booking->dropoff_location,
                    'pickup_lat' => $booking->pickup_lat,
                    'pickup_lng' => $booking->pickup_lng,
                    'dropoff_lat' => $booking->dropoff_lat,
                    'dropoff_lng' => $booking->dropoff_lng,
                    'status' => $booking->status,
                    'estimated_fare' => $booking->estimated_fare,
                    'total_amount' => $booking->total_amount,
                    'distance_km' => $booking->distance_km,
                    'created_at' => $booking->created_at->toISOString(),
                    'pickup_date' => $booking->pickup_date,
                    'pickup_time' => $booking->pickup_time,
                    'passengers' => $booking->passengers,
                    'vehicle_type' => $booking->vehicle_type,
                ];
            });
    }

    protected function sendAcceptanceMessage(Booking $chatBooking, User $driver, ?Booking $currentBooking = null): void
    {
        $chatBooking->loadMissing('user');

        $customerName = $chatBooking->user?->name ?? 'there';
        $ageText = $driver->age ? "{$driver->age} years old" : 'not specified';
        $addressText = $driver->address ?: 'not specified';
        $bookingRef = $currentBooking ?? $chatBooking;
        $routeDetails = $bookingRef->pickup_location && $bookingRef->dropoff_location
            ? "Pickup: {$bookingRef->pickup_location} → Drop-off: {$bookingRef->dropoff_location}."
            : '';

        $messageBody = sprintf(
            'Hello %s, I\'m %s and I just accepted your latest Tropiride ride request (Booking #%s). I will be your driver for this trip. Here are my details — Age: %s, Address: %s. %s Feel free to message me here if you have special instructions or questions.',
            $customerName,
            $driver->name,
            $bookingRef->id,
            $ageText,
            $addressText,
            $routeDetails
        );

        $chatBooking->chatMessages()->create([
            'sender_id' => $driver->id,
            'sender_role' => 'driver',
            'message' => $messageBody,
            'is_system' => true,
        ]);
    }
}

