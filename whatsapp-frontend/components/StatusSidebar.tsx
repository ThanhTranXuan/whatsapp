
import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';

const PlusIcon = ({ onClick }: { onClick?: () => void }) => (
    <svg onClick={onClick} viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1] cursor-pointer hover:fill-[#e9edef]">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
    </svg>
);

const MenuIcon = ({ onClick }: { onClick?: () => void }) => (
    <svg onClick={onClick} viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1] cursor-pointer hover:fill-[#e9edef]">
        <path d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"></path>
    </svg>
);

const AddStatusIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-[#00a884]">
         <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
    </svg>
);

const ImageIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-[#e9edef]">
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"></path>
    </svg>
);

const PenIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-[#e9edef]">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
    </svg>
);

export const StatusSidebar: React.FC = () => {
    const { currentUser } = useChat();
    const [showAddMenu, setShowAddMenu] = useState(false);
    const [showSettingsMenu, setShowSettingsMenu] = useState(false);
    const [showStatusItemMenu, setShowStatusItemMenu] = useState(false);

    const closeAll = () => {
        setShowAddMenu(false);
        setShowSettingsMenu(false);
        setShowStatusItemMenu(false);
    };

    return (
        <div className="flex flex-col h-full bg-[#111b21] w-full border-r border-[#2f3b43] animate-fade-in relative" onClick={closeAll}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#111b21] shrink-0 h-[60px]">
                <h1 className="text-[20px] font-bold text-[#e9edef] ml-2">Trạng thái</h1>
                <div className="flex items-center gap-5 mr-2 relative">
                    <div onClick={(e) => { e.stopPropagation(); setShowAddMenu(!showAddMenu); setShowSettingsMenu(false); setShowStatusItemMenu(false); }} title="Thêm trạng thái">
                        <PlusIcon />
                    </div>
                    <div onClick={(e) => { e.stopPropagation(); setShowSettingsMenu(!showSettingsMenu); setShowAddMenu(false); setShowStatusItemMenu(false); }} title="Menu">
                        <MenuIcon />
                    </div>

                    {/* Plus Menu (Header) */}
                    {showAddMenu && (
                        <div className="absolute top-10 right-8 bg-[#233138] rounded-md shadow-xl py-2 w-[180px] z-50 border border-[#2f3b43] animate-fade-in origin-top-right">
                            <div className="px-4 py-3 hover:bg-[#111b21] cursor-pointer flex items-center gap-3 text-[#d1d7db]">
                                <ImageIcon />
                                <span className="text-[14.5px]">Ảnh và video</span>
                            </div>
                            <div className="px-4 py-3 hover:bg-[#111b21] cursor-pointer flex items-center gap-3 text-[#d1d7db]">
                                <PenIcon />
                                <span className="text-[14.5px]">Văn bản</span>
                            </div>
                        </div>
                    )}

                    {/* Settings Menu */}
                     {showSettingsMenu && (
                        <div className="absolute top-10 right-0 bg-[#233138] rounded-md shadow-xl py-2 w-[220px] z-50 border border-[#2f3b43] animate-fade-in origin-top-right">
                            <div className="px-4 py-3 hover:bg-[#111b21] cursor-pointer text-[#d1d7db]">
                                <span className="text-[14.5px]">Quyền riêng tư đối với trạng thái</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-3">
                <div className="relative">
                    <div 
                        className="flex items-center gap-3 p-2 hover:bg-[#202c33] rounded-lg cursor-pointer transition-colors group relative z-10"
                        onClick={(e) => { 
                            e.stopPropagation(); 
                            setShowStatusItemMenu(!showStatusItemMenu);
                            setShowAddMenu(false); 
                            setShowSettingsMenu(false);
                        }}
                    >
                        <div className="relative">
                            <img 
                                src={currentUser.avatar} 
                                alt="My Status" 
                                className="w-[40px] h-[40px] rounded-full object-cover opacity-80"
                            />
                            <div className="absolute bottom-0 right-0 bg-[#202c33] rounded-full p-[2px]">
                                <div className="bg-[#202c33] rounded-full">
                                    <AddStatusIcon />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-[#e9edef] text-[17px]">Trạng thái của tôi</h2>
                            <p className="text-[#8696a0] text-[14px]">Nhấp để thêm cập nhật trạng thái</p>
                        </div>
                    </div>

                    {/* My Status Menu (Appears below the item) */}
                    {showStatusItemMenu && (
                        <div className="absolute top-16 left-4 bg-[#233138] rounded-md shadow-xl py-2 w-[180px] z-50 border border-[#2f3b43] animate-fade-in">
                            <div className="px-4 py-3 hover:bg-[#111b21] cursor-pointer flex items-center gap-3 text-[#d1d7db]">
                                <ImageIcon />
                                <span className="text-[14.5px]">Ảnh và video</span>
                            </div>
                            <div className="px-4 py-3 hover:bg-[#111b21] cursor-pointer flex items-center gap-3 text-[#d1d7db]">
                                <PenIcon />
                                <span className="text-[14.5px]">Văn bản</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Divider / Encryption notice */}
                <div className="mt-8 flex justify-center">
                    <div className="flex items-center gap-1.5 text-[#00a884] text-[11px] justify-center select-none">
                        <svg viewBox="0 0 10 12" width="10" height="12" className="fill-current"><path d="M5.008 1.6c1.373 0 2.508 1.054 2.68 2.4h-5.36c.172-1.346 1.307-2.4 2.68-2.4zM2.08 4h5.856c.928 0 1.68.752 1.68 1.68v4.64c0 .928-.752 1.68-1.68 1.68H2.08c-.928 0-1.68-.752-1.68-1.68V5.68C.4 4.752 1.152 4 2.08 4z"></path></svg>
                        <span className="text-[#8696a0] text-[10px] md:text-[11px]">Các nội dung cập nhật trạng thái của bạn</span>
                        <span className="font-medium cursor-pointer hover:underline">được mã hóa đầu cuối</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
