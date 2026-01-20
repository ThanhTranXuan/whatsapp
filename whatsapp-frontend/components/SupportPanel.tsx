
import React, { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { User } from '../types';

const ArrowBackIcon = () => (
    <svg viewBox="0 0 24 24" width="24" height="24" className="text-white fill-current cursor-pointer">
        <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
    </svg>
);

interface SupportPanelProps {
  onBack: () => void;
}

type Tab = 'menu' | 'report' | 'tickets';

export const SupportPanel: React.FC<SupportPanelProps> = ({ onBack }) => {
  const { users, tickets, createTicket, reportUser } = useChat();
  const [currentTab, setCurrentTab] = useState<Tab>('menu');

  // Report Form State
  const [reportUserId, setReportUserId] = useState('');
  const [reportReason, setReportReason] = useState('');

  // Ticket Form State
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDesc, setTicketDesc] = useState('');

  const handleReportSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (reportUserId && reportReason) {
          reportUser(reportUserId, reportReason);
          setReportUserId('');
          setReportReason('');
          setCurrentTab('menu');
      }
  };

  const handleTicketSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (ticketSubject && ticketDesc) {
          createTicket(ticketSubject, ticketDesc);
          setTicketSubject('');
          setTicketDesc('');
      }
  };

  const renderHeader = (title: string, backAction: () => void) => (
    <div className="h-[108px] bg-[#008069] flex flex-col justify-end px-5 pb-4 shrink-0">
        <div className="flex items-center text-white gap-8">
            <div onClick={backAction}>
                <ArrowBackIcon />
            </div>
            <h1 className="text-[19px] font-medium">{title}</h1>
        </div>
    </div>
  );

  // --- View: Menu ---
  if (currentTab === 'menu') {
      return (
          <div className="flex flex-col h-full bg-white animate-slide-in-left">
              {renderHeader("Support & Help", onBack)}
              <div className="p-4 space-y-4">
                  <button 
                    onClick={() => setCurrentTab('report')}
                    className="w-full text-left p-4 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 transition-colors"
                  >
                      <h3 className="font-semibold text-red-700">Report a User</h3>
                      <p className="text-sm text-red-600">Flag suspicious or abusive behavior.</p>
                  </button>

                  <button 
                    onClick={() => setCurrentTab('tickets')}
                    className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
                  >
                      <h3 className="font-semibold text-blue-700">Help Center / Tickets</h3>
                      <p className="text-sm text-blue-600">Contact support or view your tickets.</p>
                  </button>
              </div>
          </div>
      );
  }

  // --- View: Report User ---
  if (currentTab === 'report') {
      return (
        <div className="flex flex-col h-full bg-white animate-slide-in-left">
            {renderHeader("Report User", () => setCurrentTab('menu'))}
            <div className="p-6">
                <form onSubmit={handleReportSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Select User</label>
                        <select 
                            value={reportUserId}
                            onChange={(e) => setReportUserId(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#00a884] outline-none"
                            required
                        >
                            <option value="">-- Choose User --</option>
                            {Object.values(users).map((u: User) => (
                                <option key={u.id} value={u.id}>{u.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                        <textarea 
                            value={reportReason}
                            onChange={(e) => setReportReason(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#00a884] outline-none"
                            rows={4}
                            placeholder="Describe the issue..."
                            required
                        />
                    </div>
                    <button type="submit" className="bg-red-600 text-white py-2 rounded hover:bg-red-700">
                        Submit Report
                    </button>
                </form>
            </div>
        </div>
      );
  }

  // --- View: Support Tickets ---
  return (
    <div className="flex flex-col h-full bg-white animate-slide-in-left">
        {renderHeader("Support Tickets", () => setCurrentTab('menu'))}
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            {/* New Ticket Form */}
            <div className="mb-8 border-b border-gray-200 pb-6">
                <h2 className="text-lg font-medium mb-4 text-[#008069]">Create New Ticket</h2>
                <form onSubmit={handleTicketSubmit} className="space-y-3">
                    <input 
                        type="text" 
                        placeholder="Subject" 
                        value={ticketSubject}
                        onChange={(e) => setTicketSubject(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#00a884] outline-none"
                        required
                    />
                    <textarea 
                        placeholder="Describe your problem..." 
                        value={ticketDesc}
                        onChange={(e) => setTicketDesc(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-1 focus:ring-[#00a884] outline-none"
                        rows={3}
                        required
                    />
                    <button type="submit" className="bg-[#008069] text-white px-4 py-2 rounded text-sm hover:bg-[#006d59]">
                        Send Ticket
                    </button>
                </form>
            </div>

            {/* List */}
            <div>
                <h2 className="text-lg font-medium mb-4 text-gray-700">My Tickets</h2>
                {tickets.length === 0 ? (
                    <p className="text-gray-500 text-sm italic">No tickets found.</p>
                ) : (
                    <div className="space-y-3">
                        {tickets.map(t => (
                            <div key={t.id} className="p-3 border border-gray-200 rounded hover:bg-gray-50">
                                <div className="flex justify-between items-start mb-1">
                                    <h4 className="font-medium text-gray-900">{t.subject}</h4>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${t.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-800'}`}>
                                        {t.status.toUpperCase()}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2">{t.description}</p>
                                <span className="text-xs text-gray-400 mt-2 block">{t.timestamp.toLocaleDateString()}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
