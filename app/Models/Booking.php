<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'tourist_id',
        'driver_id',
        'vehicle_id',
        'pickup_location',
        'pickup_lat',
        'pickup_lng',
        'dropoff_location',
        'dropoff_lat',
        'dropoff_lng',
        'estimated_fare',
        'distance_km',
        'estimated_time_minutes',
        'status',
        'requested_at',
        'pickup_date',
        'return_date',
        'pickup_time',
        'return_time',
        'passengers',
        'vehicle_type',
        'payment_method',
        'payment_status',
        'notes',
        'special_requests',
        'total_amount',
    ];

    protected $casts = [
        'pickup_lat' => 'decimal:8',
        'pickup_lng' => 'decimal:8',
        'dropoff_lat' => 'decimal:8',
        'dropoff_lng' => 'decimal:8',
        'estimated_fare' => 'decimal:2',
        'distance_km' => 'decimal:2',
        'estimated_time_minutes' => 'integer',
        'requested_at' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}

