import React, { useState, useEffect } from 'react';
import { Heart, Users, MessageCircle, Wind, BookOpen, User } from 'lucide-react';

const WellnessCheckin = () => {
  const [hasCheckedIn, setHasCheckedIn] = useState(false);
  const [selectedMood, setSelectedMood] = useState(null);
  const [showResponse, setShowResponse] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [userName] = useState('Himanshu'); // This would come from user context

  // Set time-sensitive greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }

    // Check if user has already checked in today
    const today = new Date().toDateString();
    const lastCheckin = sessionStorage.getItem('lastWellnessCheckin');
    if (lastCheckin === today) {
      setHasCheckedIn(true);
    }
  }, []);

  const moodOptions = [
    { value: 1, emoji: '😞', label: 'Awful' },
    { value: 2, emoji: '😟', label: 'Not Great' },
    { value: 3, emoji: '😐', label: 'Okay' },
    { value: 4, emoji: '🙂', label: 'Good' },
    { value: 5, emoji: '😊', label: 'Great' }
  ];

  const handleMoodSelection = (mood) => {
    setSelectedMood(mood);
    setShowResponse(true);
    setHasCheckedIn(true);
    
    // Store check-in for today
    const today = new Date().toDateString();
    sessionStorage.setItem('lastWellnessCheckin', today);
  };

  const getResponseContent = () => {
    if (!selectedMood) return null;

    if (selectedMood.value >= 4) {
      return {
        message: "That's great to hear! Keep that positive energy going. Would you like to try a 2-minute gratitude journaling exercise to build on that?",
        actions: [
          { text: "Start Journaling", icon: BookOpen, color: "bg-green-500 hover:bg-green-600" },
          { text: "No, thanks", icon: null, color: "bg-gray-500 hover:bg-gray-600" }
        ]
      };
    } else if (selectedMood.value === 3) {
      return {
        message: "Thanks for checking in. 'Okay' is a perfectly valid state. Is there anything you'd like to explore today?",
        actions: [
          { text: "Explore Resources", icon: BookOpen, color: "bg-blue-500 hover:bg-blue-600" },
          { text: "Visit Community Circle", icon: Users, color: "bg-purple-500 hover:bg-purple-600" }
        ]
      };
    } else {
      return {
        message: "I'm sorry to hear you're not feeling great. Thank you for sharing. Remember, it's okay to not be okay. Here are a few things that might help right now.",
        actions: [
          { text: "Talk to AI Friend", icon: MessageCircle, color: "bg-indigo-500 hover:bg-indigo-600" },
          { text: "Try 3-Min Breathing Exercise", icon: Wind, color: "bg-teal-500 hover:bg-teal-600" },
          { text: "View Counselor Profiles", icon: User, color: "bg-orange-500 hover:bg-orange-600" }
        ]
      };
    }
  };

  const resetCheckin = () => {
    setHasCheckedIn(false);
    setSelectedMood(null);
    setShowResponse(false);
    sessionStorage.removeItem('lastWellnessCheckin');
  };

  if (hasCheckedIn && !showResponse) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-green-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Daily Check-in Complete</h3>
              <p className="text-sm text-gray-600">Thank you for taking care of your wellness today!</p>
            </div>
          </div>
          <button
            onClick={resetCheckin}
            className="text-sm text-blue-600 hover:text-blue-800 underline"
          >
            Check in again
          </button>
        </div>
      </div>
    );
  }

  const responseContent = getResponseContent();

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6 overflow-hidden">
      {/* Initial Check-in State */}
      {!showResponse && (
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {greeting}, {userName}!
              </h3>
              <p className="text-sm text-gray-600">Time for your daily wellness check-in</p>
            </div>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-700 font-medium mb-4">How are you feeling right now?</p>
            <div className="flex space-x-3 justify-center">
              {moodOptions.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => handleMoodSelection(mood)}
                  className="flex flex-col items-center p-3 rounded-lg border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors duration-200 group"
                >
                  <span className="text-3xl mb-1 transform group-hover:scale-110 transition-transform duration-200">
                    {mood.emoji}
                  </span>
                  <span className="text-xs text-gray-600 group-hover:text-blue-700">
                    {mood.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Response State */}
      {showResponse && responseContent && (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{selectedMood.emoji}</span>
                <span className="text-sm text-gray-600">You're feeling {selectedMood.label.toLowerCase()}</span>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{responseContent.message}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            {responseContent.actions.map((action, index) => (
              <button
                key={index}
                className={`inline-flex items-center px-4 py-2 rounded-lg text-white text-sm font-medium transition-colors duration-200 ${action.color}`}
              >
                {action.icon && <action.icon className="w-4 h-4 mr-2" />}
                {action.text}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              onClick={resetCheckin}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to mood selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WellnessCheckin;
