
// ==========================================
// DATA TRANSFER OBJECTS (DTOs) & MODELS
// ==========================================

export interface Attachment {
  fileName: string;
  fileType: string;
  fileSize: string;
  url: string;
}

export interface FriendRequest {
  id: string;
  senderId: string;
  timestamp: Date;
  status: 'pending' | 'accepted' | 'rejected';
}

export interface Notification {
  id: string;
  type: 'friend_request' | 'message' | 'system';
  content: string;
  timestamp: Date;
  isRead: boolean;
  referenceId?: string;
}

export interface Ticket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'resolved' | 'closed';
  timestamp: Date;
  senderId?: string;
  adminResponse?: string;
}

export interface UserReport {
  id: string;
  reporterId: string;
  reportedUserId: string;
  reason: string;
  timestamp: Date;
  status: 'pending' | 'resolved' | 'dismissed';
}

export interface UserDTO {
  id: string;
  username: string;
  name: string; // Changed from fullName to match UI
  avatar: string; // Changed from avatarUrl to match UI
  phone: string; // Changed from phoneNumber to match UI
  bio?: string;
  isOnline: boolean; // Changed from status string to boolean for UI convenience
  roles: string[];
  isBot?: boolean;
  joinedAt?: string | Date;
  isBanned?: boolean;
}

export interface AuthResponseDTO {
  token: string;
  refreshToken: string;
  user: UserDTO;
}

export interface MessageDTO {
  id: string;
  conversationId?: string;
  senderId: string;
  text: string; // Changed from content
  messageType?: 'TEXT' | 'IMAGE' | 'VIDEO' | 'FILE' | 'AUDIO';
  timestamp: Date | string; // Changed from createdAt
  status: 'sent' | 'delivered' | 'read'; // Lowercase to match UI
  attachment?: Attachment;
}

export interface ConversationDTO {
  id: string;
  userId: string; // For 1-on-1
  name?: string;
  isGroup: boolean;
  avatarUrl?: string;
  participants?: UserDTO[];
  messages: MessageDTO[];
  lastMessage?: MessageDTO;
  unreadCount: number;
}

// ==========================================
// FRONTEND MODELS
// ==========================================

export interface User extends UserDTO {
    // Add any extra frontend-only props if needed
}

export interface Message extends MessageDTO {
    timestamp: Date; // Enforce Date object in UI model
}

export interface Conversation extends ConversationDTO {
    messages: Message[];
    lastMessage?: Message;
}

// API Requests
export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
  fullName: string;
  phoneNumber?: string;
}
