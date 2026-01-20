
import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { User } from '../types';

const ArrowBackIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="text-[#e9edef] fill-current cursor-pointer">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
    </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" className="text-[#aebac1] fill-current">
     <path d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path>
  </svg>
);

const GridIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#e9edef] cursor-pointer">
        <path d="M10 4H6v4h4V4zm6 0h-4v4h4V4zm6 0h-4v4h4V4zM10 10H6v4h4v-4zm6 0h-4v4h4v-4zm6 0h-4v4h4v-4zM10 16H6v4h4v-4zm6 0h-4v4h4v-4zm6 0h-4v4h4v-4z"></path>
    </svg>
);

const GroupIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#111b21]">
        <path d="M12.3 12.22A4.92 4.92 0 0 0 14 8.5a5 5 0 0 0-10 0 4.92 4.92 0 0 0 1.7 3.72A8 8 0 0 0 1 19.5a1 1 0 0 0 2 0 6 6 0 0 1 12 0 1 1 0 0 0 2 0 8 8 0 0 0-4.7-7.28zM12 21.8c-3.11 0-5.85-1.59-7.46-4H7v-1H5.34A7.99 7.99 0 0 0 12 22a1 1 0 0 0 0-2z"></path>
        <path d="M22 19.5a8 8 0 0 0-4.7-7.28 4.92 4.92 0 0 0 1.7-3.72 5 5 0 0 0-10 0 4.92 4.92 0 0 0 1.7 3.72A8 8 0 0 0 11 19.5a1 1 0 0 0 2 0 6 6 0 0 1 12 0 1 1 0 0 0-2 0zM19 8.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
    </svg>
);

const NewContactIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#111b21]">
        <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
    </svg>
);

const CommunityIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#111b21]">
        <path d="M16.5 13c-1.2 0-3.07.34-4.5 1-1.43-.67-3.3-1-4.5-1C5.33 13 1 14.08 1 16.25V19h22v-2.75c0-2.17-4.33-3.25-6.5-3.25zm-4 4.5h-10v-1.25c0-.54 2.56-1.75 5-1.75s5 1.21 5 1.75v1.25zm9 0H14v-1.25c0-.46-2.06-1.63-4.5-1.74 2.39-.77 6.06-.5 7 0v2.99zM7.5 12c1.93 0 3.5-1.57 3.5-3.5S9.43 5 7.5 5 4 6.57 4 8.5 5.57 12 7.5 12zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 5.5c1.93 0 3.5-1.57 3.5-3.5S18.43 5 16.5 5 13 6.57 13 8.5s1.57 3.5 3.5 3.5zm0-5.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2z"></path>
    </svg>
);

interface NewChatSidebarProps {
  onBack: () => void;
  onOpenDialpad: () => void;
}

export const NewChatSidebar: React.FC<NewChatSidebarProps> = ({ onBack, onOpenDialpad }) => {
  const { users, currentUser, startChatWithUser } = useChat();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = (Object.values(users) as User[]).filter(u => 
      u.id !== currentUser.id && 
      !u.isBot &&
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-[#111b21] animate-fade-in border-r border-[#2f3b43]">
      {/* Header */}
      <div className="h-[108px] bg-[#202c33] flex flex-col justify-end px-5 pb-4 shrink-0 border-b border-[#2f3b43]">
         <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
                <div onClick={onBack}>
                    <ArrowBackIcon />
                </div>
                <h1 className="text-[19px] font-medium text-[#e9edef]">Đoạn chat mới</h1>
            </div>
            <div onClick={onOpenDialpad} className="mt-1">
                <GridIcon />
            </div>
         </div>
      </div>

      {/* Search */}
      <div className="px-3 py-2 bg-[#111b21]">
        <div className="flex items-center bg-[#202c33] rounded-lg px-3 py-[7px] mt-2">
            <div className="mr-4 pl-1 rotate-90 md:rotate-0">
                <SearchIcon />
            </div>
            <input 
                type="text" 
                placeholder="Tìm kiếm tên hoặc số điện thoại" 
                className="bg-transparent border-none outline-none text-sm w-full text-[#e9edef] placeholder-[#8696a0]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
            />
        </div>
      </div>

      {/* Options List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="py-2">
              <div className="flex items-center px-4 py-3 hover:bg-[#202c33] cursor-pointer">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#00a884] flex items-center justify-center">
                      <GroupIcon />
                  </div>
                  <span className="ml-4 text-[17px] text-[#e9edef]">Nhóm mới</span>
              </div>
              <div className="flex items-center px-4 py-3 hover:bg-[#202c33] cursor-pointer">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#00a884] flex items-center justify-center">
                      <NewContactIcon />
                  </div>
                  <div className="ml-4">
                     <div className="text-[17px] text-[#e9edef]">Người liên hệ mới</div>
                  </div>
              </div>
              <div className="flex items-center px-4 py-3 hover:bg-[#202c33] cursor-pointer">
                  <div className="w-[48px] h-[48px] rounded-full bg-[#00a884] flex items-center justify-center">
                      <CommunityIcon />
                  </div>
                  <span className="ml-4 text-[17px] text-[#e9edef]">Cộng đồng mới</span>
              </div>
          </div>

          <div className="text-[#008069] text-[15px] px-8 py-4 font-normal">
              Người liên hệ trên WhatsApp
          </div>
          
          {/* Current User (Me) */}
          <div className="flex items-center px-4 py-3 hover:bg-[#202c33] cursor-pointer group">
                <img src={currentUser.avatar} alt="Me" className="w-[49px] h-[49px] rounded-full object-cover" />
                <div className="ml-4 flex-1 border-b border-[#2f3b43] py-3 group-hover:border-none">
                    <div className="flex items-center justify-between">
                         <h3 className="text-[#e9edef] text-[17px] font-normal">{currentUser.phone} (Bạn)</h3>
                    </div>
                    <p className="text-[#8696a0] text-[14px] mt-0.5">Nhắn tin cho chính bạn</p>
                </div>
           </div>

          {/* Other Users */}
          {filteredUsers.map(user => (
              <div 
                key={user.id} 
                onClick={() => { startChatWithUser(user.id); onBack(); }}
                className="flex items-center px-4 py-3 hover:bg-[#202c33] cursor-pointer group"
              >
                  <img src={user.avatar} alt={user.name} className="w-[49px] h-[49px] rounded-full object-cover" />
                  <div className="ml-4 flex-1 border-b border-[#2f3b43] py-3 group-hover:border-none">
                      <h3 className="text-[#e9edef] text-[17px] font-normal">{user.name}</h3>
                      <p className="text-[#8696a0] text-[14px] mt-0.5">{user.bio || "Hey there! I am using WhatsApp."}</p>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};
