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
        if (Schema::hasTable('bookings')) {
            Schema::table('bookings', function (Blueprint $table) {
                // Make vehicle_id nullable if it exists
                if (Schema::hasColumn('bookings', 'vehicle_id')) {
                    // Change vehicle_id to nullable
                    $table->unsignedBigInteger('vehicle_id')->nullable()->change();
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Optionally handle rollback if needed
    }
};

