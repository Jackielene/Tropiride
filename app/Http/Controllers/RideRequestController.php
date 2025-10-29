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
        
        // Set pickup_date and return_date from validated data
        if (isset($validated['pickup_date']) && $validated['pickup_date']) {
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
        if (isset($validated['return_date']) && $validated['return_date']) {
            // Handle both formats: "2025-10-28 14:30" or "2025-10-28"
            $returnDateTime = $validated['return_date'];
            if (strpos($returnDateTime, ' ') !== false) {
                // Has time component
                list($date, $time) = explode(' ', $returnDateTime);
                $bookingData['return_date'] = $date;
            } else {
                // Date only
                $bookingData['return_date'] = $returnDateTime;
            }
        }
        
        // Set total_amount to estimated_fare if it exists
        if (Schema::hasColumn('bookings', 'total_amount')) {
            $bookingData['total_amount'] = $validated['estimated_fare'];
        }
        
        // Set other optional fields to null if they exist
        $optionalFields = [
            'pickup_time',
            'passengers',
            'payment_method',
            'payment_status',
            'notes',
            'special_requests',
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

