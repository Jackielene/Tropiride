// PayPal Configuration
export const PAYPAL_CONFIG = {
  // PayPal Client ID - Replace with your actual PayPal Client ID
  // Get this from: https://developer.paypal.com/developer/applications/
  // Add VITE_PAYPAL_CLIENT_ID to your .env file
  CLIENT_ID: import.meta.env.VITE_PAYPAL_CLIENT_ID || '',
  
  // PayPal Environment
  // Use 'sandbox' for testing, 'production' for live payments
  ENVIRONMENT: import.meta.env.VITE_PAYPAL_ENVIRONMENT || (import.meta.env.MODE === 'production' ? 'production' : 'sandbox'),
  
  // Currency
  CURRENCY: 'PHP',
  
  // Intent (capture for immediate payment)
  INTENT: 'capture',
  
  // Button Style
  BUTTON_STYLE: {
    layout: 'vertical',
    color: 'blue',
    shape: 'rect',
    label: 'paypal',
    height: 45
  }
};

// PayPal SDK Options for @paypal/react-paypal-js
export const getPayPalOptions = () => {
  const { CLIENT_ID, ENVIRONMENT, CURRENCY, INTENT } = PAYPAL_CONFIG;
  
  if (!CLIENT_ID) {
    console.warn('PayPal Client ID is not configured. Please add VITE_PAYPAL_CLIENT_ID to your .env file');
  }
  
  return {
    clientId: CLIENT_ID,
    currency: CURRENCY,
    intent: INTENT,
    components: 'buttons' as const,
    // For sandbox, the library automatically uses sandbox if client ID starts with certain prefixes
    // Or you can explicitly set the data-namespace if needed
  };
};

// PayPal API Endpoints
export const PAYPAL_API = {
  SANDBOX: 'https://api.sandbox.paypal.com',
  PRODUCTION: 'https://api.paypal.com'
};

export const getPayPalAPIUrl = () => {
  return PAYPAL_CONFIG.ENVIRONMENT === 'production' 
    ? PAYPAL_API.PRODUCTION 
    : PAYPAL_API.SANDBOX;
};
