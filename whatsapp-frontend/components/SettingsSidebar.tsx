
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" className="text-[#aebac1] fill-current">
     <path d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path>
  </svg>
);

const AccountIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
    </svg>
);

const PrivacyIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path>
    </svg>
);

const ChatIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
    </svg>
);

const NotificationIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]">
        <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"></path>
    </svg>
);

const KeyboardIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]">
        <path d="M20 5H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2V8zm0 3h2v2h-2v-2zM8 8h2v2H8V8zm0 3h2v2H8v-2zm-1 2H5v-2h2v2zm0-3H5V8h2v2zm9 7H8v-2h8v2zm0-4h-2v-2h2v2zm0-3h-2V8h2v2zm3 3h-2v-2h2v2zm0-3h-2V8h2v2z"></path>
    </svg>
);

const HelpIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"></path>
    </svg>
);

const LogoutIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#f15c6d]">
         <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
    </svg>
);

const SettingItem = ({ icon, label, onClick, isDanger }: { icon: React.ReactNode, label: string, onClick?: () => void, isDanger?: boolean }) => (
    <div 
        onClick={onClick}
        className="flex items-center px-6 py-4 hover:bg-[#202c33] cursor-pointer transition-colors border-b border-[#202c33]"
    >
        <div className="mr-4">
            {icon}
        </div>
        <div className={`text-[17px] ${isDanger ? 'text-[#f15c6d]' : 'text-[#e9edef]'}`}>{label}</div>
    </div>
);

export const SettingsSidebar: React.FC = () => {
    const { user, logout } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="flex flex-col h-full bg-[#111b21] w-full border-r border-[#2f3b43] animate-fade-in">
             {/* Header */}
             <div className="px-4 py-3 bg-[#111b21] shrink-0 h-[60px] flex items-center">
                <h1 className="text-[20px] font-bold text-[#e9edef] ml-2">Cài đặt</h1>
            </div>

            {/* Search */}
            <div className="px-3 pb-4 bg-[#111b21]">
                <div className="flex items-center bg-[#202c33] rounded-lg px-3 py-[7px]">
                    <div className="mr-4 pl-1 rotate-90 md:rotate-0">
                         <SearchIcon />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm cài đặt" 
                        className="bg-transparent border-none outline-none text-sm w-full text-[#e9edef] placeholder-[#8696a0]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* User Profile Snippet */}
                <div className="flex items-center px-4 py-3 hover:bg-[#202c33] cursor-pointer mb-2">
                    <img src={user?.avatar} alt={user?.name} className="w-[82px] h-[82px] rounded-full object-cover mr-4" />
                    <div>
                        <h2 className="text-[19px] text-[#e9edef] mb-1">{user?.name}</h2>
                        <p className="text-[14px] text-[#8696a0]">{user?.bio || "Available"}</p>
                    </div>
                </div>

                <SettingItem icon={<AccountIcon />} label="Tài khoản" />
                <SettingItem icon={<PrivacyIcon />} label="Quyền riêng tư" />
                <SettingItem icon={<ChatIcon />} label="Đoạn chat" />
                <SettingItem icon={<NotificationIcon />} label="Thông báo" />
                <SettingItem icon={<KeyboardIcon />} label="Phím tắt" />
                <SettingItem icon={<HelpIcon />} label="Trợ giúp" />
                <SettingItem icon={<LogoutIcon />} label="Đăng xuất" onClick={logout} isDanger />
                
                <div className="mt-8 mb-4 text-center">
                     <div className="text-[#8696a0] text-[13px] border-t border-[#202c33] pt-6 inline-block w-3/4">
                         WhatsApp Web v2.3000.101
                     </div>
                </div>
            </div>
        </div>
    );
};
