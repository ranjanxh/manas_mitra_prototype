import React, { useState } from 'react';
import { Calendar, Users, Clock, TrendingUp, Filter } from 'lucide-react';

const UsageHeatmapsPage = () => {
  const [dateRange, setDateRange] = useState('last-30-days');
  const [selectedMetric, setSelectedMetric] = useState('active-users');

  // Mock data for engagement by department & academic year
  const departments = ['CSE', 'Mech', 'Civil', 'EEE', 'ECE', 'Humanities', 'Management', 'Science'];
  const academicYears = ['1st Year', '2nd Year', '3rd Year', 'Final Year'];
  
  const engagementData = {
    'active-users': {
      'CSE': [89, 76, 82, 91],
      'Mech': [67, 71, 69, 73],
      'Civil': [54, 58, 61, 65],
      'EEE': [78, 82, 79, 84],
      'ECE': [81, 77, 83, 88],
      'Humanities': [92, 87, 89, 94],
      'Management': [71, 68, 74, 77],
      'Science': [85, 79, 81, 86]
    },
    'sessions-per-user': {
      'CSE': [4.2, 3.8, 4.1, 4.5],
      'Mech': [3.1, 3.4, 3.2, 3.6],
      'Civil': [2.8, 2.9, 3.1, 3.3],
      'EEE': [3.7, 3.9, 3.8, 4.0],
      'ECE': [4.0, 3.6, 4.2, 4.3],
      'Humanities': [4.8, 4.5, 4.7, 5.1],
      'Management': [3.3, 3.1, 3.5, 3.7],
      'Science': [4.1, 3.7, 3.9, 4.2]
    }
  };

  // Mock data for peak usage times
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = Array.from({length: 24}, (_, i) => i);
  
  const usageTimeData = [
    [12, 8, 6, 4, 3, 2, 1, 3, 15, 25, 22, 28, 32, 35, 40, 38, 42, 45, 48, 52, 58, 65, 45, 25],
    [18, 12, 8, 5, 4, 2, 1, 4, 20, 30, 28, 32, 38, 42, 45, 44, 48, 52, 55, 58, 62, 68, 48, 28],
    [22, 15, 10, 6, 5, 3, 2, 5, 25, 35, 32, 38, 44, 48, 52, 50, 55, 58, 62, 65, 68, 72, 52, 32],
    [20, 14, 9, 6, 4, 3, 2, 4, 22, 32, 30, 35, 40, 44, 48, 46, 50, 54, 58, 62, 65, 70, 50, 30],
    [25, 18, 12, 8, 6, 4, 3, 6, 28, 38, 35, 42, 48, 52, 55, 54, 58, 62, 65, 68, 72, 75, 55, 35],
    [35, 28, 22, 18, 15, 12, 8, 15, 45, 55, 52, 58, 65, 70, 75, 72, 78, 82, 85, 88, 92, 95, 75, 55],
    [40, 32, 25, 20, 18, 15, 10, 20, 50, 60, 58, 65, 72, 78, 82, 80, 85, 88, 92, 95, 98, 100, 80, 60]
  ];

  const getEngagementColor = (value, metric) => {
    const max = metric === 'active-users' ? 100 : 5.5;
    const intensity = value / max;
    const opacity = Math.max(0.1, intensity);
    return `rgba(59, 130, 246, ${opacity})`;
  };

  const getUsageTimeColor = (value) => {
    const intensity = value / 100;
    const opacity = Math.max(0.1, intensity);
    return `rgba(34, 197, 94, ${opacity})`;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Platform Usage Heatmaps</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gray-600" />
              <select 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="last-7-days">Last 7 Days</option>
                <option value="last-30-days">Last 30 Days</option>
                <option value="last-90-days">Last 90 Days</option>
                <option value="current-semester">Current Semester</option>
              </select>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Filter className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>
        <p className="text-gray-600">Analyze platform usage patterns to identify engagement trends and support needs.</p>
      </div>

      {/* Primary Heatmap: Engagement by Department & Academic Year */}
      <div className="bg-white rounded-lg shadow-sm mb-8 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Engagement by Department & Academic Year
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Metric:</span>
            <select 
              value={selectedMetric} 
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="active-users">Active Users (%)</option>
              <option value="sessions-per-user">Sessions per User</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2 font-medium text-gray-700">Department</th>
                {academicYears.map(year => (
                  <th key={year} className="text-center p-2 font-medium text-gray-700 min-w-24">{year}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {departments.map(dept => (
                <tr key={dept} className="border-t">
                  <td className="p-2 font-medium text-gray-900">{dept}</td>
                  {engagementData[selectedMetric][dept].map((value, index) => (
                    <td key={index} className="p-1">
                      <div 
                        className="h-12 w-full rounded flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all"
                        style={{ backgroundColor: getEngagementColor(value, selectedMetric) }}
                        title={`${dept} - ${academicYears[index]}: ${value}${selectedMetric === 'active-users' ? '%' : ' sessions'}`}
                      >
                        <span className="text-sm font-medium text-gray-800">
                          {selectedMetric === 'active-users' ? `${value}%` : value}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}></div>
              <span className="text-sm text-gray-600">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(59, 130, 246, 0.6)' }}></div>
              <span className="text-sm text-gray-600">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(59, 130, 246, 1)' }}></div>
              <span className="text-sm text-gray-600">High</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Hover over cells for detailed metrics
          </div>
        </div>
      </div>

      {/* Secondary Heatmap: Peak Usage Times */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2 mb-6">
          <Clock className="w-5 h-5 text-green-600" />
          Peak Usage Times
        </h2>
        
        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="flex mb-2">
              <div className="w-12"></div>
              {hours.map(hour => (
                <div key={hour} className="w-8 text-xs text-center text-gray-600 px-1">
                  {hour.toString().padStart(2, '0')}
                </div>
              ))}
            </div>
            {days.map((day, dayIndex) => (
              <div key={day} className="flex items-center mb-1">
                <div className="w-12 text-sm font-medium text-gray-700 pr-2">{day}</div>
                {usageTimeData[dayIndex].map((value, hourIndex) => (
                  <div
                    key={hourIndex}
                    className="w-8 h-8 m-px rounded cursor-pointer hover:ring-2 hover:ring-green-300 transition-all flex items-center justify-center"
                    style={{ backgroundColor: getUsageTimeColor(value) }}
                    title={`${day} ${hourIndex}:00 - ${value} active users`}
                  >
                    <span className="text-xs font-medium text-gray-800 opacity-75">
                      {value > 50 ? value : ''}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(34, 197, 94, 0.2)' }}></div>
              <span className="text-sm text-gray-600">Low Activity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(34, 197, 94, 0.6)' }}></div>
              <span className="text-sm text-gray-600">Moderate Activity</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: 'rgba(34, 197, 94, 1)' }}></div>
              <span className="text-sm text-gray-600">Peak Activity</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Peak: Weekends 20:00-22:00
            </div>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Most Active Department</p>
              <p className="text-2xl font-bold text-gray-900">Humanities</p>
              <p className="text-sm text-green-600">94% engagement rate</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Peak Usage Hour</p>
              <p className="text-2xl font-bold text-gray-900">22:00</p>
              <p className="text-sm text-green-600">100 concurrent users</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Highest Growth</p>
              <p className="text-2xl font-bold text-gray-900">Final Year</p>
              <p className="text-sm text-green-600">+15% this month</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsageHeatmapsPage;