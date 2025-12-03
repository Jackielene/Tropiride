import { useState, useEffect, useRef, useCallback } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import TropirideLayout from '@/layouts/tropiride-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
    MapPin, 
    Navigation, 
    Phone, 
    MessageSquare, 
    RefreshCw, 
    Car,
    Clock,
    Loader2,
    AlertCircle,
    Wifi,
    WifiOff
} from 'lucide-react';
import api from '@/lib/axios';
import { getEcho } from '@/lib/echo';
import type { SharedData } from '@/types';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom car icon for driver
const createCarIcon = (heading: number | null) => {
    return L.divIcon({
        className: 'driver-marker',
        html: `
            <div style="
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #06b6d4, #0891b2);
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                transform: rotate(${heading ?? 0}deg);
            ">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
                </svg>
            </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20],
    });
};

// Pickup marker (green)
const pickupIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// Dropoff marker (red)
const dropoffIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

interface BookingData {
    id: number;
    status: string;
    pickup_location: string;
    pickup_lat: number;
    pickup_lng: number;
    dropoff_location: string;
    dropoff_lat: number;
    dropoff_lng: number;
    vehicle_type: string;
    estimated_fare: number;
    driver: {
        id: number;
        name: string;
        phone: string;
        avatar_url: string | null;
    } | null;
}

interface DriverLocation {
    latitude: number;
    longitude: number;
    heading: number | null;
    speed: number | null;
    accuracy: number | null;
    updated_at: string;
}

interface TrackingPageProps {
    booking: BookingData;
}

// Map controller to smoothly animate to new positions
function MapController({ 
    center, 
    driverLocation,
    shouldFollow 
}: { 
    center: [number, number]; 
    driverLocation: DriverLocation | null;
    shouldFollow: boolean;
}) {
    const map = useMap();
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            map.setView(center, 14);
            isFirstRender.current = false;
            return;
        }

        if (shouldFollow && driverLocation) {
            map.setView(
                [driverLocation.latitude, driverLocation.longitude],
                map.getZoom(),
                { animate: true, duration: 1 }
            );
        }
    }, [map, center, driverLocation, shouldFollow]);

    return null;
}

export default function TrackingPage({ booking }: TrackingPageProps) {
    const { auth } = usePage<SharedData>().props;
    const [driverLocation, setDriverLocation] = useState<DriverLocation | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
    const [shouldFollow, setShouldFollow] = useState(true);
    const [isConnected, setIsConnected] = useState(false);
    const echoChannelRef = useRef<any>(null);

    // Calculate map center
    const mapCenter: [number, number] = driverLocation 
        ? [driverLocation.latitude, driverLocation.longitude]
        : [booking.pickup_lat, booking.pickup_lng];

    // Fetch initial driver location
    const fetchDriverLocation = useCallback(async () => {
        try {
            const response = await api.get(`/gps/booking/${booking.id}/location`);
            
            if (response.data.success && response.data.location) {
                setDriverLocation(response.data.location);
                setLastUpdate(new Date());
                setError(null);
            } else {
                setError(response.data.message || 'Location not available');
            }
        } catch (err) {
            console.error('Failed to fetch driver location:', err);
            setError('Unable to fetch driver location');
        } finally {
            setIsLoading(false);
        }
    }, [booking.id]);

    // Set up WebSocket connection for real-time updates
    useEffect(() => {
        // Fetch initial location
        fetchDriverLocation();

        // Set up Echo listener for real-time updates
        const echo = getEcho();
        
        if (echo) {
            console.log(`Subscribing to private channel: booking.${booking.id}`);
            
            echoChannelRef.current = echo.private(`booking.${booking.id}`)
                .listen('.location.updated', (data: any) => {
                    console.log('Received real-time location update:', data);
                    
                    if (data.location) {
                        setDriverLocation({
                            latitude: data.location.latitude,
                            longitude: data.location.longitude,
                            heading: data.location.heading,
                            speed: data.location.speed,
                            accuracy: data.location.accuracy,
                            updated_at: data.location.updated_at,
                        });
                        setLastUpdate(new Date());
                        setError(null);
                    }
                })
                .subscribed(() => {
                    console.log('Successfully subscribed to booking channel');
                    setIsConnected(true);
                })
                .error((error: any) => {
                    console.error('Echo subscription error:', error);
                    setIsConnected(false);
                    setError('Real-time connection failed. Using fallback polling.');
                });
        } else {
            console.warn('Echo not available, falling back to polling');
            // Fallback to polling if WebSocket is not available
            const pollingInterval = setInterval(fetchDriverLocation, 5000);
            return () => clearInterval(pollingInterval);
        }

        // Cleanup
        return () => {
            if (echoChannelRef.current) {
                const echo = getEcho();
                if (echo) {
                    echo.leave(`booking.${booking.id}`);
                }
            }
        };
    }, [booking.id, fetchDriverLocation]);

    const getStatusBadgeVariant = (status: string) => {
        switch (status) {
            case 'accepted':
                return 'default';
            case 'in_progress':
                return 'secondary';
            case 'completed':
                return 'outline';
            default:
                return 'outline';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'accepted':
                return 'Driver is on the way';
            case 'in_progress':
                return 'Trip in progress';
            case 'completed':
                return 'Trip completed';
            default:
                return status;
        }
    };

    const formatSpeed = (speed: number | null) => {
        if (!speed) return 'Stationary';
        return `${Math.round(speed)} km/h`;
    };

    const formatLastUpdate = (date: Date | null) => {
        if (!date) return 'Never';
        const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
        if (seconds < 5) return 'Just now';
        if (seconds < 60) return `${seconds}s ago`;
        return `${Math.floor(seconds / 60)}m ago`;
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
    };

    return (
        <TropirideLayout>
            <Head title={`Track Ride #${booking.id} - Tropiride`} />

            <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
                <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-4 mb-2">
                            <Link 
                                href="/tropiride/profile" 
                                className="text-cyan-600 hover:text-cyan-700 flex items-center gap-1"
                            >
                                ← Back to Bookings
                            </Link>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">Track Your Ride</h1>
                        <p className="text-gray-600 mt-1">
                            Real-time GPS tracking for Booking #{booking.id}
                        </p>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {/* Map Section */}
                        <div className="lg:col-span-2">
                            <Card className="overflow-hidden">
                                <div className="h-[500px] relative">
                                    <MapContainer
                                        center={mapCenter}
                                        zoom={14}
                                        style={{ height: '100%', width: '100%' }}
                                        zoomControl={true}
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                        />
                                        <MapController 
                                            center={mapCenter} 
                                            driverLocation={driverLocation}
                                            shouldFollow={shouldFollow}
                                        />

                                        {/* Pickup marker */}
                                        <Marker 
                                            position={[booking.pickup_lat, booking.pickup_lng]} 
                                            icon={pickupIcon}
                                        />

                                        {/* Dropoff marker */}
                                        <Marker 
                                            position={[booking.dropoff_lat, booking.dropoff_lng]} 
                                            icon={dropoffIcon}
                                        />

                                        {/* Driver marker */}
                                        {driverLocation && (
                                            <Marker
                                                position={[driverLocation.latitude, driverLocation.longitude]}
                                                icon={createCarIcon(driverLocation.heading)}
                                            />
                                        )}

                                        {/* Route line from driver to pickup (if not yet picked up) */}
                                        {driverLocation && booking.status === 'accepted' && (
                                            <Polyline
                                                positions={[
                                                    [driverLocation.latitude, driverLocation.longitude],
                                                    [booking.pickup_lat, booking.pickup_lng],
                                                ]}
                                                pathOptions={{
                                                    color: '#06b6d4',
                                                    weight: 4,
                                                    dashArray: '10, 10',
                                                    opacity: 0.8,
                                                }}
                                            />
                                        )}

                                        {/* Route line from pickup to dropoff */}
                                        <Polyline
                                            positions={[
                                                [booking.pickup_lat, booking.pickup_lng],
                                                [booking.dropoff_lat, booking.dropoff_lng],
                                            ]}
                                            pathOptions={{
                                                color: '#0891b2',
                                                weight: 3,
                                                opacity: 0.6,
                                            }}
                                        />
                                    </MapContainer>

                                    {/* Map overlay controls */}
                                    <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
                                        {/* Real-time connection indicator */}
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium shadow-lg ${
                                            isConnected 
                                                ? 'bg-green-500 text-white' 
                                                : 'bg-amber-500 text-white'
                                        }`}>
                                            {isConnected ? (
                                                <>
                                                    <Wifi className="h-3 w-3" />
                                                    Live
                                                </>
                                            ) : (
                                                <>
                                                    <WifiOff className="h-3 w-3" />
                                                    Polling
                                                </>
                                            )}
                                        </div>
                                        <Button
                                            size="sm"
                                            variant={shouldFollow ? "default" : "outline"}
                                            onClick={() => setShouldFollow(!shouldFollow)}
                                            className="bg-white shadow-lg hover:bg-gray-50 text-gray-700 border"
                                        >
                                            <Navigation className={`h-4 w-4 mr-1 ${shouldFollow ? 'text-cyan-600' : ''}`} />
                                            {shouldFollow ? 'Following' : 'Follow Driver'}
                                        </Button>
                                    </div>

                                    {/* Loading overlay */}
                                    {isLoading && (
                                        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-[1000]">
                                            <div className="text-center">
                                                <Loader2 className="h-8 w-8 animate-spin text-cyan-600 mx-auto mb-2" />
                                                <p className="text-gray-600">Loading driver location...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Map legend */}
                                <div className="p-4 bg-gray-50 border-t flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-6 text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 border-2 border-white shadow" />
                                            <span className="text-gray-600">Driver</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full bg-green-500" />
                                            <span className="text-gray-600">Pickup</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 rounded-full bg-red-500" />
                                            <span className="text-gray-600">Dropoff</span>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500 flex items-center gap-2">
                                        <RefreshCw className="h-4 w-4" />
                                        Updated: {formatLastUpdate(lastUpdate)}
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Info Panel */}
                        <div className="space-y-4">
                            {/* Status Card */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            <Car className="h-5 w-5 text-cyan-600" />
                                            Ride Status
                                        </CardTitle>
                                        <Badge variant={getStatusBadgeVariant(booking.status)}>
                                            {getStatusText(booking.status)}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Driver info */}
                                    {booking.driver && (
                                        <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl">
                                            <Avatar className="h-14 w-14 border-2 border-cyan-200">
                                                <AvatarImage src={booking.driver.avatar_url || undefined} />
                                                <AvatarFallback className="bg-cyan-100 text-cyan-700">
                                                    {getInitials(booking.driver.name)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">{booking.driver.name}</p>
                                                <p className="text-sm text-gray-600 capitalize">{booking.vehicle_type}</p>
                                            </div>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                asChild
                                            >
                                                <a href={`tel:${booking.driver.phone}`}>
                                                    <Phone className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        </div>
                                    )}

                                    {/* Driver location info */}
                                    {driverLocation ? (
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-600">Speed</span>
                                                <span className="font-medium">{formatSpeed(driverLocation.speed)}</span>
                                            </div>
                                            {driverLocation.accuracy && (
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">GPS Accuracy</span>
                                                    <span className="font-medium">±{Math.round(driverLocation.accuracy)}m</span>
                                                </div>
                                            )}
                                        </div>
                                    ) : error ? (
                                        <div className="flex items-center gap-2 p-3 bg-amber-50 text-amber-700 rounded-lg text-sm">
                                            <AlertCircle className="h-4 w-4" />
                                            {error}
                                        </div>
                                    ) : null}
                                </CardContent>
                            </Card>

                            {/* Trip Details Card */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="h-5 w-5 text-cyan-600" />
                                        Trip Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {/* Pickup */}
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 rounded-full bg-green-500 mt-1.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-medium">Pickup</p>
                                            <p className="text-sm text-gray-900">{booking.pickup_location}</p>
                                        </div>
                                    </div>

                                    {/* Connector line */}
                                    <div className="ml-1.5 border-l-2 border-dashed border-gray-300 h-6" />

                                    {/* Dropoff */}
                                    <div className="flex items-start gap-3">
                                        <div className="w-3 h-3 rounded-full bg-red-500 mt-1.5" />
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-medium">Dropoff</p>
                                            <p className="text-sm text-gray-900">{booking.dropoff_location}</p>
                                        </div>
                                    </div>

                                    {/* Fare */}
                                    <div className="pt-4 border-t">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-600">Estimated Fare</span>
                                            <span className="text-xl font-bold text-gray-900">
                                                ₱{booking.estimated_fare}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Actions Card */}
                            <Card>
                                <CardContent className="pt-6">
                                    <div className="space-y-3">
                                        <Button 
                                            className="w-full gap-2" 
                                            variant="outline"
                                            asChild
                                        >
                                            <Link href="/tropiride/messages">
                                                <MessageSquare className="h-4 w-4" />
                                                Message Driver
                                            </Link>
                                        </Button>
                                        {booking.driver && (
                                            <Button 
                                                className="w-full gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
                                                asChild
                                            >
                                                <a href={`tel:${booking.driver.phone}`}>
                                                    <Phone className="h-4 w-4" />
                                                    Call Driver
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </TropirideLayout>
    );
}

