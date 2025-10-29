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
                // Make total_amount nullable if it exists
                if (Schema::hasColumn('bookings', 'total_amount')) {
                    try {
                        $table->decimal('total_amount', 10, 2)->nullable()->change();
                    } catch (\Exception $e) {
                        // If change doesn't work, try to modify
                        DB::statement('ALTER TABLE bookings MODIFY COLUMN total_amount DECIMAL(10,2) NULL');
                    }
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

