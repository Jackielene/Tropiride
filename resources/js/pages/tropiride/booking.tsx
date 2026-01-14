import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  FaCar, 
  FaTruck, 
  FaCalendarAlt, 
  FaUsers, 
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCheck,
  FaArrowLeft,
  FaArrowRight,
  FaUser,
  FaCreditCard,
  FaShieldAlt,
  FaPaypal,
  FaPlane,
  FaShip,
  FaClock,
  FaExchangeAlt,
  FaCalendarDay,
  FaRoute
} from 'react-icons/fa';
import { Head, Link, router, usePage } from '@inertiajs/react';
import PaymentHandler from '@/components/payments/PaymentHandler';

// Service type definitions
type ServiceType = 'per_day_rental' | 'pickup_dropoff' | 'airport_port_transfer';
type TransferType = 'arrival' | 'departure';
type TransferLocation = 'airport' | 'port';

interface BookingData {
  serviceType: ServiceType;
  vehicleType: 'tricycle' | 'tuktuk' | 'habal-habal' | 'multicab' | 'van' | null;
  pickupDate: Date | null;
  returnDate: Date | null;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  passengers: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  specialRequests: string;
  // Airport/Port specific fields
  transferType: TransferType;
  transferLocation: TransferLocation;
  flightVesselNumber: string;
  terminalInfo: string;
  arrivalDepartureTime: string;
}

const serviceTypes = [
  {
    id: 'per_day_rental' as ServiceType,
    name: 'Per-Day Rental',
    icon: FaCalendarDay,
    description: 'Rent a vehicle with driver for one or multiple days',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    features: ['Full day availability', 'Flexible itinerary', 'Best for island tours']
  },
  {
    id: 'pickup_dropoff' as ServiceType,
    name: 'Pickup & Drop-off',
    icon: FaRoute,
    description: 'Point-to-point transport between two locations',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    features: ['One-way trips', 'Quick transport', 'Best for specific destinations']
  },
  {
    id: 'airport_port_transfer' as ServiceType,
    name: 'Airport/Port Transfer',
    icon: FaPlane,
    description: 'Reliable transfers to/from airports and seaports',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    features: ['Flight/vessel tracking', 'Meet & greet', 'Luggage assistance']
  }
];

const vehicleOptions = [
  {
    id: 'habal-habal',
    name: 'Habal-Habal',
    icon: FaCar,
    capacity: '1-2 passengers',
    maxCapacity: 2,
    price: 250,
    pickupDropoffPrice: 120,
    airportPortPrice: 150,
    features: ['Motorcycle taxi', 'Quick and agile', 'Best for short trips']
  },
  {
    id: 'tricycle',
    name: 'Tricycle',
    icon: FaCar,
    capacity: '1-3 passengers',
    maxCapacity: 3,
    price: 300,
    pickupDropoffPrice: 150,
    airportPortPrice: 200,
    features: ['Covered seating', 'Local transportation', 'Good for city travel']
  },
  {
    id: 'tuktuk',
    name: 'Tuk-Tuk',
    icon: FaCar,
    capacity: '1-4 passengers',
    maxCapacity: 4,
    price: 400,
    pickupDropoffPrice: 180,
    airportPortPrice: 250,
    features: ['Open-air experience', 'Tourist favorite', 'Comfortable seating']
  },
  {
    id: 'multicab',
    name: 'Multicab',
    icon: FaCar,
    capacity: '6-8 passengers',
    maxCapacity: 8,
    price: 500,
    pickupDropoffPrice: 250,
    airportPortPrice: 350,
    features: ['Air conditioning', 'Local driver', 'Insurance included']
  },
  {
    id: 'van',
    name: 'Van',
    icon: FaTruck,
    capacity: '10-14 passengers',
    maxCapacity: 14,
    price: 700,
    pickupDropoffPrice: 400,
    airportPortPrice: 500,
    features: ['Air conditioning', 'Professional driver', 'Insurance included', 'Free water']
  }
];

const locations = [
  'General Luna',
  'Dapa',
  'Del Carmen',
  'Santa Monica',
  'Burgos',
  'San Isidro',
  'Pilar',
  'San Benito',
  'Socorro'
];

const airportPortLocations = [
  { id: 'sayak', name: 'Sayak Airport (IAO)', type: 'airport' },
  { id: 'dapa_port', name: 'Dapa Port', type: 'port' },
  { id: 'general_luna_port', name: 'General Luna Port', type: 'port' },
  { id: 'surigao_port', name: 'Surigao Port', type: 'port' },
  { id: 'siargao_port', name: 'Siargao Main Port', type: 'port' }
];

