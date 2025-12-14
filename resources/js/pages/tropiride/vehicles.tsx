import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  FaCar,
  FaUsers,
  FaMotorcycle,
  FaTruck,
  FaBicycle,
  FaPlane,
  FaShip,
  FaCalendarDay,
  FaExchangeAlt,
  FaPaypal,
  FaHandHoldingUsd,
  FaShieldAlt,
} from 'react-icons/fa';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PAYPAL_CONFIG } from '@/config/paypal';
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

// Service type definitions
type ServiceType = 'per_day_rental' | 'pickup_dropoff' | 'airport_port_transfer';
type TransferType = 'arrival' | 'departure';
type TransferLocation = 'airport' | 'port';

interface Location {
  lat: number;
  lng: number;
  address: string;
}

const serviceTypes = [
  {
    id: 'per_day_rental' as ServiceType,
    name: 'Per-Day Rental',
    shortName: 'Daily Rental',
    icon: FaCalendarDay,
    description: 'Rent with driver for one or multiple days',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-600',
  },
  {
    id: 'pickup_dropoff' as ServiceType,
    name: 'Pickup & Drop-off',
    shortName: 'Point-to-Point',
    icon: FaRoute,
    description: 'One-way transport between locations',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-500',
    textColor: 'text-green-600',
  },
  {
    id: 'airport_port_transfer' as ServiceType,
    name: 'Airport/Port Transfer',
    shortName: 'Transfer',
    icon: FaPlane,
    description: 'Arrivals & departures at airports/ports',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-600',
  }
];

const airportPortLocations = [
  { id: 'sayak', name: 'Sayak Airport (IAO)', type: 'airport' },
  { id: 'dapa_port', name: 'Dapa Port', type: 'port' },
  { id: 'general_luna_port', name: 'General Luna Port', type: 'port' },
  { id: 'surigao_port', name: 'Surigao Port', type: 'port' },
  { id: 'siargao_port', name: 'Siargao Main Port', type: 'port' }
];

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

// Vehicle pricing and capacity configuration (moved outside component to prevent re-creation)
const vehicleConfig = {
  'tricycle': { capacity: 3, dailyRate: 300, pickupDropoffRate: 150, airportPortRate: 200, name: 'Tricycle' },
  'tuktuk': { capacity: 4, dailyRate: 400, pickupDropoffRate: 180, airportPortRate: 250, name: 'Tuk-Tuk' },
  'habal-habal': { capacity: 2, dailyRate: 250, pickupDropoffRate: 120, airportPortRate: 150, name: 'Habal-Habal' },
  'multicab': { capacity: 8, dailyRate: 500, pickupDropoffRate: 250, airportPortRate: 350, name: 'Multicab' },
  'van': { capacity: 14, dailyRate: 700, pickupDropoffRate: 400, airportPortRate: 500, name: 'Van' },
};

