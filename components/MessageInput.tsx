
import React, { useState, useRef, useEffect } from 'react';
import { Attachment } from '../types';

// --- Icons for Input Bar ---
const SendIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#8696a0]">
        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"></path>
    </svg>
);

const MicIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-[#8696a0] hover:fill-[#cfd7dc] cursor-pointer transition-colors">
        <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z"></path>
        <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z"></path>
    </svg>
);

const SmileyIcon = ({ onClick }: { onClick: () => void }) => (
    <svg onClick={onClick} viewBox="0 0 24 24" width="26" height="26" className="fill-[#8696a0] cursor-pointer hover:fill-[#cfd7dc] transition-colors mr-2"><path d="M12 22.75C6.072 22.75 1.25 17.928 1.25 12S6.072 1.25 12 1.25 22.75 6.072 22.75 12 17.928 22.75 12 22.75zm0-20C6.9 2.75 2.75 6.9 2.75 12S6.9 21.25 12 21.25s9.25-4.15 9.25-9.25S17.1 2.75 12 2.75zM8.5 11c1.241 0 2.25-1.009 2.25-2.25S9.741 6.5 8.5 6.5 6.25 7.509 6.25 8.75 7.259 11 8.5 11zm7 0c1.241 0 2.25-1.009 2.25-2.25S16.741 6.5 15.5 6.5 13.25 7.509 13.25 8.75 14.259 11 15.5 11zm-7 4.5c.988 2.378 3.328 4.05 6 4.05s5.012-1.672 6-4.05H8.5z"></path></svg>
);

const PlusIcon = ({ onClick, isOpen }: { onClick: () => void, isOpen: boolean }) => (
    <svg 
        onClick={onClick} 
        viewBox="0 0 24 24" 
        width="26" 
        height="26" 
        className={`fill-[#8696a0] cursor-pointer hover:fill-[#cfd7dc] transition-all duration-200 ${isOpen ? 'rotate-45' : 'rotate-0'}`}
    >
        <path d="M20 12h-7V5h-2v7H4v2h7v7h2v-7h7z"></path>
    </svg>
);

// --- Icons for Attachment Menu ---
const DocIcon = () => (<svg viewBox="0 0 20 25" width="20" height="25" className="fill-[#7f66ff]"><path d="M20 5.95L13.88.04H2.43C1.09.04 0 1.15 0 2.52v19.96c0 1.37 1.09 2.48 2.43 2.48h15.15c1.33 0 2.42-1.11 2.42-2.48V5.95zM12.7 2.48l4.89 4.75h-4.89V2.48z"></path></svg>);
const PhotoIcon = () => (<svg viewBox="0 0 20 20" width="20" height="20" className="fill-[#007bfc]"><path d="M2.36 0h15.28C18.94 0 20 1.06 20 2.36v15.28c0 1.3-1.06 2.36-2.36 2.36H2.36C1.06 20 0 18.94 0 17.64V2.36C0 1.06 1.06 0 2.36 0zm.66 12.87l3.22-3.83c.21-.26.6-.26.81 0l2.36 2.81 2.65-3.41c.21-.26.61-.26.82 0l3.96 5.09c.27.34.03.85-.4.85H2.62c-.44 0-.68-.51-.4-.86v.35zM5.56 6.38a2.12 2.12 0 1 1 0-4.24 2.12 2.12 0 0 1 0 4.24z"></path></svg>);
const CameraIcon = () => (<svg viewBox="0 0 20 19" width="20" height="19" className="fill-[#ff2e74]"><path d="M19.06 4.96h-3.49l-.75-2.61A1.7 1.7 0 0 0 13.19.78h-6.4c-.75 0-1.42.48-1.63 1.17L4.41 4.96H.94C.42 4.96 0 5.38 0 5.9v11.33c0 .52.42.94.94.94h18.12c.52 0 .94-.42.94-.94V5.9c0-.52-.42-.94-.94-.94zM10 14.89a4.49 4.49 0 1 1 0-8.97 4.49 4.49 0 0 1 0 8.97z"></path></svg>);
const ContactIcon = () => (<svg viewBox="0 0 20 20" width="20" height="20" className="fill-[#009de2]"><path d="M10 10a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm-6.07 9.17c-.52.28-.56.97-.04 1.25C5.07 21.08 7.42 21.5 10 21.5s4.93-.42 6.11-1.08c.52-.28.48-.97-.04-1.25C14.6 18.33 12.38 17.5 10 17.5s-4.6.83-6.07 1.67z"></path></svg>);
const PollIcon = () => (<svg viewBox="0 0 16 20" width="16" height="20" className="fill-[#ffbc38]"><path d="M14.67 20H1.33A1.33 1.33 0 0 1 0 18.67V1.33C0 .6.6 0 1.33 0h13.34c.73 0 1.33.6 1.33 1.33v17.34c0 .73-.6 1.33-1.33 1.33zM3 4h10v2H3V4zm0 5h7v2H3V9zm0 5h5v2H3v-2z"></path></svg>);
const StickerIcon = () => (<svg viewBox="0 0 20 20" width="20" height="20" className="fill-[#02a698]"><path d="M4.58 20C2.06 20 0 17.94 0 15.42V4.58C0 2.06 2.06 0 4.58 0h10.84C17.94 0 20 2.06 20 4.58v10.84c0 1.43-.65 2.7-1.68 3.55l-2.77 2.77A4.57 4.57 0 0 1 12.5 21.68l-7.92-1.68zM15 15c0 1.66 1.34 3 3 3v-3h-3zM8 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm4 6.5a4.5 4.5 0 0 0-8 0h8z"></path></svg>);
const EventIcon = () => (<svg viewBox="0 0 20 22" width="20" height="22" className="fill-[#e55160]"><path d="M16 2h-1V0h-2v2H7V0H5v2H4C2.9 2 2 2.9 2 4v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM4 6h12v3H4V6zm12 14H4v-8h12v8z"></path></svg>);

