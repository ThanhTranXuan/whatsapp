
import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { ContactService } from '../services/contactService';
import { User } from '../types';

const ArrowBackIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="text-[#e9edef] fill-current cursor-pointer">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
    </svg>
);

const BackspaceIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#8696a0] hover:fill-[#e9edef] cursor-pointer">
        <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3 12.59L17.59 17 14 13.41 10.41 17 9 15.59 12.59 12 9 8.41 10.41 7 14 10.59 17.59 7 19 8.41 15.41 12 19 15.59z"></path>
    </svg>
);

const SearchIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current">
        <path d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"></path>
    </svg>
);

interface DialpadSidebarProps {
  onBack: () => void;
}

export const DialpadSidebar: React.FC<DialpadSidebarProps> = ({ onBack }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { startChatWithUser } = useChat();

  const handleNumberClick = (num: string) => {
    setPhoneNumber(prev => prev + num);
    setError(null);
  };

  const handleBackspace = () => {
    setPhoneNumber(prev => prev.slice(0, -1));
    setError(null);
  };

  const handleSearch = async () => {
      if (phoneNumber.length < 3) {
          setError("Số điện thoại quá ngắn");
          return;
      }

      setIsLoading(true);
      setError(null);

      try {
          // Call Service (Simulate Backend)
          const user = await ContactService.searchUserByPhone(phoneNumber);
          
          if (user) {
              startChatWithUser(user.id);
              onBack(); // Switch to chat view
          } else {
              setError("Số điện thoại này chưa đăng ký WhatsApp.");
          }
      } catch (err) {
          setError("Lỗi kết nối server.");
      } finally {
          setIsLoading(false);
      }
  };

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '+', '0'];

  return (
    <div className="flex flex-col h-full bg-[#111b21] animate-fade-in border-r border-[#2f3b43]">
      {/* Header */}
      <div className="h-[108px] bg-[#202c33] flex flex-col justify-end px-5 pb-4 shrink-0 border-b border-[#2f3b43]">
         <div className="flex items-center gap-8">
            <div onClick={onBack}>
                <ArrowBackIcon />
            </div>
            <h1 className="text-[19px] font-medium text-[#e9edef]">Số điện thoại</h1>
         </div>
      </div>

      <div className="flex-1 flex flex-col items-center pt-10 px-4">
          <div className="text-[#8696a0] text-[15px] mb-8 text-center px-4">
              Nhập số điện thoại để tìm và chat với người lạ (kể cả khi chưa lưu danh bạ).
          </div>

          {/* Input Display */}
          <div className="w-full max-w-[300px] mb-4 relative">
              <input 
                type="text" 
                value={phoneNumber}
                readOnly
                className="w-full bg-transparent text-center text-[28px] text-[#e9edef] border-b border-[#00a884] pb-2 outline-none tracking-wider"
              />
              {phoneNumber.length > 0 && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 p-2" onClick={handleBackspace}>
                      <BackspaceIcon />
                  </div>
              )}
          </div>

          {/* Feedback Area */}
          <div className="h-8 mb-6">
              {error && <p className="text-[#f15c6d] text-sm">{error}</p>}
              {isLoading && <p className="text-[#00a884] text-sm animate-pulse">Đang tìm kiếm...</p>}
          </div>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-x-8 gap-y-5 mb-8">
              {keys.map((key) => (
                  <button 
                    key={key}
                    onClick={() => handleNumberClick(key)}
                    className="text-[#e9edef] text-[24px] font-medium w-16 h-16 rounded-full hover:bg-[#202c33] transition-colors flex flex-col items-center justify-center border border-[#2a3942] active:bg-[#00a884] active:border-[#00a884] active:text-[#111b21]"
                  >
                      {key}
                      {['2','3','4','5','6','7','8','9'].includes(key) && (
                          <span className="text-[10px] text-[#8696a0] font-normal -mt-1 tracking-widest">
                              {key === '2' ? 'ABC' : key === '3' ? 'DEF' : key === '4' ? 'GHI' : key === '5' ? 'JKL' : key === '6' ? 'MNO' : key === '7' ? 'PQRS' : key === '8' ? 'TUV' : 'WXYZ'}
                          </span>
                      )}
                  </button>
              ))}
               <button 
                    onClick={handleBackspace}
                    className="text-[#e9edef] w-16 h-16 rounded-full hover:bg-[#202c33] transition-colors flex items-center justify-center"
               >
                   <BackspaceIcon />
               </button>
          </div>

          {/* Action Button */}
          <button 
            onClick={handleSearch}
            disabled={phoneNumber.length < 3 || isLoading}
            className={`w-[60px] h-[60px] rounded-full flex items-center justify-center transition-all shadow-lg ${phoneNumber.length >= 3 ? 'bg-[#00a884] hover:bg-[#008f6f] text-white cursor-pointer' : 'bg-[#202c33] text-[#8696a0] cursor-not-allowed'}`}
          >
              <SearchIcon />
          </button>
      </div>
    </div>
  );
};
