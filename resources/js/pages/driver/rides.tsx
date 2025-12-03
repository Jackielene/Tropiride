import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Phone, Car, ArrowLeft, Navigation } from 'lucide-react';
import { useState } from 'react';
import GpsTrackingCard from '@/components/driver/GpsTrackingCard';

interface Customer {
    id: number;
    name: string;
    email?: string;
    phone?: string;
}

interface Booking {
    id: number;
    user_id: number;
    driver_id?: number;
    customer?: Customer | null;
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
    pickup_date?: string;
    pickup_time?: string;
    passengers?: number;
    vehicle_type?: string;
}

interface Props {
    assignedBookings: Booking[];
    driver: {
        id: number;
        name: string;
    };
}

export default function DriverRides({ assignedBookings = [], driver }: Props) {
    const [isUpdating, setIsUpdating] = useState<number | null>(null);
    const [statusModal, setStatusModal] = useState<{ bookingId: number; status: 'in_progress' | 'completed' } | null>(null);
    const [activeTrackingBookingId, setActiveTrackingBookingId] = useState<number | null>(null);

    // Find active bookings (accepted or in_progress) for GPS tracking
    const activeBookings = assignedBookings.filter(b => 
        b.status === 'accepted' || b.status === 'in_progress'
    );

    const getInitials = (name: string) =>
        name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);

    const formatCurrency = (amount: number) =>
        new Intl.NumberFormat('en-PH', {
            style: 'currency',
            currency: 'PHP',
        }).format(amount);

    const getStatusBadgeVariant = (status: string) => {
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
    };

    const handleUpdateStatus = (bookingId: number, newStatus: 'in_progress' | 'completed') => {
        setIsUpdating(bookingId);
        router.patch(
            `/driver/bookings/${bookingId}/status`,
            { status: newStatus },
            {
                preserveScroll: true,
                onFinish: () => {
                    setIsUpdating(null);
                },
            }
        );
    };

    const handleConfirmStatus = () => {
        if (!statusModal) return;
        handleUpdateStatus(statusModal.bookingId, statusModal.status);
        setStatusModal(null);
    };

    return (
        <AppLayout>
            <Head title="My Rides - Driver" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-hidden p-4 md:p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-primary uppercase tracking-wide">My Rides</p>
                        <h1 className="text-3xl font-bold tracking-tight">Assigned Bookings</h1>
                        <p className="text-muted-foreground mt-1">
                            Manage every ride you’ve accepted and keep an eye on their status.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/driver/dashboard">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Dashboard
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href="/driver/messages">Go to Messages</Link>
                        </Button>
                    </div>
                </div>

                {/* GPS Tracking Section */}
                {activeBookings.length > 0 && (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <div className="md:col-span-1">
                            <GpsTrackingCard 
                                bookingId={activeTrackingBookingId || activeBookings[0]?.id || null}
                                isActiveRide={activeBookings.length > 0}
                                onTrackingChange={(isTracking) => {
                                    if (isTracking && activeBookings.length > 0) {
                                        setActiveTrackingBookingId(activeBookings[0].id);
                                    } else {
                                        setActiveTrackingBookingId(null);
                                    }
                                }}
                            />
                        </div>
                        <div className="md:col-span-1 lg:col-span-2">
                            <Card className="h-full">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-2 text-base">
                                        <Navigation className="h-5 w-5 text-primary" />
                                        Active Rides for Tracking
                                    </CardTitle>
                                    <CardDescription>
                                        Select which ride to share your GPS location with
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {activeBookings.map((booking) => (
                                            <button
                                                key={booking.id}
                                                onClick={() => setActiveTrackingBookingId(booking.id)}
                                                className={`w-full text-left p-3 rounded-lg border transition-all ${
                                                    activeTrackingBookingId === booking.id
                                                        ? 'border-primary bg-primary/5 shadow-sm'
                                                        : 'border-muted hover:border-primary/50'
                                                }`}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <p className="font-medium text-sm">
                                                            #{booking.id} - {booking.customer?.name || 'Unknown'}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground truncate max-w-[250px]">
                                                            {booking.pickup_location}
                                                        </p>
                                                    </div>
                                                    <Badge variant={booking.status === 'in_progress' ? 'default' : 'secondary'}>
                                                        {booking.status.replace('_', ' ')}
                                                    </Badge>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Car className="h-5 w-5 text-primary" />
                            My Rides
                        </CardTitle>
                        <CardDescription>
                            {assignedBookings.length
                                ? `You currently have ${assignedBookings.length} ride${assignedBookings.length > 1 ? 's' : ''}.`
                                : 'No rides assigned yet. Accept bookings to start driving.'}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        {assignedBookings.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-muted/40">
                                        <tr>
                                            <th className="text-left p-4 font-semibold text-xs uppercase text-muted-foreground">
                                                Customer
                                            </th>
                                            <th className="text-left p-4 font-semibold text-xs uppercase text-muted-foreground">
                                                Route
                                            </th>
                                            <th className="text-left p-4 font-semibold text-xs uppercase text-muted-foreground">
                                                Vehicle
                                            </th>
                                            <th className="text-left p-4 font-semibold text-xs uppercase text-muted-foreground">
                                                Schedule
                                            </th>
                                            <th className="text-left p-4 font-semibold text-xs uppercase text-muted-foreground">
                                                Fare
                                            </th>
                                            <th className="text-left p-4 font-semibold text-xs uppercase text-muted-foreground">
                                                Status
                                            </th>
                                            <th className="text-left p-4 font-semibold text-xs uppercase text-muted-foreground">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assignedBookings.map((booking) => (
                                            <tr key={booking.id} className="border-b hover:bg-muted/30 transition-colors">
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <Avatar className="h-10 w-10 border-2">
                                                            <AvatarImage
                                                                src={
                                                                    booking.customer?.email
                                                                        ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                                                              booking.customer.name,
                                                                          )}&background=0ea5e9&color=fff`
                                                                        : undefined
                                                                }
                                                            />
                                                            <AvatarFallback>
                                                                {getInitials(booking.customer?.name || 'Unknown')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium text-sm">{booking.customer?.name || 'Unknown'}</p>
                                                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                                                                <Phone className="h-3 w-3" />
                                                                {booking.customer?.phone ?? 'No phone'}
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
                                                            <p className="text-sm truncate text-muted-foreground">
                                                                {booking.dropoff_location}
                                                            </p>
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
                                                                    year: 'numeric',
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
                                                    <Badge variant={getStatusBadgeVariant(booking.status)} className="text-xs capitalize">
                                                        {booking.status.replace('_', ' ')}
                                                    </Badge>
                                                </td>
                                                <td className="p-4">
                                                    <div className="flex gap-2">
                                                        {booking.status === 'pending' && (
                                                            <Button
                                                                size="sm"
                                                                variant="outline"
                                                                onClick={() => setStatusModal({ bookingId: booking.id, status: 'in_progress' })}
                                                                disabled={isUpdating === booking.id}
                                                            >
                                                                Start
                                                            </Button>
                                                        )}
                                                        {booking.status === 'in_progress' && (
                                                            <Button
                                                                size="sm"
                                                                onClick={() => setStatusModal({ bookingId: booking.id, status: 'completed' })}
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
                                <p className="text-sm text-muted-foreground mt-1">
                                    Once you accept a booking, it will appear here.
                                </p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            <Dialog open={!!statusModal} onOpenChange={(open) => !open && setStatusModal(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Update Ride Status</DialogTitle>
                        <DialogDescription>
                            {statusModal?.status === 'in_progress'
                                ? 'Move this booking to In Progress? Customers will see that you have started the trip.'
                                : 'Mark this booking as completed? This will finish the ride and archive it.'}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button variant="outline" onClick={() => setStatusModal(null)}>
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmStatus} disabled={isUpdating === statusModal?.bookingId}>
                            {isUpdating === statusModal?.bookingId ? 'Updating...' : 'Confirm'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}

