
import { User, Conversation, FriendRequest, Notification, Ticket } from './types';

export const CURRENT_USER: User = {
  id: 'me',
  username: 'senior_dev',
  name: 'Senior Dev',
  avatar: 'https://picsum.photos/200/200?random=99',
  isOnline: true,
  phone: '+84901234567',
  roles: ['ROLE_USER', 'ROLE_ADMIN']
};

export const MOCK_USERS: Record<string, User> = {
  'gemini-bot': {
    id: 'gemini-bot',
    username: 'gemini',
    name: 'Gemini AI',
    avatar: 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg',
    isOnline: true,
    isBot: true,
    phone: '0000000000',
    bio: 'I am your AI assistant.',
    roles: ['ROLE_BOT']
  },
  'user-2': {
    id: 'user-2',
    username: 'alice',
    name: 'Alice Johnson',
    avatar: 'https://picsum.photos/200/200?random=2',
    isOnline: false,
    phone: '+84912345678',
    bio: 'Busy coding',
    roles: ['ROLE_USER']
  },
  'user-3': {
    id: 'user-3',
    username: 'bob',
    name: 'Bob Smith',
    avatar: 'https://picsum.photos/200/200?random=3',
    isOnline: true,
    phone: '+84987654321',
    bio: 'At the gym',
    roles: ['ROLE_USER']
  },
  'user-4': {
    id: 'user-4',
    username: 'project_team',
    name: 'Project Team',
    avatar: 'https://ui-avatars.com/api/?name=Project+Team&background=663399&color=fff',
    isOnline: true,
    phone: '', 
    bio: 'Official Group',
    roles: ['ROLE_USER']
  },
  'user-5': {
    id: 'user-5',
    username: 'charlie',
    name: 'Charlie Brown',
    avatar: 'https://picsum.photos/200/200?random=5',
    isOnline: true,
    phone: '+84999888777',
    bio: 'Sleeping',
    roles: ['ROLE_USER']
  }
};

const now = new Date();

// Mock data: 2 friends (user-2, user-3)
export const MOCK_FRIENDS: string[] = ['user-2', 'user-3'];

// Mock data: 1 pending request from user-5
export const MOCK_FRIEND_REQUESTS: FriendRequest[] = [
  {
    id: 'req-1',
    senderId: 'user-5',
    timestamp: new Date(now.getTime() - 1000 * 60 * 60), // 1 hour ago
    status: 'pending',
  }
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    type: 'friend_request',
    content: 'Charlie Brown sent you a friend request.',
    timestamp: new Date(now.getTime() - 1000 * 60 * 60), // 1 hour ago
    isRead: false,
    referenceId: 'user-5'
  },
  {
    id: 'notif-2',
    type: 'system',
    content: 'Welcome to GeminiChat! Try asking the AI for help.',
    timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24), // 1 day ago
    isRead: true,
  },
  {
    id: 'notif-3',
    type: 'message',
    content: 'New message from Alice regarding the design.',
    timestamp: new Date(now.getTime() - 1000 * 60 * 30), // 30 mins ago
    isRead: false,
    referenceId: 'conv-2'
  }
];

export const MOCK_TICKETS: Ticket[] = [
    {
        id: 't-1',
        subject: 'Login Issue',
        description: 'I sometimes cannot login with my password.',
        status: 'resolved',
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 48)
    },
    {
        id: 't-2',
        subject: 'Feature Request',
        description: 'Please add dark mode.',
        status: 'open',
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2)
    }
];

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    userId: 'gemini-bot',
    isGroup: false,
    unreadCount: 0,
    messages: [
      {
        id: 'm1',
        senderId: 'gemini-bot',
        text: 'Hello! I am Gemini. I can help you write code, plan your day, or just chat.',
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2), // 2 hours ago
        status: 'read',
      },
    ],
    lastMessage: {
        id: 'm1',
        senderId: 'gemini-bot',
        text: 'Hello! I am Gemini. I can help you write code, plan your day, or just chat.',
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 2),
        status: 'read',
      }
  },
  {
    id: 'conv-2',
    userId: 'user-2',
    isGroup: false,
    unreadCount: 3,
    messages: [
      {
        id: 'm2',
        senderId: 'user-2',
        text: 'Hey, are we still meeting tomorrow?',
        timestamp: new Date(now.getTime() - 1000 * 60 * 45),
        status: 'delivered',
      },
      {
        id: 'm3',
        senderId: 'user-2',
        text: 'I have some updates on the frontend design.',
        timestamp: new Date(now.getTime() - 1000 * 60 * 40),
        status: 'delivered',
      },
      {
        id: 'm3b',
        senderId: 'user-2',
        text: 'Call me when you are free!',
        timestamp: new Date(now.getTime() - 1000 * 60 * 5), // 5 mins ago
        status: 'delivered',
      }
    ],
    lastMessage: {
        id: 'm3b',
        senderId: 'user-2',
        text: 'Call me when you are free!',
        timestamp: new Date(now.getTime() - 1000 * 60 * 5),
        status: 'delivered',
      }
  },
   {
    id: 'conv-3',
    userId: 'user-3',
    isGroup: false,
    unreadCount: 0,
    messages: [
      {
        id: 'm4',
        senderId: 'me',
        text: 'Did you push the code?',
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 25), // Yesterday
        status: 'read',
      },
       {
        id: 'm5',
        senderId: 'user-3',
        text: 'Yes, just now. Check the repo.',
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24.5), // Yesterday
        status: 'read',
      }
    ],
    lastMessage: {
        id: 'm5',
        senderId: 'user-3',
        text: 'Yes, just now. Check the repo.',
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 24.5),
        status: 'read',
      }
  },
  {
    id: 'conv-4',
    userId: 'user-4',
    isGroup: true,
    unreadCount: 0,
    messages: [
        {
            id: 'm6',
            senderId: 'user-4',
            text: 'Guys, the deadline is approaching.',
            timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 48), // 2 days ago
            status: 'read'
        }
    ],
    lastMessage: {
        id: 'm6',
        senderId: 'user-4',
        text: 'Guys, the deadline is approaching.',
        timestamp: new Date(now.getTime() - 1000 * 60 * 60 * 48),
        status: 'read'
    }
  }
];
