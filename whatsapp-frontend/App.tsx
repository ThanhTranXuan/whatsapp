
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatProvider, useChat } from './context/ChatContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NavigationRail } from './components/NavigationRail';
import { Sidebar } from './components/Sidebar';
import { ChatWindow } from './components/ChatWindow';
import { ChatInfoSidebar } from './components/ChatInfoSidebar';
import { EmptyState } from './components/EmptyState';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { AdminLayout } from './admin/AdminLayout';

const MainLayout: React.FC = () => {
  const { activeConversationId, showChatInfo } = useChat();
  const [activeTab, setActiveTab] = useState('chats');
  
  // Resizable Sidebar State
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const isResizing = useRef(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const startResizing = useCallback(() => {
    isResizing.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none'; // Prevent text selection while dragging
  }, []);

  const stopResizing = useCallback(() => {
    isResizing.current = false;
    document.body.style.cursor = 'default';
    document.body.style.userSelect = 'auto';
  }, []);

  const resize = useCallback((mouseMoveEvent: MouseEvent) => {
    if (isResizing.current) {
        // 64 is the width of NavigationRail
        const newWidth = mouseMoveEvent.clientX - 64; 
        if (newWidth >= 280 && newWidth <= 650) { // Min 280px, Max 650px
            setSidebarWidth(newWidth);
        }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  const showRightSideContent = activeTab === 'chats' && activeConversationId;

  return (
    <div className="flex h-screen w-full mx-auto overflow-hidden bg-[#111b21] shadow-xl relative text-[#e9edef]">
      {/* 1. Navigation Rail (Far Left) */}
      <NavigationRail activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 2. Sidebar List (Variable Width) */}
      <div 
        ref={sidebarRef}
        style={{ width: sidebarWidth }}
        className={`
          flex-shrink-0 bg-[#111b21] h-full flex flex-col z-10 border-r border-[#2f3b43]
          ${showRightSideContent ? 'hidden md:flex' : 'flex w-full md:w-auto'}
        `}
      >
        <Sidebar activeTab={activeTab} />
      </div>

      {/* Resizer Handle */}
      <div
        className={`w-[4px] hover:w-[6px] bg-transparent hover:bg-[#00a884] cursor-col-resize z-20 transition-all duration-200 opacity-0 hover:opacity-100 absolute h-full`}
        style={{ left: 64 + sidebarWidth - 2 }} // Position right on the border
        onMouseDown={startResizing}
      />

      {/* 3. Main Content (Chat or Empty State) */}
      <div 
        className={`
          flex-1 h-full bg-[#222e35] relative flex min-w-0
          ${!showRightSideContent ? 'hidden md:flex' : 'flex'}
        `}
      >
        {showRightSideContent ? (
            <>
                <ChatWindow />
                {showChatInfo && <ChatInfoSidebar />}
            </>
        ) : (
          <EmptyState activeTab={activeTab} />
        )}
      </div>
    </div>
  );
};

const AppContent: React.FC = () => {
    const { user, currentView, isAdmin } = useAuth();

    if (!user) {
        if (currentView === 'register') {
            return <Register />;
        }
        return <Login />;
    }

    if (isAdmin) {
        return <AdminLayout />;
    }

    return (
        <ChatProvider user={user}>
            <MainLayout />
        </ChatProvider>
    );
}

export const App: React.FC = () => {
  return (
    <AuthProvider>
        <AppContent />
    </AuthProvider>
  );
}
