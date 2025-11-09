<?php

use App\Http\Controllers\Driver\Settings\DriverPasswordController;
use App\Http\Controllers\Driver\Settings\DriverProfileController;
use App\Http\Controllers\Driver\Settings\DriverTwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'driver'])->group(function () {
    Route::redirect('driver/settings', '/driver/settings/profile');

    Route::get('driver/settings/profile', [DriverProfileController::class, 'edit'])->name('driver.profile.edit');
    Route::patch('driver/settings/profile', [DriverProfileController::class, 'update'])->name('driver.profile.update');
    Route::delete('driver/settings/profile', [DriverProfileController::class, 'destroy'])->name('driver.profile.destroy');

    Route::get('driver/settings/password', [DriverPasswordController::class, 'edit'])->name('driver.password.edit');

    Route::put('driver/settings/password', [DriverPasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('driver.password.update');

    Route::get('driver/settings/two-factor', [DriverTwoFactorAuthenticationController::class, 'show'])
        ->name('driver.two-factor.show');
});

