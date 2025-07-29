
'use client';

import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SkillOwnerDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const userData = {
    name: 'Hana Tesfaye',
    title: 'Senior Full Stack Developer',
    rating: 4.9,
    reviews: 47,
    profileComplete: 85,
    hourlyRate: 35,
    totalEarnings: 12450,
    thisMonthEarnings: 2850,
    pendingPayments: 850,
    availableBalance: 11600,
    activeProjects: 3,
    completedProjects: 89,
    responseTime: '2 hours',
    location: 'Addis Ababa, Ethiopia',
    skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB', 'Docker'],
    image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20female%20software%20developer%20with%20modern%20laptop%20in%20contemporary%20office%20setting%2C%20confident%20and%20skilled%20technology%20professional%2C%20clean%20background%20with%20natural%20lighting%2C%20professional%20headshot%20style%20portrait&width=300&height=300&seq=prof1&orientation=squarish'
  };

  const recentProjects = [
    {
      id: 1,
      title: 'E-commerce Platform Development',
      client: 'EthioTech Solutions',
      status: 'In Progress',
      progress: 75,
      budget: 3500,
      deadline: '2024-03-15',
      lastUpdate: '2 hours ago'
    },
    {
      id: 2,
      title: 'Mobile Banking App',
      client: 'FinanceHub Ethiopia',
      status: 'Review',
      progress: 95,
      budget: 5000,
      deadline: '2024-02-28',
      lastUpdate: '1 day ago'
    },
    {
      id: 3,
      title: 'Healthcare Management System',
      client: 'MedTech Addis',
      status: 'Planning',
      progress: 15,
      budget: 4200,
      deadline: '2024-04-10',
      lastUpdate: '3 days ago'
    }
  ];

  const recentMessages = [
    {
      id: 1,
      client: 'EthioTech Solutions',
      message: 'Great progress on the shopping cart functionality! Looking forward to the next update.',
      time: '2 hours ago',
      unread: true
    },
    {
      id: 2,
      client: 'FinanceHub Ethiopia',
      message: 'The mobile app looks amazing. Ready for final review and deployment.',
      time: '1 day ago',
      unread: false
    },
    {
      id: 3,
      client: 'MedTech Addis',
      message: 'Can we schedule a call to discuss the project requirements in detail?',
      time: '3 days ago',
      unread: false
    }
  ];

  const earnings = [
    { month: 'Jan', amount: 2100 },
    { month: 'Feb', amount: 2850 },
    { month: 'Mar', amount: 3200 },
    { month: 'Apr', amount: 2750 },
    { month: 'May', amount: 3100 }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3D3A] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 md:mb-0 w-full md:w-auto">
            <div 
              className="w-16 h-16 rounded-full bg-gray-200 mb-4 sm:mb-0 sm:mr-4 flex-shrink-0"
              style={{
                backgroundImage: `url('${userData.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            <div className="w-full sm:w-auto">
              <h1 className="text-xl sm:text-2xl font-bold text-[#1F3D3A] mb-1">Welcome back, {userData.name}!</h1>
              <p className="text-gray-600 mb-2">{userData.title}</p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                <div className="flex items-center">
                  <i className="ri-star-fill text-yellow-400 mr-1"></i>
                  <span className="font-semibold">{userData.rating}</span>
                  <span className="text-gray-500 text-sm ml-1">({userData.reviews} reviews)</span>
                </div>
                <span className="hidden sm:inline mx-2 text-gray-300">•</span>
                <span className="text-gray-600 text-sm">{userData.location}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowProfileModal(true)}
              className="bg-[#1F3D3A] text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer whitespace-nowrap"
            >
              Edit Profile
            </button>
            <Link href="/skills" className="border border-[#1F3D3A] text-[#1F3D3A] px-4 sm:px-6 py-2 rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer text-center whitespace-nowrap">
              Browse Projects
            </Link>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg">
                <i className="ri-money-dollar-circle-line text-xl text-green-600"></i>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-800">${userData.totalEarnings.toLocaleString()}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Total Earnings</h3>
            <p className="text-sm text-green-600">+${userData.thisMonthEarnings} this month</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg">
                <i className="ri-folder-line text-xl text-blue-600"></i>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-800">{userData.activeProjects}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Active Projects</h3>
            <p className="text-sm text-gray-600">{userData.completedProjects} completed</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-lg">
                <i className="ri-time-line text-xl text-purple-600"></i>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-800">{userData.responseTime}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Avg Response</h3>
            <p className="text-sm text-purple-600">Excellent rating</p>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-lg">
                <i className="ri-wallet-line text-xl text-orange-600"></i>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-800">${userData.availableBalance.toLocaleString()}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Available Balance</h3>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="text-sm text-orange-600 hover:text-orange-700 cursor-pointer"
            >
              Withdraw funds
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row border-b border-gray-200 overflow-x-auto">
            {[ 
              { id: 'overview', name: 'Overview', icon: 'ri-dashboard-line' },
              { id: 'projects', name: 'Projects', icon: 'ri-folder-line' },
              { id: 'messages', name: 'Messages', icon: 'ri-message-3-line' },
              { id: 'earnings', name: 'Earnings', icon: 'ri-line-chart-line' },
              { id: 'profile', name: 'Profile', icon: 'ri-user-line' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center sm:justify-start px-4 sm:px-6 py-3 sm:py-4 font-medium transition-colors cursor-pointer whitespace-nowrap min-w-0 flex-1 sm:flex-none ${
                  activeTab === tab.id
                    ? `text-[#1F3D3A] border-b-2 sm:border-b-2 border-[#1F3D3A] bg-[#1F3D3A]/5 sm:bg-transparent`
                    : `text-gray-600 hover:text-gray-800 hover:bg-gray-50`
                }`}
              >
                <i className={`${tab.icon} mr-1 sm:mr-2 text-lg sm:text-base`}></i>
                <span className="text-sm sm:text-base">{tab.name}</span>
              </button>
            ))}
          </div>

          <div className="p-4 sm:p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Profile Completion */}
                  <div className="bg-gradient-to-r from-[#1F3D3A]/10 to-green-500/10 p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-[#1F3D3A] mb-4">Profile Completion</h3>
                    <div className="flex items-center mb-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-3 mr-4">
                        <div
                          className="bg-[#1F3D3A] h-3 rounded-full transition-all duration-300"
                          style={{ width: `${userData.profileComplete}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-[#1F3D3A]">{userData.profileComplete}%</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      Complete your profile to attract more clients and increase your earnings.
                    </p>
                    <button
                      onClick={() => setShowProfileModal(true)}
                      className="bg-[#1F3D3A] text-white px-4 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      Complete Profile
                    </button>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white border border-gray-200 p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Link href="/skills" className="flex flex-col items-center p-3 sm:p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                        <i className="ri-search-line text-xl sm:text-2xl text-blue-600 mb-2"></i>
                        <span className="text-xs sm:text-sm font-medium text-blue-800 text-center">Find Projects</span>
                      </Link>
                      <button className="flex flex-col items-center p-3 sm:p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors cursor-pointer">
                        <i className="ri-message-line text-xl sm:text-2xl text-green-600 mb-2"></i>
                        <span className="text-xs sm:text-sm font-medium text-green-800 text-center">Messages</span>
                      </button>
                      <button
                        onClick={() => setShowWithdrawModal(true)}
                        className="flex flex-col items-center p-3 sm:p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors cursor-pointer"
                      >
                        <i className="ri-wallet-line text-xl sm:text-2xl text-purple-600 mb-2"></i>
                        <span className="text-xs sm:text-sm font-medium text-purple-800 text-center">Withdraw</span>
                      </button>
                      <button
                        onClick={() => setShowProfileModal(true)}
                        className="flex flex-col items-center p-3 sm:p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors cursor-pointer"
                      >
                        <i className="ri-settings-line text-xl sm:text-2xl text-orange-600 mb-2"></i>
                        <span className="text-xs sm:text-sm font-medium text-orange-800 text-center">Settings</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Projects</h3>
                    <div className="space-y-4">
                      {recentProjects.slice(0, 3).map((project) => (
                        <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-800 text-sm sm:text-base">{project.title}</h4>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                              project.status === 'Review' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-2">{project.client}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center flex-1 mr-4">
                              <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-[#1F3D3A] h-2 rounded-full"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-xs text-gray-600 whitespace-nowrap">{project.progress}%</span>
                            </div>
                            <span className="text-sm font-medium text-[#1F3D3A] whitespace-nowrap">${project.budget}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Messages</h3>
                    <div className="space-y-4">
                      {recentMessages.slice(0, 3).map((message) => (
                        <div key={message.id} className={`border rounded-lg p-4 ${message.unread ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-800 text-sm sm:text-base">{message.client}</h4>
                            <span className="text-xs text-gray-500 whitespace-nowrap">{message.time}</span>
                          </div>
                          <p className="text-gray-700 text-sm">{message.message}</p>
                          {message.unread && (
                            <div className="mt-2">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-700">
                                New
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">My Projects</h3>
                  <Link href="/skills" className="bg-[#1F3D3A] text-white px-4 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                    Find New Projects
                  </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {recentProjects.map((project) => (
                    <div key={project.id} className="bg-white border border-gray-200 rounded-xl p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          project.status === 'Review' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {project.status}
                        </span>
                        <span className="text-lg font-bold text-[#1F3D3A]">${project.budget}</span>
                      </div>

                      <h4 className="font-semibold text-gray-800 mb-2">{project.title}</h4>
                      <p className="text-gray-600 text-sm mb-4">{project.client}</p>

                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Progress</span>
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#1F3D3A] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>Due: {project.deadline}</span>
                        <span>Updated: {project.lastUpdate}</span>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 bg-[#1F3D3A] text-white py-2 px-4 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                          View Details
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                          <i className="ri-message-line"></i>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800">Messages</h3>
                <div className="space-y-4">
                  {recentMessages.map((message) => (
                    <div key={message.id} className={`border rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer ${message.unread ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-[#1F3D3A] rounded-full flex items-center justify-center text-white font-medium mr-4">
                            {message.client.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{message.client}</h4>
                            <p className="text-gray-700 mt-1">{message.message}</p>
                            <p className="text-gray-500 text-sm mt-2">{message.time}</p>
                          </div>
                        </div>
                        {message.unread && (
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Earnings Tab */}
            {activeTab === 'earnings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">Earnings Overview</h3>
                  <button
                    onClick={() => setShowWithdrawModal(true)}
                    className="bg-[#1F3D3A] text-white px-4 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer"
                  >
                    Withdraw Funds
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white border border-gray-200 p-6 rounded-xl">
                    <h4 className="font-medium text-gray-600 mb-2">This Month</h4>
                    <div className="text-2xl font-bold text-[#1F3D3A]">${userData.thisMonthEarnings}</div>
                    <div className="text-sm text-green-600 mt-1">+15% from last month</div>
                  </div>
                  <div className="bg-white border border-gray-200 p-6 rounded-xl">
                    <h4 className="font-medium text-gray-600 mb-2">Pending</h4>
                    <div className="text-2xl font-bold text-orange-600">${userData.pendingPayments}</div>
                    <div className="text-sm text-gray-500 mt-1">2 payments pending</div>
                  </div>
                  <div className="bg-white border border-gray-200 p-6 rounded-xl">
                    <h4 className="font-medium text-gray-600 mb-2">Available</h4>
                    <div className="text-2xl font-bold text-green-600">${userData.availableBalance}</div>
                    <div className="text-sm text-gray-500 mt-1">Ready to withdraw</div>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 p-6 rounded-xl">
                  <h4 className="font-semibold text-gray-800 mb-6">Monthly Earnings</h4>
                  <div className="flex items-end space-x-4 h-64">
                    {earnings.map((month, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div
                          className="bg-[#1F3D3A] rounded-t-lg w-full"
                          style={{ height: `${(month.amount / 3200) * 200}px` }}
                        ></div>
                        <div className="mt-2 text-sm text-gray-600">{month.month}</div>
                        <div className="text-xs font-medium text-gray-800">${month.amount}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">Profile Settings</h3>
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className="bg-[#1F3D3A] text-white px-4 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer"
                  >
                    Edit Profile
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1">
                    <div className="bg-white border border-gray-200 p-6 rounded-xl text-center">
                      <div 
                        className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4"
                        style={{
                          backgroundImage: `url('${userData.image}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      ></div>
                      <h4 className="font-semibold text-gray-800 mb-1">{userData.name}</h4>
                      <p className="text-gray-600 mb-2">{userData.title}</p>
                      <div className="flex items-center justify-center mb-4">
                        <i className="ri-star-fill text-yellow-400 mr-1"></i>
                        <span className="font-semibold">{userData.rating}</span>
                        <span className="text-gray-500 text-sm ml-1">({userData.reviews})</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-4">{userData.location}</div>
                      <div className="text-lg font-bold text-[#1F3D3A]">${userData.hourlyRate}/hour</div>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="bg-white border border-gray-200 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-4">Skills & Expertise</h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {userData.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-[#1F3D3A] text-white rounded-full text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">Statistics</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Projects Completed:</span>
                              <span className="font-medium">{userData.completedProjects}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Success Rate:</span>
                              <span className="font-medium text-green-600">98%</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Response Time:</span>
                              <span className="font-medium">{userData.responseTime}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h5 className="font-medium text-gray-800 mb-2">Account Info</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Member Since:</span>
                              <span className="font-medium">Jan 2022</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Verification:</span>
                              <span className="flex items-center text-green-600">
                                <i className="ri-shield-check-fill mr-1"></i>
                                Verified
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Profile Views:</span>
                              <span className="font-medium">1,247</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#1F3D3A]">Edit Profile</h3>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              <div className="space-y-6">
                <div className="text-center">
                  <div 
                    className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4"
                    style={{
                      backgroundImage: `url('${userData.image}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  ></div>
                  <button className="bg-[#1F3D3A] text-white px-4 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                    Change Photo
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value="Hana"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value="Tesfaye"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
                  <input
                    type="text"
                    value="Senior Full Stack Developer"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (USD)</label>
                  <input
                    type="number"
                    value="35"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    rows={4}
                    value="Passionate full-stack developer with expertise in modern web technologies. Specialized in building scalable applications for Ethiopian businesses."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                  ></textarea>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-[#1F3D3A] text-white py-3 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                    Save Changes
                  </button>
                  <button
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#1F3D3A]">Withdraw Funds</h3>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#1F3D3A]">${userData.availableBalance}</div>
                    <div className="text-gray-600">Available Balance</div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Method</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8">
                    <option>Bank Transfer</option>
                    <option>Mobile Money</option>
                    <option>PayPal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">Withdrawal Information</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Processing time: 1-3 business days</li>
                    <li>• Transaction fee: 2.5%</li>
                    <li>• Minimum withdrawal: $50</li>
                  </ul>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-[#1F3D3A] text-white py-3 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                    Request Withdrawal
                  </button>
                  <button
                    onClick={() => setShowWithdrawModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
