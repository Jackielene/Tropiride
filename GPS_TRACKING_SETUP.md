# Real-Time GPS Tracking Setup Guide

This document explains how to set up the real-time GPS tracking feature using Pusher WebSockets.

## Overview

The GPS tracking system works like Uber/Grab:
- **Driver**: Sends GPS location every 2 seconds via WebSocket
- **Customer**: Receives instant location updates (< 1 second delay)
- **Map**: Shows driver position in real-time with smooth animations

## Step 1: Create a Pusher Account (Free)

1. Go to [https://pusher.com](https://pusher.com)
2. Sign up for a free account
3. Create a new **Channels** app:
   - App name: `tropiride` (or your preferred name)
   - Cluster: Choose the closest to your users (e.g., `ap1` for Asia)
   - Frontend: React
   - Backend: Laravel

## Step 2: Get Your Pusher Credentials

After creating the app, go to **App Keys** tab and copy:
- App ID
- Key
- Secret
- Cluster

## Step 3: Configure Environment Variables

Add these to your `.env` file:

```env
# Broadcasting Configuration
BROADCAST_CONNECTION=pusher

# Pusher Credentials
PUSHER_APP_ID=your_app_id_here
PUSHER_APP_KEY=your_app_key_here
PUSHER_APP_SECRET=your_app_secret_here
PUSHER_APP_CLUSTER=ap1
```

Replace the values with your actual Pusher credentials.

## Step 4: Enable Broadcasting in Laravel

The broadcasting is already configured. Just make sure your queue is running if you want async broadcasting:

```bash
php artisan queue:work
```

Or for development, you can use sync driver (immediate):
```env
QUEUE_CONNECTION=sync
```

## Step 5: Test the Setup

1. Start your Laravel server:
   ```bash
   php artisan serve
   ```

2. Build frontend assets:
   ```bash
   npm run build
   ```

3. Create a booking and have a driver accept it

4. As the customer, go to `/tropiride/tracking/{booking_id}`

5. As the driver, go to `/driver/rides` and click "Start Tracking"

6. You should see:
   - Green "Live" indicator on the customer's map (WebSocket connected)
   - Driver marker moving in real-time on the map

## How It Works

### Architecture
```
Driver's Phone                    Server                      Customer's Phone
     |                              |                              |
     |---(GPS coordinates)--------->|                              |
     |                              |                              |
     |                         [Save to DB]                        |
     |                              |                              |
     |                         [Broadcast via]                     |
     |                         [Pusher WebSocket]                  |
     |                              |                              |
     |                              |-----(Push to Customer)------>|
     |                              |                              |
     |                              |                         [Update Map]
```

### Update Frequency
| Component | Frequency | Purpose |
|-----------|-----------|---------|
| Driver GPS | Every 2 seconds | Capture position |
| Server broadcast | Immediate | Push to Pusher |
| Customer receive | < 1 second | Real-time display |

### Fallback Behavior
If WebSocket connection fails:
- Shows amber "Polling" indicator
- Falls back to HTTP polling every 5 seconds
- Still works, just slightly delayed

## Pusher Free Tier Limits

The free Pusher plan includes:
- **100 concurrent connections** (users viewing tracking at same time)
- **200,000 messages per day**
- **Unlimited channels**

This is plenty for a small-to-medium ride-sharing app. For higher scale, consider:
- Pusher paid plans
- Self-hosted Laravel Reverb
- Ably.io

## Debugging

### Check if Pusher is configured:
```bash
php artisan tinker
>>> config('broadcasting.connections.pusher.key')
```

### Check WebSocket connection in browser:
Open browser DevTools (F12) → Console tab. You should see:
```
Subscribing to private channel: booking.123
Successfully subscribed to booking channel
```

### Check events are broadcasting:
In Pusher dashboard → Debug Console, you should see events when driver shares location.

## Files Modified/Created

| File | Purpose |
|------|---------|
| `config/broadcasting.php` | Pusher configuration |
| `routes/channels.php` | Channel authorization |
| `app/Events/DriverLocationUpdated.php` | Broadcast event |
| `app/Http/Controllers/GpsTrackingController.php` | Broadcasting logic |
| `resources/js/lib/echo.ts` | Laravel Echo setup |
| `resources/js/pages/tropiride/tracking.tsx` | Customer tracking page |
| `resources/js/components/driver/GpsTrackingCard.tsx` | Driver GPS card |

## Security

- Private channels require authentication
- Only the customer who made the booking can listen to their booking's channel
- CSRF protection on all requests
- Driver can only broadcast to bookings they're assigned to

