
'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

 const handleTimeRangeChange = (value: any) => {

    if (!mounted) return;
    setTimeRange(value);
  };

 const handleMetricChange = (metric: any) => {

    if (!mounted) return;
    setSelectedMetric(metric);
  };

  const revenueData = [
    { month: 'Jan', revenue: 45000, projects: 12, clients: 8 },
    { month: 'Feb', revenue: 52000, projects: 15, clients: 10 },
    { month: 'Mar', revenue: 48000, projects: 13, clients: 9 },
    { month: 'Apr', revenue: 61000, projects: 18, clients: 12 },
    { month: 'May', revenue: 67000, projects: 20, clients: 14 },
    { month: 'Jun', revenue: 72000, projects: 22, clients: 16 },
    { month: 'Jul', revenue: 58000, projects: 17, clients: 11 },
    { month: 'Aug', revenue: 74000, projects: 24, clients: 18 },
    { month: 'Sep', revenue: 69000, projects: 21, clients: 15 },
    { month: 'Oct', revenue: 81000, projects: 26, clients: 19 },
    { month: 'Nov', revenue: 88000, projects: 28, clients: 21 },
    { month: 'Dec', revenue: 95000, projects: 32, clients: 24 }
  ];

  const projectsByCategory = [
    { name: 'E-commerce', value: 35, color: '#1F3D3A' },
    { name: 'Healthcare', value: 22, color: '#2563eb' },
    { name: 'Education', value: 18, color: '#059669' },
    { name: 'Fintech', value: 15, color: '#dc2626' },
    { name: 'Tourism', value: 10, color: '#7c3aed' }
  ];

  const teamPerformance = [
    { name: 'Alemayehu T.', projects: 24, revenue: 145000, rating: 4.9 },
    { name: 'Sara M.', projects: 21, revenue: 128000, rating: 4.8 },
    { name: 'David K.', projects: 19, revenue: 118000, rating: 4.7 },
    { name: 'Meron H.', projects: 18, revenue: 112000, rating: 4.8 },
    { name: 'Tadesse B.', projects: 16, revenue: 98000, rating: 4.6 }
  ];

  const clientSatisfaction = [
    { month: 'Jan', satisfaction: 85, retention: 78 },
    { month: 'Feb', satisfaction: 87, retention: 82 },
    { month: 'Mar', satisfaction: 84, retention: 79 },
    { month: 'Apr', satisfaction: 91, retention: 85 },
    { month: 'May', satisfaction: 93, retention: 88 },
    { month: 'Jun', satisfaction: 94, retention: 90 },
    { month: 'Jul', satisfaction: 89, retention: 84 },
    { month: 'Aug', satisfaction: 96, retention: 92 },
    { month: 'Sep', satisfaction: 92, retention: 87 },
    { month: 'Oct', satisfaction: 97, retention: 94 },
    { month: 'Nov', satisfaction: 95, retention: 91 },
    { month: 'Dec', satisfaction: 98, retention: 96 }
  ];

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: '$847,000',
      change: '+23.5%',
      trend: 'up',
      icon: 'ri-money-dollar-circle-line',
      color: 'text-green-600'
    },
    {
      title: 'Active Projects',
      value: '42',
      change: '+8.2%',
      trend: 'up',
      icon: 'ri-folder-line',
      color: 'text-blue-600'
    },
    {
      title: 'Client Satisfaction',
      value: '94.2%',
      change: '+2.1%',
      trend: 'up',
      icon: 'ri-heart-line',
      color: 'text-red-600'
    },
    {
      title: 'Team Utilization',
      value: '87.5%',
      change: '-1.3%',
      trend: 'down',
      icon: 'ri-team-line',
      color: 'text-purple-600'
    }
  ];

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3D3A] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading analytics...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-[#1F3D3A] mb-2">
                Analytics Dashboard
              </h1>
              <p className="text-xl text-gray-600">
                Comprehensive insights into business performance and growth metrics
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <select 
                value={timeRange} 
                onChange={(e) => handleTimeRangeChange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1F3D3A] focus:border-transparent pr-8"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <button className="bg-[#1F3D3A] text-white px-6 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                <i className="ri-download-line mr-2"></i>
                Export Report
              </button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mb-8">
            {kpiCards.map((kpi, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 flex items-center justify-center rounded-lg bg-gray-50 ${kpi.color}`}>
                    <i className={`${kpi.icon} text-xl`}></i>
                  </div>
                  <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                    kpi.trend === 'up' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {kpi.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</h3>
                <p className="text-gray-600">{kpi.title}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Revenue Trends</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleMetricChange('revenue')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      selectedMetric === 'revenue' 
                        ? 'bg-[#1F3D3A] text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Revenue
                  </button>
                  <button
                    onClick={() => handleMetricChange('projects')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors cursor-pointer ${
                      selectedMetric === 'projects' 
                        ? 'bg-[#1F3D3A] text-white' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Projects
                  </button>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey={selectedMetric} 
                      stroke="#1F3D3A" 
                      fill="#1F3D3A" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Projects by Category</h3>
              <div className="h-80">
              
                <ResponsiveContainer width="100%" height="100%">

                  <PieChart>
                    <Pie
                      data={projectsByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {projectsByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Client Satisfaction & Retention</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={clientSatisfaction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="satisfaction" 
                      stroke="#1F3D3A" 
                      strokeWidth={3}
                      name="Satisfaction (%)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="retention" 
                      stroke="#2563eb" 
                      strokeWidth={3}
                      name="Retention (%)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Top Performers</h3>
              <div className="space-y-4">
                {teamPerformance.map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-[#1F3D3A] rounded-full flex items-center justify-center text-white font-medium">
                        {member.name.split(' ')[0][0]}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{member.name}</p>
                        <p className="text-sm text-gray-600">{member.projects} projects</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">${(member.revenue / 1000).toFixed(0)}k</p>
                      <div className="flex items-center">
                        <i className="ri-star-fill text-yellow-400 text-sm mr-1"></i>
                        <span className="text-sm text-gray-600">{member.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
              <button className="text-[#1F3D3A] hover:text-[#2a5248] font-medium cursor-pointer">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[
                { type: 'project', message: 'New project "Smart City Dashboard" was created', time: '2 hours ago', icon: 'ri-folder-add-line', color: 'text-blue-600' },
                { type: 'milestone', message: 'Healthcare Management System reached 80% completion', time: '5 hours ago', icon: 'ri-flag-line', color: 'text-green-600' },
                { type: 'client', message: 'Ethiopian Tourism Organization signed new contract', time: '1 day ago', icon: 'ri-user-add-line', color: 'text-purple-600' },
                { type: 'team', message: 'Bethel A. completed UX design for Mobile Banking App', time: '2 days ago', icon: 'ri-team-line', color: 'text-orange-600' },
                { type: 'revenue', message: 'Monthly revenue target exceeded by 15%', time: '3 days ago', icon: 'ri-money-dollar-circle-line', color: 'text-green-600' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 ${activity.color}`}>
                    <i className={`${activity.icon} text-lg`}></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{activity.message}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
