<?php

namespace App\Http\Controllers;

use App\Http\Requests\TropirideProfileUpdateRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class TropirideProfileController extends Controller
{
    /**
     * Show the Tropiride profile page.
     */
    public function show(Request $request): Response
    {
        $user = $request->user();
        
        // Load bookings with user relationship
        $bookings = $user->bookings()
            ->with('user') // Eager load user relationship
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($booking) use ($user) {
                return [
                    'id' => (string) $booking->id,
                    'user_name' => $booking->user->name ?? $user->name,
                    'pickup_location' => $booking->pickup_location ?? '',
                    'dropoff_location' => $booking->dropoff_location ?? '',
                    'estimated_fare' => (float) ($booking->estimated_fare ?? 0),
                    'distance_km' => (float) ($booking->distance_km ?? 0),
                    'estimated_time_minutes' => (int) ($booking->estimated_time_minutes ?? 0),
                    'status' => $booking->status ?? 'pending',
                    'requested_at' => $booking->requested_at?->toISOString(),
                    'created_at' => $booking->created_at?->toISOString(),
                ];
            });
        
        return Inertia::render('tropiride/profile', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'age' => $user->age,
                'address' => $user->address,
                'avatar' => $user->avatar,
                'avatar_url' => $user->avatar_url,
                'email_verified_at' => $user->email_verified_at,
                'created_at' => $user->created_at,
                'updated_at' => $user->updated_at,
            ],
            'bookings' => $bookings,
        ]);
    }

    /**
     * Update the user's profile from Tropiride profile page.
     */
    public function update(TropirideProfileUpdateRequest $request): RedirectResponse
    {
        $user = $request->user();
        $validated = $request->validated();
        
        // Convert empty strings to null for nullable fields
        $validated['phone'] = !empty($validated['phone']) ? $validated['phone'] : null;
        $validated['age'] = !empty($validated['age']) ? (int)$validated['age'] : null;
        $validated['address'] = !empty($validated['address']) ? $validated['address'] : null;
        
        // Debug: Log the validated data
        \Log::info('Profile update data (after cleanup):', $validated);
        
        // Update user with validated data
        $user->phone = $validated['phone'];
        $user->age = $validated['age'];
        $user->address = $validated['address'];
        $user->name = $validated['name'];
        $user->email = $validated['email'];

        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }

        // Debug: Log what fields are dirty
        \Log::info('Dirty fields before save:', $user->getDirty());

        $user->save();
        
        // Debug: Verify saved data
        $user->refresh();
        \Log::info('Saved user data:', [
            'phone' => $user->phone,
            'age' => $user->age,
            'address' => $user->address,
        ]);

        // Use Inertia redirect to properly refresh the page with updated data
        return redirect()->route('tropiride.profile')->with('status', 'Profile updated successfully!');
    }

    /**
     * Update the user's avatar.
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
            
            // Refresh user to get updated data
            $user->refresh();

            // Debug: Log the avatar path
            \Log::info('Avatar uploaded: ' . $avatarPath);
            \Log::info('Avatar stored in DB: ' . $user->avatar);
            \Log::info('Avatar URL: ' . $user->avatar_url);
            \Log::info('Full URL: ' . asset('storage/' . $avatarPath));
            \Log::info('Storage path exists: ' . (Storage::disk('public')->exists($avatarPath) ? 'yes' : 'no'));

            // Redirect with success message - Inertia will automatically refresh the page with new data
            return redirect()->route('tropiride.profile')
                ->with('status', 'Avatar updated successfully!');
        } catch (\Illuminate\Validation\ValidationException $e) {
            // Return validation errors properly for Inertia
            throw $e;
        } catch (\Exception $e) {
            \Log::error('Avatar upload failed: ' . $e->getMessage());
            return redirect()->route('tropiride.profile')
                ->with('error', 'Failed to upload avatar: ' . $e->getMessage());
        }
    }
}
