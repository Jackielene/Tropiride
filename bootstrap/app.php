<?php

use App\Http\Middleware\EnsureAdminRole;
use App\Http\Middleware\EnsureCustomerRole;
use App\Http\Middleware\EnsureDriverRole;
use App\Http\Middleware\EnsureProfileCompleted;
use App\Http\Middleware\EnsureVerified;
use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use App\Http\Middleware\RedirectBasedOnRole;
use App\Http\Middleware\RedirectToRegisterIfGuest;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->alias([
            'customer' => EnsureCustomerRole::class,
            'admin' => EnsureAdminRole::class,
            'driver' => EnsureDriverRole::class,
            'redirect.to.register' => RedirectToRegisterIfGuest::class,
            'redirect.by.role' => RedirectBasedOnRole::class,
            'profile.completed' => EnsureProfileCompleted::class,
            'verified' => EnsureVerified::class,
        ]);

        $middleware->redirectGuestsTo(fn () => route('login'));
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
