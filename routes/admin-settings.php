<?php

use App\Http\Controllers\Admin\Settings\AdminPasswordController;
use App\Http\Controllers\Admin\Settings\AdminProfileController;
use App\Http\Controllers\Admin\Settings\AdminTwoFactorAuthenticationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'admin'])->group(function () {
    Route::redirect('admin/settings', '/admin/settings/profile');

    Route::get('admin/settings/profile', [AdminProfileController::class, 'edit'])->name('admin.profile.edit');
    Route::patch('admin/settings/profile', [AdminProfileController::class, 'update'])->name('admin.profile.update');
    Route::delete('admin/settings/profile', [AdminProfileController::class, 'destroy'])->name('admin.profile.destroy');

    Route::get('admin/settings/password', [AdminPasswordController::class, 'edit'])->name('admin.password.edit');

    Route::put('admin/settings/password', [AdminPasswordController::class, 'update'])
        ->middleware('throttle:6,1')
        ->name('admin.password.update');

    Route::get('admin/settings/two-factor', [AdminTwoFactorAuthenticationController::class, 'show'])
        ->name('admin.two-factor.show');
});

