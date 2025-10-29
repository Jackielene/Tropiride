# How to Get Your PayPal Client ID

Follow these step-by-step instructions to get your PayPal Client ID for testing.

## Quick Steps

### Step 1: Go to PayPal Developer Portal
👉 Visit: **[https://developer.paypal.com/](https://developer.paypal.com/)**

### Step 2: Sign In or Sign Up
1. Click **"Log In"** button (top right)
2. Sign in with your PayPal account, OR
3. Click **"Sign Up"** to create a new PayPal account (it's free!)

### Step 3: Navigate to Dashboard
1. After logging in, you'll see the **Dashboard**
2. Look for **"My Apps & Credentials"** section on the left sidebar

### Step 4: Create a Sandbox App (For Testing)
1. Click **"Create App"** button
2. Fill in the form:
   - **App Name**: `Tropiride Test` (or any name you like)
   - **Merchant**: Select your sandbox business account (or create one)
   - **Features**: Select **"Accept payments"**
3. Click **"Create App"** button

### Step 5: Copy Your Client ID
After creating the app, you'll see:
- ✅ **Client ID** - This is what you need!
- 🔐 **Secret** - Keep this secure (not needed for frontend)

**Copy the Client ID** (it looks like: `AeA1QIZXiflr1_-MoAzMZZjUGg...`)

### Step 6: Use Sandbox Test Account
For testing, PayPal provides test accounts:
1. Go to **"Accounts"** in the left sidebar
2. You'll see pre-created test accounts:
   - **Business Account** (for receiving payments)
   - **Personal Account** (for testing purchases)

You can also create custom test accounts if needed.

---

## Setting Up Your .env File

### Step 1: Open/Create .env file
Navigate to your project root and open or create `.env` file

### Step 2: Add PayPal Configuration
```env
# PayPal Configuration (Sandbox for testing)
VITE_PAYPAL_CLIENT_ID=AeA1QIZXiflr1_-MoAzMZZjUGgXXXXXXXXXXXXXXXXXX
VITE_PAYPAL_ENVIRONMENT=sandbox
```

**Replace** `AeA1QIZXiflr1_-MoAzMZZjUGgXXXXXXXXXXXXXXXXXX` with your actual Client ID from Step 5.

### Step 3: Restart Your Development Server
After adding the Client ID:
- Stop your server (Ctrl+C)
- Start it again with `npm run dev` or `php artisan serve`

---

## Testing Your Setup

### Use Sandbox Test Credentials
When testing payments, use these sandbox test accounts:

**Buyer Account (to test payments):**
- Email: Use the personal test account email from PayPal Dashboard
- Password: Use the password you set when creating the test account
- OR use: `sb-buyer12345@business.example.com` / `password12345`

**Seller Account (your business):**
- Use the business account from your PayPal app

---

## For Production (When Ready)

When you're ready to accept real payments:

1. Go to PayPal Developer Portal
2. Create a **Production** app (same steps, but select "Production")
3. Get the Production Client ID
4. Update your `.env`:
```env
VITE_PAYPAL_CLIENT_ID=your_production_client_id_here
VITE_PAYPAL_ENVIRONMENT=production
```
5. Rebuild: `npm run build`

---

## Troubleshooting

### ❌ "PayPal SDK not loading"
- ✅ Check that Client ID is correct
- ✅ Make sure there are no extra spaces in `.env`
- ✅ Restart your dev server
- ✅ Rebuild assets: `npm run build`

### ❌ "Invalid Client ID"
- ✅ Make sure you're using a Sandbox Client ID for testing
- ✅ Verify the Client ID is copied completely
- ✅ Check that `VITE_PAYPAL_ENVIRONMENT=sandbox` is set

### ❌ Can't find "Create App" button
- ✅ Make sure you're logged in
- ✅ Try refreshing the page
- ✅ Check that you have a business/personal PayPal account

---

## Need Help?

- 📖 [PayPal Developer Documentation](https://developer.paypal.com/docs/)
- 💬 [PayPal Developer Support](https://developer.paypal.com/support/)
- 🎯 [PayPal SDK Examples](https://developer.paypal.com/demo/checkout/)

---

## Quick Checklist

- [ ] Created PayPal Developer account
- [ ] Created Sandbox app
- [ ] Copied Client ID
- [ ] Added Client ID to `.env` file
- [ ] Set `VITE_PAYPAL_ENVIRONMENT=sandbox`
- [ ] Restarted dev server
- [ ] Tested payment flow

**That's it! You're ready to accept PayPal payments! 🎉**

