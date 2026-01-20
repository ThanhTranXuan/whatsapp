
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const Register: React.FC = () => {
  const { register, isLoading, error, setCurrentView } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password && fullName) {
      register({ username, password, fullName });
    }
  };

  return (
    <div className="min-h-screen bg-[#d1d7db] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      {/* Green Header */}
      <div className="absolute top-0 w-full h-[224px] bg-[#00a884] z-0">
          <div className="max-w-[1000px] mx-auto px-4 h-full pt-7 flex items-center gap-3">
               <svg viewBox="0 0 33 33" width="33" height="33" className="" fill="white">
                  <path d="M16.6 0C7.4 0 0 7.5 0 16.6c0 3 .8 5.9 2.3 8.4L.6 33l8.2-2.1c2.4 1.3 5.1 2 7.8 2 9.2 0 16.6-7.5 16.6-16.6C33.2 7.5 25.7 0 16.6 0zm0 27.8c-2.5 0-4.9-.7-7-1.9l-.5-.3-5.2 1.4 1.4-5.1-.3-.5C3.7 19.3 3 16.8 3 14.2c0-7.5 6.1-13.6 13.6-13.6 7.5 0 13.6 6.1 13.6 13.6 0 7.5-6.1 13.6-13.6 13.6zM24 20.3c-.4-.2-2.3-1.1-2.7-1.3-.4-.2-.6-.3-.9.1-.3.4-1 1.3-1.2 1.5-.2.3-.5.3-.9.1-1.9-.9-3.1-2-4.3-4.1-.2-.3 0-.5.2-.7.2-.2.4-.4.5-.6.2-.2.3-.4.4-.6.1-.2.1-.4 0-.6-.1-.2-.9-2.1-1.2-2.9-.3-.8-.7-.7-1-.7h-.8c-.3 0-.8.1-1.2.6-.4.4-1.6 1.6-1.6 3.8 0 2.3 1.7 4.5 1.9 4.8.2.3 3.3 5.1 8 7.1 2.8 1.2 3.9 1 5.3.9 1.6-.1 3.5-1.4 4-2.8.5-1.3.5-2.5.3-2.8-.2-.2-.5-.3-.9-.5z"></path>
              </svg>
              <span className="text-white font-semibold text-sm tracking-wide uppercase">WhatsApp Web</span>
          </div>
      </div>

      <div className="z-10 w-full max-w-[500px] px-4 mt-8">
        <div className="bg-white rounded shadow-lg p-10 w-full">
          <h2 className="text-[28px] font-light text-[#41525d] mb-8 text-center">Đăng ký tài khoản</h2>
          
          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
                <label className="text-xs text-[#008069] font-bold absolute -top-2 left-2 bg-white px-1">Họ và tên</label>
                <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] outline-none transition-all bg-white text-[#111b21] placeholder-gray-400"
                    placeholder="Nhập họ tên hiển thị"
                />
            </div>

            <div className="relative group">
                <label className="text-xs text-[#008069] font-bold absolute -top-2 left-2 bg-white px-1">Tài khoản</label>
                <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] outline-none transition-all bg-white text-[#111b21] placeholder-gray-400"
                    placeholder="Tên đăng nhập"
                />
            </div>
            
            <div className="relative group">
                <label className="text-xs text-[#008069] font-bold absolute -top-2 left-2 bg-white px-1">Mật khẩu</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] outline-none transition-all bg-white text-[#111b21] placeholder-gray-400"
                    placeholder="Mật khẩu"
                />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#008069] text-white py-3 rounded-[3px] hover:bg-[#006d59] transition-colors font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed uppercase text-sm tracking-wide mt-4"
            >
              {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
            </button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-600">
              Đã có tài khoản?{' '}
              <button 
                onClick={() => setCurrentView('login')}
                className="text-[#008069] hover:underline font-medium"
              >
                Đăng nhập ngay
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
