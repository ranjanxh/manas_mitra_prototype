import React, { useState } from 'react';
import { Shield, AlertTriangle, Users, Save, Eye, EyeOff, Phone, Mail, Clock, UserCheck, UserX, Settings, Lock, Bell, Database } from 'lucide-react';

const PlatformSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('anonymity');
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    // Anonymity & Privacy Settings
    dataRetentionYears: '2',
    anonymousNamePool: 'Phoenix,Eagle,Lion,Tiger,Wolf,Falcon,Hawk,Bear,Fox,Owl',
    autoDeleteInactive: true,
    encryptSensitiveData: true,
    
    // Crisis Alert Settings
    primaryEmergencyContact: '+91-80-2345-6789',
    afterHoursHelpline: '+91-80-9876-5432',
    crisisMessage: 'We\'re here to help. If you\'re having thoughts of self-harm, please reach out immediately to our crisis support team or emergency services.',
    autoTriggerKeywords: 'suicide,self-harm,kill myself,end it all,no point living',
    emergencyEmail: 'crisis@university.edu',
    
    // User Roles
    newUserRole: 'student',
    moderatorPermissions: {
      viewReports: true,
      moderateContent: true,
      accessAnalytics: false,
      manageUsers: false
    },
    adminPermissions: {
      viewReports: true,
      moderateContent: true,
      accessAnalytics: true,
      manageUsers: true,
      systemSettings: false
    }
  });

  // Mock data for existing users/roles
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.j@university.edu',
      role: 'Super Admin',
      status: 'active',
      lastLogin: '2 hours ago'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      email: 'priya.s@university.edu',
      role: 'Moderator',
      status: 'active',
      lastLogin: '1 day ago'
    },
    {
      id: 3,
      name: 'Rahul Verma',
      email: 'rahul.v@university.edu',
      role: 'Admin',
      status: 'inactive',
      lastLogin: '1 week ago'
    }
  ]);

  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserRoleSelection, setNewUserRoleSelection] = useState('moderator');

  const handleSettingChange = (category, field, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: typeof prev[category] === 'object' 
        ? { ...prev[category], [field]: value }
        : value
    }));
  };

  const handleSaveSettings = () => {
    alert('Settings saved successfully!');
  };

  const handleInviteUser = () => {
    if (newUserEmail) {
      const newUser = {
        id: users.length + 1,
        name: 'Pending Invitation',
        email: newUserEmail,
        role: newUserRoleSelection,
        status: 'pending',
        lastLogin: 'Never'
      };
      setUsers([...users, newUser]);
      setNewUserEmail('');
      alert(`Invitation sent to ${newUserEmail}`);
    }
  };

  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const getRoleColor = (role) => {
    switch (role.toLowerCase()) {
      case 'super admin': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      case 'moderator': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
          <button 
            onClick={handleSaveSettings}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save All Changes
          </button>
        </div>
        <p className="text-gray-600">Manage core platform safety, privacy, and administrative settings.</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('anonymity')}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'anonymity'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Shield className="w-4 h-4" />
              Anonymity & Privacy
            </button>
            <button
              onClick={() => setActiveTab('crisis')}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'crisis'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <AlertTriangle className="w-4 h-4" />
              Crisis Alert Protocols
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === 'users'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4" />
              User Roles & Permissions
            </button>
          </nav>
        </div>
      </div>

      {/* Anonymity & Privacy Tab */}
      {activeTab === 'anonymity' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Database className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Data Retention Policy</h2>
                <p className="text-sm text-gray-600">Configure how long user data is stored</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auto-delete inactive user data after:
                </label>
                <select 
                  value={settings.dataRetentionYears}
                  onChange={(e) => setSettings({...settings, dataRetentionYears: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3 Years</option>
                  <option value="5">5 Years</option>
                </select>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.autoDeleteInactive}
                    onChange={(e) => setSettings({...settings, autoDeleteInactive: e.target.checked})}
                    className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  />
                  <span className="ml-2 text-sm text-gray-700">Enable automatic deletion</span>
                </label>
                <p className="text-xs text-gray-500 mt-1">Users will be notified 30 days before deletion</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Anonymous Names Pool</h2>
                <p className="text-sm text-gray-600">Configure names used for anonymous interactions</p>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available anonymous names (comma-separated):
              </label>
              <textarea
                value={settings.anonymousNamePool}
                onChange={(e) => setSettings({...settings, anonymousNamePool: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Phoenix,Eagle,Lion,Tiger..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Currently {settings.anonymousNamePool.split(',').length} names available
              </p>
            </div>
            
            <div className="mt-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.encryptSensitiveData}
                  onChange={(e) => setSettings({...settings, encryptSensitiveData: e.target.checked})}
                  className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span className="ml-2 text-sm text-gray-700">Enable end-to-end encryption for sensitive data</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Crisis Alert Protocols Tab */}
      {activeTab === 'crisis' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <Phone className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Emergency Contacts</h2>
                <p className="text-sm text-gray-600">Configure crisis response contact information</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Campus Emergency Number:
                </label>
                <input
                  type="tel"
                  value={settings.primaryEmergencyContact}
                  onChange={(e) => setSettings({...settings, primaryEmergencyContact: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91-80-2345-6789"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  After-Hours Helpline:
                </label>
                <input
                  type="tel"
                  value={settings.afterHoursHelpline}
                  onChange={(e) => setSettings({...settings, afterHoursHelpline: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91-80-9876-5432"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Emergency Email:
                </label>
                <input
                  type="email"
                  value={settings.emergencyEmail}
                  onChange={(e) => setSettings({...settings, emergencyEmail: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="crisis@university.edu"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Crisis Detection & Response</h2>
                <p className="text-sm text-gray-600">Configure automatic crisis detection and response messages</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Crisis Alert Message:
                </label>
                <textarea
                  value={settings.crisisMessage}
                  onChange={(e) => setSettings({...settings, crisisMessage: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter the message shown to students in crisis..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  This message appears when crisis keywords are detected
                </p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Auto-trigger Keywords (comma-separated):
                </label>
                <textarea
                  value={settings.autoTriggerKeywords}
                  onChange={(e) => setSettings({...settings, autoTriggerKeywords: e.target.value})}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="suicide,self-harm,kill myself..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  These keywords will automatically trigger crisis intervention protocols
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Roles & Permissions Tab */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Invite New User */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Invite New Administrator</h2>
                <p className="text-sm text-gray-600">Add new team members with appropriate permissions</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <input
                  type="email"
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <select 
                  value={newUserRoleSelection}
                  onChange={(e) => setNewUserRoleSelection(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                  <option value="super-admin">Super Admin</option>
                </select>
              </div>
              <button 
                onClick={handleInviteUser}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Send Invite
              </button>
            </div>
          </div>

          {/* Existing Users */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Current Administrators</h2>
              <p className="text-sm text-gray-600 mt-1">Manage existing user roles and permissions</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {user.lastLogin}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleUserStatus(user.id)}
                            className={`inline-flex items-center px-2 py-1 border border-transparent text-xs leading-4 font-medium rounded ${
                              user.status === 'active' 
                                ? 'text-red-700 bg-red-100 hover:bg-red-200' 
                                : 'text-green-700 bg-green-100 hover:bg-green-200'
                            }`}
                          >
                            {user.status === 'active' ? <UserX className="w-3 h-3 mr-1" /> : <UserCheck className="w-3 h-3 mr-1" />}
                            {user.status === 'active' ? 'Deactivate' : 'Activate'}
                          </button>
                          <button className="inline-flex items-center px-2 py-1 border border-gray-300 text-xs leading-4 font-medium rounded text-gray-700 bg-white hover:bg-gray-50">
                            <Settings className="w-3 h-3 mr-1" />
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Permission Matrix */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Lock className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Role Permissions Matrix</h2>
                <p className="text-sm text-gray-600">Configure what each role can access and modify</p>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 pr-6 text-sm font-medium text-gray-900">Permission</th>
                    <th className="text-center py-3 px-3 text-sm font-medium text-gray-900">Moderator</th>
                    <th className="text-center py-3 px-3 text-sm font-medium text-gray-900">Admin</th>
                    <th className="text-center py-3 px-3 text-sm font-medium text-gray-900">Super Admin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 pr-6 text-sm text-gray-700">View Reports & Analytics</td>
                    <td className="text-center py-3 px-3">
                      <input type="checkbox" checked={settings.moderatorPermissions.viewReports} onChange={(e) => handleSettingChange('moderatorPermissions', 'viewReports', e.target.checked)} className="rounded border-gray-300 text-blue-600" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <input type="checkbox" checked={settings.adminPermissions.viewReports} onChange={(e) => handleSettingChange('adminPermissions', 'viewReports', e.target.checked)} className="rounded border-gray-300 text-blue-600" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <input type="checkbox" checked={true} disabled className="rounded border-gray-300 text-blue-600" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 text-sm text-gray-700">Moderate Content</td>
                    <td className="text-center py-3 px-3">
                      <input type="checkbox" checked={settings.moderatorPermissions.moderateContent} onChange={(e) => handleSettingChange('moderatorPermissions', 'moderateContent', e.target.checked)} className="rounded border-gray-300 text-blue-600" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <input type="checkbox" checked={settings.adminPermissions.moderateContent} onChange={(e) => handleSettingChange('adminPermissions', 'moderateContent', e.target.checked)} className="rounded border-gray-300 text-blue-600" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <input type="checkbox" checked={true} disabled className="rounded border-gray-300 text-blue-600" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 text-sm text-gray-700">Access Advanced Analytics</td>
                    <td className="text-center py-3 px-3">
                      <input type="checkbox" checked={settings.moderatorPermissions.accessAnalytics} onChange={(e) => handleSettingChange('moderatorPermissions', 'accessAnalytics', e.target.checked)} className="rounded border-gray-300 text-blue-600" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <input type="checkbox" checked={settings.adminPermissions.accessAnalytics} onChange={(e) => handleSettingChange('adminPermissions', 'accessAnalytics', e.target.checked)} className="rounded border-gray-300 text-blue-600" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <input type="checkbox" checked={true} disabled className="rounded border-gray-300 text-blue-600" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 text-sm text-gray-700">Manage Users</td>
                    <td className="text-center py-3 px-3">
                      <input type="checkbox" checked={settings.moderatorPermissions.manageUsers} onChange={(e) => handleSettingChange('moderatorPermissions', 'manageUsers', e.target.checked)} className="rounded border-gray-300 text-blue-600" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <input type="checkbox" checked={settings.adminPermissions.manageUsers} onChange={(e) => handleSettingChange('adminPermissions', 'manageUsers', e.target.checked)} className="rounded border-gray-300 text-blue-600" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <input type="checkbox" checked={true} disabled className="rounded border-gray-300 text-blue-600" />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-6 text-sm text-gray-700">System Settings</td>
                    <td className="text-center py-3 px-3">
                      <input type="checkbox" checked={false} disabled className="rounded border-gray-300 text-gray-400" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <input type="checkbox" checked={settings.adminPermissions.systemSettings} onChange={(e) => handleSettingChange('adminPermissions', 'systemSettings', e.target.checked)} className="rounded border-gray-300 text-blue-600" />
                    </td>
                    <td className="text-center py-3 px-3">
                      <input type="checkbox" checked={true} disabled className="rounded border-gray-300 text-blue-600" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Security Notice */}
      <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-yellow-800">Security Notice</h3>
            <p className="text-sm text-yellow-700 mt-1">
              Changes to crisis protocols and user permissions are logged for audit purposes. 
              All administrators will be notified of significant security setting changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformSettingsPage;