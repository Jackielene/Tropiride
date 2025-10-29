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
                // Check and add all missing columns
                if (!Schema::hasColumn('bookings', 'pickup_location')) {
                    $table->string('pickup_location')->after('user_id');
                }
                if (!Schema::hasColumn('bookings', 'pickup_lat')) {
                    $table->decimal('pickup_lat', 10, 8)->nullable()->after('pickup_location');
                }
                if (!Schema::hasColumn('bookings', 'pickup_lng')) {
                    $table->decimal('pickup_lng', 11, 8)->nullable()->after('pickup_lat');
                }
                if (!Schema::hasColumn('bookings', 'dropoff_location')) {
                    $table->string('dropoff_location')->after('pickup_lng');
                }
                if (!Schema::hasColumn('bookings', 'dropoff_lat')) {
                    $table->decimal('dropoff_lat', 10, 8)->nullable()->after('dropoff_location');
                }
                if (!Schema::hasColumn('bookings', 'dropoff_lng')) {
                    $table->decimal('dropoff_lng', 11, 8)->nullable()->after('dropoff_lat');
                }
                if (!Schema::hasColumn('bookings', 'estimated_fare')) {
                    $table->decimal('estimated_fare', 10, 2)->after('dropoff_lng');
                }
                if (!Schema::hasColumn('bookings', 'distance_km')) {
                    $table->decimal('distance_km', 8, 2)->after('estimated_fare');
                }
                if (!Schema::hasColumn('bookings', 'estimated_time_minutes')) {
                    $table->integer('estimated_time_minutes')->after('distance_km');
                }
                if (!Schema::hasColumn('bookings', 'status')) {
                    $table->string('status')->default('pending')->after('estimated_time_minutes');
                }
                if (!Schema::hasColumn('bookings', 'requested_at')) {
                    $table->timestamp('requested_at')->useCurrent()->after('status');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Optionally drop columns if needed
        // For safety, we won't drop columns in down method
    }
};

