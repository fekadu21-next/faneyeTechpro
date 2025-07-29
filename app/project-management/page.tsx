
'use client';

import { useState } from 'react';
import Header from '../../components/Header';
import ProjectKanban from '../../components/ProjectKanban';
import ProjectGantt from '../../components/ProjectGantt';

export default function ProjectManagementPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const [showAIInsights, setShowAIInsights] = useState(false);
  const [showResourcePlanner, setShowResourcePlanner] = useState(false);
  const [showRiskAssessment, setShowRiskAssessment] = useState(false);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarView, setCalendarView] = useState('month');
  const [dashboardView, setDashboardView] = useState('overview');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [selectedTeamMember, setSelectedTeamMember] = useState('all');

  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    assignee: '',
    dueDate: '',
    status: 'pending',
    estimatedHours: '',
    tags: [],
    dependencies: []
  });

  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    deadline: '',
    budget: '',
    priority: 'medium',
    category: '',
    client: '',
    teamMembers: [],
    milestones: []
  });

  
  const [userProfile, setUserProfile] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+251 911 234 567',
    role: 'Senior Project Manager',
    department: 'Innovation Hub',
    location: 'Addis Ababa, Ethiopia',
    joinDate: '2022-03-15',
    avatar: 'SJ',
    projectsManaged: 47,
    teamSize: 12,
    successRate: 94,
    experience: '8+ years',
    skills: ['Project Management', 'Team Leadership', 'Agile', 'Risk Management', 'Strategic Planning'],
    certifications: ['PMP', 'Scrum Master', 'PRINCE2'],
    preferredLanguage: 'English',
    timezone: 'East Africa Time (EAT)',
    theme: 'light',
    dashboardLayout: 'standard',
    notifications: {
      email: true,
      sms: false,
      push: true,
      weekly_reports: true
    }
  });
  
