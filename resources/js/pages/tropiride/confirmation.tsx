import { motion } from 'framer-motion';
import { 
  FaCheckCircle, 
  FaCar, 
  FaCalendarAlt, 
  FaMapMarkerAlt, 
  FaUsers,
  FaPhone,
  FaEnvelope,
  FaDownload,
  FaHome,
  FaPrint,
  FaPlane,
  FaShip,
  FaClock,
  FaRoute,
  FaCalendarDay
} from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

type ServiceType = 'per_day_rental' | 'pickup_dropoff' | 'airport_port_transfer';

interface BookingData {
  id?: string;
  serviceType?: ServiceType;
  vehicleType: 'tricycle' | 'tuktuk' | 'habal-habal' | 'multicab' | 'van' | null;
  vehicleName: string;
  pickupDate: string | Date;
  returnDate: string | Date;
  pickupTime?: string;
  pickupLocation: string;
  dropoffLocation?: string;
  passengers: number;
  totalAmount?: number;
  customerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  driverInfo?: {
    name: string;
    phone: string;
    vehiclePlate: string;
  };
  specialRequests?: string;
  // Airport/Port specific
  transferType?: 'arrival' | 'departure';
  transferLocation?: 'airport' | 'port';
  flightVesselNumber?: string;
  terminalInfo?: string;
  arrivalDepartureTime?: string;
}

interface TropirideConfirmationProps {
  bookingData?: BookingData;
}

const serviceTypes = {
  per_day_rental: {
    name: 'Per-Day Rental',
    icon: FaCalendarDay,
    color: 'from-blue-500 to-blue-600',
  },
  pickup_dropoff: {
    name: 'Pickup & Drop-off',
    icon: FaRoute,
    color: 'from-green-500 to-green-600',
  },
  airport_port_transfer: {
    name: 'Airport/Port Transfer',
    icon: FaPlane,
    color: 'from-purple-500 to-purple-600',
  }
};

