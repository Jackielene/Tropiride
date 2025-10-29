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
  FaPrint
} from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

interface BookingData {
  id?: string;
  vehicleType: 'multicab' | 'van' | null;
  vehicleName: string;
  pickupDate: string | Date;
  returnDate: string | Date;
  pickupLocation: string;
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
}

interface TropirideConfirmationProps {
  bookingData?: BookingData;
}

const vehicleOptions = [
  {
    id: 'multicab',
    name: 'Multicab',
    price: 800,
  },
  {
    id: 'van',
    name: 'Van',
    price: 1200,
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
    vehicleType: 'multicab',
    vehicleName: 'Multicab',
    pickupDate: '2024-03-15',
    returnDate: '2024-03-18',
    pickupLocation: 'Sayak Airport',
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

  // Calculate total amount based on vehicle type and duration
  const calculateTotalAmount = () => {
    if (!bookingData.vehicleType || !bookingData.pickupDate || !bookingData.returnDate) {
      return bookingData.totalAmount || 0;
    }

    const startDate = new Date(bookingData.pickupDate);
    const endDate = new Date(bookingData.returnDate);
    
    // Calculate the difference in days
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    
    // For rental services, minimum charge is 1 day (even for same-day rentals)
    const days = Math.max(1, daysDiff);
    
    const selectedVehicle = vehicleOptions.find(v => v.id === bookingData.vehicleType);
    if (!selectedVehicle) return bookingData.totalAmount || 0;
    
    return days * selectedVehicle.price;
  };

  const totalAmount = calculateTotalAmount();
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Implement PDF download functionality
    console.log('Download booking confirmation');
  };

  return (
    <>
      <Head title="Booking Confirmation - Tropiride" />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-white text-2xl" />
              </div>
              <span className="text-xl font-bold text-gray-900">Tropiride</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Booking Confirmed!
            </h1>
            <p className="text-gray-600">
              Your vehicle reservation has been successfully confirmed
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
              className="bg-green-50 border border-green-200 rounded-xl p-6"
            >
              <div className="flex items-center">
                <FaCheckCircle className="text-green-500 text-2xl mr-3" />
                <div>
                  <h3 className="text-lg font-semibold text-green-900">
                    Payment Successful
                  </h3>
                  <p className="text-green-700">
                    Your booking has been confirmed and payment has been processed. 
                    You will receive a confirmation email shortly.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Booking Details */}
            <motion.div
              variants={fadeInUp}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6">
                <h2 className="text-2xl font-bold">Booking Details</h2>
                <p className="text-blue-100">Booking ID: {bookingData.id}</p>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Information</h3>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaCar className="text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{bookingData.vehicleName}</p>
                        <p className="text-gray-600">Vehicle Type</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaUsers className="text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{bookingData.passengers} Passengers</p>
                        <p className="text-gray-600">Capacity</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Details</h3>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FaCalendarAlt className="text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {new Date(bookingData.pickupDate).toLocaleDateString()} - {new Date(bookingData.returnDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600">Duration</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                        <FaMapMarkerAlt className="text-orange-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{bookingData.pickupLocation}</p>
                        <p className="text-gray-600">Pickup Location</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    {/* Pricing breakdown */}
                    {bookingData.vehicleType && bookingData.pickupDate && bookingData.returnDate && (
                      <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Daily Rate:</span>
                          <span className="font-medium">
                            ₱{vehicleOptions.find(v => v.id === bookingData.vehicleType)?.price}/day
                          </span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Duration:</span>
                          <span className="font-medium">
                            {Math.max(1, Math.ceil((new Date(bookingData.returnDate).getTime() - new Date(bookingData.pickupDate).getTime()) / (1000 * 60 * 60 * 24)))} days
                          </span>
                        </div>
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Calculation:</span>
                          <span className="font-medium">
                            ₱{vehicleOptions.find(v => v.id === bookingData.vehicleType)?.price} × {Math.max(1, Math.ceil((new Date(bookingData.returnDate).getTime() - new Date(bookingData.pickupDate).getTime()) / (1000 * 60 * 60 * 24)))} days
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                      <span className="text-2xl font-bold text-blue-600">₱{totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Driver Information */}
            {bookingData.driverInfo && (
              <motion.div
                variants={fadeInUp}
                className="bg-white rounded-2xl shadow-xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Driver</h3>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">{bookingData.driverInfo.name}</p>
                      <p className="text-gray-600">Professional Driver</p>
                      <p className="text-sm text-gray-500">Vehicle: {bookingData.driverInfo.vehiclePlate}</p>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={`tel:${bookingData.driverInfo.phone}`}
                        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
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
              className="bg-white rounded-2xl shadow-xl p-6"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">Your Information</h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold text-gray-900">{bookingData.customerInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">{bookingData.customerInfo.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="font-semibold text-gray-900">{bookingData.customerInfo.phone}</p>
                </div>
              </div>
            </motion.div>

            {/* Important Notes */}
            <motion.div
              variants={fadeInUp}
              className="bg-yellow-50 border border-yellow-200 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">Important Notes</h3>
              <ul className="space-y-2 text-yellow-800">
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  Please arrive at the pickup location 15 minutes before your scheduled time
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  Bring a valid ID for verification
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
                  Contact your driver directly if you have any questions or need to make changes
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-600 mr-2">•</span>
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
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                <FaDownload className="mr-2" />
                Download PDF
              </button>
              
              <button
                onClick={handlePrint}
                className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
              >
                <FaPrint className="mr-2" />
                Print
              </button>
              
              <Link
                href="/"
                className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300 flex items-center justify-center"
              >
                <FaHome className="mr-2" />
                Back to Home
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
