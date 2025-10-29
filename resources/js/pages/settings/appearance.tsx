import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';

import TropirideLayout from '@/layouts/tropiride-layout';
import SettingsLayout from '@/layouts/settings/layout';

export default function Appearance() {
    return (
        <TropirideLayout>
            <Head title="Appearance settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Appearance Settings</h2>
                        <p className="text-gray-600">Customize your theme and display preferences</p>
                    </div>
                    <AppearanceTabs />
                </div>
            </SettingsLayout>
        </TropirideLayout>
    );
}
