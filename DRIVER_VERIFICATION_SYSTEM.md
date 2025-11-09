# Driver Verification System Documentation

## Overview

The Driver Verification System ensures that drivers complete their profile information and get admin approval before they can accept rides. This adds a security layer to verify driver identities through driver's license verification.

---

## 🔐 How It Works

### For Drivers

1. **Registration**: Drivers register with basic information (name, email, password, role='driver')
2. **Login**: After login, they're redirected to driver dashboard
3. **Profile Completion Required**: Before accepting rides, they must complete:
   - Full name
   - Age (must be 18+)
   - Address
   - Phone number
   - Email (already captured during registration)
   - Profile picture
   - Driver's license front image
   - Driver's license back image

4. **Submit for Verification**: Once all fields are filled, they submit their profile for admin review
5. **Wait for Approval**: Status changes to "pending" - they can see available rides but cannot accept them
6. **Get Verified**: Admin reviews and approves/rejects
   - **Approved**: Can now accept rides and earn money
   - **Rejected**: Receives feedback, can update profile and resubmit

### For Customers

- **NO verification required** - Customers can book rides immediately after registration
- Customers can freely use all booking features without admin approval

### For Admins

1. **Dashboard Alert**: See pending driver verifications count on admin dashboard
2. **Review Requests**: Navigate to `/admin/verifications` to see all pending verification requests
3. **View Details**: Click on a driver to see their full profile and driver's license images
4. **Take Action**:
   - **Approve**: Driver gets full access to accept rides
   - **Reject**: Provide reason, driver must fix issues and resubmit
   - **Revoke**: Remove verification from already-approved drivers (if needed)

---

## 📁 Database Schema

### New Fields in `users` Table

| Field | Type | Description |
|-------|------|-------------|
| `profile_completed` | boolean | Whether driver filled all required fields |
| `verification_status` | enum | Status: `pending`, `approved`, `rejected` |
| `driver_license_front` | string | Path to front image of driver's license |
| `driver_license_back` | string | Path to back image of driver's license |
| `verified_at` | timestamp | When admin approved the driver |
| `verified_by` | bigint | ID of admin who verified |
| `rejection_reason` | text | Reason if rejected |

---

## 🛣️ Routes

### Driver Routes (Profile Management)

```php
// Driver dashboard (no verification required - to complete profile)
GET  /driver/dashboard

// Profile management (no verification required)
PATCH /driver/profile
POST /driver/profile/avatar
POST /driver/profile/license-front
POST /driver/profile/license-back
POST /driver/profile/submit-verification
POST /driver/profile/resubmit-verification

// These routes REQUIRE verification
POST /driver/bookings/{id}/accept        // Accept a ride
PATCH /driver/bookings/{id}/status       // Update ride status
```

### Customer Routes (No Verification Required)

```php
GET  /tropiride/vehicles          // Browse vehicles
GET  /tropiride/booking           // Booking page
POST /tropiride/ride-request      // Request a ride
GET  /tropiride/bookings          // View bookings
POST /tropiride/bookings/{id}/cancel // Cancel booking
```

### Admin Routes (Verification Management)

```php
GET  /admin/verifications                    // List all verification requests
GET  /admin/verifications/{userId}           // View specific driver details
POST /admin/verifications/{userId}/approve   // Approve driver
POST /admin/verifications/{userId}/reject    // Reject with reason
POST /admin/verifications/{userId}/revoke    // Revoke existing verification
```

---

## 🔧 Backend Components

### 1. **User Model** (`app/Models/User.php`)

New helper methods:

```php
// Check profile status
$user->hasCompletedProfile()           // true if all fields filled
$user->isProfileReadyForVerification() // true if ready to submit

// Check verification status
$user->isVerified()                    // true if approved
$user->isVerificationPending()         // true if waiting for admin
$user->isVerificationRejected()        // true if rejected

// Admin actions
$user->markProfileAsCompleted()        // Mark as ready for review
$user->approveVerification($adminId)   // Approve driver
$user->rejectVerification($reason, $adminId) // Reject with reason

// Get URLs
$user->driver_license_front_url        // Full URL to license front
$user->driver_license_back_url         // Full URL to license back
```

### 2. **Middleware**

#### `EnsureProfileCompleted` (`profile.completed`)
- **Applies to**: Drivers only
- **Bypasses**: Customers and admins
- Redirects to driver dashboard if profile not completed
- Allows access to dashboard and settings pages

#### `EnsureVerified` (`verified`)
- **Applies to**: Drivers only
- **Bypasses**: Customers and admins
- Blocks unverified drivers from accepting rides
- Shows appropriate message based on verification status:
  - Pending: "Waiting for admin approval"
  - Rejected: "Please review feedback and resubmit"

### 3. **Controllers**

#### `DriverProfileController` (NEW)
Methods for driver profile management:
- `update()` - Update driver profile information
- `updateAvatar()` - Upload profile picture
- `uploadLicenseFront()` - Upload front of driver's license
- `uploadLicenseBack()` - Upload back of driver's license
- `submitForVerification()` - Submit complete profile for review
- `resubmitVerification()` - Resubmit after rejection

#### `DriverDashboardController` (Updated)
Now includes driver verification status in response:
- `profile_completed` - Boolean
- `verification_status` - String (pending/approved/rejected)
- `driver_license_front_url` - String
- `driver_license_back_url` - String
- `rejection_reason` - String (if rejected)
- `is_verified` - Boolean

