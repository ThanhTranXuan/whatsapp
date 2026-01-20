
import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

// --- Header Icons ---
const SearchIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]">
       <path d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path>
    </svg>
);

const VideoIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]">
        <path d="M2 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7zm18 3.5l4-3v9l-4-3v-3z"></path>
    </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]">
    <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
  </svg>
);

const ChevronDownIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]">
        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
    </svg>
);

const CloseSearchIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1] cursor-pointer hover:bg-[rgba(255,255,255,0.1)] rounded-full">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
);

// --- Dropdown Icons ---
const InfoIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>);
const SelectIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-9-2.5l5.5-5.5-1.41-1.41L10 14.17l-2.59-2.58L6 13l4 3.5z"></path></svg>);
const MuteIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73 4.27 3zM12 4L9.91 6.09 12 8.18V4z"></path></svg>);
const TimerIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]"><path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"></path></svg>);
const HeartIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>);
const CloseChatIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>);
const ReportIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></path></svg>);
const BlockIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path></svg>);
const ClearIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11H7v-2h10v2z"></path></svg>);
const DeleteIcon = () => (<svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1]"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>);

const MenuItem = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) => (
    <div 
        onClick={onClick} 
        className="flex items-center gap-3 px-6 py-2.5 hover:bg-[#111b21] cursor-pointer text-[#d1d7db] transition-colors"
    >
        <div className="w-5 h-5 flex items-center justify-center">
            {icon}
        </div>
        <span className="text-[14.5px] whitespace-nowrap">{label}</span>
    </div>
);

const ChatMenuDropdown = ({ onClose, onToggleInfo }: { onClose: () => void, onToggleInfo: () => void }) => {
    return (
        <>
            <div className="fixed inset-0 z-40 cursor-default" onClick={onClose}></div>
            <div className="absolute top-[50px] right-4 bg-[#233138] rounded-md shadow-[0_2px_5px_0_rgba(11,20,26,0.26),0_2px_10px_0_rgba(11,20,26,0.16)] py-2 w-[280px] z-50 animate-fade-in origin-top-right border border-[#111b21]">
                <MenuItem icon={<InfoIcon />} label="Thông tin liên hệ" onClick={() => { onToggleInfo(); onClose(); }} />
                <MenuItem icon={<SelectIcon />} label="Chọn tin nhắn" onClick={onClose} />
                <MenuItem icon={<MuteIcon />} label="Tắt thông báo" onClick={onClose} />
                <MenuItem icon={<TimerIcon />} label="Tin nhắn tự hủy" onClick={onClose} />
                <MenuItem icon={<HeartIcon />} label="Thêm vào mục Yêu thích" onClick={onClose} />
                <MenuItem icon={<CloseChatIcon />} label="Đóng đoạn chat" onClick={onClose} />
                <div className="my-1 border-t border-[#374248]/50"></div>
                <MenuItem icon={<ReportIcon />} label="Báo cáo" onClick={onClose} />
                <MenuItem icon={<BlockIcon />} label="Chặn" onClick={onClose} />
                <MenuItem icon={<ClearIcon />} label="Xóa nội dung đoạn chat" onClick={onClose} />
                <MenuItem icon={<DeleteIcon />} label="Xóa đoạn chat" onClick={onClose} />
            </div>
        </>
    );
};

export const ChatWindow: React.FC = () => {
  const { activeConversation, users, sendMessage, currentUser, toggleChatInfo } = useChat();
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  
  const activeUser = activeConversation ? users[activeConversation.userId] : null;

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
        searchInputRef.current.focus();
    }
  }, [showSearch]);

  // Click outside listener for search bar
  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
              setShowSearch(false);
          }
      };
      if (showSearch) {
          document.addEventListener('mousedown', handleClickOutside);
      }
      return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearch]);

  if (!activeConversation || !activeUser) return null;

  return (
    <div className="flex flex-col h-full w-full bg-[#0b141a] relative">
      {/* Header */}
      <div className="flex items-center px-4 py-[10px] bg-[#202c33] border-b border-[#2f3b43] z-20 h-[60px] shrink-0 justify-between relative shadow-sm">
        {/* Update: Click handler removed from main div, applied only to Avatar */}
        <div className="flex items-center flex-1 min-w-0">
            <div className="relative cursor-pointer" onClick={toggleChatInfo} title="Thông tin liên hệ">
                <img src={activeUser.avatar} alt={activeUser.name} className="w-[40px] h-[40px] rounded-full object-cover" />
            </div>
            <div className="ml-3 flex flex-col justify-center overflow-hidden cursor-default">
                <span className="text-[#e9edef] font-normal text-[16px] leading-tight truncate">{activeUser.name}</span>
                <span className="text-[13px] text-[#8696a0] leading-tight mt-0.5 truncate">
                    {activeUser.isOnline ? 'Online' : 'Last seen recently'}
                </span>
            </div>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4 mr-1">
            <div 
                title="Gọi video"
                className="py-1.5 px-3 rounded-full hover:bg-[rgba(255,255,255,0.1)] cursor-pointer flex items-center gap-1 border border-[#374045] transition-colors"
            >
                <VideoIcon />
                <ChevronDownIcon />
            </div>
            <div 
                title="Tìm kiếm..."
                className={`p-2 rounded-full cursor-pointer transition-colors ${showSearch ? 'bg-[rgba(255,255,255,0.1)]' : 'hover:bg-[rgba(255,255,255,0.1)]'}`}
                onClick={() => setShowSearch(prev => !prev)}
            >
                <SearchIcon />
            </div>
            <div 
                title="Menu"
                className={`p-2 rounded-full cursor-pointer transition-colors ${showMenu ? 'bg-[rgba(255,255,255,0.1)]' : 'hover:bg-[rgba(255,255,255,0.1)]'}`} 
                onClick={() => setShowMenu(!showMenu)}
            >
                <MenuIcon />
            </div>
        </div>

        {/* Dropdown Menu */}
        {showMenu && <ChatMenuDropdown onClose={() => setShowMenu(false)} onToggleInfo={toggleChatInfo} />}
      </div>

      {/* Floating Search Bar */}
      {showSearch && (
          <div 
            ref={searchBarRef}
            className="absolute top-[70px] right-4 bg-[#202c33] z-30 p-2 rounded-lg shadow-xl border border-[#2f3b43] animate-fade-in flex items-center gap-2 w-[300px]"
          >
              <div className="flex-1 bg-[#111b21] rounded-lg px-3 py-1.5 flex items-center">
                  <div className="mr-2">
                     <SearchIcon />
                  </div>
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder="Tìm kiếm..." 
                    className="bg-transparent border-none outline-none text-[#e9edef] text-sm w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
              </div>
              <div onClick={() => { setShowSearch(false); setSearchTerm(''); }}>
                  <CloseSearchIcon />
              </div>
          </div>
      )}

      {/* Messages */}
      <MessageList 
        messages={activeConversation.messages} 
        currentUser={currentUser} 
        users={users} 
        searchTerm={searchTerm} 
      />

      {/* Input */}
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};