const vehicleOptions = [
  {
    id: 'habal-habal',
    name: 'Habal-Habal',
    price: 250,
    pickupDropoffPrice: 120,
    airportPortPrice: 150,
  },
  {
    id: 'tricycle',
    name: 'Tricycle',
    price: 300,
    pickupDropoffPrice: 150,
    airportPortPrice: 200,
  },
  {
    id: 'tuktuk',
    name: 'Tuk-Tuk',
    price: 400,
    pickupDropoffPrice: 180,
    airportPortPrice: 250,
  },
  {
    id: 'multicab',
    name: 'Multicab',
    price: 500,
    pickupDropoffPrice: 250,
    airportPortPrice: 350,
  },
  {
    id: 'van',
    name: 'Van',
    price: 700,
    pickupDropoffPrice: 400,
    airportPortPrice: 500,
  }
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function TropirideConfirmation({ bookingData: propBookingData }: TropirideConfirmationProps) {
  // Default booking data if none provided (for testing)
  const defaultBookingData: BookingData = {
    id: 'TRP-2024-001234',
    serviceType: 'per_day_rental',
    vehicleType: 'multicab',
    vehicleName: 'Multicab',
    pickupDate: '2024-03-15',
    returnDate: '2024-03-18',
    pickupLocation: 'General Luna',
    passengers: 4,
    customerInfo: {
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+63 123 456 7890'
    },
    driverInfo: {
      name: 'Miguel Santos',
      phone: '+63 987 654 3210',
      vehiclePlate: 'ABC-1234'
    }
  };

  const bookingData = propBookingData || defaultBookingData;
  const serviceType = bookingData.serviceType || 'per_day_rental';

  // Calculate total amount based on vehicle type and service
  const calculateTotalAmount = () => {
    if (!bookingData.vehicleType) {
      return bookingData.totalAmount || 0;
    }

    const selectedVehicle = vehicleOptions.find(v => v.id === bookingData.vehicleType);
    if (!selectedVehicle) return bookingData.totalAmount || 0;

    let total = 0;

    switch (serviceType) {
      case 'per_day_rental':
        if (!bookingData.pickupDate || !bookingData.returnDate) return bookingData.totalAmount || 0;
        
        const startDate = new Date(bookingData.pickupDate);
        const endDate = new Date(bookingData.returnDate);
        const timeDiff = endDate.getTime() - startDate.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        const days = Math.max(1, daysDiff);
        
        total = days * selectedVehicle.price;
        break;
        
      case 'pickup_dropoff':
        total = selectedVehicle.pickupDropoffPrice;
        break;
        
      case 'airport_port_transfer':
        total = selectedVehicle.airportPortPrice;
        // Add 20% premium for late night/early morning transfers
        if (bookingData.arrivalDepartureTime) {
          const hour = parseInt(bookingData.arrivalDepartureTime.split(':')[0]);
          if (hour < 6 || hour >= 21) {
            total = Math.round(total * 1.2);
          }
        }
        break;
    }
    
    return total;
  };

  const totalAmount = calculateTotalAmount();
  
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement PDF download functionality
    console.log('Download booking confirmation');
  };

  const getServiceInfo = () => {
    return serviceTypes[serviceType] || serviceTypes.per_day_rental;
  };

  const ServiceIcon = getServiceInfo().icon;

  return (
    <>
      <Head title="Booking Confirmation - Tropiride" />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-14 h-14 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/30">
                <FaCheckCircle className="text-slate-900 text-2xl" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-slate-400">
              Your {getServiceInfo().name.toLowerCase()} has been successfully confirmed
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="space-y-6"
          >
            {/* Success Message */}
            <motion.div
              variants={fadeInUp}
              className="bg-teal-900/30 border border-teal-500/50 rounded-xl p-6"
            >
              <div className="flex items-center">
                <FaCheckCircle className="text-teal-400 text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-teal-300">
                    Payment Successful
                  </h3>
                  <p className="text-teal-200/70">
                    Your booking has been confirmed and payment has been processed. 
                    You will receive a confirmation email shortly.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Booking Details */}
            <motion.div
              variants={fadeInUp}
              className="bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-700/50"
            >
              <div className={`bg-gradient-to-r ${getServiceInfo().color} text-white p-6`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center mb-2">
                      <ServiceIcon className="mr-2" />
                      <span className="text-sm font-medium opacity-90">{getServiceInfo().name}</span>
                    </div>
                    <h2 className="text-2xl font-bold">Booking Details</h2>
                    <p className="opacity-80">Booking ID: {bookingData.id}</p>
                  </div>
                  <div className="hidden sm:block text-right">
                    <p className="text-4xl font-bold">₱{totalAmount.toLocaleString()}</p>
                    <p className="text-sm opacity-80">Total Amount</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Vehicle Information</h3>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-cyan-900/50 rounded-lg flex items-center justify-center">
                        <FaCar className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{bookingData.vehicleName}</p>
                        <p className="text-slate-400 text-sm">Vehicle Type</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-teal-900/50 rounded-lg flex items-center justify-center">
                        <FaUsers className="text-teal-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{bookingData.passengers} Passengers</p>
                        <p className="text-slate-400 text-sm">Capacity</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">Trip Details</h3>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center">
                        <FaCalendarAlt className="text-purple-400" />
                      </div>
                      <div>
                        {serviceType === 'per_day_rental' ? (
                          <>
                            <p className="font-semibold text-white">
                              {new Date(bookingData.pickupDate).toLocaleDateString()} - {new Date(bookingData.returnDate).toLocaleDateString()}
                            </p>
                            <p className="text-slate-400 text-sm">
                              {Math.max(1, Math.ceil((new Date(bookingData.returnDate).getTime() - new Date(bookingData.pickupDate).getTime()) / (1000 * 60 * 60 * 24)))} day(s)
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="font-semibold text-white">
                              {new Date(bookingData.pickupDate).toLocaleDateString()}
                            </p>
                            <p className="text-slate-400 text-sm">Date</p>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Time for pickup_dropoff */}
                    {serviceType === 'pickup_dropoff' && bookingData.pickupTime && (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-900/50 rounded-lg flex items-center justify-center">
                          <FaClock className="text-green-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{bookingData.pickupTime}</p>
                          <p className="text-slate-400 text-sm">Pickup Time</p>
                        </div>
                      </div>
                    )}

                    {/* Airport/Port specific info */}
                    {serviceType === 'airport_port_transfer' && (
                      <>
                        {bookingData.flightVesselNumber && (
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center">
                              {bookingData.transferLocation === 'airport' ? (
                                <FaPlane className="text-purple-400" />
                              ) : (
                                <FaShip className="text-purple-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-white">{bookingData.flightVesselNumber}</p>
                              <p className="text-slate-400 text-sm">
                                {bookingData.transferLocation === 'airport' ? 'Flight Number' : 'Vessel/Ferry'}
                              </p>
                            </div>
                          </div>
                        )}
                        
                        {bookingData.arrivalDepartureTime && (
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-amber-900/50 rounded-lg flex items-center justify-center">
                              <FaClock className="text-amber-400" />
                            </div>
                            <div>
                              <p className="font-semibold text-white">{bookingData.arrivalDepartureTime}</p>
                              <p className="text-slate-400 text-sm capitalize">
                                {bookingData.transferType} Time
                              </p>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-900/50 rounded-lg flex items-center justify-center">
                        <FaMapMarkerAlt className="text-orange-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{bookingData.pickupLocation}</p>
                        <p className="text-slate-400 text-sm">Pickup Location</p>
                      </div>
                    </div>

                    {/* Drop-off location for pickup_dropoff and airport_port_transfer */}
                    {(serviceType === 'pickup_dropoff' || serviceType === 'airport_port_transfer') && bookingData.dropoffLocation && (
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-900/50 rounded-lg flex items-center justify-center">
                          <FaMapMarkerAlt className="text-red-400" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{bookingData.dropoffLocation}</p>
                          <p className="text-slate-400 text-sm">Drop-off Location</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Mobile total display */}
                <div className="sm:hidden mt-6 pt-6 border-t border-slate-600">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold text-white">Total Amount:</span>
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                      ₱{totalAmount.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Driver Information */}
            {bookingData.driverInfo && (
              <motion.div
                variants={fadeInUp}
                className="bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-slate-700/50"
              >
                <h3 className="text-xl font-bold text-white mb-4">Your Driver</h3>
                
                <div className="bg-slate-700/30 rounded-xl p-4 border border-slate-600/50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{bookingData.driverInfo.name}</p>
                      <p className="text-slate-400">Professional Driver</p>
                      <p className="text-sm text-slate-500">Vehicle: {bookingData.driverInfo.vehiclePlate}</p>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={`tel:${bookingData.driverInfo.phone}`}
                        className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white p-3 rounded-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                      >
                        <FaPhone />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Customer Information */}
            <motion.div
              variants={fadeInUp}
              className="bg-slate-800/60 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-slate-700/50"
            >
              <h3 className="text-xl font-bold text-white mb-4">Your Information</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-slate-400">Name</p>
                  <p className="font-semibold text-white">{bookingData.customerInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email</p>
                  <p className="font-semibold text-white">{bookingData.customerInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-400">Phone</p>
                  <p className="font-semibold text-white">{bookingData.customerInfo.phone}</p>
                </div>
              </div>

              {bookingData.specialRequests && (
                <div className="mt-4 pt-4 border-t border-slate-600">
                  <p className="text-sm text-slate-400 mb-1">Special Requests</p>
                  <p className="text-white">{bookingData.specialRequests}</p>
                </div>
              )}
            </motion.div>

            {/* Important Notes */}
            <motion.div
              variants={fadeInUp}
              className="bg-amber-900/20 border border-amber-500/50 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-amber-300 mb-3">Important Notes</h3>
              <ul className="space-y-2 text-amber-200/80">
                {serviceType === 'per_day_rental' && (
                  <>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      Your driver will contact you before the pickup date to confirm details
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      Daily rental includes fuel and driver for a maximum of 10 hours per day
                    </li>
                  </>
                )}
                {serviceType === 'pickup_dropoff' && (
                  <>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      Please be ready at the pickup location 5 minutes before your scheduled time
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      Driver will wait for a maximum of 15 minutes at the pickup location
                    </li>
                  </>
                )}
                {serviceType === 'airport_port_transfer' && (
                  <>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      Your driver will track your {bookingData.transferLocation === 'airport' ? 'flight' : 'ferry'} and adjust for delays
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      Look for a driver holding a sign with your name at the {bookingData.transferType === 'arrival' ? 'arrivals area' : 'meeting point'}
                    </li>
                    <li className="flex items-start">
                      <span className="text-amber-400 mr-2">•</span>
                      For departures, please be ready 15 minutes before your scheduled pickup time
                    </li>
                  </>
                )}
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  Bring a valid ID for verification
                </li>
                <li className="flex items-start">
                  <span className="text-amber-400 mr-2">•</span>
                  Cancellation policy: Free cancellation up to 24 hours before pickup
                </li>
              </ul>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={handleDownload}
                className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 flex items-center justify-center"
              >
                <FaDownload className="mr-2" />
                Download PDF
              </button>
              
              <button
                onClick={handlePrint}
                className="bg-slate-700 text-white border border-slate-600 px-6 py-3 rounded-xl font-semibold hover:bg-slate-600 transition-all duration-300 flex items-center justify-center"
              >
                <FaPrint className="mr-2" />
                Print
              </button>
              
              <Link
                href="/"
                className="bg-slate-800 text-white px-6 py-3 rounded-xl font-semibold hover:bg-slate-700 transition-all duration-300 flex items-center justify-center border border-slate-600"
              >
                <FaHome className="mr-2" />
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body {
            background: white !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}} />
    </>
  );
}
