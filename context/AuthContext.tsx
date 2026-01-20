
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginRequest, RegisterRequest } from '../types';
import { AuthService } from '../services/authService';

type AuthView = 'login' | 'register';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  currentView: AuthView;
  setCurrentView: (view: AuthView) => void;
  login: (creds: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  updateUserProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Loading true lúc đầu để check token
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<AuthView>('login');

  // Kiểm tra token khi F5 trang
  useEffect(() => {
    const initAuth = async () => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            try {
                // Gọi API lấy thông tin user từ token (hoặc load từ localStorage nếu muốn nhanh)
                const userData = await AuthService.getCurrentUser();
                setUser(userData);
            } catch (err) {
                // Token lỗi -> logout
                localStorage.removeItem('accessToken');
            }
        }
        setIsLoading(false);
    };
    initAuth();
  }, []);

  const login = async (creds: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuthService.login(creds);
      
      // Lưu token
      localStorage.setItem('accessToken', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('user', JSON.stringify(response.user));

      setUser(response.user);
    } catch (err: any) {
      setError(err.message || 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await AuthService.register(data);
      
      localStorage.setItem('accessToken', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      setUser(response.user);
    } catch (err: any) {
      setError(err.message || 'Đăng ký thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setCurrentView('login');
  };

  const updateUserProfile = (data: Partial<User>) => {
      if (user) {
          const updated = { ...user, ...data };
          setUser(updated);
          localStorage.setItem('user', JSON.stringify(updated));
      }
  };

  const isAdmin = user?.roles.includes('ROLE_ADMIN') || false;

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      isLoading,
      error,
      currentView,
      setCurrentView,
      login,
      register,
      logout,
      updateUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
