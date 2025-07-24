'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [signInStep, setSignInStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [signInData, setSignInData] = useState({
    username: '',
    phoneNumber: '',
    idNumber: '',
    verificationCode: ''
  });

  const [userProfile, setUserProfile] = useState({
    firstName: 'Nathnael',
    lastName: 'Fasil',
    username: 'nathnael_fasil',
    email: 'nathnael@inhubsolutions.com',
    phone: '+251-911-123-456',
    idNumber: 'ID123456789',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    address: 'Addis Ababa, Ethiopia',
    profession: 'Software Engineer',
    company: 'InHub Solutions',
    bio: 'Passionate software engineer and entrepreneur building innovative solutions for Ethiopian businesses.',
    profileImage: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20male%20software%20engineer%20entrepreneur%20with%20confident%20expression%20wearing%20modern%20business%20casual%20attire%2C%20clean%20professional%20headshot%20with%20contemporary%20office%20background&width=300&height=300&seq=profile-main&orientation=squarish',
    joinDate: '2022-01-15',
    lastLogin: '2024-02-20 14:30:00',
    accountStatus: 'Verified',
    preferences: {
      language: 'English',
      notifications: true,
      emailUpdates: true,
      twoFactorAuth: true
    }
  });

  useEffect(() => {
    setMounted(true);
    // Check if user is logged in (in real app, check localStorage/sessionStorage)
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleSignIn = async () => {
    if (!mounted) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (signInStep === 1) {
        // Validate username and phone
        if (signInData.username && signInData.phoneNumber) {
          setSignInStep(2);
        } else {
          alert('Please fill in all required fields');
        }
      } else if (signInStep === 2) {
        // Validate ID number
        if (signInData.idNumber) {
          setSignInStep(3);
          // Send verification code
          setTimeout(() => {
            alert('Verification code sent to your phone number');
          }, 500);
        } else {
          alert('Please enter your ID number');
        }
      } else if (signInStep === 3) {
        // Verify code
        const code = verificationCode.join('');
        if (code.length === 6) {
          setIsLoggedIn(true);
          localStorage.setItem('isLoggedIn', 'true');
          setShowSignInModal(false);
          setSignInStep(1);
          setSignInData({ username: '', phoneNumber: '', idNumber: '', verificationCode: '' });
          setVerificationCode(['', '', '', '', '', '']);
        } else {
          alert('Please enter the complete verification code');
        }
      }
    } catch (error) {
      console.error('Sign in error:', error);
      alert('Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    if (!mounted) return;
    
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    setActiveTab('profile');
  };

  const handleVerificationCodeChange = (index: number, value: string) => {
    if (!mounted) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value.slice(-1); // Only take the last character
    setVerificationCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleProfileUpdate = () => {
    if (!mounted) return;
    
    alert('Profile updated successfully!');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3D3A] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading account...</p>
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
            Account Management
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your profile, account settings, and authentication preferences
          </p>
        </div>

        {!isLoggedIn ? (
          // Authentication Section
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <div className="w-20 h-20 bg-[#1F3D3A]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-user-line text-3xl text-[#1F3D3A]"></i>
              </div>
              <h2 className="text-2xl font-bold text-[#1F3D3A] mb-4">Welcome to InHub</h2>
              <p className="text-gray-600 mb-8">
                Please sign in to access your account and manage your profile
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setShowSignInModal(true)}
                  className="bg-[#1F3D3A] text-white px-8 py-3 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => setShowSignUpModal(true)}
                  className="border border-[#1F3D3A] text-[#1F3D3A] px-8 py-3 rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer"
                >
                  Create Account
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Account Dashboard
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Sidebar */}
                <div className="lg:w-64 bg-gray-50 p-6 border-r border-gray-200">
                  <div className="flex items-center mb-6">
                    <div 
                      className="w-12 h-12 rounded-full bg-gray-200 mr-3"
                      style={{
                        backgroundImage: `url('${userProfile.profileImage}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{userProfile.firstName} {userProfile.lastName}</h3>
                      <p className="text-sm text-gray-600">@{userProfile.username}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {[
                      { id: 'profile', name: 'Profile', icon: 'ri-user-line' },
                      { id: 'security', name: 'Security', icon: 'ri-shield-line' },
                      { id: 'preferences', name: 'Preferences', icon: 'ri-settings-line' },
                      { id: 'activity', name: 'Activity', icon: 'ri-history-line' }
                    ].map((tab) => (
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
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                    >
                      <i className="ri-logout-box-line mr-3 text-lg"></i>
                      <span className="font-medium">Sign Out</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 lg:p-8">
                  {/* Profile Tab */}
                  {activeTab === 'profile' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-[#1F3D3A]">Profile Information</h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          userProfile.accountStatus === 'Verified' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {userProfile.accountStatus}
                        </span>
                      </div>

                      <div className="flex items-center space-x-6 mb-8">
                        <div className="w-24 h-24 rounded-full overflow-hidden">
                          <img
                            src={userProfile.profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <button className="bg-[#1F3D3A] text-white px-4 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                            Change Photo
                          </button>
                          <p className="text-sm text-gray-500 mt-2">JPG, PNG up to 5MB</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                          <input
                            type="text"
                            value={userProfile.firstName}
                            onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                          <input
                            type="text"
                            value={userProfile.lastName}
                            onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                          <input
                            type="text"
                            value={userProfile.username}
                            onChange={(e) => setUserProfile({...userProfile, username: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                          <input
                            type="email"
                            value={userProfile.email}
                            onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            value={userProfile.phone}
                            onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">ID Number</label>
                          <input
                            type="text"
                            value={userProfile.idNumber}
                            onChange={(e) => setUserProfile({...userProfile, idNumber: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                          <input
                            type="date"
                            value={userProfile.dateOfBirth}
                            onChange={(e) => setUserProfile({...userProfile, dateOfBirth: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                          <select
                            value={userProfile.gender}
                            onChange={(e) => setUserProfile({...userProfile, gender: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                          <textarea
                            value={userProfile.address}
                            onChange={(e) => setUserProfile({...userProfile, address: e.target.value})}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                          <textarea
                            value={userProfile.bio}
                            onChange={(e) => setUserProfile({...userProfile, bio: e.target.value})}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Profession</label>
                          <input
                            type="text"
                            value={userProfile.profession}
                            onChange={(e) => setUserProfile({...userProfile, profession: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                          <input
                            type="text"
                            value={userProfile.company}
                            onChange={(e) => setUserProfile({...userProfile, company: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={handleProfileUpdate}
                          className="bg-[#1F3D3A] text-white px-6 py-3 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Security Tab */}
                  {activeTab === 'security' && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-[#1F3D3A]">Security Settings</h2>
                      
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center">
                          <i className="ri-shield-check-line text-green-600 text-xl mr-3"></i>
                          <div>
                            <h3 className="font-semibold text-green-800">Account Verified</h3>
                            <p className="text-sm text-green-700">Your account has been successfully verified with ID: {userProfile.idNumber}</p>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="font-semibold text-gray-800 mb-4">Two-Factor Authentication</h3>
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Add an extra layer of security</p>
                              <p className="text-xs text-gray-500">Currently: {userProfile.preferences.twoFactorAuth ? 'Enabled' : 'Disabled'}</p>
                            </div>
                            <button
                              onClick={() => setUserProfile({
                                ...userProfile,
                                preferences: {
                                  ...userProfile.preferences,
                                  twoFactorAuth: !userProfile.preferences.twoFactorAuth
                                }
                              })}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                                userProfile.preferences.twoFactorAuth ? 'bg-[#1F3D3A]' : 'bg-gray-200'
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                                  userProfile.preferences.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
                                }`}
                              />
                            </button>
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                          <h3 className="font-semibold text-gray-800 mb-4">Password</h3>
                          <p className="text-sm text-gray-600 mb-4">Last changed: 30 days ago</p>
                          <button className="bg-[#1F3D3A] text-white px-4 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                            Change Password
                          </button>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-4">Login History</h3>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-800">Current Session</p>
                              <p className="text-sm text-gray-600">Addis Ababa, Ethiopia • Chrome on Windows</p>
                            </div>
                            <span className="text-sm text-green-600">Active</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-800">Previous Session</p>
                              <p className="text-sm text-gray-600">Addis Ababa, Ethiopia • Mobile Safari</p>
                            </div>
                            <span className="text-sm text-gray-500">2 hours ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Preferences Tab */}
                  {activeTab === 'preferences' && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-[#1F3D3A]">Preferences</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                          <select
                            value={userProfile.preferences.language}
                            onChange={(e) => setUserProfile({
                              ...userProfile,
                              preferences: {
                                ...userProfile.preferences,
                                language: e.target.value
                              }
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                          >
                            <option value="English">English</option>
                            <option value="Amharic">Amharic</option>
                            <option value="Oromo">Oromo</option>
                            <option value="Tigrinya">Tigrinya</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800">Push Notifications</h3>
                            <p className="text-sm text-gray-600">Receive notifications about account activity</p>
                          </div>
                          <button
                            onClick={() => setUserProfile({
                              ...userProfile,
                              preferences: {
                                ...userProfile.preferences,
                                notifications: !userProfile.preferences.notifications
                              }
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                              userProfile.preferences.notifications ? 'bg-[#1F3D3A]' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                                userProfile.preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-800">Email Updates</h3>
                            <p className="text-sm text-gray-600">Receive email updates about new features</p>
                          </div>
                          <button
                            onClick={() => setUserProfile({
                              ...userProfile,
                              preferences: {
                                ...userProfile.preferences,
                                emailUpdates: !userProfile.preferences.emailUpdates
                              }
                            })}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer ${
                              userProfile.preferences.emailUpdates ? 'bg-[#1F3D3A]' : 'bg-gray-200'
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                                userProfile.preferences.emailUpdates ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Activity Tab */}
                  {activeTab === 'activity' && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-[#1F3D3A]">Account Activity</h2>
                      
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-4">Account Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-600">Member Since</p>
                            <p className="font-medium text-gray-800">{new Date(userProfile.joinDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Last Login</p>
                            <p className="font-medium text-gray-800">{new Date(userProfile.lastLogin).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Account Status</p>
                            <p className="font-medium text-green-600">{userProfile.accountStatus}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Profile Completeness</p>
                            <p className="font-medium text-gray-800">95%</p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-6 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                            <div>
                              <p className="text-sm text-gray-800">Profile updated</p>
                              <p className="text-xs text-gray-500">2 hours ago</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                            <div>
                              <p className="text-sm text-gray-800">Logged in from new device</p>
                              <p className="text-xs text-gray-500">1 day ago</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                            <div>
                              <p className="text-sm text-gray-800">Password changed</p>
                              <p className="text-xs text-gray-500">1 week ago</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sign In Modal */}
      {showSignInModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#1F3D3A]">
                  Sign In {signInStep > 1 && `- Step ${signInStep}`}
                </h3>
                <button
                  onClick={() => {
                    setShowSignInModal(false);
                    setSignInStep(1);
                    setSignInData({ username: '', phoneNumber: '', idNumber: '', verificationCode: '' });
                    setVerificationCode(['', '', '', '', '', '']);
                  }}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              <div className="space-y-6">
                {signInStep === 1 && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                      <input
                        type="text"
                        value={signInData.username}
                        onChange={(e) => setSignInData({...signInData, username: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="Enter your username"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <input
                        type="tel"
                        value={signInData.phoneNumber}
                        onChange={(e) => setSignInData({...signInData, phoneNumber: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="+251-911-123-456"
                      />
                    </div>
                  </>
                )}

                {signInStep === 2 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ID Number *</label>
                    <input
                      type="text"
                      value={signInData.idNumber}
                      onChange={(e) => setSignInData({...signInData, idNumber: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                      placeholder="Enter your ID number"
                    />
                    <p className="text-sm text-gray-500 mt-2">
                      Please enter your national ID number for verification
                    </p>
                  </div>
                )}

                {signInStep === 3 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Verification Code *</label>
                    <div className="flex space-x-2 mb-4">
                      {verificationCode.map((digit, index) => (
                        <input
                          key={index}
                          id={`code-${index}`}
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                          className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-lg font-medium"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">
                      Enter the 6-digit code sent to {signInData.phoneNumber}
                    </p>
                    <button className="text-sm text-[#1F3D3A] hover:underline mt-2">
                      Resend Code
                    </button>
                  </div>
                )}

                <button
                  onClick={handleSignIn}
                  disabled={isLoading}
                  className={`w-full py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                    isLoading
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-[#1F3D3A] text-white hover:bg-[#2a5248]'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    signInStep === 3 ? 'Verify & Sign In' : 'Continue'
                  )}
                </button>

                {signInStep === 1 && (
                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                      onClick={() => {
                        setShowSignInModal(false);
                        setShowSignUpModal(true);
                      }}
                      className="text-[#1F3D3A] hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#1F3D3A]">Create Account</h3>
                <button
                  onClick={() => setShowSignUpModal(false)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                      placeholder="First name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                      placeholder="Last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                    placeholder="Choose a username"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                    placeholder="+251-911-123-456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ID Number *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                    placeholder="National ID number"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                    placeholder="Create a password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                    placeholder="Confirm your password"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-[#1F3D3A] focus:ring-[#1F3D3A] border-gray-300 rounded"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    I agree to the{' '}
                    <Link href="/terms" className="text-[#1F3D3A] hover:underline">
                      Terms of Service
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-[#1F3D3A] hover:underline">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button className="w-full bg-[#1F3D3A] text-white py-3 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                  Create Account
                </button>

                <p className="text-center text-sm text-gray-600">
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setShowSignUpModal(false);
                      setShowSignInModal(true);
                    }}
                    className="text-[#1F3D3A] hover:underline"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}