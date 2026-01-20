
import React from 'react';
import { useAuth } from '../context/AuthContext';

interface NavigationRailProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

// Icons updated for sharper, thinner look
const ChatIcon = ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" width="24" height="24" className={active ? "fill-[#e9edef]" : "fill-[#aebac1]"}>
        <path d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3.987-3.708H7.041V7.4h10.962v1.936z"></path>
    </svg>
);

const StatusIcon = ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" width="24" height="24" className={active ? "fill-none stroke-[#e9edef] stroke-[2.5]" : "fill-none stroke-[#aebac1] stroke-2"}>
        <path d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.21 7.21 0 1 0 0-10.204.977.977 0 0 1-1.381-1.381 9.163 9.163 0 1 1 6.521 15.669zm0-1.954a7.209 7.209 0 0 1-5.116-2.119 5.255 5.255 0 1 1 0-7.436 7.209 7.209 0 0 1 5.116 9.555z"></path>
    </svg>
);

const CommunityIcon = ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" width="24" height="24" className={active ? "fill-[#e9edef]" : "fill-[#aebac1]"}>
        <path d="M12 20.2c-2.3 0-4.4-1.1-5.7-2.8l-.6.6c1.6 2 4 3.2 6.3 3.2 2.3 0 4.7-1.2 6.3-3.2l-.6-.6c-1.3 1.7-3.4 2.8-5.7 2.8zM2 13h2c0-3.3 2.7-6 6-6s6 2.7 6 6h2c0-4.4-3.6-8-8-8s-8 3.6-8 8z"></path>
    </svg>
);

const ChannelsIcon = ({ active }: { active: boolean }) => (
     <svg viewBox="0 0 24 24" width="24" height="24" className={active ? "fill-[#e9edef]" : "fill-[#aebac1]"}>
         <path d="M12.001 5.5A6.5 6.5 0 1 0 18.502 12 6.51 6.51 0 0 0 12.001 5.5zm0 11.5a5 5 0 1 1 5-5 5 5 0 0 1-5 5z"></path>
    </svg>
);

const SettingsIcon = ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" width="24" height="24" className={active ? "fill-[#e9edef]" : "fill-[#aebac1]"}>
        <path d="M19.137 13.062c.082-.305.125-.617.125-.937 0-.32-.043-.632-.125-.937l2.036-1.577c.18-.137.234-.407.121-.614l-1.92-3.32a.476.476 0 0 0-.585-.215l-2.389.956c-.504-.382-1.034-.703-1.616-.937l-.358-2.543a.481.481 0 0 0-.476-.41h-3.84a.48.48 0 0 0-.477.41l-.357 2.543c-.582.234-1.112.555-1.615.937l2.39.956a.476.476 0 0 0 .584-.215l1.92-3.32c.114-.207.06-.477-.12-.614l-2.037-1.577zM12 15.686a3.563 3.563 0 1 1 0-7.126 3.563 3.563 0 0 1 0 7.126z"></path>
    </svg>
);

const MediaFilesIcon = ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" width="24" height="24" className={active ? "fill-[#e9edef]" : "fill-[#aebac1]"}>
        <path d="M10.25 15.5H7.75l2.25-3 1.5 2 2.25-3 3 4h-6.5zm-5-10.75h13.5c.966 0 1.75.784 1.75 1.75v10.5c0 .966-.784 1.75-1.75 1.75H5.25c-.966 0-1.75-.784-1.75-1.75V6.5c0-.966.784-1.75 1.75-1.75zM4 17h16V6.5H4V17z"></path>
    </svg>
);

export const NavigationRail: React.FC<NavigationRailProps> = ({ activeTab, setActiveTab }) => {
    const { user } = useAuth();
    
    const NavItem = ({ id, icon, title }: { id: string, icon: React.ReactNode, title: string }) => (
        <div 
            onClick={() => setActiveTab(id)}
            title={title}
            className={`w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer mb-2 transition-all duration-200 ${activeTab === id ? 'bg-[#374248]' : 'hover:bg-[#233138]'}`}
        >
            {icon}
        </div>
    );

    return (
        <div className="w-[64px] bg-[#202c33] border-r border-[#2f3b43] flex flex-col items-center py-3 justify-between h-full shrink-0 z-30 shadow-[1px_0_0_0_#2f3b43]">
            <div className="flex flex-col items-center gap-1">
                <NavItem id="chats" title="Đoạn chat" icon={<ChatIcon active={activeTab === 'chats'} />} />
                <NavItem id="status" title="Trạng thái" icon={<StatusIcon active={activeTab === 'status'} />} />
                <NavItem id="channels" title="Kênh" icon={<ChannelsIcon active={activeTab === 'channels'} />} />
                <NavItem id="communities" title="Cộng đồng" icon={<CommunityIcon active={activeTab === 'communities'} />} />
            </div>

            <div className="flex flex-col items-center gap-3 mb-2">
                <NavItem id="media" title="File phương tiện" icon={<MediaFilesIcon active={activeTab === 'media'} />} />
                <NavItem id="settings" title="Cài đặt" icon={<SettingsIcon active={activeTab === 'settings'} />} />
                <div 
                    className={`w-8 h-8 cursor-pointer rounded-full box-border transition-all ${activeTab === 'profile' ? 'ring-2 ring-[#00a884] ring-offset-2 ring-offset-[#202c33]' : ''}`}
                    onClick={() => setActiveTab('profile')}
                    title="Hồ sơ"
                >
                    <img 
                        src={user?.avatar} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};
