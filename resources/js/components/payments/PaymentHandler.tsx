import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaCreditCard } from 'react-icons/fa';
import PayPalPayment from './PayPalPayment';

interface PaymentHandlerProps {
  amount: number;
  bookingData: any;
  onPaymentSuccess: (paymentData: any) => void;
  onPaymentError: (error: any) => void;
  onPaymentCancel: () => void;
}

type PaymentStatus = 'idle' | 'processing' | 'success' | 'error' | 'cancelled';

export default function PaymentHandler({
  amount,
  bookingData,
  onPaymentSuccess,
  onPaymentError,
  onPaymentCancel
}: PaymentHandlerProps) {
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [paymentData, setPaymentData] = useState<any>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handlePaymentSuccess = (data: any) => {
    setPaymentStatus('success');
    setPaymentData(data);
    
    // Prepare complete booking data with payment info
    const completeBookingData = {
      ...bookingData,
      payment: {
        method: 'paypal',
        transactionId: data.transactionID,
        orderId: data.orderID,
        amount: data.amount.value,
        currency: data.amount.currency_code,
        status: data.status,
        timestamp: new Date().toISOString()
      }
    };
    
    // Call parent success handler
    onPaymentSuccess(completeBookingData);
  };

  const handlePaymentError = (error: any) => {
    setPaymentStatus('error');
    setErrorMessage(error.message || 'Payment failed. Please try again.');
    onPaymentError(error);
  };

  const handlePaymentCancel = () => {
    setPaymentStatus('cancelled');
    onPaymentCancel();
  };

  const resetPayment = () => {
    setPaymentStatus('idle');
    setPaymentData(null);
    setErrorMessage('');
  };

  return (
    <div className="payment-handler">
      <AnimatePresence mode="wait">
        {paymentStatus === 'idle' && (
          <motion.div
            key="payment-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <PayPalPayment
              amount={amount}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              onCancel={handlePaymentCancel}
            />
          </motion.div>
        )}

        {paymentStatus === 'processing' && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="text-center py-8"
          >
            <div className="flex flex-col items-center space-y-4">
              <FaSpinner className="text-blue-600 text-4xl animate-spin" />
              <h3 className="text-lg font-semibold text-gray-900">Processing Payment</h3>
              <p className="text-gray-600">Please wait while we process your payment...</p>
            </div>
          </motion.div>
        )}

        {paymentStatus === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="text-center py-8"
          >
            <div className="flex flex-col items-center space-y-4">
              <FaCheckCircle className="text-green-600 text-4xl" />
              <h3 className="text-lg font-semibold text-green-900">Payment Successful!</h3>
              <p className="text-gray-600">Your booking has been confirmed.</p>
              
              {paymentData && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4 w-full max-w-md">
                  <div className="text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transaction ID:</span>
                      <span className="font-mono text-xs">{paymentData.transactionID}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-semibold">₱{parseFloat(paymentData.amount.value).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="text-green-600 font-medium capitalize">{paymentData.status}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {paymentStatus === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="text-center py-8"
          >
            <div className="flex flex-col items-center space-y-4">
              <FaTimesCircle className="text-red-600 text-4xl" />
              <h3 className="text-lg font-semibold text-red-900">Payment Failed</h3>
              <p className="text-gray-600">{errorMessage}</p>
              
              <button
                onClick={resetPayment}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}

        {paymentStatus === 'cancelled' && (
          <motion.div
            key="cancelled"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="text-center py-8"
          >
            <div className="flex flex-col items-center space-y-4">
              <FaCreditCard className="text-gray-600 text-4xl" />
              <h3 className="text-lg font-semibold text-gray-900">Payment Cancelled</h3>
              <p className="text-gray-600">You cancelled the payment process.</p>
              
              <button
                onClick={resetPayment}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
