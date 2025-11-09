<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureProfileCompleted
{
    /**
     * Handle an incoming request.
     * Redirect to profile completion page if profile is not complete.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Only apply to drivers - admins and customers don't need profile completion
        if (!$user || !$user->isDriver()) {
            return $next($request);
        }

        // Check if driver profile is completed
        if (!$user->hasCompletedProfile()) {
            // Allow access to driver dashboard and basic routes
            if ($request->routeIs('driver.dashboard*') || 
                $request->routeIs('settings.profile*')) {
                return $next($request);
            }

            // Redirect to driver dashboard with message
            return redirect()->route('driver.dashboard')
                ->with('warning', 'Please complete your profile to access this feature.');
        }

        return $next($request);
    }
}
