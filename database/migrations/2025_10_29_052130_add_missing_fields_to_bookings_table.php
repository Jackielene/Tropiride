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
        Schema::table('bookings', function (Blueprint $table) {
            // Add missing columns if they don't exist
            if (!Schema::hasColumn('bookings', 'driver_id')) {
                $table->unsignedBigInteger('driver_id')->nullable()->after('tourist_id');
            }
            if (!Schema::hasColumn('bookings', 'vehicle_id')) {
                $table->unsignedBigInteger('vehicle_id')->nullable()->after('driver_id');
            }
            if (!Schema::hasColumn('bookings', 'total_amount')) {
                $table->decimal('total_amount', 10, 2)->nullable()->after('estimated_fare');
            }
            if (!Schema::hasColumn('bookings', 'passengers')) {
                $table->integer('passengers')->nullable()->after('pickup_time');
            }
            if (!Schema::hasColumn('bookings', 'payment_method')) {
                $table->string('payment_method')->nullable()->after('passengers');
            }
            if (!Schema::hasColumn('bookings', 'payment_status')) {
                $table->string('payment_status')->nullable()->after('payment_method');
            }
            if (!Schema::hasColumn('bookings', 'notes')) {
                $table->text('notes')->nullable()->after('payment_status');
            }
            if (!Schema::hasColumn('bookings', 'special_requests')) {
                $table->text('special_requests')->nullable()->after('notes');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            // Drop columns if they exist
            if (Schema::hasColumn('bookings', 'driver_id')) {
                $table->dropColumn('driver_id');
            }
            if (Schema::hasColumn('bookings', 'vehicle_id')) {
                $table->dropColumn('vehicle_id');
            }
            if (Schema::hasColumn('bookings', 'total_amount')) {
                $table->dropColumn('total_amount');
            }
            if (Schema::hasColumn('bookings', 'passengers')) {
                $table->dropColumn('passengers');
            }
            if (Schema::hasColumn('bookings', 'payment_method')) {
                $table->dropColumn('payment_method');
            }
            if (Schema::hasColumn('bookings', 'payment_status')) {
                $table->dropColumn('payment_status');
            }
            if (Schema::hasColumn('bookings', 'notes')) {
                $table->dropColumn('notes');
            }
            if (Schema::hasColumn('bookings', 'special_requests')) {
                $table->dropColumn('special_requests');
            }
        });
    }
};
