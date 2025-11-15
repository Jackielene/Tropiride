<?php

use App\Models\Booking;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->foreignId('chat_thread_id')
                ->nullable()
                ->constrained('bookings')
                ->nullOnDelete();
        });

        Booking::orderBy('created_at')
            ->each(function (Booking $booking) {
                if ($booking->chat_thread_id) {
                    return;
                }

                $key = sprintf('%s-%s', $booking->driver_id ?? 'driver', $booking->user_id ?? 'user');

                static $conversationMap = [];

                if ($booking->driver_id && $booking->user_id) {
                    if (!isset($conversationMap[$key])) {
                        $conversationMap[$key] = $booking->id;
                        $booking->chat_thread_id = $booking->id;
                    } else {
                        $booking->chat_thread_id = $conversationMap[$key];
                    }
                } else {
                    $booking->chat_thread_id = $booking->id;
                }

                $booking->save();
            });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropForeign(['chat_thread_id']);
            $table->dropColumn('chat_thread_id');
        });
    }
};

