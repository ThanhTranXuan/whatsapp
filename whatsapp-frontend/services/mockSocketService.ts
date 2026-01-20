import { Message } from '../types';

type MessageCallback = (message: Message, conversationId: string) => void;

class MockSocketService {
  private listeners: MessageCallback[] = [];
  private isConnected: boolean = false;

  // Giả lập kết nối WS
  connect() {
    console.log('🔌 Mock WebSocket: Connected');
    this.isConnected = true;
  }

  disconnect() {
    console.log('🔌 Mock WebSocket: Disconnected');
    this.isConnected = false;
    this.listeners = [];
  }

  // Frontend đăng ký nhận tin nhắn (giống socket.on('message'))
  onMessage(callback: MessageCallback) {
    this.listeners.push(callback);
  }

  // Hàm này giả lập Server push tin nhắn xuống Client
  // Được gọi bởi code logic để test, hoặc setTimeout nội bộ
  emitFromServer(message: Message, conversationId: string) {
    if (!this.isConnected) return;
    
    // Giả lập độ trễ mạng ngẫu nhiên (network jitter)
    console.log(`📡 Mock WebSocket: Receiving message from ${message.senderId}...`);
    this.listeners.forEach(listener => listener(message, conversationId));
  }

  // Helper để tạo phản hồi tự động cho demo
  simulateReply(conversationId: string, senderId: string, text: string, delay: number = 2000) {
    setTimeout(() => {
        const mockMsg: Message = {
            id: Date.now().toString(),
            senderId: senderId,
            text: text,
            timestamp: new Date(),
            status: 'read' // Tin nhắn đến thì coi như họ đã gửi xong
        };
        this.emitFromServer(mockMsg, conversationId);
    }, delay);
  }
}

export const mockSocket = new MockSocketService();