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
        if (Schema::hasTable('bookings')) {
            Schema::table('bookings', function (Blueprint $table) {
                // List of fields that should be nullable for ride requests
                $nullableFields = [
                    'pickup_date',
                    'return_date',
                    'pickup_time',
                    'passengers',
                    'payment_method',
                    'payment_status',
                    'notes',
                    'special_requests',
                ];
                
                foreach ($nullableFields as $field) {
                    if (Schema::hasColumn('bookings', $field)) {
                        // Try to modify the column to be nullable
                        try {
                            if ($field === 'pickup_date' || $field === 'return_date') {
                                $table->date($field)->nullable()->change();
                            } elseif ($field === 'pickup_time') {
                                $table->time($field)->nullable()->change();
                            } elseif ($field === 'passengers') {
                                $table->integer($field)->nullable()->change();
                            } elseif (in_array($field, ['payment_method', 'payment_status', 'notes', 'special_requests'])) {
                                $table->string($field)->nullable()->change();
                            }
                        } catch (\Exception $e) {
                            // Column might not exist or already nullable, skip
                            continue;
                        }
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

