import React, { useState } from 'react';
import { Search, TrendingUp, Eye, Plus, AlertCircle, BookOpen, Users, Calendar } from 'lucide-react';

const ResourceGapPage = () => {
  const [activeTab, setActiveTab] = useState('unmatched-searches');
  
  // Mock data for unmatched searches
  const unmatchedSearches = [
    { term: 'internship anxiety', count: 47, trend: '+15%', category: 'Career Stress' },
    { term: 'hostel homesickness', count: 39, trend: '+8%', category: 'Adjustment' },
    { term: 'exam panic attacks', count: 34, trend: '+22%', category: 'Academic Stress' },
    { term: 'relationship breakup college', count: 28, trend: '+5%', category: 'Relationships' },
    { term: 'parents pressure engineering', count: 25, trend: '+12%', category: 'Family Issues' },
    { term: 'social anxiety college events', count: 23, trend: '+18%', category: 'Social Issues' },
    { term: 'financial stress fees', count: 21, trend: '+7%', category: 'Financial Stress' },
    { term: 'perfectionism burnout', count: 19, trend: '+25%', category: 'Mental Health' },
    { term: 'job interview confidence', count: 18, trend: '+10%', category: 'Career Development' },
    { term: 'loneliness campus', count: 16, trend: '+14%', category: 'Social Connection' }
  ];

  // Mock data for low engagement topics
  const lowEngagementTopics = [
    { 
      topic: 'Sleep Hygiene', 
      views: 2847, 
      resources: 3, 
      engagementRate: '12%',
      recommendation: 'High demand topic with limited content. Consider adding video guides and interactive sleep trackers.',
      priority: 'high'
    },
    { 
      topic: 'Time Management', 
      views: 2156, 
      resources: 4, 
      engagementRate: '18%',
      recommendation: 'Popular topic needing more practical tools. Add templates and planners.',
      priority: 'high'
    },
    { 
      topic: 'Study Techniques', 
      views: 1923, 
      resources: 2, 
      engagementRate: '8%',
      recommendation: 'Very low engagement despite decent traffic. Content may need refresh.',
      priority: 'medium'
    },
    { 
      topic: 'Career Planning', 
      views: 1687, 
      resources: 5, 
      engagementRate: '22%',
      recommendation: 'Good engagement but high view count suggests need for more resources.',
      priority: 'medium'
    },
    { 
      topic: 'Nutrition & Health', 
      views: 1534, 
      resources: 2, 
      engagementRate: '15%',
      recommendation: 'Growing interest area. Add meal planning and healthy eating guides.',
      priority: 'medium'
    },
    { 
      topic: 'Financial Literacy', 
      views: 1289, 
      resources: 1, 
      engagementRate: '9%',
      recommendation: 'Important life skill with only one resource. Urgent expansion needed.',
      priority: 'high'
    }
  ];

  const [selectedSearches, setSelectedSearches] = useState(new Set());

  const handleSelectSearch = (term) => {
    const newSelected = new Set(selectedSearches);
    if (newSelected.has(term)) {
      newSelected.delete(term);
    } else {
      newSelected.add(term);
    }
    setSelectedSearches(newSelected);
  };

  const handleBulkCreateResources = () => {
    if (selectedSearches.size > 0) {
      alert(`Creating resources for ${selectedSearches.size} selected topics...`);
      setSelectedSearches(new Set());
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendColor = (trend) => {
    const value = parseInt(trend.replace('%', ''));
    if (value >= 20) return 'text-red-600';
    if (value >= 10) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Resource Gap Analysis</h1>
        <p className="text-gray-600">Identify content opportunities by analyzing student search patterns and engagement metrics.</p>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Unmatched Searches</p>
                <p className="text-2xl font-bold text-gray-900">{unmatchedSearches.length}</p>
                <p className="text-sm text-red-600">This month</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Search className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High-Demand Topics</p>
                <p className="text-2xl font-bold text-gray-900">6</p>
                <p className="text-sm text-orange-600">Need attention</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Gap Searches</p>
                <p className="text-2xl font-bold text-gray-900">290</p>
                <p className="text-sm text-blue-600">Last 30 days</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Content Opportunities</p>
                <p className="text-2xl font-bold text-gray-900">16</p>
                <p className="text-sm text-purple-600">Ready to create</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('unmatched-searches')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'unmatched-searches'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Unmatched Searches
            </button>
            <button
              onClick={() => setActiveTab('low-engagement')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'low-engagement'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Low Engagement Topics
            </button>
          </nav>
        </div>
      </div>

      {/* Unmatched Searches Tab */}
      {activeTab === 'unmatched-searches' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Top Unmatched Searches</h2>
              <div className="flex items-center gap-3">
                {selectedSearches.size > 0 && (
                  <button
                    onClick={handleBulkCreateResources}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Create {selectedSearches.size} Resources
                  </button>
                )}
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Export Data
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Search terms that returned zero results, sorted by frequency
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                      checked={selectedSearches.size === unmatchedSearches.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedSearches(new Set(unmatchedSearches.map(s => s.term)));
                        } else {
                          setSelectedSearches(new Set());
                        }
                      }}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Search Term
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Search Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trend
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {unmatchedSearches.map((search, index) => (
                  <tr key={search.term} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                        checked={selectedSearches.has(search.term)}
                        onChange={() => handleSelectSearch(search.term)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Search className="w-4 h-4 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{search.term}</div>
                          <div className="text-sm text-gray-500">#{index + 1} most searched</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{search.count}</div>
                      <div className="text-sm text-gray-500">searches</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${getTrendColor(search.trend)}`}>
                        {search.trend}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {search.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                        <Plus className="w-4 h-4 mr-1" />
                        Create Resource
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Low Engagement Topics Tab */}
      {activeTab === 'low-engagement' && (
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Low Engagement Topics</h2>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Export Analysis
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-1">
              Existing topics with high views but low engagement or insufficient resources
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Topic
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resources
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engagement Rate
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recommendation
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lowEngagementTopics.map((topic, index) => (
                  <tr key={topic.topic} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{topic.topic}</div>
                          <div className="text-sm text-gray-500">Topic #{index + 1}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Eye className="w-4 h-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{topic.views.toLocaleString()}</div>
                          <div className="text-sm text-gray-500">views</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{topic.resources}</div>
                      <div className="text-sm text-gray-500">resources</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">{topic.engagementRate}</div>
                      <div className="text-sm text-gray-500">engagement</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(topic.priority)}`}>
                        {topic.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        {topic.recommendation}
                      </div>
                      <div className="mt-2">
                        <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
                          <Plus className="w-4 h-4 mr-1" />
                          Add Resources
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Panel */}
      <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Content Creation Recommendations</h3>
              <p className="text-sm text-gray-600">Based on current analysis, here are immediate action items:</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Schedule Content Sprint
          </button>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-red-200 rounded-lg p-4 bg-red-50">
            <h4 className="font-medium text-red-800 mb-2">High Priority (Urgent)</h4>
            <ul className="text-sm text-red-700 space-y-1">
              <li>• Create internship anxiety resources</li>
              <li>• Develop financial literacy content</li>
              <li>• Add sleep hygiene video guides</li>
            </ul>
          </div>
          
          <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
            <h4 className="font-medium text-yellow-800 mb-2">Medium Priority</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Expand time management tools</li>
              <li>• Refresh study techniques content</li>
              <li>• Add career planning resources</li>
            </ul>
          </div>
          
          <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
            <h4 className="font-medium text-blue-800 mb-2">Content Strategy</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Focus on video content for high-demand topics</li>
              <li>• Create interactive tools and templates</li>
              <li>• Develop peer story sharing features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceGapPage;