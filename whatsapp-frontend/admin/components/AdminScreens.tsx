
import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { User, Ticket } from '../../types';

// --- Components ---

const Card: React.FC<{ title: string; value: string | number; color: string; icon: React.ReactNode }> = ({ title, value, color, icon }) => (
    <div className="card border-0 shadow-sm h-100">
        <div className="card-body d-flex align-items-center">
            <div className={`rounded-circle p-3 text-white me-3 ${color.replace('bg-', 'bg-gradient-')}`} style={{ width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {icon}
            </div>
            <div>
                <h6 className="text-muted mb-1 text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>{title}</h6>
                <h3 className="mb-0 fw-bold text-dark">{value}</h3>
            </div>
        </div>
    </div>
);

const Badge: React.FC<{ type: 'success' | 'danger' | 'warning' | 'neutral'; children: React.ReactNode }> = ({ type, children }) => {
    const bsClass = 
        type === 'success' ? 'bg-success' :
        type === 'danger' ? 'bg-danger' :
        type === 'warning' ? 'bg-warning text-dark' :
        'bg-secondary';
    
    return <span className={`badge rounded-pill ${bsClass}`}>{children}</span>;
};

// --- SCREENS ---

export const Dashboard: React.FC = () => {
    const { users, reports, tickets, conversations } = useAdmin();
    
    return (
        <div className="container-fluid p-0">
            <h2 className="h3 mb-4 text-gray-800">Dashboard Overview</h2>
            
            <div className="row g-4 mb-4">
                <div className="col-12 col-md-6 col-xl-3">
                    <Card 
                        title="Total Users" 
                        value={users.length} 
                        color="bg-primary"
                        icon={<svg viewBox="0 0 24 24" width="24" height="24" className="fill-current"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>}
                    />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <Card 
                        title="Pending Reports" 
                        value={reports.filter(r => r.status === 'pending').length} 
                        color="bg-danger"
                        icon={<svg viewBox="0 0 24 24" width="24" height="24" className="fill-current"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>}
                    />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <Card 
                        title="Open Tickets" 
                        value={tickets.filter(t => t.status === 'open').length} 
                        color="bg-warning"
                        icon={<svg viewBox="0 0 24 24" width="24" height="24" className="fill-current"><path d="M20 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/></svg>}
                    />
                </div>
                <div className="col-12 col-md-6 col-xl-3">
                    <Card 
                        title="Active Rooms" 
                        value={conversations.length} 
                        color="bg-success"
                        icon={<svg viewBox="0 0 24 24" width="24" height="24" className="fill-current"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/></svg>}
                    />
                </div>
            </div>

            <div className="row g-4">
                 <div className="col-12 col-lg-6">
                     <div className="card shadow-sm border-0">
                         <div className="card-header bg-white border-0 py-3">
                             <h5 className="mb-0 fw-bold text-gray-700">Recent Users</h5>
                         </div>
                         <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead className="table-light">
                                    <tr>
                                        <th className="border-0 ps-4">Name</th>
                                        <th className="border-0">Status</th>
                                        <th className="border-0">Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.slice(0, 5).map(u => (
                                        <tr key={u.id}>
                                            <td className="ps-4">
                                                <div className="d-flex align-items-center">
                                                    <img src={u.avatar} className="rounded-circle me-2" width="32" height="32" alt="" />
                                                    <span className="fw-medium text-dark">{u.name}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <Badge type={u.isBanned ? 'danger' : (u.isOnline ? 'success' : 'neutral')}>
                                                    {u.isBanned ? 'Banned' : (u.isOnline ? 'Online' : 'Offline')}
                                                </Badge>
                                            </td>
                                            <td className="text-muted">{new Date(u.joinedAt || Date.now()).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                         </div>
                     </div>
                 </div>

                 <div className="col-12 col-lg-6">
                     <div className="card shadow-sm border-0 h-100">
                         <div className="card-header bg-white border-0 py-3">
                             <h5 className="mb-0 fw-bold text-gray-700">System Status</h5>
                         </div>
                         <div className="card-body">
                             <div className="mb-4">
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="text-muted small fw-bold">Server Load</span>
                                    <span className="text-success fw-bold small">24%</span>
                                </div>
                                <div className="progress" style={{ height: '8px' }}>
                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: '24%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="text-muted small fw-bold">Memory Usage</span>
                                    <span className="text-primary fw-bold small">58%</span>
                                </div>
                                <div className="progress" style={{ height: '8px' }}>
                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '58%' }}></div>
                                </div>
                            </div>
                         </div>
                     </div>
                 </div>
            </div>
        </div>
    );
};

export const UsersScreen: React.FC = () => {
    const { users, banUser, unbanUser } = useAdmin();
    return (
        <div className="container-fluid p-0">
            <h2 className="h3 mb-4 text-gray-800">User Management</h2>
            <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="p-3 ps-4">User</th>
                                <th className="p-3">Role</th>
                                <th className="p-3">Status</th>
                                <th className="p-3 text-end pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u.id}>
                                    <td className="p-3 ps-4">
                                        <div className="d-flex align-items-center">
                                            <img src={u.avatar} className="rounded-circle border me-3" width="40" height="40" alt="" />
                                            <div>
                                                <div className="fw-bold text-dark">{u.name}</div>
                                                <div className="small text-muted">ID: {u.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        {u.isBot ? (
                                            <span className="badge bg-purple-100 text-purple-700 d-inline-flex align-items-center">
                                                <svg viewBox="0 0 24 24" width="14" height="14" className="fill-current me-1"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                                                Bot
                                            </span>
                                        ) : <span className="text-secondary">Member</span>}
                                    </td>
                                    <td className="p-3">
                                         <Badge type={u.isBanned ? 'danger' : (u.isOnline ? 'success' : 'neutral')}>
                                             {u.isBanned ? 'Banned' : (u.isOnline ? 'Online' : 'Offline')}
                                         </Badge>
                                    </td>
                                    <td className="p-3 text-end pe-4">
                                        {u.isBanned ? (
                                            <button 
                                                onClick={() => unbanUser(u.id)} 
                                                className="btn btn-sm btn-outline-success"
                                            >
                                                Unban
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => banUser(u.id)} 
                                                className="btn btn-sm btn-outline-danger"
                                            >
                                                Ban User
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export const ReportsScreen: React.FC = () => {
    const { reports, ignoreReport, warnUser, banUser, resolveReport, users } = useAdmin();
    const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

    const selectedReport = reports.find(r => r.id === selectedReportId);

    const sortedReports = [...reports].sort((a, b) => {
        if (a.status === 'pending' && b.status !== 'pending') return -1;
        if (a.status !== 'pending' && b.status === 'pending') return 1;
        return b.timestamp.getTime() - a.timestamp.getTime();
    });

    const getUser = (id: string) => users.find(u => u.id === id);

    const handleBan = () => {
        if (selectedReport) {
            banUser(selectedReport.reportedUserId);
            resolveReport(selectedReport.id);
        }
    };

    return (
        <div className="card shadow-sm border-0 h-100 overflow-hidden" style={{ maxHeight: 'calc(100vh - 100px)' }}>
            <div className="row g-0 h-100">
                {/* List */}
                <div className="col-4 border-end h-100 d-flex flex-col overflow-hidden bg-light">
                    <div className="p-3 border-bottom bg-white">
                        <h6 className="fw-bold mb-0 text-dark">Violation Reports</h6>
                        <small className="text-muted">{reports.filter(r => r.status === 'pending').length} pending review</small>
                    </div>
                    <div className="list-group list-group-flush overflow-y-auto custom-scrollbar flex-grow-1">
                        {sortedReports.map(report => (
                            <div 
                                key={report.id}
                                onClick={() => setSelectedReportId(report.id)}
                                className={`list-group-item list-group-item-action py-3 ${selectedReportId === report.id ? 'active text-white' : ''} ${report.status === 'pending' ? 'border-start border-4 border-warning' : ''}`}
                            >
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <span className={`badge ${selectedReportId === report.id ? 'bg-white text-primary' : (report.status === 'pending' ? 'bg-warning text-dark' : 'bg-secondary')}`}>
                                        {report.status}
                                    </span>
                                    <small className={selectedReportId === report.id ? 'text-white-50' : 'text-muted'}>
                                        {report.timestamp.toLocaleDateString()}
                                    </small>
                                </div>
                                <p className={`mb-1 text-truncate ${selectedReportId === report.id ? 'text-white' : 'text-dark fw-medium'}`}>{report.reason}</p>
                                <small className={selectedReportId === report.id ? 'text-white-50' : 'text-danger'}>
                                    Against: {getUser(report.reportedUserId)?.name}
                                </small>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detail */}
                <div className="col-8 h-100 overflow-y-auto bg-white">
                    {selectedReport ? (
                        <div className="p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
                                <div>
                                    <h4 className="mb-0 text-dark">Report Details</h4>
                                    <small className="text-muted">ID: {selectedReport.id}</small>
                                </div>
                                <Badge type={selectedReport.status === 'pending' ? 'warning' : 'neutral'}>{selectedReport.status.toUpperCase()}</Badge>
                            </div>

                            <div className="row g-3 mb-4">
                                {/* Reporter */}
                                <div className="col-6">
                                    <div className="card h-100 bg-light border-0">
                                        <div className="card-body">
                                            <h6 className="card-subtitle mb-2 text-muted text-uppercase small fw-bold">Reporter</h6>
                                            <div className="d-flex align-items-center">
                                                <img src={getUser(selectedReport.reporterId)?.avatar} className="rounded-circle me-3" width="40" height="40" alt="" />
                                                <div>
                                                    <div className="fw-bold text-dark">{getUser(selectedReport.reporterId)?.name}</div>
                                                    <div className="small text-muted">{selectedReport.reporterId}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Suspect */}
                                <div className="col-6">
                                    <div className="card h-100 bg-danger-subtle border-0">
                                        <div className="card-body">
                                            <h6 className="card-subtitle mb-2 text-danger text-uppercase small fw-bold">Reported User</h6>
                                            <div className="d-flex align-items-center">
                                                <img src={getUser(selectedReport.reportedUserId)?.avatar} className="rounded-circle me-3" width="40" height="40" alt="" />
                                                <div>
                                                    <div className="fw-bold text-danger-emphasis">{getUser(selectedReport.reportedUserId)?.name}</div>
                                                    <div className="small text-danger-emphasis">{selectedReport.reportedUserId}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h6 className="fw-bold text-dark mb-2">Reason for Report</h6>
                                <div className="p-3 bg-light rounded border-0 text-dark">
                                    {selectedReport.reason}
                                </div>
                            </div>

                            {selectedReport.status === 'pending' ? (
                                <div className="d-flex gap-2 pt-3 border-top">
                                    <button onClick={() => ignoreReport(selectedReport.id)} className="btn btn-light text-muted">Ignore</button>
                                    <button onClick={() => warnUser(selectedReport.id)} className="btn btn-warning text-dark">Send Warning</button>
                                    <button onClick={handleBan} className="btn btn-danger ms-auto">Ban User & Resolve</button>
                                </div>
                            ) : (
                                <div className="alert alert-secondary text-center mb-0">
                                    This report has been processed.
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
                            <svg viewBox="0 0 24 24" width="64" height="64" className="fill-current mb-3 opacity-25"><path d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM12 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm1-4.32c0 .38-.28.71-.66.76-.08.01-.16.02-.24.02-.45 0-.85-.31-.96-.74L10.6 8.22c-.14-.58.3-1.15.9-1.15h1.01c.6 0 1.04.58.9 1.15l-.54 4.46z"/></svg>
                            <p className="fw-medium">Select a report to review</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const TicketsScreen: React.FC = () => {
    const { tickets, respondToTicket, users } = useAdmin();
    const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
    const [responseText, setResponseText] = useState('');

    const selectedTicket = tickets.find(t => t.id === selectedTicketId);
    const sortedTickets = [...tickets].sort((a, b) => {
        if (a.status === 'open' && b.status !== 'open') return -1;
        if (a.status !== 'open' && b.status === 'open') return 1;
        return b.timestamp.getTime() - a.timestamp.getTime();
    });

    const handleSendResponse = () => {
        if (selectedTicketId && responseText.trim()) {
            respondToTicket(selectedTicketId, responseText);
            setResponseText('');
        }
    };

    const getUserName = (id?: string) => users.find(u => u.id === id)?.name || id || 'Unknown';

    return (
        <div className="card shadow-sm border-0 h-100 overflow-hidden" style={{ maxHeight: 'calc(100vh - 100px)' }}>
            <div className="row g-0 h-100">
                {/* List */}
                <div className="col-4 border-end h-100 d-flex flex-col bg-light">
                    <div className="p-3 border-bottom bg-white">
                        <h6 className="fw-bold mb-0 text-dark">Support Inbox</h6>
                        <small className="text-muted">{tickets.filter(t => t.status === 'open').length} awaiting response</small>
                    </div>
                    <div className="list-group list-group-flush overflow-y-auto flex-grow-1">
                        {sortedTickets.map(ticket => (
                            <button
                                key={ticket.id}
                                onClick={() => { setSelectedTicketId(ticket.id); setResponseText(''); }}
                                className={`list-group-item list-group-item-action py-3 ${selectedTicketId === ticket.id ? 'active' : ''}`}
                            >
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <span className={`badge ${ticket.status === 'open' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                        {ticket.status.toUpperCase()}
                                    </span>
                                    <small className={selectedTicketId === ticket.id ? 'text-white-50' : 'text-muted'}>
                                        {ticket.timestamp.toLocaleDateString()}
                                    </small>
                                </div>
                                <h6 className={`mb-1 text-truncate ${selectedTicketId === ticket.id ? 'text-white' : 'text-dark'}`}>{ticket.subject}</h6>
                                <small className={selectedTicketId === ticket.id ? 'text-white-50' : 'text-muted'}>{getUserName(ticket.senderId)}</small>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Detail */}
                <div className="col-8 h-100 overflow-y-auto bg-white">
                    {selectedTicket ? (
                        <div className="d-flex flex-column h-100">
                            <div className="p-4 border-bottom">
                                <div className="d-flex justify-content-between mb-3">
                                    <h4 className="text-dark mb-0">{selectedTicket.subject}</h4>
                                    <small className="text-muted">ID: {selectedTicket.id}</small>
                                </div>
                                
                                <div className="d-flex align-items-center p-3 bg-light rounded mb-3">
                                    <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{width: 40, height: 40, fontSize: '1.2rem', fontWeight: 'bold'}}>
                                        {getUserName(selectedTicket.senderId).charAt(0)}
                                    </div>
                                    <div>
                                        <div className="fw-bold text-dark">{getUserName(selectedTicket.senderId)}</div>
                                        <div className="small text-muted">Customer</div>
                                    </div>
                                </div>

                                <p className="lead fs-6 text-dark">{selectedTicket.description}</p>
                            </div>

                            <div className="p-4 flex-grow-1 bg-light">
                                {selectedTicket.status === 'resolved' ? (
                                    <div className="alert alert-success border-success">
                                        <h6 className="alert-heading fw-bold"><i className="bi bi-check-circle-fill me-2"></i>Ticket Resolved</h6>
                                        <hr/>
                                        <p className="mb-0 small fw-bold text-success-emphasis">Admin Response:</p>
                                        <p className="mb-0 text-dark">{selectedTicket.adminResponse || "No response recorded."}</p>
                                    </div>
                                ) : (
                                    <div className="card border-0 shadow-sm">
                                        <div className="card-body">
                                            <h6 className="card-title fw-bold text-dark mb-3">Reply to User</h6>
                                            <textarea
                                                value={responseText}
                                                onChange={(e) => setResponseText(e.target.value)}
                                                className="form-control mb-3"
                                                rows={5}
                                                placeholder="Type your response here..."
                                            ></textarea>
                                            <div className="d-flex justify-content-end">
                                                <button 
                                                    onClick={handleSendResponse}
                                                    disabled={!responseText.trim()}
                                                    className="btn btn-primary"
                                                >
                                                    Send & Resolve
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
                            <svg viewBox="0 0 24 24" width="64" height="64" className="fill-current mb-3 opacity-25"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h18c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
                            <p className="fw-medium">Select a ticket to view</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export const RoomsScreen: React.FC = () => {
    const { rooms } = useAdmin();
    return (
        <div className="container-fluid p-0">
            <h2 className="h3 mb-4 text-gray-800">Room Monitoring</h2>
             <div className="card shadow-sm border-0">
                <div className="table-responsive">
                    <table className="table table-hover align-middle mb-0">
                        <thead className="table-light">
                            <tr>
                                <th className="p-3 ps-4">Room Name / ID</th>
                                <th className="p-3">Type</th>
                                <th className="p-3">Members</th>
                                <th className="p-3">Messages</th>
                                <th className="p-3">Last Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rooms.map(room => (
                                <tr key={room.id}>
                                    <td className="p-3 ps-4">
                                        <div className="fw-medium text-dark">{room.name}</div>
                                        <div className="small text-muted font-monospace">ID: {room.id}</div>
                                    </td>
                                    <td className="p-3">
                                        <Badge type={room.type === 'group' ? 'warning' : 'neutral'}>
                                            {room.type.toUpperCase()}
                                        </Badge>
                                    </td>
                                    <td className="p-3">
                                        <span className="badge bg-light text-dark border">
                                            {room.participants} Users
                                        </span>
                                    </td>
                                    <td className="p-3 font-monospace">
                                        {room.messagesCount.toLocaleString()}
                                    </td>
                                    <td className="p-3 text-muted small">
                                        {room.lastActive.toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer bg-light text-muted small">
                    <i className="bi bi-shield-lock-fill me-2"></i>
                    Privacy Mode Enabled: Chat content is hidden from administrators.
                </div>
            </div>
        </div>
    );
};

export const StatsScreen: React.FC = () => {
    const { users, rooms, conversations } = useAdmin();

    const totalUsers = users.length;
    const totalRooms = rooms.length;
    const totalMessages = conversations.reduce((acc, curr) => acc + curr.messages.length, 0) + 15420; 

    const ACTIVITY_DATA = [
        { day: 'Mon', messages: 1240, visitors: 450 },
        { day: 'Tue', messages: 1560, visitors: 480 },
        { day: 'Wed', messages: 1890, visitors: 520 },
        { day: 'Thu', messages: 2100, visitors: 580 },
        { day: 'Fri', messages: 3450, visitors: 750 },
        { day: 'Sat', messages: 4200, visitors: 890 },
        { day: 'Sun', messages: 3800, visitors: 820 },
    ];

    const maxMsg = Math.max(...ACTIVITY_DATA.map(d => d.messages));

    return (
         <div className="container-fluid p-0">
            <h2 className="h3 mb-4 text-gray-800">System Statistics</h2>
            
            <div className="row g-4 mb-4">
                <div className="col-md-4">
                    <Card 
                        title="Total Users" 
                        value={totalUsers.toLocaleString()} 
                        color="bg-info"
                        icon={<svg viewBox="0 0 24 24" width="24" height="24" className="fill-current"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>}
                    />
                </div>
                <div className="col-md-4">
                     <Card 
                        title="Total Messages" 
                        value={totalMessages.toLocaleString()} 
                        color="bg-primary"
                        icon={<svg viewBox="0 0 24 24" width="24" height="24" className="fill-current"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg>}
                    />
                </div>
                <div className="col-md-4">
                     <Card 
                        title="Total Chat Rooms" 
                        value={totalRooms.toLocaleString()} 
                        color="bg-warning"
                        icon={<svg viewBox="0 0 24 24" width="24" height="24" className="fill-current"><path d="M21 6h-2v9H6v2c0 .55.45 1 1 1h11l4 4V7c0-.55-.45-1-1-1zm-4 6V3c0-.55-.45-1-1-1H3c-.55 0-1 .45-1 1v14l4-4h10c.55 0 1-.45 1-1z"/></svg>}
                    />
                </div>
            </div>

            <div className="card border-0 shadow-sm p-4 mb-4">
                <div className="d-flex justify-content-between align-items-end mb-4">
                    <div>
                        <h5 className="fw-bold text-dark">Weekly Activity Trends</h5>
                        <small className="text-muted">Message volume over the last 7 days</small>
                    </div>
                    <div className="text-end">
                         <h3 className="mb-0 fw-bold text-dark">18.2k</h3>
                         <small className="text-success fw-bold">▲ 12% vs last week</small>
                    </div>
                </div>

                <div className="d-flex align-items-end justify-content-between" style={{ height: '200px' }}>
                    {ACTIVITY_DATA.map((item) => (
                        <div key={item.day} className="flex-grow-1 mx-1 d-flex flex-column justify-content-end align-items-center h-100">
                            <div 
                                className="w-100 bg-primary rounded-top" 
                                style={{ height: `${(item.messages / maxMsg) * 100}%`, maxWidth: '40px', opacity: 0.8 }}
                                title={`${item.messages} messages`}
                            ></div>
                            <small className="mt-2 text-muted fw-bold" style={{fontSize: '0.7rem'}}>{item.day}</small>
                        </div>
                    ))}
                </div>
            </div>

            <div className="row g-4">
                 <div className="col-md-4">
                     <div className="card shadow-sm border-0 h-100">
                         <div className="card-body">
                             <h6 className="card-subtitle mb-2 text-muted text-uppercase small fw-bold">CPU Usage</h6>
                             <h3 className="card-title text-dark">42% <span className="fs-6 text-muted fw-normal">/ 100%</span></h3>
                             <div className="progress mt-3" style={{height: '6px'}}>
                                 <div className="progress-bar bg-success" style={{width: '42%'}}></div>
                             </div>
                         </div>
                     </div>
                 </div>

                 <div className="col-md-4">
                     <div className="card shadow-sm border-0 h-100">
                         <div className="card-body">
                             <h6 className="card-subtitle mb-2 text-muted text-uppercase small fw-bold">Memory (RAM)</h6>
                             <h3 className="card-title text-dark">6.2 <span className="fs-6 text-muted fw-normal">GB / 16 GB</span></h3>
                             <div className="progress mt-3" style={{height: '6px'}}>
                                 <div className="progress-bar bg-primary" style={{width: '38%'}}></div>
                             </div>
                         </div>
                     </div>
                 </div>

                 <div className="col-md-4">
                     <div className="card shadow-sm border-0 h-100">
                         <div className="card-body">
                             <h6 className="card-subtitle mb-2 text-muted text-uppercase small fw-bold">Storage</h6>
                             <h3 className="card-title text-dark">84% <span className="fs-6 text-muted fw-normal">Used</span></h3>
                             <div className="progress mt-3" style={{height: '6px'}}>
                                 <div className="progress-bar bg-danger" style={{width: '84%'}}></div>
                             </div>
                         </div>
                     </div>
                 </div>
            </div>
         </div>
    );
};
