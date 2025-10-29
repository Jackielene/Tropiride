<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (Schema::hasTable('bookings') && Schema::hasColumn('bookings', 'total_amount')) {
            // Use raw SQL to modify the column to be nullable
            DB::statement('ALTER TABLE bookings MODIFY COLUMN total_amount DECIMAL(10,2) NULL');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasTable('bookings') && Schema::hasColumn('bookings', 'total_amount')) {
            DB::statement('ALTER TABLE bookings MODIFY COLUMN total_amount DECIMAL(10,2) NOT NULL');
        }
    }
};

