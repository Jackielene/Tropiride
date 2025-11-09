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
  FaPaypal
} from 'react-icons/fa';
import { Head, Link, router } from '@inertiajs/react';
import PaymentHandler from '@/components/payments/PaymentHandler';

interface BookingData {
  vehicleType: 'tricycle' | 'tuktuk' | 'habal-habal' | 'multicab' | 'van' | null;
  pickupDate: Date | null;
  returnDate: Date | null;
  pickupLocation: string;
  passengers: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  specialRequests: string;
}

const vehicleOptions = [
  {
    id: 'habal-habal',
    name: 'Habal-Habal',
    icon: FaCar,
    capacity: '1-2 passengers',
    maxCapacity: 2,
    price: 250,
    features: ['Motorcycle taxi', 'Quick and agile', 'Best for short trips']
  },
  {
    id: 'tricycle',
    name: 'Tricycle',
    icon: FaCar,
    capacity: '1-3 passengers',
    maxCapacity: 3,
    price: 300,
    features: ['Covered seating', 'Local transportation', 'Good for city travel']
  },
  {
    id: 'tuktuk',
    name: 'Tuk-Tuk',
    icon: FaCar,
    capacity: '1-4 passengers',
    maxCapacity: 4,
    price: 400,
    features: ['Open-air experience', 'Tourist favorite', 'Comfortable seating']
  },
  {
    id: 'multicab',
    name: 'Multicab',
    icon: FaCar,
    capacity: '6-8 passengers',
    maxCapacity: 8,
    price: 500,
    features: ['Air conditioning', 'Local driver', 'Insurance included']
  },
  {
    id: 'van',
    name: 'Van',
    icon: FaTruck,
    capacity: '10-14 passengers',
    maxCapacity: 14,
    price: 700,
    features: ['Air conditioning', 'Professional driver', 'Insurance included', 'Free water']
  }
];

