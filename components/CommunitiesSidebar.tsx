
import React, { useState } from 'react';

const PlusIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#aebac1] cursor-pointer hover:fill-[#e9edef]">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
    </svg>
);

const BackIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#e9edef] cursor-pointer">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
    </svg>
);

export const CommunitiesSidebar: React.FC = () => {
    const [isCreating, setIsCreating] = useState(false);

    if (isCreating) {
        return (
            <div className="flex flex-col h-full bg-[#111b21] w-full border-r border-[#2f3b43] animate-slide-in-left">
                {/* Header */}
                <div className="flex items-center gap-6 px-4 py-3 bg-[#202c33] shrink-0 h-[60px] border-b border-[#2f3b43]">
                    <div onClick={() => setIsCreating(false)} title="Quay lại">
                        <BackIcon />
                    </div>
                    <h1 className="text-[19px] font-medium text-[#e9edef]">Cộng đồng mới</h1>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col items-center justify-center text-center">
                    <div className="bg-[#202c33] p-8 rounded-full mb-6 relative w-[120px] h-[120px] flex items-center justify-center">
                         <div className="bg-[#e9edef] rounded-md w-[60px] h-[80px] flex flex-col items-center justify-center relative">
                             <div className="w-full h-2 bg-[#25d366] mt-2 mb-1"></div>
                             <div className="w-[40px] h-1 bg-[#aebac1] my-1 rounded"></div>
                             <div className="w-[40px] h-1 bg-[#aebac1] my-1 rounded"></div>
                             <div className="absolute -bottom-2 -right-4 w-[40px] h-[40px] bg-[#25d366] rounded-full flex items-center justify-center">
                                 <svg viewBox="0 0 24 24" width="20" height="20" className="fill-[#111b21]"><path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path></svg>
                             </div>
                         </div>
                    </div>

                    <h2 className="text-[24px] text-[#e9edef] font-medium mb-4">Tạo cộng đồng mới</h2>
                    
                    <p className="text-[#8696a0] text-[15px] mb-8 leading-6 max-w-[400px]">
                        Quy tụ những người ở cùng khu vực, cùng trường và hơn thế nữa. Bạn có thể tạo các nhóm theo chủ đề cho thành viên và dễ dàng gửi cho họ thông báo của quản trị viên.
                    </p>

                    <a href="#" className="text-[#00a884] text-[14px] hover:underline mb-12">Xem ví dụ về cộng đồng</a>

                    <button className="bg-[#00a884] hover:bg-[#008f6f] text-[#111b21] font-medium py-2.5 px-8 rounded-full text-sm transition-colors">
                        Bắt đầu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-[#111b21] w-full border-r border-[#2f3b43] animate-fade-in">
             {/* Header */}
             <div className="flex items-center justify-between px-4 py-3 bg-[#111b21] shrink-0 h-[60px]">
                <h1 className="text-[20px] font-bold text-[#e9edef] ml-2">Cộng đồng</h1>
                <div className="flex items-center gap-5 mr-2" onClick={() => setIsCreating(true)} title="Tạo cộng đồng">
                    <PlusIcon />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col items-center">
                 <div className="mt-4 mb-6">
                    {/* Placeholder image resembling the provided screenshot */}
                    <img 
                        src="https://static.whatsapp.net/rsrc.php/v3/yO/r/PsM3B2l2m5k.png" 
                        alt="Communities" 
                        className="w-[200px] h-[100px] object-cover opacity-90 rounded-lg"
                        style={{ objectPosition: 'center' }}
                    />
                 </div>

                 <h2 className="text-[20px] text-[#e9edef] font-medium mb-2 text-center">Luôn kết nối với cộng đồng</h2>
                 
                 <p className="text-[#8696a0] text-[14px] text-center mb-1 leading-5">
                    Cộng đồng là không gian quy tụ thành viên vào các nhóm theo chủ đề và dễ dàng gửi cho họ thông báo của quản trị viên. Mọi cộng đồng mà bạn tham gia sẽ xuất hiện ở đây.
                 </p>

                 <div className="mb-8 mt-2">
                    <a href="#" className="text-[#00a884] text-[13px] hover:underline flex items-center gap-1">
                        Xem ví dụ về cộng đồng
                        <svg viewBox="0 0 24 24" width="14" height="14" className="fill-current"><path d="M10 17l5-5-5-5v10z"></path></svg>
                    </a>
                 </div>

                 <button onClick={() => setIsCreating(true)} className="bg-[#00a884] hover:bg-[#008f6f] text-[#111b21] font-medium py-2.5 px-6 rounded-full text-sm transition-colors w-full max-w-[280px]">
                    Khởi tạo cộng đồng của bạn
                 </button>
            </div>
        </div>
    );
};
