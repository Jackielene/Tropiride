import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { edit as editPassword } from '@/routes/password';
import { edit } from '@/routes/profile';
import { show } from '@/routes/two-factor';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import { 
    User, 
    Lock, 
    Shield, 
    ChevronRight,
    Settings as SettingsIcon
} from 'lucide-react';

const sidebarNavItems = [
    {
        title: 'Profile',
        href: edit(),
        icon: User,
        description: 'Update your personal information',
        color: 'text-blue-600',
        bgColor: 'bg-blue-50',
    },
    {
        title: 'Password',
        href: editPassword(),
        icon: Lock,
        description: 'Change your password',
        color: 'text-green-600',
        bgColor: 'bg-green-50',
    },
    {
        title: 'Two-Factor Auth',
        href: show(),
        icon: Shield,
        description: 'Secure your account',
        color: 'text-purple-600',
        bgColor: 'bg-purple-50',
    },
];

export default function SettingsLayout({ children }: PropsWithChildren) {
    // When server-side rendering, we only render the layout on the client...
    if (typeof window === 'undefined') {
        return null;
    }

    const currentPath = window.location.pathname;

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <SettingsIcon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                            <p className="text-gray-600 mt-1">Manage your profile and account settings</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <Card className="sticky top-8 !bg-white border border-gray-200 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold text-gray-900">
                                    Account Settings
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-0">
                                <nav className="space-y-1">
                                    {sidebarNavItems.map((item, index) => {
                                        const isActive = currentPath === (typeof item.href === 'string' ? item.href : item.href.url);
                                        return (
                                            <Link
                                                key={`${typeof item.href === 'string' ? item.href : item.href.url}-${index}`}
                                                href={item.href}
                                                className={cn(
                                                    'flex items-center justify-between p-4 transition-all duration-200 group',
                                                    isActive
                                                        ? 'bg-gradient-to-r from-cyan-50 to-blue-50 border-r-4 border-cyan-500'
                                                        : 'hover:bg-gray-50'
                                                )}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <div className={cn(
                                                        'w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200',
                                                        isActive ? 'bg-cyan-100' : item.bgColor,
                                                        isActive ? 'text-cyan-600' : item.color
                                                    )}>
                                                        <item.icon className="h-5 w-5" />
                                                    </div>
                                                    <div>
                                                        <p className={cn(
                                                            'font-medium text-sm transition-colors duration-200',
                                                            isActive ? 'text-cyan-900' : 'text-gray-900'
                                                        )}>
                                                            {item.title}
                                                        </p>
                                                        <p className={cn(
                                                            'text-xs transition-colors duration-200',
                                                            isActive ? 'text-cyan-700' : 'text-gray-500'
                                                        )}>
                                                            {item.description}
                                                        </p>
                                                    </div>
                                                </div>
                                                <ChevronRight className={cn(
                                                    'h-4 w-4 transition-all duration-200',
                                                    isActive ? 'text-cyan-600' : 'text-gray-400 group-hover:text-gray-600'
                                                )} />
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <Card className="shadow-xl border border-gray-200 !bg-white">
                            <CardContent className="p-8">
                                <div className="max-w-4xl">
                                    {children}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
