import { useState, useEffect } from 'react';
import { Form } from '@inertiajs/react';
import { FaSave, FaTimes, FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';

interface ProfileUpdateFormProps {
  user: {
    id: number;
    name: string;
    email: string;
  };
  profileData: {
    name: string;
    email: string;
    phone: string;
    age: string;
    address: string;
  };
  onDataChange: (data: any) => void;
}

export default function ProfileUpdateForm({ user, profileData, onDataChange }: ProfileUpdateFormProps) {
  const [formData, setFormData] = useState({
    name: profileData.name || '',
    email: profileData.email || '',
    phone: profileData.phone || '',
    age: profileData.age || '',
    address: profileData.address || '',
  });

  // Update form data when profileData changes (e.g., when user cancels or page refreshes)
  useEffect(() => {
    setFormData({
      name: profileData.name || '',
      email: profileData.email || '',
      phone: profileData.phone || '',
      age: profileData.age || '',
      address: profileData.address || '',
    });
  }, [profileData.name, profileData.email, profileData.phone, profileData.age, profileData.address]);

  // Update parent component immediately when form data changes
  useEffect(() => {
    onDataChange(formData);
  }, [formData.name, formData.email, formData.phone, formData.age, formData.address]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2 text-gray-700 font-semibold">
            <FaUser className="text-cyan-600" />
            Full Name
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 border-2 border-cyan-200 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg"
            placeholder="Enter your full name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2 text-gray-700 font-semibold">
            <FaEnvelope className="text-cyan-600" />
            Email Address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 border-2 border-cyan-200 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg"
            placeholder="Enter your email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2 text-gray-700 font-semibold">
            <FaPhone className="text-cyan-600" />
            Phone Number
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 border-2 border-cyan-200 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age" className="flex items-center gap-2 text-gray-700 font-semibold">
            <FaCalendarAlt className="text-cyan-600" />
            Age
          </Label>
          <Input
            id="age"
            name="age"
            type="number"
            min="1"
            max="120"
            value={formData.age}
            onChange={handleChange}
            className="mt-1 border-2 border-cyan-200 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg"
            placeholder="Enter your age"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="address" className="flex items-center gap-2 text-gray-700 font-semibold">
            <FaMapMarkerAlt className="text-cyan-600" />
            Address
          </Label>
          <Input
            id="address"
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
            className="mt-1 border-2 border-cyan-200 focus:border-cyan-500 focus:ring-cyan-500 rounded-lg"
            placeholder="Enter your address"
          />
        </div>
      </div>
    </div>
  );
}
