import React, { useState, useEffect } from 'react';
import { 
  Plus, Search, Edit, Trash2, Eye, Filter, Calendar, Tag, 
  FileText, Video, Headphones, Image, Save, X, Upload, ExternalLink
} from 'lucide-react';

const ResourceManagementPage = () => {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTopic, setFilterTopic] = useState('');
  const [filterFormat, setFilterFormat] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    format: 'Article',
    topic: '',
    mediaUrl: '',
    thumbnailUrl: '',
    status: 'Draft',
    datePublished: new Date().toISOString().split('T')[0]
  });

  const topics = ['Anxiety', 'Depression', 'Stress Management', 'Sleep', 'Mindfulness', 'Academic Pressure', 'Relationships', 'Self-Care'];
  const formats = ['Article', 'Video', 'Audio'];
  const statuses = ['Published', 'Draft', 'Archived'];

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockResources = [
      {
        id: 1,
        title: '5 Breathing Techniques for Exam Stress',
        format: 'Article',
        topic: 'Stress Management',
        datePublished: '2024-03-15',
        status: 'Published',
        content: 'Deep breathing is one of the most effective ways to manage stress...',
        thumbnailUrl: null,
        mediaUrl: null
      },
      {
        id: 2,
        title: 'Guided Sleep Meditation',
        format: 'Audio',
        topic: 'Sleep',
        datePublished: '2024-03-14',
        status: 'Published',
        content: 'A 20-minute guided meditation to help you fall asleep peacefully.',
        thumbnailUrl: null,
        mediaUrl: 'https://example.com/sleep-meditation.mp3'
      },
      {
        id: 3,
        title: 'Understanding Anxiety: A Student\'s Guide',
        format: 'Video',
        topic: 'Anxiety',
        datePublished: '2024-03-13',
        status: 'Draft',
        content: 'Learn about the different types of anxiety and coping strategies.',
        thumbnailUrl: null,
        mediaUrl: 'https://youtube.com/watch?v=example'
      },
      {
        id: 4,
        title: 'Building Healthy Study Habits',
        format: 'Article',
        topic: 'Academic Pressure',
        datePublished: '2024-03-12',
        status: 'Published',
        content: 'Discover effective study techniques that promote both academic success and mental well-being...',
        thumbnailUrl: null,
        mediaUrl: null
      },
      {
        id: 5,
        title: 'Mindful Morning Routine',
        format: 'Video',
        topic: 'Mindfulness',
        datePublished: '2024-03-11',
        status: 'Published',
        content: 'Start your day with intention and mindfulness.',
        thumbnailUrl: null,
        mediaUrl: 'https://youtube.com/watch?v=example2'
      }
    ];
    setResources(mockResources);
    setFilteredResources(mockResources);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = resources;

    if (searchTerm) {
      filtered = filtered.filter(resource =>
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterTopic) {
      filtered = filtered.filter(resource => resource.topic === filterTopic);
    }

    if (filterFormat) {
      filtered = filtered.filter(resource => resource.format === filterFormat);
    }

    if (filterStatus) {
      filtered = filtered.filter(resource => resource.status === filterStatus);
    }

    setFilteredResources(filtered);
  }, [resources, searchTerm, filterTopic, filterFormat, filterStatus]);

  const handleAddNew = () => {
    setEditingResource(null);
    setFormData({
      title: '',
      content: '',
      format: 'Article',
      topic: '',
      mediaUrl: '',
      thumbnailUrl: '',
      status: 'Draft',
      datePublished: new Date().toISOString().split('T')[0]
    });
    setShowAddEditModal(true);
  };

  const handleEdit = (resource) => {
    setEditingResource(resource);
    setFormData({
      title: resource.title,
      content: resource.content,
      format: resource.format,
      topic: resource.topic,
      mediaUrl: resource.mediaUrl || '',
      thumbnailUrl: resource.thumbnailUrl || '',
      status: resource.status,
      datePublished: resource.datePublished
    });
    setShowAddEditModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter(r => r.id !== id));
    }
  };

  const handleSave = () => {
    if (editingResource) {
      // Update existing resource
      setResources(resources.map(r => 
        r.id === editingResource.id ? { ...r, ...formData } : r
      ));
    } else {
      // Add new resource
      const newResource = {
        ...formData,
        id: Math.max(...resources.map(r => r.id)) + 1
      };
      setResources([...resources, newResource]);
    }
    setShowAddEditModal(false);
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'Video': return <Video className="w-4 h-4 text-red-500" />;
      case 'Audio': return <Headphones className="w-4 h-4 text-purple-500" />;
      default: return <FileText className="w-4 h-4 text-blue-500" />;
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Published': 'bg-green-100 text-green-800',
      'Draft': 'bg-yellow-100 text-yellow-800',
      'Archived': 'bg-gray-100 text-gray-800'
    };
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${colors[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Resource Management</h1>
            <p className="text-gray-600 mt-1">Manage wellness library content</p>
          </div>
          <button
            onClick={handleAddNew}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Resource</span>
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Topic Filter */}
            <select
              value={filterTopic}
              onChange={(e) => setFilterTopic(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Topics</option>
              {topics.map(topic => (
                <option key={topic} value={topic}>{topic}</option>
              ))}
            </select>

            {/* Format Filter */}
            <select
              value={filterFormat}
              onChange={(e) => setFilterFormat(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Formats</option>
              {formats.map(format => (
                <option key={format} value={format}>{format}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">All Statuses</option>
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Resources Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Format
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Topic
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Published
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredResources.map((resource) => (
                  <tr key={resource.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getFormatIcon(resource.format)}
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {resource.title}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {resource.format}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {resource.topic}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(resource.datePublished).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(resource.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(resource)}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(resource.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No resources found</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showAddEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingResource ? 'Edit Resource' : 'Add New Resource'}
              </h2>
              <button
                onClick={() => setShowAddEditModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter resource title..."
                />
              </div>

              {/* Format and Topic Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Format *
                  </label>
                  <select
                    value={formData.format}
                    onChange={(e) => setFormData({...formData, format: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {formats.map(format => (
                      <option key={format} value={format}>{format}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic *
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({...formData, topic: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select a topic</option>
                    {topics.map(topic => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Media URL (for Video/Audio) */}
              {(formData.format === 'Video' || formData.format === 'Audio') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.format} URL
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={formData.mediaUrl}
                      onChange={(e) => setFormData({...formData, mediaUrl: e.target.value})}
                      className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Enter ${formData.format.toLowerCase()} URL...`}
                    />
                    <ExternalLink className="w-4 h-4 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                </div>
              )}

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter the main content here..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use markdown for formatting (e.g., **bold**, *italic*, # headings)
                </p>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail Image
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="url"
                    value={formData.thumbnailUrl}
                    onChange={(e) => setFormData({...formData, thumbnailUrl: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter image URL or upload..."
                  />
                  <button
                    type="button"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Upload</span>
                  </button>
                </div>
              </div>

              {/* Status and Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Published
                  </label>
                  <input
                    type="date"
                    value={formData.datePublished}
                    onChange={(e) => setFormData({...formData, datePublished: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-3 px-6 py-4 border-t bg-gray-50">
              <button
                onClick={() => setShowAddEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={!formData.title || !formData.content || !formData.topic}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{editingResource ? 'Save Changes' : 'Add Resource'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceManagementPage;