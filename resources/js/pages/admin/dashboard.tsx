import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
    Users, 
    UserCheck, 
    UserCog, 
    ShoppingBag, 
    Clock, 
    CheckCircle, 
    XCircle, 
    TrendingUp,
    Calendar,
    MapPin,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    Activity,
    Wallet
} from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: React.ComponentType<{ className?: string }>;
    trend?: string;
    trendType?: 'up' | 'down';
    color?: 'default' | 'blue' | 'green' | 'orange' | 'purple';
}

function StatCard({ title, value, description, icon: Icon, trend, trendType, color = 'default' }: StatCardProps) {
    const colorClasses = {
        default: 'bg-card',
        blue: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800',
        green: 'bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800',
        orange: 'bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800',
        purple: 'bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800',
    };

    const iconColors = {
        default: 'text-muted-foreground',
        blue: 'text-blue-600 dark:text-blue-400',
        green: 'text-green-600 dark:text-green-400',
        orange: 'text-orange-600 dark:text-orange-400',
        purple: 'text-purple-600 dark:text-purple-400',
    };

    return (
        <Card className={`${colorClasses[color]} transition-all hover:shadow-lg`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
                <div className={`p-2 rounded-lg bg-background/50 ${color !== 'default' && 'shadow-sm'}`}>
                    <Icon className={`h-5 w-5 ${iconColors[color]}`} />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold mb-1">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground mb-2">{description}</p>
                )}
                {trend && (
                    <div className={`flex items-center text-xs font-medium mt-2 ${
                        trendType === 'up' ? 'text-green-600 dark:text-green-400' : 
                        trendType === 'down' ? 'text-red-600 dark:text-red-400' : 
                        'text-muted-foreground'
                    }`}>
                        {trendType === 'up' ? (
                            <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : trendType === 'down' ? (
                            <ArrowDownRight className="h-3 w-3 mr-1" />
                        ) : (
                            <Activity className="h-3 w-3 mr-1" />
                        )}
                        {trend}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

function getRoleBadgeVariant(role: string) {
    switch (role) {
        case 'admin':
            return 'destructive';
        case 'driver':
            return 'secondary';
        case 'customer':
        default:
            return 'default';
    }
}

function getStatusBadgeVariant(status: string) {
    switch (status) {
        case 'completed':
            return 'default';
        case 'pending':
            return 'secondary';
        case 'cancelled':
            return 'destructive';
        default:
            return 'outline';
    }
}

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    created_at: string;
    avatar_url?: string;
}

interface Booking {
    id: number;
    user_id: number;
    user?: {
        id: number;
        name: string;
        email: string;
        role: string;
    };
    pickup_location: string;
    dropoff_location: string;
    status: string;
    estimated_fare?: number;
    total_amount?: number;
    distance_km?: number;
    created_at: string;
    updated_at: string;
    requested_at?: string;
    pickup_date?: string;
    pickup_time?: string;
    return_date?: string;
    return_time?: string;
    passengers?: number;
    payment_status?: string;
}

interface Props {
    stats: {
        totalUsers: number;
        totalCustomers: number;
        totalDrivers: number;
        totalAdmins: number;
        totalBookings: number;
        pendingBookings: number;
        completedBookings: number;
        cancelledBookings: number;
        totalRevenue: number;
        monthlyRevenue: number;
    };
    recentUsers: User[];
    newUsers: User[];
    recentBookings: Booking[];
    allCustomerBookings: Booking[];
    bookingsByStatus: Array<{ status: string; count: number }>;
    userGrowth: Array<{ date: string; count: number }>;
    topUsers: Array<{ id: number; name: string; email: string; role: string; avatar_url?: string; bookings_count: number }>;
}

export default function AdminDashboard({
    stats = {
        totalUsers: 0,
        totalCustomers: 0,
        totalDrivers: 0,
        totalAdmins: 0,
        totalBookings: 0,
        pendingBookings: 0,
        completedBookings: 0,
        cancelledBookings: 0,
        totalRevenue: 0,
        monthlyRevenue: 0,
    },
    recentUsers = [],
    newUsers = [],
    recentBookings = [],
    allCustomerBookings = [],
    bookingsByStatus = [],
    userGrowth = [],
    topUsers = [],
}: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const pendingBookings = allCustomerBookings.filter(b => b.status === 'pending').length;
    const completedBookingsCount = allCustomerBookings.filter(b => b.status === 'completed').length;

    return (
        <AppLayout>
            <Head title="Tropiride Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4 md:p-6">
                {/* Enhanced Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                            Tropiride Admin Dashboard
                        </h1>
                        <p className="text-muted-foreground mt-2 flex items-center gap-2">
                            <Activity className="h-4 w-4 text-primary" />
                            Manage your ride-booking platform
                        </p>
                    </div>
                    {pendingBookings > 0 && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                            <div>
                                <p className="font-semibold text-orange-900 dark:text-orange-100">{pendingBookings} Pending Bookings</p>
                                <p className="text-xs text-orange-700 dark:text-orange-300">Requires attention</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Enhanced Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Users"
                        value={stats.totalUsers}
                        description={`${stats.totalCustomers} customers, ${stats.totalDrivers} drivers`}
                        icon={Users}
                        color="blue"
                    />
                    <StatCard
                        title="Total Bookings"
                        value={stats.totalBookings}
                        description={`${stats.pendingBookings} pending, ${stats.completedBookings} completed`}
                        icon={ShoppingBag}
                        color="purple"
                        trend={stats.totalBookings > 0 ? `${((stats.completedBookings / stats.totalBookings) * 100).toFixed(0)}% completed` : 'No bookings yet'}
                        trendType={stats.totalBookings > 0 && stats.completedBookings > stats.pendingBookings ? 'up' : stats.totalBookings > 0 ? 'down' : undefined}
                    />
                    <StatCard
                        title="Total Revenue"
                        value={formatCurrency(stats.totalRevenue)}
                        description={`${formatCurrency(stats.monthlyRevenue)} this month`}
                        icon={Wallet}
                        color="green"
                        trend={`${formatCurrency(stats.monthlyRevenue)} this month`}
                        trendType="up"
                    />
                    <StatCard
                        title="Administrators"
                        value={stats.totalAdmins}
                        description="Administrator accounts"
                        icon={UserCog}
                        color="orange"
                    />
                </div>

                {/* Booking Status Quick View */}
                {bookingsByStatus.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-4">
                        {bookingsByStatus.map((status) => (
                            <Card key={status.status} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1 capitalize">{status.status}</p>
                                            <p className="text-2xl font-bold">{status.count}</p>
                                        </div>
                                        <Badge variant={getStatusBadgeVariant(status.status)} className="text-xs">
                                            {status.status}
                                        </Badge>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* All Customer Bookings - Enhanced Main Focus */}
                <Card className="shadow-lg">
                    <CardHeader className="border-b bg-gradient-to-r from-background to-muted/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="flex items-center gap-3 text-xl">
                                    <div className="p-2 bg-primary/10 rounded-lg">
                                        <ShoppingBag className="h-5 w-5 text-primary" />
                                    </div>
                            All Customer Booking Requests
                                </CardTitle>
                                <CardDescription className="mt-2">
                                    Complete list of all booking requests from registered customers
                                </CardDescription>
                            </div>
                            <Badge variant="outline" className="text-lg px-4 py-2">
                                {allCustomerBookings.length} Total
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        {allCustomerBookings.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-muted/30 sticky top-0">
                                        <tr>
                                            <th className="text-left p-4 font-semibold text-sm">Customer</th>
                                            <th className="text-left p-4 font-semibold text-sm">Route</th>
                                            <th className="text-left p-4 font-semibold text-sm">Schedule</th>
                                            <th className="text-left p-4 font-semibold text-sm">Amount</th>
                                            <th className="text-left p-4 font-semibold text-sm">Status</th>
                                            <th className="text-left p-4 font-semibold text-sm">Requested</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allCustomerBookings.map((booking, index) => (
                                            <tr 
                                                key={booking.id} 
                                                className={`border-b hover:bg-accent/50 transition-colors ${
                                                    index % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                                                }`}
                                            >
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10 border-2 border-background">
                                                            <AvatarImage src={booking.user?.email ? `https://ui-avatars.com/api/?name=${encodeURIComponent(booking.user.name)}&background=0ea5e9&color=fff` : undefined} />
                                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                                {getInitials(booking.user?.name || 'Unknown')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium text-sm">{booking.user?.name || 'Unknown'}</p>
                                                            <p className="text-xs text-muted-foreground">{booking.user?.email}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="space-y-1">
                                                        <div className="flex items-start gap-2 max-w-xs">
                                                            <MapPin className="h-3 w-3 text-green-600 mt-0.5 flex-shrink-0" />
                                                            <p className="text-sm truncate">{booking.pickup_location}</p>
                                                        </div>
                                                        <div className="flex items-start gap-2 max-w-xs">
                                                            <MapPin className="h-3 w-3 text-red-600 mt-0.5 flex-shrink-0" />
                                                            <p className="text-sm truncate text-muted-foreground">{booking.dropoff_location}</p>
                                                        </div>
                                                        {booking.distance_km && (
                                                            <p className="text-xs text-muted-foreground ml-5">{booking.distance_km} km</p>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="text-sm space-y-2">
                                                        {booking.pickup_date && (
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                            <div>
                                                                <p className="font-medium">
                                                                    {new Date(booking.pickup_date).toLocaleDateString('en-US', {
                                                                        month: 'short',
                                                                        day: 'numeric',
                                                                        year: 'numeric'
                                                                    })}
                                                                </p>
                                                                {booking.pickup_time && (
                                                                    <p className="text-xs text-muted-foreground">{booking.pickup_time}</p>
                                                                )}
                                                                </div>
                                                            </div>
                                                        )}
                                                        {booking.return_date && (
                                                            <div className="flex items-center gap-2 text-xs text-muted-foreground border-t pt-2 mt-2">
                                                                <ArrowUpRight className="h-3 w-3" />
                                                                <div>
                                                                Return: {new Date(booking.return_date).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric'
                                                                })}
                                                                {booking.return_time && ` ${booking.return_time}`}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="space-y-1">
                                                    {(booking.total_amount || booking.estimated_fare) && (
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold">
                                                            {formatCurrency(booking.total_amount || booking.estimated_fare || 0)}
                                                        </span>
                                                            </div>
                                                    )}
                                                    {booking.passengers && (
                                                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                                <Users className="h-3 w-3" />
                                                                {booking.passengers} passenger{booking.passengers !== 1 ? 's' : ''}
                                                            </p>
                                                    )}
                                                    </div>
                                                </td>
                                                <td className="p-4">
                                                    <div className="space-y-2">
                                                        <Badge variant={getStatusBadgeVariant(booking.status)} className="text-xs">
                                                        {booking.status}
                                                    </Badge>
                                                    {booking.payment_status && (
                                                            <div className="flex items-center gap-1">
                                                                <div className={`h-2 w-2 rounded-full ${
                                                                    booking.payment_status === 'paid' ? 'bg-green-500' : 
                                                                    booking.payment_status === 'pending' ? 'bg-yellow-500' : 
                                                                    'bg-red-500'
                                                                }`} />
                                                                <p className="text-xs text-muted-foreground capitalize">{booking.payment_status}</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-4 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                    {formatDate(booking.created_at)}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                                <p className="text-muted-foreground font-medium">No customer booking requests found</p>
                                <p className="text-sm text-muted-foreground mt-1">Booking requests will appear here once customers create them</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Two Column Layout for Additional Info */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* New Users Section - Enhanced */}
                    <Card>
                        <CardHeader className="border-b">
                            <CardTitle className="flex items-center gap-2">
                                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                    <UserCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                            </div>
                                New Users (Last 7 Days)
                            </CardTitle>
                            <CardDescription>
                                Recently registered users and their roles
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                            {newUsers.length > 0 ? (
                                <div className="space-y-3">
                                    {newUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-all hover:shadow-sm"
                                        >
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-10 w-10 border-2">
                                                    <AvatarImage src={user.avatar_url} alt={user.name} />
                                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-sm">{user.name}</p>
                                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Badge variant={getRoleBadgeVariant(user.role)}>
                                                    {user.role}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        ) : (
                                <div className="text-center py-8">
                                    <UserCheck className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-50" />
                                    <p className="text-sm text-muted-foreground">No new users in the last 7 days</p>
                    </div>
                )}
                        </CardContent>
                    </Card>

                    {/* Top Users by Bookings - Enhanced */}
                    <Card>
                        <CardHeader className="border-b">
                            <CardTitle className="flex items-center gap-2">
                                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                                    <TrendingUp className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                Top Users
                            </CardTitle>
                            <CardDescription>
                                Most active users by number of bookings
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4">
                                {topUsers.length > 0 ? (
                                <div className="space-y-3">
                                    {topUsers.map((user, index) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-all hover:shadow-sm"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                                                    index === 0 ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' :
                                                    index === 1 ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' :
                                                    index === 2 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300' :
                                                    'bg-primary/10 text-primary'
                                                }`}>
                                                    {index + 1}
                                                </div>
                                                <Avatar className="h-10 w-10 border-2">
                                                    <AvatarImage src={user.avatar_url} alt={user.name} />
                                                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium text-sm">{user.name}</p>
                                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="text-right">
                                                    <p className="font-bold text-lg">{user.bookings_count}</p>
                                                    <p className="text-xs text-muted-foreground">bookings</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <TrendingUp className="h-10 w-10 text-muted-foreground mx-auto mb-2 opacity-50" />
                                    <p className="text-sm text-muted-foreground">No booking data available</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