const locations = [
  'General Luna',
  'Dapa',
  'Del Carmen',
  'Santa Monica',
  'Burgos'
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
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [bookingData, setBookingData] = useState<BookingData>({
    vehicleType: null, // User must select a vehicle
    pickupDate: null,
    returnDate: null,
    pickupLocation: '',
    passengers: 1,
    customerInfo: {
      name: '',
      email: '',
      phone: ''
    },
    specialRequests: ''
  });

  const totalSteps = 3; // Reduced from 4 to 3 steps

  // Check URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const vehicleParam = urlParams.get('vehicle');
    
    if (vehicleParam === 'multicab' || vehicleParam === 'van') {
      setBookingData(prev => ({ ...prev, vehicleType: vehicleParam }));
    }
  }, []);

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData(prev => {
      const newData = { ...prev, ...updates };
      
      // If pickup date is being updated, ensure return date is not before it
      if (updates.pickupDate && newData.returnDate) {
        const pickupDate = updates.pickupDate;
        const returnDate = newData.returnDate;
        
        if (returnDate <= pickupDate) {
          // Set return date to pickup date + 1 day
          const nextDay = new Date(pickupDate);
          nextDay.setDate(nextDay.getDate() + 1);
          newData.returnDate = nextDay;
        }
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
    if (!bookingData.vehicleType || !bookingData.pickupDate || !bookingData.returnDate) return 0;
    
    const startDate = bookingData.pickupDate;
    const endDate = bookingData.returnDate;
    
    // Calculate the difference in days
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    // Check if it's a same-day rental
    const isSameDay = daysDiff === 0 || startDate.toDateString() === endDate.toDateString();
    
    const selectedVehicle = vehicleOptions.find(v => v.id === bookingData.vehicleType);
    if (!selectedVehicle) return 0;
    
    let total = 0;
    
    if (isSameDay) {
      // Same-day rental: Use fixed rate (assumes average distance)
      // Per-km rates by vehicle type for same-day trips
      const sameDayRates: Record<string, number> = {
        'habal-habal': 120,  // Estimated for average trip
        'tricycle': 150,
        'tuktuk': 180,
        'multicab': 200,
        'van': 300,
      };
      
      total = sameDayRates[bookingData.vehicleType] || selectedVehicle.price;
    } else {
      // Multi-day rental: daily rate × number of days
      total = daysDiff * selectedVehicle.price;
    }
    
    // Add passenger surcharge if exceeding typical capacity
    if (bookingData.passengers > selectedVehicle.maxCapacity) {
      // 10% surcharge for exceeding capacity (requires special arrangement)
      total = Math.round(total * 1.1);
    }
    
    return total;
  };

  const handlePaymentSuccess = (completeBookingData: any) => {
    setPaymentStatus('success');
    
    // Prepare booking data for confirmation page
    // completeBookingData from PaymentHandler already includes all bookingData and payment info
    const confirmationData = {
      id: `TRP-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      vehicleType: completeBookingData.vehicleType,
      vehicleName: vehicleOptions.find(v => v.id === completeBookingData.vehicleType)?.name || 'Vehicle',
      pickupDate: completeBookingData.pickupDate instanceof Date 
        ? completeBookingData.pickupDate.toISOString() 
        : completeBookingData.pickupDate,
      returnDate: completeBookingData.returnDate instanceof Date 
        ? completeBookingData.returnDate.toISOString() 
        : completeBookingData.returnDate,
      pickupLocation: completeBookingData.pickupLocation,
      passengers: completeBookingData.passengers,
      customerInfo: completeBookingData.customerInfo,
      specialRequests: completeBookingData.specialRequests || '',
      payment: completeBookingData.payment,
      driverInfo: completeBookingData.driverInfo || {
        name: 'Miguel Santos',
        phone: '+63 987 654 3210',
        vehiclePlate: 'ABC-1234'
      }
    };
    
    // Post booking data to server and redirect to confirmation page
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
        // Check if all required fields are filled
        if (!bookingData.vehicleType || !bookingData.pickupDate || !bookingData.returnDate || !bookingData.pickupLocation.trim()) {
          return false;
        }
        // Check if return date is after pickup date
        if (bookingData.returnDate <= bookingData.pickupDate) {
          return false;
        }
        // Allow exceeding capacity with surcharge (no need to block)
        return true;
      case 2:
        return bookingData.customerInfo.name.trim() !== '' && 
               bookingData.customerInfo.email.trim() !== '' && 
               bookingData.customerInfo.phone.trim() !== '';
      case 3:
        return true;
      default:
        return false;
    }
  };

  const getMissingFields = () => {
    if (currentStep === 1) {
      const missing = [];
      if (!bookingData.vehicleType) missing.push('Vehicle Selection');
      if (!bookingData.pickupDate) missing.push('Pickup Date');
      if (!bookingData.returnDate) missing.push('Return Date');
      if (!bookingData.pickupLocation.trim()) missing.push('Pickup Location');
      
      // Check if return date is after pickup date
      if (bookingData.pickupDate && bookingData.returnDate && bookingData.returnDate <= bookingData.pickupDate) {
        missing.push('Return date must be after pickup date');
      }
      
      // Note: Exceeding capacity adds surcharge but doesn't block booking
      
      return missing;
    }
    if (currentStep === 2) {
      const missing = [];
      if (!bookingData.customerInfo.name.trim()) missing.push('Full Name');
      if (!bookingData.customerInfo.email.trim()) missing.push('Email Address');
      if (!bookingData.customerInfo.phone.trim()) missing.push('Phone Number');
      return missing;
    }
    return [];
  };

  return (
    <>
      <Head title="Book Your Vehicle - Tropiride" />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                  <FaCar className="text-white text-sm" />
                </div>
                <span className="text-xl font-bold text-gray-900">Tropiride</span>
              </Link>
              
              <div className="flex items-center space-x-4">
                <Link href="/tropiride/vehicles" className="text-gray-700 hover:text-blue-600 transition-colors text-sm">
                  Back to Vehicles
                </Link>
                <div className="text-sm text-gray-500">
                  Step {currentStep} of {totalSteps}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between py-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
                    ${step <= currentStep 
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white' 
                      : 'bg-gray-200 text-gray-500'
                    }
                  `}>
                    {step < currentStep ? <FaCheck /> : step}
                  </div>
                  {step < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step < currentStep ? 'bg-gradient-to-r from-blue-500 to-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <AnimatePresence mode="wait">
            {/* Step 1: Date & Location */}
            {currentStep === 1 && (
              <motion.div
                key="step1"
                {...fadeInUp}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">When & Where</h2>
                  <p className="text-gray-600">Tell us your travel dates and pickup location</p>
                </div>

                <div className="space-y-6">
                  {/* Vehicle Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaCar className="inline mr-2" />
                      Select Vehicle
                    </label>
                    <select
                      value={bookingData.vehicleType || ''}
                      onChange={(e) => updateBookingData({ vehicleType: e.target.value as 'multicab' | 'van' })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white hover:border-blue-300 shadow-sm"
                    >
                      <option value="" disabled className="text-gray-500">Select a vehicle</option>
                      {vehicleOptions.map((vehicle) => (
                        <option key={vehicle.id} value={vehicle.id} className="text-gray-900 bg-white">
                          {vehicle.name} - {vehicle.capacity} (₱{vehicle.price}/day)
                        </option>
                      ))}
                    </select>
                    {bookingData.vehicleType && (
                      <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        {(() => {
                          const selectedVehicle = vehicleOptions.find(v => v.id === bookingData.vehicleType);
                          if (!selectedVehicle) return null;
                          return (
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-900">{selectedVehicle.name}</span>
                                <span className="text-blue-600 font-bold">₱{selectedVehicle.price}/day</span>
                              </div>
                              <div className="text-sm text-gray-600">
                                <FaUsers className="inline mr-1" />
                                {selectedVehicle.capacity}
                              </div>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {selectedVehicle.features.map((feature, idx) => (
                                  <span key={idx} className="text-xs px-2 py-1 bg-white rounded-full text-gray-700 border border-blue-200">
                                    ✓ {feature}
                                  </span>
                                ))}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaCalendarAlt className="inline mr-2" />
                        Pickup Date
                        {bookingData.pickupDate && (
                          <span className="ml-2 text-green-600 text-xs">✓ Selected</span>
                        )}
                      </label>
                      <div className={`w-full p-3 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200 ${
                        bookingData.pickupDate 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-gray-300'
                      }`}>
                        <DatePicker
                          selected={bookingData.pickupDate}
                          onChange={(date) => updateBookingData({ pickupDate: date })}
                          minDate={new Date()}
                          maxDate={new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)} // 1 year from now
                          dateFormat="MMMM dd, yyyy"
                          placeholderText="Select pickup date"
                          className="w-full border-none outline-none bg-transparent text-gray-900 placeholder-gray-500 font-medium"
                          showPopperArrow={false}
                          popperClassName="react-datepicker-popper"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaCalendarAlt className="inline mr-2" />
                        Return Date
                        {bookingData.returnDate && (
                          <span className="ml-2 text-green-600 text-xs">✓ Selected</span>
                        )}
                      </label>
                      <div className={`w-full p-3 border rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200 ${
                        bookingData.returnDate 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-gray-300'
                      }`}>
                        <DatePicker
                          selected={bookingData.returnDate}
                          onChange={(date) => updateBookingData({ returnDate: date })}
                          minDate={bookingData.pickupDate || new Date()}
                          maxDate={new Date(new Date().getTime() + 365 * 24 * 60 * 60 * 1000)} // 1 year from now
                          dateFormat="MMMM dd, yyyy"
                          placeholderText="Select return date"
                          className="w-full border-none outline-none bg-transparent text-gray-900 placeholder-gray-500 font-medium"
                          showPopperArrow={false}
                          popperClassName="react-datepicker-popper"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaMapMarkerAlt className="inline mr-2" />
                        Pickup Location
                      </label>
                      <select
                        value={bookingData.pickupLocation}
                        onChange={(e) => updateBookingData({ pickupLocation: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white hover:border-blue-300 shadow-sm"
                      >
                        <option value="" className="text-gray-500">Select pickup location</option>
                        {locations.map((location) => (
                          <option key={location} value={location} className="text-gray-900 bg-white">{location}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaUsers className="inline mr-2" />
                        Number of Passengers
                      </label>
                      <select
                        value={bookingData.passengers}
                        onChange={(e) => updateBookingData({ passengers: parseInt(e.target.value) })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white hover:border-blue-300 shadow-sm"
                      >
                        {passengerOptions.map((option) => (
                          <option key={option.value} value={option.value} className="text-gray-900 bg-white">
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
                                <p className="text-orange-600 font-medium">
                                  ⚠ {selectedVehicle.name} typical capacity is {maxCapacity} passengers. Exceeding capacity will add 10% surcharge.
                                </p>
                              );
                            } else {
                              return (
                                <p className="text-green-600 font-medium">
                                  ✓ {selectedVehicle.name} can accommodate {bookingData.passengers} passenger{bookingData.passengers > 1 ? 's' : ''}
                                </p>
                              );
                            }
                          })()}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Estimated Fare Preview */}
                  {bookingData.vehicleType && bookingData.pickupDate && bookingData.returnDate && (
                    <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 mb-1">Estimated Fare</p>
                          <p className="text-xs text-gray-500">
                            {(() => {
                              const timeDiff = bookingData.returnDate.getTime() - bookingData.pickupDate.getTime();
                              const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                              const isSameDay = daysDiff === 0 || bookingData.pickupDate.toDateString() === bookingData.returnDate.toDateString();
                              const selectedVehicle = vehicleOptions.find(v => v.id === bookingData.vehicleType);
                              const hasSurcharge = selectedVehicle && bookingData.passengers > selectedVehicle.maxCapacity;
                              
                              if (isSameDay) {
                                return `Same-day rental rate${hasSurcharge ? ' + 10% surcharge' : ''}`;
                              } else {
                                return `${daysDiff} day(s) × ₱${selectedVehicle?.price}/day${hasSurcharge ? ' + 10% surcharge' : ''}`;
                              }
                            })()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-blue-600">₱{calculateTotal().toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 2: Customer Information */}
            {currentStep === 2 && (
              <motion.div
                key="step2"
                {...fadeInUp}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Information</h2>
                  <p className="text-gray-600">We need some details to confirm your booking</p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <FaUser className="inline mr-2" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={bookingData.customerInfo.name}
                      onChange={(e) => updateBookingData({
                        customerInfo: { ...bookingData.customerInfo, name: e.target.value }
                      })}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                        bookingData.customerInfo.name.trim() 
                          ? 'border-green-300 bg-green-50' 
                          : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaEnvelope className="inline mr-2" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={bookingData.customerInfo.email}
                        onChange={(e) => updateBookingData({
                          customerInfo: { ...bookingData.customerInfo, email: e.target.value }
                        })}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          bookingData.customerInfo.email.trim() 
                            ? 'border-green-300 bg-green-50' 
                            : 'border-gray-300'
                        }`}
                        placeholder="your@email.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        <FaPhone className="inline mr-2" />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={bookingData.customerInfo.phone}
                        onChange={(e) => updateBookingData({
                          customerInfo: { ...bookingData.customerInfo, phone: e.target.value }
                        })}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                          bookingData.customerInfo.phone.trim() 
                            ? 'border-green-300 bg-green-50' 
                            : 'border-gray-300'
                        }`}
                        placeholder="+63 123 456 7890"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Special Requests
                    </label>
                    <textarea
                      value={bookingData.specialRequests}
                      onChange={(e) => updateBookingData({ specialRequests: e.target.value })}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Any special requests or additional information..."
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Review & Payment */}
            {currentStep === 3 && (
              <motion.div
                key="step3"
                {...fadeInUp}
                className="bg-white rounded-2xl shadow-xl p-8"
              >
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Review & Confirm</h2>
                  <p className="text-gray-600">Please review your booking details before confirming</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Booking Summary */}
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vehicle:</span>
                          <span className="font-semibold">
                            {vehicleOptions.find(v => v.id === bookingData.vehicleType)?.name}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pickup Date:</span>
                          <span className="font-semibold">
                            {bookingData.pickupDate ? bookingData.pickupDate.toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            }) : 'Not selected'}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Return Date:</span>
                          <span className="font-semibold">
                            {bookingData.returnDate ? bookingData.returnDate.toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            }) : 'Not selected'}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-semibold">
                            {bookingData.pickupDate && bookingData.returnDate ? 
                              Math.ceil((bookingData.returnDate.getTime() - bookingData.pickupDate.getTime()) / (1000 * 60 * 60 * 24)) + ' days'
                              : 'N/A'
                            }
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Pickup:</span>
                          <span className="font-semibold">{bookingData.pickupLocation || 'Not selected'}</span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Passengers:</span>
                          <span className="font-semibold">
                            {bookingData.passengers === 1 ? '1 Passenger' : `${bookingData.passengers} Passengers`}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rate:</span>
                          <span className="font-semibold">
                            ₱{vehicleOptions.find(v => v.id === bookingData.vehicleType)?.price}/day
                          </span>
                        </div>
                        
                        {/* Customer Information in Summary */}
                        <div className="border-t pt-4 mt-4">
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Customer Details</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Name:</span>
                              <span className="font-semibold text-gray-900">
                                {bookingData.customerInfo.name || 'Not provided'}
                              </span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-gray-600">Email:</span>
                              <span className="font-semibold text-gray-900">
                                {bookingData.customerInfo.email || 'Not provided'}
                              </span>
                            </div>
                            
                            <div className="flex justify-between">
                              <span className="text-gray-600">Phone:</span>
                              <span className="font-semibold text-gray-900">
                                {bookingData.customerInfo.phone || 'Not provided'}
                              </span>
                            </div>
                            
                            {bookingData.specialRequests && (
                              <div className="pt-2">
                                <span className="text-gray-600 block mb-1">Special Requests:</span>
                                <span className="font-semibold text-gray-900 text-sm">
                                  {bookingData.specialRequests}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Pricing Breakdown */}
                        <div className="border-t pt-4 mt-4">
                          <h4 className="text-lg font-semibold text-gray-900 mb-3">Pricing Breakdown</h4>
                          
                          {bookingData.pickupDate && bookingData.returnDate && bookingData.vehicleType && (() => {
                            const selectedVehicle = vehicleOptions.find(v => v.id === bookingData.vehicleType);
                            const timeDiff = bookingData.returnDate.getTime() - bookingData.pickupDate.getTime();
                            const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
                            const isSameDay = daysDiff === 0 || bookingData.pickupDate.toDateString() === bookingData.returnDate.toDateString();
                            const hasSurcharge = selectedVehicle && bookingData.passengers > selectedVehicle.maxCapacity;
                            
                            let baseTotal = 0;
                            if (isSameDay) {
                              const sameDayRates: Record<string, number> = {
                                'habal-habal': 120,
                                'tricycle': 150,
                                'tuktuk': 180,
                                'multicab': 200,
                                'van': 300,
                              };
                              baseTotal = sameDayRates[bookingData.vehicleType] || 0;
                            } else {
                              baseTotal = selectedVehicle ? daysDiff * selectedVehicle.price : 0;
                            }
                            
                            return (
                              <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                                {isSameDay ? (
                                  <>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Rental Type:</span>
                                      <span className="font-medium text-blue-600">Same-day</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Vehicle:</span>
                                      <span className="font-medium">{selectedVehicle?.name}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Same-day Rate:</span>
                                      <span className="font-medium">₱{baseTotal.toLocaleString()}</span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Rental Type:</span>
                                      <span className="font-medium text-green-600">Multi-day</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Daily Rate:</span>
                                      <span className="font-medium">₱{selectedVehicle?.price}/day</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Duration:</span>
                                      <span className="font-medium">{daysDiff} day{daysDiff > 1 ? 's' : ''}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Subtotal:</span>
                                      <span className="font-medium">
                                        ₱{selectedVehicle?.price} × {daysDiff} = ₱{baseTotal.toLocaleString()}
                                      </span>
                                    </div>
                                  </>
                                )}
                                
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">Passengers:</span>
                                  <span className="font-medium">
                                    {bookingData.passengers} passenger{bookingData.passengers > 1 ? 's' : ''}
                                    {hasSurcharge && ` (exceeds ${selectedVehicle.maxCapacity} capacity)`}
                                  </span>
                                </div>
                                
                                {hasSurcharge && (
                                  <div className="flex justify-between text-sm">
                                    <span className="text-orange-600">Capacity Surcharge (10%):</span>
                                    <span className="font-medium text-orange-600">
                                      + ₱{Math.round(baseTotal * 0.1).toLocaleString()}
                                    </span>
                                  </div>
                                )}
                                
                                <div className="border-t pt-2 mt-2">
                                  <div className="flex justify-between text-lg font-bold">
                                    <span>Total:</span>
                                    <span className="text-blue-600">₱{calculateTotal().toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          })()}
                          
                          {(!bookingData.pickupDate || !bookingData.returnDate || !bookingData.vehicleType) && (
                            <div className="text-gray-500 text-sm italic">
                              Complete your booking details to see pricing calculation
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-xl p-6">
                      <div className="flex items-center mb-2">
                        <FaShieldAlt className="text-blue-600 mr-2" />
                        <h3 className="font-semibold text-blue-900">Secure Booking</h3>
                      </div>
                      <p className="text-blue-700 text-sm">
                        Your booking is protected with our secure payment system. 
                        You'll receive a confirmation email once payment is processed.
                      </p>
                    </div>
                  </div>

                  {/* Payment Integration */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Complete Payment</h3>
                    
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
          {!canProceed() && (currentStep === 1 || currentStep === 2) && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Please complete all required fields
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>Missing fields: {getMissingFields().join(', ')}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`
                px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center
                ${currentStep === 1 
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
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
                  px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center
                  ${canProceed()
                    ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white hover:shadow-lg'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
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
