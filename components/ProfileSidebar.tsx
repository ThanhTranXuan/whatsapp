
import React, { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const EditIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#8696a0] cursor-pointer hover:fill-[#00a884]">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
    </svg>
);

const CopyIcon = () => (
     <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#8696a0] cursor-pointer hover:fill-[#00a884]">
         <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
     </svg>
);

const CameraIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#d1d7db] text-white">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
        <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>
    </svg>
);

export const ProfileSidebar: React.FC = () => {
    const { user, updateUserProfile } = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            updateUserProfile({ avatar: reader.result as string });
          };
          reader.readAsDataURL(file);
        }
    };

    if (!user) return null;

    return (
        <div className="flex flex-col h-full bg-[#111b21] w-full border-r border-[#2f3b43] animate-fade-in">
             {/* Header */}
             <div className="px-4 py-3 bg-[#111b21] shrink-0 h-[60px] flex items-center">
                <h1 className="text-[20px] font-bold text-[#e9edef] ml-2">Trang cá nhân</h1>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Avatar */}
                <div className="flex justify-center py-8 group">
                    <div className="relative w-[200px] h-[200px] cursor-pointer" onClick={handleAvatarClick}>
                        <img 
                            src={user.avatar} 
                            alt="Profile" 
                            className="w-full h-full rounded-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[#202c33]/80 flex flex-col items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <CameraIcon />
                            <span className="text-[#d1d7db] text-xs mt-2 uppercase text-center w-24">Thay đổi ảnh đại diện</span>
                        </div>
                        <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                    </div>
                </div>

                {/* Name */}
                <div className="px-8 py-4 mb-2">
                    <div className="text-[#008069] text-[14px] mb-4">Tên</div>
                    <div className="flex items-center justify-between mb-2">
                         <span className="text-[#e9edef] text-[17px]">{user.name}</span>
                         <EditIcon />
                    </div>
                </div>

                {/* About */}
                <div className="px-8 py-4 mb-2">
                    <div className="text-[#008069] text-[14px] mb-4">Giới thiệu</div>
                    <div className="flex items-center justify-between mb-2">
                         <span className="text-[#e9edef] text-[17px]">{user.bio || "Xin chào! Mình đang dùng WhatsApp nè."}</span>
                         <EditIcon />
                    </div>
                </div>

                 {/* Phone */}
                 <div className="px-8 py-4 mb-2">
                    <div className="text-[#008069] text-[14px] mb-4">Số điện thoại</div>
                    <div className="flex items-center justify-between mb-2">
                         <span className="text-[#e9edef] text-[17px]">{user.phone || "+84 36 675 2540"}</span>
                         <CopyIcon />
                    </div>
                </div>
            </div>
            
            <div className="px-8 pb-8">
                 <div className="text-[#008069] text-[17px] mb-2 text-center">Trang cá nhân</div>
            </div>
        </div>
    );
};
