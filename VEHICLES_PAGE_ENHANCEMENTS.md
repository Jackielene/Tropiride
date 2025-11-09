# Vehicles Page Enhancements (Ride-Hailing System)

## Overview
Enhanced the Tropiride vehicles/ride-hailing page to include vehicle selection, passenger count, and dynamic fare calculation based on vehicle type and distance.

## Implemented Features

### 1. Vehicle Type Selection
- **Location**: Top of the booking panel in vehicles page
- **Description**: Users can now select their preferred vehicle type:
  - **Multicab** (6-8 passengers) - Base ₱50 + ₱15/km
  - **Van** (10-14 passengers) - Base ₱80 + ₱20/km

### 2. Passenger Count Selection
- **Location**: Below vehicle selection
- **Description**: Dropdown to select number of passengers (1-14)
- **Validation**: 
  - Automatically validates if the selected number of passengers exceeds vehicle capacity
  - Shows ✅ green confirmation when passengers fit in selected vehicle
  - Shows ⚠️ red warning if passenger count exceeds vehicle capacity
  - Multicab: Maximum 8 passengers
  - Van: Maximum 14 passengers

### 3. Dynamic Fare Calculation
The fare is now calculated based on both **vehicle type** and **distance**:

#### Calculation Formula:
```
Estimated Fare = Base Fare + (Per-km Rate × Distance)
```

#### Pricing Structure:
- **Multicab**: 
  - Base Fare: ₱50
  - Per-km Rate: ₱15
  
- **Van**: 
  - Base Fare: ₱80
  - Per-km Rate: ₱20

### 4. Fare Breakdown Display
The trip details section now shows:
- Selected vehicle type
- Distance in kilometers
- Estimated time in minutes
- **Fare calculation breakdown**: Shows the formula used
  - Example: "Multicab: ₱50 base + ₱15/km × 3.45km"

## Example Calculations

### Example 1: Short Trip (Multicab)
- Vehicle: Multicab
- Distance: 3.5 km
- **Calculation**: ₱50 + (₱15 × 3.5) = ₱50 + ₱52.5 = **₱103**

### Example 2: Short Trip (Van)
- Vehicle: Van
- Distance: 3.5 km
- **Calculation**: ₱80 + (₱20 × 3.5) = ₱80 + ₱70 = **₱150**

### Example 3: Medium Trip (Multicab)
- Vehicle: Multicab
- Distance: 10 km
- **Calculation**: ₱50 + (₱15 × 10) = ₱50 + ₱150 = **₱200**

### Example 4: Medium Trip (Van)
- Vehicle: Van
- Distance: 10 km
- **Calculation**: ₱80 + (₱20 × 10) = ₱80 + ₱200 = **₱280**

### Example 5: Long Trip (Multicab)
- Vehicle: Multicab
- Distance: 25 km
- **Calculation**: ₱50 + (₱15 × 25) = ₱50 + ₱375 = **₱425**

### Example 6: Long Trip (Van)
- Vehicle: Van
- Distance: 25 km
- **Calculation**: ₱80 + (₱20 × 25) = ₱80 + ₱500 = **₱580**

## Technical Implementation

### Frontend Changes (`resources/js/pages/tropiride/vehicles.tsx`)

#### State Management
Added new state variables:
```typescript
const [selectedVehicle, setSelectedVehicle] = useState<'multicab' | 'van'>('multicab');
const [passengerCount, setPassengerCount] = useState<number>(1);
```

#### Fare Calculation Logic
Updated the fare calculation useEffect to consider vehicle type:
```typescript
const baseFare = selectedVehicle === 'van' ? 80 : 50;
const perKm = selectedVehicle === 'van' ? 20 : 15;
const fare = Math.round(baseFare + (distance * perKm));
```

#### Dependency Array
Added `selectedVehicle` to the useEffect dependency array so fare recalculates when vehicle type changes:
```typescript
}, [pickupLocation, dropoffLocation, selectedVehicle]);
```

#### UI Components Added
1. **Vehicle Selection Dropdown**:
   - Shows vehicle name, capacity, and pricing structure
   - Located at the top of the booking form

2. **Passenger Count Dropdown**:
   - 1-14 passengers selectable
   - Real-time capacity validation
   - Visual feedback (green ✓ or red ⚠️)

3. **Enhanced Fare Display**:
   - Shows vehicle type
   - Shows calculation breakdown
   - Updates in real-time

#### Ride Request Submission
Updated to include vehicle and passenger data:
```typescript
router.post('/tropiride/ride-request', {
  // ... existing fields ...
  vehicle_type: selectedVehicle,
  passengers: passengerCount,
}, {
```

### Backend Changes

#### Controller (`app/Http/Controllers/RideRequestController.php`)

