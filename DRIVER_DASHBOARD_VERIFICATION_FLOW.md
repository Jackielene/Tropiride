# Driver Dashboard Verification Flow

## 🎯 Overview

The driver dashboard now correctly implements a **3-stage verification flow**:

1. **Stage 1: Profile Incomplete** - Driver must complete all required fields
2. **Stage 2: Pending Verification** - Driver submitted profile, waiting for admin approval
3. **Stage 3: Verified** - Driver is approved and can accept rides

---

## 🔐 Backend Implementation ✅

### What Was Fixed

The `DriverDashboardController` now:

1. **Hides available rides** until driver is verified
2. **Returns empty array** for `availableBookings` if not verified
3. **Provides verification status flags** for frontend to display appropriate UI

### Data Returned to Frontend

```php
'driver' => [
    // Profile data
    'name' => string,
    'email' => string,
    'phone' => string|null,
    'age' => int|null,
    'address' => string|null,
    'avatar' => string|null,
    'avatar_url' => string,
    
    // License data
    'driver_license_front' => string|null,
    'driver_license_back' => string|null,
    'driver_license_front_url' => string|null,
    'driver_license_back_url' => string|null,
    
    // Verification status
    'profile_completed' => boolean,
    'verification_status' => 'pending'|'approved'|'rejected',
    'verified_at' => ISO date string|null,
    'rejection_reason' => string|null,
    
    // Helper flags
    'is_profile_ready' => boolean,           // All fields filled?
    'is_verified' => boolean,                // Approved by admin?
    'has_completed_profile' => boolean,      // Submitted for verification?
    'is_verification_pending' => boolean,    // Waiting for admin?
    'is_verification_rejected' => boolean,   // Rejected by admin?
],
'availableBookings' => [], // Empty until verified
'stats' => [
    'availableRides' => 0, // Zero until verified
]
```

---

## 🎨 Frontend Implementation Guide

### Stage 1: Profile Incomplete

**Condition**: `!driver.has_completed_profile && !driver.is_profile_ready`

**UI to Display**:

```tsx
{!driver.has_completed_profile && !driver.is_profile_ready && (
  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
    <h2 className="text-xl font-bold text-yellow-900 mb-4">
      Complete Your Profile to Start Accepting Rides
    </h2>
    <p className="text-yellow-800 mb-4">
      Please complete all required fields to submit your profile for verification.
    </p>
    
    {/* Checklist */}
    <div className="space-y-2">
      <CheckItem completed={!!driver.name} label="Full Name" />
      <CheckItem completed={!!driver.age} label="Age (18+)" />
      <CheckItem completed={!!driver.phone} label="Phone Number" />
      <CheckItem completed={!!driver.address} label="Address" />
      <CheckItem completed={!!driver.avatar} label="Profile Picture" />
      <CheckItem completed={!!driver.driver_license_front} label="Driver's License (Front)" />
      <CheckItem completed={!!driver.driver_license_back} label="Driver's License (Back)" />
    </div>
    
    {/* Profile Form */}
    <ProfileCompletionForm driver={driver} />
  </div>
)}
```

### Stage 2A: Profile Ready (Not Submitted)

**Condition**: `driver.is_profile_ready && !driver.has_completed_profile`

**UI to Display**:

```tsx
{driver.is_profile_ready && !driver.has_completed_profile && (
  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
    <h2 className="text-xl font-bold text-green-900 mb-4">
      ✅ Profile Complete! Ready to Submit
    </h2>
    <p className="text-green-800 mb-4">
      Your profile is complete. Submit it for admin verification to start accepting rides.
    </p>
    
    <button
      onClick={handleSubmitVerification}
      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold"
    >
      Submit for Verification
    </button>
  </div>
)}
```

### Stage 2B: Pending Verification

**Condition**: `driver.has_completed_profile && driver.is_verification_pending`

**UI to Display**:

