# PayPal Integration Setup Guide

This guide will help you set up PayPal payment integration for the Tropiride booking system.

## 1. PayPal Developer Account Setup

### Step 1: Create PayPal Developer Account
1. Go to [PayPal Developer Portal](https://developer.paypal.com/)
2. Sign in with your PayPal account or create a new one
3. Click "Create App" to create a new application

### Step 2: Create PayPal App
1. **App Name**: Tropiride Payment Integration
2. **Merchant**: Select your business account
3. **Features**: Enable the following:
   - Accept payments
   - Future payments
   - Reference transactions
4. **Sandbox**: Start with Sandbox for testing
5. **Production**: Move to Production when ready

### Step 3: Get Your Credentials
After creating the app, you'll get:
- **Client ID**: Your PayPal Client ID
- **Client Secret**: Your PayPal Client Secret (keep this secure)

## 2. Environment Configuration

### Step 1: Add Environment Variables
Add these to your `.env` file in the project root:

```env
# PayPal Configuration (Sandbox for testing)
VITE_PAYPAL_CLIENT_ID=your_sandbox_client_id_here
VITE_PAYPAL_ENVIRONMENT=sandbox

# Optional: PayPal Client Secret (for server-side operations only)
PAYPAL_CLIENT_SECRET=your_sandbox_client_secret_here
```

### Step 2: Production Environment
For production, update your environment variables:

```env
# PayPal Production Configuration
VITE_PAYPAL_CLIENT_ID=your_production_client_id_here
VITE_PAYPAL_ENVIRONMENT=production

# Optional: PayPal Client Secret (for server-side operations only)
PAYPAL_CLIENT_SECRET=your_production_client_secret_here
```

**Important**: 
- Variables prefixed with `VITE_` are exposed to the frontend
- The `PAYPAL_CLIENT_SECRET` should NEVER be exposed to the frontend
- After adding/updating `.env` variables, restart your dev server if running
- Run `npm run build` after changing environment variables in production

## 3. PayPal SDK Integration

The integration includes:

### Components Created:
- `PayPalPayment.tsx` - Main PayPal payment component
- `PaymentHandler.tsx` - Payment flow management
- `paypal.ts` - PayPal configuration

### Features:
- ✅ PayPal Express Checkout
- ✅ Credit/Debit Card payments through PayPal
- ✅ Secure payment processing
- ✅ Payment success/failure handling
- ✅ Transaction confirmation
- ✅ Mobile-responsive design

## 4. Testing

### Sandbox Testing:
1. Use PayPal Sandbox accounts for testing
2. Create test buyer and seller accounts in PayPal Developer Portal
3. Test different payment scenarios:
   - Successful payments
   - Failed payments
   - Cancelled payments
   - Different currencies

### Test Cards (Sandbox):
- **Visa**: 4032035716716172
- **Mastercard**: 5555555555554444
- **Amex**: 378282246310005

## 5. Production Deployment

### Before Going Live:
1. ✅ Complete sandbox testing
2. ✅ Update environment variables to production
3. ✅ Verify PayPal business account setup
4. ✅ Test with real PayPal accounts
5. ✅ Set up webhook endpoints (optional)

### Security Considerations:
- Never expose Client Secret in frontend code
- Use HTTPS in production
- Implement proper error handling
- Log payment events for debugging

## 6. Webhook Setup (Optional)

For advanced features, set up PayPal webhooks:

1. Go to PayPal Developer Portal
2. Navigate to your app
3. Add webhook URL: `https://yourdomain.com/api/paypal/webhook`
4. Select events to listen for:
   - `PAYMENT.CAPTURE.COMPLETED`
   - `PAYMENT.CAPTURE.DENIED`

## 7. Troubleshooting

### Common Issues:

**PayPal SDK not loading:**
- Check that `VITE_PAYPAL_CLIENT_ID` is set in your `.env` file
- Verify the Client ID is correct (sandbox vs production)
- Restart your dev server after changing `.env` variables
- Verify network connectivity
- Check browser console for specific error messages
- Ensure you're using the correct SDK URL for sandbox vs production

**Payment not processing:**
- Verify PayPal account is active
- Check currency settings
- Ensure amount is valid

**Styling issues:**
- PayPal buttons have limited customization
- Use CSS to style container elements
- Test on different devices

## 8. Support

For PayPal-specific issues:
- [PayPal Developer Documentation](https://developer.paypal.com/docs/)
- [PayPal Support](https://www.paypal.com/support/)
- [PayPal Community](https://developer.paypal.com/community/)

## 9. Next Steps

After successful integration:
1. Monitor payment transactions
2. Set up email notifications
3. Implement refund functionality
4. Add payment analytics
5. Consider additional payment methods

---

**Note**: This integration is ready to use once you add your PayPal Client ID to the environment variables. The system will automatically switch between sandbox and production based on your NODE_ENV setting.
