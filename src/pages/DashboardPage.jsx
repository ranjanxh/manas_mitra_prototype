import React, { useState, useEffect } from 'react';
import { Brain, Heart, Users, MessageSquare, Target, CheckCircle, Clock, Circle, ThumbsUp } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Dashboard Widget Components ---

const DashboardHeader = () => {
  const [greeting, setGreeting] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    
    if (hour < 12) {
      setGreeting('Good Morning');
    } else if (hour < 17) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Evening');
    }

    setCurrentDate(now.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }));
  }, []);

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        {greeting}, Himanshu! 👋
      </h1>
      <p className="text-slate-600">{currentDate}</p>
    </div>
  );
};

const QuickActions = () => {
  const actions = [
    { icon: <Brain className="w-6 h-6 text-blue-600" />, title: 'AI Support', description: 'Chat with your wellness companion', path: '/ai-chat' },
    { icon: <Heart className="w-6 h-6 text-green-600" />, title: '5-Min Meditation', description: 'Quick mindfulness break', path: '/meditation' },
    { icon: <Users className="w-6 h-6 text-purple-600" />, title: 'Community Circle', description: 'Connect with peers', path: '/community' },
    { icon: <MessageSquare className="w-6 h-6 text-orange-600" />, title: 'Vent Jar', description: 'Express your feelings safely', path: '/community' }
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link to={action.path} key={index}>
            <div className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-lg h-full transition-shadow text-center">
              <div className="flex flex-col items-center space-y-2">
                {action.icon}
                <h3 className="font-medium text-slate-800">{action.title}</h3>
                <p className="text-sm text-slate-600">{action.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const CurrentJourney = () => {
  const progress = 65;
  const todaysTasks = [
    { task: 'Morning mindfulness check-in', completed: true },
    { task: 'Practice gratitude journaling', completed: true },
    { task: 'Read stress management article', completed: false },
    { task: 'Evening reflection', completed: false }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Current Journey</h2>
        <span className="text-sm text-slate-500">Week 3 of 4</span>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium text-slate-700 mb-2">Stress Management Fundamentals</h3>
        <div className="w-full bg-gray-200 rounded-full h-2.5"><div className="bg-gradient-to-r from-blue-500 to-green-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div></div>
        <p className="text-sm text-slate-600 mt-2">{progress}% Complete</p>
      </div>
      <div className="mb-6">
        <h4 className="font-medium text-slate-700 mb-2 flex items-center"><Target className="w-4 h-4 mr-2 text-blue-600" />Next Up</h4>
        <p className="text-slate-600 bg-blue-50 rounded-lg p-3">Practice the 4-7-8 breathing technique</p>
      </div>
      <div>
        <h4 className="font-medium text-slate-700 mb-3">Today's Tasks</h4>
        <div className="space-y-2">
          {todaysTasks.map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <CheckCircle className={`w-5 h-5 ${item.completed ? 'text-green-500' : 'text-gray-300'}`} />
              <span className={`${item.completed ? 'text-slate-500 line-through' : 'text-slate-700'}`}>{item.task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Recommendations = () => {
  const recommendations = [
    { title: 'Managing Exam Anxiety', time: '5 min read', tags: ['anxiety', 'exams']},
    { title: 'Guided Sleep Meditation', time: '15 min audio', tags: ['sleep', 'meditation']},
  ];
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Recommended for You</h2>
      <div className="space-y-4">
        {recommendations.map((item, index) => (
          <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
            <h3 className="font-medium text-slate-800 mb-2">{item.title}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-500">{item.time}</span>
              </div>
              <div className="flex space-x-1">
                {item.tags.map((tag) => (
                  <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CommunityPulse = () => {
  const communityPosts = [
    { user: 'Anonymous Butterfly', content: 'Feeling hopeful for the first time in weeks! 💙', timeAgo: '2m ago', likes: 12, comments: 3 },
    { user: 'Anonymous Phoenix', content: 'The breathing exercises from the AI companion actually helped during my interview today.', timeAgo: '15m ago', likes: 8, comments: 7 },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-slate-800">Community Pulse</h2>
        <div className="flex items-center space-x-1"><Circle className="w-2 h-2 text-green-500 fill-current" /><span className="text-sm text-green-600 font-medium">Live</span></div>
      </div>
      <div className="space-y-4">
        {communityPosts.map((post, index) => (
          <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between mb-2"><span className="text-sm font-medium text-blue-600">{post.user}</span><span className="text-xs text-slate-500">{post.timeAgo}</span></div>
            <p className="text-sm text-slate-700 mb-3">{post.content}</p>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-slate-500 hover:text-red-500 text-xs"><ThumbsUp className="w-4 h-4" /><span>{post.likes}</span></button>
              <button className="flex items-center space-x-1 text-slate-500 hover:text-blue-500 text-xs"><MessageSquare className="w-4 h-4" /><span>{post.comments}</span></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Main Dashboard Page Component ---

const DashboardPage = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Center Column */}
        <div className="lg:col-span-2 space-y-8">
          <DashboardHeader />
          <QuickActions />
          <CurrentJourney />
          <Recommendations />
        </div>
        {/* Right Column */}
        <div className="lg:col-span-1">
          <CommunityPulse />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;