
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { User, Conversation, Message, FriendRequest, Notification, Attachment, Ticket } from '../types';
import { MOCK_CONVERSATIONS, MOCK_USERS, MOCK_FRIEND_REQUESTS, MOCK_FRIENDS, MOCK_NOTIFICATIONS, MOCK_TICKETS } from '../constants';
import { generateBotResponse } from '../services/geminiService';
import { mockSocket } from '../services/mockSocketService';

interface ChatContextType {
  currentUser: User;
  conversations: Conversation[];
  users: Record<string, User>;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  sendMessage: (text: string, attachment?: Attachment) => void;
  activeConversation: Conversation | undefined;
  
  // Sidebar State
  showChatInfo: boolean;
  toggleChatInfo: () => void;
  
  // Friend Management
  friends: string[];
  friendRequests: FriendRequest[];
  acceptFriendRequest: (requestId: string) => void;
  rejectFriendRequest: (requestId: string) => void;
  startChatWithUser: (userId: string) => void;

  // Notifications
  notifications: Notification[];
  unreadNotificationCount: number;
  markNotificationAsRead: (notificationId: string) => void;

  // Support & Reporting
  tickets: Ticket[];
  createTicket: (subject: string, description: string) => void;
  reportUser: (userId: string, reason: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode; user: User }> = ({ children, user }) => {
  const [conversations, setConversations] = useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [showChatInfo, setShowChatInfo] = useState(false);
  
  // Friend State
  const [friends, setFriends] = useState<string[]>(MOCK_FRIENDS);
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(MOCK_FRIEND_REQUESTS);

  // Notification State
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  // Support State
  const [tickets, setTickets] = useState<Ticket[]>(MOCK_TICKETS);

  const activeConversation = conversations.find(c => c.id === activeConversationId);

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  // Reset chat info when changing conversation
  useEffect(() => {
      setShowChatInfo(false);
  }, [activeConversationId]);

  // --- Realtime & Message Logic (Existing) ---
  useEffect(() => {
    mockSocket.connect();
    mockSocket.onMessage((incomingMessage, conversationId) => {
        setConversations(prev => prev.map(conv => {
            if (conv.id === conversationId) {
                return {
                    ...conv,
                    messages: [...conv.messages, incomingMessage],
                    lastMessage: incomingMessage,
                    unreadCount: activeConversationId === conversationId ? 0 : conv.unreadCount + 1
                };
            }
            return conv;
        }));
    });
    return () => {
        mockSocket.disconnect();
    };
  }, [activeConversationId]);

  const sendMessage = useCallback(async (text: string, attachment?: Attachment) => {
    if (!activeConversationId) return;
    if (!text && !attachment) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: user.id,
      text: text,
      timestamp: new Date(),
      status: 'sent',
      attachment: attachment
    };

    const currentConv = conversations.find(c => c.id === activeConversationId);
    if (!currentConv) return;

    setConversations(prev => prev.map(conv => {
      if (conv.id === activeConversationId) {
        return {
          ...conv,
          messages: [...conv.messages, newMessage],
          lastMessage: newMessage,
        };
      }
      return conv;
    }));

    // If it's a bot, only respond to text for now
    if (currentConv.userId === 'gemini-bot' && text) {
        try {
            const botReplyText = await generateBotResponse([], text);
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                senderId: 'gemini-bot',
                text: botReplyText,
                timestamp: new Date(),
                status: 'read'
            };
            setConversations(prev => prev.map(conv => {
                if (conv.id === activeConversationId) {
                    return {
                    ...conv,
                    messages: [...conv.messages, botMessage],
                    lastMessage: botMessage,
                    };
                }
                return conv;
            }));
        } catch (e) {
            console.error(e);
        }
    } else if (currentConv.userId !== 'gemini-bot') {
        const recipientId = currentConv.userId;
        const randomDelay = Math.floor(Math.random() * 3000) + 2000;
        const replyText = attachment 
            ? `I received the file: ${attachment.fileName}` 
            : `I received: "${text}"`;
            
        mockSocket.simulateReply(
            activeConversationId, 
            recipientId, 
            replyText,
            randomDelay
        );
    }
  }, [activeConversationId, conversations, user.id]);

  useEffect(() => {
    if (activeConversationId) {
      setConversations(prev => prev.map(conv => {
        if (conv.id === activeConversationId) {
          return { ...conv, unreadCount: 0 };
        }
        return conv;
      }));
    }
  }, [activeConversationId]);

  // --- Friend Management Logic ---

  const acceptFriendRequest = (requestId: string) => {
    const request = friendRequests.find(req => req.id === requestId);
    if (request) {
      setFriends(prev => [...prev, request.senderId]);
      setFriendRequests(prev => prev.filter(req => req.id !== requestId));
      
      // Remove from notification list if exists
      setNotifications(prev => prev.map(n => 
        (n.type === 'friend_request' && n.referenceId === request.senderId) 
        ? { ...n, isRead: true } 
        : n
      ));
    }
  };

  const rejectFriendRequest = (requestId: string) => {
    setFriendRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const startChatWithUser = (userId: string) => {
    const existingConv = conversations.find(c => c.userId === userId);
    if (existingConv) {
        setActiveConversationId(existingConv.id);
    } else {
        const newConv: Conversation = {
            id: `conv-${Date.now()}`,
            userId: userId,
            isGroup: false,
            messages: [],
            unreadCount: 0,
        };
        setConversations(prev => [newConv, ...prev]);
        setActiveConversationId(newConv.id);
    }
  };

  // --- Notification Logic ---
  const markNotificationAsRead = (notificationId: string) => {
      setNotifications(prev => prev.map(n => 
          n.id === notificationId ? { ...n, isRead: true } : n
      ));
  };

  // --- Support Logic ---
  const createTicket = (subject: string, description: string) => {
    const newTicket: Ticket = {
        id: `t-${Date.now()}`,
        subject,
        description,
        status: 'open',
        timestamp: new Date()
    };
    setTickets(prev => [newTicket, ...prev]);
  };

  const reportUser = (userId: string, reason: string) => {
      console.log(`[REPORT] User ${userId} reported for: ${reason}`);
      alert("Report submitted successfully. We will review it shortly.");
  };

  const toggleChatInfo = () => setShowChatInfo(prev => !prev);

  return (
    <ChatContext.Provider value={{
      currentUser: user,
      conversations,
      users: MOCK_USERS,
      activeConversationId,
      setActiveConversationId,
      sendMessage,
      activeConversation,
      showChatInfo,
      toggleChatInfo,
      friends,
      friendRequests,
      acceptFriendRequest,
      rejectFriendRequest,
      startChatWithUser,
      notifications,
      unreadNotificationCount,
      markNotificationAsRead,
      tickets,
      createTicket,
      reportUser
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
