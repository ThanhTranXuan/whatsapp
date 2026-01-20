
import React from 'react';
import { useAdmin, AdminTab } from '../context/AdminContext';
import { useAuth } from '../../context/AuthContext';

const menuItems: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/> },
    { id: 'users', label: 'User Management', icon: <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/> },
    { id: 'reports', label: 'Reports', icon: <path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm1-4.32c0 .38-.28.71-.66.76-.08.01-.16.02-.24.02-.45 0-.85-.31-.96-.74L10.6 8.22c-.14-.58.3-1.15.9-1.15h1.01c.6 0 1.04.58.9 1.15l-.54 4.46z"/> },
    { id: 'tickets', label: 'Tickets', icon: <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h18c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/> },
    { id: 'rooms', label: 'Chat Rooms', icon: <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/> },
    { id: 'stats', label: 'Statistics', icon: <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/> }
];

export const AdminSidebar: React.FC = () => {
    const { activeTab, setActiveTab } = useAdmin();
    const { logout } = useAuth();

    return (
        <div className="w-64 bg-[#1a1c23] text-gray-400 flex flex-col h-full border-r border-gray-800">
            <div className="h-16 flex items-center px-6 bg-[#24262d] text-white font-bold text-lg tracking-wide border-b border-gray-800">
                ADMIN PANEL
            </div>

            <nav className="flex-1 py-6 space-y-1">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center px-6 py-3 transition-colors ${activeTab === item.id ? 'bg-[#7e3af2] text-white border-r-4 border-white' : 'hover:bg-[#24262d] hover:text-gray-100'}`}
                    >
                        <svg viewBox="0 0 24 24" width="20" height="20" className="fill-current mr-4">
                            {item.icon}
                        </svg>
                        <span className="font-medium text-sm">{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-800">
                <button 
                    onClick={logout}
                    className="w-full flex items-center justify-center px-4 py-2 bg-red-600/20 text-red-500 rounded hover:bg-red-600 hover:text-white transition-colors text-sm font-medium"
                >
                    <svg viewBox="0 0 24 24" width="18" height="18" className="fill-current mr-2"><path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/></svg>
                    Logout
                </button>
            </div>
        </div>
    );
};
