<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ChatController;

// Home route - redirects authenticated users based on role
Route::get('/', function () {
    if (auth()->check()) {
        $user = auth()->user();
        
        // Redirect admin users to admin dashboard
        if ($user->isAdmin()) {
            return redirect()->route('admin.dashboard');
        }
        
        // Redirect driver users to driver dashboard
        if ($user->isDriver()) {
            return redirect()->route('driver.dashboard');
        }
        
        // Redirect customer users to tropiride landing page
        if ($user->isCustomer()) {
            return redirect()->route('tropiride.landing');
        }
    }
    
    return Inertia::render('welcome');
})->name('home');

// Tropiride Routes
Route::get('/tropiride', function () {
    return Inertia::render('tropiride/landing');
})->name('tropiride.landing');

Route::get('/tropiride/about', function () {
    return Inertia::render('tropiride/about');
})->name('tropiride.about');

Route::get('/tropiride/contact', function () {
    return Inertia::render('tropiride/contact');
})->name('tropiride.contact');

Route::get('/tropiride/faq', function () {
    return Inertia::render('tropiride/faq');
})->name('tropiride.faq');

Route::get('/tropiride/privacy', function () {
    return Inertia::render('tropiride/privacy');
})->name('tropiride.privacy');

Route::get('/tropiride/terms', function () {
    return Inertia::render('tropiride/terms');
})->name('tropiride.terms');

// Customer Profile Routes (no verification required)
Route::middleware(['auth', 'customer'])->get('/tropiride/profile', [App\Http\Controllers\TropirideProfileController::class, 'show'])->name('tropiride.profile');
Route::middleware(['auth', 'customer'])->patch('/tropiride/profile', [App\Http\Controllers\TropirideProfileController::class, 'update'])->name('tropiride.profile.update');
Route::middleware(['auth', 'customer'])->post('/tropiride/profile/avatar', [App\Http\Controllers\TropirideProfileController::class, 'updateAvatar'])->name('tropiride.profile.avatar');
Route::middleware(['auth', 'customer'])->get('/tropiride/messages', [ChatController::class, 'index'])->name('tropiride.messages');

// Debug route for avatar testing
Route::middleware('auth')->get('/debug/avatar', function () {
    $user = auth()->user();
    $publicPath = public_path('storage/' . ($user->avatar ?? ''));
    return response()->json([
        'avatar_field' => $user->avatar,
        'avatar_url' => $user->avatar_url,
        'app_url' => config('app.url'),
        'storage_path' => asset('storage/' . ($user->avatar ?? '')),
        'public_path_exists' => file_exists($publicPath),
        'storage_exists' => $user->avatar ? \Illuminate\Support\Facades\Storage::disk('public')->exists($user->avatar) : false,
        'symlink_exists' => is_link(public_path('storage')),
    ]);
});

// Debug route for checking user role and access
Route::middleware('auth')->get('/debug/role', function () {
    $user = auth()->user();
    
    $expectedRedirect = 'tropiride.landing';
    if ($user->isAdmin()) {
        $expectedRedirect = 'admin.dashboard';
    } elseif ($user->isDriver()) {
        $expectedRedirect = 'driver.dashboard';
    } elseif ($user->isCustomer()) {
        $expectedRedirect = 'tropiride.landing';
    }
    
    return response()->json([
        'authenticated' => auth()->check(),
        'user_id' => $user->id,
        'user_name' => $user->name,
        'user_email' => $user->email,
        'user_role' => $user->role,
        'is_customer' => $user->isCustomer(),
        'is_admin' => $user->isAdmin(),
        'is_driver' => $user->isDriver(),
        'expected_redirect_after_login' => $expectedRedirect,
        'fortify_home_config' => config('fortify.home'),
    ]);
});

// Vehicles page - customers can access without verification
Route::middleware('redirect.to.register')->get('/tropiride/vehicles', function () {
    return Inertia::render('tropiride/vehicles');
})->name('tropiride.vehicles');

