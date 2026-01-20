
import React from 'react';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { AdminSidebar } from './components/AdminSidebar';
import { Dashboard, UsersScreen, ReportsScreen, TicketsScreen, RoomsScreen, StatsScreen } from './components/AdminScreens';

const AdminContent: React.FC = () => {
    const { activeTab } = useAdmin();

    const renderScreen = () => {
        switch(activeTab) {
            case 'dashboard': return <Dashboard />;
            case 'users': return <UsersScreen />;
            case 'reports': return <ReportsScreen />;
            case 'tickets': return <TicketsScreen />;
            case 'rooms': return <RoomsScreen />;
            case 'stats': return <StatsScreen />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className="flex h-screen bg-[#f3f4f6]">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto p-8">
                {renderScreen()}
            </main>
        </div>
    );
};

export const AdminLayout: React.FC = () => {
    return (
        <AdminProvider>
            <AdminContent />
        </AdminProvider>
    );
};
