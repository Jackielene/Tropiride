<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(EmailVerificationRequest $request): RedirectResponse
    {
        $user = $request->user();
        
        if ($user && $user->hasVerifiedEmail()) {
            // Redirect admin users to admin dashboard
            if ($user->isAdmin()) {
                return redirect()->intended(route('admin.dashboard', absolute: false).'?verified=1');
            }
            // Redirect customer users to tropiride landing page
            return redirect()->intended(route('tropiride.landing', absolute: false).'?verified=1');
        }

        $request->fulfill();

        // Redirect admin users to admin dashboard
        if ($user && $user->isAdmin()) {
            return redirect()->intended(route('admin.dashboard', absolute: false).'?verified=1');
        }

        // Redirect customer users to tropiride landing page
        return redirect()->intended(route('tropiride.landing', absolute: false).'?verified=1');
    }
}
