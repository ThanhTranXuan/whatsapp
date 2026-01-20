
import React, { useEffect, useRef } from 'react';
import { Message, User } from '../types';
import { MessageBubble } from './MessageBubble';

interface MessageListProps {
  messages: Message[];
  currentUser: User;
  users: Record<string, User>; // Nhận thêm danh sách users
  searchTerm?: string;
}

const LockIcon = () => (
    <svg viewBox="0 0 10 12" width="10" height="12" className="fill-current text-[#ffcc00] mr-1.5"><path d="M5.008 1.6c1.373 0 2.508 1.054 2.68 2.4h-5.36c.172-1.346 1.307-2.4 2.68-2.4zM2.08 4h5.856c.928 0 1.68.752 1.68 1.68v4.64c0 .928-.752 1.68-1.68 1.68H2.08c-.928 0-1.68-.752-1.68-1.68V5.68C.4 4.752 1.152 4 2.08 4z"></path></svg>
);

export const MessageList: React.FC<MessageListProps> = ({ messages, currentUser, users, searchTerm }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [messages]);

  // Filter messages if search term exists
  const filteredMessages = searchTerm 
      ? messages.filter(m => m.text.toLowerCase().includes(searchTerm.toLowerCase()))
      : messages;

  return (
    <div className="flex-1 overflow-y-auto p-0 chat-bg-dark relative custom-scrollbar z-0 w-full">
       {/* Background is handled by CSS class .chat-bg-dark via pseudo-element to prevent z-index overlap issues */}
      
      {/* 
          UPDATED CLASSNAMES:
          - Removed `max-w-[950px]` and `mx-auto` so it fills the width.
          - Changed padding to `px-4 md:px-10` for better spacing on wider screens.
      */}
      <div className="flex flex-col space-y-[2px] pb-2 w-full px-4 md:px-10 pt-4">
          
          {/* Encryption notice */}
          <div className="flex justify-center mb-6 mt-2">
              <div className="bg-[#182229] rounded-lg px-4 py-2 shadow-sm text-[12.5px] text-[#ffcc00] text-center max-w-[90%] select-none border border-[#182229] bg-opacity-95">
                  <span className="flex items-center justify-center leading-normal">
                      <LockIcon />
                      <span>Tin nhắn và cuộc gọi được mã hóa đầu cuối. Chỉ những người tham gia đoạn chat này mới có thể đọc, nghe hoặc chia sẻ.</span>
                  </span>
              </div>
          </div>

          {/* Date Divider (Simulated "Hôm nay") */}
          <div className="flex justify-center mb-6 sticky top-2 z-10">
              <div className="bg-[#182229] rounded-lg px-3 py-1.5 shadow-sm text-[12.5px] text-[#8696a0] font-medium uppercase tracking-wide border border-[#182229] opacity-95">
                  Hôm nay
              </div>
          </div>

          {filteredMessages.map((msg, index) => {
               const isFirstInSequence = index === 0 || filteredMessages[index - 1].senderId !== msg.senderId;
               // Tìm thông tin người gửi
               const sender = msg.senderId === currentUser.id ? currentUser : users[msg.senderId];
               
               return (
                  <div key={msg.id} className="animate-fade-in w-full">
                      <MessageBubble 
                          message={msg} 
                          isMe={msg.senderId === currentUser.id} 
                          isFirst={isFirstInSequence}
                          avatar={sender?.avatar} // Truyền avatar vào bubble
                      />
                  </div>
               );
          })}
          <div ref={messagesEndRef} />
      </div>
    </div>
  );
};
