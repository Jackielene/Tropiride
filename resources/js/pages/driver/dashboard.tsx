import AppLayout from '@/layouts/app-layout';
import { Head, router, usePage } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
    Car, 
    Clock, 
    CheckCircle, 
    XCircle, 
    TrendingUp,
    Calendar,
    MapPin,
    Activity,
    Wallet,
    Users,
    Navigation,
    Phone,
    Mail,
    Package,
    AlertCircle,
    Upload,
    User,
    CreditCard,
    Home,
    Hash
} from 'lucide-react';
import { useState } from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    description?: string;
    icon: React.ComponentType<{ className?: string }>;
    color?: 'default' | 'blue' | 'green' | 'orange' | 'purple';
}

function StatCard({ title, value, description, icon: Icon, color = 'default' }: StatCardProps) {
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
                    <p className="text-xs text-muted-foreground">{description}</p>
                )}
            </CardContent>
        </Card>
    );
}

function getStatusBadgeVariant(status: string) {
    switch (status) {
        case 'completed':
            return 'default';
        case 'pending':
            return 'secondary';
        case 'in_progress':
            return 'outline';
        case 'cancelled':
            return 'destructive';
        default:
            return 'outline';
    }
}

interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
}

interface Booking {
    id: number;
    user_id: number;
    driver_id?: number;
    customer?: Customer;
    pickup_location: string;
    dropoff_location: string;
    pickup_lat?: number;
    pickup_lng?: number;
    dropoff_lat?: number;
    dropoff_lng?: number;
    status: string;
    estimated_fare?: number;
    total_amount?: number;
    distance_km?: number;
    created_at: string;
    updated_at?: string;
    requested_at?: string;
    pickup_date?: string;
    pickup_time?: string;
    return_date?: string;
    return_time?: string;
    passengers?: number;
    vehicle_type?: string;
    payment_status?: string;
    notes?: string;
    special_requests?: string;
}

interface Driver {
    id: number;
    name: string;
    email: string;
    phone?: string;
    age?: number;
    address?: string;
    avatar?: string;
    avatar_url?: string;
    profile_completed: boolean;
    verification_status: 'pending' | 'approved' | 'rejected';
    driver_license_front?: string;
    driver_license_back?: string;
    driver_license_front_url?: string;
    driver_license_back_url?: string;
    verified_at?: string;
    rejection_reason?: string;
    is_profile_ready: boolean;
    is_verified: boolean;
    has_completed_profile: boolean;
    is_verification_pending: boolean;
    is_verification_rejected: boolean;
}

interface Props {
    stats: {
        totalRides: number;
        completedRides: number;
        pendingRides: number;
        cancelledRides: number;
        totalEarnings: number;
        todayEarnings: number;
        availableRides: number;
    };
    assignedBookings: Booking[];
    availableBookings: Booking[];
    driver: Driver;
}