// Booking Routes - customers can book without verification
Route::middleware(['auth', 'customer'])->get('/tropiride/booking', function () {
    return Inertia::render('tropiride/booking', [
        'user' => auth()->user(),
    ]);
})->name('tropiride.booking');

// Ride Request Routes - customers can request rides without verification
Route::middleware(['auth', 'customer'])->post('/tropiride/ride-request', [App\Http\Controllers\RideRequestController::class, 'store'])->name('tropiride.ride.request');
Route::middleware(['auth', 'customer'])->get('/tropiride/bookings', [App\Http\Controllers\RideRequestController::class, 'index'])->name('tropiride.bookings');
Route::middleware(['auth', 'customer'])->post('/tropiride/bookings/{id}/cancel', [App\Http\Controllers\RideRequestController::class, 'cancel'])->name('tropiride.bookings.cancel');

Route::middleware(['auth', 'customer'])->post('/tropiride/booking/confirm', function (Request $request) {
    $bookingData = $request->validate([
        'id' => 'required|string',
        'vehicleType' => 'required|string',
        'vehicleName' => 'required|string',
        'pickupDate' => 'required|string',
        'returnDate' => 'required|string',
        'pickupLocation' => 'required|string',
        'passengers' => 'required|integer',
        'customerInfo' => 'required|array',
        'specialRequests' => 'nullable|string',
        'payment' => 'nullable|array',
        'driverInfo' => 'nullable|array',
    ]);
    
    // Store in session
    session(['bookingData' => $bookingData]);
    
    // Redirect to confirmation page
    return redirect()->route('tropiride.confirmation');
})->name('tropiride.booking.confirm');

Route::middleware(['auth', 'customer'])->get('/tropiride/confirmation', function (Request $request) {
    $bookingData = session('bookingData');
    
    if (!$bookingData) {
        // If no booking data, redirect back to booking
        return redirect()->route('tropiride.booking');
    }
    
    return Inertia::render('tropiride/confirmation', [
        'bookingData' => $bookingData
    ]);
})->name('tropiride.confirmation');

// Dashboard route - redirects based on user role
Route::middleware(['auth'])->get('dashboard', function () {
    $user = auth()->user();
    
    // Redirect admin users to admin dashboard
    if ($user->isAdmin()) {
        return redirect()->route('admin.dashboard');
    }
    
    // Redirect driver users to driver dashboard
    if ($user->isDriver()) {
        return redirect()->route('driver.dashboard');
    }
    
    // Redirect customer users to tropiride landing page
    if ($user->isCustomer()) {
        return redirect()->route('tropiride.landing');
    }
    
    // Fallback for other roles
    return redirect()->route('tropiride.landing');
})->name('dashboard');

// Admin Routes
Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/dashboard', [App\Http\Controllers\AdminDashboardController::class, 'index'])->name('dashboard');
    
    // Verification Management Routes
    Route::get('/verifications', [App\Http\Controllers\VerificationController::class, 'index'])->name('verifications.index');
    Route::get('/verifications/{userId}', [App\Http\Controllers\VerificationController::class, 'show'])->name('verifications.show');
    Route::post('/verifications/{userId}/approve', [App\Http\Controllers\VerificationController::class, 'approve'])->name('verifications.approve');
    Route::post('/verifications/{userId}/reject', [App\Http\Controllers\VerificationController::class, 'reject'])->name('verifications.reject');
    Route::post('/verifications/{userId}/revoke', [App\Http\Controllers\VerificationController::class, 'revoke'])->name('verifications.revoke');
    
    // Debug route to check admin authentication
    Route::get('/debug', function () {
        $user = auth()->user();
        return response()->json([
            'authenticated' => auth()->check(),
            'user_id' => $user->id ?? null,
            'user_email' => $user->email ?? null,
            'user_role' => $user->role ?? null,
            'is_admin' => $user->isAdmin() ?? false,
        ]);
    })->name('debug');
    
    // Debug route to check dashboard data
    Route::get('/debug-data', function () {
        $users = \App\Models\User::all();
        $bookings = \App\Models\Booking::with('user')->get();
        
        return response()->json([
            'users_count' => $users->count(),
            'users' => $users->map(fn($u) => [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'role' => $u->role,
                'avatar' => $u->avatar,
                'avatar_url' => $u->avatar_url,
            ]),
            'bookings_count' => $bookings->count(),
            'bookings' => $bookings->map(fn($b) => [
                'id' => $b->id,
                'user_id' => $b->user_id,
                'user_name' => $b->user?->name,
                'pickup' => $b->pickup_location,
                'dropoff' => $b->dropoff_location,
                'status' => $b->status,
            ]),
        ]);
    })->name('debug.data');
});

