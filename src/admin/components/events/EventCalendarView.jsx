import React, { useState } from 'react';
import { Calendar, Plus, ChevronLeft, ChevronRight } from 'lucide-react';

const EventCalendarView = ({ events, onViewChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    // Pad start of month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    return days;
  };

  const getEventsForDate = (day) => {
    if (!day) return [];
    return events.filter(event => new Date(event.date).toDateString() === day.toDateString());
  };

  const isToday = (day) => {
    if (!day) return false;
    return day.toDateString() === new Date().toDateString();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event Management</h1>
          <p className="text-gray-600">Manage wellness events and track engagement</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => onViewChange('list')} className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            List View
          </button>
          <button onClick={() => onViewChange('create')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 transition-colors">
            <Plus size={16} /> Create Event
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Calendar Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </h2>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={20} /></button>
            <button onClick={() => setCurrentDate(new Date())} className="px-4 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg border transition-colors">Today</button>
            <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))} className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={20} /></button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="p-4">
          <div className="grid grid-cols-7 gap-px text-center text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => <div key={day}>{day}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-px bg-gray-100 border-t border-l border-gray-200">
            {getCalendarDays().map((day, index) => {
              const dayEvents = getEventsForDate(day);
              return (
                <div key={index} className="bg-white min-h-32 p-2 border-r border-b border-gray-200">
                  {day && (
                    <div className={`text-sm font-medium ${isToday(day) ? 'bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center' : 'text-gray-800'}`}>
                      {day.getDate()}
                    </div>
                  )}
                  <div className="mt-1 space-y-1">
                    {dayEvents.map(event => (
                      <div 
                        key={event.id} 
                        onClick={() => onViewChange('analytics', event)} 
                        className="bg-blue-100 text-blue-800 text-xs p-1.5 rounded cursor-pointer hover:bg-blue-200 transition-colors"
                      >
                        <p className="font-semibold truncate">{event.title}</p>
                        <p className="text-blue-700">{event.startTime}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCalendarView;