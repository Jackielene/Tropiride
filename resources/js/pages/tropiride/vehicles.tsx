import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents, Circle, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  FaMapMarkerAlt,
  FaRoute,
  FaClock,
  FaMoneyBillWave,
  FaLocationArrow,
  FaTimes,
  FaCalendarAlt,
  FaCheckCircle,
} from 'react-icons/fa';
import { Head, Link, router, usePage } from '@inertiajs/react';
import TropirideNavbar from '@/components/tropiride/TropirideNavbar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

// Fix Leaflet default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Siargao center coordinates
const SIARGAO_CENTER: [number, number] = [9.8349, 126.0450];

interface Location {
  lat: number;
  lng: number;
  address: string;
}

function MapController({ center, zoom }: { center: [number, number]; zoom?: number }) {
  const map = useMap();
  
  useEffect(() => {
    if (zoom) {
      map.setView(center, zoom, {
        animate: true,
        duration: 0.8,
        easeLinearity: 0.25
      });
    } else {
      map.setView(center, 14, {
        animate: true,
        duration: 0.8,
        easeLinearity: 0.25
      });
    }
  }, [map, center, zoom]);
  
  return null;
}

// Component to handle map clicks for setting pickup location
function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
    },
  });
  
  return null;
}

// Geocoding function to get autocomplete suggestions
async function geocodeAutocomplete(query: string): Promise<Location[]> {
  if (!query || query.trim().length < 2) return [];
  
  try {
    // Use Nominatim (OpenStreetMap) geocoding API - free and no API key needed
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Siargao, Philippines')}&limit=5&addressdetails=1`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Tropiride App' // Nominatim requires a User-Agent
      }
    });
    
    const data = await response.json();
    
    if (data && Array.isArray(data)) {
      return data.map((result: any) => ({
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        address: result.display_name.split(',').slice(0, 3).join(',').trim() // Get first parts of address
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Geocoding error:', error);
    return [];
  }
}

// Reverse geocoding function to convert coordinates to address
async function reverseGeocode(lat: number, lng: number): Promise<string> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Tropiride App'
      }
    });
    
    const data = await response.json();
    
    if (data && data.display_name) {
      // Return a more concise address
      const parts = data.display_name.split(',');
      // Take first 2-3 parts for a cleaner address
      return parts.slice(0, Math.min(3, parts.length)).join(',').trim();
    }
    
    return `Location (${lat.toFixed(6)}, ${lng.toFixed(6)})`;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return `Location (${lat.toFixed(6)}, ${lng.toFixed(6)})`;
  }
}

// Calculate realistic travel time considering traffic, distance, and road conditions
function calculateRealisticTravelTime(distanceKm: number): number {
  // Base time for pickup and dropoff operations (2 minutes minimum)
  const BASE_TIME_MINUTES = 2;
  
  // Average speeds for different distance ranges (realistic for Siargao island conditions)
  // Shorter distances: slower due to urban traffic, intersections, stops
  // Longer distances: faster due to highway/main roads
  let averageSpeedKmh: number;
  
  if (distanceKm <= 2) {
    // Very short trips (urban areas): 15-20 km/h due to traffic, intersections, turns
    averageSpeedKmh = 18;
  } else if (distanceKm <= 5) {
    // Short trips: 20-30 km/h
    averageSpeedKmh = 25;
  } else if (distanceKm <= 10) {
    // Medium trips: 30-40 km/h
    averageSpeedKmh = 35;
  } else if (distanceKm <= 20) {
    // Longer trips: 40-50 km/h
    averageSpeedKmh = 45;
  } else {
    // Very long trips: 45-55 km/h
    averageSpeedKmh = 50;
  }
  
  // Calculate base travel time
  const travelTimeMinutes = (distanceKm / averageSpeedKmh) * 60;
  
  // Add traffic factor (20% extra time for traffic delays, stops, etc.)
  const trafficFactor = 1.2;
  
  // Add time for stop signs, traffic lights, road conditions
  // More stops for shorter trips
  let stopTime = 0;
  if (distanceKm <= 2) {
    stopTime = 3; // More stops in urban areas
  } else if (distanceKm <= 5) {
    stopTime = 2;
  } else if (distanceKm <= 10) {
    stopTime = 1.5;
  } else {
    stopTime = 1; // Fewer stops on longer trips
  }
  
  // Final calculation
  const totalTime = BASE_TIME_MINUTES + (travelTimeMinutes * trafficFactor) + stopTime;
  
  // Round to nearest minute, minimum 3 minutes
  return Math.max(3, Math.round(totalTime));
}

