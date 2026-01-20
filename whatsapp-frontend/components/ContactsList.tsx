
import React from 'react';
import { useChat } from '../context/ChatContext';

const ArrowBackIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="text-white fill-current cursor-pointer">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-current text-white">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
    </svg>
);

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-current text-[#54656f]">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
);

interface ContactsListProps {
  onBack: () => void;
}

export const ContactsList: React.FC<ContactsListProps> = ({ onBack }) => {
  const { users, friends, friendRequests, acceptFriendRequest, rejectFriendRequest, startChatWithUser } = useChat();

  const handleStartChat = (userId: string) => {
    startChatWithUser(userId);
    // Usually we would close the panel here, but let's leave it to the user or parent component logic
    // For this UX, since sidebar switches mode, we should switch back to chats automatically
    onBack(); 
  };

  return (
    <div className="flex flex-col h-full bg-white animate-slide-in-left">
      {/* Header */}
      <div className="h-[108px] bg-[#008069] flex flex-col justify-end px-5 pb-4 shrink-0">
         <div className="flex items-center text-white gap-8">
            <div onClick={onBack}>
                <ArrowBackIcon />
            </div>
            <h1 className="text-[19px] font-medium">New Chat</h1>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        
        {/* Pending Requests Section */}
        {friendRequests.length > 0 && (
            <div className="mb-4">
                <div className="text-[#008069] text-[15px] font-normal px-8 py-4 uppercase tracking-wide">
                    Friend Requests ({friendRequests.length})
                </div>
                {friendRequests.map(req => {
                    const user = users[req.senderId];
                    if (!user) return null;
                    return (
                        <div key={req.id} className="flex items-center px-8 py-3 hover:bg-[#f5f6f6] cursor-default group">
                            <img src={user.avatar} alt={user.name} className="w-[49px] h-[49px] rounded-full object-cover" />
                            <div className="ml-4 flex-1 border-b border-[#e9edef] py-4 pr-2 flex justify-between items-center group-hover:border-none">
                                <div>
                                    <h3 className="text-[#111b21] text-[17px]">{user.name}</h3>
                                    <span className="text-[#667781] text-[14px]">Wants to connect</span>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => acceptFriendRequest(req.id)}
                                        className="w-9 h-9 bg-[#00a884] rounded-full flex items-center justify-center hover:shadow-md transition-shadow"
                                        title="Accept"
                                    >
                                        <CheckIcon />
                                    </button>
                                    <button 
                                        onClick={() => rejectFriendRequest(req.id)}
                                        className="w-9 h-9 bg-[#e9edef] rounded-full flex items-center justify-center hover:bg-[#d1d7db] transition-colors"
                                        title="Reject"
                                    >
                                        <CloseIcon />
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        )}

        {/* All Friends Section */}
        <div>
            <div className="text-[#008069] text-[15px] font-normal px-8 py-4 uppercase tracking-wide">
                All Contacts ({friends.length})
            </div>
            
            {friends.sort().map(userId => {
                const user = users[userId];
                if (!user) return null;

                return (
                     <div 
                        key={userId} 
                        onClick={() => handleStartChat(userId)}
                        className="flex items-center px-8 py-3 hover:bg-[#f5f6f6] cursor-pointer group"
                    >
                        <img src={user.avatar} alt={user.name} className="w-[49px] h-[49px] rounded-full object-cover" />
                        <div className="ml-4 flex-1 border-b border-[#e9edef] py-4 group-hover:border-none">
                             <h3 className="text-[#111b21] text-[17px]">{user.name}</h3>
                             <p className="text-[#667781] text-[14px]">{user.isOnline ? 'Available' : 'Busy'}</p>
                        </div>
                    </div>
                );
            })}
        </div>
      </div>
    </div>
  );
};