const passengerOptions = [
  { value: 1, label: '1 Passenger' },
  { value: 2, label: '2 Passengers' },
  { value: 3, label: '3 Passengers' },
  { value: 4, label: '4 Passengers' },
  { value: 5, label: '5 Passengers' },
  { value: 6, label: '6 Passengers' },
  { value: 7, label: '7 Passengers' },
  { value: 8, label: '8 Passengers' },
  { value: 9, label: '9 Passengers' },
  { value: 10, label: '10 Passengers' },
  { value: 11, label: '11 Passengers' },
  { value: 12, label: '12 Passengers' },
  { value: 13, label: '13 Passengers' },
  { value: 14, label: '14 Passengers' }
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

export default function TropirideBooking() {
  const { auth } = usePage().props as any;
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [bookingData, setBookingData] = useState<BookingData>({
    serviceType: 'per_day_rental',
    vehicleType: null,
    pickupDate: null,
    returnDate: null,
    pickupTime: '',
    pickupLocation: '',
    dropoffLocation: '',
    passengers: 1,
    customerInfo: {
      name: '',
      email: '',
      phone: ''
    },
    specialRequests: '',
    // Airport/Port specific
    transferType: 'arrival',
    transferLocation: 'airport',
    flightVesselNumber: '',
    terminalInfo: '',
    arrivalDepartureTime: ''
  });

  const totalSteps = 4; // Added step for service type selection

  // Redirect drivers to their dashboard - they should not access customer pages
  useEffect(() => {
    if (auth?.user?.role === 'driver') {
      router.visit('/driver/dashboard');
    }
  }, [auth]);

  // Check URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const vehicleParam = urlParams.get('vehicle');
    const serviceParam = urlParams.get('service') as ServiceType | null;
    
    if (vehicleParam === 'multicab' || vehicleParam === 'van' || vehicleParam === 'tricycle' || 
        vehicleParam === 'tuktuk' || vehicleParam === 'habal-habal') {
      setBookingData(prev => ({ ...prev, vehicleType: vehicleParam as any }));
    }
    
    if (serviceParam && ['per_day_rental', 'pickup_dropoff', 'airport_port_transfer'].includes(serviceParam)) {
      setBookingData(prev => ({ ...prev, serviceType: serviceParam }));
    }
  }, []);

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData(prev => {
      const newData = { ...prev, ...updates };
      
      // If pickup date is being updated and service type is per_day_rental, ensure return date logic
      if (updates.pickupDate && prev.serviceType === 'per_day_rental' && newData.returnDate) {
        const pickupDate = updates.pickupDate;
        const returnDate = newData.returnDate;
        
        if (returnDate <= pickupDate) {
          const nextDay = new Date(pickupDate);
          nextDay.setDate(nextDay.getDate() + 1);
          newData.returnDate = nextDay;
        }
      }
      
      // For pickup_dropoff and airport_port_transfer, set returnDate same as pickupDate
      if ((newData.serviceType === 'pickup_dropoff' || newData.serviceType === 'airport_port_transfer') 
          && updates.pickupDate) {
        newData.returnDate = updates.pickupDate;
      }
      
      return newData;
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const calculateTotal = () => {
    if (!bookingData.vehicleType || !bookingData.pickupDate) return 0;
    
    const selectedVehicle = vehicleOptions.find(v => v.id === bookingData.vehicleType);
    if (!selectedVehicle) return 0;
    
    let total = 0;
    
    switch (bookingData.serviceType) {
      case 'per_day_rental':
        if (!bookingData.returnDate) return 0;
        
        const startDate = bookingData.pickupDate;
        const endDate = bookingData.returnDate;
        const timeDiff = endDate.getTime() - startDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        const isSameDay = daysDiff === 0 || startDate.toDateString() === endDate.toDateString();
        
        if (isSameDay) {
          // Same-day rental: Use fixed rate
          const sameDayRates: Record<string, number> = {
            'habal-habal': 180,
            'tricycle': 220,
            'tuktuk': 280,
            'multicab': 350,
            'van': 500,
          };
          total = sameDayRates[bookingData.vehicleType] || selectedVehicle.price;
        } else {
          // Multi-day rental: daily rate × number of days
          total = daysDiff * selectedVehicle.price;
        }
        break;
        
      case 'pickup_dropoff':
        total = selectedVehicle.pickupDropoffPrice;
        break;
        
      case 'airport_port_transfer':
        total = selectedVehicle.airportPortPrice;
        // Add 20% premium for late night/early morning transfers (before 6am or after 9pm)
        if (bookingData.arrivalDepartureTime) {
          const hour = parseInt(bookingData.arrivalDepartureTime.split(':')[0]);
          if (hour < 6 || hour >= 21) {
            total = Math.round(total * 1.2);
          }
        }
        break;
    }
    
    // Add passenger surcharge if exceeding typical capacity
    if (bookingData.passengers > selectedVehicle.maxCapacity) {
      total = Math.round(total * 1.1);
    }
    
    return total;
  };

  const handlePaymentSuccess = (completeBookingData: any) => {
    setPaymentStatus('success');
    
    const confirmationData = {
      id: `TRP-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      serviceType: bookingData.serviceType,
      vehicleType: completeBookingData.vehicleType,
      vehicleName: vehicleOptions.find(v => v.id === completeBookingData.vehicleType)?.name || 'Vehicle',
      pickupDate: completeBookingData.pickupDate instanceof Date 
        ? completeBookingData.pickupDate.toISOString() 
        : completeBookingData.pickupDate,
      returnDate: completeBookingData.returnDate instanceof Date 
        ? completeBookingData.returnDate.toISOString() 
        : completeBookingData.returnDate,
      pickupTime: completeBookingData.pickupTime,
      pickupLocation: completeBookingData.pickupLocation,
      dropoffLocation: completeBookingData.dropoffLocation,
      passengers: completeBookingData.passengers,
      customerInfo: completeBookingData.customerInfo,
      specialRequests: completeBookingData.specialRequests || '',
      payment: completeBookingData.payment,
      // Airport/Port specific
      transferType: completeBookingData.transferType,
      transferLocation: completeBookingData.transferLocation,
      flightVesselNumber: completeBookingData.flightVesselNumber,
      terminalInfo: completeBookingData.terminalInfo,
      arrivalDepartureTime: completeBookingData.arrivalDepartureTime,
      driverInfo: completeBookingData.driverInfo || {
        name: 'Miguel Santos',
        phone: '+63 987 654 3210',
        vehiclePlate: 'ABC-1234'
      }
    };
    
    router.post('/tropiride/booking/confirm', confirmationData, {
      onSuccess: () => {
        // The route will redirect to confirmation page automatically
      }
    });
  };

  const handlePaymentError = (error: any) => {
    setPaymentStatus('error');
    console.error('Payment error:', error);
  };

  const handlePaymentCancel = () => {
    setPaymentStatus('idle');
    console.log('Payment cancelled');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        // Service type is always selected (has default)
        return true;
      case 2:
        // Vehicle and trip details
        if (!bookingData.vehicleType || !bookingData.pickupDate || !bookingData.pickupLocation.trim()) {
          return false;
        }
        
        if (bookingData.serviceType === 'per_day_rental') {
          if (!bookingData.returnDate || bookingData.returnDate <= bookingData.pickupDate) {
            return false;
          }
        }
        
        if (bookingData.serviceType === 'pickup_dropoff') {
          if (!bookingData.dropoffLocation.trim() || !bookingData.pickupTime) {
            return false;
          }
        }
        
        if (bookingData.serviceType === 'airport_port_transfer') {
          if (!bookingData.flightVesselNumber.trim() || !bookingData.arrivalDepartureTime) {
            return false;
          }
        }
        
        return true;
      case 3:
        return bookingData.customerInfo.name.trim() !== '' && 
               bookingData.customerInfo.email.trim() !== '' && 
               bookingData.customerInfo.phone.trim() !== '';
      case 4:
        return true;
      default:
        return false;
    }
  };

  const getMissingFields = () => {
    if (currentStep === 2) {
      const missing = [];
      if (!bookingData.vehicleType) missing.push('Vehicle Selection');
      if (!bookingData.pickupDate) missing.push('Date');
      if (!bookingData.pickupLocation.trim()) missing.push('Pickup Location');
      
      if (bookingData.serviceType === 'per_day_rental') {
        if (!bookingData.returnDate) missing.push('Return Date');
        if (bookingData.pickupDate && bookingData.returnDate && bookingData.returnDate <= bookingData.pickupDate) {
          missing.push('Return date must be after pickup date');
        }
      }
      
      if (bookingData.serviceType === 'pickup_dropoff') {
        if (!bookingData.dropoffLocation.trim()) missing.push('Drop-off Location');
        if (!bookingData.pickupTime) missing.push('Pickup Time');
      }
      
      if (bookingData.serviceType === 'airport_port_transfer') {
        if (!bookingData.flightVesselNumber.trim()) missing.push('Flight/Vessel Number');
        if (!bookingData.arrivalDepartureTime) missing.push('Arrival/Departure Time');
      }
      
      return missing;
    }
    if (currentStep === 3) {
      const missing = [];
      if (!bookingData.customerInfo.name.trim()) missing.push('Full Name');
      if (!bookingData.customerInfo.email.trim()) missing.push('Email Address');
      if (!bookingData.customerInfo.phone.trim()) missing.push('Phone Number');
      return missing;
    }
    return [];
  };

  const getServiceLabel = () => {
    return serviceTypes.find(s => s.id === bookingData.serviceType)?.name || 'Service';
  };

  const getStepLabels = () => {
    return ['Service Type', 'Trip Details', 'Your Info', 'Payment'];
  };

  return (
    <>
      <Head title="Book Your Vehicle - Tropiride" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
        {/* Header */}
        <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-lg flex items-center justify-center">
                  <FaCar className="text-slate-900 text-sm" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">Tropiride</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <Link href="/tropiride/vehicles" className="text-slate-300 hover:text-cyan-400 transition-colors text-sm">
                  Back to Vehicles
                </Link>
                <div className="text-sm text-slate-400">
                  Step {currentStep} of {totalSteps}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-800/50 border-b border-slate-700/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              {getStepLabels().map((label, index) => {
                const step = index + 1;
                return (
                  <div key={step} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300
                        ${step < currentStep 
                          ? 'bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-900' 
                          : step === currentStep
                            ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white ring-4 ring-cyan-400/30'
                            : 'bg-slate-700 text-slate-400'
                        }
                      `}>
                        {step < currentStep ? <FaCheck /> : step}
                      </div>
                      <span className={`text-xs mt-2 hidden sm:block ${
                        step <= currentStep ? 'text-cyan-400' : 'text-slate-500'
                      }`}>
                        {label}
                      </span>
                    </div>
                    {step < totalSteps && (
                      <div className={`flex-1 h-1 mx-2 rounded ${
                        step < currentStep 
                          ? 'bg-gradient-to-r from-cyan-400 to-teal-400' 
                          : 'bg-slate-700'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Service Type Selection */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                {...fadeInUp}
                className="bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-slate-700/50"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Choose Your Service</h2>
                  <p className="text-slate-400">Select the type of transport service you need</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {serviceTypes.map((service) => {
                    const Icon = service.icon;
                    const isSelected = bookingData.serviceType === service.id;
                    
                    return (
                      <motion.button
                        key={service.id}
                        onClick={() => updateBookingData({ serviceType: service.id })}
                        className={`
                          relative p-6 rounded-xl border-2 transition-all duration-300 text-left
                          ${isSelected 
                            ? `bg-gradient-to-br ${service.color} border-transparent shadow-lg shadow-cyan-500/20` 
                            : 'bg-slate-700/50 border-slate-600/50 hover:border-slate-500 hover:bg-slate-700'
                          }
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSelected && (
                          <div className="absolute top-3 right-3">
                            <FaCheck className="text-white" />
                          </div>
                        )}
                        
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${
                          isSelected ? 'bg-white/20' : `bg-gradient-to-br ${service.color}`
                        }`}>
                          <Icon className={`text-2xl ${isSelected ? 'text-white' : 'text-white'}`} />
                        </div>
                        
                        <h3 className={`text-lg font-bold mb-2 ${isSelected ? 'text-white' : 'text-white'}`}>
                          {service.name}
                        </h3>
                        <p className={`text-sm mb-4 ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                          {service.description}
                        </p>
                        
                        <ul className="space-y-1">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className={`text-xs flex items-center ${
                              isSelected ? 'text-white/70' : 'text-slate-500'
                            }`}>
                              <span className="mr-2">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* Step 2: Trip Details */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                {...fadeInUp}
                className="bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-slate-700/50"
              >
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r ${
                    serviceTypes.find(s => s.id === bookingData.serviceType)?.color
                  } text-white text-sm font-medium mb-4`}>
                    {serviceTypes.find(s => s.id === bookingData.serviceType)?.icon && (
                      <span className="mr-2">
                        {(() => {
                          const Icon = serviceTypes.find(s => s.id === bookingData.serviceType)?.icon;
                          return Icon ? <Icon /> : null;
                        })()}
                      </span>
                    )}
                    {getServiceLabel()}
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Trip Details</h2>
                  <p className="text-slate-400">Tell us about your journey</p>
                </div>

                <div className="space-y-6">
                  {/* Vehicle Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      <FaCar className="inline mr-2 text-cyan-400" />
                      Select Vehicle
                    </label>
                    <select
                      value={bookingData.vehicleType || ''}
                      onChange={(e) => updateBookingData({ vehicleType: e.target.value as any })}
                      className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 text-white"
                    >
                      <option value="" disabled className="text-slate-400">Select a vehicle</option>
                      {vehicleOptions.map((vehicle) => {
                        const price = bookingData.serviceType === 'pickup_dropoff' 
                          ? vehicle.pickupDropoffPrice 
                          : bookingData.serviceType === 'airport_port_transfer'
                            ? vehicle.airportPortPrice
                            : vehicle.price;
                        const priceLabel = bookingData.serviceType === 'per_day_rental' ? '/day' : '';
                        
                        return (
                          <option key={vehicle.id} value={vehicle.id} className="bg-slate-700 text-white">
                            {vehicle.name} - {vehicle.capacity} (₱{price}{priceLabel})
                          </option>
                        );
                      })}
                    </select>
                    
                    {bookingData.vehicleType && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-3 p-4 bg-slate-700/30 rounded-xl border border-slate-600/50"
                      >
                        {(() => {
                          const selectedVehicle = vehicleOptions.find(v => v.id === bookingData.vehicleType);
                          if (!selectedVehicle) return null;
                          
                          const price = bookingData.serviceType === 'pickup_dropoff' 
                            ? selectedVehicle.pickupDropoffPrice 
                            : bookingData.serviceType === 'airport_port_transfer'
                              ? selectedVehicle.airportPortPrice
                              : selectedVehicle.price;
                          
                          return (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-white">{selectedVehicle.name}</span>
                                <span className="text-cyan-400 font-bold">
                                  ₱{price}
                                  {bookingData.serviceType === 'per_day_rental' && '/day'}
                                </span>
                              </div>
                              <div className="text-sm text-slate-400">
                                <FaUsers className="inline mr-1" />
                                {selectedVehicle.capacity}
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {selectedVehicle.features.map((feature, idx) => (
                                  <span key={idx} className="text-xs px-2 py-1 bg-slate-600/50 rounded-full text-slate-300 border border-slate-500/50">
                                    ✓ {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })()}
                      </motion.div>
                    )}
                  </div>

                  {/* Airport/Port Transfer Specific Fields */}
                  {bookingData.serviceType === 'airport_port_transfer' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="space-y-4 p-4 bg-purple-900/20 rounded-xl border border-purple-500/30"
                    >
                      <h4 className="font-semibold text-purple-300 flex items-center">
                        <FaPlane className="mr-2" />
                        Transfer Details
                      </h4>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Transfer Type</label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => updateBookingData({ transferType: 'arrival' })}
                              className={`p-3 rounded-lg border transition-all ${
                                bookingData.transferType === 'arrival'
                                  ? 'bg-purple-600 border-purple-500 text-white'
                                  : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
                              }`}
                            >
                              <FaPlane className="mx-auto mb-1" />
                              <span className="text-sm">Arrival</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => updateBookingData({ transferType: 'departure' })}
                              className={`p-3 rounded-lg border transition-all ${
                                bookingData.transferType === 'departure'
                                  ? 'bg-purple-600 border-purple-500 text-white'
                                  : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
                              }`}
                            >
                              <FaPlane className="mx-auto mb-1 rotate-45" />
                              <span className="text-sm">Departure</span>
                            </button>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">Location Type</label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => updateBookingData({ transferLocation: 'airport' })}
                              className={`p-3 rounded-lg border transition-all ${
                                bookingData.transferLocation === 'airport'
                                  ? 'bg-purple-600 border-purple-500 text-white'
                                  : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
                              }`}
                            >
                              <FaPlane className="mx-auto mb-1" />
                              <span className="text-sm">Airport</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => updateBookingData({ transferLocation: 'port' })}
                              className={`p-3 rounded-lg border transition-all ${
                                bookingData.transferLocation === 'port'
                                  ? 'bg-purple-600 border-purple-500 text-white'
                                  : 'bg-slate-700/50 border-slate-600 text-slate-300 hover:border-slate-500'
                              }`}
                            >
                              <FaShip className="mx-auto mb-1" />
                              <span className="text-sm">Seaport</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            {bookingData.transferLocation === 'airport' ? 'Flight Number' : 'Vessel/Ferry Name'}
                          </label>
                          <input
                            type="text"
                            value={bookingData.flightVesselNumber}
                            onChange={(e) => updateBookingData({ flightVesselNumber: e.target.value })}
                            placeholder={bookingData.transferLocation === 'airport' ? 'e.g. PR-2542' : 'e.g. FastCat M7'}
                            className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-slate-500"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-slate-300 mb-2">
                            {bookingData.transferType === 'arrival' ? 'Arrival Time' : 'Departure Time'}
                          </label>
                          <input
                            type="time"
                            value={bookingData.arrivalDepartureTime}
                            onChange={(e) => updateBookingData({ arrivalDepartureTime: e.target.value })}
                            className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">
                          Terminal / Gate (Optional)
                        </label>
                        <input
                          type="text"
                          value={bookingData.terminalInfo}
                          onChange={(e) => updateBookingData({ terminalInfo: e.target.value })}
                          placeholder="e.g. Terminal 1, Gate 5"
                          className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-slate-500"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Date Selection */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        <FaCalendarAlt className="inline mr-2 text-cyan-400" />
                        {bookingData.serviceType === 'per_day_rental' ? 'Pickup Date' : 'Date'}
                        {bookingData.pickupDate && (
                          <span className="ml-2 text-teal-400 text-xs">✓ Selected</span>
                        )}
                      </label>
                      <div className={`w-full p-3 bg-slate-700/50 border rounded-xl focus-within:ring-2 focus-within:ring-cyan-400 transition-all duration-200 ${
                        bookingData.pickupDate 
                          ? 'border-teal-500/50' 
                          : 'border-slate-600'
                      }`}>
                        <DatePicker
                          selected={bookingData.pickupDate}
                          onChange={(date) => updateBookingData({ pickupDate: date })}
                          minDate={new Date()}
                          maxDate={new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)}
                          dateFormat="MMMM dd, yyyy"
                          placeholderText="Select date"
                          className="w-full border-none outline-none bg-transparent text-white placeholder-slate-500 font-medium"
                          showPopperArrow={false}
                        />
                      </div>
                    </div>

                    {bookingData.serviceType === 'per_day_rental' && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          <FaCalendarAlt className="inline mr-2 text-cyan-400" />
                          Return Date
                          {bookingData.returnDate && (
                            <span className="ml-2 text-teal-400 text-xs">✓ Selected</span>
                          )}
                        </label>
                        <div className={`w-full p-3 bg-slate-700/50 border rounded-xl focus-within:ring-2 focus-within:ring-cyan-400 transition-all duration-200 ${
                          bookingData.returnDate 
                            ? 'border-teal-500/50' 
                            : 'border-slate-600'
                        }`}>
                          <DatePicker
                            selected={bookingData.returnDate}
                            onChange={(date) => updateBookingData({ returnDate: date })}
                            minDate={bookingData.pickupDate || new Date()}
                            maxDate={new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)}
                            dateFormat="MMMM dd, yyyy"
                            placeholderText="Select return date"
                            className="w-full border-none outline-none bg-transparent text-white placeholder-slate-500 font-medium"
                            showPopperArrow={false}
                          />
                        </div>
                      </div>
                    )}

                    {bookingData.serviceType === 'pickup_dropoff' && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          <FaClock className="inline mr-2 text-cyan-400" />
                          Pickup Time
                        </label>
                        <input
                          type="time"
                          value={bookingData.pickupTime}
                          onChange={(e) => updateBookingData({ pickupTime: e.target.value })}
                          className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white"
                        />
                      </div>
                    )}
                  </div>

                  {/* Location Fields */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        <FaMapMarkerAlt className="inline mr-2 text-cyan-400" />
                        {bookingData.serviceType === 'airport_port_transfer' && bookingData.transferType === 'arrival'
                          ? `${bookingData.transferLocation === 'airport' ? 'Airport' : 'Port'}`
                          : 'Pickup Location'
                        }
                      </label>
                      <select
                        value={bookingData.pickupLocation}
                        onChange={(e) => updateBookingData({ pickupLocation: e.target.value })}
                        className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white"
                      >
                        <option value="" className="bg-slate-700 text-slate-400">Select location</option>
                        {bookingData.serviceType === 'airport_port_transfer' && bookingData.transferType === 'arrival' ? (
                          airportPortLocations
                            .filter(loc => loc.type === bookingData.transferLocation)
                            .map((location) => (
                              <option key={location.id} value={location.name} className="bg-slate-700 text-white">
                                {location.name}
                              </option>
                            ))
                        ) : (
                          locations.map((location) => (
                            <option key={location} value={location} className="bg-slate-700 text-white">
                              {location}
                            </option>
                          ))
                        )}
                      </select>
                    </div>

                    {(bookingData.serviceType === 'pickup_dropoff' || bookingData.serviceType === 'airport_port_transfer') && (
                      <div>
                        <label className="block text-sm font-semibold text-slate-300 mb-2">
                          <FaMapMarkerAlt className="inline mr-2 text-teal-400" />
                          {bookingData.serviceType === 'airport_port_transfer' && bookingData.transferType === 'departure'
                            ? `${bookingData.transferLocation === 'airport' ? 'Airport' : 'Port'}`
                            : 'Drop-off Location'
                          }
                        </label>
                        <select
                          value={bookingData.dropoffLocation}
                          onChange={(e) => updateBookingData({ dropoffLocation: e.target.value })}
                          className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white"
                        >
                          <option value="" className="bg-slate-700 text-slate-400">Select destination</option>
                          {bookingData.serviceType === 'airport_port_transfer' && bookingData.transferType === 'departure' ? (
                            airportPortLocations
                              .filter(loc => loc.type === bookingData.transferLocation)
                              .map((location) => (
                                <option key={location.id} value={location.name} className="bg-slate-700 text-white">
                                  {location.name}
                                </option>
                              ))
                          ) : (
                            locations.map((location) => (
                              <option key={location} value={location} className="bg-slate-700 text-white">
                                {location}
                              </option>
                            ))
                          )}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Passengers */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      <FaUsers className="inline mr-2 text-cyan-400" />
                      Number of Passengers
                    </label>
                    <select
                      value={bookingData.passengers}
                      onChange={(e) => updateBookingData({ passengers: parseInt(e.target.value) })}
                      className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white"
                    >
                      {passengerOptions.map((option) => (
                        <option key={option.value} value={option.value} className="bg-slate-700 text-white">
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {bookingData.vehicleType && bookingData.passengers && (
                      <div className="mt-2 text-sm">
                        {(() => {
                          const selectedVehicle = vehicleOptions.find(v => v.id === bookingData.vehicleType);
                          if (!selectedVehicle) return null;
                          
                          const maxCapacity = selectedVehicle.maxCapacity;
                          if (bookingData.passengers > maxCapacity) {
                            return (
                              <p className="text-amber-400 font-medium">
                                ⚠ {selectedVehicle.name} typical capacity is {maxCapacity} passengers. Exceeding capacity will add 10% surcharge.
                              </p>
                            );
                          } else {
                            return (
                              <p className="text-teal-400 font-medium">
                                ✓ {selectedVehicle.name} can accommodate {bookingData.passengers} passenger{bookingData.passengers > 1 ? 's' : ''}
                              </p>
                            );
                          }
                        })()}
                      </div>
                    )}
                  </div>

                  {/* Estimated Fare Preview */}
                  {bookingData.vehicleType && bookingData.pickupDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-6 bg-gradient-to-r from-cyan-900/30 to-teal-900/30 rounded-xl border border-cyan-500/30"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-slate-400 mb-1">Estimated Fare</p>
                          <p className="text-xs text-slate-500">
                            {bookingData.serviceType === 'per_day_rental' && bookingData.returnDate && (() => {
                              const timeDiff = bookingData.returnDate.getTime() - bookingData.pickupDate!.getTime();
                              const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                              const isSameDay = daysDiff === 0 || bookingData.pickupDate!.toDateString() === bookingData.returnDate.toDateString();
                              const selectedVehicle = vehicleOptions.find(v => v.id === bookingData.vehicleType);
                              const hasSurcharge = selectedVehicle && bookingData.passengers > selectedVehicle.maxCapacity;
                              
                              if (isSameDay) {
                                return `Same-day rental${hasSurcharge ? ' + 10% surcharge' : ''}`;
                              } else {
                                return `${daysDiff} day(s) × ₱${selectedVehicle?.price}/day${hasSurcharge ? ' + 10% surcharge' : ''}`;
                              }
                            })()}
                            {bookingData.serviceType === 'pickup_dropoff' && 'One-way transfer'}
                            {bookingData.serviceType === 'airport_port_transfer' && (() => {
                              const hour = bookingData.arrivalDepartureTime ? parseInt(bookingData.arrivalDepartureTime.split(':')[0]) : null;
                              const isOffHours = hour !== null && (hour < 6 || hour >= 21);
                              return `${bookingData.transferType === 'arrival' ? 'Arrival' : 'Departure'} transfer${isOffHours ? ' (includes 20% off-hours fee)' : ''}`;
                            })()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                            ₱{calculateTotal().toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 3: Customer Information */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                {...fadeInUp}
                className="bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-slate-700/50"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Your Information</h2>
                  <p className="text-slate-400">We need some details to confirm your booking</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      <FaUser className="inline mr-2 text-cyan-400" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={bookingData.customerInfo.name}
                      onChange={(e) => updateBookingData({
                        customerInfo: { ...bookingData.customerInfo, name: e.target.value }
                      })}
                      className={`w-full p-4 bg-slate-700/50 border rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 text-white placeholder-slate-500 ${
                        bookingData.customerInfo.name.trim() 
                          ? 'border-teal-500/50' 
                          : 'border-slate-600'
                      }`}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        <FaEnvelope className="inline mr-2 text-cyan-400" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={bookingData.customerInfo.email}
                        onChange={(e) => updateBookingData({
                          customerInfo: { ...bookingData.customerInfo, email: e.target.value }
                        })}
                        className={`w-full p-4 bg-slate-700/50 border rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 text-white placeholder-slate-500 ${
                          bookingData.customerInfo.email.trim() 
                            ? 'border-teal-500/50' 
                            : 'border-slate-600'
                        }`}
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-300 mb-2">
                        <FaPhone className="inline mr-2 text-cyan-400" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={bookingData.customerInfo.phone}
                        onChange={(e) => updateBookingData({
                          customerInfo: { ...bookingData.customerInfo, phone: e.target.value }
                        })}
                        className={`w-full p-4 bg-slate-700/50 border rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-200 text-white placeholder-slate-500 ${
                          bookingData.customerInfo.phone.trim() 
                            ? 'border-teal-500/50' 
                            : 'border-slate-600'
                        }`}
                        placeholder="+63 123 456 7890"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-300 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={bookingData.specialRequests}
                      onChange={(e) => updateBookingData({ specialRequests: e.target.value })}
                      rows={4}
                      className="w-full p-4 bg-slate-700/50 border border-slate-600 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-white placeholder-slate-500"
                      placeholder="Child seats, extra luggage space, wheelchair accessibility, etc."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Review & Payment */}
            {currentStep === 4 && (
              <motion.div
                key="step4"
                {...fadeInUp}
                className="bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-slate-700/50"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-white mb-2">Review & Confirm</h2>
                  <p className="text-slate-400">Please review your booking details before confirming</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Booking Summary */}
                  <div className="space-y-6">
                    <div className="bg-slate-700/30 rounded-xl p-6 border border-slate-600/50">
                      <h3 className="text-xl font-bold text-white mb-4">Booking Summary</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400">Service Type:</span>
                          <span className={`font-semibold px-3 py-1 rounded-full text-sm bg-gradient-to-r ${
                            serviceTypes.find(s => s.id === bookingData.serviceType)?.color
                          } text-white`}>
                            {getServiceLabel()}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-slate-400">Vehicle:</span>
                          <span className="font-semibold text-white">
                            {vehicleOptions.find(v => v.id === bookingData.vehicleType)?.name}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-slate-400">Date:</span>
                          <span className="font-semibold text-white">
                            {bookingData.pickupDate ? bookingData.pickupDate.toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            }) : 'Not selected'}
                          </span>
                        </div>
                        
                        {bookingData.serviceType === 'per_day_rental' && (
                          <div className="flex justify-between">
                            <span className="text-slate-400">Return Date:</span>
                            <span className="font-semibold text-white">
                              {bookingData.returnDate ? bookingData.returnDate.toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              }) : 'Not selected'}
                            </span>
                          </div>
                        )}
                        
                        {bookingData.serviceType === 'pickup_dropoff' && bookingData.pickupTime && (
                          <div className="flex justify-between">
                            <span className="text-slate-400">Pickup Time:</span>
                            <span className="font-semibold text-white">{bookingData.pickupTime}</span>
                          </div>
                        )}
                        
                        {bookingData.serviceType === 'airport_port_transfer' && (
                          <>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Transfer:</span>
                              <span className="font-semibold text-white capitalize">
                                {bookingData.transferType} ({bookingData.transferLocation})
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Flight/Vessel:</span>
                              <span className="font-semibold text-white">{bookingData.flightVesselNumber}</span>
                            </div>
                            {bookingData.arrivalDepartureTime && (
                              <div className="flex justify-between">
                                <span className="text-slate-400">{bookingData.transferType === 'arrival' ? 'Arrival' : 'Departure'} Time:</span>
                                <span className="font-semibold text-white">{bookingData.arrivalDepartureTime}</span>
                              </div>
                            )}
                          </>
                        )}
                        
                        <div className="flex justify-between">
                          <span className="text-slate-400">Pickup:</span>
                          <span className="font-semibold text-white">{bookingData.pickupLocation || 'Not selected'}</span>
                        </div>
                        
                        {(bookingData.serviceType === 'pickup_dropoff' || bookingData.serviceType === 'airport_port_transfer') && (
                          <div className="flex justify-between">
                            <span className="text-slate-400">Drop-off:</span>
                            <span className="font-semibold text-white">{bookingData.dropoffLocation || 'Not selected'}</span>
                          </div>
                        )}
                        
                        <div className="flex justify-between">
                          <span className="text-slate-400">Passengers:</span>
                          <span className="font-semibold text-white">
                            {bookingData.passengers === 1 ? '1 Passenger' : `${bookingData.passengers} Passengers`}
                          </span>
                        </div>
                        
                        {/* Customer Information */}
                        <div className="border-t border-slate-600 pt-4 mt-4">
                          <h4 className="text-lg font-semibold text-white mb-3">Customer Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-slate-400">Name:</span>
                              <span className="text-white">{bookingData.customerInfo.name || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Email:</span>
                              <span className="text-white">{bookingData.customerInfo.email || 'Not provided'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-slate-400">Phone:</span>
                              <span className="text-white">{bookingData.customerInfo.phone || 'Not provided'}</span>
                            </div>
                            {bookingData.specialRequests && (
                              <div className="pt-2">
                                <span className="text-slate-400 block mb-1">Special Requests:</span>
                                <span className="text-white text-sm">{bookingData.specialRequests}</span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Total */}
                        <div className="border-t border-slate-600 pt-4 mt-4">
                          <div className="flex justify-between items-center">
                            <span className="text-xl font-bold text-white">Total:</span>
                            <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                              ₱{calculateTotal().toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-cyan-900/20 rounded-xl p-6 border border-cyan-500/30">
                      <div className="flex items-center mb-2">
                        <FaShieldAlt className="text-cyan-400 mr-2" />
                        <h3 className="font-semibold text-cyan-300">Secure Booking</h3>
                      </div>
                      <p className="text-cyan-200/70 text-sm">
                        Your booking is protected with our secure payment system. 
                        You'll receive a confirmation email once payment is processed.
                      </p>
                    </div>
                  </div>

                  {/* Payment Integration */}
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Complete Payment</h3>
                    
                    <PaymentHandler
                      amount={calculateTotal()}
                      bookingData={bookingData}
                      onPaymentSuccess={handlePaymentSuccess}
                      onPaymentError={handlePaymentError}
                      onPaymentCancel={handlePaymentCancel}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Missing Fields Warning */}
          {!canProceed() && (currentStep === 2 || currentStep === 3) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-300">
                    Please complete all required fields
                  </h3>
                  <div className="mt-2 text-sm text-red-200/70">
                    <p>Missing: {getMissingFields().join(', ')}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`
                px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center
                ${currentStep === 1 
                  ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed' 
                  : 'bg-slate-700 text-white border border-slate-600 hover:bg-slate-600'
                }
              `}
            >
              <FaArrowLeft className="mr-2" />
              Previous
            </button>

            {currentStep < totalSteps && (
              <button
                onClick={nextStep}
                disabled={!canProceed()}
                className={`
                  px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center
                  ${canProceed()
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white hover:shadow-lg hover:shadow-cyan-500/30'
                    : 'bg-slate-700/50 text-slate-500 cursor-not-allowed'
                  }
                `}
              >
                Next
                <FaArrowRight className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
