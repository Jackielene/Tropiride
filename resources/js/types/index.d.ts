import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface Booking {
    id: number;
    user_name?: string;
    pickup_location: string;
    dropoff_location: string;
    estimated_fare: number;
    distance_km: number;
    estimated_time_minutes: number;
    status: string;
    requested_at: string | null;
    created_at: string;
    pickup_date?: string | null;
    pickup_time?: string | null;
    return_date?: string | null;
    return_time?: string | null;
    vehicle_type?: string | null;
    passengers?: number | null;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    bookings?: Booking[];
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    age?: number;
    address?: string;
    avatar?: string;
    avatar_url?: string;
    role: 'customer' | 'driver' | 'admin';
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}
