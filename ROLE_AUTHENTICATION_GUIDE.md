# Role-Based Authentication & Routing Guide

## 🎯 How It Works

Your application has **3 user roles**, and each role is directed to different areas:

### 1. **Admin Role** (`role = 'admin'`)
- **Login Redirect:** `/admin/dashboard`
- **Access:** Admin dashboard with user & booking management
- **Middleware:** `auth`, `admin`

### 2. **Customer Role** (`role = 'customer'`)
- **Login Redirect:** `/tropiride` (Tropiride landing page)
- **Access:** Tropiride frontend, booking system
- **Middleware:** `auth`, `customer` (only for protected routes like profile, booking)

### 3. **Driver Role** (`role = 'driver'`)
- **Login Redirect:** `/driver/dashboard`
- **Access:** Driver dashboard with ride management, earnings tracking
- **Middleware:** `auth`, `driver`

---

## 🔍 Debug Your Customer Account

### Step 1: Check Your Role
Visit this URL while logged in as customer:
```
http://your-domain.test/debug/role
```

**Expected Output:**
```json
{
  "authenticated": true,
  "user_id": 2,
  "user_name": "sample test three",
  "user_email": "sample.three@example.com",
  "user_role": "customer",
  "is_customer": true,
  "is_admin": false,
  "is_driver": false,
  "can_access_tropiride_landing": true,
  "can_access_admin_dashboard": false,
  "expected_redirect": "tropiride.landing"
}
```

**If you see something different:**
- If `user_role` is NOT `"customer"`, your role is wrong
- If `is_customer` is `false`, the role check isn't working

---

## 🚧 Common Issues & Solutions

### Issue 1: "Access Denied" or 403 Error

**Symptom:** Customer sees "Access denied. This area is only accessible to customers."

**Cause:** The customer role is not set correctly in the database.

**Solution:**
```bash
php artisan tinker
```
```php
$user = User::where('email', 'your-customer-email@example.com')->first();
echo "Current role: " . $user->role . "\n";

// If role is NULL or wrong, fix it:
$user->role = 'customer';
$user->save();
echo "Role updated to: " . $user->role . "\n";
exit;
```

---

### Issue 2: Customer Can't Access Tropiride Pages

**Public Routes (NO authentication required):**
- ✅ `/tropiride` - Landing page
- ✅ `/tropiride/about` - About page
- ✅ `/tropiride/contact` - Contact page
- ✅ `/tropiride/faq` - FAQ page
- ✅ `/tropiride/vehicles` - Vehicle catalog

**Protected Routes (Requires `auth` + `customer` role):**
- 🔒 `/tropiride/profile` - Customer profile
- 🔒 `/tropiride/booking` - Make a booking
- 🔒 `/tropiride/bookings` - View bookings
- 🔒 `/tropiride/ride-request` - Create booking (POST)

**If customer can't access protected routes:**
1. Make sure they're logged in
2. Check their role is `'customer'` (use `/debug/role`)
3. Check browser console for JavaScript errors

---

### Issue 3: Customer Sees Admin Dashboard

**Symptom:** Customer sees admin sidebar or dashboard after login.

**Cause:** The user's role is set to `'admin'` instead of `'customer'`.

**Solution:** Change the role in database (see Issue 1 solution).

---

### Issue 4: Redirect Loop or Wrong Page After Login

**How Login Redirect Works:**
The `AuthenticatedSessionController` checks the user's role and redirects:

```php
// Admin user → /admin/dashboard
if ($user->isAdmin()) {
    return redirect()->route('admin.dashboard');
}

// Customer user → /tropiride
if ($user->isCustomer()) {
    return redirect()->route('tropiride.landing');
}
```

**If redirecting to wrong page:**
1. Check user role with `/debug/role`
2. Clear browser cookies and cache
3. Log out and log back in

---

## 📊 User Role Database Check

Run this to check all users and their roles:

```bash
php artisan tinker
```

```php
User::all()->each(function($user) {
    echo "ID: {$user->id} | Email: {$user->email} | Role: " . ($user->role ?? 'NULL') . " | Created: {$user->created_at}\n";
});
```

