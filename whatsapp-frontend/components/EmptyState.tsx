
import React from 'react';

interface EmptyStateProps {
    activeTab?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ activeTab = 'chats' }) => {
    
    // Default: Chat Empty State (Download Windows)
    if (activeTab === 'chats') {
        return (
            <div className="hidden md:flex flex-col items-center justify-center h-full bg-[#222e35] w-full border-b-[6px] border-[#00a884] relative animate-fade-in">
                <div className="max-w-[560px] text-center px-4">
                    <img 
                        src="https://static.whatsapp.net/rsrc.php/v3/y6/r/wa669ae.svg" 
                        alt="WhatsApp Web" 
                        className="w-[120px] md:w-[220px] opacity-100 mb-8 mx-auto invert-[.2]" 
                        style={{ filter: 'invert(1) opacity(0.5)' }} 
                    />
                    <h1 className="text-[32px] font-light mb-4 text-[#e9edef]">Tải xuống WhatsApp cho Windows</h1>
                    <p className="text-[14px] text-[#8696a0] leading-6 mb-8">
                        Hãy tải xuống ứng dụng cho Windows để gọi điện, chia sẻ màn hình và tận hưởng trải nghiệm nhanh hơn.
                    </p>
                    <button className="bg-[#00a884] text-[#111b21] hover:bg-[#008f6f] transition-colors rounded-full px-8 py-2.5 font-medium text-sm mb-12">
                        Tải xuống
                    </button>
                </div>
                
                <div className="absolute bottom-10 flex items-center gap-2 text-[#667781] text-xs">
                    <svg viewBox="0 0 10 12" width="10" height="12" className="fill-current text-[#667781]"><path d="M5.008 1.6c1.373 0 2.508 1.054 2.68 2.4h-5.36c.172-1.346 1.307-2.4 2.68-2.4zM2.08 4h5.856c.928 0 1.68.752 1.68 1.68v4.64c0 .928-.752 1.68-1.68 1.68H2.08c-.928 0-1.68-.752-1.68-1.68V5.68C.4 4.752 1.152 4 2.08 4z"></path></svg>
                    Các tin nhắn cá nhân của bạn được mã hóa đầu cuối
                </div>
            </div>
        );
    }

    // Status Empty State
    if (activeTab === 'status') {
        return (
            <div className="hidden md:flex flex-col items-center justify-center h-full bg-[#0b141a] w-full relative animate-fade-in">
                <div className="text-center">
                    <div className="mb-6 flex justify-center">
                         <svg viewBox="0 0 24 24" width="60" height="60" className="fill-[#8696a0] opacity-40">
                             <path d="M12 20.664a9.163 9.163 0 0 1-6.521-2.702.977.977 0 0 1 1.381-1.381 7.21 7.21 0 1 0 0-10.204.977.977 0 0 1-1.381-1.381 9.163 9.163 0 1 1 6.521 15.669zm0-1.954a7.209 7.209 0 0 1-5.116-2.119 5.255 5.255 0 1 1 0-7.436 7.209 7.209 0 0 1 5.116 9.555z"></path>
                             <circle cx="12" cy="12" r="5" className="fill-transparent stroke-[#8696a0] stroke-2 opacity-50"></circle>
                         </svg>
                    </div>
                    <h1 className="text-[17px] text-[#e9edef] mb-2 font-medium">Chia sẻ cập nhật trạng thái</h1>
                    <p className="text-[14px] text-[#8696a0]">
                        Chia sẻ ảnh, video và văn bản sẽ biến mất sau 24 giờ.
                    </p>
                </div>
                <div className="absolute bottom-10 flex items-center gap-2 text-[#667781] text-xs">
                    <svg viewBox="0 0 10 12" width="10" height="12" className="fill-current text-[#667781]"><path d="M5.008 1.6c1.373 0 2.508 1.054 2.68 2.4h-5.36c.172-1.346 1.307-2.4 2.68-2.4zM2.08 4h5.856c.928 0 1.68.752 1.68 1.68v4.64c0 .928-.752 1.68-1.68 1.68H2.08c-.928 0-1.68-.752-1.68-1.68V5.68C.4 4.752 1.152 4 2.08 4z"></path></svg>
                    Các cập nhật trạng thái của bạn được mã hóa đầu cuối
                </div>
            </div>
        );
    }

    // Channels Empty State
    if (activeTab === 'channels') {
        return (
            <div className="hidden md:flex flex-col items-center justify-center h-full bg-[#0b141a] w-full relative animate-fade-in">
                <div className="text-center">
                    <div className="mb-6 flex justify-center">
                         <svg viewBox="0 0 24 24" width="60" height="60" className="fill-[#8696a0] opacity-40">
                             <path d="M12.001 5.5A6.5 6.5 0 1 0 18.502 12 6.51 6.51 0 0 0 12.001 5.5zm0 11.5a5 5 0 1 1 5-5 5 5 0 0 1-5 5z"></path>
                         </svg>
                    </div>
                    <h1 className="text-[17px] text-[#e9edef] mb-2 font-medium">Khám phá kênh</h1>
                    <p className="text-[14px] text-[#8696a0] max-w-sm">
                        Giải trí, thể thao, tin tức, lối sống, con người và hơn thế nữa. Hãy theo dõi các kênh bạn quan tâm
                    </p>
                </div>
            </div>
        );
    }

    // Communities Empty State
    if (activeTab === 'communities') {
        return (
            <div className="hidden md:flex flex-col items-center justify-center h-full bg-[#0b141a] w-full relative animate-fade-in">
                <div className="text-center">
                    <div className="mb-6 flex justify-center">
                        <svg viewBox="0 0 24 24" width="60" height="60" className="fill-[#8696a0] opacity-40">
                             <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
                        </svg>
                    </div>
                    <h1 className="text-[17px] text-[#e9edef] mb-2 font-medium">Tạo cộng đồng</h1>
                    <p className="text-[14px] text-[#8696a0] max-w-sm">
                        Quy tụ thành viên vào các nhóm theo chủ đề dành cho thành viên và dễ dàng gửi cho họ thông báo của quản trị viên.
                    </p>
                </div>
                 <div className="absolute bottom-10 flex items-center gap-2 text-[#667781] text-xs">
                    <svg viewBox="0 0 10 12" width="10" height="12" className="fill-current text-[#667781]"><path d="M5.008 1.6c1.373 0 2.508 1.054 2.68 2.4h-5.36c.172-1.346 1.307-2.4 2.68-2.4zM2.08 4h5.856c.928 0 1.68.752 1.68 1.68v4.64c0 .928-.752 1.68-1.68 1.68H2.08c-.928 0-1.68-.752-1.68-1.68V5.68C.4 4.752 1.152 4 2.08 4z"></path></svg>
                    Các tin nhắn cá nhân của bạn trong cộng đồng được mã hóa đầu cuối
                </div>
            </div>
        );
    }

    return null;
};
