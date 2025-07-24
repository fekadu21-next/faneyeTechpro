
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Ethiopian Coffee Export Platform",
      description: "Digital platform connecting Ethiopian coffee producers with international buyers, featuring real-time price tracking, quality certification, and logistics management",
      category: "E-commerce",
      status: "completed",
      progress: 100,
      team: ["Alemayehu T.", "Sara M.", "David K.", "Meron H.", "Tadesse B."],
      dueDate: "2024-01-15",
      startDate: "2023-10-01",
      budget: 45000,
      spent: 42500,
      client: "Ethiopian Coffee Cooperative",
      tags: ["Agriculture", "Export", "Digital Platform", "Real-time", "Certification"],
      urgency: "medium",
      complexity: "complex",
      clientSatisfaction: 4.9,
      roi: 185,
      deliverables: 15,
      hoursLogged: 850,
      milestones: 8,
      risks: ["Market volatility", "Export regulations"],
      technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
      lastActivity: "2024-01-20",
      image: "https://readdy.ai/api/search-image?query=Ethiopian%20coffee%20farmers%20working%20in%20lush%20green%20coffee%20plantations%20with%20modern%20digital%20technology%20integration%2C%20advanced%20agricultural%20systems%2C%20professional%20photography%20style%2C%20detailed%20landscape%20with%20coffee%20processing%20facilities%20and%20quality%20control%20systems&width=400&height=250&seq=coffee2&orientation=landscape"
    },
    {
      id: 2,
      title: "Addis Ababa Smart City Initiative",
      description: "Comprehensive IoT-based smart city solutions for traffic management, urban planning, environmental monitoring, and citizen services integration",
      category: "Smart City",
      status: "in-progress",
      progress: 75,
      team: ["Meron H.", "Tadesse B.", "Hanna G.", "Solomon W.", "Tigist M.", "Dawit R."],
      dueDate: "2024-06-30",
      startDate: "2023-08-15",
      budget: 120000,
      spent: 89000,
      client: "Addis Ababa City Administration",
      tags: ["IoT", "Urban Planning", "Technology", "Environmental", "Transportation"],
      urgency: "high",
      complexity: "very-complex",
      clientSatisfaction: 4.7,
      roi: 145,
      deliverables: 22,
      hoursLogged: 1850,
      milestones: 12,
      risks: ["Infrastructure limitations", "Stakeholder alignment", "Technology integration"],
      technologies: ["IoT", "Python", "TensorFlow", "Azure", "React Native"],
      lastActivity: "2024-02-22",
      image: "https://readdy.ai/api/search-image?query=Modern%20smart%20city%20infrastructure%20in%20Addis%20Ababa%20with%20advanced%20IoT%20sensors%2C%20digital%20displays%2C%20smart%20traffic%20systems%2C%20environmental%20monitoring%20stations%2C%20futuristic%20urban%20planning%20elements%2C%20clean%20bright%20lighting%2C%20professional%20architectural%20photography&width=400&height=250&seq=smartcity2&orientation=landscape"
    },
    {
      id: 3,
      title: "Healthcare Management System",
      description: "Comprehensive hospital management system for Ethiopian healthcare facilities with patient records, appointment scheduling, inventory management, and telemedicine capabilities",
      category: "Healthcare",
      status: "in-progress",
      progress: 60,
      team: ["Bethel A.", "Yonas L.", "Rahel S.", "Kidist H."],
      dueDate: "2024-08-15",
      startDate: "2024-01-10",
      budget: 75000,
      spent: 38000,
      client: "Black Lion Hospital",
      tags: ["Healthcare", "Management", "Digital", "Telemedicine", "Records"],
      urgency: "high",
      complexity: "complex",
      clientSatisfaction: 4.6,
      roi: 120,
      deliverables: 18,
      hoursLogged: 720,
      milestones: 9,
      risks: ["Data security", "Regulatory compliance", "User adoption"],
      technologies: ["React", "Django", "PostgreSQL", "Docker", "WebRTC"],
      lastActivity: "2024-02-20",
      image: "https://readdy.ai/api/search-image?query=Modern%20Ethiopian%20hospital%20with%20advanced%20digital%20healthcare%20technology%2C%20medical%20professionals%20using%20sophisticated%20tablet%20computers%20and%20digital%20systems%2C%20clean%20white%20medical%20environment%20with%20state-of-the-art%20equipment%2C%20professional%20healthcare%20photography&width=400&height=250&seq=healthcare2&orientation=landscape"
    },
    {
      id: 4,
      title: "Microfinance Mobile App",
      description: "Mobile banking solution for rural Ethiopian communities with offline capabilities, micro-loan processing, savings management, and financial literacy modules",
      category: "Fintech",
      status: "planning",
      progress: 25,
      team: ["Solomon W.", "Tigist M.", "Amanuel T."],
      dueDate: "2024-10-01",
      startDate: "2024-02-01",
      budget: 35000,
      spent: 8750,
      client: "Amhara Credit & Savings Institution",
      tags: ["Mobile Banking", "Rural", "Fintech", "Offline", "Microloans"],
      urgency: "medium",
      complexity: "medium",
      clientSatisfaction: 4.3,
      roi: 95,
      deliverables: 12,
      hoursLogged: 180,
      milestones: 6,
      risks: ["Connectivity issues", "Financial regulations", "User education"],
      technologies: ["React Native", "Node.js", "SQLite", "Blockchain"],
      lastActivity: "2024-02-18",
      image: "https://readdy.ai/api/search-image?query=Ethiopian%20rural%20community%20members%20using%20advanced%20mobile%20phones%20for%20comprehensive%20banking%20services%2C%20traditional%20Ethiopian%20village%20setting%20with%20modern%20mobile%20financial%20technology%2C%20community%20banking%20center%2C%20warm%20natural%20lighting%2C%20documentary%20style%20photography&width=400&height=250&seq=fintech2&orientation=landscape"
    },
    {
      id: 5,
      title: "Educational Platform for Universities",
      description: "Advanced e-learning platform tailored for Ethiopian higher education institutions with AI-powered personalized learning, virtual labs, and comprehensive analytics",
      category: "Education",
      status: "completed",
      progress: 100,
      team: ["Dawit R.", "Selamawit K.", "Amanuel T.", "Mahlet G.", "Biniyam A."],
      dueDate: "2023-12-20",
      startDate: "2023-06-01",
      budget: 55000,
      spent: 53200,
      client: "Addis Ababa University",
      tags: ["Education", "E-learning", "University", "AI", "Analytics"],
      urgency: "low",
      complexity: "complex",
      clientSatisfaction: 4.8,
      roi: 165,
      deliverables: 20,
      hoursLogged: 920,
      milestones: 10,
      risks: ["Technology adoption", "Content migration"],
      technologies: ["React", "Python", "TensorFlow", "MongoDB", "WebSocket"],
      lastActivity: "2024-01-05",
      image: "https://readdy.ai/api/search-image?query=Ethiopian%20university%20students%20using%20advanced%20e-learning%20platform%20on%20laptops%20and%20tablets%20with%20AI-powered%20interfaces%2C%20bright%20modern%20classroom%20setting%20with%20virtual%20reality%20elements%2C%20diverse%20students%20engaged%20in%20interactive%20digital%20learning%20experiences&width=400&height=250&seq=education2&orientation=landscape"
    },
    {
      id: 6,
      title: "Tourism Discovery App",
      description: "Comprehensive mobile app showcasing Ethiopian historical sites and cultural attractions with AR experiences, virtual tours, local guide booking, and cultural insights",
      category: "Tourism",
      status: "in-progress",
      progress: 85,
      team: ["Mahlet G.", "Biniyam A.", "Kidist H.", "Selamawit K."],
      dueDate: "2024-04-30",
      startDate: "2023-11-01",
      budget: 40000,
      spent: 34000,
      client: "Ethiopian Tourism Organization",
      tags: ["Tourism", "Cultural Heritage", "Mobile App", "AR", "Virtual Tours"],
      urgency: "medium",
      complexity: "medium",
      clientSatisfaction: 4.5,
      roi: 110,
      deliverables: 16,
      hoursLogged: 680,
      milestones: 8,
      risks: ["Content accuracy", "Technical compatibility"],
      technologies: ["React Native", "AR.js", "Firebase", "Maps API"],
      lastActivity: "2024-02-21",
      image: "https://readdy.ai/api/search-image?query=Beautiful%20Ethiopian%20historical%20landmarks%20including%20Lalibela%20churches%20and%20Axum%20obelisks%20with%20tourists%20using%20advanced%20mobile%20app%20with%20augmented%20reality%20features%2C%20golden%20hour%20lighting%2C%20professional%20travel%20photography%20style%20with%20modern%20technology%20integration&width=400&height=250&seq=tourism2&orientation=landscape"
    },
    {
      id: 7,
      title: "Animal Food Processing Platform",
      description: "Comprehensive animal feed processing and distribution system for Bejala company, featuring quality control, supply chain management, and market expansion strategies",
      category: "Agriculture",
      status: "in-progress",
      progress: 70,
      team: ["Nathnael F.", "Bethel A.", "Samuel G.", "Dawit M.", "Tigist K."],
      dueDate: "2024-07-15",
      startDate: "2024-01-20",
      budget: 65000,
      spent: 45500,
      client: "Bejala Company",
      tags: ["Animal Feed", "Processing", "Quality Control", "Supply Chain", "Market Expansion"],
      urgency: "high",
      complexity: "complex",
      clientSatisfaction: 4.7,
      roi: 160,
      deliverables: 19,
      hoursLogged: 890,
      milestones: 11,
      risks: ["Market competition", "Quality standards", "Distribution challenges"],
      technologies: ["React", "Node.js", "MongoDB", "IoT Sensors", "Analytics"],
      lastActivity: "2024-02-23",
      image: "https://readdy.ai/api/search-image?query=Modern%20animal%20feed%20processing%20facility%20with%20advanced%20machinery%2C%20grain%20silos%2C%20production%20lines%2C%20quality%20control%20laboratory%2C%20industrial%20food%20processing%20equipment%2C%20clean%20manufacturing%20environment%2C%20livestock%20nutrition%20pellets%2C%20professional%20industrial%20photography%20style&width=400&height=250&seq=animalfeed1&orientation=landscape",
      logo: "https://static.readdy.ai/image/f7efb641c38d6268640c0be8ec3ad911/41a95fd155acf7b43e02d13bf53a511f.png"
    },
    {
      id: 8,
      title: "House of Chewata Gaming Platform",
      description: "Pioneering gamification platform that leverages hyper-casual, skill-based games integrated into Telegram to create interactive experiences for users while providing brands and influencers with new ways to engage and monetize",
      category: "Gaming",
      status: "in-progress",
      progress: 45,
      team: ["Michael K.", "Hanan W.", "Zerihun A.", "Selam T.", "Robel G."],
      dueDate: "2024-09-30",
      startDate: "2024-03-01",
      budget: 85000,
      spent: 38250,
      client: "GOMIDA Solutions",
      tags: ["Gaming", "Gamification", "Telegram", "Hyper-casual", "Skill-based", "Monetization"],
      urgency: "high",
      complexity: "complex",
      clientSatisfaction: 4.8,
      roi: 140,
      deliverables: 16,
      hoursLogged: 650,
      milestones: 8,
      risks: ["Platform integration", "User acquisition", "Monetization strategy"],
      technologies: ["React", "Node.js", "Telegram Bot API", "WebGL", "MongoDB", "Redis"],
      lastActivity: "2024-02-24",
      image: "https://readdy.ai/api/search-image?query=Modern%20gaming%20development%20studio%20with%20Ethiopian%20developers%20working%20on%20mobile%20games%20and%20gamification%20platforms%2C%20multiple%20screens%20showing%20game%20interfaces%20and%20Telegram%20integration%2C%20contemporary%20tech%20workspace%20with%20gaming%20equipment%20and%20colorful%20game%20design%20elements%2C%20professional%20technology%20development%20environment&width=400&height=250&seq=gaming1&orientation=landscape"
    }
  ];

  const categories = [...new Set(projects.map(p => p.category))];
  const clients = [...new Set(projects.map(p => p.client))];

  const getStatusColor = (status) => {
    switch (status) {
      case 'planning':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-700';
      case 'medium':
        return 'bg-orange-100 text-orange-700';
      case 'low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getComplexityIcon = (complexity) => {
    switch (complexity) {
      case 'simple':
        return 'ri-star-line';
      case 'medium':
        return 'ri-star-half-line';
      case 'complex':
        return 'ri-star-fill';
      case 'very-complex':
        return 'ri-fire-line';
      default:
        return 'ri-star-line';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesStatus = activeTab === 'all' || project.status === activeTab;
    const matchesCategory = filterCategory === 'all' || project.category === filterCategory;
    const matchesSearch = searchQuery === '' ||
                        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesCategory && matchesSearch;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent':
        return new Date(b.lastActivity) - new Date(a.lastActivity);
      case 'progress':
        return b.progress - a.progress;
      case 'deadline':
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'budget':
        return b.budget - a.budget;
      case 'urgency':
        const urgencyOrder = { 'high': 3, 'medium': 2, 'low': 1 };
        return urgencyOrder[b.urgency] - urgencyOrder[a.urgency];
      case 'satisfaction':
        return b.clientSatisfaction - a.clientSatisfaction;
      default:
        return 0;
    }
  });

  const getProjectStats = () => {
    const stats = {
      total: projects.length,
      completed: projects.filter(p => p.status === 'completed').length,
      inProgress: projects.filter(p => p.status === 'in-progress').length,
      planning: projects.filter(p => p.status === 'planning').length,
      totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
      totalSpent: projects.reduce((sum, p) => sum + p.spent, 0),
      avgProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length),
      avgSatisfaction: (projects.reduce((sum, p) => sum + p.clientSatisfaction, 0) / projects.length).toFixed(1),
      avgROI: Math.round(projects.reduce((sum, p) => sum + p.roi, 0) / projects.length),
      totalHours: projects.reduce((sum, p) => sum + p.hoursLogged, 0),
      overdue: projects.filter(p => new Date(p.dueDate) < new Date() && p.progress < 100).length
    };
    return stats;
  };

  const stats = getProjectStats();

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3D3A] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading project portfolio...</p>
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
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1F3D3A] mb-4">
            Project Portfolio
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover our comprehensive project portfolio showcasing innovative solutions for Ethiopian businesses and organizations.
          </p>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-[#1F3D3A]">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Projects</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-blue-600">{stats.inProgress}</div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-orange-600">{stats.avgProgress}%</div>
              <div className="text-sm text-gray-600">Avg Progress</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-purple-600">{stats.avgSatisfaction}★</div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-sm">
              <div className="text-2xl font-bold text-gray-600">${(stats.totalBudget / 1000).toFixed(0)}K</div>
              <div className="text-sm text-gray-600">Total Budget</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link href="/post-project" className="bg-[#1F3D3A] text-white px-8 py-4 rounded-full hover:bg-[#2a5248] transition-colors font-medium text-lg cursor-pointer whitespace-nowrap">
              <i className="ri-add-line mr-2"></i>
              Start New Project
            </Link>
            <Link href="/project-management" className="bg-green-500 text-white px-8 py-4 rounded-full hover:bg-green-600 transition-colors font-medium text-lg cursor-pointer whitespace-nowrap">
              <i className="ri-dashboard-line mr-2"></i>
              Project Management
            </Link>
            <Link href="/analytics" className="bg-blue-500 text-white px-8 py-4 rounded-full hover:bg-blue-600 transition-colors font-medium text-lg cursor-pointer whitespace-nowrap">
              <i className="ri-bar-chart-line mr-2"></i>
              Analytics
            </Link>
            <Link href="/settings" className="bg-purple-500 text-white px-8 py-4 rounded-full hover:bg-purple-600 transition-colors font-medium text-lg cursor-pointer whitespace-nowrap">
              <i className="ri-settings-3-line mr-2"></i>
              Settings
            </Link>
          </div>

          {/* Filters and Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search projects, tags, or descriptions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] focus:border-transparent"
                  />
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
              </div>

              {/* View Mode */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-[#1F3D3A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <i className="ri-grid-line"></i>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-[#1F3D3A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <i className="ri-list-check"></i>
                </button>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] focus:border-transparent pr-8"
              >
                <option value="recent">Recent Activity</option>
                <option value="progress">Progress</option>
                <option value="deadline">Deadline</option>
                <option value="budget">Budget</option>
                <option value="urgency">Urgency</option>
                <option value="satisfaction">Client Satisfaction</option>
              </select>

              {/* Advanced Filters Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-3 rounded-lg transition-colors cursor-pointer flex items-center whitespace-nowrap ${showFilters ? 'bg-[#1F3D3A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <i className="ri-filter-line mr-2"></i>
                Filters
              </button>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={filterCategory}
                      onChange={(e) => setFilterCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] focus:border-transparent pr-8"
                    >
                      <option value="all">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Showing {filteredProjects.length} of {projects.length} projects
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('all');
                      setFilterCategory('all');
                      setSearchQuery('');
                      setSortBy('recent');
                    }}
                    className="px-4 py-2 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Status Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              { id: 'all', name: 'All Projects', count: projects.length },
              { id: 'planning', name: 'Planning', count: projects.filter(p => p.status === 'planning').length },
              { id: 'in-progress', name: 'In Progress', count: projects.filter(p => p.status === 'in-progress').length },
              { id: 'completed', name: 'Completed', count: projects.filter(p => p.status === 'completed').length }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveTab(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${activeTab === filter.id ? 'bg-[#1F3D3A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                {filter.name} ({filter.count})
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <div className="relative">
                    <div className="relative h-48 overflow-hidden" onClick={() => setSelectedProject(project)}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 flex flex-col gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(project.status)}`}>
                          {project.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getUrgencyColor(project.urgency)}`}>
                          {project.urgency}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-[#1F3D3A] bg-[#1F3D3A]/10 px-3 py-1 rounded-full">
                          {project.category}
                        </span>
                        <div className="flex items-center space-x-1 text-yellow-500">
                          <i className="ri-star-fill text-sm"></i>
                          <span className="text-sm font-medium text-gray-700">{project.clientSatisfaction}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {project.title}
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                        {project.description}
                      </p>

                      {/* Progress Section */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-[#1F3D3A] to-green-500 h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Budget and ROI */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-lg font-bold text-[#1F3D3A]">${(project.budget / 1000).toFixed(0)}K</div>
                          <div className="text-xs text-gray-600">Budget</div>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-lg font-bold text-green-600">{project.roi}%</div>
                          <div className="text-xs text-gray-600">ROI</div>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="text-xs text-gray-400">
                            +{project.tags.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 4).map((member, index) => (
                            <div key={index} className="w-8 h-8 bg-[#1F3D3A] rounded-full flex items-center justify-center text-white text-xs font-medium border-2 border-white">
                              {member.split(' ')[0][0]}
                            </div>
                          ))}
                          {project.team.length > 4 && (
                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 text-xs border-2 border-white">
                              +{project.team.length - 4}
                            </div>
                          )}
                        </div>
                        <div className="text-sm text-gray-500">
                          <i className="ri-calendar-line mr-1"></i>
                          {new Date(project.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="w-full bg-[#1F3D3A] text-white py-3 rounded-lg hover:bg-[#2a5248] transition-colors font-medium text-center block cursor-pointer whitespace-nowrap"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left p-4 font-semibold text-gray-800">Project</th>
                      <th className="text-left p-4 font-semibold text-gray-800">Status</th>
                      <th className="text-left p-4 font-semibold text-gray-800">Progress</th>
                      <th className="text-left p-4 font-semibold text-gray-800">Budget</th>
                      <th className="text-left p-4 font-semibold text-gray-800">Rating</th>
                      <th className="text-left p-4 font-semibold text-gray-800">Due Date</th>
                      <th className="text-left p-4 font-semibold text-gray-800">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project) => (
                      <tr key={project.id} className="border-t border-gray-100 hover:bg-gray-50">
                        <td className="p-4">
                          <div className="flex items-center">
                            <img src={project.image} alt="" className="w-12 h-12 rounded-lg mr-3 object-cover" />
                            <div>
                              <div className="font-medium text-gray-800">{project.title}</div>
                              <div className="text-xs text-gray-500">{project.category}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-xs border ${getStatusColor(project.status)}`}>
                            {project.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-3">
                              <div
                                className="bg-[#1F3D3A] h-2 rounded-full"
                                style={{ width: `${project.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm font-medium text-gray-800">
                            ${project.budget.toLocaleString()}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center">
                            <i className="ri-star-fill text-yellow-500 mr-1"></i>
                            <span className="text-sm font-medium text-gray-700">{project.clientSatisfaction}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {new Date(project.dueDate).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="w-8 h-8 flex items-center justify-center text-[#1F3D3A] hover:bg-[#1F3D3A] hover:text-white rounded transition-colors cursor-pointer"
                          >
                            <i className="ri-eye-line text-sm"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Project Detail Modal */}
          {selectedProject && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      {selectedProject.logo && (
                        <img
                          src={selectedProject.logo}
                          alt={`${selectedProject.client} logo`}
                          className="w-12 h-12 object-contain"
                        />
                      )}
                      <div>
                        <h2 className="text-2xl font-bold text-[#1F3D3A] mb-2">{selectedProject.title}</h2>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(selectedProject.status)}`}>
                            {selectedProject.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-sm ${getUrgencyColor(selectedProject.urgency)}`}>
                            {selectedProject.urgency} priority
                          </span>
                          <div className="flex items-center space-x-1 text-yellow-500">
                            <i className="ri-star-fill"></i>
                            <span className="font-medium">{selectedProject.clientSatisfaction}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 cursor-pointer"
                    >
                      <i className="ri-close-line text-xl"></i>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                      <img
                        src={selectedProject.image}
                        alt={selectedProject.title}
                        className="w-full h-48 sm:h-64 object-cover object-top rounded-xl mb-6"
                      />

                      <div className="bg-gray-50 p-6 rounded-xl mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Description</h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {selectedProject.description}
                        </p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-white rounded-lg">
                            <div className="text-2xl font-bold text-[#1F3D3A]">{selectedProject.progress}%</div>
                            <div className="text-xs text-gray-600">Progress</div>
                          </div>
                          <div className="text-center p-3 bg-white rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{selectedProject.roi}%</div>
                            <div className="text-xs text-gray-600">ROI</div>
                          </div>
                          <div className="text-center p-3 bg-white rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{selectedProject.deliverables}</div>
                            <div className="text-xs text-gray-600">Deliverables</div>
                          </div>
                          <div className="text-center p-3 bg-white rounded-lg">
                            <div className="text-2xl font-bold text-purple-600">{selectedProject.hoursLogged}</div>
                            <div className="text-xs text-gray-600">Hours</div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <h4 className="font-semibold text-gray-800 mb-3">Technologies Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.technologies.map((tech, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-xl">
                          <h4 className="font-semibold text-gray-800 mb-3">Project Tags</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.tags.map((tag, index) => (
                              <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-800 mb-4">Project Details</h4>
                        <div className="space-y-4">
                          <div>
                            <span className="text-sm text-gray-500">Client</span>
                            <p className="font-semibold text-gray-900">{selectedProject.client}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Budget</span>
                            <p className="font-semibold text-gray-900">${selectedProject.budget.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Timeline</span>
                            <p className="font-semibold text-gray-900">
                              {new Date(selectedProject.startDate).toLocaleDateString()} - {new Date(selectedProject.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-sm text-gray-500">Last Activity</span>
                            <p className="font-semibold text-gray-900">
                              {new Date(selectedProject.lastActivity).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="font-semibold text-gray-800 mb-4">Team Members</h4>
                        <div className="space-y-3">
                          {selectedProject.team.map((member, index) => (
                            <div key={index} className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-[#1F3D3A] rounded-full flex items-center justify-center text-white font-medium">
                                {member.split(' ')[0][0]}
                              </div>
                              <span className="font-medium text-gray-900">{member}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Link
                          href={`/project-management?project=${selectedProject.id}`}
                          className="w-full bg-[#1F3D3A] text-white py-3 rounded-lg hover:bg-[#2a5248] transition-colors font-medium text-center block cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-dashboard-line mr-2"></i>
                          Open in Project Manager
                        </Link>
                        <button className="w-full border border-[#1F3D3A] text-[#1F3D3A] py-3 rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors font-medium cursor-pointer whitespace-nowrap">
                          <i className="ri-download-line mr-2"></i>
                          Export Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
}
