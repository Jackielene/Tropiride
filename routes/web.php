<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
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

Route::middleware(['auth', 'customer'])->get('/tropiride/profile', [App\Http\Controllers\TropirideProfileController::class, 'show'])->name('tropiride.profile');
Route::middleware(['auth', 'customer'])->patch('/tropiride/profile', [App\Http\Controllers\TropirideProfileController::class, 'update'])->name('tropiride.profile.update');
Route::middleware(['auth', 'customer'])->post('/tropiride/profile/avatar', [App\Http\Controllers\TropirideProfileController::class, 'updateAvatar'])->name('tropiride.profile.avatar');

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

Route::middleware(['auth', 'customer'])->get('/tropiride/booking', function () {
    return Inertia::render('tropiride/booking', [
        'user' => auth()->user(),
    ]);
})->name('tropiride.booking');

Route::get('/tropiride/vehicles', function () {
    return Inertia::render('tropiride/vehicles');
})->name('tropiride.vehicles');

// Ride Request Routes
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

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