// Driver Routes
Route::middleware(['auth', 'driver'])->prefix('driver')->name('driver.')->group(function () {
    // Dashboard accessible without verification (to complete profile)
    Route::get('/dashboard', [App\Http\Controllers\DriverDashboardController::class, 'index'])->name('dashboard');
    Route::get('/rides', [App\Http\Controllers\DriverDashboardController::class, 'rides'])->name('rides');
    Route::get('/messages', [ChatController::class, 'driverIndex'])->name('messages');
    
    // Debug route to check driver data
    Route::get('/debug', function () {
        $driver = auth()->user();
        return response()->json([
            'id' => $driver->id,
            'name' => $driver->name,
            'email' => $driver->email,
            'phone' => $driver->phone,
            'age' => $driver->age,
            'address' => $driver->address,
            'avatar' => $driver->avatar,
            'avatar_url' => $driver->avatar_url,
            'profile_completed' => $driver->profile_completed,
            'verification_status' => $driver->verification_status,
            'driver_license_front' => $driver->driver_license_front,
            'driver_license_back' => $driver->driver_license_back,
            'driver_license_front_url' => $driver->driver_license_front_url,
            'driver_license_back_url' => $driver->driver_license_back_url,
            'verified_at' => $driver->verified_at,
            'rejection_reason' => $driver->rejection_reason,
            'is_profile_ready' => $driver->isProfileReadyForVerification(),
            'is_verified' => $driver->isVerified(),
            'has_completed_profile' => $driver->hasCompletedProfile(),
            'is_verification_pending' => $driver->isVerificationPending(),
            'is_verification_rejected' => $driver->isVerificationRejected(),
        ]);
    })->name('debug');
    
    // Driver Profile Management (no verification required)
    Route::patch('/profile', [App\Http\Controllers\DriverProfileController::class, 'update'])->name('profile.update');
    Route::post('/profile/avatar', [App\Http\Controllers\DriverProfileController::class, 'updateAvatar'])->name('profile.avatar');
    Route::post('/profile/license-front', [App\Http\Controllers\DriverProfileController::class, 'uploadLicenseFront'])->name('profile.license.front');
    Route::post('/profile/license-back', [App\Http\Controllers\DriverProfileController::class, 'uploadLicenseBack'])->name('profile.license.back');
    Route::post('/profile/submit-verification', [App\Http\Controllers\DriverProfileController::class, 'submitForVerification'])->name('profile.submit.verification');
    Route::post('/profile/resubmit-verification', [App\Http\Controllers\DriverProfileController::class, 'resubmitVerification'])->name('profile.resubmit.verification');
    
    // These routes require driver verification
    Route::middleware('verified')->post('/bookings/{bookingId}/accept', [App\Http\Controllers\DriverDashboardController::class, 'acceptBooking'])->name('booking.accept');
    Route::middleware('verified')->patch('/bookings/{bookingId}/status', [App\Http\Controllers\DriverDashboardController::class, 'updateBookingStatus'])->name('booking.status');
});

Route::middleware('auth')->group(function () {
    Route::get('/chat/bookings/{booking}/messages', [ChatController::class, 'messages'])->name('chat.messages');
    Route::post('/chat/bookings/{booking}/messages', [ChatController::class, 'store'])->name('chat.messages.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/driver-settings.php';
require __DIR__.'/admin-settings.php';
require __DIR__.'/auth.php';
