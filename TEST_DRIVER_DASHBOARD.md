# Testing Driver Dashboard Profile Section

## Quick Test Steps

### 1. Check Driver Data
Visit: `http://your-domain.test/driver/debug`

Expected output (if profile is incomplete):
```json
{
  "profile_completed": false,
  "verification_status": "pending",
  "is_verified": false,
  "has_completed_profile": false,
  "is_verification_pending": false,
  "is_verification_rejected": false,
  "phone": null,
  "age": null,
  "address": null,
  "driver_license_front": null,
  "driver_license_back": null
}
```

### 2. What Should Appear on Dashboard

If `is_verified` is `false`, you should see:

**Yellow Card with:**
- Title: "⚠️ Complete Your Profile"
- Checklist showing what's missing
- Form with fields for Name, Age, Phone, Address
- Upload sections for Profile Picture and License
- "Save Profile" button

### 3. Common Issues

#### Issue: Nothing shows
**Cause:** Browser cache
**Fix:** 
- Press `Ctrl + Shift + R` to hard refresh
- Or clear cache and reload

#### Issue: Old dashboard shows
**Cause:** Old build is cached
**Fix:**
```bash
npm run build
php artisan route:clear
php artisan config:clear
```

#### Issue: Profile section not visible
**Cause:** Driver might already be verified
**Fix:** Check `/driver/debug` - if `is_verified: true`, then profile section won't show (it only shows for unverified drivers)

### 4. What to Check

1. **Browser Console (F12)** - Any errors?
2. **Network Tab** - Is `/driver/dashboard` loading?
3. **Response Data** - Does it include driver verification fields?

### 5. Manual Check

Look at the page source:
1. Right-click → View Page Source
2. Search for `profile_completed`
3. If found, the data is there but UI might not be rendering

### 6. Force Show Profile Section

Temporarily, you can test by editing the TypeScript condition.

In `dashboard.tsx`, find:
```tsx
{!driver.is_verified && (
```

And temporarily change to:
```tsx
{true && (
```

This will force show the profile section regardless of verification status (for testing only).

---

## Checklist

- [ ] Logged in as driver account
- [ ] Visited `/driver/debug` - saw JSON data
- [ ] Hard refreshed browser (`Ctrl + Shift + R`)
- [ ] Opened Console (F12) - checked for errors
- [ ] Dashboard page loads successfully
- [ ] Profile section appears (yellow card)

---

## What Data to Share

If still not working, please share:
1. Output from `/driver/debug`
2. Any console errors
3. Screenshot of what you see on dashboard

