
import { apiClient } from './apiClient';
import { Conversation, Message } from '../types';
import { MOCK_CONVERSATIONS } from '../constants';

/**
 * Service này gọi các API liên quan đến Chat.
 * Tương ứng với ChatController / MessageController trong Spring Boot.
 */

const USE_MOCK = true;

export const ChatService = {
  
  // Lấy danh sách các cuộc hội thoại
  getConversations: async (): Promise<Conversation[]> => {
    if (USE_MOCK) {
        // Mapping mock data to DTO format if needed, or just returning mock
        return new Promise(resolve => setTimeout(() => resolve(MOCK_CONVERSATIONS), 500));
    }
    return apiClient.get<Conversation[]>('/conversations');
  },

  // Lấy chi tiết tin nhắn của 1 hội thoại
  getMessages: async (conversationId: string): Promise<Message[]> => {
    if (USE_MOCK) {
        const conv = MOCK_CONVERSATIONS.find(c => c.id === conversationId);
        return new Promise(resolve => setTimeout(() => resolve(conv ? conv.messages : []), 300));
    }
    return apiClient.get<Message[]>(`/conversations/${conversationId}/messages`);
  },

  // Gửi tin nhắn
  sendMessage: async (conversationId: string, content: string, type: 'TEXT' | 'IMAGE' = 'TEXT'): Promise<Message> => {
     if (USE_MOCK) {
         return new Promise(resolve => {
             const msg: Message = {
                 id: Date.now().toString(),
                 conversationId,
                 senderId: 'me', // Mock ID
                 text: content,
                 status: 'sent',
                 timestamp: new Date()
             };
             resolve(msg);
         });
     }
     
     return apiClient.post<Message>(`/conversations/${conversationId}/messages`, {
         content,
         type
     });
  }
};
