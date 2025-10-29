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
                // Add pickup_date column if it doesn't exist
                if (!Schema::hasColumn('bookings', 'pickup_date')) {
                    $table->date('pickup_date')->nullable()->after('requested_at');
                }
                
                // Add return_date column if it doesn't exist
                if (!Schema::hasColumn('bookings', 'return_date')) {
                    $table->date('return_date')->nullable()->after('pickup_date');
                }
                
                // Add pickup_time column if it doesn't exist
                if (!Schema::hasColumn('bookings', 'pickup_time')) {
                    $table->time('pickup_time')->nullable()->after('pickup_date');
                }
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bookings')) {
            Schema::table('bookings', function (Blueprint $table) {
                if (Schema::hasColumn('bookings', 'pickup_time')) {
                    $table->dropColumn('pickup_time');
                }
                if (Schema::hasColumn('bookings', 'return_date')) {
                    $table->dropColumn('return_date');
                }
                if (Schema::hasColumn('bookings', 'pickup_date')) {
                    $table->dropColumn('pickup_date');
                }
            });
        }
    }
};
