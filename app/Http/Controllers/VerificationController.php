<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class VerificationController extends Controller
{
    /**
     * Display verification requests for admin.
     */
    public function index(): Response
    {
        // Get all users with pending verification
        $pendingUsers = User::where('verification_status', 'pending')
            ->where('profile_completed', true)
            ->orderBy('updated_at', 'desc')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'age' => $user->age,
                    'address' => $user->address,
                    'avatar_url' => $user->avatar_url,
                    'driver_license_front_url' => $user->driver_license_front_url,
                    'driver_license_back_url' => $user->driver_license_back_url,
                    'role' => $user->role,
                    'created_at' => $user->created_at->toISOString(),
                    'updated_at' => $user->updated_at->toISOString(),
                ];
            });

        // Get recently approved users
        $approvedUsers = User::where('verification_status', 'approved')
            ->whereNotNull('verified_at')
            ->orderBy('verified_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'age' => $user->age,
                    'address' => $user->address,
                    'avatar_url' => $user->avatar_url,
                    'driver_license_front_url' => $user->driver_license_front_url,
                    'driver_license_back_url' => $user->driver_license_back_url,
                    'role' => $user->role,
                    'verified_at' => $user->verified_at?->toISOString(),
                    'created_at' => $user->created_at->toISOString(),
                    'updated_at' => $user->updated_at->toISOString(),
                ];
            });

        // Get recently rejected users
        $rejectedUsers = User::where('verification_status', 'rejected')
            ->orderBy('updated_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'age' => $user->age,
                    'address' => $user->address,
                    'avatar_url' => $user->avatar_url,
                    'driver_license_front_url' => $user->driver_license_front_url,
                    'driver_license_back_url' => $user->driver_license_back_url,
                    'role' => $user->role,
                    'rejection_reason' => $user->rejection_reason,
                    'created_at' => $user->created_at->toISOString(),
                    'updated_at' => $user->updated_at->toISOString(),
                ];
            });

        return Inertia::render('admin/verifications', [
            'pendingUsers' => $pendingUsers,
            'approvedUsers' => $approvedUsers,
            'rejectedUsers' => $rejectedUsers,
            'stats' => [
                'pending' => $pendingUsers->count(),
                'approved' => User::where('verification_status', 'approved')->count(),
                'rejected' => User::where('verification_status', 'rejected')->count(),
            ],
        ]);
    }

    /**
     * Show a specific user's verification details.
     */
    public function show(int $userId): Response
    {
        $user = User::findOrFail($userId);

        return Inertia::render('admin/verification-detail', [
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'age' => $user->age,
                'address' => $user->address,
                'avatar_url' => $user->avatar_url,
                'driver_license_front_url' => $user->driver_license_front_url,
                'driver_license_back_url' => $user->driver_license_back_url,
                'role' => $user->role,
                'verification_status' => $user->verification_status,
                'profile_completed' => $user->profile_completed,
                'verified_at' => $user->verified_at?->toISOString(),
                'rejection_reason' => $user->rejection_reason,
                'created_at' => $user->created_at->toISOString(),
                'updated_at' => $user->updated_at->toISOString(),
            ],
        ]);
    }

    /**
     * Approve a user's verification.
     */
    public function approve(Request $request, int $userId): RedirectResponse
    {
        $user = User::findOrFail($userId);
        $admin = $request->user();

        if (!$user->hasCompletedProfile()) {
            return back()->with('error', 'User has not completed their profile.');
        }

        if ($user->isVerified()) {
            return back()->with('info', 'User is already verified.');
        }

        $user->approveVerification($admin->id);

        \Log::info('Admin ' . $admin->id . ' approved verification for user ' . $user->id);

        return back()->with('status', 'User verification approved successfully!');
    }

    /**
     * Reject a user's verification.
     */
    public function reject(Request $request, int $userId): RedirectResponse
    {
        $validated = $request->validate([
            'reason' => 'required|string|max:1000',
        ]);

        $user = User::findOrFail($userId);
        $admin = $request->user();

        if ($user->isVerified()) {
            return back()->with('error', 'Cannot reject an already verified user.');
        }

        $user->rejectVerification($validated['reason'], $admin->id);

        \Log::info('Admin ' . $admin->id . ' rejected verification for user ' . $user->id . ': ' . $validated['reason']);

        return back()->with('status', 'User verification rejected.');
    }

    /**
     * Revoke a user's verification.
     */
    public function revoke(Request $request, int $userId): RedirectResponse
    {
        $validated = $request->validate([
            'reason' => 'required|string|max:1000',
        ]);

        $user = User::findOrFail($userId);
        $admin = $request->user();

        if (!$user->isVerified()) {
            return back()->with('error', 'User is not verified.');
        }

        $user->rejectVerification($validated['reason'], $admin->id);
        $user->profile_completed = false;

        \Log::info('Admin ' . $admin->id . ' revoked verification for user ' . $user->id . ': ' . $validated['reason']);

        return back()->with('status', 'User verification revoked successfully.');
    }
}