const EMOJIS = ["😀", "😂", "🥰", "😎", "🤔", "😭", "👍", "👎", "👋", "🙏", "❤️", "💔", "🔥", "✨", "🎉", "💩", "👻", "🤖"];

interface MessageInputProps {
  onSendMessage: (text: string, attachment?: Attachment) => void;
}

const MenuItem = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) => (
    <div 
        onClick={onClick}
        className="flex items-center gap-3 px-4 py-3 hover:bg-[#182229] cursor-pointer transition-colors group"
    >
        <div className="w-6 flex justify-center group-hover:scale-110 transition-transform duration-200">
            {icon}
        </div>
        <span className="text-[#d1d7db] text-[15px] font-medium pt-0.5">{label}</span>
    </div>
);

export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);

  // Close attachment menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setShowAttachments(false);
        }
        if (emojiRef.current && !emojiRef.current.contains(event.target as Node)) {
             setShowEmoji(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSend = () => {
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const insertEmoji = (emoji: string) => {
      setInputText(prev => prev + emoji);
      // Keep emoji open for multiple insertions or close? usually keeps open
      inputRef.current?.focus();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const attachment: Attachment = {
              fileName: file.name,
              fileType: file.type,
              fileSize: `${(file.size / 1024).toFixed(1)} KB`,
              url: URL.createObjectURL(file)
          };
          onSendMessage("", attachment);
          setShowAttachments(false);
      }
  };

  return (
    <div className="relative px-3 py-2 bg-[#202c33] flex items-center gap-3 shrink-0 min-h-[62px] z-20 border-t border-[#2f3b43]">
      
      {/* --- Emoji Picker Popover --- */}
      {showEmoji && (
          <div 
             ref={emojiRef}
             className="absolute bottom-[70px] left-4 bg-[#233138] shadow-2xl rounded-lg p-3 border border-[#2f3b43] grid grid-cols-6 gap-2 w-[320px] z-50 animate-fade-in"
          >
              {EMOJIS.map(e => (
                  <button key={e} onClick={() => insertEmoji(e)} className="text-2xl p-2 hover:bg-[#111b21] rounded transition-colors">{e}</button>
              ))}
          </div>
      )}

      {/* --- Attachment Menu Popover --- */}
      {showAttachments && (
          <div 
            ref={menuRef}
            className="absolute bottom-[70px] left-2 bg-[#233138] rounded-2xl py-2 w-[210px] z-50 animate-fade-in shadow-[0_4px_20px_rgba(0,0,0,0.5)] flex flex-col-reverse"
          >
              <MenuItem icon={<PollIcon />} label="Thăm dò ý kiến" />
              <MenuItem icon={<ContactIcon />} label="Người liên hệ" />
              <MenuItem icon={<DocIcon />} label="Tài liệu" />
              <MenuItem icon={<CameraIcon />} label="Camera" />
              <MenuItem icon={<StickerIcon />} label="Nhãn dán mới" />
              <MenuItem icon={<EventIcon />} label="Sự kiện" />
              <MenuItem 
                icon={<PhotoIcon />} 
                label="Ảnh và video" 
                onClick={() => fileInputRef.current?.click()}
              />
               {/* Hidden File Input linked to Photo/Video option */}
               <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileSelect} />
          </div>
      )}

      {/* --- Input Bar UI --- */}
      
      {/* Plus Icon (Outside) */}
      <div className="flex items-center justify-center p-1" title="Đính kèm">
         <PlusIcon onClick={() => setShowAttachments(!showAttachments)} isOpen={showAttachments} />
      </div>
      
      {/* Input Field Container (Pill shape) */}
      <div className="flex-1 bg-[#2a3942] rounded-lg flex items-center px-3 py-[9px] border border-transparent focus-within:border-transparent">
        {/* Smiley Icon (Inside, Left) */}
        <div 
            onClick={(e) => { e.stopPropagation(); setShowEmoji(!showEmoji); }}
            className="cursor-pointer"
            title="Biểu tượng cảm xúc"
        >
            <SmileyIcon onClick={() => {}} />
        </div>
        
        <input 
            ref={inputRef}
            type="text" 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Soạn tin nhắn"
            className="w-full bg-transparent border-none outline-none text-[#e9edef] text-[15px] placeholder-[#8696a0] leading-[20px]"
        />
      </div>

      {/* Mic Icon (Right, Outside) */}
      <div className="flex items-center justify-center p-1 min-w-[40px]">
          {inputText.trim() ? (
            <button onClick={handleSend} className="text-[#00a884]" title="Gửi">
                <SendIcon />
            </button>
          ) : (
             <div title="Gửi tin nhắn thoại">
                 <MicIcon />
             </div>
          )}
      </div>
    </div>
  );
};