type ProjectType = {
  id: number;
  title: string;
  status: string;
  progress: number;
  deadline: string;
  budget: number;
  spent: number;
  team: string[];
  priority: string;
  category: string;
  client: string;
  startDate: string;
  riskLevel: string;
    healthScore: number;
  // Add other fields as needed, especially the one mentioned: risks
  risks: { id: number; description: string; level: string }[];
};

  const projects = [
    {
      id: 1,
      title: 'Digital Transformation Initiative',
      status: 'in-progress',
      progress: 75,
      deadline: '2024-06-15',
      budget: 150000,
      spent: 112500,
      team: ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince'],
      priority: 'high',
      category: 'Technology',
      client: 'Ethiopian Airlines',
      startDate: '2024-01-15',
      riskLevel: 'medium',
      healthScore: 85,
      velocity: 12.5,
      burndownRate: 0.85,
      image: 'https://readdy.ai/api/search-image?query=Ethiopian%20Airlines%20digital%20transformation%20project%20with%20modern%20technology%20systems%20and%20aviation%20industry%20digital%20innovation%2C%20contemporary%20office%20workspace%20with%20airline%20operations%20dashboards%20and%20digital%20displays%2C%20professional%20technology%20implementation%20environment%20with%20screens%20showing%20flight%20data%20and%20digital%20interfaces&width=400&height=250&seq=digital-transform&orientation=landscape',
      tasks: [
        { id: 1, title: 'Requirements Analysis', status: 'completed', assignee: 'Alice Johnson', priority: 'high', estimatedHours: 40, actualHours: 38, progress: 100 },
        { id: 2, title: 'System Design', status: 'in-progress', assignee: 'Bob Smith', priority: 'medium', estimatedHours: 60, actualHours: 45, progress: 75 },
        { id: 3, title: 'Development Phase 1', status: 'in-progress', assignee: 'Charlie Brown', priority: 'high', estimatedHours: 120, actualHours: 90, progress: 60 },
        { id: 4, title: 'Testing Framework', status: 'pending', assignee: 'Diana Prince', priority: 'medium', estimatedHours: 80, actualHours: 0, progress: 0 }
      ],
      milestones: [
        { id: 1, title: 'Requirements Complete', date: '2024-02-15', status: 'completed' },
        { id: 2, title: 'Design Approval', date: '2024-03-15', status: 'completed' },
        { id: 3, title: 'Development Phase 1', date: '2024-04-30', status: 'in-progress' },
        { id: 4, title: 'Testing Complete', date: '2024-05-30', status: 'pending' }
      ],
      risks: [
        { id: 1, description: 'Resource availability', impact: 'high', probability: 'medium', mitigation: 'Cross-train team members' },
        { id: 2, description: 'Technology integration', impact: 'medium', probability: 'low', mitigation: 'Proof of concept testing' }
      ]
    },
    {
      id: 2,
      title: 'Market Research Campaign',
      status: 'completed',
      progress: 100,
      deadline: '2024-03-20',
      budget: 50000,
      spent: 47500,
      team: ['Diana Prince', 'Eve Wilson'],
      priority: 'medium',
      category: 'Marketing',
      client: 'Ethiopian Coffee Exporters',
      startDate: '2024-01-01',
      riskLevel: 'low',
      healthScore: 95,
      velocity: 15.2,
      burndownRate: 0.95,
      image: 'https://readdy.ai/api/search-image?query=Ethiopian%20coffee%20market%20research%20project%20showing%20coffee%20beans%20and%20export%20analysis%20charts%20and%20data%20visualization%2C%20professional%20market%20research%20workspace%20with%20coffee%20samples%20and%20statistical%20reports%2C%20contemporary%20research%20environment%20with%20Ethiopian%20coffee%20industry%20focus%20and%20analytical%20documents&width=400&height=250&seq=market-research&orientation=landscape',
      tasks: [
        { id: 5, title: 'Survey Design', status: 'completed', assignee: 'Diana Prince', priority: 'high', estimatedHours: 20, actualHours: 18, progress: 100 },
        { id: 6, title: 'Data Collection', status: 'completed', assignee: 'Eve Wilson', priority: 'medium', estimatedHours: 40, actualHours: 42, progress: 100 },
        { id: 7, title: 'Analysis & Report', status: 'completed', assignee: 'Diana Prince', priority: 'high', estimatedHours: 30, actualHours: 28, progress: 100 }
      ],
      milestones: [
        { id: 5, title: 'Survey Launch', date: '2024-01-15', status: 'completed' },
        { id: 6, title: 'Data Collection Complete', date: '2024-02-28', status: 'completed' },
        { id: 7, title: 'Final Report', date: '2024-03-15', status: 'completed' }
      ],
      risks: []
    },
    {
      id: 3,
      title: 'Product Launch Strategy',
      status: 'planning',
      progress: 25,
      deadline: '2024-08-30',
      budget: 200000,
      spent: 50000,
      team: ['Frank Miller', 'Grace Lee', 'Henry Ford', 'Ivy Chen'],
      priority: 'high',
      category: 'Strategy',
      client: 'Awash Bank',
      startDate: '2024-02-01',
      riskLevel: 'high',
      healthScore: 65,
      velocity: 8.3,
      burndownRate: 0.25,
      image: 'https://readdy.ai/api/search-image?query=Awash%20Bank%20product%20launch%20strategy%20planning%20session%20with%20banking%20professionals%20in%20modern%20boardroom%20and%20financial%20services%20strategy%20meeting%2C%20presentation%20screens%20and%20strategic%20planning%20materials%20and%20whiteboards%2C%20contemporary%20banking%20project%20environment%20with%20business%20charts%20and%20strategic%20documents&width=400&height=250&seq=product-launch&orientation=landscape',
      tasks: [
        { id: 8, title: 'Market Analysis', status: 'in-progress', assignee: 'Frank Miller', priority: 'high', estimatedHours: 50, actualHours: 35, progress: 70 },
        { id: 9, title: 'Competitive Research', status: 'pending', assignee: 'Grace Lee', priority: 'medium', estimatedHours: 40, actualHours: 0, progress: 0 },
        { id: 10, title: 'Strategy Development', status: 'pending', assignee: 'Henry Ford', priority: 'high', estimatedHours: 80, actualHours: 0, progress: 0 }
      ],
      milestones: [
        { id: 8, title: 'Market Analysis Complete', date: '2024-03-30', status: 'in-progress' },
        { id: 9, title: 'Strategy Framework', date: '2024-05-15', status: 'pending' },
        { id: 10, title: 'Launch Plan Ready', date: '2024-07-30', status: 'pending' }
      ],
      risks: [
        { id: 3, description: 'Market volatility', impact: 'high', probability: 'high', mitigation: 'Flexible strategy approach' },
        { id: 4, description: 'Regulatory changes', impact: 'medium', probability: 'medium', mitigation: 'Regular compliance review' }
      ]
    },
    {
      id: 4,
      title: "E-commerce Platform Development",
      status: "in-progress",
      progress: 65,
      deadline: "2024-07-15",
      budget: 95000,
      spent: 58000,
      team: ["Sarah Ahmed", "Michael Tadesse", "Rahel Bekele", "David Mengistu"],
      priority: "high",
      category: "E-commerce",
      client: "Ethiopian Marketplace Ltd",
      startDate: "2024-01-20",
      riskLevel: "medium",
      healthScore: 78,
      velocity: 11.2,
      burndownRate: 0.65,
      image: "https://readdy.ai/api/search-image?query=Modern%20Ethiopian%20e-commerce%20platform%20development%20workspace%20with%20developers%20working%20on%20online%20marketplace%20and%20shopping%20website%20interfaces%2C%20contemporary%20office%20setting%20with%20multiple%20screens%20showing%20e-commerce%20designs%20and%20coding%20environments%2C%20professional%20software%20development%20with%20clean%20modern%20aesthetics%20and%20programming%20workstations&width=400&height=250&seq=ecommerce-project&orientation=landscape",
      tasks: [
        { id: 11, title: 'User Authentication System', status: 'completed', assignee: 'Sarah Ahmed', priority: 'high', estimatedHours: 35, actualHours: 32, progress: 100 },
        { id: 12, title: 'Product Catalog Management', status: 'in-progress', assignee: 'Michael Tadesse', priority: 'high', estimatedHours: 60, actualHours: 45, progress: 75 },
        { id: 13, title: 'Payment Gateway Integration', status: 'in-progress', assignee: 'Rahel Bekele', priority: 'high', estimatedHours: 50, actualHours: 30, progress: 60 },
        { id: 14, title: 'Order Management System', status: 'pending', assignee: 'David Mengistu', priority: 'medium', estimatedHours: 45, actualHours: 0, progress: 0 }
      ],
      milestones: [
        { id: 11, title: 'User System Complete', date: '2024-03-01', status: 'completed' },
        { id: 12, title: 'Core Features Ready', date: '2024-05-15', status: 'in-progress' },
        { id: 13, title: 'Payment Integration', date: '2024-06-15', status: 'pending' },
        { id: 14, title: 'Beta Launch', date: '2024-07-01', status: 'pending' }
      ],
      risks: [
        { id: 5, description: 'Payment gateway delays', impact: 'medium', probability: 'medium', mitigation: 'Multiple payment provider options' },
        { id: 6, description: 'Mobile optimization complexity', impact: 'low', probability: 'high', mitigation: 'Progressive web app approach' }
      ]
    }
  ];

  const analyticsData = {
    productivity: {
      currentWeek: 87,
      lastWeek: 82,
      trend: 'up'
    },
    teamPerformance: [
      { name: 'Alice Johnson', efficiency: 92, tasksCompleted: 15, hoursLogged: 38 },
      { name: 'Bob Smith', efficiency: 88, tasksCompleted: 12, hoursLogged: 42 },
      { name: 'Charlie Brown', efficiency: 85, tasksCompleted: 18, hoursLogged: 45 },
      { name: 'Diana Prince', efficiency: 90, tasksCompleted: 14, hoursLogged: 40 }
    ],
    projectHealth: {
      onTrack: 2,
      atRisk: 1,
      delayed: 0
    },
    budgetUtilization: {
      allocated: 400000,
      spent: 210000,
      remaining: 190000,
      efficiency: 87.5
    },
    timeTracking: {
      plannedHours: 520,
      actualHours: 485,
      variance: -35,
      efficiency: 93.3
    }
  };

  const aiInsights = [
    {
      type: 'warning',
      title: 'Resource Bottleneck Detected',
      description: 'Alice Johnson is overallocated by 15% this week. Consider redistributing tasks.',
      priority: 'high',
      action: 'Rebalance workload'
    },
    {
      type: 'opportunity',
      title: 'Early Completion Possible',
      description: 'Market Research Campaign is ahead of schedule. Resources can be reallocated.',
      priority: 'medium',
      action: 'Optimize resources'
    },
    {
      type: 'risk',
      title: 'Budget Variance Alert',
      description: 'Digital Transformation project is 5% over budget. Review spending.',
      priority: 'high',
      action: 'Budget review'
    },
    {
      type: 'success',
      title: 'Team Velocity Improving',
      description: 'Overall team velocity has increased by 12% this month.',
      priority: 'low',
      action: 'Continue current practices'
    }
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const getFilteredProjects = () => {
    let filtered = projects;

    if (filterPeriod !== 'all') {
      const now = new Date();
      const filterDate = new Date();

      switch (filterPeriod) {
        case 'week':
          filterDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          filterDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          filterDate.setMonth(now.getMonth() - 3);
          break;
      }

      filtered = filtered.filter(project =>
        new Date(project.startDate) >= filterDate
      );
    }

    if (selectedTeamMember !== 'all') {
      filtered = filtered.filter(project =>
        project.team.includes(selectedTeamMember)
      );
    }

    return filtered;
  };

  const getProjectMetrics = () => {
    const filtered = getFilteredProjects();
    const totalBudget = filtered.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = filtered.reduce((sum, p) => sum + p.spent, 0);
    const avgProgress = filtered.reduce((sum, p) => sum + p.progress, 0) / filtered.length;
    const avgHealthScore = filtered.reduce((sum, p) => sum + p.healthScore, 0) / filtered.length;

    return {
      totalProjects: filtered.length,
      totalBudget,
      totalSpent,
      budgetUtilization: (totalSpent / totalBudget) * 100,
      avgProgress: Math.round(avgProgress),
      avgHealthScore: Math.round(avgHealthScore),
      onTrack: filtered.filter(p => p.healthScore >= 80).length,
      atRisk: filtered.filter(p => p.healthScore >= 60 && p.healthScore < 80).length,
      critical: filtered.filter(p => p.healthScore < 60).length
    };
  };

  const metrics = getProjectMetrics();

  const [showEditProfile, setShowEditProfile] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <h1 className="text-2xl font-bold text-[#1F3D3A]">Advanced Project Management</h1>
              <nav className="flex space-x-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTab === 'dashboard' ? 'bg-[#1F3D3A] text-white' : 'text-gray-600 hover:text-[#1F3D3A] hover:bg-gray-100'
                    }`}
                >
                  <i className="ri-dashboard-line mr-2"></i>
                  Dashboard
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTab === 'projects' ? 'bg-[#1F3D3A] text-white' : 'text-gray-600 hover:text-[#1F3D3A] hover:bg-gray-100'
                    }`}
                >
                  <i className="ri-folder-line mr-2"></i>
                  All Projects
                </button>
                <button
                  onClick={() => setActiveTab('kanban')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTab === 'kanban' ? 'bg-[#1F3D3A] text-white' : 'text-gray-600 hover:text-[#1F3D3A] hover:bg-gray-100'
                    }`}
                >
                  <i className="ri-kanban-view mr-2"></i>
                  Kanban
                </button>
                <button
                  onClick={() => setActiveTab('timeline')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTab === 'timeline' ? 'bg-[#1F3D3A] text-white' : 'text-gray-600 hover:text-[#1F3D3A] hover:bg-gray-100'
                    }`}
                >
                  <i className="ri-timeline-view mr-2"></i>
                  Timeline
                </button>
                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTab === 'calendar' ? 'bg-[#1F3D3A] text-white' : 'text-gray-600 hover:text-[#1F3D3A] hover:bg-gray-100'
                    }`}
                >
                  <i className="ri-calendar-line"></i>
                  Calendar
                </button>
                <button
                  onClick={() => setActiveTab('reports')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTab === 'reports' ? 'bg-[#1F3D3A] text-white' : 'text-gray-600 hover:text-[#1F3D3A] hover:bg-gray-100'
                    }`}
                >
                  <i className="ri-file-chart-line"></i>
                  Reports
                </button>
                <button
                  onClick={() => setActiveTab('resources')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${activeTab === 'resources' ? 'bg-[#1F3D3A] text-white' : 'text-gray-600 hover:text-[#1F3D3A] hover:bg-gray-100'
                    }`}
                >
                  <i className="ri-team-line mr-2"></i>
                  Resources
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAIInsights(true)}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors cursor-pointer flex items-center whitespace-nowrap"
              >
                <i className="ri-brain-line mr-2"></i>
                AI Insights
              </button>
              <button
                onClick={() => setShowProjectModal(true)}
                className="bg-[#1F3D3A] text-white px-4 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer flex items-center whitespace-nowrap"
              >
                <i className="ri-add-line mr-2"></i>
                New Project
              </button>
              <button
                onClick={() => setShowProfileModal(true)}
                className="w-10 h-10 bg-[#1F3D3A] text-white rounded-full flex items-center justify-center hover:bg-[#2a5248] transition-colors cursor-pointer"
              >
                {userProfile.avatar}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-sm border-r border-gray-200 transition-all duration-300 min-h-screen`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className={`font-semibold text-gray-800 ${sidebarCollapsed ? 'hidden' : 'block'}`}>Navigation</h2>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <i className={`ri-${sidebarCollapsed ? 'menu-unfold' : 'menu-fold'}-line`}></i>
              </button>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer group ${activeTab === 'dashboard' ? 'bg-[#1F3D3A] text-white' : 'hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <i className="ri-dashboard-line"></i>
                  {!sidebarCollapsed && <span className="font-medium">Dashboard</span>}
                </div>
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer group ${activeTab === 'projects' ? 'bg-[#1F3D3A] text-white' : 'hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <i className="ri-folder-line"></i>
                  {!sidebarCollapsed && <span className="font-medium">All Projects</span>}
                </div>
              </button>

              <button
                onClick={() => setActiveTab('kanban')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer group ${activeTab === 'kanban' ? 'bg-[#1F3D3A] text-white' : 'hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <i className="ri-kanban-view"></i>
                  {!sidebarCollapsed && <span className="font-medium">Kanban Board</span>}
                </div>
              </button>

              <button
                onClick={() => setActiveTab('timeline')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer group ${activeTab === 'timeline' ? 'bg-[#1F3D3A] text-white' : 'hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <i className="ri-timeline-view"></i>
                  {!sidebarCollapsed && <span className="font-medium">Timeline View</span>}
                </div>
              </button>

              <button
                onClick={() => setActiveTab('calendar')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer group ${activeTab === 'calendar' ? 'bg-[#1F3D3A] text-white' : 'hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <i className="ri-calendar-line"></i>
                  {!sidebarCollapsed && <span className="font-medium">Calendar</span>}
                </div>
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors cursor-pointer group ${activeTab === 'reports' ? 'bg-[#1F3D3A] text-white' : 'hover:bg-gray-100'
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <i className="ri-file-chart-line"></i>
                  {!sidebarCollapsed && <span className="font-medium">Reports</span>}
                </div>
              </button>
            </nav>

            {!sidebarCollapsed && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setShowTaskModal(true)}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <i className="ri-add-line mr-2"></i>
                    Add Task
                  </button>
                  <button
                    onClick={() => setShowReportsModal(true)}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <i className="ri-download-line mr-2"></i>
                    Export Report
                  </button>
                  <button
                    onClick={() => setShowRiskAssessment(true)}
                    className="w-full flex items-center px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                  >
                    <i className="ri-shield-check-line mr-2"></i>
                    Risk Assessment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 p-6 overflow-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#1F3D3A]">Project Dashboard</h2>
                  <p className="text-gray-600 mt-1">Advanced project management with AI-powered insights</p>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={filterPeriod}
                    onChange={(e) => setFilterPeriod(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                  >
                    <option value="all">All Time</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                  </select>
                  <select
                    value={selectedTeamMember}
                    onChange={(e) => setSelectedTeamMember(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                  >
                    <option value="all">All Team Members</option>
                    <option value="Alice Johnson">Alice Johnson</option>
                    <option value="Bob Smith">Bob Smith</option>
                    <option value="Charlie Brown">Charlie Brown</option>
                    <option value="Diana Prince">Diana Prince</option>
                  </select>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setDashboardView('overview')}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors cursor-pointer ${dashboardView === 'overview' ? 'bg-[#1F3D3A] text-white' : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                      Overview
                    </button>
                    <button
                      onClick={() => setDashboardView('detailed')}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors cursor-pointer ${dashboardView === 'detailed' ? 'bg-[#1F3D3A] text-white' : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                      Detailed
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Total Projects</p>
                      <p className="text-2xl font-bold text-gray-800">{metrics.totalProjects}</p>
                      <p className="text-xs text-green-600 mt-1">
                        <i className="ri-arrow-up-line mr-1"></i>
                        +12% from last month
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <i className="ri-folder-line text-xl text-blue-600"></i>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Avg Progress</p>
                      <p className="text-2xl font-bold text-gray-800">{metrics.avgProgress}%</p>
                      <p className="text-xs text-green-600 mt-1">
                        <i className="ri-arrow-up-line mr-1"></i>
                        +5% this week
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <i className="ri-progress-line text-xl text-green-600"></i>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Budget Efficiency</p>
                      <p className="text-2xl font-bold text-gray-800">{metrics.budgetUtilization.toFixed(1)}%</p>
                      <p className="text-xs text-orange-600 mt-1">
                        <i className="ri-arrow-down-line mr-1"></i>
                        -2% from target
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <i className="ri-money-dollar-circle-line text-xl text-orange-600"></i>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Health Score</p>
                      <p className="text-2xl font-bold text-gray-800">{metrics.avgHealthScore}</p>
                      <p className="text-xs text-green-600 mt-1">
                        <i className="ri-arrow-up-line mr-1"></i>
                        Excellent
                      </p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <i className="ri-heart-pulse-line text-xl text-purple-600"></i>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Project Health Overview</h3>
                    <button className="text-[#1F3D3A] hover:text-[#2a5248] cursor-pointer">
                      <i className="ri-more-line"></i>
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{metrics.onTrack}</div>
                      <div className="text-sm text-green-700">On Track</div>
                      <div className="text-xs text-gray-500">Health Score ≥ 80</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">{metrics.atRisk}</div>
                      <div className="text-sm text-yellow-700">At Risk</div>
                      <div className="text-xs text-gray-500">Health Score 60-79</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">{metrics.critical}</div>
                      <div className="text-sm text-red-700">Critical</div>
                      <div className="text-xs text-gray-500">Health Score &lt; 60</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {getFilteredProjects().map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-3 h-3 rounded-full ${project.healthScore >= 80 ? 'bg-green-500' : project.healthScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                            ></div>
                            <h4 className="font-medium text-gray-800">{project.title}</h4>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${project.priority === 'high' ? 'bg-red-100 text-red-700' : project.priority === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                                }`}
                            >
                              {project.priority}
                            </span>
                          </div>
                          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                            <span>Progress: {project.progress}%</span>
                            <span>Health: {project.healthScore}</span>
                            <span>Budget: ${project.spent.toLocaleString()}/${project.budget.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${project.healthScore >= 80 ? 'bg-green-500' : project.healthScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <button
                            onClick={() => setSelectedProject({...project,
  risks: project.risks.map(risk => ({
    id: risk.id,
    description: risk.description,
    level: `${risk.impact}-${risk.probability}`
  }))
})}

                            className="text-[#1F3D3A] hover:text-[#2a5248] cursor-pointer"
                          >
                            <i className="ri-eye-line"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Performance</h3>
                    <div className="space-y-4">
                      {analyticsData.teamPerformance.map((member, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-[#1F3D3A] rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {member.name.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-medium text-gray-800 text-sm">{member.name}</div>
                              <div className="text-xs text-gray-500">{member.tasksCompleted} tasks</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-800">{member.efficiency}%</div>
                            <div className="text-xs text-gray-500">{member.hoursLogged}h</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Task completed by Alice Johnson</span>
                        <span className="text-gray-400">2h ago</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-600">New milestone reached</span>
                        <span className="text-gray-400">4h ago</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        <span className="text-gray-600">Budget alert triggered</span>
                        <span className="text-gray-400">6h ago</span>
                      </div>
                      <div className="flex items-center space-x-3 text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-gray-600">Team meeting scheduled</span>
                        <span className="text-gray-400">1d ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#1F3D3A]">All Projects</h2>
                  <p className="text-gray-600 mt-1">Manage and track all your projects</p>
                </div>
                <button
                  onClick={() => setShowProjectModal(true)}
                  className="bg-[#1F3D3A] text-white px-4 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer flex items-center whitespace-nowrap"
                >
                  <i className="ri-add-line mr-2"></i>
                  New Project
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Project Image */}
                    <div
                      className="relative h-64 rounded-t-2xl overflow-hidden"
                      style={{
                        backgroundImage: `url('${project.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    >
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'completed' ? 'bg-green-100 text-green-800 border border-green-200' : project.status === 'in-progress' ? 'bg-blue-100 text-blue-800 border border-blue-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            }`}
                        >
                          {project.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${project.priority === 'high' ? 'bg-red-100 text-red-700' : project.priority === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                            }`}
                        >
                          {project.priority}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-semibold text-gray-800 text-lg">{project.title}</h3>
                      </div>

                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-[#1F3D3A] h-2 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Deadline</span>
                          <span className="font-medium">{new Date(project.deadline).toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Budget</span>
                          <span className="font-medium">${project.budget.toLocaleString()}</span>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Team</span>
                          <div className="flex -space-x-2">
                            {project.team.slice(0, 3).map((member, index) => (
                              <div
                                key={index}
                                className="w-6 h-6 bg-[#1F3D3A] text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white"
                              >
                                {member[0]}
                              </div>
                            ))}
                            {project.team.length > 3 && (
                              <div className="w-6 h-6 bg-gray-400 text-white rounded-full flex items-center justify-center text-xs font-medium border-2 border-white">
                                +{project.team.length - 3}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 border border-[#1F3D3A] text-[#1F3D3A] py-2 px-3 rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer text-sm whitespace-nowrap">
                          View Details
                        </button>
                        <button className="flex-1 bg-[#1F3D3A] text-white py-2 px-3 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer text-sm whitespace-nowrap">
                          Manage
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'kanban' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#1F3D3A]">Kanban Board</h2>
                  <p className="text-gray-600 mt-1">Visualize and manage tasks across all projects</p>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={selectedProject?.id || 'all'}
                    onChange={(e) => {
                      const projectId = e.target.value;
                      if (projectId === 'all') {
                        setSelectedProject(null);
                      } else {
                        const project = projects.find((p) => p.id === parseInt(projectId));
                        setSelectedProject(project as any)
                      }
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                  >
                    <option value="all">All Projects</option>
                    {projects.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => setShowTaskModal(true)}
                    className="bg-[#1F3D3A] text-white px-4 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer flex items-center whitespace-nowrap"
                  >
                    <i className="ri-add-line mr-2"></i>
                    Add Task
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <ProjectKanban projectId={selectedProject?.id || 0} />
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#1F3D3A]">Timeline View</h2>
                  <p className="text-gray-600 mt-1">Visualize project timelines and dependencies</p>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <ProjectGantt projectId={selectedProject?.id || 0} />
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-[#1F3D3A]">Project Reports & Analytics</h2>
                  <p className="text-gray-600 mt-1">Comprehensive reporting and data analysis</p>
                </div>
                <div className="flex items-center space-x-3">
                  <select
                    value={filterPeriod}
                    onChange={(e) => setFilterPeriod(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                  >
                    <option value="all">All Time</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                    <option value="year">This Year</option>
                  </select>
                  <button
                    onClick={() => setShowReportsModal(true)}
                    className="bg-[#1F3D3A] text-white px-4 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer flex items-center whitespace-nowrap"
                  >
                    <i className="ri-download-line mr-2"></i>
                    Export Reports
                  </button>
                </div>
              </div>

              {/* Key Performance Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                      <i className="ri-bar-chart-line text-white text-xl"></i>
                    </div>
                    <span className="text-sm bg-blue-500 text-white px-2 py-1 rounded-full">+12%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900 mb-1">{metrics.totalProjects}</h3>
                  <p className="text-blue-700 text-sm">Total Projects</p>
                  <p className="text-blue-600 text-xs mt-1">vs last period</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                      <i className="ri-money-dollar-circle-line text-white text-xl"></i>
                    </div>
                    <span className="text-sm bg-green-500 text-white px-2 py-1 rounded-full">+8.5%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-green-900 mb-1">${(metrics.totalBudget / 1000).toFixed(0)}K</h3>
                  <p className="text-green-700 text-sm">Total Budget</p>
                  <p className="text-green-600 text-xs mt-1">Budget efficiency: {metrics.budgetUtilization.toFixed(1)}%</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                      <i className="ri-team-line text-white text-xl"></i>
                    </div>
                    <span className="text-sm bg-purple-500 text-white px-2 py-1 rounded-full">92%</span>
                  </div>
                  <h3 className="text-2xl font-bold text-purple-900 mb-1">87.5%</h3>
                  <p className="text-purple-700 text-sm">Team Efficiency</p>
                  <p className="text-purple-600 text-xs mt-1">Above target</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                      <i className="ri-time-line text-white text-xl"></i>
                    </div>
                    <span className="text-sm bg-orange-500 text-white px-2 py-1 rounded-full">-3</span>
                  </div>
                  <h3 className="text-2xl font-bold text-orange-900 mb-1">85%</h3>
                  <p className="text-orange-700 text-sm">On-Time Delivery</p>
                  <p className="text-orange-600 text-xs mt-1">3 days early avg</p>
                </div>
              </div>

              {/* Detailed Reports Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Project Performance Chart */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Project Performance Trends</h3>
                    <div className="flex space-x-2">
                      <button className="text-xs px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Progress</button>
                      <button className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">Budget</button>
                      <button className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full">Timeline</button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {getFilteredProjects().map((project) => (
                      <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-3 h-3 rounded-full ${project.healthScore >= 80 ? 'bg-green-500' : project.healthScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                          ></div>
                          <div>
                            <h4 className="font-medium text-gray-800 text-sm">{project.title}</h4>
                            <p className="text-xs text-gray-500">{project.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-800">{project.progress}%</div>
                          <div className="text-xs text-gray-500">Health: {project.healthScore}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Budget Analysis */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Budget Analysis</h3>

                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Total Allocated</span>
                        <span className="font-semibold text-gray-800">${metrics.totalBudget.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Total Spent</span>
                        <span className="font-semibold text-green-600">${metrics.totalSpent.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-600">Remaining</span>
                        <span className="font-semibold text-blue-600">${(metrics.totalBudget - metrics.totalSpent).toLocaleString()}</span>
                      </div>

                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                          style={{ width: `${(metrics.totalSpent / metrics.totalBudget) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500">
                        {metrics.budgetUtilization.toFixed(1)}% budget utilized
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-gray-800 mb-4">Project Budget Breakdown</h4>
                      <div className="space-y-3">
                        {getFilteredProjects().slice(0, 4).map((project) => {
                          const utilization = (project.spent / project.budget) * 100;
                          return (
                            <div key={project.id} className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium text-gray-800">{project.title}</div>
                                <div className="text-xs text-gray-500">${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${utilization > 90 ? 'bg-red-500' : utilization > 75 ? 'bg-yellow-500' : 'bg-green-500'
                                      }`}
                                    style={{ width: `${Math.min(utilization, 100)}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs font-medium text-gray-600">{utilization.toFixed(0)}%</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Team Productivity Report */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Team Productivity Report</h3>

                  <div className="space-y-4">
                    {analyticsData.teamPerformance.map((member, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-[#1F3D3A] rounded-full flex items-center justify-center text-white font-medium">
                              {member.name.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">{member.name}</h4>
                              <p className="text-sm text-gray-600">Efficiency: {member.efficiency}%</p>
                            </div>
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-xs ${member.efficiency >= 90 ? 'bg-green-100 text-green-700' : member.efficiency >= 80 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                              }`}
                          >
                            {member.efficiency >= 90 ? 'Excellent' : member.efficiency >= 80 ? 'Good' : 'Needs Attention'}
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-[#1F3D3A]">{member.tasksCompleted}</div>
                            <div className="text-xs text-gray-600">Tasks Done</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-blue-600">{member.hoursLogged}</div>
                            <div className="text-xs text-gray-600">Hours Logged</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-600">{member.efficiency}%</div>
                            <div className="text-xs text-gray-600">Efficiency</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Assessment Report */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6">Risk Assessment Report</h3>

                  <div className="space-y-4">
                    {/* Risk Summary */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-xl font-bold text-red-600">2</div>
                        <div className="text-xs text-red-700">High Risk</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-50 rounded-lg">
                        <div className="text-xl font-bold text-yellow-600">5</div>
                        <div className="text-xs text-yellow-700">Medium Risk</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-xl font-bold text-green-600">1</div>
                        <div className="text-xs text-green-700">Low Risk</div>
                      </div>
                    </div>

                    {/* Risk Details */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
                        <div className="flex items-center space-x-3">
                          <i className="ri-error-warning-line text-red-600"></i>
                          <div>
                            <div className="font-medium text-red-800">Resource Bottleneck</div>
                            <div className="text-sm text-red-600">Alice Johnson overallocated</div>
                          </div>
                        </div>
                        <span className="text-xs bg-red-200 text-red-800 px-2 py-1 rounded-full">High</span>
                      </div>

                      <div className="flex items-center justify-between p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                        <div className="flex items-center space-x-3">
                          <i className="ri-alert-line text-yellow-600"></i>
                          <div>
                            <div className="font-medium text-yellow-800">Budget Variance</div>
                            <div className="text-sm text-yellow-600">Digital Transformation 5% over</div>
                          </div>
                        </div>
                        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">Medium</span>
                      </div>

                      <div className="flex items-center justify-between p-3 border border-green-200 rounded-lg bg-green-50">
                        <div className="flex items-center space-x-3">
                          <i className="ri-checkbox-circle-line text-green-600"></i>
                          <div>
                            <div className="font-medium text-green-800">Timeline Adherence</div>
                            <div className="text-sm text-green-600">All projects on track</div>
                          </div>
                        </div>
                        <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded-full">Low</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Export and Actions */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6">Report Actions</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="text-center">
                      <i className="ri-file-pdf-line text-2xl text-red-600 mb-2"></i>
                      <div className="font-medium text-gray-800">PDF Report</div>
                      <div className="text-xs text-gray-600">Comprehensive summary</div>
                    </div>
                  </button>

                  <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="text-center">
                      <i className="ri-file-excel-line text-2xl text-green-600 mb-2"></i>
                      <div className="font-medium text-gray-800">Excel Export</div>
                      <div className="text-xs text-gray-600">Raw data analysis</div>
                    </div>
                  </button>

                  <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="text-center">
                      <i className="ri-mail-line text-2xl text-blue-600 mb-2"></i>
                      <div className="font-medium text-gray-800">Email Report</div>
                      <div className="text-xs text-gray-600">Schedule delivery</div>
                    </div>
                  </button>

                  <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="text-center">
                      <i className="ri-calendar-line text-2xl text-purple-600 mb-2"></i>
                      <div className="font-medium text-gray-800">Scheduled Reports</div>
                      <div className="text-xs text-gray-600">Automated delivery</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#1F3D3A]">{selectedProject.title}</h2>
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm border ${selectedProject.status === 'planning' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' : selectedProject.status === 'in-progress' ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-green-100 text-green-700 border-green-200'
                        }`}
                    >
                      {selectedProject.status.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${selectedProject.priority === 'high' ? 'bg-red-100 text-red-700' : selectedProject.priority === 'medium' ? 'bg-orange-100 text-orange-700' : 'bg-green-100 text-green-700'
                        }`}
                    >
                      {selectedProject.priority} priority
                    </span>
                    <div className="flex items-center space-x-1 text-yellow-500">
                      <i className="ri-star-fill"></i>
                      <span className="font-medium">4.8</span>
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

              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="bg-gray-50 p-6 rounded-xl mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Overview</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      This project involves developing a comprehensive solution that addresses key business requirements and delivers
                      measurable value to stakeholders.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-[#1F3D3A]">{selectedProject.progress}%</div>
                        <div className="text-xs text-gray-600">Progress</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-green-600">{selectedProject.healthScore}</div>
                        <div className="text-xs text-gray-600">Health Score</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{(selectedProject as any).velocity}
</div>
                        <div className="text-xs text-gray-600">Velocity</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">{((selectedProject as any).burndownRate * 100).toFixed(0)}%</div>
                        <div className="text-xs text-gray-600">Burndown</div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-3">Project Tasks</h4>
                      <div className="space-y-3">
                        {(selectedProject as any)?.tasks?.map((task: { id: number; title: string; assignee?: string; progress?: number; status?: string }) => (


                          <div key={task.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <div>
                              <div className="font-medium text-gray-800 text-sm">{task.title}</div>
                              <div className="text-xs text-gray-500">{task.assignee}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-medium">{task.progress}%</div>
                              <div
                                className={`text-xs px-2 py-1 rounded-full ${task.status === 'completed' ? 'bg-green-100 text-green-700' : task.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                  }`}
                              >
                                {task.status}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-gray-800 mb-3">Milestones</h4>
                      <div className="space-y-3">
                        {((selectedProject as { milestones?: { id: number; title: string; date: string; status: string }[] })?.milestones ?? []).map((milestone) => (
                          <div key={milestone.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <div>
                              <div className="font-medium text-gray-800 text-sm">{milestone.title}</div>
                              <div className="text-xs text-gray-500">{milestone.date}</div>
                            </div>
                            <div
                              className={`text-xs px-2 py-1 rounded-full ${milestone.status === 'completed' ? 'bg-green-100 text-green-700' : milestone.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                                }`}
                            >
                              {milestone.status}
                            </div>
                          </div>
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
                        <span className="text-sm text-gray-500">Budget & Spending</span>
                        <p className="font-semibold text-gray-900">${selectedProject.budget.toLocaleString()}</p>
                        <p className="text-sm text-green-600">
                          ${(selectedProject.budget - selectedProject.spent).toLocaleString()} remaining
                        </p>
                      </div>

                      <div>
                        <span className="text-sm text-gray-500">Timeline</span>
                        <p className="font-semibold text-gray-900">
                          {selectedProject.startDate} - {selectedProject.deadline}
                        </p>
                      </div>

                      <div>
                        <span className="text-sm text-gray-500">Risk Level</span>
                        <p
                          className={`font-semibold ${selectedProject.riskLevel === 'high' ? 'text-red-600' : selectedProject.riskLevel === 'medium' ? 'text-orange-600' : 'text-green-600'
                            }`}
                        >
                          {selectedProject.riskLevel.charAt(0).toUpperCase() + selectedProject.riskLevel.slice(1)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Team Members ({selectedProject.team.length})</h4>
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

                  {selectedProject.risks && selectedProject.risks.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <h4 className="font-semibold text-red-800 mb-4">Risk Factors</h4>
                      <div className="space-y-2">
                        {selectedProject.risks.map((risk, index) => (
                          <div key={index} className="flex items-start space-x-2 text-red-700 text-sm">
                            <i className="ri-alert-line mt-0.5"></i>
                            <div>
                              <div className="font-medium">{risk.description}</div>
                              <div className="text-xs text-red-600">
                                Impact: {(risk as any).impact} | Probability: {(risk as any).probability}

                              </div>
                              <div className="text-xs text-red-600">Mitigation: {(risk as any).mitigation}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <button className="w-full bg-[#1F3D3A] text-white py-3 rounded-lg hover:bg-[#2a5248] transition-colors font-medium cursor-pointer">
                      <i className="ri-edit-line mr-2"></i>
                      Edit Project
                    </button>
                    <button className="w-full border border-[#1F3D3A] text-[#1F3D3A] py-3 rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors font-medium cursor-pointer">
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

      {showProfileModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1F3D3A]">User Profile</h2>
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Profile Info */}
                <div className="md:col-span-1">
                  <div className="bg-gradient-to-br from-[#1F3D3A] to-[#2a5248] rounded-2xl p-6 text-white text-center mb-6">
                    <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#1F3D3A] font-bold text-2xl mx-auto mb-4">
                      {userProfile.avatar}
                    </div>
                    <h3 className="text-xl font-bold mb-1">{userProfile.name}</h3>
                    <p className="text-white/80 mb-2">{userProfile.role}</p>
                    <p className="text-white/60 text-sm mb-4">{userProfile.department}</p>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold">{userProfile.projectsManaged}</div>
                        <div className="text-white/80">Projects</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{userProfile.teamSize}</div>
                        <div className="text-white/80">Team</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold">{userProfile.successRate}%</div>
                        <div className="text-white/80">Success</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-semibold text-gray-800 mb-4">Contact Information</h4>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <i className="ri-mail-line text-gray-400"></i>
                        <span className="text-gray-700">{userProfile.email}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="ri-phone-line text-gray-400"></i>
                        <span className="text-gray-700">{userProfile.phone}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="ri-map-pin-line text-gray-400"></i>
                        <span className="text-gray-700">{userProfile.location}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <i className="ri-time-line text-gray-400"></i>
                        <span className="text-gray-700">{userProfile.timezone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Information */}
                <div className="md:col-span-2">
                  <div className="space-y-6">
                    {/* Professional Info */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-800 mb-4">Professional Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
                          <p className="text-gray-900">{userProfile.experience}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                          <p className="text-gray-900">{new Date(userProfile.joinDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Working Hours</label>
                          <p className="text-gray-900">{(userProfile as any).workingHours}</p>

                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                          <p className="text-gray-900">{userProfile.preferredLanguage}</p>
                        </div>
                      </div>
                    </div>

                    {/* Skills & Certifications */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h4 className="font-semibold text-gray-800 mb-4">Skills & Expertise</h4>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Core Skills</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {userProfile.skills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-[#1F3D3A] text-white rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {userProfile.certifications.map((cert, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {cert}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => setShowEditProfile(true)}
                        className="flex-1 bg-[#1F3D3A] text-white py-3 rounded-lg hover:bg-[#2a5248] transition-colors font-medium cursor-pointer"
                      >
                        <i className="ri-edit-line mr-2"></i>
                        Edit Profile
                      </button>
                      <button
                        className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                      >
                        <i className="ri-logout-box-line mr-2"></i>
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAccountSettings && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1F3D3A]">Account Settings</h2>
                <button
                  onClick={() => setShowAccountSettings(false)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {/* Settings Navigation */}
                <div className="md:col-span-1">
                  <nav className="space-y-2">
                    {/* Add account settings navigation items */}
                  </nav>
                </div>

                {/* Settings Content */}
                <div className="md:col-span-3">
                  <div className="space-y-8">
                    {/* Profile Information */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-6">Profile Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            value={userProfile.name}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <input
                            type="email"
                            value={userProfile.email}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            value={userProfile.phone}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                          <input
                            type="text"
                            value={userProfile.role}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                          <input
                            type="text"
                            value={userProfile.department}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Account Security */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-6">Account Security</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-3">Password</h4>
                          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                            <div>
                              <p className="font-medium text-gray-800">Password</p>
                              <p className="text-sm text-gray-600">Last changed 3 months ago</p>
                            </div>
                            <button className="bg-[#1F3D3A] text-white px-4 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                              Change Password
                            </button>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800 mb-3">Two-Factor Authentication</h4>
                          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                            <div>
                              <p className="font-medium text-gray-800">2FA Status</p>
                              <p className="text-sm text-green-600">Enabled via SMS</p>
                            </div>
                            <button className="border border-[#1F3D3A] text-[#1F3D3A] px-4 py-2 rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer">
                              Manage 2FA
                            </button>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800 mb-3">Login Sessions</h4>
                          <div className="space-y-2">
                            {/* Add login sessions data */}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Notification Preferences */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-6">Notification Preferences</h3>
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-medium text-gray-800 mb-4">Email Notifications</h4>
                          <div className="space-y-3">
                            {/* Add email notifications data */}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-800 mb-4">Push Notifications</h4>
                          <div className="space-y-3">
                            {/* Add push notifications data */}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Privacy Settings */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-6">Privacy Settings</h3>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                          <div>
                            <p className="font-medium text-gray-800">Profile Visibility</p>
                            <p className="text-sm text-gray-600">Control who can see your profile information</p>
                          </div>
                          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8">
                            <option>Team Members Only</option>
                            <option>Organization</option>
                            <option>Public</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                          <div>
                            <p className="font-medium text-gray-800">Activity Status</p>
                            <p className="text-sm text-gray-600">Show when you're online and active</p>
                          </div>
                          <div className="w-12 h-6 bg-[#1F3D3A] rounded-full relative">
                            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
                          <div>
                            <p className="font-medium text-gray-800">Data Analytics</p>
                            <p className="text-sm text-gray-600">Allow usage data collection for service improvement</p>
                          </div>
                          <div className="w-12 h-6 bg-[#1F3D3A] rounded-full relative">
                            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Billing Information */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-6">Billing & Subscription</h3>
                      <div className="space-y-6">
                        <div className="p-4 bg-white rounded-lg border">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="font-medium text-gray-800">Current Plan</h4>
                              <p className="text-sm text-gray-600">Professional Plan</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-[#1F3D3A]">$49/month</p>
                              <p className="text-sm text-gray-600">Billed monthly</p>
                            </div>
                          </div>
                          <div className="flex space-x-3">
                            <button className="bg-[#1F3D3A] text-white px-4 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                              Upgrade Plan
                            </button>
                            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                              View Usage
                            </button>
                          </div>
                        </div>

                        <div className="p-4 bg-white rounded-lg border">
                          <h4 className="font-medium text-gray-800 mb-3">Payment Method</h4>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
                                <i className="ri-bank-card-line text-white text-sm"></i>
                              </div>
                              <div>
                                <p className="font-medium text-gray-800">•••• •••• •••• 4242</p>
                                <p className="text-sm text-gray-600">Expires 12/2026</p>
                              </div>
                            </div>
                            <button className="text-[#1F3D3A] hover:text-[#2a5248] cursor-pointer">
                              Update
                            </button>
                          </div>
                        </div>

                        <div className="p-4 bg-white rounded-lg border">
                          <h4 className="font-medium text-gray-800 mb-3">Billing History</h4>
                          <div className="space-y-2">
                            {/* Add billing history data */}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Integrations */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-6">Connected Integrations</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Add integrations data */}
                      </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-red-800 mb-6">Danger Zone</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200">
                          <div>
                            <p className="font-medium text-gray-800">Export Account Data</p>
                            <p className="text-sm text-gray-600">Download all your account data and project information</p>
                          </div>
                          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            Export Data
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200">
                          <div>
                            <p className="font-medium text-red-800">Deactivate Account</p>
                            <p className="text-sm text-gray-600">Temporarily disable your account (can be reactivated)</p>
                          </div>
                          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors cursor-pointer">
                            Deactivate
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-200">
                          <div>
                            <p className="font-medium text-red-800">Delete Account</p>
                            <p className="text-sm text-gray-600">Permanently delete your account and all associated data</p>
                          </div>
                          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors cursor-pointer">
                            Delete Account
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Save Changes */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        Changes are saved automatically
                      </div>
                      <div className="flex space-x-3">
                        <button
                          onClick={() => setShowAccountSettings(false)}
                          className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button className="bg-[#1F3D3A] text-white px-6 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditProfile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1F3D3A]">Edit Profile</h2>
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Profile Photo Section */}
                <div className="md:col-span-1">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 bg-[#1F3D3A] rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                      {userProfile.avatar}
                    </div>
                    <button className="bg-[#1F3D3A] text-white px-4 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer mb-4">
                      <i className="ri-camera-line mr-2"></i>
                      Change Photo
                    </button>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">Profile Completion</h4>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div className="bg-[#1F3D3A] h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                      <p className="text-sm text-gray-600">85% Complete</p>
                    </div>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="md:col-span-2">
                  <form className="space-y-6">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            value={userProfile.name}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <input
                            type="email"
                            value={userProfile.email}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            value={userProfile.phone}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                          <input
                            type="text"
                            value={userProfile.location}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Professional Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                          <input
                            type="text"
                            value={userProfile.role}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                          <input
                            type="text"
                            value={userProfile.department}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8">
                            <option>{userProfile.experience}</option>
                            <option>1-3 years</option>
                            <option>4-7 years</option>
                            <option>8-15 years</option>
                            <option>15+ years</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
                          <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8">
                            <option>Mon-Fri 9AM-6PM EAT</option>
                            <option>Full-time (40+ hours)</option>
                            <option>Part-time (20-40 hours)</option>
                            <option>Flexible hours</option>
                            <option>Contract basis</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Skills & Expertise */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Skills & Expertise</h3>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Core Skills</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {userProfile.skills.map((skill, index) => (
                            <span key={index} className="flex items-center px-3 py-1 bg-[#1F3D3A] text-white rounded-full text-sm">
                              {skill}
                              <button type="button" className="ml-2 text-white hover:text-gray-300 cursor-pointer">
                                <i className="ri-close-line text-xs"></i>
                              </button>
                            </span>
                          ))}
                        </div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Certifications</label>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {userProfile.certifications.map((cert, index) => (
                            <span key={index} className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                              {cert}
                              <button type="button" className="ml-2 text-blue-700 hover:text-blue-500 cursor-pointer">
                                <i className="ri-close-line text-xs"></i>
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bio Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Bio</h3>
                      <textarea
                        rows={4}
                        placeholder="Write a brief professional bio that highlights your experience and expertise..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        maxLength={500}
                      ></textarea>
                      <div className="text-sm text-gray-500 mt-1">0/500 characters</div>
                    </div>

                    {/* Social Links */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Professional Links</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <i className="ri-linkedin-line text-blue-600 text-xl"></i>
                          <input
                            type="url"
                            placeholder="LinkedIn profile URL"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div className="flex items-center space-x-3">
                          <i className="ri-github-line text-gray-800 text-xl"></i>
                          <input
                            type="url"
                            placeholder="GitHub profile URL"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div className="flex items-center space-x-3">
                          <i className="ri-twitter-line text-blue-400 text-xl"></i>
                          <input
                            type="url"
                            placeholder="Twitter profile URL"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                        <div className="flex items-center space-x-3">
                          <i className="ri-global-line text-green-600 text-xl"></i>
                          <input
                            type="url"
                            placeholder="Portfolio/Website URL"
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Privacy Settings */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy & Visibility</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-800">Profile Visibility</h4>
                            <p className="text-sm text-gray-600">Control who can see your full profile</p>
                          </div>
                          <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8">
                            <option>Team Members Only</option>
                            <option>Organization</option>
                            <option>Public</option>
                          </select>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-800">Show Online Status</h4>
                            <p className="text-sm text-gray-600">Let others see when you're online</p>
                          </div>
                          <div className="w-12 h-6 bg-[#1F3D3A] rounded-full relative cursor-pointer">
                            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <h4 className="font-medium text-gray-800">Contact Information</h4>
                            <p className="text-sm text-gray-600">Allow team members to see your contact details</p>
                          </div>
                          <div className="w-12 h-6 bg-[#1F3D3A] rounded-full relative cursor-pointer">
                            <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <div className="text-sm text-gray-600">
                        <i className="ri-save-line mr-1"></i>
                        Changes are saved automatically
                      </div>
                      <div className="flex space-x-3">
                        <button
                          type="button"
                          onClick={() => setShowEditProfile(false)}
                          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 bg-[#1F3D3A] text-white rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer"
                        >
                          <i className="ri-save-line mr-2"></i>
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAIInsights && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <i className="ri-brain-line text-white text-xl"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#1F3D3A]">AI Insights Dashboard</h2>
                    <p className="text-gray-600">Intelligent analytics and recommendations for your projects</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAIInsights(false)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              {/* AI Insights Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <i className="ri-lightbulb-line text-white"></i>
                    </div>
                    <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">AI</span>
                  </div>
                  <h3 className="text-lg font-bold text-blue-800 mb-1">Smart Insights</h3>
                  <p className="text-2xl font-bold text-blue-900">12</p>
                  <p className="text-sm text-blue-600">Active recommendations</p>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <i className="ri-trending-up-line text-white"></i>
                    </div>
                    <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full">+15%</span>
                  </div>
                  <h3 className="text-lg font-bold text-green-800 mb-1">Efficiency Score</h3>
                  <p className="text-2xl font-bold text-green-900">87.5%</p>
                  <p className="text-sm text-green-600">Above target by 7.5%</p>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <i className="ri-alert-line text-white"></i>
                    </div>
                    <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded-full">3</span>
                  </div>
                  <h3 className="text-lg font-bold text-orange-800 mb-1">Risk Alerts</h3>
                  <p className="text-2xl font-bold text-orange-900">Medium</p>
                  <p className="text-sm text-orange-600">Requires attention</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <i className="ri-time-line text-white"></i>
                    </div>
                    <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">AI</span>
                  </div>
                  <h3 className="text-lg font-bold text-purple-800 mb-1">Time Saved</h3>
                  <p className="text-2xl font-bold text-purple-900">24.5h</p>
                  <p className="text-sm text-purple-600">This month via AI</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Insights Panel */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Priority Recommendations */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-800">Priority Recommendations</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Powered by AI</span>
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[{ id: 1 }].map((insight) => (
                        <div key={insight.id} className="border-l-4 border-blue-500 bg-blue-50 p-6 rounded-r-xl hover:shadow-lg transition-shadow">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                <i className="ri-star-line text-white"></i>
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-800">High Priority</h4>
                                <div className="flex items-center space-x-3 mt-1">
                                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                    High
                                  </span>
                                  <span className="text-xs text-gray-500">Confidence: 90%</span>
                                  <span className="text-xs text-gray-500">Action needed in: 3 days</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                <i className="ri-bookmark-line"></i>
                              </button>
                              <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                                <i className="ri-more-line"></i>
                              </button>
                            </div>
                          </div>

                          <p className="text-gray-700 mb-4">This is a priority recommendation.</p>

                          <div className="mb-4">
                            <h5 className="font-semibold text-gray-800 mb-2">Recommended Actions:</h5>
                            <ul className="space-y-1">
                              <li className="flex items-center text-sm text-gray-600">
                                <i className="ri-arrow-right-s-line mr-1 text-gray-400"></i>
                                Implement Now
                              </li>
                            </ul>
                          </div>

                          <div className="flex space-x-3">
                            <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium cursor-pointer">
                              Implement Now
                            </button>
                            <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium cursor-pointer">
                              Schedule Later
                            </button>
                            <button className="px-4 py-2 text-gray-500 hover:text-gray-700 cursor-pointer">
                              <i className="ri-close-line"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Predictive Analytics */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Predictive Analytics</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Project Completion Forecast */}
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                        <div className="flex items-center space-x-3 mb-4">
                          <i className="ri-calendar-check-line text-blue-600 text-xl"></i>
                          <h4 className="font-bold text-blue-800">Completion Forecast</h4>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">Digital Transformation</span>
                            <span className="text-sm font-medium text-blue-600">June 20, 2024</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">Product Launch Strategy</span>
                            <span className="text-sm font-medium text-orange-600">September 5, 2024</span>
                          </div>
                          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
                            <p className="text-xs text-blue-700">
                              <i className="ri-information-line mr-1"></i>
                              85% accuracy based on current velocity and historical data
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Budget Projection */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                        <div className="flex items-center space-x-3 mb-4">
                          <i className="ri-line-chart-line text-green-600 text-xl"></i>
                          <h4 className="font-bold text-green-800">Budget Projection</h4>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">Q2 2024 Spending</span>
                            <span className="text-sm font-medium text-green-600">$375,000</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">Projected Savings</span>
                            <span className="text-sm font-medium text-green-600">$25,000</span>
                          </div>
                          <div className="mt-4 p-3 bg-green-100 rounded-lg">
                            <p className="text-xs text-green-700">
                              <i className="ri-thumb-up-line mr-1"></i>
                              On track to finish under budget by 6.25%
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Resource Demand */}
                      <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border border-purple-200">
                        <div className="flex items-center space-x-3 mb-4">
                          <i className="ri-team-line text-purple-600 text-xl"></i>
                          <h4 className="font-bold text-purple-800">Resource Demand</h4>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">Peak Demand</span>
                            <span className="text-sm font-medium text-purple-600">May 15-30</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">Additional Resources</span>
                            <span className="text-sm font-medium text-purple-600">2 Developers</span>
                          </div>
                          <div className="mt-4 p-3 bg-purple-100 rounded-lg">
                            <p className="text-xs text-purple-700">
                              <i className="ri-alert-line mr-1"></i>
                              Consider hiring contractors for peak period
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Risk Assessment */}
                      <div className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-xl border border-red-200">
                        <div className="flex items-center space-x-3 mb-4">
                          <i className="ri-shield-check-line text-red-600 text-xl"></i>
                          <h4 className="font-bold text-red-800">Risk Assessment</h4>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">Overall Risk Level</span>
                            <span className="text-sm font-medium text-orange-600">Medium</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-700">Critical Issues</span>
                            <span className="text-sm font-medium text-red-600">1</span>
                          </div>
                          <div className="mt-4 p-3 bg-red-100 rounded-lg">
                            <p className="text-xs text-red-700">
                              <i className="ri-error-warning-line mr-1"></i>
                              Address resource bottleneck within 48 hours
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Team Performance Analytics */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Team Performance Analytics</h3>

                    <div className="space-y-6">
                      {analyticsData.teamPerformance.map((member, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-[#1F3D3A] rounded-full flex items-center justify-center text-white font-medium">
                              {member.name.split(' ').map((n) => n[0]).join('')}
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">{member.name}</h4>
                              <p className="text-sm text-gray-600">Efficiency: {member.efficiency}%</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6">
                            <div className="text-center">
                              <div className="text-lg font-bold text-[#1F3D3A]">{member.tasksCompleted}</div>
                              <div className="text-xs text-gray-600">Tasks Done</div>
                            </div>
                            <div className="text-center">
                              <div className="text-lg font-bold text-blue-600">{member.hoursLogged}</div>
                              <div className="text-xs text-gray-600">Hours Logged</div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div
                                className={`w-3 h-3 rounded-full ${member.efficiency >= 90 ? 'bg-green-500' : member.efficiency >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                              ></div>
                              <span className="text-sm font-medium">
                                {member.efficiency >= 90 ? 'Excellent' : member.efficiency >= 80 ? 'Good' : 'Needs Attention'}
                              </span>
                            </div>
                            <button className="text-gray-400 hover:text-gray-600 cursor-pointer">
                              <i className="ri-more-line"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                      <div className="flex items-center space-x-3">
                        <i className="ri-lightbulb-line text-blue-600"></i>
                        <div>
                          <h4 className="font-semibold text-blue-800">AI Recommendation</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Consider implementing peer mentoring between Alice and Charlie to improve overall team efficiency.
                            Estimated impact: +8% team performance within 2 weeks.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Side Panel */}
                <div className="space-y-6">
                  {/* AI Assistant Chat */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200 rounded-xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <i className="ri-robot-line text-white"></i>
                      </div>
                      <h3 className="text-lg font-bold text-indigo-800">AI Assistant</h3>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="bg-white p-3 rounded-lg shadow-sm">
                        <p className="text-sm text-gray-700">
                          Based on current trends, I recommend reallocating Alice's Design System task to Bob to prevent delays.
                          Shall I create the task reassignment?
                        </p>
                        <div className="flex space-x-2 mt-2">
                          <button className="text-xs bg-indigo-500 text-white px-2 py-1 rounded cursor-pointer">Yes, do it</button>
                          <button className="text-xs border border-gray-300 text-gray-600 px-2 py-1 rounded cursor-pointer">Not now</button>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Ask me anything about your projects..."
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      <button className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer">
                        <i className="ri-send-plane-line"></i>
                      </button>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                      <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <i className="ri-calendar-schedule-line text-blue-600"></i>
                          <span className="text-sm font-medium">Schedule Team Meeting</span>
                        </div>
                        <i className="ri-arrow-right-s-line text-gray-400"></i>
                      </button>

                      <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <i className="ri-file-text-line text-green-600"></i>
                          <span className="text-sm font-medium">Generate Status Report</span>
                        </div>
                        <i className="ri-arrow-right-s-line text-gray-400"></i>
                      </button>

                      <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <i className="ri-user-add-line text-purple-600"></i>
                          <span className="text-sm font-medium">Find Resources</span>
                        </div>
                        <i className="ri-arrow-right-s-line text-gray-400"></i>
                      </button>

                      <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center space-x-3">
                          <i className="ri-alert-line text-orange-600"></i>
                          <span className="text-sm font-medium">Review Risks</span>
                        </div>
                        <i className="ri-arrow-right-s-line text-gray-400"></i>
                      </button>
                    </div>
                  </div>

                  {/* Automation Suggestions */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Automation Opportunities</h3>
                    <div className="space-y-4">
                      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <i className="ri-magic-line text-yellow-600"></i>
                          <h4 className="font-semibold text-yellow-800 text-sm">Status Updates</h4>
                        </div>
                        <p className="text-xs text-yellow-700 mb-2">
                          Automate weekly status emails to stakeholders
                        </p>
                        <button className="text-xs bg-yellow-500 text-white px-2 py-1 rounded cursor-pointer">
                          Enable Automation
                        </button>
                      </div>

                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <i className="ri-timer-line text-green-600"></i>
                          <h4 className="font-semibold text-green-800 text-sm">Time Tracking</h4>
                        </div>
                        <p className="text-xs text-green-700 mb-2">
                          Auto-track time based on calendar events
                        </p>
                        <button className="text-xs bg-green-500 text-white px-2 py-1 rounded cursor-pointer">
                          Set Up
                        </button>
                      </div>

                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center space-x-2 mb-2">
                          <i className="ri-notification-line text-blue-600"></i>
                          <h4 className="font-semibold text-blue-800 text-sm">Smart Alerts</h4>
                        </div>
                        <p className="text-xs text-blue-700 mb-2">
                          Get notified before deadlines are at risk
                        </p>
                        <button className="text-xs bg-blue-500 text-white px-2 py-1 rounded cursor-pointer">
                          Configure
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">AI Impact Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Time Saved This Month</span>
                        <span className="font-bold text-green-600">24.5 hours</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Cost Savings</span>
                        <span className="font-bold text-green-600">$3,200</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Risks Prevented</span>
                        <span className="font-bold text-blue-600">7</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Efficiency Improvement</span>
                        <span className="font-bold text-purple-600">+12%</span>
                      </div>

                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">AI Confidence Level</span>
                          <span className="text-sm font-bold text-[#1F3D3A]">91%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-[#1F3D3A] h-2 rounded-full" style={{ width: '91%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 cursor-pointer">
                    <i className="ri-settings-line"></i>
                    <span className="text-sm">Configure AI Settings</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 cursor-pointer">
                    <i className="ri-feedback-line"></i>
                    <span className="text-sm">Provide Feedback</span>
                  </button>
                </div>
                <div className="flex space-x-3">
                  <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    Export Insights
                  </button>
                  <button className="bg-[#1F3D3A] text-white px-6 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                    Schedule Follow-up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
