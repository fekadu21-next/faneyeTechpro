
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [mounted, setMounted] = useState(false);
  const [isChanged, setIsChanged] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    general: {
      companyName: 'InHub Solutions',
      companyEmail: 'info@inhubsolutions.com',
      companyPhone: '+251-11-123-4567',
      companyWebsite: 'https://inhubsolutions.com',
      companyAddress: 'Addis Ababa, Ethiopia',
      timezone: 'Africa/Addis_Ababa',
      language: 'English',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12-hour'
    },
    // Profile Settings
    profile: {
      firstName: 'Nathnael',
      lastName: 'Fasil',
      email: 'nathnael@inhubsolutions.com',
      phone: '+251-911-123-456',
      role: 'Founder & CEO',
      department: 'Executive',
      bio: 'Visionary entrepreneur and innovator passionate about connecting Ethiopian talent with global opportunities.',
      avatar: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20male%20entrepreneur%20CEO%20wearing%20modern%20business%20attire%20with%20confident%20expression%2C%20executive%20portrait%20in%20contemporary%20office%20setting&width=200&height=200&seq=profile-avatar&orientation=squarish',
      linkedin: 'https://linkedin.com/in/nathnael-fasil',
      twitter: 'https://twitter.com/nathnael_f'
    },
    // Project Settings
    projects: {
      defaultProjectTemplate: 'agile',
      autoAssignTeam: true,
      projectNotifications: true,
      milestoneReminders: true,
      taskDeadlineAlerts: true,
      weeklyReports: true,
      clientUpdates: true,
      budgetThresholds: {
        warning: 75,
        critical: 90
      },
      timeTracking: true,
      qualityAssurance: true,
      defaultProjectStatus: 'planning'
    },
    // Team Settings
    team: {
      autoInviteMembers: false,
      skillsAssessment: true,
      performanceReviews: true,
      teamCollaboration: true,
      mentorshipProgram: true,
      trainingPrograms: true,
      workloadBalancing: true,
      timeOffManagement: true,
      teamCommunication: 'slack'
    },
    // Notification Settings
    notifications: {
      email: {
        projectUpdates: true,
        teamMessages: true,
        deadlineReminders: true,
        systemAlerts: true,
        weeklyDigest: true,
        clientCommunication: true
      },
      push: {
        urgentAlerts: true,
        taskAssignments: true,
        meetingReminders: true,
        deadlines: true,
        mentions: true
      },
      frequency: {
        instant: true,
        daily: false,
        weekly: true
      }
    },
    // Security Settings
    security: {
      twoFactorAuth: true,
      passwordExpiry: 90,
      loginAttempts: 5,
      sessionTimeout: 30,
      ipWhitelist: false,
      dataEncryption: true,
      backupFrequency: 'daily',
      auditLogs: true,
      gdprCompliance: true
    },
    // Integration Settings
    integrations: {
      slack: {
        enabled: true,
        webhook: 'https://hooks.slack.com/services/...',
        channels: ['#general', '#projects', '#alerts']
      },
      googleWorkspace: {
        enabled: true,
        domain: 'inhubsolutions.com'
      },
      github: {
        enabled: true,
        organization: 'inhub-solutions'
      },
      jira: {
        enabled: false,
        url: '',
        apiKey: ''
      },
      zoom: {
        enabled: true,
        apiKey: 'your-zoom-api-key'
      }
    },
    // Billing Settings
    billing: {
      plan: 'Professional',
      billingCycle: 'monthly',
      paymentMethod: 'credit-card',
      cardLast4: '4242',
      nextBilling: '2024-03-15',
      autoRenew: true,
      invoiceEmail: 'billing@inhubsolutions.com',
      taxId: 'ET-123456789'
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

const handleSettingChange = (section: string, key: string, value: any) => {

    if (!mounted) return;
    
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],

        [key]: value
      }
    }));
    setIsChanged(true);
  };

  const handleNestedSettingChange = (section: string, parentKey: string, key: string, value: any) => {

    if (!mounted) return;
    
    setSettings(prev => ({
      ...prev,
      [section]: {
        ... (prev as any)[section],

        [parentKey]: {
          ... (prev as any)[section],

          [key]: value
        }
      }
    }));
    setIsChanged(true);
  };

  const saveSettings = () => {
    if (!mounted) return;
    
    // Simulate API call
    setTimeout(() => {
      setIsChanged(false);
      setShowSaveModal(true);
      setTimeout(() => setShowSaveModal(false), 3000);
    }, 1000);
  };

  const resetSettings = () => {
    if (!mounted) return;
    
    // Reset to default values
    setIsChanged(false);
    // You can add logic to reset to original values here
  };

  const tabs = [
    { id: 'general', name: 'General', icon: 'ri-settings-3-line' },
    { id: 'profile', name: 'Profile', icon: 'ri-user-line' },
    { id: 'projects', name: 'Projects', icon: 'ri-folder-line' },
    { id: 'team', name: 'Team', icon: 'ri-team-line' },
    { id: 'notifications', name: 'Notifications', icon: 'ri-notification-line' },
    { id: 'security', name: 'Security', icon: 'ri-shield-line' },
    { id: 'integrations', name: 'Integrations', icon: 'ri-links-line' },
    { id: 'billing', name: 'Billing', icon: 'ri-bill-line' }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3D3A] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading settings...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1F3D3A] mb-4">
            Settings & Preferences
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Configure your account, projects, team, and system preferences
          </p>
        </div>

        {/* Settings Container */}
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Sidebar */}
              <div className="lg:w-64 bg-gray-50 p-6 border-r border-gray-200">
                <div className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-colors cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-[#1F3D3A] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <i className={`${tab.icon} mr-3 text-lg`}></i>
                      <span className="font-medium">{tab.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-6 lg:p-8">
                {/* General Settings */}
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#1F3D3A] mb-6">General Settings</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                        <input
                          type="text"
                          value={settings.general.companyName}
                          onChange={(e) => handleSettingChange('general', 'companyName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Email</label>
                        <input
                          type="email"
                          value={settings.general.companyEmail}
                          onChange={(e) => handleSettingChange('general', 'companyEmail', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={settings.general.companyPhone}
                          onChange={(e) => handleSettingChange('general', 'companyPhone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                        <input
                          type="url"
                          value={settings.general.companyWebsite}
                          onChange={(e) => handleSettingChange('general', 'companyWebsite', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                        <textarea
                          value={settings.general.companyAddress}
                          onChange={(e) => handleSettingChange('general', 'companyAddress', e.target.value)}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                        <select
                          value={settings.general.timezone}
                          onChange={(e) => handleSettingChange('general', 'timezone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="Africa/Addis_Ababa">Africa/Addis Ababa</option>
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">America/New York</option>
                          <option value="Europe/London">Europe/London</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <select
                          value={settings.general.language}
                          onChange={(e) => handleSettingChange('general', 'language', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="English">English</option>
                          <option value="Amharic">Amharic</option>
                          <option value="Oromo">Oromo</option>
                          <option value="Tigrinya">Tigrinya</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                        <select
                          value={settings.general.currency}
                          onChange={(e) => handleSettingChange('general', 'currency', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="USD">USD - US Dollar</option>
                          <option value="ETB">ETB - Ethiopian Birr</option>
                          <option value="EUR">EUR - Euro</option>
                          <option value="GBP">GBP - British Pound</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
                        <select
                          value={settings.general.dateFormat}
                          onChange={(e) => handleSettingChange('general', 'dateFormat', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                          <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                          <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Profile Settings */}
                {activeTab === 'profile' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#1F3D3A] mb-6">Profile Settings</h2>
                    </div>

                    <div className="flex items-center space-x-6 mb-8">
                      <div className="w-24 h-24 rounded-full overflow-hidden">
                        <img
                          src={settings.profile.avatar}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <button className="bg-[#1F3D3A] text-white px-4 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                          Change Avatar
                        </button>
                        <p className="text-sm text-gray-500 mt-2">JPG, PNG up to 5MB</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input
                          type="text"
                          value={settings.profile.firstName}
                          onChange={(e) => handleSettingChange('profile', 'firstName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input
                          type="text"
                          value={settings.profile.lastName}
                          onChange={(e) => handleSettingChange('profile', 'lastName', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={settings.profile.email}
                          onChange={(e) => handleSettingChange('profile', 'email', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={settings.profile.phone}
                          onChange={(e) => handleSettingChange('profile', 'phone', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <input
                          type="text"
                          value={settings.profile.role}
                          onChange={(e) => handleSettingChange('profile', 'role', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                        <input
                          type="text"
                          value={settings.profile.department}
                          onChange={(e) => handleSettingChange('profile', 'department', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        value={settings.profile.bio}
                        onChange={(e) => handleSettingChange('profile', 'bio', e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                        <input
                          type="url"
                          value={settings.profile.linkedin}
                          onChange={(e) => handleSettingChange('profile', 'linkedin', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                        <input
                          type="url"
                          value={settings.profile.twitter}
                          onChange={(e) => handleSettingChange('profile', 'twitter', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Project Settings */}
                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#1F3D3A] mb-6">Project Settings</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Default Project Template</label>
                        <select
                          value={settings.projects.defaultProjectTemplate}
                          onChange={(e) => handleSettingChange('projects', 'defaultProjectTemplate', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="agile">Agile</option>
                          <option value="waterfall">Waterfall</option>
                          <option value="kanban">Kanban</option>
                          <option value="scrum">Scrum</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Default Project Status</label>
                        <select
                          value={settings.projects.defaultProjectStatus}
                          onChange={(e) => handleSettingChange('projects', 'defaultProjectStatus', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="planning">Planning</option>
                          <option value="in-progress">In Progress</option>
                          <option value="on-hold">On Hold</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Auto-assign Team Members</h3>
                          <p className="text-sm text-gray-500">Automatically assign team members based on skills and availability</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange('projects', 'autoAssignTeam', !settings.projects.autoAssignTeam)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                            settings.projects.autoAssignTeam ? 'bg-[#1F3D3A]' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                              settings.projects.autoAssignTeam ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Project Notifications</h3>
                          <p className="text-sm text-gray-500">Receive notifications for project updates and changes</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange('projects', 'projectNotifications', !settings.projects.projectNotifications)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                            settings.projects.projectNotifications ? 'bg-[#1F3D3A]' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                              settings.projects.projectNotifications ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Time Tracking</h3>
                          <p className="text-sm text-gray-500">Enable time tracking for all projects</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange('projects', 'timeTracking', !settings.projects.timeTracking)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                            settings.projects.timeTracking ? 'bg-[#1F3D3A]' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                              settings.projects.timeTracking ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Budget Thresholds</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Warning Threshold (%)</label>
                          <input
                            type="number"
                            value={settings.projects.budgetThresholds.warning}
                            onChange={(e) => handleNestedSettingChange('projects', 'budgetThresholds', 'warning', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Critical Threshold (%)</label>
                          <input
                            type="number"
                            value={settings.projects.budgetThresholds.critical}
                            onChange={(e) => handleNestedSettingChange('projects', 'budgetThresholds', 'critical', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Team Settings */}
                {activeTab === 'team' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#1F3D3A] mb-6">Team Settings</h2>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Skills Assessment</h3>
                          <p className="text-sm text-gray-500">Regular skills assessment for team members</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange('team', 'skillsAssessment', !settings.team.skillsAssessment)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                            settings.team.skillsAssessment ? 'bg-[#1F3D3A]' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                              settings.team.skillsAssessment ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Performance Reviews</h3>
                          <p className="text-sm text-gray-500">Enable periodic performance reviews</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange('team', 'performanceReviews', !settings.team.performanceReviews)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                            settings.team.performanceReviews ? 'bg-[#1F3D3A]' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                              settings.team.performanceReviews ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Mentorship Program</h3>
                          <p className="text-sm text-gray-500">Enable mentorship program for team development</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange('team', 'mentorshipProgram', !settings.team.mentorshipProgram)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                            settings.team.mentorshipProgram ? 'bg-[#1F3D3A]' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                              settings.team.mentorshipProgram ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Team Communication Platform</label>
                      <select
                        value={settings.team.teamCommunication}
                        onChange={(e) => handleSettingChange('team', 'teamCommunication', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                      >
                        <option value="slack">Slack</option>
                        <option value="teams">Microsoft Teams</option>
                        <option value="discord">Discord</option>
                        <option value="email">Email</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Notifications Settings */}
                {activeTab === 'notifications' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#1F3D3A] mb-6">Notification Settings</h2>
                    </div>

                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Email Notifications</h3>
                        <div className="space-y-4">
                          {Object.entries(settings.notifications.email).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                                <p className="text-sm text-gray-500">Get notified via email</p>
                              </div>
                              <button
                                onClick={() => handleNestedSettingChange('notifications', 'email', key, !value)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                                  value ? 'bg-[#1F3D3A]' : 'bg-gray-200'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                                    value ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Push Notifications</h3>
                        <div className="space-y-4">
                          {Object.entries(settings.notifications.push).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                                <p className="text-sm text-gray-500">Get push notifications</p>
                              </div>
                              <button
                                onClick={() => handleNestedSettingChange('notifications', 'push', key, !value)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                                  value ? 'bg-[#1F3D3A]' : 'bg-gray-200'
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                                    value ? 'translate-x-6' : 'translate-x-1'
                                  }`}
                                />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security Settings */}
                {activeTab === 'security' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#1F3D3A] mb-6">Security Settings</h2>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <button
                          onClick={() => handleSettingChange('security', 'twoFactorAuth', !settings.security.twoFactorAuth)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                            settings.security.twoFactorAuth ? 'bg-[#1F3D3A]' : 'bg-gray-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                              settings.security.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Password Expiry (days)</label>
                          <input
                            type="number"
                            value={settings.security.passwordExpiry}
                            onChange={(e) => handleSettingChange('security', 'passwordExpiry', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                          <input
                            type="number"
                            value={settings.security.sessionTimeout}
                            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                        <select
                          value={settings.security.backupFrequency}
                          onChange={(e) => handleSettingChange('security', 'backupFrequency', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="daily">Daily</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Integrations Settings */}
                {activeTab === 'integrations' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#1F3D3A] mb-6">Integrations</h2>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <i className="ri-slack-line text-purple-600 text-xl"></i>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">Slack</h3>
                              <p className="text-sm text-gray-500">Team communication and notifications</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleNestedSettingChange('integrations', 'slack', 'enabled', !settings.integrations.slack.enabled)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                              settings.integrations.slack.enabled ? 'bg-[#1F3D3A]' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                                settings.integrations.slack.enabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                        {settings.integrations.slack.enabled && (
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Webhook URL</label>
                              <input
                                type="url"
                                value={settings.integrations.slack.webhook}
                                onChange={(e) => handleNestedSettingChange('integrations', 'slack', 'webhook', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <i className="ri-google-line text-blue-600 text-xl"></i>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">Google Workspace</h3>
                              <p className="text-sm text-gray-500">Email, calendar, and document integration</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleNestedSettingChange('integrations', 'googleWorkspace', 'enabled', !settings.integrations.googleWorkspace.enabled)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                              settings.integrations.googleWorkspace.enabled ? 'bg-[#1F3D3A]' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                                settings.integrations.googleWorkspace.enabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                              <i className="ri-github-line text-white text-xl"></i>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">GitHub</h3>
                              <p className="text-sm text-gray-500">Code repository and version control</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleNestedSettingChange('integrations', 'github', 'enabled', !settings.integrations.github.enabled)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                              settings.integrations.github.enabled ? 'bg-[#1F3D3A]' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                                settings.integrations.github.enabled ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Settings */}
                {activeTab === 'billing' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-bold text-[#1F3D3A] mb-6">Billing & Subscription</h2>
                    </div>

                    <div className="bg-gradient-to-r from-[#1F3D3A] to-green-600 p-6 rounded-lg text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">Professional Plan</h3>
                          <p className="opacity-90">Full access to all features and unlimited projects</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">$99/month</div>
                          <div className="text-sm opacity-75">Billed monthly</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Billing Cycle</label>
                        <select
                          value={settings.billing.billingCycle}
                          onChange={(e) => handleSettingChange('billing', 'billingCycle', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="monthly">Monthly</option>
                          <option value="yearly">Yearly (Save 20%)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Next Billing Date</label>
                        <input
                          type="text"
                          value={settings.billing.nextBilling}
                          disabled
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h3 className="font-medium text-gray-900 mb-4">Payment Method</h3>
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                          <i className="ri-bank-card-line text-white"></i>
                        </div>
                        <div>
                          <p className="font-medium">**** **** **** {settings.billing.cardLast4}</p>
                          <p className="text-sm text-gray-500">Expires 12/25</p>
                        </div>
                        <button className="ml-auto px-4 py-2 text-[#1F3D3A] border border-[#1F3D3A] rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer">
                          Update
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Auto-renewal</h3>
                        <p className="text-sm text-gray-500">Automatically renew your subscription</p>
                      </div>
                      <button
                        onClick={() => handleSettingChange('billing', 'autoRenew', !settings.billing.autoRenew)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                          settings.billing.autoRenew ? 'bg-[#1F3D3A]' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                            settings.billing.autoRenew ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end mt-8">
            <button
              onClick={resetSettings}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Reset Changes
            </button>
            <button
              onClick={saveSettings}
              disabled={!isChanged}
              className={`px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                isChanged
                  ? 'bg-[#1F3D3A] text-white hover:bg-[#2a5248]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Save Settings
            </button>
          </div>
        </div>
      </div>

      {/* Save Success Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-check-line text-2xl text-green-600"></i>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Settings Saved!</h3>
              <p className="text-gray-600">Your settings have been successfully updated.</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
