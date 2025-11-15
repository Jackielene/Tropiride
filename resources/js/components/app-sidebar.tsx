import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, ShieldCheck, Settings, Car, MessageSquare, ClipboardList } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const user = auth?.user;
    const isDriver = user?.role === 'driver';
    const isAdmin = user?.role === 'admin';
    
    // Define menu items based on user role
    const adminNavItems: NavItem[] = [
        {
            title: 'Admin Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Driver Verification',
            href: '/admin/verifications',
            icon: ShieldCheck,
        },
        {
            title: 'Settings',
            href: '/admin/settings/profile',
            icon: Settings,
        },
    ];
    
    const driverNavItems: NavItem[] = [
        {
            title: 'Driver Dashboard',
            href: '/driver/dashboard',
            icon: Car,
        },
        {
            title: 'My Rides',
            href: '/driver/rides',
            icon: ClipboardList,
        },
        {
            title: 'Messages',
            href: '/driver/messages',
            icon: MessageSquare,
        },
        {
            title: 'Settings',
            href: '/driver/settings/profile',
            icon: Settings,
        },
    ];
    
    // Select appropriate nav items based on role
    const mainNavItems = isDriver ? driverNavItems : adminNavItems;
    
    // Determine home link based on role
    const homeLink = isDriver ? '/driver/dashboard' : dashboard();
    
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={homeLink} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
