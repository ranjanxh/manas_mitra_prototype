// src/components/layout/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'; // Import the logo

const Footer = () => {
  return (
    <footer className="bg-dark-navy text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img src={logo} alt="Manas Mitra Logo" className="h-10 w-auto" />
              <span className="text-2xl font-bold text-white">Manas Mitra</span>
            </div>
            <p className="text-gray-400">
              Supporting student mental health and wellbeing at MAIT.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-300 hover:text-white transition-colors">Features</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <p className="text-gray-300 text-sm">
              Student Welfare Building<br />
              Maharaja Agrasen Institute of Technology<br />
              support@manasmitra.ac.in
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-700 text-center">
          <p className="text-gray-400">&copy; 2025 Manas Mitra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;