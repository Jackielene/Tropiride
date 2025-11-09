<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone',
        'age',
        'address',
        'avatar',
        'role',
        'profile_completed',
        'verification_status',
        'driver_license_front',
        'driver_license_back',
        'verified_at',
        'verified_by',
        'rejection_reason',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'avatar_url',
        'driver_license_front_url',
        'driver_license_back_url',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'profile_completed' => 'boolean',
            'verified_at' => 'datetime',
        ];
    }

    /**
     * Get the user's avatar URL.
     */
    public function getAvatarUrlAttribute(): string
    {
        if ($this->avatar) {
            // Use asset() helper which works with the storage symlink
            return asset('storage/' . $this->avatar);
        }
        
        // Return default avatar or generate initials
        return $this->getDefaultAvatar();
    }

    /**
     * Get default avatar based on user initials.
     */
    public function getDefaultAvatar(): string
    {
        $initials = collect(explode(' ', $this->name))
            ->map(fn($word) => strtoupper(substr($word, 0, 1)))
            ->take(2)
            ->join('');
            
        return "https://ui-avatars.com/api/?name={$initials}&background=0ea5e9&color=ffffff&size=128";
    }

    /**
     * Get the bookings for the user.
     */
    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Check if user is a customer.
     */
    public function isCustomer(): bool
    {
        return $this->role === 'customer';
    }

    /**
     * Check if user is a driver.
     */
    public function isDriver(): bool
    {
        return $this->role === 'driver';
    }

    /**
     * Check if user is an admin.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user has completed their profile.
     */
    public function hasCompletedProfile(): bool
    {
        return $this->profile_completed === true;
    }

    /**
     * Check if user is verified (approved by admin).
     */
    public function isVerified(): bool
    {
        return $this->verification_status === 'approved';
    }

    /**
     * Check if user's verification is pending.
     */
    public function isVerificationPending(): bool
    {
        return $this->verification_status === 'pending';
    }

    /**
     * Check if user's verification was rejected.
     */
    public function isVerificationRejected(): bool
    {
        return $this->verification_status === 'rejected';
    }

    /**
     * Check if profile is ready for verification.
     * Profile is ready if all required fields are filled.
     */
    public function isProfileReadyForVerification(): bool
    {
        return !empty($this->name) &&
               !empty($this->email) &&
               !empty($this->phone) &&
               $this->age !== null && $this->age >= 18 &&
               !empty($this->address) &&
               !empty($this->avatar) &&
               !empty($this->driver_license_front) &&
               !empty($this->driver_license_back);
    }

    /**
     * Get the URL for driver license front.
     */
    public function getDriverLicenseFrontUrlAttribute(): ?string
    {
        if ($this->driver_license_front) {
            return asset('storage/' . $this->driver_license_front);
        }
        return null;
    }

    /**
     * Get the URL for driver license back.
     */
    public function getDriverLicenseBackUrlAttribute(): ?string
    {
        if ($this->driver_license_back) {
            return asset('storage/' . $this->driver_license_back);
        }
        return null;
    }

    /**
     * Mark profile as completed and ready for verification.
     */
    public function markProfileAsCompleted(): void
    {
        $this->profile_completed = true;
        $this->verification_status = 'pending';
        $this->save();
    }

    /**
     * Approve user verification.
     */
    public function approveVerification(?int $adminId = null): void
    {
        $this->verification_status = 'approved';
        $this->verified_at = now();
        $this->verified_by = $adminId;
        $this->rejection_reason = null;
        $this->save();
    }

    /**
     * Reject user verification.
     */
    public function rejectVerification(string $reason, ?int $adminId = null): void
    {
        $this->verification_status = 'rejected';
        $this->verified_at = null;
        $this->verified_by = $adminId;
        $this->rejection_reason = $reason;
        $this->save();
    }

    /**
     * Get the admin who verified this user.
     */
    public function verifier()
    {
        return $this->belongsTo(User::class, 'verified_by');
    }
}
