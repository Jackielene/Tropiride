<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if admin user already exists
        $admin = User::where('email', 'admin@example.com')->first();

        if (!$admin) {
            // Create admin user if it doesn't exist
            User::create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => Hash::make('password123'),
                'role' => 'admin',
                'email_verified_at' => now(),
            ]);
            
            $this->command->info('Admin user created successfully!');
        } else {
            // Update existing user to ensure role is admin
            $admin->update([
                'role' => 'admin',
                'password' => Hash::make('password123'), // Update password
            ]);
            
            $this->command->info('Admin user updated successfully!');
        }
    }
}

