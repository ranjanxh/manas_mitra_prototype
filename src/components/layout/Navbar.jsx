// src/components/layout/Navbar.jsx

import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { User } from 'lucide-react';
import logo from '../../assets/logo.png';

const Navbar = ({ isLoggedIn, onLogin }) => {
  const activeLinkStyle = { color: '#2B59C3', fontWeight: '600' };

  return (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Manas Mitra Logo" className="h-8 w-auto" />
          <span className="text-xl font-bold text-dark-navy">Manas Mitra</span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLink to="/" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-primary-blue transition-colors font-medium">Home</NavLink>
          <NavLink to="/about" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-primary-blue transition-colors font-medium">About</NavLink>
          <NavLink to="/features" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-primary-blue transition-colors font-medium">Features</NavLink>
          <NavLink to="/contact" style={({ isActive }) => isActive ? activeLinkStyle : undefined} className="text-gray-600 hover:text-primary-blue transition-colors font-medium">Contact</NavLink>
        </div>

        {/* Action Buttons: This part is now dynamic */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            // --- SHOWS IF LOGGED IN ---
            <>
              <Link to="/dashboard" className="px-5 py-2 rounded-lg font-medium text-white bg-primary-blue hover:bg-blue-700 transition-colors">
                View Dashboard
              </Link>
              <button className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-600" />
              </button>
            </>
          ) : (
            // --- SHOWS IF LOGGED OUT ---
            <>
              <button
                onClick={onLogin}
                className="px-5 py-2 rounded-lg font-medium text-primary-green border border-primary-green hover:bg-green-50 transition-colors"
              >
                Login as Guest
              </button>
              <Link to="/signup" className="px-5 py-2 rounded-lg font-medium text-white bg-primary-blue hover:bg-blue-700 transition-colors">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;