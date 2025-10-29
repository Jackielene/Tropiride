import { useState } from 'react';
import { FaPaypal, FaCreditCard, FaShieldAlt } from 'react-icons/fa';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PAYPAL_CONFIG } from '@/config/paypal';

interface PayPalPaymentProps {
  amount: number;
  currency?: string;
  onSuccess: (paymentData: any) => void;
  onError: (error: any) => void;
  onCancel: () => void;
  disabled?: boolean;
  className?: string;
}

export default function PayPalPayment({
  amount,
  currency = 'PHP',
  onSuccess,
  onError,
  onCancel,
  disabled = false,
  className = ''
}: PayPalPaymentProps) {
  const [isLoading, setIsLoading] = useState(false);

  // Check if PayPal Client ID is configured
  const clientId = PAYPAL_CONFIG.CLIENT_ID;
  
  if (!clientId) {
    return (
      <div className={`paypal-payment-container ${className}`}>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <FaPaypal className="text-red-600 text-xl" />
            <div>
              <h3 className="font-semibold text-red-900">PayPal Not Configured</h3>
              <p className="text-sm text-red-700">
                Please add VITE_PAYPAL_CLIENT_ID to your .env file
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const paypalOptions = {
    clientId: clientId,
    currency: currency,
    intent: PAYPAL_CONFIG.INTENT,
    components: 'buttons' as const,
  };

  const buttonStyle = PAYPAL_CONFIG.BUTTON_STYLE;

  return (
    <div className={`paypal-payment-container ${className}`}>
      {/* Payment Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <div className="flex items-center space-x-3 mb-3">
          <FaPaypal className="text-blue-600 text-xl" />
          <div>
            <h3 className="font-semibold text-blue-900">PayPal Payment</h3>
            <p className="text-sm text-blue-700">Secure payment powered by PayPal</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-blue-700">
            <FaShieldAlt className="text-blue-600" />
            <span>Protected by PayPal Buyer Protection</span>
          </div>
          <div className="text-lg font-bold text-blue-900">
            ₱{amount.toLocaleString()}
          </div>
        </div>
      </div>

      {/* PayPal Buttons Container */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="text-sm text-gray-600">Processing payment...</span>
            </div>
          </div>
        )}
        
        <div className={`${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
          <PayPalScriptProvider options={paypalOptions}>
            <PayPalButtons
              style={buttonStyle}
              disabled={disabled}
              createOrder={(data, actions) => {
                setIsLoading(true);
                return actions.order.create({
                  purchase_units: [{
                    amount: {
                      value: amount.toFixed(2),
                      currency_code: currency
                    },
                    description: 'Tropiride Vehicle Rental'
                  }]
                });
              }}
              onApprove={(data, actions) => {
                return actions.order!.capture().then((details) => {
                  setIsLoading(false);
                  onSuccess({
                    orderID: data.orderID,
                    payerID: data.payerID,
                    status: details.status,
                    amount: details.purchase_units[0].payments.captures[0].amount,
                    transactionID: details.purchase_units[0].payments.captures[0].id
                  });
                });
              }}
              onError={(err) => {
                setIsLoading(false);
                console.error('PayPal error:', err);
                onError(err);
              }}
              onCancel={(data) => {
                setIsLoading(false);
                console.log('PayPal payment cancelled:', data);
                onCancel();
              }}
            />
          </PayPalScriptProvider>
        </div>
      </div>

      {/* Alternative Payment Methods */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center mb-3">Or pay with</p>
        <div className="flex justify-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FaCreditCard className="text-gray-400" />
            <span>Credit/Debit Card</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <FaPaypal className="text-blue-600" />
            <span>PayPal Account</span>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <FaShieldAlt className="text-green-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-green-800">
            <p className="font-medium">Secure Payment</p>
            <p>Your payment information is encrypted and secure. We never store your payment details.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