```tsx
{driver.has_completed_profile && driver.is_verification_pending && (
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
    <h2 className="text-xl font-bold text-blue-900 mb-4">
      ⏳ Verification Pending
    </h2>
    <p className="text-blue-800 mb-4">
      Your profile has been submitted for verification. Our admin team will review 
      your information and driver's license shortly.
    </p>
    <p className="text-blue-700 text-sm">
      You will be able to accept rides once your verification is approved.
    </p>
    
    {/* Show profile summary but no available rides */}
    <div className="mt-4 p-4 bg-white rounded border">
      <h3 className="font-semibold mb-2">Your Submitted Information:</h3>
      <ProfileSummary driver={driver} />
    </div>
  </div>
)}
```

### Stage 2C: Verification Rejected

**Condition**: `driver.is_verification_rejected`

**UI to Display**:

```tsx
{driver.is_verification_rejected && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-6">
    <h2 className="text-xl font-bold text-red-900 mb-4">
      ❌ Verification Rejected
    </h2>
    <p className="text-red-800 mb-4">
      Unfortunately, your verification was rejected by our admin team.
    </p>
    
    {/* Show rejection reason */}
    {driver.rejection_reason && (
      <div className="bg-red-100 border border-red-300 rounded p-4 mb-4">
        <p className="font-semibold text-red-900">Reason:</p>
        <p className="text-red-800">{driver.rejection_reason}</p>
      </div>
    )}
    
    <p className="text-red-700 mb-4">
      Please review the feedback above, update your information, and resubmit.
    </p>
    
    {/* Allow editing profile */}
    <ProfileEditForm driver={driver} />
    
    {/* Resubmit button */}
    {driver.is_profile_ready && (
      <button
        onClick={handleResubmitVerification}
        className="mt-4 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 font-semibold"
      >
        Resubmit for Verification
      </button>
    )}
  </div>
)}
```

### Stage 3: Verified & Active

**Condition**: `driver.is_verified`

**UI to Display**:

```tsx
{driver.is_verified && (
  <>
    {/* Success banner */}
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-3">
        <span className="text-3xl">✅</span>
        <div>
          <h3 className="font-bold text-green-900">Verified Driver</h3>
          <p className="text-green-700 text-sm">
            You're approved! You can now accept ride requests.
          </p>
        </div>
      </div>
    </div>
    
    {/* Available Rides Section */}
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">
        Available Rides ({availableBookings.length})
      </h2>
      
      {availableBookings.length === 0 ? (
        <p className="text-gray-500">No available rides at the moment. Check back soon!</p>
      ) : (
        <div className="space-y-4">
          {availableBookings.map(booking => (
            <RideCard 
              key={booking.id} 
              booking={booking}
              onAccept={() => handleAcceptRide(booking.id)}
            />
          ))}
        </div>
      )}
    </div>
  </>
)}
```

---

## 🔄 Complete Flow Diagram

```
Driver Logs In
       ↓
┌──────────────────────────────────────────────┐
│  STAGE 1: Profile Incomplete                 │
│  • Show "Complete Profile" notice            │
│  • Display checklist of required fields      │
│  • Show profile form                         │
│  • NO available rides shown                  │
└──────────────────┬───────────────────────────┘
                   │ (All fields filled)
                   ↓
┌──────────────────────────────────────────────┐
│  STAGE 2A: Ready to Submit                   │
│  • Show "Profile Complete!" success          │
│  • Display "Submit for Verification" button  │
│  • NO available rides shown                  │
└──────────────────┬───────────────────────────┘
                   │ (User clicks Submit)
                   ↓
┌──────────────────────────────────────────────┐
│  STAGE 2B: Pending Verification              │
│  • Show "⏳ Verification Pending" notice     │
│  • Display submitted info summary            │
│  • NO available rides shown                  │
│  • Wait for admin approval                   │
└──────────────────┬───────────────────────────┘
                   │
         ┌─────────┴──────────┐
         │                    │
    (Approved)           (Rejected)
         │                    │
         ↓                    ↓
┌────────────────┐  ┌──────────────────────────┐
│  STAGE 3:      │  │  STAGE 2C: Rejected      │
│  Verified!     │  │  • Show rejection reason │
│  • Show ✅     │  │  • Allow editing profile │
│  • Display     │  │  • Show "Resubmit" btn   │
│    available   │  │  • NO available rides    │
│    rides       │  └────────┬─────────────────┘
│  • Can accept  │           │ (Resubmit)
│    rides       │           ↓
└────────────────┘   (Back to Stage 2B)
```