export default function DriverDashboard({
    stats,
    assignedBookings = [],
    availableBookings = [],
    driver,
}: Props) {
    const { flash } = usePage().props as any;
    const [isAccepting, setIsAccepting] = useState<number | null>(null);
    const [isUpdating, setIsUpdating] = useState<number | null>(null);
    const [profileData, setProfileData] = useState({
        name: driver.name || '',
        email: driver.email || '',
        phone: driver.phone || '',
        age: driver.age || '',
        address: driver.address || '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    const handleAcceptBooking = (bookingId: number) => {
        if (confirm('Are you sure you want to accept this booking?')) {
            setIsAccepting(bookingId);
            router.post(
                `/driver/bookings/${bookingId}/accept`,
                {},
                {
                    preserveScroll: true,
                    onFinish: () => setIsAccepting(null),
                }
            );
        }
    };

    const handleUpdateStatus = (bookingId: number, newStatus: string) => {
        if (confirm(`Update booking status to "${newStatus}"?`)) {
            setIsUpdating(bookingId);
            router.patch(
                `/driver/bookings/${bookingId}/status`,
                { status: newStatus },
                {
                    preserveScroll: true,
                    onFinish: () => setIsUpdating(null),
                }
            );
        }
    };

    const handleProfileUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        router.patch('/driver/profile', profileData, {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Profile updated successfully');
            },
            onError: (errors) => {
                console.error('Profile update errors:', errors);
            },
            onFinish: () => setIsSubmitting(false),
        });
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'license_front' | 'license_back') => {
        const file = e.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        if (type === 'avatar') {
            formData.append('avatar', file);
            router.post('/driver/profile/avatar', formData, {
                preserveScroll: true,
            });
        } else if (type === 'license_front') {
            formData.append('license_front', file);
            router.post('/driver/profile/license-front', formData, {
                preserveScroll: true,
            });
        } else if (type === 'license_back') {
            formData.append('license_back', file);
            router.post('/driver/profile/license-back', formData, {
                preserveScroll: true,
            });
        }
    };

    const handleResubmitVerification = () => {
        if (confirm('Resubmit your profile for verification?')) {
            router.post('/driver/profile/resubmit-verification');
        }
    };

    return (
        <AppLayout>
            <Head title="Driver Dashboard - Tropiride" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                            Driver Dashboard
                        </h1>
                        <p className="text-muted-foreground mt-2 flex items-center gap-2">
                            <Car className="h-4 w-4 text-primary" />
                            Welcome back, {driver.name}!
                        </p>
                    </div>
                    {stats.availableRides > 0 && (
                        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                            <AlertCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                            <div>
                                <p className="font-semibold text-green-900 dark:text-green-100">{stats.availableRides} Available Rides</p>
                                <p className="text-xs text-green-700 dark:text-green-300">Ready to accept</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-4">
                        <p className="text-green-800 dark:text-green-200">{flash.success}</p>
                    </div>
                )}
                {flash?.error && (
                    <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4">
                        <p className="text-red-800 dark:text-red-200">{flash.error}</p>
                    </div>
                )}
                {flash?.status && (
                    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <p className="text-blue-800 dark:text-blue-200">{flash.status}</p>
                    </div>
                )}
                {flash?.warning && (
                    <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <p className="text-yellow-800 dark:text-yellow-200">{flash.warning}</p>
                    </div>
                )}
                {flash?.info && (
                    <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                        <p className="text-blue-800 dark:text-blue-200">{flash.info}</p>
                    </div>
                )}

                {/* PROFILE COMPLETION & VERIFICATION STATUS */}
                {!driver.is_verified && (
                    <Card className={`shadow-lg border-2 ${
                        driver.is_verification_rejected ? 'border-red-300 dark:border-red-800' :
                        driver.is_verification_pending ? 'border-blue-300 dark:border-blue-800' :
                        'border-yellow-300 dark:border-yellow-800'
                    }`}>
                        <CardHeader className={`${
                            driver.is_verification_rejected ? 'bg-red-50 dark:bg-red-950' :
                            driver.is_verification_pending ? 'bg-blue-50 dark:bg-blue-950' :
                            'bg-yellow-50 dark:bg-yellow-950'
                        }`}>
                            <CardTitle className="flex items-center gap-3 text-xl">
                                {driver.is_verification_rejected && <XCircle className="h-6 w-6 text-red-600" />}
                                {driver.is_verification_pending && <Clock className="h-6 w-6 text-blue-600" />}
                                {!driver.has_completed_profile && <AlertCircle className="h-6 w-6 text-yellow-600" />}
                                
                                {driver.is_verification_rejected && 'Verification Rejected'}
                                {driver.is_verification_pending && 'Verification Pending'}
                                {!driver.has_completed_profile && 'Complete Your Profile'}
                            </CardTitle>
                            <CardDescription>
                                {driver.is_verification_rejected && 'Your verification was rejected. Please review and resubmit.'}
                                {driver.is_verification_pending && 'Your profile is being reviewed by our admin team.'}
                                {!driver.has_completed_profile && 'Complete all required fields to start accepting rides.'}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                            {/* Rejection Reason */}
                            {driver.is_verification_rejected && driver.rejection_reason && (
                                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 rounded-lg">
                                    <p className="font-semibold text-red-900 dark:text-red-100 mb-2">Rejection Reason:</p>
                                    <p className="text-red-800 dark:text-red-200">{driver.rejection_reason}</p>
                                </div>
                            )}

                            {/* Pending Message */}
                            {driver.is_verification_pending && (
                                <div className="mb-6 p-4 bg-blue-100 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded-lg">
                                    <p className="text-blue-800 dark:text-blue-200">
                                        Our admin team will review your documents shortly. You'll be able to accept rides once approved.
                                    </p>
                                </div>
                            )}

                            {/* Profile Checklist - Always show when not verified */}
                            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <h3 className="font-semibold mb-3">Required Information:</h3>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        {driver.name && driver.name.trim() !== '' ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-gray-400" />}
                                        <span className={driver.name && driver.name.trim() !== '' ? 'text-green-700 dark:text-green-400' : 'text-gray-600'}>Full Name</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {driver.age !== null && driver.age !== undefined && driver.age >= 18 ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-gray-400" />}
                                        <span className={driver.age !== null && driver.age !== undefined && driver.age >= 18 ? 'text-green-700 dark:text-green-400' : 'text-gray-600'}>Age (18+)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {driver.phone && driver.phone.trim() !== '' ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-gray-400" />}
                                        <span className={driver.phone && driver.phone.trim() !== '' ? 'text-green-700 dark:text-green-400' : 'text-gray-600'}>Phone Number</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {driver.address && driver.address.trim() !== '' ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-gray-400" />}
                                        <span className={driver.address && driver.address.trim() !== '' ? 'text-green-700 dark:text-green-400' : 'text-gray-600'}>Address</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {driver.avatar && driver.avatar.trim() !== '' ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-gray-400" />}
                                        <span className={driver.avatar && driver.avatar.trim() !== '' ? 'text-green-700 dark:text-green-400' : 'text-gray-600'}>Profile Picture</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {driver.driver_license_front && driver.driver_license_front.trim() !== '' ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-gray-400" />}
                                        <span className={driver.driver_license_front && driver.driver_license_front.trim() !== '' ? 'text-green-700 dark:text-green-400' : 'text-gray-600'}>Driver's License (Front)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {driver.driver_license_back && driver.driver_license_back.trim() !== '' ? <CheckCircle className="h-4 w-4 text-green-600" /> : <XCircle className="h-4 w-4 text-gray-400" />}
                                        <span className={driver.driver_license_back && driver.driver_license_back.trim() !== '' ? 'text-green-700 dark:text-green-400' : 'text-gray-600'}>Driver's License (Back)</span>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Form - Always show when not verified (allow editing even when pending) */}
                            <div>
                                <form onSubmit={handleProfileUpdate} className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Full Name *</label>
                                            <input
                                                type="text"
                                                value={profileData.name}
                                                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                className="w-full px-3 py-2 border rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Email *</label>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                className="w-full px-3 py-2 border rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Age *</label>
                                            <input
                                                type="number"
                                                min="18"
                                                max="100"
                                                value={profileData.age}
                                                onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                                                className="w-full px-3 py-2 border rounded-md"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-2">Phone Number *</label>
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                className="w-full px-3 py-2 border rounded-md"
                                                required
                                            />
                                        </div>
                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium mb-2">Address *</label>
                                            <input
                                                type="text"
                                                value={profileData.address}
                                                onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                                                className="w-full px-3 py-2 border rounded-md"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Saving...' : 'Save Profile'}
                                    </Button>
                                </form>
                            </div>

                            {/* File Uploads - Always show when not verified (allow editing even when pending) */}
                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                    {/* Avatar Upload */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Profile Picture *</label>
                                        {driver.avatar_url ? (
                                            <div className="relative">
                                                <img src={driver.avatar_url} alt="Avatar" className="w-full h-32 object-cover rounded-md" />
                                                <label className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 px-3 py-1 rounded shadow cursor-pointer hover:bg-gray-50">
                                                    Change
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileUpload(e, 'avatar')}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                        ) : (
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-accent/50">
                                                <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                                <span className="text-sm text-muted-foreground">Upload Photo</span>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => handleFileUpload(e, 'avatar')}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>

                                    {/* License Front Upload */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">License Front *</label>
                                        {driver.driver_license_front_url ? (
                                            <div className="relative">
                                                <img src={driver.driver_license_front_url} alt="License Front" className="w-full h-32 object-cover rounded-md" />
                                                <label className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 px-3 py-1 rounded shadow cursor-pointer hover:bg-gray-50">
                                                    Change
                                                    <input
                                                        type="file"
                                                        accept="image/*,application/pdf"
                                                        onChange={(e) => handleFileUpload(e, 'license_front')}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                        ) : (
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-accent/50">
                                                <CreditCard className="h-8 w-8 text-muted-foreground mb-2" />
                                                <span className="text-sm text-muted-foreground">Upload Front</span>
                                                <input
                                                    type="file"
                                                    accept="image/*,application/pdf"
                                                    onChange={(e) => handleFileUpload(e, 'license_front')}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>

                                    {/* License Back Upload */}
                                    <div>
                                        <label className="block text-sm font-medium mb-2">License Back *</label>
                                        {driver.driver_license_back_url ? (
                                            <div className="relative">
                                                <img src={driver.driver_license_back_url} alt="License Back" className="w-full h-32 object-cover rounded-md" />
                                                <label className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 px-3 py-1 rounded shadow cursor-pointer hover:bg-gray-50">
                                                    Change
                                                    <input
                                                        type="file"
                                                        accept="image/*,application/pdf"
                                                        onChange={(e) => handleFileUpload(e, 'license_back')}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                        ) : (
                                            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer hover:bg-accent/50">
                                                <CreditCard className="h-8 w-8 text-muted-foreground mb-2" />
                                                <span className="text-sm text-muted-foreground">Upload Back</span>
                                                <input
                                                    type="file"
                                                    accept="image/*,application/pdf"
                                                    onChange={(e) => handleFileUpload(e, 'license_back')}
                                                    className="hidden"
                                                />
                                            </label>
                                        )}
                                    </div>
                                </div>

                            {/* Note about editing while pending */}
                            {driver.is_verification_pending && (
                                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 border border-blue-300 dark:border-blue-700 rounded-lg">
                                    <p className="text-sm text-blue-800 dark:text-blue-200">
                                        💡 You can edit your profile while your verification is pending. Any changes will be reviewed by admin.
                                    </p>
                                </div>
                            )}

                            {/* Resubmit Button - Only for rejected profiles */}
                            {driver.is_verification_rejected && (
                                <div className="mt-6">
                                    <Button 
                                        onClick={handleResubmitVerification} 
                                        className="bg-orange-600 hover:bg-orange-700"
                                        disabled={!driver.is_profile_ready}
                                    >
                                        {driver.is_profile_ready ? 'Resubmit for Verification' : 'Complete Profile First'}
                                    </Button>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Verified Badge */}
                {driver.is_verified && (
                    <Card className="shadow-lg border-2 border-green-300 dark:border-green-800 bg-green-50 dark:bg-green-950">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                                <div>
                                    <h3 className="font-bold text-green-900 dark:text-green-100 text-lg">✅ Verified Driver</h3>
                                    <p className="text-green-700 dark:text-green-300">You're approved! You can now accept ride requests.</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Statistics Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Rides"
                        value={stats.totalRides}
                        description={`${stats.completedRides} completed`}
                        icon={Car}
                        color="blue"
                    />
                    <StatCard
                        title="Pending Rides"
                        value={stats.pendingRides}
                        description="Awaiting completion"
                        icon={Clock}
                        color="orange"
                    />
                    <StatCard
                        title="Total Earnings"
                        value={formatCurrency(stats.totalEarnings)}
                        description={`${formatCurrency(stats.todayEarnings)} today`}
                        icon={Wallet}
                        color="green"
                    />
                    <StatCard
                        title="Available Rides"
                        value={stats.availableRides}
                        description="Ready to accept"
                        icon={Package}
                        color="purple"
                    />
                </div>

                {/* Available Bookings - Main Focus */}
                {availableBookings.length > 0 && (
                    <Card className="shadow-lg">
                        <CardHeader className="border-b bg-gradient-to-r from-background to-muted/20">
                            <CardTitle className="flex items-center gap-3 text-xl">
                                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                                    <Package className="h-5 w-5 text-green-600 dark:text-green-400" />
                                </div>
                                Available Rides
                            </CardTitle>
                            <CardDescription>
                                New ride requests ready for you to accept
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-muted/30">
                                        <tr>
                                            <th className="text-left p-4 font-semibold text-sm">Customer</th>
                                            <th className="text-left p-4 font-semibold text-sm">Route</th>
                                            <th className="text-left p-4 font-semibold text-sm">Vehicle</th>
                                            <th className="text-left p-4 font-semibold text-sm">Schedule</th>
                                            <th className="text-left p-4 font-semibold text-sm">Fare</th>
                                            <th className="text-left p-4 font-semibold text-sm">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {availableBookings.map((booking) => (
                                            <tr key={booking.id} className="border-b hover:bg-accent/50 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10 border-2">
                                                            <AvatarImage src={booking.customer?.email ? `https://ui-avatars.com/api/?name=${encodeURIComponent(booking.customer.name)}&background=0ea5e9&color=fff` : undefined} />
                                                            <AvatarFallback>{getInitials(booking.customer?.name || 'Unknown')}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium text-sm">{booking.customer?.name || 'Unknown'}</p>
                                                            <p className="text-xs text-muted-foreground">{booking.customer?.phone}</p>
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
                                                    {booking.vehicle_type && (
                                                        <Badge variant="outline" className="text-xs capitalize">
                                                            {booking.vehicle_type}
                                                        </Badge>
                                                    )}
                                                    {booking.passengers && (
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {booking.passengers} pax
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    {booking.pickup_date && (
                                                        <div className="text-sm">
                                                            <p className="font-medium">
                                                                {new Date(booking.pickup_date).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                })}
                                                            </p>
                                                            {booking.pickup_time && (
                                                                <p className="text-xs text-muted-foreground">{booking.pickup_time}</p>
                                                            )}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <span className="font-semibold text-green-600">
                                                        {formatCurrency(booking.total_amount || booking.estimated_fare || 0)}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleAcceptBooking(booking.id)}
                                                        disabled={isAccepting === booking.id}
                                                    >
                                                        {isAccepting === booking.id ? 'Accepting...' : 'Accept'}
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Assigned Bookings */}
                <Card className="shadow-lg">
                    <CardHeader className="border-b bg-gradient-to-r from-background to-muted/20">
                        <CardTitle className="flex items-center gap-3 text-xl">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                <Car className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            My Rides
                        </CardTitle>
                        <CardDescription>
                            Your assigned bookings and their current status
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {assignedBookings.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-muted/30">
                                        <tr>
                                            <th className="text-left p-4 font-semibold text-sm">Customer</th>
                                            <th className="text-left p-4 font-semibold text-sm">Route</th>
                                            <th className="text-left p-4 font-semibold text-sm">Vehicle</th>
                                            <th className="text-left p-4 font-semibold text-sm">Schedule</th>
                                            <th className="text-left p-4 font-semibold text-sm">Fare</th>
                                            <th className="text-left p-4 font-semibold text-sm">Status</th>
                                            <th className="text-left p-4 font-semibold text-sm">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assignedBookings.map((booking) => (
                                            <tr key={booking.id} className="border-b hover:bg-accent/50 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10 border-2">
                                                            <AvatarImage src={booking.customer?.email ? `https://ui-avatars.com/api/?name=${encodeURIComponent(booking.customer.name)}&background=0ea5e9&color=fff` : undefined} />
                                                            <AvatarFallback>{getInitials(booking.customer?.name || 'Unknown')}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium text-sm">{booking.customer?.name || 'Unknown'}</p>
                                                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                                <Phone className="h-3 w-3" />
                                                                {booking.customer?.phone}
                                                            </p>
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
                                                    {booking.vehicle_type && (
                                                        <Badge variant="outline" className="text-xs capitalize">
                                                            {booking.vehicle_type}
                                                        </Badge>
                                                    )}
                                                    {booking.passengers && (
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            {booking.passengers} pax
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    {booking.pickup_date && (
                                                        <div className="text-sm">
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
                                                    )}
                                                </td>
                                                <td className="p-4">
                                                    <span className="font-semibold">
                                                        {formatCurrency(booking.total_amount || booking.estimated_fare || 0)}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <Badge variant={getStatusBadgeVariant(booking.status)} className="text-xs">
                                                        {booking.status}
                                                    </Badge>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex gap-2">
                                                        {booking.status === 'pending' && (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => handleUpdateStatus(booking.id, 'in_progress')}
                                                                disabled={isUpdating === booking.id}
                                                            >
                                                                Start
                                                            </Button>
                                                        )}
                                                        {booking.status === 'in_progress' && (
                                                            <Button
                                                                size="sm"
                                                                onClick={() => handleUpdateStatus(booking.id, 'completed')}
                                                                disabled={isUpdating === booking.id}
                                                            >
                                                                Complete
                                                            </Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                                <p className="text-muted-foreground font-medium">No assigned rides yet</p>
                                <p className="text-sm text-muted-foreground mt-1">Accept available rides to start earning</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}

