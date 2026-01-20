
/**
 * Đây là File quan trọng nhất để kết nối với Spring Boot.
 * Nó sử dụng thư viện `fetch` (hoặc bạn có thể cài axios sau này) để gửi request.
 * Nó tự động gắn Token vào Header.
 */

const BASE_URL = 'http://localhost:8080/api/v1'; // Địa chỉ Backend Spring Boot của bạn

// Helper để lấy token từ LocalStorage
const getToken = () => localStorage.getItem('accessToken');

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
}

export const apiClient = {
  get: async <T>(url: string, params?: Record<string, string>): Promise<T> => {
    return request<T>(url, { method: 'GET', params });
  },

  post: async <T>(url: string, body: any): Promise<T> => {
    return request<T>(url, { 
      method: 'POST', 
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    });
  },

  put: async <T>(url: string, body: any): Promise<T> => {
    return request<T>(url, { 
      method: 'PUT', 
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' }
    });
  },

  delete: async <T>(url: string): Promise<T> => {
    return request<T>(url, { method: 'DELETE' });
  }
};

// Hàm xử lý chung cho mọi request
async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const token = getToken();
  
  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  // Xử lý Query Params
  let queryString = '';
  if (options.params) {
    queryString = '?' + new URLSearchParams(options.params).toString();
  }

  // Chế độ MOCK (Giả lập) - BẬT CÁI NÀY NẾU CHƯA CÓ BACKEND
  // Khi có Backend thật, hãy xóa hoặc comment khối này
  // ======================================================
  // console.log(`[API Call] ${options.method || 'GET'} ${endpoint}`);
  // return mockBackendResponse<T>(endpoint, options); 
  // ======================================================

  // Chế độ REAL (Thật) - Dùng cái này khi kết nối Spring Boot
  const response = await fetch(`${BASE_URL}${endpoint}${queryString}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token hết hạn hoặc không hợp lệ -> Logout
      localStorage.removeItem('accessToken');
      window.location.href = '/'; 
    }
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || 'API Error');
  }

  // Nếu response không có content (204 No Content)
  if (response.status === 204) return {} as T;

  return response.json();
}

// --- MOCK LOGIC TEMPORARY (Để app chạy được khi bạn chưa bật Java) ---
// Sau này bạn sẽ xóa đoạn này đi
import { MOCK_USERS } from '../constants';

async function mockBackendResponse<T>(endpoint: string, options: any): Promise<T> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Mock Login
            if (endpoint === '/auth/login') {
                const body = JSON.parse(options.body);
                if (body.username === 'admin' || body.username === 'user') {
                    resolve({
                        token: 'mock-jwt-token-xyz',
                        refreshToken: 'mock-refresh-token',
                        user: {
                            id: body.username === 'admin' ? 'admin' : 'user-1',
                            username: body.username,
                            name: body.username === 'admin' ? 'Super Admin' : 'Demo User',
                            avatar: 'https://picsum.photos/200',
                            phone: '0901234567',
                            isOnline: true,
                            roles: body.username === 'admin' ? ['ROLE_ADMIN'] : ['ROLE_USER'],
                            isBot: false,
                            joinedAt: new Date()
                        }
                    } as any);
                } else {
                    reject(new Error('Sai tài khoản hoặc mật khẩu'));
                }
                return;
            }
            // Default resolve for other endpoints to prevent crash
            resolve({} as T);
        }, 800);
    });
}
