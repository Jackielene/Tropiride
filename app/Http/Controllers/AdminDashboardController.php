<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function index(): Response
    {
        try {
            // Get total counts
            $totalUsers = User::count() ?? 0;
            $totalCustomers = User::where('role', 'customer')->count() ?? 0;
            $totalDrivers = User::where('role', 'driver')->count() ?? 0;
            $totalAdmins = User::where('role', 'admin')->count() ?? 0;
            
            // Get verification statistics
            $pendingVerifications = User::where('verification_status', 'pending')
                ->where('profile_completed', true)
                ->count() ?? 0;
            $approvedVerifications = User::where('verification_status', 'approved')->count() ?? 0;
            $rejectedVerifications = User::where('verification_status', 'rejected')->count() ?? 0;
            
            // Get recent users (last 30 days)
            $recentUsers = User::where('created_at', '>=', now()->subDays(30)->startOfDay())
                ->orderBy('created_at', 'desc')
                ->get(['id', 'name', 'email', 'role', 'created_at', 'avatar'])
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => $user->role,
                        'created_at' => $user->created_at->toISOString(),
                        'avatar_url' => $user->avatar_url,
                    ];
                });
            
            // Get new users (last 7 days)
            $newUsers = User::where('created_at', '>=', now()->subDays(7)->startOfDay())
                ->orderBy('created_at', 'desc')
                ->get(['id', 'name', 'email', 'role', 'created_at', 'avatar'])
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => $user->role,
                        'created_at' => $user->created_at->toISOString(),
                        'avatar_url' => $user->avatar_url,
                    ];
                });
            
            // Get booking statistics
            $totalBookings = Booking::count() ?? 0;
            $pendingBookings = Booking::where('status', 'pending')->count() ?? 0;
            $completedBookings = Booking::where('status', 'completed')->count() ?? 0;
            $cancelledBookings = Booking::where('status', 'cancelled')->count() ?? 0;
            
            // Get recent bookings with user information (limit 20 for recent section)
            $recentBookings = Booking::with('user:id,name,email,role')
                ->orderBy('created_at', 'desc')
                ->limit(20)
                ->get([
                    'id',
                    'user_id',
                    'pickup_location',
                    'dropoff_location',
                    'status',
                    'estimated_fare',
                    'total_amount',
                    'distance_km',
                    'created_at',
                    'updated_at',
                    'requested_at',
                    'pickup_date',
                    'pickup_time',
                    'passengers',
                    'vehicle_type',
                    'payment_status'
                ])
                ->map(function ($booking) {
                    return [
                        'id' => $booking->id,
                        'user_id' => $booking->user_id,
                        'user' => $booking->user ? [
                            'id' => $booking->user->id,
                            'name' => $booking->user->name,
                            'email' => $booking->user->email,
                            'role' => $booking->user->role,
                        ] : null,
                        'pickup_location' => $booking->pickup_location,
                        'dropoff_location' => $booking->dropoff_location,
                        'status' => $booking->status,
                        'estimated_fare' => $booking->estimated_fare,
                        'total_amount' => $booking->total_amount,
                        'distance_km' => $booking->distance_km,
                        'created_at' => $booking->created_at->toISOString(),
                        'updated_at' => $booking->updated_at->toISOString(),
                        'requested_at' => $booking->requested_at ? $booking->requested_at->toISOString() : null,
                        'pickup_date' => $booking->pickup_date,
                        'pickup_time' => $booking->pickup_time,
                        'passengers' => $booking->passengers,
                        'vehicle_type' => $booking->vehicle_type,
                        'payment_status' => $booking->payment_status,
                    ];
                });
            
            // Get ALL customer bookings for the main display
            $allCustomerBookings = Booking::with('user:id,name,email,role')
                ->whereHas('user', function ($query) {
                    $query->where('role', 'customer');
                })
                ->orderBy('created_at', 'desc')
                ->get([
                    'id',
                    'user_id',
                    'pickup_location',
                    'dropoff_location',
                    'status',
                    'estimated_fare',
                    'total_amount',
                    'distance_km',
                    'created_at',
                    'updated_at',
                    'requested_at',
                    'pickup_date',
                    'pickup_time',
                    'return_date',
                    'return_time',
                    'passengers',
                    'vehicle_type',
                    'payment_status'
                ])
                ->map(function ($booking) {
                    return [
                        'id' => $booking->id,
                        'user_id' => $booking->user_id,
                        'user' => $booking->user ? [
                            'id' => $booking->user->id,
                            'name' => $booking->user->name,
                            'email' => $booking->user->email,
                            'role' => $booking->user->role,
                        ] : null,
                        'pickup_location' => $booking->pickup_location,
                        'dropoff_location' => $booking->dropoff_location,
                        'status' => $booking->status,
                        'estimated_fare' => $booking->estimated_fare,
                        'total_amount' => $booking->total_amount,
                        'distance_km' => $booking->distance_km,
                        'created_at' => $booking->created_at->toISOString(),
                        'updated_at' => $booking->updated_at->toISOString(),
                        'requested_at' => $booking->requested_at ? $booking->requested_at->toISOString() : null,
                        'pickup_date' => $booking->pickup_date,
                        'pickup_time' => $booking->pickup_time,
                        'return_date' => $booking->return_date,
                        'return_time' => $booking->return_time,
                        'passengers' => $booking->passengers,
                        'vehicle_type' => $booking->vehicle_type,
                        'payment_status' => $booking->payment_status,
                    ];
                });
            
            // Get bookings by status
            $bookingsByStatus = Booking::select('status', DB::raw('count(*) as count'))
                ->groupBy('status')
                ->get()
                ->map(function ($item) {
                    return [
                        'status' => $item->status ?? 'unknown',
                        'count' => (int)$item->count,
                    ];
                })
                ->values()
                ->toArray();
            
            // Get user growth data (last 30 days)
            $userGrowth = User::select(
                    DB::raw('DATE(created_at) as date'),
                    DB::raw('COUNT(*) as count')
                )
                ->where('created_at', '>=', now()->subDays(30)->startOfDay())
                ->groupBy('date')
                ->orderBy('date', 'asc')
                ->get()
                ->map(function ($item) {
                    return [
                        'date' => $item->date,
                        'count' => $item->count,
                    ];
                });
            
            // Get booking revenue - handle null values properly
            $totalRevenue = Booking::where('status', 'completed')
                ->sum(DB::raw('COALESCE(total_amount, estimated_fare, 0)')) ?? 0;
            
            $monthlyRevenue = Booking::where('status', 'completed')
                ->where('created_at', '>=', now()->startOfMonth())
                ->sum(DB::raw('COALESCE(total_amount, estimated_fare, 0)')) ?? 0;
            
            // Get top users by bookings
            $topUsers = User::withCount('bookings')
                ->having('bookings_count', '>', 0)
                ->orderBy('bookings_count', 'desc')
                ->limit(5)
                ->get(['id', 'name', 'email', 'role', 'avatar'])
                ->map(function ($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'role' => $user->role,
                        'avatar_url' => $user->avatar_url,
                        'bookings_count' => $user->bookings_count,
                    ];
                });
            
            return Inertia::render('admin/dashboard', [
                'stats' => [
                    'totalUsers' => $totalUsers,
                    'totalCustomers' => $totalCustomers,
                    'totalDrivers' => $totalDrivers,
                    'totalAdmins' => $totalAdmins,
                    'totalBookings' => $totalBookings,
                    'pendingBookings' => $pendingBookings,
                    'completedBookings' => $completedBookings,
                    'cancelledBookings' => $cancelledBookings,
                    'totalRevenue' => round($totalRevenue, 2),
                    'monthlyRevenue' => round($monthlyRevenue, 2),
                    'pendingVerifications' => $pendingVerifications,
                    'approvedVerifications' => $approvedVerifications,
                    'rejectedVerifications' => $rejectedVerifications,
                ],
                'recentUsers' => $recentUsers,
                'newUsers' => $newUsers,
                'recentBookings' => $recentBookings,
                'allCustomerBookings' => $allCustomerBookings,
                'bookingsByStatus' => $bookingsByStatus,
                'userGrowth' => $userGrowth,
                'topUsers' => $topUsers,
            ]);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Admin Dashboard Error: ' . $e->getMessage(), [
                'trace' => $e->getTraceAsString()
            ]);
            
            // Return a simplified error view or redirect
            return Inertia::render('admin/dashboard', [
                'error' => 'An error occurred while loading the dashboard. Please check the logs.',
                'stats' => [
                    'totalUsers' => 0,
                    'totalCustomers' => 0,
                    'totalDrivers' => 0,
                    'totalAdmins' => 0,
                    'totalBookings' => 0,
                    'pendingBookings' => 0,
                    'completedBookings' => 0,
                    'cancelledBookings' => 0,
                    'totalRevenue' => 0,
                    'monthlyRevenue' => 0,
                    'pendingVerifications' => 0,
                    'approvedVerifications' => 0,
                    'rejectedVerifications' => 0,
                ],
                'recentUsers' => [],
                'newUsers' => [],
                'recentBookings' => [],
                'allCustomerBookings' => [],
                'bookingsByStatus' => [],
                'userGrowth' => [],
                'topUsers' => [],
            ]);
        }
    }
}

