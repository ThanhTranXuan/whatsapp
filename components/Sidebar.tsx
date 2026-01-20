
import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { User } from '../types';
import { useAuth } from '../context/AuthContext';
import { StatusSidebar } from './StatusSidebar';
import { ChannelsSidebar } from './ChannelsSidebar';
import { CommunitiesSidebar } from './CommunitiesSidebar';
import { NewChatSidebar } from './NewChatSidebar';
import { DialpadSidebar } from './DialpadSidebar';
import { MediaSidebar } from './MediaSidebar';
import { SettingsSidebar } from './SettingsSidebar';
import { ProfileSidebar } from './ProfileSidebar';

// --- Icons ---
const NewChatIcon = ({ onClick }: { onClick: () => void }) => (
  <svg onClick={onClick} viewBox="0 0 24 24" width="24" height="24" className="text-[#aebac1] fill-current cursor-pointer hover:text-[#e9edef]">
    <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3.987-3.708H7.041V7.4h10.962v1.936z"></path>
    <path d="M16 10h-3v3h-2v-3H8V8h3V5h2v3h3z"></path>
  </svg>
);

const MenuIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" className="text-[#aebac1] fill-current cursor-pointer hover:text-[#e9edef]">
    <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24" className="text-[#aebac1] fill-current">
     <path d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path>
  </svg>
);

const DoubleCheckIcon = ({ color }: { color: string }) => (
    <svg viewBox="0 0 16 11" height="11" width="16" className={`${color} fill-current inline-block`}>
        <path d="M11.5 0L6.707 4.793 4.5 2.586 3.086 4 6.707 7.621 13 1.414 11.5 0z" />
        <path d="M15 1.414L7.5 8.914 6 7.414 7.5 5.914 13.596 0 15 1.414zM4.5 7.5L3 6 0 9 4.5 13.5 8.793 9.207 7.293 7.707 4.5 10.5 4.5 7.5z" transform="translate(1 -2.5)" />
    </svg>
);

// --- Menu Icons ---
const GroupAddIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-[#aebac1]">
        <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
    </svg>
);

const StarIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-[#aebac1]">
        <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.01 4.38.38-3.32 2.88 1 4.28L12 15.4z"></path>
    </svg>
);

const SelectIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-[#aebac1]">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-9-2.5l5.5-5.5-1.41-1.41L10 14.17l-2.59-2.58L6 13l4 3.5z"></path>
    </svg>
);

const MarkReadIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-[#aebac1]">
        <path d="M19 3H4.99C3.88 3 3.01 3.89 3.01 5L3 19c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.35 3-3 3s-3-1.34-3-3H4.99V5H19v10z"></path>
    </svg>
);

const LockIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-[#aebac1]">
        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
    </svg>
);

const LogoutIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-[#aebac1]">
         <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
    </svg>
);

const MenuItem = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
    <div 
        onClick={onClick} 
        className="flex items-center gap-3 px-4 py-3 hover:bg-[#111b21] cursor-pointer text-[#e9edef] transition-colors"
    >
        <div className="w-5 h-5 flex items-center justify-center">
            {icon}
        </div>
        <span className="text-[14.5px] whitespace-nowrap">{label}</span>
    </div>
);

const MenuDropdown = ({ onClose }: { onClose: () => void }) => {
    const { logout } = useAuth();
    
    return (
        <>
            {/* Backdrop to handle click outside */}
            <div className="fixed inset-0 z-40 cursor-default" onClick={onClose}></div>
            
            {/* Dropdown Menu */}
            <div className="absolute top-8 right-0 bg-[#233138] rounded-lg shadow-xl py-2 w-max min-w-[240px] z-50 animate-fade-in border border-[#2f3b43] origin-top-right">
                <MenuItem icon={<GroupAddIcon />} label="Nhóm mới" onClick={onClose} />
                <MenuItem icon={<StarIcon />} label="Tin nhắn đã gắn sao" onClick={onClose} />
                <MenuItem icon={<SelectIcon />} label="Chọn đoạn chat" onClick={onClose} />
                <MenuItem icon={<MarkReadIcon />} label="Đánh dấu tất cả là đã đọc" onClick={onClose} />
                <div className="border-t border-[#374248] my-1"></div>
                <MenuItem icon={<LockIcon />} label="Khóa ứng dụng" onClick={onClose} />
                <MenuItem icon={<LogoutIcon />} label="Đăng xuất" onClick={() => { onClose(); logout(); }} />
            </div>
        </>
    );
}

