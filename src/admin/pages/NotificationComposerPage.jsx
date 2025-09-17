import React, { useState, useMemo } from 'react';
import { Bell, Plus, Search, Users, BarChart2, Clock, Send, Edit, Trash2, Link as LinkIcon, Eye } from 'lucide-react';

// Mock data
const mockNotifications = [
  { id: 1, title: "Mid-term Stress Busters", audience: "Final Year Students", sentDate: "2025-09-15", openRate: 68, status: "Sent" },
  { id: 2, title: "Welcome Week Yoga Session", audience: "1st Year Students", sentDate: "2025-09-01", openRate: 75, status: "Sent" },
  { id: 3, title: "New Resource on Sleep", audience: "All Students", sentDate: "2025-09-18", openRate: 0, status: "Scheduled" }
];

const NotificationComposerPage = () => {
  const [view, setView] = useState('dashboard'); // 'dashboard' or 'composer'
  const [editingNotification, setEditingNotification] = useState(null);

  // Composer State
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [link, setLink] = useState('');
  const [targetAudience, setTargetAudience] = useState({ year: 'all', department: 'all' });
  const [schedule, setSchedule] = useState('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [isReviewed, setIsReviewed] = useState(false);
  
  const audienceCount = useMemo(() => {
    // In a real app, this would be a calculation based on the filters
    if (targetAudience.year === 'all' && targetAudience.department === 'all') return 1250;
    if (targetAudience.year === 'final') return 450;
    return 800;
  }, [targetAudience]);

  const handleCreate = () => {
    setEditingNotification(null);
    setTitle('');
    setMessage('');
    setLink('');
    setTargetAudience({ year: 'all', department: 'all' });
    setSchedule('now');
    setScheduleDate('');
    setIsReviewed(false);
    setView('composer');
  };
  
  const handleSend = () => {
    if (!isReviewed) {
      alert("Please review and confirm the notification before sending.");
      return;
    }
    alert("Notification has been scheduled/sent!");
    setView('dashboard');
  };

  if (view === 'composer') {
    return (
      <div className="w-full p-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Create Notification</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Composer Side */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border space-y-6">
            {/* Step 1: Compose */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Step 1: Compose Message</h2>
              <input type="text" placeholder="Notification Title (e.g., Mid-term Stress Busters)" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded mb-2" />
              <textarea placeholder="Message body..." value={message} onChange={e => setMessage(e.target.value)} className="w-full p-2 border rounded h-24 mb-2" />
              <div className="relative"><LinkIcon className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={16}/><input type="text" placeholder="Link to in-app content (optional)" value={link} onChange={e => setLink(e.target.value)} className="w-full p-2 pl-8 border rounded" /></div>
            </div>
            {/* Step 2: Define Audience */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Step 2: Define Audience</h2>
              <div className="flex gap-4">
                <select value={targetAudience.year} onChange={e => setTargetAudience({...targetAudience, year: e.target.value})} className="p-2 border rounded w-full">
                  <option value="all">All Academic Years</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="final">Final Year</option>
                </select>
                <select value={targetAudience.department} onChange={e => setTargetAudience({...targetAudience, department: e.target.value})} className="p-2 border rounded w-full">
                  <option value="all">All Departments</option>
                  <option value="cse">Computer Science</option>
                  <option value="mech">Mechanical</option>
                </select>
              </div>
            </div>
            {/* Step 3: Schedule */}
            <div>
              <h2 className="text-xl font-semibold mb-3">Step 3: Schedule & Confirm</h2>
              <div className="flex gap-4 mb-4">
                <button onClick={() => setSchedule('now')} className={`p-2 border rounded w-full ${schedule === 'now' ? 'bg-blue-600 text-white' : ''}`}>Send Immediately</button>
                <button onClick={() => setSchedule('later')} className={`p-2 border rounded w-full ${schedule === 'later' ? 'bg-blue-600 text-white' : ''}`}>Schedule for Later</button>
              </div>
              {schedule === 'later' && <input type="datetime-local" value={scheduleDate} onChange={e => setScheduleDate(e.target.value)} className="w-full p-2 border rounded" />}
              <div className="mt-4 p-4 bg-yellow-50 border-l-4 border-yellow-400">
                <h3 className="font-bold">Final Review</h3>
                <p className="text-sm">This notification will be sent to an estimated <strong>{audienceCount} students</strong>.</p>
                <div className="mt-2"><label className="flex items-center"><input type="checkbox" checked={isReviewed} onChange={e => setIsReviewed(e.target.checked)} className="mr-2" /> I have reviewed the message and audience.</label></div>
              </div>
            </div>
          </div>
          {/* Preview Side */}
          <div className="bg-gray-800 p-6 rounded-lg flex items-center justify-center">
             <div className="w-64 h-auto bg-white rounded-2xl shadow-2xl p-3">
                <p className="text-xs font-bold mb-1">Manas Mitra</p>
                <p className="text-sm font-semibold">{title || "Notification Title"}</p>
                <p className="text-sm">{message || "Message body will appear here..."}</p>
             </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
            <button onClick={() => setView('dashboard')} className="px-6 py-2 border rounded-lg">Cancel</button>
            <button onClick={handleSend} disabled={!isReviewed} className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-400">Schedule Notification</button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600">Compose, schedule, and track push notifications.</p>
        </div>
        <button onClick={handleCreate} className="px-5 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"><Plus size={16}/> Create Notification</button>
      </div>
      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border"><p className="text-sm text-gray-500">Total Sent (30d)</p><p className="text-2xl font-bold">42</p></div>
        <div className="bg-white p-4 rounded-lg shadow-sm border"><p className="text-sm text-gray-500">Avg. Open Rate</p><p className="text-2xl font-bold">71%</p></div>
        <div className="bg-white p-4 rounded-lg shadow-sm border"><p className="text-sm text-gray-500">Most Effective</p><p className="text-lg font-semibold">Welcome Week Yoga</p></div>
      </div>
      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Audience</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Open Rate</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="p-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {mockNotifications.map(n => (
              <tr key={n.id} className="hover:bg-gray-50">
                <td className="p-3 font-medium">{n.title}</td>
                <td className="p-3 text-sm text-gray-600">{n.audience}</td>
                <td className="p-3 text-sm text-gray-600">{n.sentDate}</td>
                <td className="p-3 text-sm text-gray-600">{n.status === "Sent" ? `${n.openRate}%` : "-"}</td>
                <td className="p-3"><span className={`px-2 py-1 text-xs rounded-full ${n.status === "Sent" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>{n.status}</span></td>
                <td className="p-3 flex gap-2"><button className="text-gray-500 hover:text-blue-600"><Edit size={16}/></button><button className="text-gray-500 hover:text-red-600"><Trash2 size={16}/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NotificationComposerPage;