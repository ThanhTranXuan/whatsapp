
import { apiClient } from './apiClient';
import { AuthResponseDTO, LoginRequest, RegisterRequest, UserDTO } from '../types';

/**
 * Service này chuyên trách việc gọi API liên quan đến xác thực.
 * Tương ứng với AuthController trong Spring Boot.
 */

// Mock logic để UI hoạt động khi chưa có Backend
// Khi có Backend, bạn chỉ cần xóa khối Mock và giữ khối Real
const USE_MOCK = true; 

export const AuthService = {
  
  login: async (creds: LoginRequest): Promise<AuthResponseDTO> => {
    if (USE_MOCK) return mockLogin(creds);
    return apiClient.post<AuthResponseDTO>('/auth/login', creds);
  },

  register: async (data: RegisterRequest): Promise<AuthResponseDTO> => {
    if (USE_MOCK) return mockRegister(data);
    return apiClient.post<AuthResponseDTO>('/auth/register', data);
  },

  logout: async (): Promise<void> => {
    // Với JWT stateles, thường chỉ cần xóa token ở client.
    // Tuy nhiên có thể gọi API để blacklist token.
    if (!USE_MOCK) await apiClient.post('/auth/logout', {});
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: async (): Promise<UserDTO> => {
    if (USE_MOCK) {
        const stored = localStorage.getItem('user');
        return stored ? JSON.parse(stored) : null;
    }
    return apiClient.get<UserDTO>('/users/me');
  }
};


// --- MOCK IMPLEMENTATION (XÓA KHI CÓ BACKEND) ---
const mockLogin = async (creds: LoginRequest): Promise<AuthResponseDTO> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
             if (creds.username === 'admin' && creds.password === 'admin') {
                resolve(createMockUser('admin', 'Super Admin', ['ROLE_ADMIN']));
             } else if (creds.password === 'password') {
                resolve(createMockUser('user', creds.username, ['ROLE_USER']));
             } else {
                reject(new Error('Sai thông tin đăng nhập (Thử: admin/admin hoặc user/password)'));
             }
        }, 1000);
    });
};

const mockRegister = async (data: RegisterRequest): Promise<AuthResponseDTO> => {
     return new Promise((resolve) => {
        setTimeout(() => {
            resolve(createMockUser('new-user', data.fullName, ['ROLE_USER']));
        }, 1000);
    });
};

const createMockUser = (id: string, name: string, roles: string[]): AuthResponseDTO => {
    return {
        token: 'fake-jwt-token-' + Date.now(),
        refreshToken: 'fake-refresh-token',
        user: {
            id,
            username: name.toLowerCase().replace(/\s/g, ''),
            name: name,
            avatar: `https://ui-avatars.com/api/?name=${name}&background=random`,
            phone: '+84900000000',
            isOnline: true,
            roles,
            isBot: false,
            joinedAt: new Date()
        }
    };
};