const ConversationItem = ({ id, name, avatar, lastMessage, unreadCount, isActive, isBot, currentUserId, onClick }: any) => {
    const formatTime = (date: Date) => {
        const now = new Date();
        const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth();
        return isToday ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : date.toLocaleDateString();
    };

    return (
        <div 
            onClick={onClick}
            className={`flex items-center px-3 py-3 cursor-pointer hover:bg-[#202c33] transition-colors relative group ${isActive ? 'bg-[#2a3942]' : ''}`}
        >
            <div className="relative shrink-0">
                <img src={avatar} alt={name} className={`w-[49px] h-[49px] rounded-full object-cover ${isBot ? 'p-[2px] border-2 border-[#00a884]' : ''}`} />
            </div>
            <div className="ml-3 flex-1 min-w-0 flex flex-col justify-center h-full border-b border-[#222e35] py-3 -mr-3 pr-3">
                <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className={`text-[17px] font-normal truncate flex items-center ${unreadCount > 0 ? 'text-[#e9edef] font-medium' : 'text-[#e9edef]'}`}>{name}</h3>
                    {lastMessage && (
                        <span className={`text-[12px] ${unreadCount > 0 ? 'text-[#00a884] font-medium' : 'text-[#8696a0]'}`}>
                            {formatTime(lastMessage.timestamp)}
                        </span>
                    )}
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center text-[14px] text-[#8696a0] truncate pr-2 w-full">
                         {lastMessage?.senderId === currentUserId && <span className="mr-1"><DoubleCheckIcon color="text-[#53bdeb]" /></span>}
                         <span className={`truncate ${unreadCount > 0 ? 'text-[#e9edef] font-medium' : ''}`}>{lastMessage ? lastMessage.text : 'No messages'}</span>
                    </div>
                    {unreadCount > 0 && (
                        <div className="w-[18px] h-[18px] bg-[#00a884] rounded-full flex items-center justify-center shrink-0">
                            <span className="text-[11px] text-[#111b21] font-bold">{unreadCount}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Main Chat List Component ---
const ChatListSidebar: React.FC = () => {
    const { users, currentUser, conversations, activeConversationId, setActiveConversationId } = useChat();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<'all' | 'unread' | 'favorites' | 'groups'>('all');
    const [view, setView] = useState<'main' | 'new-chat' | 'dialpad'>('main');
    const [showMenu, setShowMenu] = useState(false);

    if (view === 'dialpad') {
        return <DialpadSidebar onBack={() => setView('new-chat')} />;
    }

    if (view === 'new-chat') {
        return <NewChatSidebar onBack={() => setView('main')} onOpenDialpad={() => setView('dialpad')} />;
    }

    const filteredConversations = conversations.filter(conv => {
        const user = users[conv.userId];
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = 
            filter === 'all' ? true :
            filter === 'unread' ? conv.unreadCount > 0 :
            filter === 'favorites' ? false :
            filter === 'groups' ? false : true; 
        return matchesSearch && matchesFilter;
    }).sort((a, b) => (b.lastMessage?.timestamp.getTime() || 0) - (a.lastMessage?.timestamp.getTime() || 0));

    const FilterChip = ({ id, label }: { id: any, label: string }) => (
        <button 
            onClick={() => setFilter(id)}
            title={`Lọc theo ${label}`}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${filter === id ? 'bg-[#00a884] text-[#111b21]' : 'bg-[#202c33] text-[#8696a0] hover:bg-[#2a3942]'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="flex flex-col h-full bg-[#111b21] w-full border-r border-[#2f3b43] animate-fade-in">
             {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#111b21] shrink-0 h-[60px]">
                <h1 className="text-[20px] font-bold text-[#e9edef] ml-2">WhatsApp</h1>
                <div className="flex items-center gap-5 relative">
                    <div className="relative" title="Đoạn chat mới">
                        <NewChatIcon onClick={() => setView('new-chat')} />
                    </div>
                    <div onClick={() => setShowMenu(!showMenu)} className="relative" title="Menu">
                        <MenuIcon />
                        {showMenu && <MenuDropdown onClose={() => setShowMenu(false)} />}
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="px-3 pb-2 bg-[#111b21] flex items-center shrink-0">
                <div className="flex-1 flex items-center bg-[#202c33] rounded-lg px-3 py-[7px]">
                    <div className="mr-4 pl-1 rotate-90 md:rotate-0">
                         <SearchIcon />
                    </div>
                    <input 
                        type="text" 
                        placeholder="Hỏi Meta AI hoặc Tìm kiếm" 
                        className="bg-transparent border-none outline-none text-sm w-full text-[#e9edef] placeholder-[#8696a0]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* Filters */}
            <div className="px-3 py-2 flex gap-2 overflow-x-auto no-scrollbar mb-1">
                <FilterChip id="all" label="Tất cả" />
                <FilterChip id="unread" label="Chưa đọc" />
                <FilterChip id="favorites" label="Mục yêu thích" />
                <FilterChip id="groups" label="Nhóm" />
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {filteredConversations.length === 0 ? (
                    <div className="text-center text-[#8696a0] mt-10 text-sm">
                        Không có đoạn chat nào
                    </div>
                ) : (
                    filteredConversations.map(conv => (
                        <ConversationItem 
                            key={conv.id}
                            {...conv}
                            name={users[conv.userId].name}
                            avatar={users[conv.userId].avatar}
                            isBot={users[conv.userId].isBot}
                            currentUserId={currentUser.id}
                            isActive={activeConversationId === conv.id}
                            onClick={() => setActiveConversationId(conv.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

// --- Main Sidebar Switcher ---
interface SidebarProps {
    activeTab?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab = 'chats' }) => {
    switch (activeTab) {
        case 'chats':
            return <ChatListSidebar />;
        case 'status':
            return <StatusSidebar />;
        case 'channels':
            return <ChannelsSidebar />;
        case 'communities':
            return <CommunitiesSidebar />;
        case 'media':
            return <MediaSidebar />;
        case 'settings':
            return <SettingsSidebar />;
        case 'profile':
            return <ProfileSidebar />;
        default:
            return <ChatListSidebar />;
    }
};
