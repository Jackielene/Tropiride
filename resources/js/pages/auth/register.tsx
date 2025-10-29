import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff, User, Car } from 'lucide-react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthTwoColumnLayout from '@/layouts/auth/auth-two-column-layout';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [selectedRole, setSelectedRole] = useState<'customer' | 'driver'>('customer');

    return (
        <AuthTwoColumnLayout
            title="Create an account"
            description="Enter your details below to create your account"
            type="register"
        >
            <Head title="Register" />
            <Form
                {...RegisteredUserController.store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="space-y-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                    Full Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Enter your full name"
                                    className="h-12 border-gray-200 focus:border-cyan-500 focus:ring-cyan-500"
                                />
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="h-12 border-gray-200 focus:border-cyan-500 focus:ring-cyan-500"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-sm font-medium text-gray-700">
                                    Select Your Role
                                </Label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setSelectedRole('customer')}
                                        className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                                            selectedRole === 'customer'
                                                ? 'border-cyan-500 bg-cyan-50 shadow-md'
                                                : 'border-gray-200 hover:border-gray-300 bg-white'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value="customer"
                                            checked={selectedRole === 'customer'}
                                            onChange={() => setSelectedRole('customer')}
                                            className="sr-only"
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                                selectedRole === 'customer' ? 'bg-cyan-500' : 'bg-gray-100'
                                            }`}>
                                                <User className={`w-6 h-6 ${
                                                    selectedRole === 'customer' ? 'text-white' : 'text-gray-600'
                                                }`} />
                                            </div>
                                            <span className={`text-sm font-semibold ${
                                                selectedRole === 'customer' ? 'text-cyan-600' : 'text-gray-700'
                                            }`}>
                                                Customer
                                            </span>
                                            <span className="text-xs text-gray-500 text-center">
                                                Book rides and services
                                            </span>
                                        </div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setSelectedRole('driver')}
                                        className={`p-4 border-2 rounded-lg transition-all duration-200 ${
                                            selectedRole === 'driver'
                                                ? 'border-cyan-500 bg-cyan-50 shadow-md'
                                                : 'border-gray-200 hover:border-gray-300 bg-white'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="role"
                                            value="driver"
                                            checked={selectedRole === 'driver'}
                                            onChange={() => setSelectedRole('driver')}
                                            className="sr-only"
                                        />
                                        <div className="flex flex-col items-center gap-2">
                                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                                selectedRole === 'driver' ? 'bg-cyan-500' : 'bg-gray-100'
                                            }`}>
                                                <Car className={`w-6 h-6 ${
                                                    selectedRole === 'driver' ? 'text-white' : 'text-gray-600'
                                                }`} />
                                            </div>
                                            <span className={`text-sm font-semibold ${
                                                selectedRole === 'driver' ? 'text-cyan-600' : 'text-gray-700'
                                            }`}>
                                                Driver
                                            </span>
                                            <span className="text-xs text-gray-500 text-center">
                                                Offer ride services
                                            </span>
                                        </div>
                                    </button>
                                </div>
                                <input
                                    type="hidden"
                                    name="role"
                                    value={selectedRole}
                                />
                                <InputError message={errors.role} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="Create a password"
                                        className="h-12 border-gray-200 focus:border-cyan-500 focus:ring-cyan-500 pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation" className="text-sm font-medium text-gray-700">
                                    Confirm password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password_confirmation"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="Confirm your password"
                                        className="h-12 border-gray-200 focus:border-cyan-500 focus:ring-cyan-500 pr-12"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && (
                                    <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                )}
                                {processing ? "Creating account..." : "Create account"}
                            </Button>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-gray-600">
                                Already have an account?{' '}
                                <TextLink 
                                    href={login()} 
                                    tabIndex={6}
                                    className="text-cyan-600 hover:text-cyan-700 font-medium"
                                >
                                    Sign in here
                                </TextLink>
                            </p>
                        </div>
                    </>
                )}
            </Form>
        </AuthTwoColumnLayout>
    );
}
