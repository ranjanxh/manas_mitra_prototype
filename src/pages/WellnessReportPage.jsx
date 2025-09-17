import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { 
  Calendar, TrendingUp, Brain, Target, CheckCircle, Activity, BookOpen, Moon, 
  Users, Dumbbell, Coffee, Heart, Award, Star, Zap, ArrowUp, ArrowDown, Minus
} from 'lucide-react';

const WellnessReportPage = () => {
  const [dateRange, setDateRange] = useState('30');
  const [userData, setUserData] = useState({});

  // Generate comprehensive mock data
  useEffect(() => {
    const generateMockData = () => {
      const days = parseInt(dateRange);
      const moodAndActivityData = [];
      const heatmapData = [];
      
      // Generate mood and activity correlation data
      for (let i = days - 1; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dayOfWeek = date.getDay();
        
        // Simulate realistic mood patterns
        let baseMood = 3.2 + Math.random() * 1.5;
        if (dayOfWeek === 0 || dayOfWeek === 6) baseMood += 0.3; // Weekend boost
        
        const activities = [];
        if (Math.random() > 0.4) activities.push('exercise');
        if (Math.random() > 0.5) activities.push('journaling');
        if (Math.random() > 0.6) activities.push('meditation');
        if (Math.random() > 0.3) activities.push('social');
        
        // Mood boost for activities
        baseMood += activities.length * 0.2;
        baseMood = Math.min(5, baseMood);
        
        moodAndActivityData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          mood: parseFloat(baseMood.toFixed(1)),
          activities,
          fullDate: date,
          sleep: 6 + Math.random() * 3
        });

        // Generate heatmap data
        const habitCount = Math.floor(Math.random() * 4);
        heatmapData.push({
          date: i,
          habitCount,
          habits: ['Check-in', 'Exercise', 'Meditation', 'Journaling'].slice(0, habitCount + 1)
        });
      }

      // Calculate KPI trends
      const currentPeriodMood = moodAndActivityData.slice(-7).reduce((sum, day) => sum + day.mood, 0) / 7;
      const previousPeriodMood = moodAndActivityData.slice(-14, -7).reduce((sum, day) => sum + day.mood, 0) / 7;
      const moodTrend = ((currentPeriodMood - previousPeriodMood) / previousPeriodMood) * 100;

      const currentSleep = moodAndActivityData.slice(-7).reduce((sum, day) => sum + day.sleep, 0) / 7;
      const previousSleep = moodAndActivityData.slice(-14, -7).reduce((sum, day) => sum + day.sleep, 0) / 7;
      const sleepTrend = ((currentSleep - previousSleep) / previousSleep) * 100;

      return {
        moodAndActivityData,
        heatmapData,
        avgMood: currentPeriodMood.toFixed(1),
        avgSleep: currentSleep.toFixed(1),
        activitiesLogged: moodAndActivityData.reduce((sum, day) => sum + day.activities.length, 0),
        consistency: Math.round((moodAndActivityData.filter(day => day.activities.length > 0).length / days) * 100),
        moodTrend: moodTrend.toFixed(0),
        sleepTrend: sleepTrend.toFixed(0),
        activitiesTrend: '+20',
        consistencyTrend: '+15'
      };
    };

    setUserData(generateMockData());
  }, [dateRange]);

  const dateRangeOptions = [
    { value: '7', label: 'Last 7 Days' },
    { value: '30', label: 'Last 30 Days' },
    { value: '90', label: 'This Semester' }
  ];

  const getAISummary = () => {
    const summaries = [
      "This month, you prioritized mindfulness, completing 12 meditation sessions and maintaining a consistent mood.",
      "Exams were tough, but you stayed resilient, using breathing exercises to manage stress.",
      "Your wellness routine is building momentum—sleep and exercise are showing positive correlations with your mood.",
      "Strong week ahead! Your consistency is paying off with improved mood stability."
    ];
    return summaries[Math.floor(Math.random() * summaries.length)];
  };

  const getTrendIcon = (trend) => {
    const value = parseInt(trend);
    if (value > 0) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (value < 0) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  const getTrendColor = (trend) => {
    const value = parseInt(trend);
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getActivityIcon = (activity) => {
    const icons = {
      exercise: <Dumbbell className="w-4 h-4 text-orange-500" />,
      journaling: <BookOpen className="w-4 h-4 text-blue-500" />,
      meditation: <Brain className="w-4 h-4 text-purple-500" />,
      social: <Users className="w-4 h-4 text-green-500" />
    };
    return icons[activity] || <Activity className="w-4 h-4 text-gray-500" />;
  };

  const SparklineChart = ({ data, color = "#3b82f6" }) => (
    <ResponsiveContainer width={60} height={20}>
      <LineChart data={data}>
        <Line type="monotone" dataKey="value" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );

  const goals = [
    { name: 'Meditate 3x/week', completed: 2, target: 3, color: 'text-purple-600' },
    { name: 'Exercise 4x/week', completed: 4, target: 4, color: 'text-orange-600' },
    { name: 'Sleep 7+ hours', completed: 5, target: 7, color: 'text-blue-600' }
  ];

  const achievements = [
    { name: 'Mindful Mornings', description: 'Checked in 7 days in a row', icon: Star, earned: true },
    { name: 'Community Contributor', description: 'Made your first post', icon: Users, earned: true },
    { name: 'Growth Mindset', description: 'Completed a Wellness Journey', icon: TrendingUp, earned: false },
    { name: 'Wellness Warrior', description: 'Complete 30 check-ins', icon: Award, earned: false }
  ];

  const insights = [
    {
      insight: "Your mood is highest on days you log both 'Exercise' and over 7 hours of 'Sleep'.",
      recommendation: "Try scheduling a workout on days you know you'll have a good night's rest to maximize the benefits.",
      icon: Dumbbell,
      color: 'bg-orange-50 border-orange-200'
    },
    {
      insight: "You haven't used the 'Journaling' feature this week.",
      recommendation: "Here is a 2-minute 'Gratitude Prompt' to help you get started.",
      icon: BookOpen,
      color: 'bg-blue-50 border-blue-200',
      actionText: "Start Journaling"
    },
    {
      insight: "Your consistency drops on weekends, but your mood stays stable.",
      recommendation: "Consider lighter weekend habits to maintain momentum without burning out.",
      icon: Calendar,
      color: 'bg-green-50 border-green-200'
    }
  ];

  // Generate sparkline data for KPIs
  const moodSparkline = userData.moodAndActivityData?.slice(-7).map(d => ({ value: d.mood })) || [];
  const sleepSparkline = userData.moodAndActivityData?.slice(-7).map(d => ({ value: d.sleep })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="pl-64">
        <div className="max-w-7xl mx-auto p-6">
          {/* Dynamic Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">My Wellness Report</h1>
                <p className="text-lg text-gray-600 italic">"{getAISummary()}"</p>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border border-gray-300 rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                >
                  {dateRangeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* At a Glance KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Avg. Mood</p>
                  <p className="text-3xl font-bold text-gray-900">{userData.avgMood} / 5</p>
                </div>
                <SparklineChart data={moodSparkline} color="#3b82f6" />
              </div>
              <div className="flex items-center">
                {getTrendIcon(userData.moodTrend)}
                <span className={`text-sm font-medium ml-1 ${getTrendColor(userData.moodTrend)}`}>
                  {Math.abs(userData.moodTrend)}% vs last period
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Sleep Quality</p>
                  <p className="text-3xl font-bold text-gray-900">{userData.avgSleep} hrs</p>
                </div>
                <SparklineChart data={sleepSparkline} color="#8b5cf6" />
              </div>
              <div className="flex items-center">
                {getTrendIcon(userData.sleepTrend)}
                <span className={`text-sm font-medium ml-1 ${getTrendColor(userData.sleepTrend)}`}>
                  {Math.abs(userData.sleepTrend)}% vs last period
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Activities Logged</p>
                  <p className="text-3xl font-bold text-gray-900">{userData.activitiesLogged}</p>
                </div>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
              <div className="flex items-center">
                {getTrendIcon(userData.activitiesTrend)}
                <span className={`text-sm font-medium ml-1 ${getTrendColor(userData.activitiesTrend)}`}>
                  {userData.activitiesTrend}% vs last period
                </span>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Consistency</p>
                  <p className="text-3xl font-bold text-gray-900">{userData.consistency}%</p>
                </div>
                <Target className="w-8 h-8 text-blue-500" />
              </div>
              <div className="flex items-center">
                {getTrendIcon(userData.consistencyTrend)}
                <span className={`text-sm font-medium ml-1 ${getTrendColor(userData.consistencyTrend)}`}>
                  {userData.consistencyTrend}% vs last period
                </span>
              </div>
            </div>
          </div>

          {/* Advanced Data Visualization Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Mood & Activity Correlation Chart */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Mood & Activity Correlation</h3>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={userData.moodAndActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                  <YAxis domain={[1, 5]} stroke="#64748b" fontSize={12} />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
                            <p className="font-semibold text-gray-900">{label}</p>
                            <p className="text-blue-600">Mood: {data.mood}/5</p>
                            <p className="text-gray-600">Sleep: {data.sleep.toFixed(1)} hrs</p>
                            {data.activities.length > 0 && (
                              <div className="mt-2">
                                <p className="text-sm text-gray-600">Activities:</p>
                                <div className="flex space-x-1 mt-1">
                                  {data.activities.map((activity, i) => (
                                    <span key={i}>{getActivityIcon(activity)}</span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="mood" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={(props) => {
                      const { cx, cy, payload } = props;
                      return (
                        <g>
                          <circle cx={cx} cy={cy} r={4} fill="#3b82f6" stroke="#fff" strokeWidth={2} />
                          {payload?.activities?.map((activity, i) => (
                            <g key={i}>
                              {getActivityIcon(activity) && (
                                <foreignObject x={cx - 8 + (i * 10)} y={cy - 25} width={16} height={16}>
                                  {getActivityIcon(activity)}
                                </foreignObject>
                              )}
                            </g>
                          ))}
                        </g>
                      );
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Habit Consistency Heatmap */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Habit Consistency</h3>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-xs text-center text-gray-500 font-medium">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {userData.heatmapData?.slice(0, 28).map((day, i) => {
                  const intensity = Math.min(day.habitCount, 3);
                  const colors = ['bg-gray-100', 'bg-green-200', 'bg-green-400', 'bg-green-600'];
                  return (
                    <div
                      key={i}
                      className={`aspect-square rounded-md ${colors[intensity]} cursor-pointer hover:ring-2 hover:ring-blue-300 transition-all`}
                      title={`${day.habits.join(', ')}`}
                    />
                  );
                })}
              </div>
              <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                <span>Less</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-gray-100 rounded"></div>
                  <div className="w-3 h-3 bg-green-200 rounded"></div>
                  <div className="w-3 h-3 bg-green-400 rounded"></div>
                  <div className="w-3 h-3 bg-green-600 rounded"></div>
                </div>
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Growth & Achievements and Actionable Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Growth & Achievements */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Growth & Achievements</h3>
              
              {/* Goal Progress Rings */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-4">Goal Progress</h4>
                <div className="space-y-4">
                  {goals.map((goal, i) => {
                    const progress = (goal.completed / goal.target) * 100;
                    const circumference = 2 * Math.PI * 45;
                    const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;
                    
                    return (
                      <div key={i} className="flex items-center space-x-4">
                        <div className="relative w-20 h-20">
                          <svg className="transform -rotate-90 w-20 h-20">
                            <circle
                              cx="40"
                              cy="40"
                              r="35"
                              stroke="#e5e7eb"
                              strokeWidth="6"
                              fill="none"
                            />
                            <circle
                              cx="40"
                              cy="40"
                              r="35"
                              stroke={progress >= 100 ? "#10b981" : "#3b82f6"}
                              strokeWidth="6"
                              fill="none"
                              strokeDasharray={strokeDasharray}
                              strokeLinecap="round"
                              className="transition-all duration-500"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className={`text-lg font-bold ${goal.color}`}>
                              {goal.completed}/{goal.target}
                            </span>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{goal.name}</p>
                          <p className="text-sm text-gray-500">{Math.round(progress)}% complete</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Achievements & Badges */}
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-4">Achievements</h4>
                <div className="grid grid-cols-2 gap-3">
                  {achievements.map((achievement, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        achievement.earned
                          ? 'border-yellow-300 bg-yellow-50'
                          : 'border-gray-200 bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-1">
                        <achievement.icon
                          className={`w-5 h-5 ${
                            achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                          }`}
                        />
                        <h5 className="text-sm font-semibold text-gray-900">
                          {achievement.name}
                        </h5>
                      </div>
                      <p className="text-xs text-gray-600">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actionable Insights */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Actionable Insights</h3>
              <div className="space-y-4">
                {insights.map((insight, i) => (
                  <div key={i} className={`p-4 rounded-xl border-2 ${insight.color}`}>
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center flex-shrink-0">
                        <insight.icon className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="mb-2">
                          <p className="text-xs font-semibold text-gray-700 mb-1">INSIGHT</p>
                          <p className="text-sm text-gray-800">{insight.insight}</p>
                        </div>
                        <div className="mb-3">
                          <p className="text-xs font-semibold text-gray-700 mb-1">RECOMMENDATION</p>
                          <p className="text-sm text-gray-800">{insight.recommendation}</p>
                        </div>
                        {insight.actionText && (
                          <button className="text-xs font-medium text-blue-600 hover:text-blue-800 underline">
                            {insight.actionText} →
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};