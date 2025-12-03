<?php

use App\Models\Booking;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Private channel for booking GPS tracking
// Only the customer who made the booking can listen to this channel
Broadcast::channel('booking.{bookingId}', function ($user, $bookingId) {
    $booking = Booking::find($bookingId);
    
    if (!$booking) {
        return false;
    }
    
    // Allow the customer (who made the booking) to listen
    // Also allow the driver (for potential future features)
    return $user->id === $booking->user_id || $user->id === $booking->driver_id;
});

