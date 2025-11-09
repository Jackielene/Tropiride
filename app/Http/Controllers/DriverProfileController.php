<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DriverProfileController extends Controller
{
    /**
     * Update the driver's profile.
     */
    public function update(Request $request): RedirectResponse
    {
        $user = $request->user();
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'phone' => 'required|string|max:20',
            'age' => 'required|integer|min:18|max:100',
            'address' => 'required|string|max:500',
        ]);
        
        // Update user with validated data
        $user->fill($validated);

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        $user->save();

        // Check if profile is now complete and auto-submit for verification
        if ($user->isProfileReadyForVerification() && !$user->hasCompletedProfile()) {
            $user->markProfileAsCompleted();
            \Log::info('Driver ' . $user->id . ' profile auto-submitted for verification');
            
            return redirect()->route('driver.dashboard')
                ->with('status', 'Profile completed and submitted for verification! You will be able to accept rides once approved by admin.');
        }

        return redirect()->route('driver.dashboard')
            ->with('status', 'Profile updated successfully!');
    }

    /**
     * Update the driver's avatar.
     */
    public function updateAvatar(Request $request): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'avatar' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $user = $request->user();

            // Delete old avatar if exists
            if ($user->avatar && Storage::disk('public')->exists($user->avatar)) {
                Storage::disk('public')->delete($user->avatar);
            }

            // Store new avatar
            $avatarPath = $request->file('avatar')->store('avatars', 'public');
            
            // Update user avatar in database
            $user->avatar = $avatarPath;
            $user->save();
            
            \Log::info('Driver avatar uploaded: ' . $avatarPath);

            // Auto-submit for verification if profile is complete
            $user->refresh();
            if ($user->isProfileReadyForVerification() && !$user->hasCompletedProfile()) {
                $user->markProfileAsCompleted();
                \Log::info('Driver ' . $user->id . ' profile auto-submitted for verification after avatar upload');
                
                return redirect()->route('driver.dashboard')
                    ->with('status', 'Avatar uploaded! Your profile is now complete and submitted for verification.');
            }

            return redirect()->route('driver.dashboard')
                ->with('status', 'Avatar updated successfully!');
        } catch (\Exception $e) {
            \Log::error('Driver avatar upload failed: ' . $e->getMessage());
            return redirect()->route('driver.dashboard')
                ->with('error', 'Failed to upload avatar: ' . $e->getMessage());
        }
    }

    /**
     * Upload driver's license (front).
     */
    public function uploadLicenseFront(Request $request): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'license_front' => 'required|image|mimes:jpeg,png,jpg,pdf|max:5120',
            ]);

            $user = $request->user();

            // Delete old license front if exists
            if ($user->driver_license_front && Storage::disk('public')->exists($user->driver_license_front)) {
                Storage::disk('public')->delete($user->driver_license_front);
            }

            // Store new license front
            $licensePath = $request->file('license_front')->store('licenses', 'public');
            
            // Update user
            $user->driver_license_front = $licensePath;
            $user->save();
            
            \Log::info('Driver license front uploaded: ' . $licensePath);

            // Auto-submit for verification if profile is complete
            $user->refresh();
            if ($user->isProfileReadyForVerification() && !$user->hasCompletedProfile()) {
                $user->markProfileAsCompleted();
                \Log::info('Driver ' . $user->id . ' profile auto-submitted for verification after license front upload');
                
                return redirect()->route('driver.dashboard')
                    ->with('status', 'License uploaded! Your profile is now complete and submitted for verification.');
            }

            return redirect()->route('driver.dashboard')
                ->with('status', 'Driver\'s license front uploaded successfully!');
        } catch (\Exception $e) {
            \Log::error('Driver license front upload failed: ' . $e->getMessage());
            return redirect()->route('driver.dashboard')
                ->with('error', 'Failed to upload license front: ' . $e->getMessage());
        }
    }

    /**
     * Upload driver's license (back).
     */
    public function uploadLicenseBack(Request $request): RedirectResponse
    {
        try {
            $validated = $request->validate([
                'license_back' => 'required|image|mimes:jpeg,png,jpg,pdf|max:5120',
            ]);

            $user = $request->user();

            // Delete old license back if exists
            if ($user->driver_license_back && Storage::disk('public')->exists($user->driver_license_back)) {
                Storage::disk('public')->delete($user->driver_license_back);
            }

            // Store new license back
            $licensePath = $request->file('license_back')->store('licenses', 'public');
            
            // Update user
            $user->driver_license_back = $licensePath;
            $user->save();
            
            \Log::info('Driver license back uploaded: ' . $licensePath);

            // Auto-submit for verification if profile is complete
            $user->refresh();
            if ($user->isProfileReadyForVerification() && !$user->hasCompletedProfile()) {
                $user->markProfileAsCompleted();
                \Log::info('Driver ' . $user->id . ' profile auto-submitted for verification after license back upload');
                
                return redirect()->route('driver.dashboard')
                    ->with('status', 'License uploaded! Your profile is now complete and submitted for verification.');
            }

            return redirect()->route('driver.dashboard')
                ->with('status', 'Driver\'s license back uploaded successfully!');
        } catch (\Exception $e) {
            \Log::error('Driver license back upload failed: ' . $e->getMessage());
            return redirect()->route('driver.dashboard')
                ->with('error', 'Failed to upload license back: ' . $e->getMessage());
        }
    }

    /**
     * Submit driver profile for verification.
     */
    public function submitForVerification(Request $request): RedirectResponse
    {
        $user = $request->user();

        // Check if all required fields are filled
        if (!$user->isProfileReadyForVerification()) {
            return redirect()->route('driver.dashboard')
                ->with('error', 'Please complete all required fields before submitting for verification.');
        }

        // Mark profile as completed and set status to pending
        $user->markProfileAsCompleted();

        \Log::info('Driver ' . $user->id . ' submitted profile for verification');

        return redirect()->route('driver.dashboard')
            ->with('status', 'Your profile has been submitted for verification. You will be able to accept rides once it is approved.');
    }

    /**
     * Resubmit driver profile after rejection.
     */
    public function resubmitVerification(Request $request): RedirectResponse
    {
        $user = $request->user();

        // Check if profile was rejected
        if (!$user->isVerificationRejected()) {
            return redirect()->route('driver.dashboard')
                ->with('error', 'Your profile is not rejected.');
        }

        // Check if all required fields are filled
        if (!$user->isProfileReadyForVerification()) {
            return redirect()->route('driver.dashboard')
                ->with('error', 'Please complete all required fields before resubmitting for verification.');
        }

        // Reset status to pending
        $user->verification_status = 'pending';
        $user->rejection_reason = null;
        $user->save();

        \Log::info('Driver ' . $user->id . ' resubmitted profile for verification');

        return redirect()->route('driver.dashboard')
            ->with('status', 'Your profile has been resubmitted for verification. You will receive a notification once it is approved.');
    }
}
