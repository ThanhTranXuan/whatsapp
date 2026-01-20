
import React, { useRef, useEffect } from 'react';
import { useChat } from '../context/ChatContext';
import { Notification } from '../types';

interface NotificationDropdownProps {
  onClose: () => void;
  onViewContacts: () => void;
}

const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
};

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ onClose, onViewContacts }) => {
  const { notifications, markNotificationAsRead, setActiveConversationId, conversations } = useChat();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleNotificationClick = (notification: Notification) => {
    markNotificationAsRead(notification.id);
    
    // Actions based on type
    if (notification.type === 'friend_request') {
        onViewContacts(); // Switch sidebar view to 'contacts'
    } else if (notification.type === 'message' && notification.referenceId) {
        // Try to find conversation, if not provided just close (referenceId implies conv id here)
        // In real app we might fetch it.
        const convExists = conversations.some(c => c.id === notification.referenceId);
        if (convExists) {
            setActiveConversationId(notification.referenceId || null);
        }
    }
    
    onClose();
  };

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-[50px] left-[70px] z-50 w-[320px] bg-white rounded-lg shadow-xl border border-[#e9edef] animate-fade-in origin-top-left"
    >
        <div className="p-3 border-b border-[#e9edef] flex justify-between items-center bg-[#f0f2f5] rounded-t-lg">
            <h3 className="font-medium text-[#111b21]">Notifications</h3>
            {notifications.some(n => !n.isRead) && (
                <span className="text-xs text-[#00a884] font-medium">
                    {notifications.filter(n => !n.isRead).length} new
                </span>
            )}
        </div>
        
        <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
            {notifications.length === 0 ? (
                <div className="p-8 text-center text-[#667781] text-sm">
                    No notifications
                </div>
            ) : (
                notifications.sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime()).map(notif => (
                    <div 
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif)}
                        className={`
                            px-4 py-3 cursor-pointer flex items-start gap-3 border-b border-[#f5f6f6] last:border-none
                            hover:bg-[#f5f6f6] transition-colors
                            ${!notif.isRead ? 'bg-[#e7fce3] hover:bg-[#d9fdd3]' : ''}
                        `}
                    >
                        <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${!notif.isRead ? 'bg-[#00a884]' : 'bg-transparent'}`}></div>
                        
                        <div className="flex-1">
                            <p className={`text-[14px] leading-snug mb-1 ${!notif.isRead ? 'font-medium text-[#111b21]' : 'text-[#3b4a54]'}`}>
                                {notif.content}
                            </p>
                            <span className="text-[11px] text-[#667781]">
                                {formatTime(notif.timestamp)}
                            </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    </div>
  );
};
