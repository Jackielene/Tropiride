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
            if (!Schema::hasColumn('bookings', 'service_type')) {
                // Service types: per_day_rental, pickup_dropoff, airport_port_transfer
                $table->string('service_type')->default('per_day_rental')->after('vehicle_type');
            }
            
            // Add flight/vessel number for airport/port transfers
            if (!Schema::hasColumn('bookings', 'flight_vessel_number')) {
                $table->string('flight_vessel_number')->nullable()->after('service_type');
            }
            
            // Add terminal info for airport/port transfers
            if (!Schema::hasColumn('bookings', 'terminal_info')) {
                $table->string('terminal_info')->nullable()->after('flight_vessel_number');
            }
            
            // Add arrival/departure time for airport/port transfers
            if (!Schema::hasColumn('bookings', 'arrival_departure_time')) {
                $table->time('arrival_departure_time')->nullable()->after('terminal_info');
            }
            
            // Add transfer type (arrival/departure) for airport/port transfers
            if (!Schema::hasColumn('bookings', 'transfer_type')) {
                $table->string('transfer_type')->nullable()->after('arrival_departure_time'); // arrival or departure
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $columns = ['service_type', 'flight_vessel_number', 'terminal_info', 'arrival_departure_time', 'transfer_type'];
            
            foreach ($columns as $column) {
                if (Schema::hasColumn('bookings', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};

