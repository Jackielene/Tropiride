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
        // Define admin accounts to create/update
        $admins = [
            [
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => 'password123',
            ],
            [
                'name' => 'Admin Two',
                'email' => 'admin2@example.com',
                'password' => 'password123',
            ],
        ];

        foreach ($admins as $adminData) {
            $admin = User::where('email', $adminData['email'])->first();

            if (!$admin) {
                // Create admin user if it doesn't exist
                User::create([
                    'name' => $adminData['name'],
                    'email' => $adminData['email'],
                    'password' => Hash::make($adminData['password']),
                    'role' => 'admin',
                    'email_verified_at' => now(),
                ]);
                
                $this->command->info("Admin user '{$adminData['email']}' created successfully!");
            } else {
                // Update existing user to ensure role is admin
                $admin->update([
                    'role' => 'admin',
                    'password' => Hash::make($adminData['password']),
                ]);
                
                $this->command->info("Admin user '{$adminData['email']}' updated successfully!");
            }
        }
    }
}

