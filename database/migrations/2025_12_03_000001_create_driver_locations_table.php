<?php

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
        Schema::create('driver_locations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('driver_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('booking_id')->nullable()->constrained('bookings')->onDelete('cascade');
            $table->decimal('latitude', 10, 8);
            $table->decimal('longitude', 11, 8);
            $table->decimal('heading', 5, 2)->nullable(); // Direction in degrees (0-360)
            $table->decimal('speed', 6, 2)->nullable(); // Speed in km/h
            $table->decimal('accuracy', 8, 2)->nullable(); // GPS accuracy in meters
            $table->boolean('is_active')->default(true); // Whether driver is actively tracking
            $table->timestamps();
            
            // Index for fast lookups
            $table->index(['driver_id', 'is_active']);
            $table->index(['booking_id', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('driver_locations');
    }
};

