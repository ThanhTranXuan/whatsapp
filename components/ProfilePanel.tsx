
import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';

const ArrowBackIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="text-white fill-current cursor-pointer">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
    </svg>
);

const EditIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-current text-[#54656f]">
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-current text-[#54656f]">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
    </svg>
);

const CameraIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="fill-white text-white">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
        <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"></path>
    </svg>
);

const LogoutIcon = () => (
    <svg viewBox="0 0 24 24" width="20" height="20" className="fill-current mr-2">
        <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
    </svg>
);

interface ProfilePanelProps {
  onBack: () => void;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({ onBack }) => {
  const { user, updateUserProfile, logout } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Edit States
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(user?.name || '');
  
  const [editingBio, setEditingBio] = useState(false);
  const [bioInput, setBioInput] = useState(user?.bio || '');

  const [editingPhone, setEditingPhone] = useState(false);
  const [phoneInput, setPhoneInput] = useState(user?.phone || '');

  if (!user) return null;

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUserProfile({ avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveName = () => {
      if (nameInput.trim()) {
          updateUserProfile({ name: nameInput });
      }
      setEditingName(false);
  };

  const saveBio = () => {
      updateUserProfile({ bio: bioInput });
      setEditingBio(false);
  };
  
  const savePhone = () => {
      updateUserProfile({ phone: phoneInput });
      setEditingPhone(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#f0f2f5] animate-slide-in-left border-l border-[#d1d7db] relative">
      {/* Header */}
      <div className="h-[108px] bg-[#008069] flex flex-col justify-end px-5 pb-4 shrink-0">
         <div className="flex items-center text-white gap-8">
            <div onClick={onBack}>
                <ArrowBackIcon />
            </div>
            <h1 className="text-[19px] font-medium">Profile</h1>
         </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Avatar Section */}
        <div className="flex justify-center py-8">
            <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                <img 
                    src={user.avatar} 
                    alt="Profile" 
                    className="w-[200px] h-[200px] rounded-full object-cover shadow-sm"
                />
                <div className="absolute inset-0 bg-black/40 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <CameraIcon />
                    <span className="text-white text-xs mt-2 uppercase text-center w-24">Change Profile Photo</span>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
        </div>

        {/* Name Section */}
        <div className="bg-white p-4 shadow-sm mb-3">
            <div className="text-[#008069] text-sm mb-3">Your Name</div>
            <div className="flex justify-between items-end">
                {editingName ? (
                    <div className="flex w-full items-center border-b-2 border-[#00a884] pb-1">
                        <input 
                            type="text" 
                            value={nameInput} 
                            onChange={(e) => setNameInput(e.target.value)}
                            className="flex-1 outline-none text-[#3b4a54] text-[17px]"
                            autoFocus
                        />
                        <button onClick={saveName} className="ml-2"><CheckIcon /></button>
                    </div>
                ) : (
                    <>
                        <div className="text-[#3b4a54] text-[17px]">{user.name}</div>
                        <button onClick={() => setEditingName(true)}><EditIcon /></button>
                    </>
                )}
            </div>
            <p className="text-[#667781] text-[13px] mt-3">
                This is not your username or pin. This name will be visible to your WhatsApp contacts.
            </p>
        </div>

        {/* Bio/About Section */}
        <div className="bg-white p-4 shadow-sm mb-3">
            <div className="text-[#008069] text-sm mb-3">About</div>
            <div className="flex justify-between items-end">
                {editingBio ? (
                    <div className="flex w-full items-center border-b-2 border-[#00a884] pb-1">
                        <input 
                            type="text" 
                            value={bioInput} 
                            onChange={(e) => setBioInput(e.target.value)}
                            className="flex-1 outline-none text-[#3b4a54] text-[17px]"
                            autoFocus
                        />
                        <button onClick={saveBio} className="ml-2"><CheckIcon /></button>
                    </div>
                ) : (
                    <>
                        <div className="text-[#3b4a54] text-[17px]">{user.bio || 'Available'}</div>
                        <button onClick={() => setEditingBio(true)}><EditIcon /></button>
                    </>
                )}
            </div>
        </div>

        {/* Phone Section */}
        <div className="bg-white p-4 shadow-sm mb-8">
            <div className="text-[#008069] text-sm mb-3">Phone</div>
            <div className="flex justify-between items-end">
                 {editingPhone ? (
                    <div className="flex w-full items-center border-b-2 border-[#00a884] pb-1">
                        <input 
                            type="text" 
                            value={phoneInput} 
                            onChange={(e) => setPhoneInput(e.target.value)}
                            className="flex-1 outline-none text-[#3b4a54] text-[17px]"
                            autoFocus
                        />
                        <button onClick={savePhone} className="ml-2"><CheckIcon /></button>
                    </div>
                ) : (
                    <>
                         <div className="text-[#3b4a54] text-[17px]">{user.phone || 'No phone added'}</div>
                         <button onClick={() => setEditingPhone(true)}><EditIcon /></button>
                    </>
                )}
            </div>
        </div>

        {/* Logout */}
        <div className="px-4">
            <button 
                onClick={logout}
                className="w-full flex items-center justify-center bg-red-50 text-red-600 py-3 rounded-lg hover:bg-red-100 transition-colors border border-red-100 shadow-sm"
            >
                <LogoutIcon />
                Logout
            </button>
        </div>
        
        <div className="text-center text-[#8696a0] text-xs mt-8 mb-4">
            GeminiChat Web v1.2.5
        </div>
      </div>
    </div>
  );
};
