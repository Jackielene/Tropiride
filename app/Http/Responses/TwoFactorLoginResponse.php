<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Laravel\Fortify\Contracts\TwoFactorLoginResponse as TwoFactorLoginResponseContract;
use Laravel\Fortify\Fortify;

class TwoFactorLoginResponse implements TwoFactorLoginResponseContract
{
    /**
     * Create an HTTP response that represents the object.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function toResponse($request)
    {
        if ($request->wantsJson()) {
            return new JsonResponse('', 204);
        }

        $user = $request->user();

        // Redirect admin users to admin dashboard
        if ($user && $user->isAdmin()) {
            return redirect()->intended(route('admin.dashboard', absolute: false));
        }

        // Redirect driver users to driver dashboard
        if ($user && $user->isDriver()) {
            return redirect()->intended(route('driver.dashboard', absolute: false));
        }

        // Redirect customer users to tropiride landing page
        return redirect()->intended(route('tropiride.landing', absolute: false));
    }
}

