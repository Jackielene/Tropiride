<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DriverLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'driver_id',
        'booking_id',
        'latitude',
        'longitude',
        'heading',
        'speed',
        'accuracy',
        'is_active',
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'heading' => 'decimal:2',
        'speed' => 'decimal:2',
        'accuracy' => 'decimal:2',
        'is_active' => 'boolean',
    ];

    public function driver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'driver_id');
    }

    public function booking(): BelongsTo
    {
        return $this->belongsTo(Booking::class);
    }

    /**
     * Get the latest active location for a driver
     */
    public static function getActiveLocation(int $driverId): ?self
    {
        return self::where('driver_id', $driverId)
            ->where('is_active', true)
            ->latest()
            ->first();
    }

    /**
     * Get the latest location for a specific booking
     */
    public static function getLocationForBooking(int $bookingId): ?self
    {
        return self::where('booking_id', $bookingId)
            ->where('is_active', true)
            ->latest()
            ->first();
    }
}

