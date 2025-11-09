<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureVerified
{
    /**
     * Handle an incoming request.
     * Ensure user is verified by admin before accessing protected routes.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Only apply to drivers - admins and customers don't need verification
        if (!$user || !$user->isDriver()) {
            return $next($request);
        }

        // Check if driver profile is completed first
        if (!$user->hasCompletedProfile()) {
            return redirect()->route('driver.dashboard')
                ->with('warning', 'Please complete your profile before accessing this feature.');
        }

        // Check verification status
        if (!$user->isVerified()) {
            // Allow access to driver dashboard and settings
            if ($request->routeIs('driver.dashboard*') || 
                $request->routeIs('settings.profile*')) {
                return $next($request);
            }

            // Show different message based on verification status
            if ($user->isVerificationPending()) {
                return redirect()->route('driver.dashboard')
                    ->with('info', 'Your driver verification is pending. You will be able to accept rides once your account is approved by our admin team.');
            }

            if ($user->isVerificationRejected()) {
                return redirect()->route('driver.dashboard')
                    ->with('error', 'Your driver verification was rejected. Please review the feedback and resubmit your information.');
            }

            return redirect()->route('driver.dashboard')
                ->with('warning', 'Please complete your driver verification to accept rides.');
        }

        return $next($request);
    }
}
