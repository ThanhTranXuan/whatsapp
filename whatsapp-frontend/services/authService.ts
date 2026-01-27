
import { apiClient } from './apiClient';
import { AuthResponseDTO, LoginRequest, RegisterRequest, UserDTO } from '../types';

/**
 * Service này chuyên trách việc gọi API liên quan đến xác thực.
 * Tương ứng với AuthController trong Spring Boot.
 */

// Mock logic để UI hoạt động khi chưa có Backend
// Khi có Backend, bạn chỉ cần xóa khối Mock và giữ khối Real


export const AuthService = {
  // 2. Đăng ký
  register: async (data: RegisterRequest): Promise<AuthResponseDTO> => {
    // Gọi vào: POST /api/v1/auth/register
    // Lưu ý: data gồm username, password, email, fullName
    return apiClient.post<AuthResponseDTO>('/api/v1/auth/register', data);
  }
  
};







