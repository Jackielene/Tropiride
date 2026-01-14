# Real-Time GPS Tracking Implementation Guide

## 🎯 Overview

Your Tropiride application now has **automatic real-time GPS tracking** that activates when a driver starts a ride. Customers can see the driver's live location on a map with real-time updates.

---

## ✨ Features Implemented

### 1. **Automatic GPS Activation**
- When a driver clicks "Start" on a ride (changes status to `in_progress`), GPS tracking **automatically starts**
- No manual intervention required from the driver
- GPS tracking persists across page refreshes

### 2. **Real-Time Location Updates**
- Driver's location is sent to the server **every 2 seconds**
- High-accuracy GPS positioning with `enableHighAccuracy: true`
- Captures: latitude, longitude, heading, speed, and accuracy

### 3. **Customer Live Tracking**
- Customers can view driver location in **real-time** on a Leaflet map
- Driver marker shows as a **rotating car icon** based on heading direction
- WebSocket connection for instant updates (falls back to polling if WebSockets unavailable)
- Shows driver speed, heading, and last update time

---

## 🔧 How It Works

### Driver Side (When Starting a Ride)

1. **Driver clicks "Start" button** in My Rides page
   - Status changes from `pending` to `in_progress`
   - `autoStart` flag is set to `true`

2. **GPS Tracking Auto-Starts**
   - `GpsTrackingCard` component detects the `autoStart` prop
   - Requests GPS permission from browser
   - Starts `watchPosition` to track movement continuously
   - Sends location updates to `/gps/update` API every 2 seconds

3. **Location Broadcasting**
   - Backend receives GPS coordinates
   - Stores in `driver_locations` table
   - Broadcasts via WebSocket to booking channel: `booking.{id}`
   - Event: `DriverLocationUpdated`

### Customer Side (Tracking Page)

1. **Customer visits** `/tropiride/tracking/{booking_id}`
   - Subscribes to WebSocket channel: `booking.{booking_id}`
   - Listens for `.location.updated` events

2. **Real-Time Updates**
   - Receives location updates every 2 seconds
   - Updates driver marker position on map smoothly
   - Shows driver heading with rotating car icon
   - Displays speed, accuracy, and connection status

---

## 📁 Files Modified

### Frontend Components

1. **`resources/js/pages/driver/rides.tsx`**
   - Added `autoStart` state management
   - Modified `handleUpdateStatus` to trigger GPS auto-start
   - Passes `autoStart` prop to `GpsTrackingCard`

2. **`resources/js/components/driver/GpsTrackingCard.tsx`**
   - Added `autoStart` prop to interface
   - Implemented auto-start detection via `useEffect`
   - Automatically activates tracking when `autoStart` becomes `true`

3. **`resources/js/pages/tropiride/tracking.tsx`** (Already existed)
   - Real-time WebSocket listener for driver location
   - Leaflet map with driver marker
   - Displays live tracking data

### Backend (Already Implemented)

4. **`app/Http/Controllers/GpsTrackingController.php`**
   - `/gps/update` endpoint for receiving driver GPS data
   - `/gps/stop` endpoint for stopping tracking
   - `/gps/booking/{booking}/location` for fetching current driver location

5. **`app/Events/DriverLocationUpdated.php`**
   - WebSocket event broadcast to customers
   - Sends real-time location updates

---

## 🚀 Usage Flow

### For Drivers:

1. Navigate to **My Rides** (`/driver/rides`)
2. Find a booking with status `pending`
3. Click **"Start"** button
4. ✅ **GPS tracking automatically activates**
5. Driver can see:
   - Current speed (km/h)
   - Heading direction (N, NE, E, etc.)
   - GPS accuracy (±meters)
   - Last update timestamp
6. Continue driving - location is sent automatically every 2 seconds
7. Click **"Complete"** when ride is finished
8. GPS tracking automatically stops

### For Customers/Tourists:

1. After booking a ride, go to **Profile > My Bookings**
2. Click **"Track"** button on an active ride
3. View **real-time location** of driver on map
4. See driver information:
   - Name, phone, vehicle type
   - Current speed
   - Distance to pickup
   - Estimated arrival time
   - Last location update
5. **Live indicator** shows WebSocket connection status
6. Map automatically centers on driver location

---

## 🔑 Key Technical Details

### GPS Settings

```typescript
const geolocationOptions: PositionOptions = {
    enableHighAccuracy: true,  // Use GPS instead of network location
    timeout: 10000,            // 10 second timeout
    maximumAge: 0,             // No cached positions
};
```

### Update Frequency

- **Location capture**: Continuous via `watchPosition`
- **Server updates**: Every **2 seconds** (configurable)
- **WebSocket broadcast**: Immediate upon receiving location

