<?php

namespace App\Http\Controllers;

use App\Events\DriverLocationUpdated;
use App\Models\Booking;
use App\Models\DriverLocation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GpsTrackingController extends Controller
{
    /**
     * Update driver's location (called by driver's device)
     */
    public function updateLocation(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->isDriver()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        $validated = $request->validate([
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'heading' => 'nullable|numeric|between:0,360',
            'speed' => 'nullable|numeric|min:0',
            'accuracy' => 'nullable|numeric|min:0',
            'booking_id' => 'nullable|exists:bookings,id',
        ]);

        // If booking_id is provided, verify the driver is assigned to this booking
        if (isset($validated['booking_id'])) {
            $booking = Booking::find($validated['booking_id']);
            if (!$booking || $booking->driver_id !== $user->id) {
                return response()->json(['error' => 'Invalid booking'], 400);
            }
        }

        // Deactivate previous locations for this driver
        DriverLocation::where('driver_id', $user->id)
            ->where('is_active', true)
            ->update(['is_active' => false]);

        // Create new location record
        $location = DriverLocation::create([
            'driver_id' => $user->id,
            'booking_id' => $validated['booking_id'] ?? null,
            'latitude' => $validated['latitude'],
            'longitude' => $validated['longitude'],
            'heading' => $validated['heading'] ?? null,
            'speed' => $validated['speed'] ?? null,
            'accuracy' => $validated['accuracy'] ?? null,
            'is_active' => true,
        ]);

        // Broadcast the location update via WebSocket for real-time tracking
        if (isset($validated['booking_id'])) {
            broadcast(new DriverLocationUpdated(
                bookingId: $validated['booking_id'],
                driverId: $user->id,
                latitude: (float) $validated['latitude'],
                longitude: (float) $validated['longitude'],
                heading: isset($validated['heading']) ? (float) $validated['heading'] : null,
                speed: isset($validated['speed']) ? (float) $validated['speed'] : null,
                accuracy: isset($validated['accuracy']) ? (float) $validated['accuracy'] : null,
            ))->toOthers();
        }

        return response()->json([
            'success' => true,
            'location' => [
                'id' => $location->id,
                'latitude' => $location->latitude,
                'longitude' => $location->longitude,
                'heading' => $location->heading,
                'speed' => $location->speed,
                'updated_at' => $location->updated_at->toIso8601String(),
            ],
        ]);
    }

    /**
     * Stop tracking (driver is no longer active)
     */
    public function stopTracking(Request $request): JsonResponse
    {
        $user = $request->user();
        
        if (!$user->isDriver()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Deactivate all locations for this driver
        DriverLocation::where('driver_id', $user->id)
            ->where('is_active', true)
            ->update(['is_active' => false]);

        return response()->json(['success' => true]);
    }

    /**
     * Get driver's location for a specific booking (called by customer)
     */
    public function getDriverLocation(Request $request, Booking $booking): JsonResponse
    {
        $user = $request->user();

        // Verify the user is the customer for this booking
        if ($booking->user_id !== $user->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Only show location for accepted/in_progress bookings
        if (!in_array($booking->status, ['accepted', 'in_progress'])) {
            return response()->json([
                'success' => false,
                'message' => 'Driver location not available for this booking status',
            ]);
        }

        // Check if there's a driver assigned
        if (!$booking->driver_id) {
            return response()->json([
                'success' => false,
                'message' => 'No driver assigned to this booking yet',
            ]);
        }

        // Get the driver's latest active location
        $location = DriverLocation::where('driver_id', $booking->driver_id)
            ->where('is_active', true)
            ->latest()
            ->first();

        if (!$location) {
            return response()->json([
                'success' => false,
                'message' => 'Driver location not available',
            ]);
        }

        // Load driver info
        $driver = $booking->driver;

        return response()->json([
            'success' => true,
            'location' => [
                'latitude' => (float) $location->latitude,
                'longitude' => (float) $location->longitude,
                'heading' => $location->heading ? (float) $location->heading : null,
                'speed' => $location->speed ? (float) $location->speed : null,
                'accuracy' => $location->accuracy ? (float) $location->accuracy : null,
                'updated_at' => $location->updated_at->toIso8601String(),
            ],
            'driver' => [
                'id' => $driver->id,
                'name' => $driver->name,
                'phone' => $driver->phone,
                'avatar_url' => $driver->avatar_url,
            ],
            'booking' => [
                'id' => $booking->id,
                'status' => $booking->status,
                'pickup_location' => $booking->pickup_location,
                'pickup_lat' => (float) $booking->pickup_lat,
                'pickup_lng' => (float) $booking->pickup_lng,
                'dropoff_location' => $booking->dropoff_location,
                'dropoff_lat' => (float) $booking->dropoff_lat,
                'dropoff_lng' => (float) $booking->dropoff_lng,
                'vehicle_type' => $booking->vehicle_type,
            ],
        ]);
    }

    /**
     * Customer tracking page - shows map with driver location
     */
    public function trackingPage(Request $request, Booking $booking): Response
    {
        $user = $request->user();

        // Verify the user is the customer for this booking
        if ($booking->user_id !== $user->id) {
            abort(403, 'Unauthorized');
        }

        // Load relationships
        $booking->load(['driver:id,name,phone,avatar', 'user:id,name,phone']);

        return Inertia::render('tropiride/tracking', [
            'booking' => [
                'id' => $booking->id,
                'status' => $booking->status,
                'pickup_location' => $booking->pickup_location,
                'pickup_lat' => $booking->pickup_lat,
                'pickup_lng' => $booking->pickup_lng,
                'dropoff_location' => $booking->dropoff_location,
                'dropoff_lat' => $booking->dropoff_lat,
                'dropoff_lng' => $booking->dropoff_lng,
                'vehicle_type' => $booking->vehicle_type,
                'estimated_fare' => $booking->estimated_fare,
                'driver' => $booking->driver ? [
                    'id' => $booking->driver->id,
                    'name' => $booking->driver->name,
                    'phone' => $booking->driver->phone,
                    'avatar_url' => $booking->driver->avatar_url,
                ] : null,
            ],
        ]);
    }
}

