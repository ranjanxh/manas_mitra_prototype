// src/admin/components/layout/AdminSidebar.jsx
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from "../../../assets/logo.png";
import { LayoutDashboard, BookOpen, Users, UserCheck, ShieldCheck, Bell, BarChart2, FileText, Settings, LogOut, Calendar } from 'lucide-react';
const AdminSidebar = () => {
  const activeLinkStyle = {
    backgroundColor: '#EFF6FF', // Tailwind's blue-50
    color: '#2563EB', // Tailwind's blue-600
    fontWeight: '600',
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-50 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Manas Mitra Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold text-dark-navy">Manas Mitra</span>
        </Link>
        <div className="text-xs text-gray-500 mt-1 ml-10">Admin Panel</div>
      </div>

      <nav className="flex-1 mt-6 px-2 space-y-1">
        <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Analytics</p>
        <NavLink to="/admin/dashboard" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50">
          <LayoutDashboard size={18} className="mr-3" /> Dashboard
        </NavLink>
        <NavLink to="/admin/heatmaps" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50">
          <BarChart2 size={18} className="mr-3" /> Usage Heatmaps
        </NavLink>
        <NavLink to="/admin/resource-gaps" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50">
          <FileText size={18} className="mr-3" /> Resource Gaps
        </NavLink>
        
        <p className="px-4 pt-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Management</p>
        <NavLink to="/admin/resources" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50">
          <BookOpen size={18} className="mr-3" /> Resources (CMS)
        </NavLink>
        <NavLink to="/admin/counselors" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50">
          <UserCheck size={18} className="mr-3" /> Counselors
        </NavLink>
        <NavLink to="/admin/moderation" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50">
          <ShieldCheck size={18} className="mr-3" /> Moderation
        </NavLink>
        
        <p className="px-4 pt-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Engagement</p>
        <NavLink to="/admin/notifications" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50">
          <Bell size={18} className="mr-3" /> Notifications
        </NavLink>
        <NavLink to="/admin/events" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50">
          <Calendar size={18} className="mr-3" /> Events
        </NavLink>
      </nav>

      <div className="p-2 border-t border-gray-200">
        <NavLink to="/admin/settings" style={({ isActive }) => isActive ? activeLinkStyle : {}} className="flex items-center px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50">
          <Settings size={18} className="mr-3" /> Settings
        </NavLink>
        <a href="#" className="flex items-center w-full px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50">
          <LogOut size={18} className="mr-3" /> Log Out
        </a>
      </div>
    </aside>
  );
};

export default AdminSidebar;