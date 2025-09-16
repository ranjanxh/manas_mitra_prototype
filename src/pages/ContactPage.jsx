// src/pages/ContactPage.jsx

import React, { useState } from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const ContactBlock = ({ icon: Icon, title, children }) => (
  <div className="flex items-start space-x-4 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
    <div className="flex-shrink-0">
      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <div className="text-gray-600">{children}</div>
    </div>
  </div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', subject: '', message: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ fullName: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Get in Touch.</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            We're here to help. Whether you have a question, a suggestion, or need support, we're ready to listen.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
              <div className="space-y-6">
                <ContactBlock icon={MapPin} title="Campus Office">
                  <p>Manas Mitra Initiative<br />Student Welfare Building<br />Delhi College of Technology</p>
                </ContactBlock>
                <ContactBlock icon={Mail} title="General Inquiries">
                  <a href="mailto:support@manasmitra.ac.in" className="text-blue-600 hover:text-blue-800 transition-colors">
                    support@manasmitra.ac.in
                  </a>
                </ContactBlock>
                <ContactBlock icon={Phone} title="Student Support Line">
                  <a href="tel:+911123456789" className="text-blue-600 hover:text-blue-800 transition-colors">
                    +91 11 2345 6789
                  </a>
                </ContactBlock>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-colors" placeholder="Enter your full name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-colors" placeholder="Enter your email address" />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-colors" placeholder="What's this about?" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={5} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 transition-colors resize-none" placeholder="Tell us how we can help you..."></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.551110291754!2d77.0338965752763!3d28.67318187564174!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0354221a2b5b%3A0x14838b5841450a8a!2sDelhi%20Technological%20University!5e0!3m2!1sen!2sin!4v1726519198083!5m2!1sen!2sin" width="100%" height="450" style={{ border:0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Campus Location"></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;