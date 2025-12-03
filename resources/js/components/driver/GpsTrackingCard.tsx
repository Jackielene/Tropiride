import { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
    Navigation, 
    MapPin, 
    Loader2, 
    Power,
    PowerOff,
    Gauge,
    Compass,
    Signal,
    AlertCircle,
    CheckCircle
} from 'lucide-react';
import api from '@/lib/axios';

interface GpsPosition {
    latitude: number;
    longitude: number;
    heading: number | null;
    speed: number | null;
    accuracy: number | null;
}

interface GpsTrackingCardProps {
    bookingId: number | null;
    isActiveRide: boolean;
    onTrackingChange?: (isTracking: boolean) => void;
}

// LocalStorage key for persisting tracking state
const TRACKING_STORAGE_KEY = 'tropiride_gps_tracking';
const TRACKING_BOOKING_KEY = 'tropiride_tracking_booking_id';

export default function GpsTrackingCard({ 
    bookingId, 
    isActiveRide,
    onTrackingChange 
}: GpsTrackingCardProps) {
    const [isTracking, setIsTracking] = useState(false);
    const [currentPosition, setCurrentPosition] = useState<GpsPosition | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);
    const [watchId, setWatchId] = useState<number | null>(null);
    const [sendInterval, setSendInterval] = useState<NodeJS.Timeout | null>(null);
    const [isInitialized, setIsInitialized] = useState(false);
    const hasAutoStarted = useRef(false);

    // Save tracking state to localStorage
    const saveTrackingState = useCallback((tracking: boolean, bId: number | null) => {
        if (tracking && bId) {
            localStorage.setItem(TRACKING_STORAGE_KEY, 'true');
            localStorage.setItem(TRACKING_BOOKING_KEY, String(bId));
        } else {
            localStorage.removeItem(TRACKING_STORAGE_KEY);
            localStorage.removeItem(TRACKING_BOOKING_KEY);
        }
    }, []);

    // Check if tracking was previously enabled
    const wasTrackingEnabled = useCallback(() => {
        const trackingState = localStorage.getItem(TRACKING_STORAGE_KEY);
        const storedBookingId = localStorage.getItem(TRACKING_BOOKING_KEY);
        return trackingState === 'true' && storedBookingId !== null;
    }, []);

    // Send location update to server
    const sendLocationUpdate = useCallback(async (position: GpsPosition) => {
        // Get the current booking ID from localStorage if not provided
        const currentBookingId = bookingId || Number(localStorage.getItem(TRACKING_BOOKING_KEY));
        
        if (!currentBookingId) {
            console.warn('No booking ID for GPS update');
            return;
        }
        
        try {
            await api.post('/gps/update', {
                latitude: position.latitude,
                longitude: position.longitude,
                heading: position.heading,
                speed: position.speed,
                accuracy: position.accuracy,
                booking_id: currentBookingId,
            });
            setLastUpdateTime(new Date());
            setError(null);
        } catch (err) {
            console.error('Failed to send GPS update:', err);
        }
    }, [bookingId]);

    // Handle geolocation success
    const handlePositionSuccess = useCallback((position: GeolocationPosition) => {
        const newPosition: GpsPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            heading: position.coords.heading,
            speed: position.coords.speed ? position.coords.speed * 3.6 : null, // Convert m/s to km/h
            accuracy: position.coords.accuracy,
        };

        setCurrentPosition(newPosition);
        setError(null);
    }, []);

    // Handle geolocation error
    const handlePositionError = useCallback((error: GeolocationPositionError) => {
        let message = 'Unable to get location';
        
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message = 'Location permission denied. Please enable GPS.';
                break;
            case error.POSITION_UNAVAILABLE:
                message = 'Location unavailable. Check your GPS.';
                break;
            case error.TIMEOUT:
                message = 'Location request timed out.';
                break;
        }
        
        setError(message);
    }, []);

    // Start tracking
    const startTracking = useCallback((autoStart = false) => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported');
            return;
        }

        // Get booking ID from prop or localStorage
        const trackingBookingId = bookingId || Number(localStorage.getItem(TRACKING_BOOKING_KEY));
        
        if (!trackingBookingId && !autoStart) {
            setError('No booking selected for tracking');
            return;
        }

        setIsTracking(true);
        setError(null);
        onTrackingChange?.(true);
        
        // Save state to localStorage (persist across refreshes)
        if (trackingBookingId) {
            saveTrackingState(true, trackingBookingId);
        }

        // Start watching position
        const id = navigator.geolocation.watchPosition(
            handlePositionSuccess,
            handlePositionError,
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
        setWatchId(id);

        // Send updates every 2 seconds for smooth real-time tracking (like Uber/Grab)
        const interval = setInterval(() => {
            setCurrentPosition(pos => {
                if (pos) {
                    sendLocationUpdate(pos);
                }
                return pos;
            });
        }, 2000);
        setSendInterval(interval);
    }, [handlePositionSuccess, handlePositionError, sendLocationUpdate, onTrackingChange, bookingId, saveTrackingState]);

    // Stop tracking
    const stopTracking = useCallback(async () => {
        setIsTracking(false);
        onTrackingChange?.(false);
        
        // Clear localStorage (user explicitly stopped tracking)
        saveTrackingState(false, null);

        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            setWatchId(null);
        }

        if (sendInterval) {
            clearInterval(sendInterval);
            setSendInterval(null);
        }

        try {
            await api.post('/gps/stop');
        } catch (err) {
            console.error('Failed to notify server:', err);
        }
    }, [watchId, sendInterval, onTrackingChange, saveTrackingState]);

    // Auto-start tracking on mount if it was previously enabled (persist across page refresh)
    useEffect(() => {
        if (!isInitialized && !hasAutoStarted.current) {
            setIsInitialized(true);
            
            // Check if tracking was enabled before page refresh
            if (wasTrackingEnabled() && isActiveRide) {
                console.log('Auto-starting GPS tracking (was previously enabled)');
                hasAutoStarted.current = true;
                // Small delay to ensure component is fully mounted
                setTimeout(() => {
                    startTracking(true);
                }, 500);
            }
        }
    }, [isInitialized, wasTrackingEnabled, isActiveRide, startTracking]);

    // Cleanup on unmount (but DON'T clear localStorage - tracking should persist)
    useEffect(() => {
        return () => {
            // Only cleanup the watchers, not the localStorage state
            if (watchId !== null) {
                navigator.geolocation.clearWatch(watchId);
            }
            if (sendInterval) {
                clearInterval(sendInterval);
            }
        };
    }, [watchId, sendInterval]);

    // Auto-stop when ride is no longer active (booking completed/cancelled)
    useEffect(() => {
        if (!isActiveRide && isTracking) {
            stopTracking();
        }
    }, [isActiveRide, isTracking, stopTracking]);

    const formatSpeed = (speed: number | null) => {
        if (speed === null) return 'N/A';
        return `${Math.round(speed)} km/h`;
    };

    const formatHeading = (heading: number | null) => {
        if (heading === null) return 'N/A';
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(heading / 45) % 8;
        return `${Math.round(heading)}° ${directions[index]}`;
    };

    const formatLastUpdate = () => {
        if (!lastUpdateTime) return 'Never';
        const seconds = Math.floor((new Date().getTime() - lastUpdateTime.getTime()) / 1000);
        if (seconds < 5) return 'Just now';
        if (seconds < 60) return `${seconds}s ago`;
        return `${Math.floor(seconds / 60)}m ago`;
    };

    return (
        <Card className={`transition-all ${isTracking ? 'border-green-300 bg-green-50/50 dark:border-green-800 dark:bg-green-950/30' : ''}`}>
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-base">
                        <Navigation className={`h-5 w-5 ${isTracking ? 'text-green-600 animate-pulse' : 'text-muted-foreground'}`} />
                        GPS Tracking
                    </CardTitle>
                    <Badge variant={isTracking ? 'default' : 'secondary'}>
                        {isTracking ? (
                            <>
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-1.5" />
                                Live
                            </>
                        ) : 'Off'}
                    </Badge>
                </div>
                <CardDescription>
                    {isTracking 
                        ? 'Your location is being shared with the customer' 
                        : 'Start tracking to share your location with the customer'}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 rounded-lg text-sm">
                        <AlertCircle className="h-4 w-4 flex-shrink-0" />
                        {error}
                    </div>
                )}

                {isTracking && currentPosition && (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-2 p-3 bg-background rounded-lg border">
                            <Gauge className="h-4 w-4 text-blue-600" />
                            <div>
                                <p className="text-xs text-muted-foreground">Speed</p>
                                <p className="text-sm font-semibold">{formatSpeed(currentPosition.speed)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-background rounded-lg border">
                            <Compass className="h-4 w-4 text-orange-600" />
                            <div>
                                <p className="text-xs text-muted-foreground">Heading</p>
                                <p className="text-sm font-semibold">{formatHeading(currentPosition.heading)}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-background rounded-lg border">
                            <Signal className="h-4 w-4 text-green-600" />
                            <div>
                                <p className="text-xs text-muted-foreground">Accuracy</p>
                                <p className="text-sm font-semibold">
                                    {currentPosition.accuracy ? `±${Math.round(currentPosition.accuracy)}m` : 'N/A'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 p-3 bg-background rounded-lg border">
                            <MapPin className="h-4 w-4 text-purple-600" />
                            <div>
                                <p className="text-xs text-muted-foreground">Last Sent</p>
                                <p className="text-sm font-semibold">{formatLastUpdate()}</p>
                            </div>
                        </div>
                    </div>
                )}

                {isTracking && currentPosition && (
                    <div className="p-2 bg-muted rounded-lg text-xs text-muted-foreground text-center">
                        📍 {currentPosition.latitude.toFixed(6)}, {currentPosition.longitude.toFixed(6)}
                    </div>
                )}

                {!isActiveRide && !isTracking && (
                    <div className="p-3 bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-300 rounded-lg text-sm flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        GPS tracking is available for accepted rides
                    </div>
                )}

                <div className="flex gap-2">
                    {!isTracking ? (
                        <Button 
                            onClick={startTracking} 
                            disabled={!isActiveRide}
                            className="flex-1 gap-2"
                        >
                            <Power className="h-4 w-4" />
                            Start Tracking
                        </Button>
                    ) : (
                        <Button 
                            onClick={stopTracking} 
                            variant="destructive"
                            className="flex-1 gap-2"
                        >
                            <PowerOff className="h-4 w-4" />
                            Stop Tracking
                        </Button>
                    )}
                </div>

                {isTracking && (
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                        <CheckCircle className="h-4 w-4" />
                        Customer can see your live location
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

