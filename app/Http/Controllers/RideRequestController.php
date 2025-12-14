<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

class RideRequestController extends Controller
{
    /**
     * Store a ride request.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'pickup_location' => 'required|string',
            'pickup_lat' => 'nullable|numeric',
            'pickup_lng' => 'nullable|numeric',
            'dropoff_location' => 'required|string',
            'dropoff_lat' => 'nullable|numeric',
            'dropoff_lng' => 'nullable|numeric',
            'estimated_fare' => 'required|numeric',
            'distance_km' => 'required|numeric',
            'estimated_time_minutes' => 'required|integer',
            'pickup_date' => 'nullable|date',
            'return_date' => 'nullable|date|after_or_equal:pickup_date',
            'vehicle_type' => 'nullable|string|in:tricycle,tuktuk,habal-habal,multicab,van',
            'service_type' => 'nullable|string|in:per_day_rental,pickup_dropoff,airport_port_transfer',
            'passengers' => 'nullable|integer|min:1|max:14',
            // Airport/Port transfer fields
            'flight_vessel_number' => 'nullable|string|max:50',
            'terminal_info' => 'nullable|string|max:100',
            'arrival_departure_time' => 'nullable|date_format:H:i',
            'transfer_type' => 'nullable|string|in:arrival,departure',
            // Payment method
            'payment_method' => 'nullable|string|in:paypal,cash',
            'paypal_transaction_id' => 'nullable|string|max:255',
        ], [
            'return_date.after_or_equal' => 'Return date/time must be after or equal to pickup date/time.',
        ]);

        $bookingData = [
            'user_id' => Auth::id(),
            'pickup_location' => $validated['pickup_location'],
            'pickup_lat' => $validated['pickup_lat'] ?? null,
            'pickup_lng' => $validated['pickup_lng'] ?? null,
            'dropoff_location' => $validated['dropoff_location'],
            'dropoff_lat' => $validated['dropoff_lat'] ?? null,
            'dropoff_lng' => $validated['dropoff_lng'] ?? null,
            'estimated_fare' => $validated['estimated_fare'],
            'distance_km' => $validated['distance_km'],
            'estimated_time_minutes' => $validated['estimated_time_minutes'],
            'status' => 'pending',
            'requested_at' => now(),
        ];
        
        // If tourist_id column exists, set it to user_id
        if (Schema::hasColumn('bookings', 'tourist_id')) {
            $bookingData['tourist_id'] = Auth::id();
        }
        
        // driver_id should be null for new ride requests (not yet assigned)
        if (Schema::hasColumn('bookings', 'driver_id')) {
            $bookingData['driver_id'] = null;
        }
        
        // vehicle_id should be null for new ride requests (not yet assigned)
        if (Schema::hasColumn('bookings', 'vehicle_id')) {
            $bookingData['vehicle_id'] = null;
        }
        
        // Set pickup_date and return_date from validated data (only if columns exist)
        if (isset($validated['pickup_date']) && $validated['pickup_date'] && Schema::hasColumn('bookings', 'pickup_date')) {
            // Handle both formats: "2025-10-28 14:30" or "2025-10-28"
            $pickupDateTime = $validated['pickup_date'];
            if (strpos($pickupDateTime, ' ') !== false) {
                // Has time component
                list($date, $time) = explode(' ', $pickupDateTime);
                $bookingData['pickup_date'] = $date;
                if (Schema::hasColumn('bookings', 'pickup_time')) {
                    $bookingData['pickup_time'] = $time;
                }
            } else {
                // Date only
                $bookingData['pickup_date'] = $pickupDateTime;
            }
        }
        if (isset($validated['return_date']) && $validated['return_date'] && Schema::hasColumn('bookings', 'return_date')) {
            // Handle both formats: "2025-10-28 14:30" or "2025-10-28"
            $returnDateTime = $validated['return_date'];
            if (strpos($returnDateTime, ' ') !== false) {
                // Has time component
                list($date, $time) = explode(' ', $returnDateTime);
                $bookingData['return_date'] = $date;
                // Store return time if column exists
                if (Schema::hasColumn('bookings', 'return_time')) {
                    $bookingData['return_time'] = $time;
                }
            } else {
                // Date only
                $bookingData['return_date'] = $returnDateTime;
            }
        }
        
        // Set total_amount to estimated_fare if it exists
        if (Schema::hasColumn('bookings', 'total_amount')) {
            $bookingData['total_amount'] = $validated['estimated_fare'];
        }
        
        // Set vehicle_type if provided and column exists
        if (isset($validated['vehicle_type']) && Schema::hasColumn('bookings', 'vehicle_type')) {
            $bookingData['vehicle_type'] = $validated['vehicle_type'];
        }
        
        // Set service_type if provided and column exists
        if (isset($validated['service_type']) && Schema::hasColumn('bookings', 'service_type')) {
            $bookingData['service_type'] = $validated['service_type'];
        }
        
        // Set passengers if provided and column exists
        if (isset($validated['passengers']) && Schema::hasColumn('bookings', 'passengers')) {
            $bookingData['passengers'] = $validated['passengers'];
        }
        
        // Set airport/port transfer fields if provided and columns exist
        if (isset($validated['flight_vessel_number']) && Schema::hasColumn('bookings', 'flight_vessel_number')) {
            $bookingData['flight_vessel_number'] = $validated['flight_vessel_number'];
        }
        if (isset($validated['terminal_info']) && Schema::hasColumn('bookings', 'terminal_info')) {
            $bookingData['terminal_info'] = $validated['terminal_info'];
        }
        if (isset($validated['arrival_departure_time']) && Schema::hasColumn('bookings', 'arrival_departure_time')) {
            $bookingData['arrival_departure_time'] = $validated['arrival_departure_time'];
        }
        if (isset($validated['transfer_type']) && Schema::hasColumn('bookings', 'transfer_type')) {
            $bookingData['transfer_type'] = $validated['transfer_type'];
        }
        
        // Set payment_method if provided and column exists
        if (isset($validated['payment_method']) && Schema::hasColumn('bookings', 'payment_method')) {
            $bookingData['payment_method'] = $validated['payment_method'];
        }
        
        // Set paypal_transaction_id if provided and column exists
        if (isset($validated['paypal_transaction_id']) && Schema::hasColumn('bookings', 'paypal_transaction_id')) {
            $bookingData['paypal_transaction_id'] = $validated['paypal_transaction_id'];
            // If paid via PayPal, set payment_status to 'paid'
            if (Schema::hasColumn('bookings', 'payment_status')) {
                $bookingData['payment_status'] = 'paid';
            }
        }
        
        // Set other optional fields to null if they exist
        $optionalFields = [
            'pickup_time',
            'passengers',
            'vehicle_type',
            'service_type',
            'payment_method',
            'payment_status',
            'paypal_transaction_id',
            'notes',
            'special_requests',
            'flight_vessel_number',
            'terminal_info',
            'arrival_departure_time',
            'transfer_type',
        ];
        
        foreach ($optionalFields as $field) {
            if (Schema::hasColumn('bookings', $field) && !isset($bookingData[$field])) {
                $bookingData[$field] = null;
            }
        }
        
        $booking = Booking::create($bookingData);

        return back()->with('status', 'Ride request sent successfully! Check your profile to view booking details.');
    }

    /**
     * Get user's bookings.
     */
    public function index(Request $request)
    {
        $bookings = Booking::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'bookings' => $bookings
        ]);
    }

    /**
     * Cancel a booking.
     */
    public function cancel(Request $request, $id)
    {
        $booking = Booking::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        // Check if booking can be cancelled
        if (in_array($booking->status, ['completed', 'cancelled'])) {
            return back()->with('error', 'This booking cannot be cancelled.');
        }

        // Update booking status to cancelled
        $booking->status = 'cancelled';
        $booking->save();

        return back()->with('status', 'Booking cancelled successfully.');
    }
}

