import React, { useState, useEffect } from 'react';
import { Send, Users, Clock, Smartphone, Calendar, Save, Bell, Target, Eye, ChevronDown, ChevronUp } from 'lucide-react';

const NotificationsPage = () => {
  // Form state
  const [notificationTitle, setNotificationTitle] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [optionalLink, setOptionalLink] = useState('');
  
  // Audience targeting state
  const [selectedYears, setSelectedYears] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedEngagement, setSelectedEngagement] = useState([]);
  const [audienceCount, setAudienceCount] = useState(0);
  
  // Scheduling state
  const [scheduleType, setScheduleType] = useState('immediate');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  
  // UI state
  const [currentStep, setCurrentStep] = useState(1);
  const [showDepartments, setShowDepartments] = useState(false);

  // Mock data
  const academicYears = ['1st Year', '2nd Year', '3rd Year', 'Final Year'];
  const departments = [
    'Computer Science', 'Mechanical Engineering', 'Electrical Engineering',
    'Civil Engineering', 'Humanities', 'Business Administration',
    'Mathematics', 'Physics', 'Chemistry', 'Biology'
  ];
  const engagementFilters = [
    'Users who haven\'t logged in for 7 days',
    'Users who have viewed Anxiety content',
    'Users who have viewed Study Tips content',
    'Users who completed wellness assessments',
    'Active users (logged in within 24 hours)',
    'New users (registered within 30 days)'
  ];

  // Calculate audience count based on filters
  useEffect(() => {
    let baseCount = 2500; // Total student base
    
    // Adjust based on academic year selection
    if (selectedYears.length > 0) {
      baseCount = Math.floor(baseCount * (selectedYears.length / 4));
    }
    
    // Adjust based on department selection
    if (selectedDepartments.length > 0) {
      baseCount = Math.floor(baseCount * (selectedDepartments.length / departments.length));
    }
    
    // Adjust based on engagement filters
    if (selectedEngagement.length > 0) {
      selectedEngagement.forEach(filter => {
        if (filter.includes('haven\'t logged in')) {
          baseCount = Math.floor(baseCount * 0.3);
        } else if (filter.includes('Active users')) {
          baseCount = Math.floor(baseCount * 0.4);
        } else if (filter.includes('New users')) {
          baseCount = Math.floor(baseCount * 0.15);
        } else {
          baseCount = Math.floor(baseCount * 0.6);
        }
      });
    }
    
    setAudienceCount(Math.max(1, baseCount));
  }, [selectedYears, selectedDepartments, selectedEngagement]);

  const handleYearChange = (year) => {
    setSelectedYears(prev => 
      prev.includes(year) 
        ? prev.filter(y => y !== year)
        : [...prev, year]
    );
  };

  const handleDepartmentChange = (dept) => {
    setSelectedDepartments(prev => 
      prev.includes(dept) 
        ? prev.filter(d => d !== dept)
        : [...prev, dept]
    );
  };

  const handleEngagementChange = (filter) => {
    setSelectedEngagement(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const handleSendNotification = () => {
    const notification = {
      title: notificationTitle,
      body: messageBody,
      link: optionalLink,
      audience: {
        years: selectedYears,
        departments: selectedDepartments,
        engagement: selectedEngagement,
        count: audienceCount
      },
      schedule: {
        type: scheduleType,
        date: scheduledDate,
        time: scheduledTime
      }
    };
    
    console.log('Sending notification:', notification);
    alert(`Notification ${scheduleType === 'immediate' ? 'sent' : 'scheduled'} successfully to ${audienceCount} students!`);
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...');
    alert('Notification saved as draft!');
  };

  const getStepColor = (step) => {
    if (step < currentStep) return 'bg-green-500 text-white';
    if (step === currentStep) return 'bg-blue-500 text-white';
    return 'bg-gray-200 text-gray-600';
  };

  const isStepComplete = (step) => {
    switch (step) {
      case 1:
        return notificationTitle.trim() && messageBody.trim();
      case 2:
        return selectedYears.length > 0 || selectedDepartments.length > 0 || selectedEngagement.length > 0;
      case 3:
        return scheduleType === 'immediate' || (scheduledDate && scheduledTime);
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Bell className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Push Notifications</h1>
              <p className="text-gray-600">Create targeted notifications for your student community</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${getStepColor(step)}`}>
                  {step}
                </div>
                <div className="ml-3 text-sm">
                  <div className={`font-medium ${step === currentStep ? 'text-blue-600' : 'text-gray-600'}`}>
                    {step === 1 ? 'Compose Message' : step === 2 ? 'Define Audience' : 'Schedule & Send'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {step === 1 ? 'Write your notification' : step === 2 ? 'Target specific groups' : 'Set delivery time'}
                  </div>
                </div>
                {step < 3 && (
                  <div className="w-16 h-px bg-gray-300 ml-8"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Step 1: Compose Message */}
            {currentStep === 1 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Send className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Compose Your Message</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Notification Title *
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Mid-term Stress Busters"
                      value={notificationTitle}
                      onChange={(e) => setNotificationTitle(e.target.value)}
                      maxLength={50}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {notificationTitle.length}/50 characters
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message Body *
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      rows="4"
                      placeholder="e.g., Feeling the pressure? Check out our new guide on effective study habits."
                      value={messageBody}
                      onChange={(e) => setMessageBody(e.target.value)}
                      maxLength={160}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      {messageBody.length}/160 characters
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link (Optional)
                    </label>
                    <input
                      type="url"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., /wellness-library/study-tips"
                      value={optionalLink}
                      onChange={(e) => setOptionalLink(e.target.value)}
                    />
                    <div className="text-xs text-gray-500 mt-1">
                      Deep link to specific content within the app
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setCurrentStep(2)}
                    disabled={!isStepComplete(1)}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      isStepComplete(1)
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Next: Define Audience
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Define Audience */}
            {currentStep === 2 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Target className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Define the Audience</h2>
                </div>
                
                <div className="space-y-6">
                  {/* Academic Year Filter */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by Academic Year</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {academicYears.map((year) => (
                        <label key={year} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={selectedYears.includes(year)}
                            onChange={() => handleYearChange(year)}
                          />
                          <span className="text-sm text-gray-700">{year}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Department Filter */}
                  <div>
                    <div 
                      className="flex items-center justify-between cursor-pointer mb-3"
                      onClick={() => setShowDepartments(!showDepartments)}
                    >
                      <h3 className="text-sm font-medium text-gray-700">Filter by Department</h3>
                      {showDepartments ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                    {showDepartments && (
                      <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                        {departments.map((dept) => (
                          <label key={dept} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              checked={selectedDepartments.includes(dept)}
                              onChange={() => handleDepartmentChange(dept)}
                            />
                            <span className="text-sm text-gray-700">{dept}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Engagement Filter */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Filter by Engagement</h3>
                    <div className="space-y-2">
                      {engagementFilters.map((filter) => (
                        <label key={filter} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={selectedEngagement.includes(filter)}
                            onChange={() => handleEngagementChange(filter)}
                          />
                          <span className="text-sm text-gray-700">{filter}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Audience Summary */}
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-blue-800">Audience Summary</span>
                    </div>
                    <p className="text-blue-700">
                      This notification will be sent to approximately <strong>{audienceCount.toLocaleString()}</strong> students.
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    disabled={!isStepComplete(2)}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      isStepComplete(2)
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Next: Schedule & Send
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Schedule & Send */}
            {currentStep === 3 && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h2 className="text-xl font-semibold text-gray-900">Schedule & Send</h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Scheduling Options</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="schedule"
                          value="immediate"
                          checked={scheduleType === 'immediate'}
                          onChange={(e) => setScheduleType(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Send Immediately</span>
                      </label>
                      
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="radio"
                          name="schedule"
                          value="later"
                          checked={scheduleType === 'later'}
                          onChange={(e) => setScheduleType(e.target.value)}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-gray-700">Schedule for Later</span>
                      </label>
                    </div>
                  </div>
                  
                  {scheduleType === 'later' && (
                    <div className="grid grid-cols-2 gap-4 ml-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Calendar className="w-4 h-4 inline mr-1" />
                          Date
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={scheduledDate}
                          onChange={(e) => setScheduledDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Clock className="w-4 h-4 inline mr-1" />
                          Time
                        </label>
                        <input
                          type="time"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSaveDraft}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save as Draft
                    </button>
                    <button
                      onClick={handleSendNotification}
                      disabled={!isStepComplete(3)}
                      className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                        isStepComplete(3)
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      {scheduleType === 'immediate' ? 'Send Notification' : 'Schedule Notification'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Live Preview Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-4 max-w-sm mx-auto">
                {/* Phone mockup */}
                <div className="bg-white rounded-lg p-4 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <Bell className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-gray-500">Student Wellness App</div>
                      <div className="text-xs text-gray-400">now</div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="font-semibold text-gray-900 text-sm mb-1">
                      {notificationTitle || 'Your notification title...'}
                    </div>
                    <div className="text-gray-600 text-sm leading-relaxed">
                      {messageBody || 'Your notification message will appear here...'}
                    </div>
                    {optionalLink && (
                      <div className="mt-2 text-blue-600 text-xs">
                        🔗 {optionalLink}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {currentStep >= 2 && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Target Audience:</div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-600">
                      {audienceCount.toLocaleString()} students
                    </span>
                  </div>
                </div>
              )}
              
              {currentStep >= 3 && (
                <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-2">Delivery:</div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium">
                      {scheduleType === 'immediate' 
                        ? 'Send immediately' 
                        : `${scheduledDate} at ${scheduledTime}`
                      }
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;