### Persistence

- Tracking state saved in `localStorage`
- Survives page refreshes
- Automatically resumes if driver refreshes page during active ride
- Stops automatically when ride is completed/cancelled

### API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/gps/update` | POST | Driver sends GPS coordinates |
| `/gps/stop` | POST | Driver stops tracking |
| `/gps/booking/{booking}/location` | GET | Customer fetches current driver location |

### WebSocket Channel

- **Channel**: `private:booking.{booking_id}`
- **Event**: `.location.updated`
- **Data**: `{ latitude, longitude, heading, speed, accuracy, updated_at }`

---

## 🎨 UI Features

### Driver Dashboard
- **GPS Tracking Card** with live metrics:
  - 📍 Real-time coordinates
  - 🏎️ Current speed
  - 🧭 Heading direction
  - 📶 GPS accuracy
  - ⏱️ Last update time
- **Status badges**: Live/Off with animated pulse
- **Auto-start notification**: "GPS tracking started automatically"

### Customer Tracking Page
- **Interactive Leaflet Map**:
  - 🚗 Animated driver marker (rotates based on heading)
  - 📍 Green pickup marker
  - 📍 Red dropoff marker
  - 📏 Route polyline
- **Driver Info Card**:
  - Avatar, name, phone
  - Vehicle type and license plate
  - Current speed and heading
- **Connection Status**:
  - 🟢 Live (WebSocket connected)
  - 🟡 Polling (Fallback mode)

---

## 🐛 Error Handling

### GPS Permission Denied
- Shows error message: "Location permission denied. Please enable GPS."
- Prompts driver to enable location services
- Prevents ride from starting without GPS

### Network Issues
- Falls back to polling every 5 seconds if WebSocket fails
- Retries failed location updates
- Shows connection status to customer

### No Active Ride
- GPS tracking only available for rides with status `accepted` or `in_progress`
- Automatically stops when ride is `completed` or `cancelled`

---

## 📊 Database Schema

### `driver_locations` Table
```sql
- id
- driver_id (foreign key to users)
- booking_id (foreign key to bookings)
- latitude (decimal)
- longitude (decimal)
- heading (nullable, 0-360 degrees)
- speed (nullable, km/h)
- accuracy (nullable, meters)
- is_active (boolean)
- created_at
- updated_at
```

---

## 🔒 Security Features

1. **Authorization**:
   - Only authenticated drivers can send location updates
   - Drivers can only update their own location
   - Customers can only track their own bookings

2. **Validation**:
   - Latitude: -90 to 90
   - Longitude: -180 to 180
   - Heading: 0 to 360
   - Speed and accuracy: non-negative

3. **Privacy**:
   - Location data only visible to customer of that specific booking
   - Old locations marked as inactive
   - WebSocket channels are private

---

## 🎉 Benefits

✅ **Zero manual intervention** - Tracking starts automatically  
✅ **Real-time updates** - Customer sees driver moving live  
✅ **High accuracy** - Uses device GPS for precise positioning  
✅ **Professional experience** - Like Uber/Grab/Lyft  
✅ **Reliable** - Persists across refreshes, has fallback mechanisms  
✅ **Secure** - Proper authorization and validation  

---

## 🧪 Testing Checklist

### Driver Side
- [ ] Start a ride and verify GPS auto-starts
- [ ] Check that speed/heading updates in real-time
- [ ] Refresh page and verify tracking continues
- [ ] Complete ride and verify GPS stops automatically
- [ ] Test with GPS permission denied

### Customer Side
- [ ] Open tracking page for active ride
- [ ] Verify driver marker appears on map
- [ ] Watch driver marker move in real-time
- [ ] Check WebSocket connection indicator
- [ ] Test with poor network (fallback to polling)
- [ ] Verify data updates (speed, heading, time)

---

## 📝 Notes

- GPS accuracy depends on device capabilities and environment
- Updates may be slower indoors or in areas with poor GPS signal
- WebSocket requires Laravel Echo Server to be running
- Fallback polling works even without WebSockets
- Consider battery usage for long rides (GPS is power-intensive)

---

## 🚨 Important Reminders

1. **Laravel Echo Server must be running** for WebSocket features
2. **HTTPS required** for GPS in production (browser security requirement)
3. **GPS permission** must be granted by driver's device
4. **Background tracking** on mobile may require additional permissions
5. **Test on actual mobile devices** for best results

---

## 📞 Support

For issues or questions:
- Check browser console for GPS/WebSocket errors
- Verify Laravel Echo Server is running
- Check `driver_locations` table for stored data
- Review Laravel logs for backend errors

---

**Implemented by**: AI Assistant  
**Date**: January 2026  
**Status**: ✅ Complete and Ready for Testing

