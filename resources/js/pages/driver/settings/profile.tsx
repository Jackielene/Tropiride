import { send } from '@/routes/verification';
import { type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage, router } from '@inertiajs/react';
import { useState } from 'react';
import { Camera, Loader2 } from 'lucide-react';

import DeleteUser from '@/components/delete-user';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import AppLayout from '@/layouts/app-layout';
import DriverSettingsLayout from '@/layouts/driver-settings/layout';

export default function DriverProfile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth, flash } = usePage<SharedData>().props;
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    // Get avatar URL with cache busting
    const getAvatarUrl = () => {
        if (!auth.user?.avatar_url) {
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(auth.user?.name || 'Driver')}&background=f97316&color=ffffff&size=128`;
        }
        const separator = auth.user.avatar_url.includes('?') ? '&' : '?';
        return `${auth.user.avatar_url}${separator}t=${Date.now()}`;
    };

    // Get user initials for fallback
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    // Handle avatar upload
    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadError(null);

        // Validate file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
            setUploadError('Image size must be less than 2MB');
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setUploadError('Please upload an image file');
            return;
        }

        setIsUploading(true);

        const formData = new FormData();
        formData.append('avatar', file);

        router.post('/driver/profile/avatar', formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setIsUploading(false);
                setUploadError(null);
                // Reload to refresh avatar
                setTimeout(() => {
                    router.reload({ only: ['auth'] });
                }, 100);
            },
            onError: (errors) => {
                setIsUploading(false);
                if (errors.avatar) {
                    setUploadError(Array.isArray(errors.avatar) ? errors.avatar[0] : errors.avatar);
                } else {
                    setUploadError('Failed to upload avatar. Please try again.');
                }
            },
            onFinish: () => {
                setIsUploading(false);
            },
        });
    };

    return (
        <AppLayout>
            <Head title="Driver Profile Settings" />

            <DriverSettingsLayout>
                <div className="space-y-6">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Driver Profile Information</h2>
                        <p className="text-gray-600">Update your personal details and driver account information</p>
                    </div>

                    {/* Success/Error Messages */}
                    {(flash?.status || status) && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm font-medium text-green-800">{flash?.status || status}</p>
                        </div>
                    )}
                    {flash?.error && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-sm font-medium text-red-800">{flash.error}</p>
                        </div>
                    )}

                    {/* Profile Photo Section */}
                    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                        <Label className="text-base font-semibold text-gray-900 mb-4 block">Profile Photo</Label>
                        <div className="flex items-center gap-6">
                            <div className="relative group">
                                <Avatar className="w-24 h-24 border-4 border-orange-200 shadow-lg">
                                    <AvatarImage
                                        src={getAvatarUrl()}
                                        alt={auth.user?.name || 'Driver'}
                                        className={isUploading ? 'opacity-50' : ''}
                                        key={`avatar-${auth.user?.avatar || 'default'}-${auth.user?.updated_at || Date.now()}`}
                                    />
                                    <AvatarFallback className="text-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white">
                                        {getInitials(auth.user?.name || 'D')}
                                    </AvatarFallback>
                                </Avatar>
                                {isUploading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-orange-600/80 rounded-full">
                                        <Loader2 className="h-8 w-8 text-white animate-spin" />
                                    </div>
                                )}
                                <label
                                    htmlFor="avatar-upload"
                                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-600/80 to-red-600/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm"
                                >
                                    <Camera className="text-white h-8 w-8" />
                                </label>
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/jpeg,image/png,image/jpg,image/gif"
                                    onChange={handleAvatarUpload}
                                    className="hidden"
                                    disabled={isUploading}
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-700 mb-2">
                                    Click on the photo or use the button below to upload a new profile picture.
                                </p>
                                <p className="text-xs text-gray-500 mb-3">
                                    Supported formats: JPEG, PNG, GIF. Max size: 2MB
                                </p>
                                <label htmlFor="avatar-upload-btn">
                                    <input
                                        id="avatar-upload-btn"
                                        type="file"
                                        accept="image/jpeg,image/png,image/jpg,image/gif"
                                        onChange={handleAvatarUpload}
                                        className="hidden"
                                        disabled={isUploading}
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        disabled={isUploading}
                                        className="border-orange-300 text-orange-700 hover:bg-orange-50 hover:border-orange-400"
                                        onClick={() => document.getElementById('avatar-upload-btn')?.click()}
                                    >
                                        {isUploading ? (
                                            <>
                                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                                Uploading...
                                            </>
                                        ) : (
                                            <>
                                                <Camera className="h-4 w-4 mr-2" />
                                                Change Photo
                                            </>
                                        )}
                                    </Button>
                                </label>
                                {uploadError && (
                                    <p className="mt-2 text-sm text-red-600">{uploadError}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <Form
                        action="/driver/settings/profile"
                        method="patch"
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.name}
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder="Full name"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.email}
                                        name="email"
                                        required
                                        autoComplete="username"
                                        placeholder="Email address"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>

                                {mustVerifyEmail &&
                                    auth.user.email_verified_at === null && (
                                        <div>
                                            <p className="-mt-4 text-sm text-muted-foreground">
                                                Your email address is
                                                unverified.{' '}
                                                <Link
                                                    href={send()}
                                                    as="button"
                                                    className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                                >
                                                    Click here to resend the
                                                    verification email.
                                                </Link>
                                            </p>

                                            {status ===
                                                'verification-link-sent' && (
                                                <div className="mt-2 text-sm font-medium text-green-600">
                                                    A new verification link has
                                                    been sent to your email
                                                    address.
                                                </div>
                                            )}
                                        </div>
                                    )}

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        data-test="update-profile-button"
                                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                                    >
                                        Save Changes
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">
                                            Saved
                                        </p>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Form>
                </div>

                <DeleteUser />
            </DriverSettingsLayout>
        </AppLayout>
    );
}