export default function TropirideVehicles() {
  const { flash } = usePage().props as any;
  const [serviceType, setServiceType] = useState<ServiceType>('pickup_dropoff');
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>(SIARGAO_CENTER);
  const [estimatedFare, setEstimatedFare] = useState<number | null>(null);
  const [estimatedDistance, setEstimatedDistance] = useState<number | null>(null);
  const [estimatedTime, setEstimatedTime] = useState<number | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'paypal' | 'cash' | null>(null);
  const [isPaypalProcessing, setIsPaypalProcessing] = useState(false);
  const [paypalTransactionId, setPaypalTransactionId] = useState<string | null>(null);
  
  // Airport/Port transfer specific state
  const [transferType, setTransferType] = useState<TransferType>('arrival');
  const [transferLocation, setTransferLocation] = useState<TransferLocation>('airport');
  const [flightVesselNumber, setFlightVesselNumber] = useState('');
  const [arrivalDepartureTime, setArrivalDepartureTime] = useState('');
  const [terminalInfo, setTerminalInfo] = useState('');
  const [selectedAirportPort, setSelectedAirportPort] = useState('');
  
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
  const [dateValidationError, setDateValidationError] = useState<string>('');
  const [selectedVehicle, setSelectedVehicle] = useState<'tricycle' | 'tuktuk' | 'habal-habal' | 'multicab' | 'van'>('multicab');
  const [passengerCount, setPassengerCount] = useState<number>(1);
  const pickupInputRef = useRef<HTMLInputElement>(null);
  const dropoffInputRef = useRef<HTMLInputElement>(null);
  const geocodeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const autocompleteTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Validate dates whenever they change
  useEffect(() => {
    if (serviceType !== 'per_day_rental') {
      setDateValidationError('');
      return;
    }
    
    if (!pickupDate || !returnDate) {
      setDateValidationError('');
      return;
    }

    // Construct full datetime strings for comparison
    const pickupDateTime = pickupDate + (pickupTime ? ` ${pickupTime}` : ' 00:00');
    const returnDateTime = returnDate + (returnTime ? ` ${returnTime}` : ' 00:00');

    const pickupTimestamp = new Date(pickupDateTime).getTime();
    const returnTimestamp = new Date(returnDateTime).getTime();

    if (returnTimestamp < pickupTimestamp) {
      setDateValidationError('Return date/time must be after or equal to pickup date/time');
    } else {
      setDateValidationError('');
    }
  }, [pickupDate, pickupTime, returnDate, returnTime, serviceType]);

  // Auto-detect location on mount - GPS is optional
  useEffect(() => {
    setIsGettingLocation(true);
    
    if (navigator.geolocation) {
      // Request GPS location with relaxed settings
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
          // GPS failed or permission denied - silently fall back to default location
          // This is expected behavior if user denies permission
          setPickupLocation({
            lat: SIARGAO_CENTER[0],
            lng: SIARGAO_CENTER[1],
            address: 'Siargao Island'
          });
          setPickupInputValue('Siargao Island');
          setIsGettingLocation(false);
          setGpsAccuracy(null);
        },
        {
          enableHighAccuracy: false, // Use network/WiFi positioning (faster, less battery)
          timeout: 10000, // 10 second timeout
          maximumAge: 60000, // Accept positions up to 1 minute old
        }
      );
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

  // Calculate fare, distance, and time when both locations and dates are set
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
      
      // Calculate fare based on service type
      let fare = 0;
      const vehicle = vehicleConfig[selectedVehicle];
      
      switch (serviceType) {
        case 'per_day_rental':
          if (pickupDate && returnDate) {
            const pickup = new Date(pickupDate);
            const returnD = new Date(returnDate);
            const timeDiff = returnD.getTime() - pickup.getTime();
            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            const isSameDay = daysDiff === 0 || pickup.toDateString() === returnD.toDateString();
            
            if (isSameDay) {
              // Same-day rental rate
              const sameDayRates: Record<string, number> = {
                'habal-habal': 180,
                'tricycle': 220,
                'tuktuk': 280,
                'multicab': 350,
                'van': 500,
              };
              fare = sameDayRates[selectedVehicle] || vehicle.dailyRate;
            } else {
              fare = daysDiff * vehicle.dailyRate;
            }
          }
          break;
          
        case 'pickup_dropoff':
          // Per-km rates by vehicle type for point-to-point
          const perKmRates: Record<string, { base: number, perKm: number }> = {
            'habal-habal': { base: 20, perKm: 6 },
            'tricycle': { base: 25, perKm: 8 },
            'tuktuk': { base: 30, perKm: 10 },
            'multicab': { base: 35, perKm: 10 },
            'van': { base: 50, perKm: 12 },
          };
          const rates = perKmRates[selectedVehicle];
          fare = Math.round(rates.base + (distance * rates.perKm));
          break;
          
        case 'airport_port_transfer':
          fare = vehicle.airportPortRate;
          // Add 20% premium for late night/early morning transfers
          if (arrivalDepartureTime) {
            const hour = parseInt(arrivalDepartureTime.split(':')[0]);
            if (hour < 6 || hour >= 21) {
              fare = Math.round(fare * 1.2);
            }
          }
          break;
      }
      
      // Add passenger surcharge if exceeding capacity
      if (passengerCount > vehicle.capacity) {
        fare = Math.round(fare * 1.1);
      }
      
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
  }, [pickupLocation, dropoffLocation, selectedVehicle, pickupDate, returnDate, passengerCount, serviceType, arrivalDepartureTime]);

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
        (error) => {
          // GPS permission denied or unavailable
          setIsGettingLocation(false);
          setIsReverseGeocoding(false);
          setGpsAccuracy(null);
          
          // Show user-friendly message
          alert('Location access denied or unavailable. Please enter your location manually or click on the map.');
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    } else {
      alert('Geolocation is not supported by your browser. Please enter your location manually.');
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

  // Handle airport/port selection
  const handleAirportPortSelect = async (locationName: string) => {
    setSelectedAirportPort(locationName);
    
    // Geocode the airport/port location
    const location = await geocodeLocation(locationName);
    if (location) {
      if (transferType === 'arrival') {
        setPickupLocation(location);
        setPickupInputValue(locationName);
      } else {
        setDropoffLocation(location);
        setDropoffInputValue(locationName);
      }
      setMapCenter([location.lat, location.lng]);
    }
  };

  // Show payment modal when user clicks Book
  const handleRequestRide = () => {
    if (!pickupLocation || !dropoffLocation) return;
    
    // Validate based on service type
    if (serviceType === 'per_day_rental') {
      if (!pickupDate || !returnDate) {
        alert('Please select pickup and return dates for daily rental');
        return;
      }
      if (dateValidationError) {
        alert(dateValidationError);
        return;
      }
    }
    
    if (serviceType === 'pickup_dropoff') {
      if (!pickupDate) {
        alert('Please select the date for your trip');
        return;
      }
    }
    
    if (serviceType === 'airport_port_transfer') {
      if (!pickupDate || !flightVesselNumber || !arrivalDepartureTime) {
        alert('Please fill in all transfer details (date, flight/vessel number, and time)');
        return;
      }
    }
    
    // Show payment modal instead of directly submitting
    setShowPaymentModal(true);
  };

  // Submit booking after payment method is selected
  const submitBooking = () => {
    if (!selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }
    
    setShowPaymentModal(false);
    setIsRequesting(true);
    
    router.post('/tropiride/ride-request', {
      pickup_location: pickupLocation.address,
      pickup_lat: pickupLocation.lat,
      pickup_lng: pickupLocation.lng,
      dropoff_location: dropoffLocation.address,
      dropoff_lat: dropoffLocation.lat,
      dropoff_lng: dropoffLocation.lng,
      estimated_fare: estimatedFare || 0,
      distance_km: estimatedDistance || 0,
      estimated_time_minutes: estimatedTime || 0,
      pickup_date: pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : (pickupDate || null),
      return_date: serviceType === 'per_day_rental' ? (returnDate && returnTime ? `${returnDate} ${returnTime}` : (returnDate || null)) : null,
      vehicle_type: selectedVehicle,
      service_type: serviceType,
      passengers: passengerCount,
      flight_vessel_number: serviceType === 'airport_port_transfer' ? flightVesselNumber : null,
      terminal_info: serviceType === 'airport_port_transfer' ? terminalInfo : null,
      arrival_departure_time: serviceType === 'airport_port_transfer' ? arrivalDepartureTime : null,
      transfer_type: serviceType === 'airport_port_transfer' ? transferType : null,
      payment_method: selectedPaymentMethod,
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
        setFlightVesselNumber('');
        setArrivalDepartureTime('');
        setTerminalInfo('');
        setSelectedAirportPort('');
      },
      onError: (errors) => {
        setIsRequesting(false);
        console.error('Error requesting ride:', errors);
        
        // Display specific validation errors
        const errorMessages = Object.entries(errors)
          .map(([field, messages]) => {
            const messageArray = Array.isArray(messages) ? messages : [messages];
            return messageArray.join('\n');
          })
          .join('\n');
        
        if (errorMessages) {
          alert(`Failed to send ride request:\n\n${errorMessages}`);
        } else {
          alert('Failed to send ride request. Please try again or contact support.');
        }
      },
      onFinish: () => {
        setIsRequesting(false);
      }
    });
  };

  // Submit booking with PayPal transaction ID
  const submitBookingWithPaypal = (transactionId: string) => {
    setShowPaymentModal(false);
    setIsRequesting(true);
    
    router.post('/tropiride/ride-request', {
      pickup_location: pickupLocation.address,
      pickup_lat: pickupLocation.lat,
      pickup_lng: pickupLocation.lng,
      dropoff_location: dropoffLocation.address,
      dropoff_lat: dropoffLocation.lat,
      dropoff_lng: dropoffLocation.lng,
      estimated_fare: estimatedFare || 0,
      distance_km: estimatedDistance || 0,
      estimated_time_minutes: estimatedTime || 0,
      pickup_date: pickupDate && pickupTime ? `${pickupDate} ${pickupTime}` : (pickupDate || null),
      return_date: serviceType === 'per_day_rental' ? (returnDate && returnTime ? `${returnDate} ${returnTime}` : (returnDate || null)) : null,
      vehicle_type: selectedVehicle,
      service_type: serviceType,
      passengers: passengerCount,
      flight_vessel_number: serviceType === 'airport_port_transfer' ? flightVesselNumber : null,
      terminal_info: serviceType === 'airport_port_transfer' ? terminalInfo : null,
      arrival_departure_time: serviceType === 'airport_port_transfer' ? arrivalDepartureTime : null,
      transfer_type: serviceType === 'airport_port_transfer' ? transferType : null,
      payment_method: 'paypal',
      paypal_transaction_id: transactionId,
    }, {
      preserveScroll: true,
      onSuccess: (page) => {
        setIsRequesting(false);
        setShowSuccess(true);
        // Clear form fields after successful submission
        setDropoffLocation(null);
        setDropoffInputValue('');
        setPickupDate('');
        setPickupTime('');
        setReturnDate('');
        setReturnTime('');
        setFlightVesselNumber('');
        setArrivalDepartureTime('');
        setTerminalInfo('');
        setSelectedAirportPort('');
        setSelectedPaymentMethod(null);
        setPaypalTransactionId(null);
      },
      onError: (errors) => {
        setIsRequesting(false);
        console.error('Error requesting ride:', errors);
        
        const errorMessages = Object.entries(errors)
          .map(([field, messages]) => {
            const messageArray = Array.isArray(messages) ? messages : [messages];
            return messageArray.join('\n');
          })
          .join('\n');
        
        if (errorMessages) {
          alert(`Failed to send ride request:\n\n${errorMessages}`);
        } else {
          alert('Failed to send ride request. Please try again or contact support.');
        }
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

  const getActiveServiceType = () => {
    return serviceTypes.find(s => s.id === serviceType) || serviceTypes[0];
  };

  const canSubmit = () => {
    if (!pickupLocation || !dropoffLocation) return false;
    
    switch (serviceType) {
      case 'per_day_rental':
        return pickupDate && returnDate && !dateValidationError;
      case 'pickup_dropoff':
        return pickupDate && pickupTime;
      case 'airport_port_transfer':
        return pickupDate && flightVesselNumber && arrivalDepartureTime;
      default:
        return false;
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
          <div className="lg:w-[420px] w-full bg-white shadow-2xl overflow-y-auto">
            <div className="p-6 space-y-5">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Book a Ride</h2>
                <p className="text-gray-600 text-sm">Choose your service and enter details</p>
              </div>

              {/* Service Type Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Service Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {serviceTypes.map((service) => {
                    const Icon = service.icon;
                    const isSelected = serviceType === service.id;
                    
                    return (
                      <motion.button
                        key={service.id}
                        onClick={() => setServiceType(service.id)}
                        className={`relative p-3 rounded-xl border-2 transition-all duration-200 text-center ${
                          isSelected 
                            ? `${service.borderColor} ${service.bgColor} shadow-md` 
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSelected && (
                          <div className="absolute -top-1 -right-1">
                            <FaCheckCircle className={`${service.textColor} text-sm bg-white rounded-full`} />
                          </div>
                        )}
                        <div className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center mb-2 ${
                          isSelected ? `bg-gradient-to-r ${service.color}` : 'bg-gray-100'
                        }`}>
                          <Icon className={`text-lg ${isSelected ? 'text-white' : 'text-gray-500'}`} />
                        </div>
                        <p className={`text-xs font-semibold ${isSelected ? service.textColor : 'text-gray-700'}`}>
                          {service.shortName}
                        </p>
                      </motion.button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  {getActiveServiceType().description}
                </p>
              </div>

              {/* Vehicle Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <FaCar className="inline mr-2" />
                  Choose Your Vehicle
                </label>
                <div className="space-y-2">
                  {Object.entries(vehicleConfig).map(([id, vehicle]) => {
                    const isSelected = selectedVehicle === id;
                    const price = serviceType === 'per_day_rental' 
                      ? vehicle.dailyRate 
                      : serviceType === 'pickup_dropoff' 
                        ? vehicle.pickupDropoffRate 
                        : vehicle.airportPortRate;
                    const priceLabel = serviceType === 'per_day_rental' ? '/day' : '';
                    
                    const IconComponent = id === 'habal-habal' ? FaMotorcycle 
                      : id === 'tricycle' ? FaBicycle 
                      : id === 'van' ? FaTruck 
                      : FaCar;
                    
                    return (
                      <motion.div
                        key={id}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelectedVehicle(id as any)}
                        className={`cursor-pointer rounded-xl p-3 border-2 transition-all duration-200 ${
                          isSelected
                            ? 'border-cyan-500 bg-cyan-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-cyan-300'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2.5 rounded-lg ${
                              isSelected ? 'bg-cyan-500' : 'bg-gray-100'
                            }`}>
                              <IconComponent className={`text-lg ${
                                isSelected ? 'text-white' : 'text-gray-600'
                              }`} />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm text-gray-900">{vehicle.name}</h3>
                              <div className="flex items-center text-[10px] text-gray-500 space-x-1.5 mt-0.5">
                                <span className="flex items-center">
                                  <FaUsers className="mr-0.5 text-[9px]" />
                                  {vehicle.capacity} pax
                                </span>
                                <span>•</span>
                                <span className="font-medium text-cyan-600">₱{price}{priceLabel}</span>
                              </div>
                            </div>
                          </div>
                          {isSelected && (
                            <FaCheckCircle className="text-cyan-500 text-lg" />
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Airport/Port Transfer Options */}
              <AnimatePresence>
                {serviceType === 'airport_port_transfer' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 bg-purple-50 rounded-xl p-4 border-2 border-purple-200"
                  >
                    <h4 className="font-semibold text-purple-800 flex items-center text-sm">
                      <FaPlane className="mr-2" />
                      Transfer Details
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setTransferType('arrival')}
                        className={`p-2.5 rounded-lg border-2 transition-all text-sm ${
                          transferType === 'arrival'
                            ? 'bg-purple-600 border-purple-600 text-white'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300'
                        }`}
                      >
                        <FaPlane className="mx-auto mb-1" />
                        Arrival
                      </button>
                      <button
                        onClick={() => setTransferType('departure')}
                        className={`p-2.5 rounded-lg border-2 transition-all text-sm ${
                          transferType === 'departure'
                            ? 'bg-purple-600 border-purple-600 text-white'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300'
                        }`}
                      >
                        <FaPlane className="mx-auto mb-1 rotate-45" />
                        Departure
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setTransferLocation('airport')}
                        className={`p-2.5 rounded-lg border-2 transition-all text-sm ${
                          transferLocation === 'airport'
                            ? 'bg-purple-600 border-purple-600 text-white'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300'
                        }`}
                      >
                        <FaPlane className="mx-auto mb-1" />
                        Airport
                      </button>
                      <button
                        onClick={() => setTransferLocation('port')}
                        className={`p-2.5 rounded-lg border-2 transition-all text-sm ${
                          transferLocation === 'port'
                            ? 'bg-purple-600 border-purple-600 text-white'
                            : 'bg-white border-gray-200 text-gray-700 hover:border-purple-300'
                        }`}
                      >
                        <FaShip className="mx-auto mb-1" />
                        Seaport
                      </button>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-purple-700 mb-1">
                        {transferLocation === 'airport' ? 'Airport' : 'Port'} Name
                      </label>
                      <select
                        value={selectedAirportPort}
                        onChange={(e) => setSelectedAirportPort(e.target.value)}
                        className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-sm"
                      >
                        <option value="">Choose location...</option>
                        {airportPortLocations
                          .filter(loc => loc.type === transferLocation)
                          .map(loc => (
                            <option key={loc.id} value={loc.name}>{loc.name}</option>
                          ))
                        }
                      </select>
                      <p className="text-xs text-purple-600 mt-1">
                        Enter the pickup/drop-off location in the fields below
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-purple-700 mb-1">
                          {transferLocation === 'airport' ? 'Flight #' : 'Vessel/Ferry'}
                        </label>
                        <input
                          type="text"
                          value={flightVesselNumber}
                          onChange={(e) => setFlightVesselNumber(e.target.value)}
                          placeholder={transferLocation === 'airport' ? 'e.g. PR-2542' : 'e.g. FastCat M7'}
                          className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-purple-700 mb-1">
                          {transferType === 'arrival' ? 'Arrival' : 'Departure'} Time
                        </label>
                        <input
                          type="time"
                          value={arrivalDepartureTime}
                          onChange={(e) => setArrivalDepartureTime(e.target.value)}
                          className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-sm"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-medium text-purple-700 mb-1">
                        Terminal/Gate (Optional)
                      </label>
                      <input
                        type="text"
                        value={terminalInfo}
                        onChange={(e) => setTerminalInfo(e.target.value)}
                        placeholder="e.g. Terminal 1, Gate 5"
                        className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none text-sm"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Passenger Count */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaUsers className="inline mr-2" />
                  Passengers
                </label>
                <select
                  value={passengerCount}
                  onChange={(e) => setPassengerCount(parseInt(e.target.value))}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
                {(() => {
                  const vehicle = vehicleConfig[selectedVehicle];
                  if (passengerCount > vehicle.capacity) {
                    return (
                      <p className="mt-1.5 text-xs text-orange-600 font-medium">
                        ⚠️ Exceeds capacity (+10% surcharge)
                      </p>
                    );
                  }
                  return null;
                })()}
              </div>

              {/* Pickup Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaMapMarkerAlt className="inline mr-2 text-green-500" />
                  Pickup Location
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <input
                    ref={pickupInputRef}
                    type="text"
                    placeholder="Enter pickup location"
                    value={pickupInputValue}
                    disabled={isGettingLocation}
                    onChange={(e) => handlePickupInputChange(e.target.value)}
                    onFocus={() => {
                      setActiveField('pickup');
                      if (pickupSuggestions.length > 0) setShowPickupSuggestions(true);
                    }}
                    onBlur={() => setTimeout(() => setShowPickupSuggestions(false), 200)}
                    className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors text-sm disabled:bg-gray-100"
                  />
                  {showPickupSuggestions && pickupSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border-2 border-cyan-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                      {pickupSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handlePickupSuggestionSelect(suggestion)}
                          className="w-full text-left px-4 py-2.5 hover:bg-cyan-50 border-b border-gray-100 last:border-b-0 text-sm"
                        >
                          <FaMapMarkerAlt className="inline mr-2 text-cyan-600" />
                          {suggestion.address}
                        </button>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={handleSetCurrentLocation}
                    disabled={isGettingLocation}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cyan-600 hover:text-cyan-700"
                  >
                    <FaLocationArrow />
                  </button>
                </div>
              </div>

              {/* Swap Button */}
              {pickupLocation && dropoffLocation && serviceType !== 'airport_port_transfer' && (
                <div className="flex justify-center">
                  <button
                    onClick={swapLocations}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <FaExchangeAlt className="text-gray-600 rotate-90" />
                  </button>
                </div>
              )}

              {/* Dropoff Location */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaMapMarkerAlt className="inline mr-2 text-red-500" />
                  Drop-off Location
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                  </div>
                  <input
                    ref={dropoffInputRef}
                    type="text"
                    placeholder="Enter drop-off location"
                    value={dropoffInputValue}
                    onChange={(e) => handleDropoffInputChange(e.target.value)}
                    onFocus={() => {
                      setActiveField('dropoff');
                      if (dropoffSuggestions.length > 0) setShowDropoffSuggestions(true);
                    }}
                    onBlur={() => setTimeout(() => setShowDropoffSuggestions(false), 200)}
                    className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-cyan-500 focus:outline-none transition-colors text-sm"
                  />
                  {showDropoffSuggestions && dropoffSuggestions.length > 0 && (
                    <div className="absolute z-50 w-full mt-1 bg-white border-2 border-red-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                      {dropoffSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => handleDropoffSuggestionSelect(suggestion)}
                          className="w-full text-left px-4 py-2.5 hover:bg-red-50 border-b border-gray-100 last:border-b-0 text-sm"
                        >
                          <FaMapMarkerAlt className="inline mr-2 text-red-600" />
                          {suggestion.address}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Date Selection - Conditional based on service type */}
              <div className="space-y-3">
                {/* Pickup Date */}
                <div className={`rounded-xl p-4 border-2 ${
                  serviceType === 'per_day_rental' ? 'bg-blue-50 border-blue-200' 
                  : serviceType === 'pickup_dropoff' ? 'bg-green-50 border-green-200'
                  : 'bg-purple-50 border-purple-200'
                }`}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaCalendarAlt className="inline mr-2" />
                    {serviceType === 'per_day_rental' ? 'Pickup Date & Time' : 'Date'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none text-sm"
                    />
                    {(serviceType === 'per_day_rental' || serviceType === 'pickup_dropoff') && (
                      <input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:border-cyan-500 focus:outline-none text-sm"
                      />
                    )}
                  </div>
                </div>

                {/* Return Date - Only for Per-Day Rental */}
                {serviceType === 'per_day_rental' && (
                  <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaCalendarAlt className="inline mr-2" />
                      Return Date & Time
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        min={pickupDate || new Date().toISOString().split('T')[0]}
                        className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-sm"
                      />
                      <input
                        type="time"
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none text-sm"
                      />
                    </div>
                    {dateValidationError && (
                      <p className="mt-2 text-xs text-red-600">{dateValidationError}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Fare Estimation */}
              {estimatedFare && estimatedFare > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`rounded-xl p-4 border-2 ${
                    serviceType === 'per_day_rental' ? 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200'
                    : serviceType === 'pickup_dropoff' ? 'bg-gradient-to-br from-green-50 to-teal-50 border-green-200'
                    : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        serviceType === 'per_day_rental' ? 'bg-blue-500'
                        : serviceType === 'pickup_dropoff' ? 'bg-green-500'
                        : 'bg-purple-500'
                      }`}>
                        <FaMoneyBillWave className="text-white text-sm" />
                      </div>
                      <span className="font-semibold text-gray-700">Estimated Fare</span>
                    </div>
                    <span className="text-2xl font-black text-gray-900">₱{estimatedFare}</span>
                  </div>
                  
                  {estimatedDistance && estimatedTime && (
                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <span><FaRoute className="inline mr-1" /> {estimatedDistance.toFixed(1)} km</span>
                      <span><FaClock className="inline mr-1" /> ~{estimatedTime} min</span>
                    </div>
                  )}
                  
                  <p className="text-xs text-gray-500 mt-2">
                    {serviceType === 'per_day_rental' && pickupDate && returnDate && (
                      `${Math.max(1, Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24)))} day(s) rental`
                    )}
                    {serviceType === 'pickup_dropoff' && 'One-way transfer'}
                    {serviceType === 'airport_port_transfer' && (
                      `${transferType === 'arrival' ? 'Arrival' : 'Departure'} transfer${
                        arrivalDepartureTime && (parseInt(arrivalDepartureTime.split(':')[0]) < 6 || parseInt(arrivalDepartureTime.split(':')[0]) >= 21) 
                          ? ' (+20% off-hours)' 
                          : ''
                      }`
                    )}
                  </p>
                </motion.div>
              )}

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: canSubmit() ? 1.02 : 1 }}
                whileTap={{ scale: canSubmit() ? 0.98 : 1 }}
                onClick={handleRequestRide}
                disabled={!canSubmit() || isRequesting}
                className={`w-full py-4 rounded-xl font-bold text-base transition-all duration-200 ${
                  canSubmit() && !isRequesting
                    ? `bg-gradient-to-r ${getActiveServiceType().color} text-white hover:shadow-xl cursor-pointer`
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isRequesting ? 'Submitting...' : `Book ${getActiveServiceType().shortName}`}
              </motion.button>

              {/* Help Text */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                <p className="text-xs text-gray-600">
                  💡 <strong>Tips:</strong> Click on the map to set locations. Drag the green marker to adjust pickup point.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Modal */}
      <Dialog open={showPaymentModal} onOpenChange={(open) => {
        if (!open) {
          setShowPaymentModal(false);
        }
      }}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-gray-900">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                <FaMoneyBillWave className="w-5 h-5 text-white" />
              </div>
              Select Payment Method
            </DialogTitle>
            <DialogDescription className="pt-2">
              Choose how you'd like to pay for your booking
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-3">
            {/* PayPal */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPaymentMethod('paypal')}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                selectedPaymentMethod === 'paypal'
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-blue-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                selectedPaymentMethod === 'paypal' ? 'bg-blue-600' : 'bg-gray-100'
              }`}>
                <FaPaypal className={`text-xl ${
                  selectedPaymentMethod === 'paypal' ? 'text-white' : 'text-[#003087]'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">PayPal</p>
                <p className="text-sm text-gray-500">Pay securely with your PayPal account</p>
              </div>
              {selectedPaymentMethod === 'paypal' && (
                <FaCheckCircle className="text-blue-500 text-xl" />
              )}
            </motion.button>

            {/* PayPal Payment Section - Shows when PayPal is selected */}
            {selectedPaymentMethod === 'paypal' && estimatedFare && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200"
              >
                <div className="flex items-center gap-2 mb-4">
                  <FaShieldAlt className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Secure PayPal Payment</span>
                </div>
                
                <div className="bg-white rounded-lg p-4 mb-4 border border-blue-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Booking Total</span>
                    <span className="text-2xl font-bold text-gray-900">₱{estimatedFare}</span>
                  </div>
                  <p className="text-xs text-gray-500">You will be redirected to PayPal to complete your payment</p>
                </div>

                {isPaypalProcessing && (
                  <div className="flex items-center justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="ml-3 text-blue-700">Processing payment...</span>
                  </div>
                )}

                <PayPalScriptProvider options={{
                  clientId: PAYPAL_CONFIG.CLIENT_ID,
                  currency: 'PHP',
                  intent: 'capture',
                }}>
                  <PayPalButtons
                    style={{
                      layout: 'vertical',
                      color: 'blue',
                      shape: 'rect',
                      label: 'paypal',
                      height: 45
                    }}
                    disabled={isPaypalProcessing}
                    createOrder={(data, actions) => {
                      setIsPaypalProcessing(true);
                      return actions.order.create({
                        intent: 'CAPTURE',
                        purchase_units: [{
                          amount: {
                            currency_code: 'PHP',
                            value: estimatedFare.toString()
                          },
                          description: `Tropiride ${serviceType === 'per_day_rental' ? 'Per-Day Rental' : serviceType === 'pickup_dropoff' ? 'Pickup & Drop-off' : 'Airport/Port Transfer'} - ${vehicleConfig[selectedVehicle].name}`
                        }]
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order!.capture().then((details: any) => {
                        setIsPaypalProcessing(false);
                        setPaypalTransactionId(details.purchase_units[0].payments.captures[0].id);
                        // Submit booking with PayPal transaction details
                        submitBookingWithPaypal(details.purchase_units[0].payments.captures[0].id);
                      });
                    }}
                    onError={(err) => {
                      setIsPaypalProcessing(false);
                      console.error('PayPal error:', err);
                      alert('PayPal payment failed. Please try again.');
                    }}
                    onCancel={() => {
                      setIsPaypalProcessing(false);
                    }}
                  />
                </PayPalScriptProvider>

                <div className="flex items-center gap-2 mt-3 text-xs text-gray-500">
                  <FaShieldAlt className="text-green-500" />
                  <span>Your payment is protected by PayPal Buyer Protection</span>
                </div>
              </motion.div>
            )}

            {/* Cash on Hand */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPaymentMethod('cash')}
              className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 ${
                selectedPaymentMethod === 'cash'
                  ? 'border-green-500 bg-green-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-green-300'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                selectedPaymentMethod === 'cash' ? 'bg-green-500' : 'bg-gray-100'
              }`}>
                <FaHandHoldingUsd className={`text-xl ${
                  selectedPaymentMethod === 'cash' ? 'text-white' : 'text-gray-600'
                }`} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900">Cash Payment</p>
                <p className="text-sm text-gray-500">Pay the driver directly upon service</p>
              </div>
              {selectedPaymentMethod === 'cash' && (
                <FaCheckCircle className="text-green-500 text-xl" />
              )}
            </motion.button>

            {/* Cash Payment Info - Shows when Cash is selected */}
            {selectedPaymentMethod === 'cash' && estimatedFare && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200"
              >
                <div className="flex items-start gap-3">
                  <FaHandHoldingUsd className="text-green-600 text-xl mt-0.5" />
                  <div>
                    <p className="font-medium text-green-800">Pay in Cash</p>
                    <p className="text-sm text-green-700 mt-1">
                      Please prepare the exact amount of <span className="font-bold">₱{estimatedFare}</span> to pay the driver when your service begins.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Booking Summary - Only show if payment method not selected yet */}
          {estimatedFare && !selectedPaymentMethod && (
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-2xl font-bold text-gray-900">₱{estimatedFare}</span>
              </div>
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowPaymentModal(false);
                setSelectedPaymentMethod(null);
              }}
              disabled={isPaypalProcessing}
              className="border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            {/* Only show Confirm button for Cash payment - PayPal handles its own submission */}
            {selectedPaymentMethod === 'cash' && (
              <Button
                onClick={submitBooking}
                disabled={isRequesting}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isRequesting ? 'Processing...' : 'Confirm Cash Payment'}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              Booking Submitted!
            </DialogTitle>
            <DialogDescription className="pt-4 text-base">
              {flash?.status || 'Your booking request has been sent successfully!'}
              <br />
              <span className="text-sm text-gray-600 mt-2 block">
                You'll receive updates once a driver accepts your {getActiveServiceType().name.toLowerCase()} request.
              </span>
              {selectedPaymentMethod && (
                <span className="text-sm text-gray-600 mt-2 block">
                  <strong>Payment Method:</strong> {
                    selectedPaymentMethod === 'debit' ? 'Debit/Credit Card' :
                    selectedPaymentMethod === 'paypal' ? 'PayPal' : 'Cash Payment'
                  }
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => {
                setShowSuccess(false);
                setSelectedPaymentMethod(null);
              }}
              className="border-gray-300 hover:bg-gray-50"
            >
              Close
            </Button>
            <Button
              onClick={() => {
                setShowSuccess(false);
                setSelectedPaymentMethod(null);
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
