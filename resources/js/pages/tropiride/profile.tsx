"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect, useCallback } from "react"
import {
  FaUser,
  FaEdit,
  FaCamera,
  FaSave,
  FaTimes,
  FaHistory,
  FaStar,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaCar,
  FaRoute,
  FaClock,
  FaSpinner,
  FaCheckCircle,
  FaCheck,
  FaTimesCircle,
  FaBan,
  FaUsers,
} from "react-icons/fa"
import { usePage, Link } from "@inertiajs/react"
import { Form } from "@inertiajs/react"
import TropirideNavbar from "@/components/tropiride/TropirideNavbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import ErrorBoundary from "@/components/ErrorBoundary"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SharedData, Booking } from "@/types"
import ProfileUpdateForm from "@/components/profile/ProfileUpdateForm"
import { router } from "@inertiajs/react"
import InputError from "@/components/input-error"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function TropirideProfile() {
  const { auth, flash, bookings = [] } = usePage<SharedData>().props;
  const user = auth.user;

  const [isEditing, setIsEditing] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [cancellingBookingId, setCancellingBookingId] = useState<number | null>(null)
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [bookingToCancel, setBookingToCancel] = useState<number | null>(null)

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    age: user?.age?.toString() || "",
    address: user?.address || "",
  })

  // Calculate avatar URL outside of JSX to prevent React errors
  const getAvatarUrl = () => {
    if (!user?.avatar_url) {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&background=0ea5e9&color=ffffff&size=128`;
    }
    // Add cache busting parameter with timestamp
    const separator = user.avatar_url.includes('?') ? '&' : '?';
    return `${user.avatar_url}${separator}t=${Date.now()}`;
  }
  
  // Memoize the callback to prevent unnecessary re-renders
  const handleProfileDataChange = useCallback((data: typeof profileData) => {
    setProfileData(prevData => {
      // Only update if data actually changed to prevent unnecessary re-renders
      if (
        prevData.name !== data.name ||
        prevData.email !== data.email ||
        prevData.phone !== data.phone ||
        prevData.age !== data.age ||
        prevData.address !== data.address
      ) {
        return data;
      }
      return prevData;
    });
  }, []);

  // Update profileData when user data changes (only when not editing to prevent loops)
  useEffect(() => {
    if (!isEditing && user) {
      const newData = {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        age: user?.age?.toString() || "",
        address: user?.address || "",
      };
      
      // Only update if the values actually changed
      setProfileData(prevData => {
        if (
          prevData.name !== newData.name ||
          prevData.email !== newData.email ||
          prevData.phone !== newData.phone ||
          prevData.age !== newData.age ||
          prevData.address !== newData.address
        ) {
          return newData;
        }
        return prevData;
      });
    }
  }, [user?.name, user?.email, user?.phone, user?.age, user?.address, isEditing]);

  const handleSave = () => {
    setIsSaving(true);
    setErrors({});
    
    // Prepare the data to send - ensure all fields are included
    const saveData = {
      name: profileData.name || '',
      email: profileData.email || '',
      phone: (profileData.phone && profileData.phone.trim()) ? profileData.phone.trim() : null,
      age: (profileData.age && profileData.age.toString().trim()) ? parseInt(profileData.age.toString()) : null,
      address: (profileData.address && profileData.address.trim()) ? profileData.address.trim() : null,
    };
    
    // Debug: Log the data being sent
    console.log('Saving profile data:', saveData);
    console.log('Current profileData:', profileData);
    console.log('Phone type:', typeof profileData.phone, 'value:', profileData.phone);
    console.log('Age type:', typeof profileData.age, 'value:', profileData.age);
    console.log('Address type:', typeof profileData.address, 'value:', profileData.address);
    
    // Use the dedicated Tropiride profile update endpoint
    // Now saves all profile fields to database
    router.patch('/tropiride/profile', saveData, {
      onSuccess: () => {
        setIsEditing(false);
        setIsSaving(false);
        setErrors({});
        // The page will automatically refresh with updated data from the server
        // No need for manual redirect as the controller handles it
      },
      onError: (errorBag) => {
        console.error('Profile update failed:', errorBag);
        setIsSaving(false);
        
        // Set errors for display
        if (errorBag && typeof errorBag === 'object') {
          setErrors(errorBag as Record<string, string>);
        }
        
        // Don't revert local state on error - let user fix and try again
      },
      onFinish: () => {
        setIsSaving(false);
      }
    });
  }

  const handleCancel = () => {
    setProfileData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      age: user?.age?.toString() || "",
      address: user?.address || "",
    })
    setIsEditing(false)
    setErrors({})
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('Image size must be less than 2MB')
        setIsUploading(false)
        return
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file')
        setIsUploading(false)
        return
      }
      
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('avatar', file)
      
      console.log('Uploading avatar:', file.name, file.size, 'bytes')
      
      // Upload to server
      router.post('/tropiride/profile/avatar', formData, {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: (page) => {
          console.log('Avatar upload successful')
          console.log('Page props:', page.props)
          console.log('Auth user after upload:', page.props.auth?.user)
          setIsUploading(false)
          // Force a full page reload to ensure avatar data is refreshed
          // Use setTimeout to ensure the redirect completes first
          setTimeout(() => {
            router.reload({ only: ['auth'] })
          }, 100)
        },
        onError: (errors) => {
          console.error('Avatar upload failed:', errors)
          setIsUploading(false)
          if (errors.avatar) {
            alert(`Failed to upload avatar: ${Array.isArray(errors.avatar) ? errors.avatar[0] : errors.avatar}`)
          } else {
            alert('Failed to upload avatar. Please try again.')
          }
        },
        onFinish: () => {
          setIsUploading(false)
        }
      })
    }
  }

  const handleCancelBooking = (bookingId: number) => {
    setBookingToCancel(bookingId)
    setCancelDialogOpen(true)
  }

  const confirmCancelBooking = () => {
    if (!bookingToCancel) return
    
    setCancellingBookingId(bookingToCancel)
    setCancelDialogOpen(false)
    
    router.post(`/tropiride/bookings/${bookingToCancel}/cancel`, {}, {
      onSuccess: () => {
        setCancellingBookingId(null)
        setBookingToCancel(null)
        // Page will automatically refresh with updated booking status
      },
      onError: (errors) => {
        console.error('Cancel booking failed:', errors)
        setCancellingBookingId(null)
        setBookingToCancel(null)
        alert('Failed to cancel booking. Please try again.')
      },
      onFinish: () => {
        setCancellingBookingId(null)
      }
    })
  }

  const handleCancelDialogClose = (open: boolean) => {
    if (!open) {
      setCancelDialogOpen(false)
      if (!cancellingBookingId) {
        setBookingToCancel(null)
      }
    }
  }

  // Helper function to get status badge info
  const getStatusInfo = (status: string) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'pending':
        return {
          label: 'Pending',
          icon: FaSpinner,
          className: 'bg-yellow-50 text-yellow-700 border-yellow-300',
          iconClassName: 'text-yellow-600'
        };
      case 'confirmed':
        return {
          label: 'Confirmed',
          icon: FaCheckCircle,
          className: 'bg-blue-50 text-blue-700 border-blue-300',
          iconClassName: 'text-blue-600'
        };
      case 'in_progress':
        return {
          label: 'In Progress',
          icon: FaCar,
          className: 'bg-purple-50 text-purple-700 border-purple-300',
          iconClassName: 'text-purple-600'
        };
      case 'completed':
        return {
          label: 'Completed',
          icon: FaCheck,
          className: 'bg-green-50 text-green-700 border-green-300',
          iconClassName: 'text-green-600'
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          icon: FaTimesCircle,
          className: 'bg-red-50 text-red-700 border-red-300',
          iconClassName: 'text-red-600'
        };
      default:
        return {
          label: status.charAt(0).toUpperCase() + status.slice(1),
          icon: FaClock,
          className: 'bg-gray-50 text-gray-700 border-gray-300',
          iconClassName: 'text-gray-600'
        };
    }
  };

  // Transform bookings data for display
  const recentBookings = Array.isArray(bookings) ? (bookings as Booking[]).map((booking) => {
    try {
      const dateStr = booking.created_at || booking.requested_at;
      const date = dateStr ? new Date(dateStr) : new Date();
      const statusInfo = getStatusInfo(booking.status || 'pending');
      
      // Format pickup date and time
      let pickupDisplay = null;
      if (booking.pickup_date) {
        const pickupDate = new Date(booking.pickup_date);
        pickupDisplay = {
          date: booking.pickup_date,
          time: booking.pickup_time || null,
          formatted: booking.pickup_date ? new Date(booking.pickup_date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }) : null,
        };
      }
      
      // Format return date and time
      let returnDisplay = null;
      if (booking.return_date) {
        returnDisplay = {
          date: booking.return_date,
          time: booking.return_time || null,
          formatted: booking.return_date ? new Date(booking.return_date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          }) : null,
        };
      }
      
      return {
        id: booking.id,
        vehicle: booking.user_name || user?.name || "Ride Request",
        userName: booking.user_name || user?.name || 'Unknown',
        date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        status: booking.status || 'pending',
        statusInfo,
        price: Number(booking.estimated_fare) || 0,
        rating: 0,
        pickupLocation: booking.pickup_location || '',
        dropoffLocation: booking.dropoff_location || '',
        distance: Number(booking.distance_km) || 0,
        timeMinutes: Number(booking.estimated_time_minutes) || 0,
        pickupDate: pickupDisplay,
        returnDate: returnDisplay,
        vehicleType: booking.vehicle_type || null,
        passengers: booking.passengers || null,
      };
    } catch (error) {
      console.error('Error processing booking:', booking, error);
      return null;
    }
  }).filter(booking => booking !== null) : [];

  return (
    <>
      <TropirideNavbar />

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-cyan-50/30 to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <FaUser className="text-white text-xl" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                  My Profile
                </h1>
                <p className="text-gray-600 mt-1">Manage your account information and view your bookings</p>
              </div>
            </div>
            
            {/* Success Message */}
            {flash?.status && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 rounded-xl shadow-md"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                      <svg className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-emerald-800">{flash.status}</p>
                  </div>
                </div>
              </motion.div>
            )}
            {/* Error Message */}
            {flash?.error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl shadow-md"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center">
                      <FaTimesCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-semibold text-red-800">{flash.error}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-1"
            >
              <Card className="overflow-hidden shadow-xl border-0 bg-gradient-to-br from-white to-cyan-50/50">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center">
                    <div className="relative group">
                      <ErrorBoundary>
                        <Avatar className="w-32 h-32 border-4 border-cyan-200 shadow-lg">
                          <AvatarImage 
                            src={getAvatarUrl()}
                            alt={profileData.name}
                            className={isUploading ? "opacity-50" : ""}
                            key={`avatar-${user?.avatar || 'default'}-${user?.updated_at || Date.now()}`} // Force re-render when avatar changes
                            onError={(e) => {
                              console.error('Avatar load error:', e);
                              console.log('Avatar URL:', user?.avatar_url);
                              console.log('User avatar field:', user?.avatar);
                              console.log('Attempted src:', getAvatarUrl());
                            }}
                            onLoad={() => {
                              console.log('Avatar loaded successfully:', user?.avatar_url);
                            }}
                          />
                          <AvatarFallback className="text-3xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                            {profileData.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </ErrorBoundary>
                      {isUploading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-cyan-600/80 rounded-full">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                        </div>
                      )}
                      <label
                        htmlFor="profile-image-upload"
                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cyan-600/80 to-blue-600/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
                      >
                        <FaCamera className="text-white text-2xl" />
                      </label>
                      <input
                        id="profile-image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mt-4 text-center">{profileData.name}</h2>
                    <p className="text-gray-600 text-sm mt-1">{profileData.email}</p>
                    <Badge className="mt-3 bg-gradient-to-r from-cyan-500 to-blue-600">Verified Member</Badge>
                  </div>

                  <Separator className="my-6 bg-gradient-to-r from-transparent via-cyan-200 to-transparent" />

                  <div className="space-y-3">
                    <motion.div 
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border-2 border-cyan-100 shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                          <FaHistory className="text-white text-lg" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Total Rides</p>
                          <p className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                            {recentBookings.length}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-100 shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md">
                          <FaStar className="text-white text-lg" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Total Spent</p>
                          <p className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            ₱{recentBookings.reduce((sum, booking) => sum + (Number(booking.price) || 0), 0).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div 
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="flex items-center justify-between p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border-2 border-emerald-100 shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                          <FaCar className="text-white text-lg" />
                        </div>
                        <div>
                          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Member Since</p>
                          <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            {user?.created_at ? new Date(user.created_at).getFullYear() : '2024'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 space-y-6"
            >
              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-cyan-50/30">
                <CardHeader className="bg-gradient-to-r from-cyan-50/50 to-blue-50/50 border-b border-cyan-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-2">
                        <FaUser className="text-cyan-600" />
                        Account Information
                      </CardTitle>
                      <CardDescription className="mt-1">Your personal details and contact information</CardDescription>
                    </div>
                    {!isEditing ? (
                      <Button 
                        onClick={() => setIsEditing(true)} 
                        variant="outline" 
                        size="sm" 
                        className="gap-2 !border-2 !border-cyan-400 !text-cyan-700 hover:!bg-cyan-50 hover:!border-cyan-500 !bg-white hover:!text-cyan-800 font-semibold shadow-sm"
                      >
                        <FaEdit className="w-4 h-4 text-cyan-700" />
                        Edit
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          onClick={handleSave}
                          size="sm"
                          disabled={isSaving}
                          className="gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSaving ? (
                            <>
                              <FaSpinner className="w-4 h-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <FaSave className="w-4 h-4" />
                              Save
                            </>
                          )}
                        </Button>
                        <Button 
                          onClick={handleCancel} 
                          variant="outline" 
                          size="sm" 
                          className="gap-2 border-2 border-gray-300 hover:bg-gray-50"
                        >
                          <FaTimes className="w-4 h-4" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  {isEditing ? (
                    <div>
                      <ProfileUpdateForm
                        user={user}
                        profileData={profileData}
                        onDataChange={handleProfileDataChange}
                      />
                      {/* Display validation errors */}
                      {Object.keys(errors).length > 0 && (
                        <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                          <p className="text-sm font-semibold text-red-800 mb-2">Please fix the following errors:</p>
                          <ul className="list-disc list-inside space-y-1">
                            {Object.entries(errors).map(([field, message]) => (
                              <li key={field} className="text-sm text-red-700">
                                <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong> {message}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700 font-semibold">
                          <FaUser className="text-cyan-600" />
                          Full Name
                        </Label>
                        <div className="p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-100">
                          <p className="text-gray-900 font-medium">{profileData.name}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700 font-semibold">
                          <FaEnvelope className="text-cyan-600" />
                          Email Address
                        </Label>
                        <div className="p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-100">
                          <p className="text-gray-900 font-medium">{profileData.email}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700 font-semibold">
                          <FaPhone className="text-cyan-600" />
                          Phone Number
                        </Label>
                        <div className="p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-100">
                          <p className="text-gray-900 font-medium">{profileData.phone || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-gray-700 font-semibold">
                          <FaCalendarAlt className="text-cyan-600" />
                          Age
                        </Label>
                        <div className="p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-100">
                          <p className="text-gray-900 font-medium">{profileData.age || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label className="flex items-center gap-2 text-gray-700 font-semibold">
                          <FaMapMarkerAlt className="text-cyan-600" />
                          Address
                        </Label>
                        <div className="p-3 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg border border-cyan-100">
                          <p className="text-gray-900 font-medium">{profileData.address || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-lg border-0 bg-gradient-to-br from-white to-cyan-50/30">
                  <CardHeader className="bg-gradient-to-r from-cyan-50/50 to-blue-50/50 border-b border-cyan-100">
                  <CardTitle className="text-2xl flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                    <FaHistory className="text-cyan-600" />
                    My Bookings
                  </CardTitle>
                  <CardDescription className="mt-1">Your recent ride requests and bookings</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  {recentBookings.length > 0 ? (
                    <div className="space-y-4">
                      {recentBookings.map((booking, index) => (
                        <motion.div
                          key={booking.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="border-2 border-cyan-100 rounded-xl p-5 hover:shadow-xl transition-all bg-gradient-to-br from-white to-cyan-50/30 hover:border-cyan-200"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                                <FaUser className="text-cyan-600 text-sm" />
                                {booking.userName}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1 flex items-center gap-2">
                                <FaCalendarAlt className="text-cyan-600 text-xs" />
                                {booking.date} at {booking.time}
                              </p>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={`${booking.statusInfo.className} flex items-center gap-1.5 px-3 py-1.5 font-semibold`}
                            >
                              <booking.statusInfo.icon className={`text-xs ${booking.statusInfo.iconClassName} ${booking.status === 'pending' ? 'animate-spin' : ''}`} />
                              {booking.statusInfo.label}
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-2 gap-3 mb-3">
                            <div className="flex items-center gap-2 text-sm">
                              <FaMapMarkerAlt className="text-cyan-600" />
                              <div>
                                <p className="text-gray-600">Pickup</p>
                                <p className="font-medium text-gray-900">{booking.pickupLocation}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <FaMapMarkerAlt className="text-orange-600" />
                              <div>
                                <p className="text-gray-600">Drop-off</p>
                                <p className="font-medium text-gray-900">{booking.dropoffLocation}</p>
                              </div>
                            </div>
                          </div>

                          {/* Vehicle Type and Passengers */}
                          {(booking.vehicleType || booking.passengers) && (
                            <div className="grid md:grid-cols-2 gap-3 mb-3">
                              {booking.vehicleType && (
                                <div className="flex items-center gap-2 text-sm">
                                  <FaCar className="text-blue-600" />
                                  <div>
                                    <p className="text-gray-600">Vehicle</p>
                                    <p className="font-medium text-gray-900 capitalize">
                                      {booking.vehicleType === 'habal-habal' ? 'Habal-Habal' : 
                                       booking.vehicleType === 'tuktuk' ? 'Tuk-Tuk' : 
                                       booking.vehicleType.charAt(0).toUpperCase() + booking.vehicleType.slice(1)}
                                    </p>
                                  </div>
                                </div>
                              )}
                              {booking.passengers && (
                                <div className="flex items-center gap-2 text-sm">
                                  <FaUsers className="text-purple-600" />
                                  <div>
                                    <p className="text-gray-600">Passengers</p>
                                    <p className="font-medium text-gray-900">
                                      {booking.passengers} {booking.passengers === 1 ? 'person' : 'people'}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {(booking.distance || booking.time) && (
                            <div className="grid md:grid-cols-2 gap-3 mb-3">
                              {booking.distance && (
                                <div className="flex items-center gap-2 text-sm">
                                  <FaRoute className="text-blue-600" />
                                  <div>
                                    <p className="text-gray-600">Distance</p>
                                    <p className="font-medium text-gray-900">{booking.distance.toFixed(2)} km</p>
                                  </div>
                                </div>
                              )}
                              {booking.timeMinutes && (
                                <div className="flex items-center gap-2 text-sm">
                                  <FaClock className="text-orange-600" />
                                  <div>
                                    <p className="text-gray-600">Duration</p>
                                    <p className="font-medium text-gray-900">{booking.timeMinutes} min</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Pickup and Return Schedule */}
                          {(booking.pickupDate || booking.returnDate) && (
                            <div className="grid md:grid-cols-2 gap-3 mb-3 p-3 bg-cyan-50 rounded-lg border border-cyan-100">
                              {booking.pickupDate && (
                                <div className="flex items-start gap-2 text-sm">
                                  <FaCalendarAlt className="text-cyan-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-gray-600 font-medium">Pickup Schedule</p>
                                    <p className="font-semibold text-gray-900">{booking.pickupDate.formatted}</p>
                                    {booking.pickupDate.time && (
                                      <p className="text-gray-700 text-xs mt-0.5">
                                        <FaClock className="inline mr-1" />
                                        {booking.pickupDate.time}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}
                              {booking.returnDate && (
                                <div className="flex items-start gap-2 text-sm">
                                  <FaCalendarAlt className="text-green-600 mt-0.5 flex-shrink-0" />
                                  <div>
                                    <p className="text-gray-600 font-medium">Return Schedule</p>
                                    <p className="font-semibold text-gray-900">{booking.returnDate.formatted}</p>
                                    {booking.returnDate.time && (
                                      <p className="text-gray-700 text-xs mt-0.5">
                                        <FaClock className="inline mr-1" />
                                        {booking.returnDate.time}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          )}

                          <Separator className="my-3" />

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Status:</span>
                              <Badge 
                                variant="outline" 
                                className={`${booking.statusInfo.className} flex items-center gap-1.5 px-2.5 py-1 font-medium text-xs`}
                              >
                                <booking.statusInfo.icon className={`text-[10px] ${booking.statusInfo.iconClassName} ${booking.status === 'pending' ? 'animate-spin' : ''}`} />
                                {booking.statusInfo.label}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <p className="text-xs text-gray-600">Total Fare</p>
                                <p className="text-lg font-bold text-gray-900">₱{(Number(booking.price) || 0).toFixed(2)}</p>
                              </div>
                              {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                                <Button
                                  onClick={() => handleCancelBooking(booking.id)}
                                  disabled={cancellingBookingId === booking.id}
                                  variant="outline"
                                  size="sm"
                                  className="gap-2 border-2 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 hover:text-black bg-white font-semibold shadow-sm disabled:opacity-50"
                                >
                                  {cancellingBookingId === booking.id ? (
                                    <>
                                      <FaSpinner className="w-3 h-3 animate-spin" />
                                      Cancelling...
                                    </>
                                  ) : (
                                    <>
                                      <FaBan className="w-3 h-3" />
                                      Cancel
                                    </>
                                  )}
                                </Button>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-24 h-24 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaHistory className="w-12 h-12 text-cyan-500" />
                      </div>
                      <p className="text-gray-700 text-xl font-semibold mb-2">No rides yet</p>
                      <p className="text-gray-500 text-sm mb-6">Request your first ride and start exploring Siargao!</p>
                      <Link href="/tropiride/vehicles">
                        <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all px-6 py-6 text-base">
                          <FaCar className="mr-2" />
                          Book a Ride
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Cancel Booking Confirmation Dialog */}
      <Dialog open={cancelDialogOpen} onOpenChange={handleCancelDialogClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <FaTimesCircle className="w-5 h-5" />
              Cancel Booking
            </DialogTitle>
            <DialogDescription className="pt-2">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => handleCancelDialogClose(false)}
              disabled={cancellingBookingId !== null}
              className="border-gray-300 hover:bg-gray-50"
            >
              No, Keep Booking
            </Button>
            <Button
              variant="destructive"
              onClick={confirmCancelBooking}
              disabled={cancellingBookingId !== null}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {cancellingBookingId !== null ? (
                <>
                  <FaSpinner className="w-4 h-4 animate-spin mr-2" />
                  Cancelling...
                </>
              ) : (
                <>
                  <FaBan className="w-4 h-4 mr-2" />
                  Yes, Cancel Booking
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
