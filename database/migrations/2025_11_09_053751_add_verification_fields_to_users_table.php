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
        Schema::table('users', function (Blueprint $table) {
            // Profile completion status
            $table->boolean('profile_completed')->default(false)->after('role');
            
            // Verification status: pending, approved, rejected
            $table->enum('verification_status', ['pending', 'approved', 'rejected'])
                ->default('pending')
                ->after('profile_completed');
            
            // Driver's license images (front and back)
            $table->string('driver_license_front')->nullable()->after('verification_status');
            $table->string('driver_license_back')->nullable()->after('driver_license_front');
            
            // Verification timestamp
            $table->timestamp('verified_at')->nullable()->after('driver_license_back');
            
            // Admin who verified (optional)
            $table->unsignedBigInteger('verified_by')->nullable()->after('verified_at');
            
            // Rejection reason (if rejected)
            $table->text('rejection_reason')->nullable()->after('verified_by');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'profile_completed',
                'verification_status',
                'driver_license_front',
                'driver_license_back',
                'verified_at',
                'verified_by',
                'rejection_reason',
            ]);
        });
    }
};
