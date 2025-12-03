<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class DriverLocationUpdated implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public int $bookingId;
    public int $driverId;
    public float $latitude;
    public float $longitude;
    public ?float $heading;
    public ?float $speed;
    public ?float $accuracy;
    public string $updatedAt;

    /**
     * Create a new event instance.
     */
    public function __construct(
        int $bookingId,
        int $driverId,
        float $latitude,
        float $longitude,
        ?float $heading = null,
        ?float $speed = null,
        ?float $accuracy = null
    ) {
        $this->bookingId = $bookingId;
        $this->driverId = $driverId;
        $this->latitude = $latitude;
        $this->longitude = $longitude;
        $this->heading = $heading;
        $this->speed = $speed;
        $this->accuracy = $accuracy;
        $this->updatedAt = now()->toIso8601String();
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        // Private channel so only the customer of this booking can listen
        return [
            new PrivateChannel('booking.' . $this->bookingId),
        ];
    }

    /**
     * The event's broadcast name.
     */
    public function broadcastAs(): string
    {
        return 'location.updated';
    }

    /**
     * Get the data to broadcast.
     *
     * @return array<string, mixed>
     */
    public function broadcastWith(): array
    {
        return [
            'booking_id' => $this->bookingId,
            'driver_id' => $this->driverId,
            'location' => [
                'latitude' => $this->latitude,
                'longitude' => $this->longitude,
                'heading' => $this->heading,
                'speed' => $this->speed,
                'accuracy' => $this->accuracy,
                'updated_at' => $this->updatedAt,
            ],
        ];
    }
}
