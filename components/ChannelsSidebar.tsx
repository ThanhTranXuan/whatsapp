
import React, { useState } from 'react';

const PlusIcon = ({ onClick }: { onClick?: () => void }) => (
    <svg onClick={onClick} viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1] cursor-pointer hover:fill-[#e9edef]">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
    </svg>
);

const CreateChannelIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-[#aebac1] mr-3">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
    </svg>
);

const SearchChannelIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-[#aebac1] mr-3">
        <path d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path>
    </svg>
);

const VerifiedIcon = () => (
    <svg viewBox="0 0 18 18" width="14" height="14" className="fill-[#00a884] ml-1">
        <path d="M9 17.5l-2.15-1.56-2.63.63-.84-2.58-2.64-.53.53-2.64-2.58-.84.63-2.63L-1.56 9l1.56-2.15-.63-2.63 2.58-.84-.53-2.64 2.64-.53.84-2.58 2.63.63L9 .5l2.15 1.56 2.63-.63.84 2.58 2.64.53-.53 2.64 2.58.84-.63 2.63 1.56 2.15-1.56 2.15.63 2.63-2.58.84.53 2.64-2.64.53-.84 2.58-2.63-.63L9 17.5zM6.7 12.8L13.3 6.2 11.9 4.8 6.7 10 4.1 7.4 2.7 8.8l4 4z" transform="translate(1.5 1.5) scale(0.8)"></path>
    </svg>
);

const MOCK_CHANNELS = [
    { id: 1, name: 'Liverpool Football Club', followers: '18,4 Tr', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Liverpool_FC.svg/1200px-Liverpool_FC.svg.png' },
    { id: 2, name: 'Man City', followers: '23,2 Tr', img: 'https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg' },
    { id: 3, name: 'Premier League', followers: '18,1 Tr', img: 'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg' },
    { id: 4, name: 'Real Madrid C.F.', followers: '68 Tr', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/5/56/Real_Madrid_CF.svg/1200px-Real_Madrid_CF.svg.png' },
    { id: 5, name: 'New York Post', followers: '5,3 Tr', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/New_York_Post_logo.svg' }
];

export const ChannelsSidebar: React.FC = () => {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="flex flex-col h-full bg-[#111b21] w-full border-r border-[#2f3b43] animate-fade-in" onClick={() => setShowMenu(false)}>
             {/* Header */}
             <div className="flex items-center justify-between px-4 py-3 bg-[#111b21] shrink-0 h-[60px]">
                <h1 className="text-[20px] font-bold text-[#e9edef] ml-2">Kênh</h1>
                <div className="flex items-center gap-5 mr-2 relative">
                    <div onClick={(e) => { e.stopPropagation(); setShowMenu(!showMenu); }} title="Tạo kênh">
                        <PlusIcon />
                    </div>

                     {/* Add Menu */}
                    {showMenu && (
                        <div className="absolute top-10 right-0 bg-[#233138] rounded-md shadow-xl py-2 w-[180px] z-50 border border-[#2f3b43] animate-fade-in origin-top-right">
                            <div className="px-4 py-3 hover:bg-[#111b21] cursor-pointer flex items-center text-[#d1d7db]">
                                <CreateChannelIcon />
                                <span className="text-[14.5px]">Tạo kênh</span>
                            </div>
                            <div className="px-4 py-3 hover:bg-[#111b21] cursor-pointer flex items-center text-[#d1d7db]">
                                <SearchChannelIcon />
                                <span className="text-[14.5px]">Tìm kênh</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                <h2 className="text-[17px] text-[#e9edef] font-medium leading-6 mb-2">Luôn cập nhật thông tin về các chủ đề bạn yêu thích</h2>
                <p className="text-[14px] text-[#8696a0] mb-6">Tìm kênh để theo dõi ở bên dưới</p>

                <div className="space-y-4">
                    {MOCK_CHANNELS.map(channel => (
                        <div key={channel.id} className="flex items-center justify-between group cursor-pointer">
                            <div className="flex items-center gap-3">
                                <img src={channel.img} alt={channel.name} className="w-[48px] h-[48px] rounded-full object-contain bg-white p-[2px]" />
                                <div>
                                    <div className="flex items-center">
                                        <span className="text-[#e9edef] font-medium">{channel.name}</span>
                                        <VerifiedIcon />
                                    </div>
                                    <div className="text-[#8696a0] text-[13px]">{channel.followers} người theo dõi</div>
                                </div>
                            </div>
                            <button className="text-[#00a884] bg-[#1c2a30] hover:bg-[#23333b] border border-[#2f3b43] px-4 py-1.5 rounded-full text-sm font-medium transition-colors">
                                Theo dõi
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-8 space-y-3">
                     <button className="w-full border border-[#2f3b43] text-[#00a884] hover:bg-[#1c2a30] py-2.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                        <svg viewBox="0 0 24 24" width="20" height="20" className="fill-current"><path d="M4 8h4V4H4v4zm6 12h4v-4h-4v4zm-6 0h4v-4H4v4zm0-6h4v-4H4v4zm6 0h4v-4h-4v4zm6-10v4h4V4h-4zm0 6h4v-4h-4v4zm0 6h4v-4h-4v4z"></path></svg>
                        Khám phá thêm
                     </button>
                     <button className="w-full border border-[#2f3b43] text-[#00a884] hover:bg-[#1c2a30] py-2.5 rounded-full text-sm font-medium flex items-center justify-center gap-2 transition-colors">
                        <svg viewBox="0 0 24 24" width="20" height="20" className="fill-current"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path></svg>
                        Tạo kênh
                     </button>
                </div>
            </div>
        </div>
    );
};
