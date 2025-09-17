import React, { useState, useEffect } from 'react';
import { AlertTriangle, Clock, Shield, TrendingUp, User, Flag, Eye, Ban, Trash2, X, CheckCircle, Search, Filter, BarChart3, Users, MessageSquare } from 'lucide-react';

// Mock data for demonstration
const mockFlaggedPosts = [
  {
    id: 1,
    snippet: "I can't take this anymore, everything feels hopeless and I don't see a way out...",
    severityScore: 'critical',
    flagReason: 'Self-Harm',
    flagCount: 5,
    timeAgo: '3m ago',
    content: "I can't take this anymore, everything feels hopeless and I don't see a way out. I've been struggling with depression for months and nothing seems to help. Sometimes I think about just ending it all because the pain is too much to bear.",
    author: 'Anonymous Phoenix',
    authorStats: { totalPosts: 23, violations: 0, accountAge: '3 months' },
    reports: [
      { reporter: 'User124', reason: 'Self-harm content', comment: 'User expressing suicidal thoughts' },
      { reporter: 'User567', reason: 'Self-harm content', comment: 'Needs immediate attention' },
      { reporter: 'User890', reason: 'Self-harm content', comment: 'Please help this person' }
    ]
  },
  {
    id: 2,
    snippet: "You're all a bunch of idiots who don't understand anything about the real world...",
    severityScore: 'high',
    flagReason: 'Harassment',
    flagCount: 3,
    timeAgo: '12m ago',
    content: "You're all a bunch of idiots who don't understand anything about the real world. Your opinions are worthless and you should all just shut up and stop wasting everyone's time with your pathetic attempts at intelligence.",
    author: 'Anonymous Tiger',
    authorStats: { totalPosts: 156, violations: 2, accountAge: '8 months' },
    reports: [
      { reporter: 'User234', reason: 'Harassment', comment: 'Insulting other users' },
      { reporter: 'User345', reason: 'Harassment', comment: 'Toxic behavior' }
    ]
  },
  {
    id: 3,
    snippet: "Looking to buy some recreational substances, DM me if you know where to get...",
    severityScore: 'medium',
    flagReason: 'Illegal Activity',
    flagCount: 2,
    timeAgo: '25m ago',
    content: "Looking to buy some recreational substances, DM me if you know where to get the good stuff. I'm willing to pay premium prices for quality products. No cops please.",
    author: 'Anonymous Wolf',
    authorStats: { totalPosts: 89, violations: 1, accountAge: '1 year' },
    reports: [
      { reporter: 'User456', reason: 'Illegal activity', comment: 'Attempting to purchase drugs' },
      { reporter: 'User789', reason: 'Illegal activity', comment: 'Violates community guidelines' }
    ]
  }
];

const mockModerationLog = [
  { id: 1, moderator: 'Mod_Alex', action: 'Content Removed', reason: 'Self-harm violation', timestamp: '2024-01-15 14:30', user: 'Anonymous Phoenix' },
  { id: 2, moderator: 'Mod_Sarah', action: 'User Suspended', reason: 'Repeated harassment', timestamp: '2024-01-15 14:15', user: 'Anonymous Tiger' },
  { id: 3, moderator: 'Mod_Mike', action: 'Content Dismissed', reason: 'False positive', timestamp: '2024-01-15 14:00', user: 'Anonymous Bear' }
];

const predefinedReasons = {
  remove: [
    "This post was removed as it violates our policy on self-harm content. If you're struggling, please reach out to our support resources.",
    "This content was removed for harassment. Please treat all community members with respect.",
    "This post was removed for discussing illegal activities, which violates our community guidelines.",
    "This content was removed for spam. Please contribute meaningful content to discussions."
  ],
  suspend: [
    "Your account has been temporarily suspended for repeated policy violations. Please review our community guidelines.",
    "Temporary suspension issued for harassment. Your account will be restored after the suspension period."
  ],
  ban: [
    "Your account has been permanently banned for severe policy violations that threaten community safety.",
    "Permanent ban issued for repeated serious violations despite previous warnings."
  ]
};

const ModeratorDashboardPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [actionType, setActionType] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [moderatorNotes, setModeratorNotes] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');

  // Mock real-time metrics
  const [metrics, setMetrics] = useState({
    openTickets: 47,
    criticalAlerts: 8,
    resolvedToday: 23,
    avgResolutionTime: '4.2m'
  });

  // Auto-select first post on load
  useEffect(() => {
    if (mockFlaggedPosts.length > 0 && !selectedPost) {
      setSelectedPost(mockFlaggedPosts[0]);
    }
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <Flag className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const handleAction = (action) => {
    setActionType(action);
    setSelectedReason('');
    setModeratorNotes('');
  };

  const confirmAction = () => {
    if (!selectedReason && actionType !== 'dismiss') {
      alert('Please select a reason for this action.');
      return;
    }
    if (!moderatorNotes.trim()) {
      alert('Please add moderator notes for this action.');
      return;
    }

    // Here you would typically send the action to your backend
    console.log('Action confirmed:', {
      postId: selectedPost.id,
      action: actionType,
      reason: selectedReason,
      notes: moderatorNotes
    });

    // Reset form
    setActionType('');
    setSelectedReason('');
    setModeratorNotes('');
    
    // Move to next post
    const currentIndex = mockFlaggedPosts.findIndex(post => post.id === selectedPost.id);
    const nextPost = mockFlaggedPosts[currentIndex + 1] || mockFlaggedPosts[0];
    setSelectedPost(nextPost);
  };

  const highlightKeywords = (text, keywords = ['harm', 'hurt', 'end', 'die', 'suicide', 'kill', 'hate', 'stupid', 'idiot']) => {
    let highlightedText = text;
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      highlightedText = highlightedText.replace(regex, `<mark class="bg-yellow-200 px-1 rounded">$&</mark>`);
    });
    return highlightedText;
  };

  if (currentTab === 'analytics') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Moderation Analytics</h1>
                <p className="text-gray-600">Historical data and team performance metrics</p>
              </div>
              <button 
                onClick={() => setCurrentTab('dashboard')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
          {/* Analytics Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Flagged Posts by Category (Last 7 Days)
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Self-Harm</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                    <span className="text-sm font-medium">156</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Harassment</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{width: '45%'}}></div>
                    </div>
                    <span className="text-sm font-medium">89</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span>Spam</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{width: '30%'}}></div>
                    </div>
                    <span className="text-sm font-medium">67</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Moderator Performance Leaderboard
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <span className="font-medium">Mod_Sarah</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">342 resolved</div>
                    <div className="text-sm text-gray-600">3.1m avg time</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <span className="font-medium">Mod_Alex</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">298 resolved</div>
                    <div className="text-sm text-gray-600">4.2m avg time</div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <span className="font-medium">Mod_Mike</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">267 resolved</div>
                    <div className="text-sm text-gray-600">5.1m avg time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Moderation Log */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Moderation Log
                </h3>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search logs..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select 
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                  >
                    <option value="all">All Actions</option>
                    <option value="removed">Content Removed</option>
                    <option value="suspended">User Suspended</option>
                    <option value="banned">User Banned</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Moderator</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockModerationLog.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.timestamp}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.moderator}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          log.action === 'Content Removed' ? 'bg-red-100 text-red-800' :
                          log.action === 'User Suspended' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {log.action}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.user}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{log.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header & Performance Cockpit */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Shield className="w-6 h-6 text-blue-600" />
                Moderator Command Center
              </h1>
              <p className="text-gray-600">Professional content moderation dashboard</p>
            </div>
            <button 
              onClick={() => setCurrentTab('analytics')}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Analytics
            </button>
          </div>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2">
                <Flag className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Open Tickets</span>
              </div>
              <div className="text-2xl font-bold text-blue-900 mt-1">{metrics.openTickets}</div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border border-red-200">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <span className="text-sm font-medium text-red-800">Critical Alerts</span>
              </div>
              <div className="text-2xl font-bold text-red-900 mt-1">{metrics.criticalAlerts}</div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-800">Resolved (24h)</span>
              </div>
              <div className="text-2xl font-bold text-green-900 mt-1">{metrics.resolvedToday}</div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="text-sm font-medium text-purple-800">Avg. Resolution</span>
              </div>
              <div className="text-2xl font-bold text-purple-900 mt-1">{metrics.avgResolutionTime}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Multi-Pane Layout */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-300px)]">
          
          {/* Pane 1: Triage Queue */}
          <div className="col-span-3 bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Flag className="w-5 h-5" />
                Triage Queue
              </h2>
            </div>
            <div className="overflow-y-auto h-full">
              {mockFlaggedPosts.map((post) => (
                <div
                  key={post.id}
                  className={`p-4 border-b cursor-pointer transition-colors ${
                    selectedPost?.id === post.id 
                      ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedPost(post)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${getSeverityColor(post.severityScore)}`}>
                      {getSeverityIcon(post.severityScore)}
                      {post.severityScore.toUpperCase()}
                    </span>
                    <span className="text-xs text-gray-500">{post.timeAgo}</span>
                  </div>
                  <p className="text-sm text-gray-800 line-clamp-3 mb-2">{post.snippet}</p>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Flagged for '{post.flagReason}'</span>
                    <span>{post.flagCount} reports</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pane 2: Content Review Panel */}
          <div className="col-span-6 bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Content Review
              </h2>
            </div>
            
            {selectedPost ? (
              <div className="p-6 overflow-y-auto h-full space-y-6">
                {/* Full Content */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Flagged Content</h3>
                  <div 
                    className="bg-gray-50 p-4 rounded-lg border text-sm"
                    dangerouslySetInnerHTML={{ __html: highlightKeywords(selectedPost.content) }}
                  />
                </div>

                {/* User Context Card */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="text-sm font-medium text-blue-800 mb-3 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    User Context
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-blue-900">Author:</span>
                      <div className="text-blue-800">{selectedPost.author}</div>
                    </div>
                    <div>
                      <span className="font-medium text-blue-900">Account Age:</span>
                      <div className="text-blue-800">{selectedPost.authorStats.accountAge}</div>
                    </div>
                    <div>
                      <span className="font-medium text-blue-900">Total Posts:</span>
                      <div className="text-blue-800">{selectedPost.authorStats.totalPosts}</div>
                    </div>
                    <div>
                      <span className="font-medium text-blue-900">Previous Violations:</span>
                      <div className="text-blue-800">{selectedPost.authorStats.violations}</div>
                    </div>
                  </div>
                  <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View User's Post History →
                  </button>
                </div>

                {/* Report Details */}
                <div>
                  <h3 className="text-sm font-medium text-gray-700 mb-3">User Reports</h3>
                  <div className="space-y-3">
                    {selectedPost.reports.map((report, index) => (
                      <div key={index} className="bg-orange-50 p-3 rounded-lg border border-orange-200">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium text-orange-900">{report.reporter}</span>
                          <span className="text-xs text-orange-700 bg-orange-100 px-2 py-1 rounded">{report.reason}</span>
                        </div>
                        <p className="text-sm text-orange-800">"{report.comment}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>Select a post from the triage queue to review</p>
                </div>
              </div>
            )}
          </div>

          {/* Pane 3: Action & Logging Panel */}
          <div className="col-span-3 bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Actions
              </h2>
            </div>
            
            {selectedPost ? (
              <div className="p-4 space-y-4">
                {/* Action Buttons */}
                {!actionType && (
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700">Choose Action</h3>
                    <button
                      onClick={() => handleAction('dismiss')}
                      className="w-full py-2 px-4 bg-green-100 text-green-800 rounded-lg hover:bg-green-200 flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Dismiss
                    </button>
                    <button
                      onClick={() => handleAction('remove')}
                      className="w-full py-2 px-4 bg-orange-100 text-orange-800 rounded-lg hover:bg-orange-200 flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Remove Content
                    </button>
                    <button
                      onClick={() => handleAction('suspend')}
                      className="w-full py-2 px-4 bg-red-100 text-red-800 rounded-lg hover:bg-red-200 flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Clock className="w-4 h-4" />
                      Suspend User
                    </button>
                    <button
                      onClick={() => handleAction('ban')}
                      className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Ban className="w-4 h-4" />
                      Ban User
                    </button>
                  </div>
                )}

                {/* Action Form */}
                {actionType && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-700">
                        {actionType === 'dismiss' ? 'Dismiss Report' : `${actionType.charAt(0).toUpperCase() + actionType.slice(1)} Content`}
                      </h3>
                      <button
                        onClick={() => setActionType('')}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {actionType !== 'dismiss' && (
                      <div>
                        <label className="text-xs font-medium text-gray-700 block mb-2">Reason Template</label>
                        <select
                          className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          value={selectedReason}
                          onChange={(e) => setSelectedReason(e.target.value)}
                        >
                          <option value="">Select a reason...</option>
                          {predefinedReasons[actionType]?.map((reason, index) => (
                            <option key={index} value={reason}>
                              {reason.substring(0, 50)}...
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div>
                      <label className="text-xs font-medium text-gray-700 block mb-2">Moderator Notes *</label>
                      <textarea
                        className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows="3"
                        placeholder="Document your reasoning for this action..."
                        value={moderatorNotes}
                        onChange={(e) => setModeratorNotes(e.target.value)}
                      />
                    </div>

                    <button
                      onClick={confirmAction}
                      className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium text-sm"
                    >
                      Confirm Action
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">Select a post to take action</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorDashboardPage;