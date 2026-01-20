
import React, { useState } from 'react';

const CloseIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1] cursor-pointer hover:fill-[#e9edef]">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
    </svg>
);

const FilterIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-[#aebac1] cursor-pointer">
        <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"></path>
    </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" className="text-[#aebac1] fill-current">
     <path d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path>
  </svg>
);

const EmptyMediaIcon = () => (
    <svg viewBox="0 0 24 24" width="100" height="100" className="fill-none">
        <path fill="#53bdeb" d="M19.9 5.3a1.58 1.58 0 0 0-2.3 0L14.7 8.2l-1.6-1.6a1.58 1.58 0 0 0-2.3 0L4.3 13.1a1.58 1.58 0 0 0 0 2.3l6.5 6.5a1.58 1.58 0 0 0 2.3 0l6.8-6.8a1.58 1.58 0 0 0 0-2.3L19.9 5.3z"></path>
        <path fill="#e9edef" d="M17.6 15.4l-4.5 4.5-6.5-6.5 6.5-6.5 1.6 1.6 2.9 2.9z"></path>
        <circle fill="#53bdeb" cx="13" cy="11.5" r="1.5"></circle>
        <path fill="#53bdeb" d="M13.1 14.5l-2.6 2.6-1.9-1.9-1.9 1.9 4.5 4.5z"></path>
    </svg>
);

export const MediaSidebar: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'media' | 'docs' | 'links'>('media');

    return (
        <div className="flex flex-col h-full bg-[#111b21] w-full border-r border-[#2f3b43] animate-fade-in">
             {/* Header */}
             <div className="flex flex-col px-4 pt-4 pb-0 bg-[#111b21] shrink-0">
                <div className="flex items-center justify-between mb-4">
                     <h1 className="text-[20px] font-bold text-[#e9edef]">File phương tiện</h1>
                     <div className="flex gap-4">
                        <FilterIcon />
                        <SearchIcon />
                        <CloseIcon />
                     </div>
                </div>
                <div className="text-[14px] text-[#8696a0] mb-4">File phương tiện từ tất cả đoạn chat</div>
                
                {/* Tabs */}
                <div className="flex items-center gap-6 border-b border-[#2f3b43]">
                    <button 
                        onClick={() => setActiveTab('media')}
                        className={`pb-2 text-[14px] font-medium transition-colors border-b-[3px] ${activeTab === 'media' ? 'text-[#00a884] border-[#00a884]' : 'text-[#8696a0] border-transparent hover:text-[#e9edef]'}`}
                    >
                        File phương tiện
                    </button>
                    <button 
                        onClick={() => setActiveTab('docs')}
                        className={`pb-2 text-[14px] font-medium transition-colors border-b-[3px] ${activeTab === 'docs' ? 'text-[#00a884] border-[#00a884]' : 'text-[#8696a0] border-transparent hover:text-[#e9edef]'}`}
                    >
                        Tài liệu
                    </button>
                    <button 
                        onClick={() => setActiveTab('links')}
                        className={`pb-2 text-[14px] font-medium transition-colors border-b-[3px] ${activeTab === 'links' ? 'text-[#00a884] border-[#00a884]' : 'text-[#8696a0] border-transparent hover:text-[#e9edef]'}`}
                    >
                        Liên kết
                    </button>
                </div>
            </div>

            {/* Empty State Content */}
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                 <div className="mb-6 relative">
                    <img 
                        src="https://static.whatsapp.net/rsrc.php/v3/yO/r/PsM3B2l2m5k.png" 
                        alt="No Media" 
                        className="w-[150px] opacity-10 hidden" // Placeholder if needed
                    />
                    <div className="relative">
                        <svg viewBox="0 0 100 100" width="120" height="120">
                            {/* Generic Image Icon */}
                            <rect x="20" y="25" width="60" height="50" rx="5" fill="#202c33" stroke="#374045" strokeWidth="2"/>
                            <path d="M25 65 L45 45 L55 55 L65 35 L75 65 Z" fill="#374045"/>
                            <circle cx="35" cy="35" r="5" fill="#374045"/>
                            
                            {/* Paperclip/Attachment styling on top */}
                            <g transform="translate(60, 10) rotate(0)">
                                <path d="M10 20 C10 10 25 10 25 20 L25 40 C25 55 5 55 5 40 L5 20" fill="none" stroke="#25d366" strokeWidth="4" strokeLinecap="round"/>
                            </g>
                        </svg>
                    </div>
                 </div>
                 <h3 className="text-[#e9edef] text-[18px] font-normal mb-1">Không có kết quả gần đây</h3>
                 <p className="text-[#8696a0] text-[14px] max-w-xs leading-5">
                    Để tìm file phương tiện từ hơn 14 ngày trước, hãy thử tìm kiếm trong các đoạn chat của bạn.
                 </p>
            </div>
        </div>
    );
};
