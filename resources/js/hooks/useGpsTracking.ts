import { useState, useEffect, useRef, useCallback } from 'react';
import api from '@/lib/axios';

interface GpsPosition {
    latitude: number;
    longitude: number;
    heading: number | null;
    speed: number | null;
    accuracy: number | null;
}

interface UseGpsTrackingOptions {
    bookingId?: number | null;
    enabled?: boolean;
    updateInterval?: number; // How often to send updates (ms)
}

interface UseGpsTrackingReturn {
    isTracking: boolean;
    currentPosition: GpsPosition | null;
    error: string | null;
    startTracking: () => void;
    stopTracking: () => void;
    lastUpdateTime: Date | null;
}

export function useGpsTracking({
    bookingId = null,
    enabled = false,
    updateInterval = 5000, // Default: send updates every 5 seconds
}: UseGpsTrackingOptions = {}): UseGpsTrackingReturn {
    const [isTracking, setIsTracking] = useState(false);
    const [currentPosition, setCurrentPosition] = useState<GpsPosition | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdateTime, setLastUpdateTime] = useState<Date | null>(null);

    const watchIdRef = useRef<number | null>(null);
    const sendIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const lastPositionRef = useRef<GpsPosition | null>(null);

    // Send location update to server
    const sendLocationUpdate = useCallback(async (position: GpsPosition) => {
        try {
            await api.post('/gps/update', {
                latitude: position.latitude,
                longitude: position.longitude,
                heading: position.heading,
                speed: position.speed,
                accuracy: position.accuracy,
                booking_id: bookingId,
            });
            setLastUpdateTime(new Date());
            setError(null);
        } catch (err) {
            console.error('Failed to send GPS update:', err);
            // Don't set error for network issues - keep tracking
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
        lastPositionRef.current = newPosition;
        setError(null);
    }, []);

    // Handle geolocation error
    const handlePositionError = useCallback((error: GeolocationPositionError) => {
        let message = 'Unable to get location';
        
        switch (error.code) {
            case error.PERMISSION_DENIED:
                message = 'Location permission denied. Please enable location access.';
                break;
            case error.POSITION_UNAVAILABLE:
                message = 'Location unavailable. Please check your GPS.';
                break;
            case error.TIMEOUT:
                message = 'Location request timed out. Retrying...';
                break;
        }
        
        setError(message);
    }, []);

    // Start GPS tracking
    const startTracking = useCallback(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setIsTracking(true);
        setError(null);

        // Start watching position
        watchIdRef.current = navigator.geolocation.watchPosition(
            handlePositionSuccess,
            handlePositionError,
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );

        // Set up interval to send updates to server
        sendIntervalRef.current = setInterval(() => {
            if (lastPositionRef.current) {
                sendLocationUpdate(lastPositionRef.current);
            }
        }, updateInterval);
    }, [handlePositionSuccess, handlePositionError, sendLocationUpdate, updateInterval]);

    // Stop GPS tracking
    const stopTracking = useCallback(async () => {
        setIsTracking(false);

        // Stop watching position
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }

        // Clear send interval
        if (sendIntervalRef.current) {
            clearInterval(sendIntervalRef.current);
            sendIntervalRef.current = null;
        }

        // Notify server that tracking has stopped
        try {
            await api.post('/gps/stop');
        } catch (err) {
            console.error('Failed to notify server of tracking stop:', err);
        }
    }, []);

    // Auto-start/stop based on enabled prop
    useEffect(() => {
        if (enabled && !isTracking) {
            startTracking();
        } else if (!enabled && isTracking) {
            stopTracking();
        }

        // Cleanup on unmount
        return () => {
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
            if (sendIntervalRef.current) {
                clearInterval(sendIntervalRef.current);
            }
        };
    }, [enabled, isTracking, startTracking, stopTracking]);

    return {
        isTracking,
        currentPosition,
        error,
        startTracking,
        stopTracking,
        lastUpdateTime,
    };
}

export default useGpsTracking;