---

## 🛠️ API Endpoints for Frontend

### Profile Management

```typescript
// Update profile
PATCH /driver/profile
{
  name: string,
  age: number,
  phone: string,
  address: string
}

// Upload avatar
POST /driver/profile/avatar
FormData: { avatar: File }

// Upload license front
POST /driver/profile/license-front
FormData: { license_front: File }

// Upload license back
POST /driver/profile/license-back
FormData: { license_back: File }
```

### Verification Submission

```typescript
// Submit for verification
POST /driver/profile/submit-verification
// No body needed

// Resubmit after rejection
POST /driver/profile/resubmit-verification
// No body needed
```

### Ride Management (Only works if verified)

```typescript
// Accept a ride
POST /driver/bookings/{bookingId}/accept
// Protected by 'verified' middleware

// Update ride status
PATCH /driver/bookings/{bookingId}/status
{
  status: 'in_progress' | 'completed' | 'cancelled'
}
// Protected by 'verified' middleware
```

---

## ✅ Testing Checklist

### As New Driver

1. [ ] Login → See "Complete Profile" notice
2. [ ] Try to access available rides → Should see empty list
3. [ ] Fill all profile fields
4. [ ] Upload avatar
5. [ ] Upload license (front & back)
6. [ ] See "Submit for Verification" button appear
7. [ ] Click submit
8. [ ] See "Verification Pending" message
9. [ ] Available rides still hidden

### As Admin

1. [ ] Login to admin dashboard
2. [ ] See pending verification count
3. [ ] Navigate to verifications page
4. [ ] See driver profile and license images
5. [ ] Approve driver

### As Verified Driver

1. [ ] Login after approval
2. [ ] See "✅ Verified Driver" badge
3. [ ] See available rides list
4. [ ] Can accept rides
5. [ ] Can update ride status

### Rejection Flow

1. [ ] Admin rejects with reason
2. [ ] Driver sees rejection message
3. [ ] Driver can edit profile
4. [ ] Driver resubmits
5. [ ] Status back to pending

---

## 🎨 Component Examples

### CheckItem Component

```tsx
const CheckItem = ({ completed, label }: { completed: boolean; label: string }) => (
  <div className="flex items-center gap-3">
    {completed ? (
      <span className="text-green-600">✓</span>
    ) : (
      <span className="text-gray-400">○</span>
    )}
    <span className={completed ? 'text-green-800' : 'text-gray-600'}>
      {label}
    </span>
  </div>
);
```

### Handle Submit Verification

```tsx
const handleSubmitVerification = async () => {
  try {
    await router.post('/driver/profile/submit-verification');
    // Page will reload with updated status
  } catch (error) {
    alert('Failed to submit verification');
  }
};
```

### Handle Resubmit

```tsx
const handleResubmitVerification = async () => {
  try {
    await router.post('/driver/profile/resubmit-verification');
    // Page will reload with updated status
  } catch (error) {
    alert('Failed to resubmit verification');
  }
};
```

---

## 📊 Status Summary

| Backend | Status |
|---------|--------|
| Available rides hidden until verified | ✅ Complete |
| Verification status flags | ✅ Complete |
| Profile completion check | ✅ Complete |
| Middleware protection | ✅ Complete |

| Frontend | Status |
|----------|--------|
| Profile completion form | ⏳ Needs implementation |
| Verification status display | ⏳ Needs implementation |
| Available rides conditional display | ⏳ Needs implementation |

---

## 🚀 Summary

**Backend is now correctly configured** to:

1. ✅ Hide available rides from unverified drivers
2. ✅ Provide all necessary status flags to frontend
3. ✅ Protect ride acceptance with verification check

**Frontend needs to implement** the UI for each stage based on the verification status flags provided by the backend.

---

*Updated: November 9, 2025*  
*Backend Status: ✅ Complete*  
*Frontend Status: ⏳ Needs Implementation*

