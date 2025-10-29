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
        // Check if table already exists
        if (Schema::hasTable('bookings')) {
            // Table exists - just ensure all required columns are present
            Schema::table('bookings', function (Blueprint $table) {
                // Check and add user_id if missing
                if (!Schema::hasColumn('bookings', 'user_id')) {
                    $table->foreignId('user_id')->after('id')->constrained()->onDelete('cascade');
                }
                
                // Check and add all required columns
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
            return;
        }
        
        // Create table if it doesn't exist
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('pickup_location');
            $table->decimal('pickup_lat', 10, 8)->nullable();
            $table->decimal('pickup_lng', 11, 8)->nullable();
            $table->string('dropoff_location');
            $table->decimal('dropoff_lat', 10, 8)->nullable();
            $table->decimal('dropoff_lng', 11, 8)->nullable();
            $table->decimal('estimated_fare', 10, 2);
            $table->decimal('distance_km', 8, 2);
            $table->integer('estimated_time_minutes');
            $table->string('status')->default('pending'); // pending, confirmed, in_progress, completed, cancelled
            $table->timestamp('requested_at')->useCurrent();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};

