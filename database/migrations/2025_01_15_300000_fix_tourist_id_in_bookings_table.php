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
                // Check if tourist_id exists and handle it
                if (Schema::hasColumn('bookings', 'tourist_id')) {
                    // Make tourist_id nullable if it exists
                    $table->unsignedBigInteger('tourist_id')->nullable()->change();
                    
                    // If user_id exists, copy user_id values to tourist_id for existing records
                    // This is handled by the controller when creating new bookings
                } else {
                    // If tourist_id doesn't exist but is expected, create it as nullable
                    if (Schema::hasColumn('bookings', 'user_id')) {
                        $table->unsignedBigInteger('tourist_id')->nullable()->after('user_id');
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

