
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const WhatsAppLogo = () => (
    <div className="flex items-center gap-3 mb-7">
        <svg viewBox="0 0 33 33" width="33" height="33" className="" fill="white">
            <path d="M16.6 0C7.4 0 0 7.5 0 16.6c0 3 .8 5.9 2.3 8.4L.6 33l8.2-2.1c2.4 1.3 5.1 2 7.8 2 9.2 0 16.6-7.5 16.6-16.6C33.2 7.5 25.7 0 16.6 0zm0 27.8c-2.5 0-4.9-.7-7-1.9l-.5-.3-5.2 1.4 1.4-5.1-.3-.5C3.7 19.3 3 16.8 3 14.2c0-7.5 6.1-13.6 13.6-13.6 7.5 0 13.6 6.1 13.6 13.6 0 7.5-6.1 13.6-13.6 13.6zM24 20.3c-.4-.2-2.3-1.1-2.7-1.3-.4-.2-.6-.3-.9.1-.3.4-1 1.3-1.2 1.5-.2.3-.5.3-.9.1-1.9-.9-3.1-2-4.3-4.1-.2-.3 0-.5.2-.7.2-.2.4-.4.5-.6.2-.2.3-.4.4-.6.1-.2.1-.4 0-.6-.1-.2-.9-2.1-1.2-2.9-.3-.8-.7-.7-1-.7h-.8c-.3 0-.8.1-1.2.6-.4.4-1.6 1.6-1.6 3.8 0 2.3 1.7 4.5 1.9 4.8.2.3 3.3 5.1 8 7.1 2.8 1.2 3.9 1 5.3.9 1.6-.1 3.5-1.4 4-2.8.5-1.3.5-2.5.3-2.8-.2-.2-.5-.3-.9-.5z"></path>
        </svg>
        <span className="text-white font-semibold text-sm tracking-wide uppercase">WhatsApp Web</span>
    </div>
);

export const Login: React.FC = () => {
  const { login, isLoading, error, setCurrentView } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      login({ username, password });
    }
  };

  return (
    <div className="min-h-screen bg-[#d1d7db] flex flex-col items-center relative overflow-hidden font-sans">
      <div className="absolute top-0 w-full h-[224px] bg-[#00a884] z-0">
          <div className="max-w-[1000px] mx-auto px-4 h-full pt-7">
               <WhatsAppLogo />
          </div>
      </div>

      <div className="z-10 w-full max-w-[1000px] px-4 mt-[96px] mb-8">
        <div className="bg-white rounded shadow-lg overflow-hidden flex flex-col md:flex-row min-h-[500px]">
            
            <div className="p-10 md:p-14 md:w-[65%] flex flex-col relative">
                <h2 className="text-[28px] font-light text-[#41525d] mb-10 leading-normal">Đăng nhập vào WhatsApp Web</h2>
                
                <div className="bg-white">
                    {error && (
                        <div className="mb-3 text-red-500 text-sm bg-red-50 p-2 rounded border border-red-100">
                        {error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm">
                        <div className="relative group">
                            <label className="text-xs text-[#008069] font-bold absolute -top-2 left-2 bg-white px-1">Tài khoản</label>
                            <input
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:border-[#00a884] focus:ring-1 focus:ring-[#00a884] outline-none transition-all bg-white text-[#111b21] placeholder-gray-400"
                                placeholder="Nhập tài khoản (admin/user)"
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
                                placeholder="Nhập mật khẩu"
                            />
                        </div>

                        <div className="flex items-center gap-4 mt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="bg-[#008069] text-white px-6 py-2 rounded-[3px] hover:bg-[#006d59] transition-colors font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed uppercase text-sm tracking-wide"
                            >
                                {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
                            </button>
                            <button 
                                type="button"
                                onClick={() => setCurrentView('register')}
                                className="text-[#008069] hover:underline font-medium text-sm"
                            >
                                Tạo tài khoản mới
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="md:w-[35%] flex flex-col items-center justify-center p-10 border-l border-gray-100 relative bg-white text-center">
                 <h3 className="text-[#41525d] font-medium mb-4">Đăng nhập bằng Google</h3>
                 <button 
                    onClick={() => alert("Tính năng này sẽ chuyển hướng đến http://localhost:8080/oauth2/authorization/google")}
                    className="flex items-center justify-center gap-2 border border-gray-300 rounded p-2 w-full hover:bg-gray-50 transition-colors"
                 >
                     <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="G" className="w-5 h-5"/>
                     <span className="text-sm text-gray-700">Tiếp tục với Google</span>
                 </button>
                 <p className="text-xs text-gray-400 mt-8">
                    Demo Accounts:<br/>
                    <b>admin</b> / <b>admin</b><br/>
                    <b>user</b> / <b>password</b>
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};
