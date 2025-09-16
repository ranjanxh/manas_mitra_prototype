import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Home, BookOpen, Users, UserCircle } from 'lucide-react';
import logo from '../../assets/logo.png';

const DashboardSidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, label: 'Wellness Library', path: '/library' },
    { icon: Users, label: 'Community Circle', path: '/community' },
    { icon: UserCircle, label: 'Counselor Connect', path: '/connect' }
  ];

  const activeLinkStyle = {
    backgroundColor: '#EFF6FF', // Tailwind's blue-50
    color: '#2563EB', // Tailwind's blue-600
    fontWeight: '600',
    borderRight: '3px solid #2563EB'
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 z-40 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Manas Mitra Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold text-dark-navy">Manas Mitra</span>
        </Link>
      </div>

      <nav className="mt-6 flex-1">
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={({ isActive }) => isActive ? activeLinkStyle : undefined}
            className="flex items-center px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-green-100 rounded-lg p-4 text-center">
          <p className="text-sm font-semibold text-green-800 mb-2">Daily Wellness</p>
          <button className="w-full bg-green-600 text-white text-xs py-2 px-3 rounded font-medium hover:bg-green-700 transition-colors">
            Start 5-min Meditation
          </button>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;