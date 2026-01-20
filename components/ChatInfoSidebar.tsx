
import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current text-[#aebac1] cursor-pointer hover:text-[#e9edef] transition-colors">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
);

const BlockIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current text-[#f15c6d] mr-4">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"></path>
    </svg>
);

const ThumbIcon = () => (
     <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current text-[#f15c6d] mr-4">
         <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
     </svg>
);

export const ChatInfoSidebar: React.FC = () => {
    const { activeConversation, users, toggleChatInfo, reportUser } = useChat();
    const [isViewingAvatar, setIsViewingAvatar] = useState(false);

    if (!activeConversation) return null;
    const user = users[activeConversation.userId];

    return (
        <div className="flex flex-col h-full bg-[#0b141a] border-l border-[#2f3b43] w-full md:w-[380px] animate-fade-in text-[#e9edef]">
            {/* Header */}
            <div className="h-[60px] bg-[#202c33] flex items-center px-6 border-b border-[#2f3b43] shrink-0">
                <div onClick={toggleChatInfo} className="mr-6">
                    <CloseIcon />
                </div>
                <div className="text-[#e9edef] font-medium text-[16px]">Thông tin liên hệ</div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Profile Section */}
                <div className="bg-[#111b21] p-8 flex flex-col items-center shadow-sm mb-3">
                    <img 
                        src={user.avatar} 
                        alt={user.name} 
                        onClick={() => setIsViewingAvatar(true)}
                        className="w-[200px] h-[200px] rounded-full object-cover mb-4 cursor-pointer hover:opacity-90 transition-opacity" 
                    />
                    <h2 className="text-[22px] text-[#e9edef] font-normal mb-1">{user.name}</h2>
                    <p className="text-[16px] text-[#8696a0]">{user.phone || '+84 90 123 4567'}</p>
                </div>

                {/* About */}
                <div className="bg-[#111b21] p-4 shadow-sm mb-3 px-8">
                    <div className="text-[#8696a0] text-[14px] mb-1">Giới thiệu</div>
                    <div className="text-[#e9edef] text-[16px]">{user.bio || 'Available'}</div>
                </div>

                {/* Media, Links, Docs */}
                <div className="bg-[#111b21] p-4 shadow-sm mb-3 px-8 cursor-pointer hover:bg-[#202c33] transition-colors flex justify-between items-center">
                    <div className="text-[#e9edef] text-[16px]">File phương tiện, liên kết và tài liệu</div>
                    <div className="flex items-center gap-2">
                        <span className="text-[#8696a0] text-[14px]">12 &gt;</span>
                    </div>
                </div>

                {/* Options */}
                <div className="bg-[#111b21] p-4 shadow-sm mb-3 px-8">
                     <div className="flex justify-between items-center py-3 cursor-pointer hover:bg-[#202c33] -mx-8 px-8 transition-colors">
                         <div className="text-[#e9edef] text-[16px]">Tắt thông báo</div>
                         <div className="w-10 h-5 bg-[#374045] rounded-full relative cursor-pointer">
                             <div className="w-5 h-5 bg-[#8696a0] border border-[#374045] rounded-full shadow-sm absolute left-0"></div>
                         </div>
                     </div>
                     <div className="flex justify-between items-center py-3 cursor-pointer hover:bg-[#202c33] -mx-8 px-8 transition-colors">
                         <div className="text-[#e9edef] text-[16px]">Tin nhắn tự hủy</div>
                         <div className="flex items-center gap-2">
                            <span className="text-[#8696a0] text-[14px]">Tắt &gt;</span>
                        </div>
                     </div>
                     <div className="flex justify-between items-center py-3 cursor-pointer hover:bg-[#202c33] -mx-8 px-8 transition-colors">
                         <div className="text-[#e9edef] text-[16px]">Mã hóa</div>
                         <div className="flex items-center gap-2">
                             <span className="text-[#00a884] text-[12px] border border-[#00a884] px-2 py-0.5 rounded-full">Đã mã hóa</span>
                        </div>
                     </div>
                </div>

                {/* Actions */}
                <div className="bg-[#111b21] shadow-sm mb-8">
                    <div 
                        className="p-4 px-8 flex items-center cursor-pointer hover:bg-[#202c33] transition-colors"
                        onClick={() => alert(`Blocked ${user.name}`)}
                    >
                        <BlockIcon />
                        <span className="text-[#f15c6d] font-medium text-[16px]">Chặn {user.name}</span>
                    </div>
                    <div 
                        className="p-4 px-8 flex items-center cursor-pointer hover:bg-[#202c33] transition-colors"
                        onClick={() => reportUser(user.id, "Reported via Info Panel")}
                    >
                        <ThumbIcon />
                        <span className="text-[#f15c6d] font-medium text-[16px]">Báo cáo {user.name}</span>
                    </div>
                </div>
            </div>

            {/* Avatar Viewer Modal */}
            {isViewingAvatar && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in"
                    onClick={() => setIsViewingAvatar(false)}
                >
                    <div className="relative max-w-[90vw] max-h-[90vh]">
                        <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()} // Prevent close on image click
                        />
                        <div className="absolute top-4 right-4 cursor-pointer p-2 bg-black/50 rounded-full hover:bg-black/70 text-white" onClick={() => setIsViewingAvatar(false)}>
                            <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
