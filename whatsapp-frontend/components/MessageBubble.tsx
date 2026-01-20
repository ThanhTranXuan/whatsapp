
import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
  message: Message;
  isMe: boolean;
  isFirst?: boolean;
  avatar?: string; // Thêm prop avatar
}

const DoubleCheckIcon = ({ color }: { color: string }) => (
    <svg viewBox="0 0 16 11" height="11" width="16" className={`${color} fill-current`}>
        <path d="M11.5 0L6.707 4.793 4.5 2.586 3.086 4 6.707 7.621 13 1.414 11.5 0z" />
        <path d="M15 1.414L7.5 8.914 6 7.414 7.5 5.914 13.596 0 15 1.414zM4.5 7.5L3 6 0 9 4.5 13.5 8.793 9.207 7.293 7.707 4.5 10.5 4.5 7.5z" transform="translate(1 -2.5)" />
    </svg>
);

const FileGenericIcon = () => (
    <svg viewBox="0 0 24 24" width="30" height="30" className="fill-[#8696a0] text-[#54656f]">
        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path>
    </svg>
);

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isMe, isFirst = true, avatar }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
  };

  // Dark Mode Colors
  // Me: #005c4b (Dark Green)
  // Other: #202c33 (Dark Gray)
  const bubbleBg = isMe ? 'bg-[#005c4b]' : 'bg-[#202c33]';

  return (
    <div className={`flex w-full mb-1 ${isMe ? 'justify-end' : 'justify-start'} items-end group`}>
      
      {/* Avatar for Other Users (Left Side) */}
      {!isMe && (
        <div className="w-[30px] flex-shrink-0 mr-2 flex flex-col justify-end">
            {isFirst ? (
                <img 
                    src={avatar || 'https://via.placeholder.com/30'} 
                    alt="Avatar" 
                    className="w-[28px] h-[28px] rounded-full object-cover"
                />
            ) : (
                <div className="w-[28px]"></div> // Spacer to keep alignment
            )}
        </div>
      )}

      <div 
        className={`
          relative max-w-[85%] md:max-w-[65%] text-[14.2px] text-[#e9edef]
          ${bubbleBg}
          ${isMe && isFirst ? 'rounded-tr-none rounded-lg' : isMe ? 'rounded-lg mr-[8px]' : ''}
          ${!isMe && isFirst ? 'rounded-tl-none rounded-lg' : !isMe ? 'rounded-lg ml-[8px]' : ''}
          shadow-sm
        `}
      >
        {/* Tail */}
        {isFirst && (
            <span 
                className={`absolute top-0 w-[8px] h-[13px] 
                ${isMe ? '-right-[8px] bg-[#005c4b]' : '-left-[8px] bg-[#202c33]'}`}
                style={{
                    clipPath: isMe 
                        ? 'polygon(0 0, 100% 0, 0 100%)' 
                        : 'polygon(0 0, 100% 0, 100% 100%)'
                }}
            ></span>
        )}

        {/* Attachment */}
        {message.attachment && (
            <div className="p-1 pb-1">
                <div className="flex items-center gap-3 bg-[rgba(0,0,0,0.1)] p-3 rounded-md mb-1 min-w-[240px]">
                    <div className="w-10 h-12 bg-[#2a3942] rounded flex items-center justify-center shrink-0">
                        <FileGenericIcon />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="text-[#e9edef] font-medium truncate text-sm">
                            {message.attachment.fileName}
                        </div>
                        <div className="text-[#8696a0] text-xs flex items-center mt-0.5">
                            {message.attachment.fileSize} • {message.attachment.fileType.split('/')[1]?.toUpperCase() || 'FILE'}
                        </div>
                    </div>
                </div>
            </div>
        )}

        {/* Text */}
        <div className={`px-2 pt-1.5 pb-[8px] leading-[19px] whitespace-pre-wrap`}>
            {message.text}
            {/* Spacer for timestamp to sit next to text if space permits, roughly */}
            <span className="inline-block w-[70px]"></span>
        </div>
        
        {/* Timestamp & Status (Absolute bottom right) */}
        <div className="absolute bottom-1 right-2 flex items-center space-x-1">
          <span className="text-[11px] text-[rgba(255,255,255,0.6)]">
            {formatTime(message.timestamp)}
          </span>
          {isMe && (
            <div className="mb-[2px]">
                <DoubleCheckIcon color={message.status === 'read' ? 'text-[#53bdeb]' : 'text-[rgba(255,255,255,0.6)]'} />
            </div>
          )}
        </div>
      </div>

      {/* Optional: Avatar for Me (Right Side) - Uncomment if you want avatar for your own messages too */}
      {/* {isMe && (
        <div className="w-[30px] flex-shrink-0 ml-2 flex flex-col justify-end">
            {isFirst ? (
                <img 
                    src={avatar || 'https://via.placeholder.com/30'} 
                    alt="My Avatar" 
                    className="w-[28px] h-[28px] rounded-full object-cover"
                />
            ) : (
                <div className="w-[28px]"></div>
            )}
        </div>
      )} */}

    </div>
  );
};