// Geocoding function to convert place names to coordinates (single result)
async function geocodeLocation(query: string): Promise<Location | null> {
  if (!query || query.trim().length < 3) return null;
  
  try {
    // Use Nominatim (OpenStreetMap) geocoding API - free and no API key needed
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Siargao, Philippines')}&limit=1`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Tropiride App' // Nominatim requires a User-Agent
      }
    });
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      const result = data[0];
      return {
        lat: parseFloat(result.lat),
        lng: parseFloat(result.lon),
        address: result.display_name.split(',').slice(0, 3).join(',').trim()
      };
    }
    
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

export default function TropirideVehicles() {
  const { flash } = usePage().props as any;
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(SIARGAO_CENTER);
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [estimatedDistance, setEstimatedDistance] = useState<number | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Show success modal if flash message exists
  useEffect(() => {
    if (flash?.status) {
      setShowSuccess(true);
    }
  }, [flash]);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);
  const [gpsAccuracy, setGpsAccuracy] = useState<number | null>(null);
  const [mapZoom, setMapZoom] = useState<number>(14);
  const [isGeocodingPickup, setIsGeocodingPickup] = useState(false);
  const [isGeocodingDropoff, setIsGeocodingDropoff] = useState(false);
  const [pickupInputValue, setPickupInputValue] = useState('');
  const [dropoffInputValue, setDropoffInputValue] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState<Location[]>([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState<Location[]>([]);
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropoffSuggestions, setShowDropoffSuggestions] = useState(false);
  const [activeField, setActiveField] = useState<'pickup' | 'dropoff'>('pickup');
  const [pickupDate, setPickupDate] = useState<string>('');
  const [pickupTime, setPickupTime] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');
  const [returnTime, setReturnTime] = useState<string>('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropoffInputRef = useRef<HTMLInputElement>(null);
  const geocodeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autocompleteTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-detect location on mount - GPS automatically requested with high accuracy
  useEffect(() => {
    setIsGettingLocation(true);
    
    if (navigator.geolocation) {
      // Request high accuracy GPS location with improved options
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setGpsAccuracy(accuracy);
          
          // Reverse geocode to get address
          setIsReverseGeocoding(true);
          try {
            const address = await reverseGeocode(latitude, longitude);
            
            setPickupLocation({
              lat: latitude,
              lng: longitude,
              address: address
            });
            setPickupInputValue(address);
            setMapCenter([latitude, longitude]);
          } catch {
            setPickupLocation({
              lat: latitude,
              lng: longitude,
              address: 'Current Location'
            });
            setPickupInputValue('Current Location');
            setMapCenter([latitude, longitude]);
          }
          setIsReverseGeocoding(false);
          setIsGettingLocation(false);
        },
        (error) => {
          console.error('GPS Error:', error);
          // Use default Siargao location if GPS fails
          setPickupLocation({
            lat: SIARGAO_CENTER[0],
            lng: SIARGAO_CENTER[1],
            address: 'Siargao Island'
          });
          setPickupInputValue('Siargao Island');
          setIsGettingLocation(false);
        },
        {
          enableHighAccuracy: true, // Use GPS if available
          timeout: 15000, // Increased timeout for better accuracy
          maximumAge: 0, // Don't use cached position
        }
      );
      
      // Watch position for continuous updates (optional, more accurate)
      const watchId = navigator.geolocation.watchPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setGpsAccuracy((prev) => {
            // Only update if accuracy improves significantly (within 50m and 30% better)
            if (accuracy < 50 && (!prev || accuracy < prev * 0.7)) {
              reverseGeocode(latitude, longitude).then((address) => {
                setPickupLocation({
                  lat: latitude,
                  lng: longitude,
                  address: address
                });
                setPickupInputValue(address);
                setMapCenter([latitude, longitude]);
              });
              return accuracy;
            }
            return prev || accuracy;
          });
        },
        (error) => {
          // Silent fail for watch position
          console.warn('GPS watch error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 5000, // Accept positions up to 5 seconds old
        }
      );
      
      // Cleanup watch on unmount
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      // Browser doesn't support geolocation
      setPickupLocation({
        lat: SIARGAO_CENTER[0],
        lng: SIARGAO_CENTER[1],
        address: 'Siargao Island'
      });
      setPickupInputValue('Siargao Island');
      setIsGettingLocation(false);
    }
  }, []);

  // Update map center and zoom when pickup suggestions change
  useEffect(() => {
    if (pickupSuggestions.length > 0) {
      // Always center map to show all suggestions when they exist
      const lats = pickupSuggestions.map(s => s.lat);
      const lngs = pickupSuggestions.map(s => s.lng);
      
      if (lats.length > 0 && lngs.length > 0) {
        const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
        const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
        
        // Calculate zoom to fit all markers
        const latDiff = Math.max(...lats) - Math.min(...lats);
        const lngDiff = Math.max(...lngs) - Math.min(...lngs);
        const maxDiff = Math.max(latDiff, lngDiff);
        
        // Adjust zoom based on spread of markers
        let newZoom = 14;
        if (maxDiff > 0.05) newZoom = 12; // Wide spread
        else if (maxDiff > 0.02) newZoom = 13; // Medium spread
        else if (maxDiff > 0.01) newZoom = 14; // Close together
        else newZoom = 15; // Very close
        
        setMapCenter([centerLat, centerLng]);
        setMapZoom(newZoom);
      }
    } else if (pickupLocation && !pickupSuggestions.length) {
      // Reset zoom when pickup is selected and no suggestions
      setMapZoom(14);
      setMapCenter([pickupLocation.lat, pickupLocation.lng]);
    }
  }, [pickupSuggestions, pickupLocation]);

  // Calculate fare, distance, and time when both locations are set
  useEffect(() => {
    if (pickupLocation && dropoffLocation) {
      // Simple calculation using Haversine formula for distance
      const R = 6371; // Earth's radius in km
      const dLat = (dropoffLocation.lat - pickupLocation.lat) * Math.PI / 180;
      const dLon = (dropoffLocation.lng - pickupLocation.lng) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(pickupLocation.lat * Math.PI / 180) * Math.cos(dropoffLocation.lat * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      const distance = R * c; // Distance in km
      
      setEstimatedDistance(distance);
      
      // Calculate realistic estimated time considering traffic and distance
      const estimatedTimeMinutes = calculateRealisticTravelTime(distance);
      setEstimatedTime(estimatedTimeMinutes);
      
      // Calculate fare (base fare + per km rate)
      // Base fare: ₱50, Per km: ₱15
      const baseFare = 50;
      const perKm = 15;
      const fare = Math.round(baseFare + (distance * perKm));
      setEstimatedFare(fare);

      // Center map between pickup and dropoff, or focus on pickup if it's the only one
      if (pickupLocation && dropoffLocation) {
        const centerLat = (pickupLocation.lat + dropoffLocation.lat) / 2;
        const centerLng = (pickupLocation.lng + dropoffLocation.lng) / 2;
        setMapCenter([centerLat, centerLng]);
      } else if (pickupLocation && !dropoffLocation) {
        // If only pickup is set, center on pickup
        setMapCenter([pickupLocation.lat, pickupLocation.lng]);
      } else if (pickupSuggestions.length > 0 && !pickupLocation) {
        // If showing suggestions, center map to show all suggestions
        const lats = pickupSuggestions.map(s => s.lat);
        const lngs = pickupSuggestions.map(s => s.lng);
        const centerLat = (Math.min(...lats) + Math.max(...lats)) / 2;
        const centerLng = (Math.min(...lngs) + Math.max(...lngs)) / 2;
        setMapCenter([centerLat, centerLng]);
      }
    } else {
      setEstimatedFare(null);
      setEstimatedDistance(null);
      setEstimatedTime(null);
    }
  }, [pickupLocation, dropoffLocation]);

  const handleSetCurrentLocation = async () => {
    if (navigator.geolocation) {
      setIsGettingLocation(true);
      setIsReverseGeocoding(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude, accuracy } = position.coords;
          setGpsAccuracy(accuracy);
          
          // Reverse geocode to get address
          try {
            const address = await reverseGeocode(latitude, longitude);
            
            setPickupLocation({
              lat: latitude,
              lng: longitude,
              address: address
            });
            setPickupInputValue(address);
            setMapCenter([latitude, longitude]);
          } catch {
            setPickupLocation({
              lat: latitude,
              lng: longitude,
              address: 'Current Location'
            });
            setPickupInputValue('Current Location');
            setMapCenter([latitude, longitude]);
          }
          setIsGettingLocation(false);
          setIsReverseGeocoding(false);
        },
        () => {
          setIsGettingLocation(false);
          setIsReverseGeocoding(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        }
      );
    }
  };

  // Handle map click to set pickup or dropoff location based on active field
  const handleMapClick = async (lat: number, lng: number) => {
    setIsReverseGeocoding(true);
    try {
      const address = await reverseGeocode(lat, lng);
      const newLocation = {
        lat,
        lng,
        address
      };
      
      if (activeField === 'pickup') {
        setPickupLocation(newLocation);
        setPickupInputValue(address);
      } else {
        setDropoffLocation(newLocation);
        setDropoffInputValue(address);
      }
      
      setMapCenter([lat, lng]);
    } catch {
      const fallbackAddress = `Location (${lat.toFixed(6)}, ${lng.toFixed(6)})`;
      const fallbackLocation = {
        lat,
        lng,
        address: fallbackAddress
      };
      
      if (activeField === 'pickup') {
        setPickupLocation(fallbackLocation);
        setPickupInputValue(fallbackAddress);
      } else {
        setDropoffLocation(fallbackLocation);
        setDropoffInputValue(fallbackAddress);
      }
    }
    setIsReverseGeocoding(false);
  };

  // Handle marker drag end for pickup location
  const handlePickupMarkerDragEnd = async (e: any) => {
    const marker = e.target;
    const position = marker.getLatLng();
    const lat = position.lat;
    const lng = position.lng;
    
    setIsReverseGeocoding(true);
    try {
      const address = await reverseGeocode(lat, lng);
      setPickupLocation({
        lat,
        lng,
        address
      });
      setPickupInputValue(address);
    } catch {
      setPickupLocation({
        lat,
        lng,
        address: `Location (${lat.toFixed(6)}, ${lng.toFixed(6)})`
      });
      setPickupInputValue(`Location (${lat.toFixed(6)}, ${lng.toFixed(6)})`);
    }
    setIsReverseGeocoding(false);
  };

  const handleLocationSelect = (type: 'pickup' | 'dropoff', location: Location) => {
    if (type === 'pickup') {
      setPickupLocation(location);
      setMapCenter([location.lat, location.lng]);
      setPickupInputValue(location.address);
    } else {
      setDropoffLocation(location);
    }
  };

  // Handle pickup input change with autocomplete
  const handlePickupInputChange = async (value: string) => {
    setPickupInputValue(value);
    setShowPickupSuggestions(true);
    
    // Clear existing timeouts
    if (geocodeTimeoutRef.current) {
      clearTimeout(geocodeTimeoutRef.current);
    }
    if (autocompleteTimeoutRef.current) {
      clearTimeout(autocompleteTimeoutRef.current);
    }
    
    // If cleared, reset location and hide suggestions
    if (!value.trim()) {
      setPickupLocation(null);
      setPickupSuggestions([]);
      setShowPickupSuggestions(false);
      return;
    }
    
    // Show autocomplete suggestions for any input length >= 2
    if (value.trim().length >= 2) {
      setIsGeocodingPickup(true);
      
      autocompleteTimeoutRef.current = setTimeout(async () => {
        const suggestions = await geocodeAutocomplete(value);
        console.log('Pickup suggestions received:', suggestions);
        setPickupSuggestions(suggestions);
        setIsGeocodingPickup(false);
        
        // Don't auto-select - let user see all options on map first
      }, 400); // Faster autocomplete response
    } else {
      setPickupSuggestions([]);
      setIsGeocodingPickup(false);
    }
  };

  // Handle pickup suggestion selection
  const handlePickupSuggestionSelect = (location: Location) => {
    console.log('Selecting pickup location:', location);
    setPickupLocation(location);
    setPickupInputValue(location.address);
    // Immediately move map to selected location
    setMapCenter([location.lat, location.lng]);
    setMapZoom(14);
    setShowPickupSuggestions(false);
    // Don't clear suggestions immediately - let them fade out
    setTimeout(() => {
      setPickupSuggestions([]);
      dropoffInputRef.current?.focus();
    }, 300);
  };

  // Handle dropoff input change with autocomplete
  const handleDropoffInputChange = async (value: string) => {
    setDropoffInputValue(value);
    setShowDropoffSuggestions(true);
    
    // Clear existing timeouts
    if (geocodeTimeoutRef.current) {
      clearTimeout(geocodeTimeoutRef.current);
    }
    if (autocompleteTimeoutRef.current) {
      clearTimeout(autocompleteTimeoutRef.current);
    }
    
    // If cleared, reset location and hide suggestions
    if (!value.trim()) {
      setDropoffLocation(null);
      setDropoffSuggestions([]);
      setShowDropoffSuggestions(false);
      return;
    }
    
    // Show autocomplete suggestions for any input length >= 2
    if (value.trim().length >= 2) {
      setIsGeocodingDropoff(true);
      
      autocompleteTimeoutRef.current = setTimeout(async () => {
        const suggestions = await geocodeAutocomplete(value);
        setDropoffSuggestions(suggestions);
        setIsGeocodingDropoff(false);
        
        // If there's only one suggestion, auto-select it immediately and center map
        if (suggestions.length === 1) {
          const selected = suggestions[0];
          setDropoffLocation(selected);
          setDropoffInputValue(selected.address);
          setShowDropoffSuggestions(false);
          setDropoffSuggestions([]);
          
          // Center map between pickup and dropoff if both exist
          if (pickupLocation) {
            const centerLat = (pickupLocation.lat + selected.lat) / 2;
            const centerLng = (pickupLocation.lng + selected.lng) / 2;
            setMapCenter([centerLat, centerLng]);
          } else {
            setMapCenter([selected.lat, selected.lng]);
          }
        }
      }, 400); // Faster autocomplete response
    } else {
      setDropoffSuggestions([]);
      setIsGeocodingDropoff(false);
    }
  };

  // Handle dropoff suggestion selection
  const handleDropoffSuggestionSelect = (location: Location) => {
    setDropoffLocation(location);
    setDropoffInputValue(location.address);
    setShowDropoffSuggestions(false);
    setDropoffSuggestions([]);
    
    // Center map between pickup and dropoff if both exist
    if (pickupLocation) {
      const centerLat = (pickupLocation.lat + location.lat) / 2;
      const centerLng = (pickupLocation.lng + location.lng) / 2;
      setMapCenter([centerLat, centerLng]);
    } else {
      setMapCenter([location.lat, location.lng]);
    }
  };

  const handleRequestRide = () => {
    if (!pickupLocation || !dropoffLocation || !estimatedFare || !estimatedDistance || !estimatedTime) return;
    
    setIsRequesting(true);
    
    router.post('/tropiride/ride-request', {
      pickup_location: pickupLocation.address,
      pickup_lat: pickupLocation.lat,
      pickup_lng: pickupLocation.lng,
      dropoff_location: dropoffLocation.address,
      dropoff_lat: dropoffLocation.lat,
      dropoff_lng: dropoffLocation.lng,
      estimated_fare: estimatedFare,
      distance_km: estimatedDistance,
      estimated_time_minutes: estimatedTime,
      pickup_date: pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : (pickupDate || null),
      return_date: isRoundTrip && returnDate && returnTime ? `${returnDate} ${returnTime}` : (isRoundTrip && returnDate ? returnDate : null),
    }, {
      preserveScroll: true,
      onSuccess: (page) => {
        setIsRequesting(false);
        // Check if there's a flash status message
        if (page.props.flash?.status) {
          setShowSuccess(true);
        } else {
          // Also show success even if no flash message
          setShowSuccess(true);
        }
        // Clear form fields after successful submission
        setDropoffLocation(null);
        setDropoffInputValue('');
        setPickupDate('');
        setPickupTime('');
        setReturnDate('');
        setReturnTime('');
        setIsRoundTrip(false);
      },
      onError: (errors) => {
        setIsRequesting(false);
        console.error('Error requesting ride:', errors);
        alert('Failed to send ride request. Please make sure you are logged in.');
      },
      onFinish: () => {
        setIsRequesting(false);
      }
    });
  };

  const swapLocations = () => {
    const tempLocation = pickupLocation;
    const tempInput = pickupInputValue;
    
    setPickupLocation(dropoffLocation);
    setPickupInputValue(dropoffInputValue);
    setDropoffLocation(tempLocation);
    setDropoffInputValue(tempInput);
    
    // Update map center if pickup changed
    if (dropoffLocation) {
      setMapCenter([dropoffLocation.lat, dropoffLocation.lng]);
    }
  };

  return (
    <>
      <Head title="Book a Ride - Tropiride" />
      
      <div className="min-h-screen bg-gray-50">
        <TropirideNavbar activeLink="vehicles" />
        
        
        <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
          {/* Map Section */}
          <div className="flex-1 relative z-0">
            <MapContainer
              center={mapCenter}
              zoom={14}
              style={{ height: '100%', width: '100%', zIndex: 0 }}
              zoomControl={false}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              />
              <MapController center={mapCenter} zoom={mapZoom} />
              <MapClickHandler onMapClick={handleMapClick} />
              
              {/* Show all pickup suggestions as markers */}
              {pickupSuggestions.length > 0 && (
                <>
                  {pickupSuggestions.map((suggestion, index) => {
                    // Check if this suggestion is the selected pickup
                    const isSelected = pickupLocation && 
                      pickupLocation.lat === suggestion.lat && 
                      pickupLocation.lng === suggestion.lng;
                    
                    if (isSelected) return null; // Don't show if it's already selected
                    
                    return (
                      <Marker
                        key={`suggestion-${index}`}
                        position={[suggestion.lat, suggestion.lng]}
                        eventHandlers={{
                          click: () => handlePickupSuggestionSelect(suggestion)
                        }}
                        icon={L.icon({
                          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
                          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                          iconSize: [25, 41],
                          iconAnchor: [12, 41],
                          popupAnchor: [1, -34],
                          shadowSize: [41, 41]
                        })}
                      >
                        <Popup>
                          <div className="text-sm">
                            <p className="font-semibold">{suggestion.address}</p>
                            <button
                              onClick={() => handlePickupSuggestionSelect(suggestion)}
                              className="mt-2 px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700 text-xs cursor-pointer"
                            >
                              Select as Pickup
                            </button>
                          </div>
                        </Popup>
                      </Marker>
                    );
                  })}
                </>
              )}
              
              {/* Selected pickup location marker */}
              {pickupLocation && (
                <>
                  <Marker 
                    position={[pickupLocation.lat, pickupLocation.lng]}
                    draggable={true}
                    eventHandlers={{
                      dragend: handlePickupMarkerDragEnd
                    }}
                    icon={L.icon({
                      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                      iconSize: [32, 48],
                      iconAnchor: [16, 48],
                      popupAnchor: [1, -34],
                      shadowSize: [41, 41]
                    })}
                  />
                  {gpsAccuracy && gpsAccuracy < 100 && (
                    <Circle
                      center={[pickupLocation.lat, pickupLocation.lng]}
                      radius={gpsAccuracy}
                      pathOptions={{
                        fillColor: '#22d3ee',
                        fillOpacity: 0.2,
                        color: '#06b6d4',
                        weight: 2
                      }}
                    />
                  )}
                </>
              )}
              
              {dropoffLocation && (
                <Marker 
                  position={[dropoffLocation.lat, dropoffLocation.lng]}
                  icon={L.icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                  })}
                />
              )}
            </MapContainer>
          </div>

          {/* Booking Panel */}
          <div className="lg:w-96 w-full bg-white shadow-2xl overflow-y-auto">
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Book a Ride</h2>
                <p className="text-gray-600 text-sm">Enter your locations to get started</p>
              </div>

              {/* Pickup Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pickup Location
                  {isGettingLocation && (
                    <span className="ml-2 text-xs font-normal text-cyan-600 animate-pulse">
                      (Getting your location...)
                    </span>
                  )}
                  {isReverseGeocoding && (
                    <span className="ml-2 text-xs font-normal text-gray-500">
                      (Updating address...)
                    </span>
                  )}
                  {gpsAccuracy && (
                    <span className="ml-2 text-xs font-normal text-green-600">
                      (Accuracy: ±{Math.round(gpsAccuracy)}m)
                    </span>
                  )}
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                    <motion.div 
                      className="w-3 h-3 rounded-full bg-green-500"
                      animate={isGettingLocation ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 1, repeat: isGettingLocation ? Infinity : 0 }}
                    />
                  </div>
                  <div className="relative">
                    <input
                      ref={pickupInputRef}
                      type="text"
                      placeholder={isGettingLocation ? "Detecting your location..." : "Enter pickup location (e.g., Cloud 9, General Luna)"}
                      value={pickupInputValue}
                      disabled={isGettingLocation}
                      onChange={(e) => handlePickupInputChange(e.target.value)}
                      onFocus={() => {
                        setActiveField('pickup');
                        if (pickupSuggestions.length > 0) {
                          setShowPickupSuggestions(true);
                        }
                      }}
                      onBlur={() => setTimeout(() => setShowPickupSuggestions(false), 200)}
                      className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors disabled:bg-gray-100 disabled:cursor-wait"
                    />
                    {/* Autocomplete Suggestions */}
                    {showPickupSuggestions && pickupSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute z-50 w-full mt-1 bg-white border-2 border-cyan-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
                      >
                        {pickupSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handlePickupSuggestionSelect(suggestion)}
                            className="w-full text-left px-4 py-3 hover:bg-cyan-50 border-b border-gray-100 last:border-b-0 transition-colors flex items-start gap-3 cursor-pointer"
                          >
                            <FaMapMarkerAlt className="text-cyan-600 mt-1 flex-shrink-0" />
                            <div className="flex-1">
                              <span className="text-sm font-medium text-gray-900 block">{suggestion.address}</span>
                              <span className="text-xs text-gray-500">Click to select pickup location</span>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    {isGeocodingPickup && (
                      <motion.div
                        className="w-4 h-4 border-2 border-cyan-600 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    <button
                      onClick={handleSetCurrentLocation}
                      disabled={isGettingLocation}
                      className="text-cyan-600 hover:text-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Use current location"
                    >
                      <motion.div
                        animate={isGettingLocation ? { rotate: 360 } : {}}
                        transition={{ duration: 2, repeat: isGettingLocation ? Infinity : 0, ease: "linear" }}
                      >
                        <FaLocationArrow />
                      </motion.div>
                    </button>
                  </div>
                </div>
                {pickupLocation && !isGettingLocation && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => {
                      setPickupLocation(null);
                      setPickupInputValue('');
                    }}
                    className="mt-2 text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <FaTimes className="text-xs" />
                    Clear
                  </motion.button>
                )}
              </div>

              {/* Swap Button */}
              {pickupLocation && dropoffLocation && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={swapLocations}
                  className="w-full py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-semibold text-gray-700"
                >
                  Swap Locations
                </motion.button>
              )}

              {/* Dropoff Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Drop-off Location
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  </div>
                  <input
                    ref={dropoffInputRef}
                    type="text"
                    placeholder="Enter drop-off location (e.g., Sugba Lagoon, Magpupungko)"
                    value={dropoffInputValue}
                    onChange={(e) => handleDropoffInputChange(e.target.value)}
                    onFocus={() => {
                      setActiveField('dropoff');
                      if (dropoffSuggestions.length > 0) {
                        setShowDropoffSuggestions(true);
                      }
                    }}
                    onBlur={() => setTimeout(() => setShowDropoffSuggestions(false), 200)}
                    className="w-full pl-10 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors"
                  />
                  {isGeocodingDropoff && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      <motion.div
                        className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                  )}
                    {/* Autocomplete Suggestions */}
                    {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute z-50 w-full mt-1 bg-white border-2 border-red-200 rounded-xl shadow-lg max-h-60 overflow-y-auto"
                      >
                        {dropoffSuggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleDropoffSuggestionSelect(suggestion)}
                            className="w-full text-left px-4 py-3 hover:bg-red-50 border-b border-gray-100 last:border-b-0 transition-colors flex items-start gap-3 cursor-pointer"
                          >
                            <FaMapMarkerAlt className="text-red-600 mt-1 flex-shrink-0" />
                            <div className="flex-1">
                              <span className="text-sm font-medium text-gray-900 block">{suggestion.address}</span>
                              <span className="text-xs text-gray-500">Click to select drop-off location</span>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                </div>
                {dropoffLocation && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => {
                      setDropoffLocation(null);
                      setDropoffInputValue('');
                    }}
                    className="mt-2 text-xs text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    <FaTimes className="text-xs" />
                    Clear
                  </motion.button>
                )}
              </div>

              {/* Estimation Card */}
              {estimatedFare && estimatedDistance && estimatedTime && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border-2 border-cyan-100"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Trip Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-cyan-500 rounded-full flex items-center justify-center">
                          <FaRoute className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Distance</p>
                          <p className="text-lg font-bold text-gray-900">
                            {estimatedDistance.toFixed(2)} km
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                          <FaClock className="text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Estimated Time</p>
                          <p className="text-lg font-bold text-gray-900">
                            {estimatedTime} min
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-cyan-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                            <FaMoneyBillWave className="text-white" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Estimated Fare</p>
                            <p className="text-2xl font-black text-gray-900">
                              ₱{estimatedFare}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Date Selection */}
              <div className="space-y-4">
                {/* Pickup Date & Time */}
                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4 border-2 border-cyan-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <FaCalendarAlt className="inline mr-2 text-cyan-600" />
                    Pickup Schedule (Optional)
                  </label>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors cursor-pointer bg-white text-sm"
                          style={{ zIndex: 10 }}
                        />
                        <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">Time</label>
                      <div className="relative">
                        <input
                          type="time"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                          className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none transition-colors cursor-pointer bg-white text-sm"
                          style={{ zIndex: 10 }}
                        />
                        <FaClock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                    <span className="text-cyan-600">ℹ️</span> Leave empty for immediate ride
                  </p>
                </div>

                {/* Round Trip Checkbox */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <input
                    type="checkbox"
                    id="roundTrip"
                    checked={isRoundTrip}
                    onChange={(e) => {
                      setIsRoundTrip(e.target.checked);
                      if (!e.target.checked) {
                        setReturnDate('');
                        setReturnTime('');
                      }
                    }}
                    className="w-5 h-5 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500 cursor-pointer"
                  />
                  <label htmlFor="roundTrip" className="text-sm font-semibold text-gray-700 cursor-pointer flex items-center gap-2">
                    <FaRoute className="text-orange-500" />
                    Round Trip (Need Return Ride)
                  </label>
                </div>

                {/* Return Date & Time */}
                {isRoundTrip && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-4 border-2 border-orange-100"
                  >
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      <FaCalendarAlt className="inline mr-2 text-orange-600" />
                      Return Schedule
                    </label>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Date</label>
                        <div className="relative">
                          <input
                            type="date"
                            value={returnDate}
                            onChange={(e) => setReturnDate(e.target.value)}
                            min={pickupDate || new Date().toISOString().split('T')[0]}
                            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors cursor-pointer bg-white text-sm"
                            style={{ zIndex: 10 }}
                          />
                          <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1.5">Time</label>
                        <div className="relative">
                          <input
                            type="time"
                            value={returnTime}
                            onChange={(e) => setReturnTime(e.target.value)}
                            className="w-full px-3 py-2.5 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none transition-colors cursor-pointer bg-white text-sm"
                            style={{ zIndex: 10 }}
                          />
                          <FaClock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Request Ride Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRequestRide}
                disabled={!pickupLocation || !dropoffLocation || isRequesting || (isRoundTrip && !returnDate)}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-200 ${
                  pickupLocation && dropoffLocation && !isRequesting && (!isRoundTrip || returnDate)
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-xl hover:shadow-cyan-500/50 cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isRequesting ? 'Requesting Ride...' : 'Request Ride'}
              </motion.button>

                  {/* Info Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
                <p className="text-sm text-blue-800">
                  💡 <strong>Tip:</strong> Our drivers will pick you up at your specified location. 
                  You'll receive real-time updates once a driver accepts your request.
                </p>
                <p className="text-xs text-blue-700">
                  📍 <strong>Select location:</strong> Click anywhere on the map or drag the green marker to set your pickup point.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccess || !!flash?.status} onOpenChange={(open) => {
        if (!open) {
          setShowSuccess(false);
        }
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-green-600">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <FaCheckCircle className="w-6 h-6 text-green-600" />
              </div>
              Success!
            </DialogTitle>
            <DialogDescription className="pt-4 text-base">
              {flash?.status || 'Ride request sent successfully!'}
              <br />
              <span className="text-sm text-gray-600 mt-2 block">
                Your ride request has been submitted. You'll receive updates once a driver accepts your request.
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setShowSuccess(false);
              }}
              className="border-gray-300 hover:bg-gray-50"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setShowSuccess(false);
                router.visit('/tropiride/profile');
              }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            >
              View My Bookings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
