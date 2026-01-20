
import React, { createContext, useContext, useState } from 'react';
import { User, Ticket, UserReport, Conversation } from '../../types';
import { MOCK_USERS, MOCK_CONVERSATIONS } from '../../constants';

// --- Mock Admin Data ---
const ADMIN_DEMO_REPORTS: UserReport[] = [
    {
        id: 'rep-101',
        reporterId: 'user-2',
        reportedUserId: 'user-3',
        reason: 'Harassment: Using offensive language in direct messages repeatedly despite warnings.',
        timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 mins ago
        status: 'pending'
    },
    {
        id: 'rep-102',
        reporterId: 'user-5',
        reportedUserId: 'user-4',
        reason: 'Spam: Posting crypto betting site links in the general project group.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
        status: 'pending'
    },
    {
        id: 'rep-103',
        reporterId: 'user-2',
        reportedUserId: 'gemini-bot',
        reason: 'Bot Error: The AI is providing chemically dangerous recipes.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
        status: 'dismissed'
    }
];

// Specific Mock Tickets for Admin Demo
const ADMIN_DEMO_TICKETS: Ticket[] = [
    {
        id: 't-101',
        subject: 'Cannot access dark mode',
        description: 'I cannot find the switch to turn on dark mode in settings.',
        status: 'open',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        senderId: 'user-2'
    },
    {
        id: 't-102',
        subject: 'Account Verification',
        description: 'How do I verify my account to get the blue tick?',
        status: 'open',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
        senderId: 'user-3'
    },
    {
        id: 't-100',
        subject: 'Login issues on mobile',
        description: 'The app crashes when I try to login from my iPhone.',
        status: 'resolved',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        senderId: 'user-5',
        adminResponse: 'We have pushed a hotfix (v1.2.1). Please update your app.'
    }
];

// Specific Mock Rooms for Admin Demo (Metadata only)
export interface RoomMetadata {
    id: string;
    name: string;
    type: 'direct' | 'group';
    participants: number;
    messagesCount: number;
    lastActive: Date;
}

const ADMIN_DEMO_ROOMS: RoomMetadata[] = [
    {
        id: 'room-101',
        name: 'Project Alpha Team',
        type: 'group',
        participants: 8,
        messagesCount: 1240,
        lastActive: new Date(Date.now() - 1000 * 60 * 2) // 2 mins ago
    },
    {
        id: 'room-102',
        name: 'Alice & Support',
        type: 'direct',
        participants: 2,
        messagesCount: 45,
        lastActive: new Date(Date.now() - 1000 * 60 * 60 * 5) // 5 hours ago
    },
    {
        id: 'room-103',
        name: 'Frontend Guild',
        type: 'group',
        participants: 24,
        messagesCount: 8502,
        lastActive: new Date(Date.now() - 1000 * 60 * 15) // 15 mins ago
    }
];

export type AdminTab = 'dashboard' | 'users' | 'reports' | 'tickets' | 'rooms' | 'stats';

interface AdminContextType {
    activeTab: AdminTab;
    setActiveTab: (tab: AdminTab) => void;
    users: User[];
    reports: UserReport[];
    tickets: Ticket[];
    conversations: Conversation[];
    rooms: RoomMetadata[];
    banUser: (userId: string) => void;
    unbanUser: (userId: string) => void;
    resolveReport: (reportId: string) => void; // General resolve
    ignoreReport: (reportId: string) => void;
    warnUser: (reportId: string) => void;
    resolveTicket: (ticketId: string) => void;
    respondToTicket: (ticketId: string, response: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('rooms'); // Default to rooms for this step
    
    // Transform object map to array and add mock join date
    const [users, setUsers] = useState<User[]>(Object.values(MOCK_USERS).map((u, index) => {
        const isBanned = index === 3; 
        return {
            ...u, 
            isBanned: isBanned,
            joinedAt: new Date(Date.now() - Math.random() * 10000000000)
        };
    }));

    const [reports, setReports] = useState<UserReport[]>(ADMIN_DEMO_REPORTS);
    const [tickets, setTickets] = useState<Ticket[]>(ADMIN_DEMO_TICKETS);
    const [conversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
    const [rooms] = useState<RoomMetadata[]>(ADMIN_DEMO_ROOMS);

    const banUser = (userId: string) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, isBanned: true } : u));
    };

    const unbanUser = (userId: string) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, isBanned: false } : u));
    };

    const resolveReport = (reportId: string) => {
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
    };

    const ignoreReport = (reportId: string) => {
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'dismissed' } : r));
    };

    const warnUser = (reportId: string) => {
        // In a real app, this would send a notification to the user
        console.log(`[Admin] Warning sent for report ${reportId}`);
        setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
    };

    const resolveTicket = (ticketId: string) => {
        setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'resolved' } : t));
    };

    const respondToTicket = (ticketId: string, response: string) => {
        setTickets(prev => prev.map(t => 
            t.id === ticketId 
            ? { ...t, status: 'resolved', adminResponse: response } 
            : t
        ));
    };

    return (
        <AdminContext.Provider value={{
            activeTab,
            setActiveTab,
            users,
            reports,
            tickets,
            conversations,
            rooms,
            banUser,
            unbanUser,
            resolveReport,
            ignoreReport,
            warnUser,
            resolveTicket,
            respondToTicket
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};