#### `VerificationController`
- `index()` - List all pending/approved/rejected drivers
- `show($userId)` - View specific driver's verification details
- `approve($userId)` - Approve a driver's verification
- `reject($userId)` - Reject with reason
- `revoke($userId)` - Revoke an existing verification

#### `AdminDashboardController` (Updated)
Includes verification statistics:
- `pendingVerifications` - Count of pending driver requests
- `approvedVerifications` - Count of approved drivers
- `rejectedVerifications` - Count of rejected drivers

---

## 🎨 User Experience Flow

### Driver Experience

```
Register as Driver
       ↓
Login → Driver Dashboard
       ↓
See "Complete Profile" notice
       ↓
Fill all required fields:
- Name, age, phone, address
- Profile picture
- License (front & back)
       ↓
Submit for Verification
       ↓
Status: PENDING
- Can see available rides
- CANNOT accept rides yet
       ↓
Wait for admin review
       ↓
   ┌────┴────┐
   ↓         ↓
APPROVED  REJECTED
   ↓         ↓
✅ Can    Update info
accept    & resubmit
rides        ↓
           Back to
           PENDING
```

### Customer Experience

```
Register as Customer
       ↓
Login → Tropiride Landing
       ↓
✅ Can immediately:
- Browse vehicles
- Book rides
- View bookings
- Cancel bookings

NO verification required!
```

---

## 🚀 Testing Guide

### Test as Driver

1. **Register** a new driver account (role='driver')
2. **Login** - redirected to driver dashboard
3. See "Complete your profile" notice
4. Try to accept a ride - should be blocked
5. **Complete profile**:
   - Fill name, age (18+), address, phone
   - Upload profile picture
   - Upload driver's license (front)
   - Upload driver's license (back)
6. **Submit for verification** - status changes to "pending"
7. Try to accept a ride - still blocked with "Waiting for approval" message
8. **Admin approves** → Now can accept rides ✅

### Test as Customer

1. **Register** customer account (role='customer')
2. **Login** - redirected to Tropiride landing
3. **Book a ride** immediately - no verification needed ✅
4. Complete booking flow successfully

### Test as Admin

1. **Login** as admin
2. **Dashboard** shows "X Pending Verifications"
3. Navigate to `/admin/verifications`
4. See pending driver in the list
5. Click to view details (see profile + license images)
6. **Approve** the driver
7. Driver can now accept rides ✅

### Test Rejection Flow

1. As admin, **reject** a driver with reason: "License image is unclear"
2. Logout and login as that driver
3. Dashboard shows rejection reason
4. Update license images
5. Click "Resubmit for Verification"
6. Status back to "pending"
7. Admin reviews again

---

## 🔒 Security Features

1. **Role-Based Protection**: Only drivers need verification, customers bypass
2. **Middleware Protection**: Driver ride acceptance protected by `verified` middleware
3. **File Validation**: License uploads validated (image/pdf, max 5MB)
4. **Admin-Only Actions**: Only admins can approve/reject/revoke
5. **Audit Trail**: Tracks who verified (admin ID) and when
6. **Reason Logging**: All rejections require and store reasons
7. **Age Validation**: Drivers must be 18+ years old

---

## 📊 Quick Reference

### Who Needs Verification?

| Role | Verification Required? | Why? |
|------|----------------------|------|
| **Driver** | ✅ YES | Must verify identity and license before accepting rides |
| **Customer** | ❌ NO | Can book rides immediately |
| **Admin** | ❌ NO | Full access always |

### What Can Unverified Drivers Do?

- ✅ Login and access dashboard
- ✅ View available rides
- ✅ Complete their profile
- ✅ Upload documents
- ❌ Accept rides
- ❌ Update ride status

### What Can Verified Drivers Do?

- ✅ Everything above, PLUS:
- ✅ Accept available rides
- ✅ Update ride status (in progress, completed, etc.)
- ✅ Earn money from completed rides

---

## 🐛 Troubleshooting

### Issue: Driver can't accept rides after approval
**Solution:**
1. Check database: `SELECT verification_status FROM users WHERE id = [DRIVER_ID]`
2. Should be `'approved'`
3. Clear browser cache
4. Logout and login again

### Issue: License images not displaying
**Solution:**
```bash
php artisan storage:link
```
Verify symlink exists: `public/storage → ../storage/app/public`

### Issue: Middleware not working
**Solution:**
Check `bootstrap/app.php` has middleware aliases:
```php
'verified' => EnsureVerified::class,
```

---

## ✅ Implementation Checklist

### Backend ✅ (Complete)
- [x] Database migration
- [x] User model with helper methods
- [x] `EnsureProfileCompleted` middleware (driver-only)
- [x] `EnsureVerified` middleware (driver-only)
- [x] `DriverProfileController` for profile/license management
- [x] `VerificationController` for admin verification
- [x] `DriverDashboardController` updated with verification status
- [x] Routes configured (driver routes protected, customer routes open)
- [x] Middleware registered

### Frontend ⏳ (Pending)
- [ ] Driver dashboard profile completion UI
- [ ] License upload components
- [ ] Verification status display
- [ ] Submit/resubmit buttons
- [ ] Admin verifications page
- [ ] Approve/reject modals
- [ ] Admin dashboard verification card

---

## 📝 Summary

The **Driver Verification System** is now fully implemented on the backend:

✅ **Drivers** must verify before accepting rides  
✅ **Customers** can book rides freely without verification  
✅ **Admins** can review and approve/reject driver verifications

**Backend: 100% Complete**  
**Frontend: Needs implementation (see FRONTEND_IMPLEMENTATION_GUIDE.md)**

---

*Updated for Driver Verification - November 9, 2025*

