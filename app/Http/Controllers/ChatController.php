<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChatController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        abort_unless($user->isCustomer(), 403);

        return Inertia::render('tropiride/messages', $this->buildChatPayload($user));
    }

    public function driverIndex(Request $request): Response
    {
        $user = $request->user();
        abort_unless($user->isDriver(), 403);

        return Inertia::render('driver/messages', $this->buildChatPayload($user));
    }

    public function messages(Request $request, Booking $booking): JsonResponse
    {
        $this->authorizeBookingAccess($booking, $request->user());

        $chatBooking = $this->resolveChatBooking($booking);

        $messages = $chatBooking->chatMessages()
            ->with('sender:id,name,avatar')
            ->orderBy('created_at')
            ->get()
            ->map(fn($message) => [
                'id' => $message->id,
                'message' => $message->message,
                'sender_role' => $message->sender_role,
                'sender_name' => $message->sender?->name ?? 'System',
                'sender_id' => $message->sender_id,
                'is_system' => $message->is_system,
                'created_at' => $message->created_at?->toIso8601String(),
            ]);

        return response()->json([
            'messages' => $messages,
        ]);
    }

    public function store(Request $request, Booking $booking): JsonResponse
    {
        $this->authorizeBookingAccess($booking, $request->user());
        $chatBooking = $this->resolveChatBooking($booking);

        $validated = $request->validate([
            'message' => 'required|string|max:1000',
        ]);

        $message = $chatBooking->chatMessages()->create([
            'sender_id' => $request->user()->id,
            'sender_role' => $request->user()->isDriver() ? 'driver' : 'customer',
            'message' => $validated['message'],
            'is_system' => false,
        ]);

        $message->load('sender:id,name,avatar');

        return response()->json([
            'message' => [
                'id' => $message->id,
                'message' => $message->message,
                'sender_role' => $message->sender_role,
                'sender_name' => $message->sender?->name ?? 'System',
                'sender_id' => $message->sender_id,
                'is_system' => $message->is_system,
                'created_at' => $message->created_at?->toIso8601String(),
            ],
        ]);
    }

    protected function authorizeBookingAccess(Booking $booking, $user): void
    {
        if ($booking->user_id !== $user->id && $booking->driver_id !== $user->id) {
            abort(403, 'You are not allowed to access this chat.');
        }
    }

    protected function buildChatPayload(User $user): array
    {
        $bookings = Booking::with([
                'user:id,name,email,phone,avatar',
                'driver:id,name,email,phone,age,address,avatar',
            ])
            ->whereNotNull('driver_id')
            ->when($user->isDriver(), fn($query) => $query->where('driver_id', $user->id))
            ->when($user->isCustomer(), fn($query) => $query->where('user_id', $user->id))
            ->orderByDesc('updated_at')
            ->get();

        $conversations = $bookings
            ->groupBy(fn(Booking $booking) => sprintf('%s-%s', $booking->driver_id, $booking->user_id))
            ->map(function ($group) {
                /** @var \Illuminate\Support\Collection<int, Booking> $group */
                $latest = $group->sortByDesc('updated_at')->first();
                $chatBooking = $this->resolveChatBooking($group->first());

                return [
                    'chat_booking_id' => $chatBooking->id,
                    'latest_booking_id' => $latest->id,
                    'pickup_location' => $latest->pickup_location,
                    'dropoff_location' => $latest->dropoff_location,
                    'status' => $latest->status,
                    'vehicle_type' => $latest->vehicle_type,
                    'passengers' => $latest->passengers,
                    'driver' => $latest->driver ? [
                        'id' => $latest->driver->id,
                        'name' => $latest->driver->name,
                        'age' => $latest->driver->age,
                        'address' => $latest->driver->address,
                        'phone' => $latest->driver->phone,
                        'avatar_url' => $latest->driver->avatar_url,
                    ] : null,
                    'customer' => $latest->user ? [
                        'id' => $latest->user->id,
                        'name' => $latest->user->name,
                        'phone' => $latest->user->phone,
                        'avatar_url' => $latest->user->avatar_url,
                    ] : null,
                    'base_booking_id' => $chatBooking->id,
                ];
            })
            ->values();

        return [
            'bookings' => $conversations,
            'initialBookingId' => $conversations->first()['chat_booking_id'] ?? null,
        ];
    }

    protected function resolveChatBooking(Booking $booking): Booking
    {
        if ($booking->chat_thread_id && $booking->chat_thread_id !== $booking->id) {
            return Booking::findOrFail($booking->chat_thread_id);
        }

        if ($booking->chat_thread_id === null) {
            return $booking;
        }

        return $booking;
    }
}