**Validation Rules Added**:
```php
'vehicle_type' => 'nullable|string|in:multicab,van',
'passengers' => 'nullable|integer|min:1|max:14',
```

**Data Storage**:
```php
// Set vehicle_type if provided and column exists
if (isset($validated['vehicle_type']) && Schema::hasColumn('bookings', 'vehicle_type')) {
    $bookingData['vehicle_type'] = $validated['vehicle_type'];
}

// Set passengers if provided and column exists
if (isset($validated['passengers']) && Schema::hasColumn('bookings', 'passengers')) {
    $bookingData['passengers'] = $validated['passengers'];
}
```

#### Model (`app/Models/Booking.php`)

Added `vehicle_type` to the `$fillable` array:
```php
protected $fillable = [
    // ... existing fields ...
    'vehicle_type',
    // ... other fields ...
];
```

#### Database Migration

Created migration to add `vehicle_type` column:
```php
// 2025_11_03_052252_add_vehicle_type_to_bookings_table.php
Schema::table('bookings', function (Blueprint $table) {
    if (!Schema::hasColumn('bookings', 'vehicle_type')) {
        $table->string('vehicle_type')->nullable()->after('passengers');
    }
});
```

## User Experience Flow

1. **Select Vehicle Type**
   - User chooses between Multicab or Van
   - See pricing structure immediately

2. **Select Passenger Count**
   - User selects number of passengers
   - System validates against vehicle capacity
   - Visual feedback shows if selection is valid

3. **Enter Pickup Location**
   - GPS auto-detection or manual entry
   - (Existing functionality)

4. **Enter Dropoff Location**
   - Search and select destination
   - (Existing functionality)

5. **View Trip Details**
   - System calculates:
     - Distance
     - Estimated time
     - **Fare (based on selected vehicle and distance)**
   - Fare breakdown shows: "Vehicle: ₱base + ₱rate/km × distance"

6. **Submit Ride Request**
   - All data including vehicle type and passenger count sent to backend
   - Stored in database for driver assignment

## Benefits

### For Customers
- **Transparency**: Clear breakdown of how fare is calculated
- **Choice**: Select vehicle based on group size and budget
- **Accuracy**: Fare reflects the actual vehicle they'll receive
- **Validation**: Prevented from booking vehicle too small for their group

### For Business
- **Better Pricing**: Different rates for different vehicle types
- **Resource Management**: Know which vehicles are in demand
- **Driver Assignment**: Can assign appropriate vehicle based on booking
- **Data Collection**: Track passenger counts and vehicle preferences

## Files Modified

1. **resources/js/pages/tropiride/vehicles.tsx**
   - Added vehicle selection dropdown
   - Added passenger count dropdown with validation
   - Updated fare calculation logic
   - Enhanced trip details display
   - Updated ride request submission

2. **app/Http/Controllers/RideRequestController.php**
   - Added validation for vehicle_type and passengers
   - Updated data storage logic

3. **app/Models/Booking.php**
   - Added vehicle_type to fillable fields

4. **database/migrations/2025_11_03_052252_add_vehicle_type_to_bookings_table.php**
   - New migration to add vehicle_type column

## Build Status
✅ Successfully built with no errors or warnings
✅ All TypeScript types validated
✅ No linter errors
✅ Database migration successful

## Differences Between Pages

### Vehicles Page (Ride-Hailing)
- **Purpose**: Point-to-point transportation
- **Pricing**: Base fare + per-km rate
- **Factors**: Distance and vehicle type
- **Multicab**: ₱50 + ₱15/km
- **Van**: ₱80 + ₱20/km

### Booking Page (Vehicle Rental)
- **Purpose**: Long-term vehicle rental
- **Pricing**: Daily rate × number of days
- **Factors**: Rental duration and vehicle type
- **Multicab**: ₱800/day
- **Van**: ₱1,200/day

## Testing Recommendations

Test the following scenarios:
1. ✅ Select each vehicle type and verify correct pricing structure
2. ✅ Test passenger count validation for both vehicles
3. ✅ Test fare calculation updates when changing vehicle type
4. ✅ Test that fare updates when locations change
5. ✅ Verify short, medium, and long distance calculations
6. ⚠️ Complete end-to-end ride request and verify data storage
7. ⚠️ Test driver assignment with vehicle type information

## Future Enhancements (Optional)

Consider these potential improvements:
1. Add more vehicle types (sedan, SUV, etc.)
2. Add peak hour pricing multipliers
3. Add promo codes/discounts
4. Add vehicle-specific amenities selection
5. Add real-time vehicle availability check
6. Add preferred driver selection
7. Add split fare functionality for groups
8. Add ride scheduling for future dates/times
9. Add estimated fuel consumption display

