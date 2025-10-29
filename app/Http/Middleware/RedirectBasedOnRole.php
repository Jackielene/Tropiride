<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RedirectBasedOnRole
{
    /**
     * Handle an incoming request.
     * Redirect authenticated users to their appropriate dashboard based on role.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Only redirect authenticated users
        if (auth()->check()) {
            $user = auth()->user();
            
            // Redirect admin users to admin dashboard
            if ($user->isAdmin()) {
                return redirect()->route('admin.dashboard');
            }
            
            // Redirect customer users to tropiride landing page
            if ($user->isCustomer()) {
                return redirect()->route('tropiride.landing');
            }
        }

        return $next($request);
    }
}