**Expected output:**
```
ID: 1 | Email: admin@example.com | Role: admin | Created: 2025-...
ID: 2 | Email: sample.three@example.com | Role: customer | Created: 2025-...
```

---

## 🔧 Fix Customer Role in Database

If your customer account has no role or wrong role:

### Option 1: Using Tinker (Recommended)
```bash
php artisan tinker
```
```php
// Find by email
$customer = User::where('email', 'customer@example.com')->first();

// Or find by ID
$customer = User::find(2);

// Set role
$customer->role = 'customer';
$customer->save();

echo "✓ Customer role updated!\n";
exit;
```

### Option 2: Direct Database Query
```bash
php artisan tinker
```
```php
DB::table('users')
    ->where('email', 'customer@example.com')
    ->update(['role' => 'customer']);

echo "✓ Role updated!\n";
exit;
```

---

## 🛣️ Route Access Matrix

| Route | Public | Customer | Admin |
|-------|--------|----------|-------|
| `/` | ✅ | ✅ → Redirects | ✅ → Redirects |
| `/login` | ✅ | ❌ (redirected) | ❌ (redirected) |
| `/register` | ✅ | ❌ (redirected) | ❌ (redirected) |
| `/tropiride` | ✅ | ✅ | ✅ |
| `/tropiride/about` | ✅ | ✅ | ✅ |
| `/tropiride/vehicles` | ✅ | ✅ | ✅ |
| `/tropiride/profile` | ❌ | ✅ | ❌ |
| `/tropiride/booking` | ❌ | ✅ | ❌ |
| `/tropiride/bookings` | ❌ | ✅ | ❌ |
| `/admin/dashboard` | ❌ | ❌ | ✅ |
| `/settings/profile` | ❌ | ✅ | ✅ |

---

## ✅ Verification Checklist

After logging in as a customer, verify:

- [ ] I can access `/tropiride` (landing page)
- [ ] I can access `/tropiride/vehicles` (vehicle catalog)
- [ ] I can access `/tropiride/booking` (make booking)
- [ ] I can access `/tropiride/bookings` (view my bookings)
- [ ] I can access `/tropiride/profile` (my profile)
- [ ] I CANNOT access `/admin/dashboard` (should get 403 error)
- [ ] `/debug/role` shows `"is_customer": true`

---

## 🆘 Still Having Issues?

### Step-by-Step Debugging:

1. **Log out completely**
   - Click logout button
   - Clear browser cookies
   - Close all browser tabs

2. **Check the database**
   ```bash
   php artisan tinker
   ```
   ```php
   $user = User::where('email', 'your-email@example.com')->first();
   dd([
       'id' => $user->id,
       'email' => $user->email,
       'role' => $user->role,
       'isCustomer' => $user->isCustomer(),
   ]);
   ```

3. **Fix the role if needed**
   ```php
   $user->role = 'customer';
   $user->save();
   ```

4. **Log in again**
   - Use the customer credentials
   - Should redirect to `/tropiride`

5. **Test access**
   - Visit `/debug/role` to confirm role
   - Try accessing `/tropiride/booking`
   - Check browser console (F12) for errors

6. **Check Laravel logs**
   ```bash
   tail -f storage/logs/laravel.log
   ```
   Look for any errors when accessing routes

---

## 🎯 Quick Test Commands

```bash
# Check all users and roles
php artisan tinker --execute="User::all()->each(fn(\$u) => print(\$u->email . ' => ' . (\$u->role ?? 'NULL') . PHP_EOL));"

# Set a user as customer
php artisan tinker --execute="\$u = User::find(2); \$u->role = 'customer'; \$u->save(); echo 'Role set to customer';"

# Set a user as admin
php artisan tinker --execute="\$u = User::find(1); \$u->role = 'admin'; \$u->save(); echo 'Role set to admin';"
```

---

## 📝 Summary

**The authentication system is working correctly IF:**
1. Customer role is set to `'customer'` in database
2. After login, customer is redirected to `/tropiride`
3. Customer can access public Tropiride pages
4. Customer can access protected routes (booking, profile)
5. Customer CANNOT access admin dashboard (gets 403)

**Most common issue:** The user's `role` field in the database is `NULL` or set to wrong value.

**Quick fix:** Set the role to `'customer'` using Tinker (see above).

