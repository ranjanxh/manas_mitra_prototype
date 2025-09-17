import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, UserCheck, ShieldCheck, Bell, Calendar, Plus, MessageSquare } from 'lucide-react';
import CampusMoodChart from '../components/dashboard/CampusMoodChart';
// --- Sub-Components for the Dashboard ---

const StatCard = ({ title, value, change, icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${color}`}>{icon}</div>
    </div>
    <p className="text-sm text-gray-500 mt-2">{change}</p>
  </div>
);


const TrendingTopics = () => {
  // Sample data for the word cloud
  const topics = [
    { text: 'Exams', value: 64 },
    { text: 'Anxiety', value: 45 },
    { text: 'Placements', value: 32 },
    { text: 'Loneliness', value: 28 },
    { text: 'Sleep', value: 22 },
    { text: 'Relationships', value: 18 },
  ];
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Topics</h3>
      <div className="h-64 bg-gray-50 rounded-lg p-4 flex flex-wrap items-center justify-center gap-4">
        {/* This is a basic word cloud simulation. */}
        {topics.map(topic => (
          <span 
            key={topic.text}
            className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full cursor-pointer hover:bg-blue-200"
            style={{ fontSize: `${12 + (topic.value / 10)}px` }}
          >
            {topic.text}
          </span>
        ))}
      </div>
    </div>
  );
};

const ModerationQueueSummary = () => (
  <Link to="/admin/moderation" className="block bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Moderation Queue</h3>
    <p className="text-4xl font-bold text-orange-500">5</p>
    <p className="text-sm text-gray-500">Posts Awaiting Review</p>
  </Link>
);

const QuickActions = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm border">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
    <div className="space-y-3">
      <Link to="/admin/notifications" className="w-full block text-center p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">Send Notification</Link>
      <Link to="/admin/events" className="w-full block text-center p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">Schedule Event</Link>
      <Link to="/admin/counselors" className="w-full block text-center p-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">Onboard Counselor</Link>
    </div>
  </div>
);

// --- Main Admin Dashboard Page ---

const AdminDashboardPage = () => {
  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">
          Welcome back, Admin. Today is {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Active Students (7d)" value="1,250" change="+5.2%" icon={<Users size={24} className="text-blue-600"/>} color="bg-blue-100" />
        <StatCard title="Appointments Booked (7d)" value="85" change="-1.5%" icon={<UserCheck size={24} className="text-green-600"/>} color="bg-green-100" />
        <StatCard title="Community Posts (7d)" value="230" change="+10.8%" icon={<MessageSquare size={24} className="text-purple-600"/>} color="bg-purple-100" />
        <StatCard title="Avg. Mood Rating" value="7.2/10" change="+0.3" icon={<BarChart3 size={24} className="text-yellow-600"/>} color="bg-yellow-100" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <CampusMoodChart />
          <TrendingTopics />
        </div>
        <div className="lg:col-span-1 space-y-8">
          <ModerationQueueSummary />
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;