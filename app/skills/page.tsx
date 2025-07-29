
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SkillsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedContactPro, setSelectedContactPro] = useState<any>(null);

  const [sortBy, setSortBy] = useState('rating');
  const [priceRange, setPriceRange] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [experienceFilter, setExperienceFilter] = useState('all');
  const [certificationFilter, setCertificationFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [industryFilter, setIndustryFilter] = useState('all');
  const [languageFilter, setLanguageFilter] = useState('all');
  const [projectTypeFilter, setProjectTypeFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [mounted, setMounted] = useState(false);
  const [showComparisonModal, setShowComparisonModal] = useState(false);
  const [comparedProfessionals, setComparedProfessionals] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [showProjectPostModal, setShowProjectPostModal] = useState(false);
  const [showSkillsAssessment, setShowSkillsAssessment] = useState(false);
  const [showTeamBuilder, setShowTeamBuilder] = useState(false);
  const [teamBuilderProjects, setTeamBuilderProjects] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [showAiModal, setShowAiModal] = useState(false);
  const [assessmentStep, setAssessmentStep] = useState(1);
const [assessmentData, setAssessmentData] = useState<{
  selectedSkills: string[];
  experienceLevel: string;
  workPreference: string;
  availability: string;
  hourlyRate: string;
  portfolio: string[];
  certifications: string[];
  languages: string[];
  workingHours: string;
  bio: string;
  goals: string[]; // 👈 this fixes the "never" issue
}>({
  selectedSkills: [],
  experienceLevel: '',
  workPreference: '',
  availability: '',
  hourlyRate: '',
  portfolio: [],
  certifications: [],
  languages: [],
  workingHours: '',
  bio: '',
  goals: [], // 👈 still the same value
});


  const [assessmentResults, setAssessmentResults] = useState<{
  skillScore: number;
  marketReadiness: number;
  experienceLevel: string;
  topSkills: string[];
  recommendations: {
    type: string;
    title: string;
    description: string;
    action: string;
  }[];
  matchingProfessionals: {
    name: string;
    expertise: string;
    rating: number;
    hourlyRate: number;
    profileUrl: string;
  }[]; // Fill in accurate types as needed
  suggestedHourlyRate: {
    min: number;
    max: number;
    average: number;
  };
  nextSteps: string[];
} | null>(null);

  const [isSubmittingAssessment, setIsSubmittingAssessment] = useState(false);

  const [teamBuilderStep, setTeamBuilderStep] = useState(1);
  const [teamBuilderData, setTeamBuilderData] = useState({
  projectType: '',
  budget: '',
  timeline: '',
  teamSize: '',
  requiredSkills: [] as string[], // ✅ Fix: explicitly say it's string[]
  projectDescription: '',
  industry: '',
  complexity: '',
  workStyle: '',
  communicationPrefs: [] as string[] // ✅ (optional)
});

  const [recommendedTeams, setRecommendedTeams] = useState<any[]>([]);

  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isGeneratingTeams, setIsGeneratingTeams] = useState(false);
  const [showTeamDetails, setShowTeamDetails] = useState(false);

  const skillsAssessmentTips = [
    "Be honest about your skill level - this helps provide accurate recommendations",
    "Select skills you're actively using or comfortable working with",
    "Consider both technical and soft skills in your selection",
    "Think about skills you've used in recent projects or jobs",
    "Include skills you're passionate about, even if you're still learning"
  ];

  const projectTypes = [
    { id: 'web-app', name: 'Web Application', description: 'Custom web applications and platforms', skills: ['React', 'Node.js', 'Python', 'Database Design'] },
    { id: 'mobile-app', name: 'Mobile Application', description: 'iOS and Android applications', skills: ['React Native', 'Swift', 'Kotlin', 'Flutter'] },
    { id: 'ecommerce', name: 'E-commerce Platform', description: 'Online stores and marketplaces', skills: ['Shopify', 'WooCommerce', 'Payment Integration', 'UX Design'] },
    { id: 'marketing-campaign', name: 'Marketing Campaign', description: 'Digital marketing and brand campaigns', skills: ['Digital Marketing', 'SEO', 'Content Creation', 'Social Media'] },
    { id: 'data-analytics', name: 'Data & Analytics', description: 'Business intelligence and data science', skills: ['Python', 'SQL', 'Machine Learning', 'Data Visualization'] },
    { id: 'branding', name: 'Brand Identity', description: 'Logo design and brand development', skills: ['Graphic Design', 'Brand Strategy', 'UI/UX Design', 'Marketing'] },
    { id: 'automation', name: 'Business Automation', description: 'Process automation and workflow optimization', skills: ['Python', 'RPA', 'API Integration', 'Business Analysis'] }
  ];

  const budgetRanges = [
    { id: '5000-10000', name: '$5,000 - $10,000', description: 'Small projects, MVP development' },
    { id: '10000-25000', name: '$10,000 - $25,000', description: 'Medium projects, full feature development' },
    { id: '25000-50000', name: '$25,000 - $50,000', description: 'Large projects, enterprise solutions' },
    { id: '50000-100000', name: '$50,000 - $100,000', description: 'Complex systems, multi-platform solutions' },
    { id: '100000+', name: '$100,000+', description: 'Enterprise-grade, long-term projects' }
  ];

  const timelineOptions = [
    { id: '1-2weeks', name: '1-2 weeks', description: 'Quick turnaround, urgent projects' },
    { id: '1month', name: '1 month', description: 'Standard development timeline' },
    { id: '2-3months', name: '2-3 months', description: 'Comprehensive project development' },
    { id: '3-6months', name: '3-6 months', description: 'Large-scale, complex projects' },
    { id: '6months+', name: '6+ months', description: 'Long-term, enterprise initiatives' }
  ];

  const teamSizeOptions = [
    { id: 'solo', name: 'Solo Expert', description: '1 senior professional', ideal: 'Simple projects, quick execution' },
    { id: 'small', name: 'Small Team', description: '2-3 professionals', ideal: 'Focused projects, specialized skills' },
    { id: 'medium', name: 'Medium Team', description: '4-6 professionals', ideal: 'Complex projects, multiple specializations' },
    { id: 'large', name: 'Large Team', description: '7+ professionals', ideal: 'Enterprise projects, full-service delivery' }
  ];

  const workStyleOptions = [
    { id: 'agile', name: 'Agile Development', description: 'Iterative, flexible approach with regular updates' },
    { id: 'traditional', name: 'Traditional Project Management', description: 'Structured, milestone-based approach' },
    { id: 'collaborative', name: 'Collaborative Partnership', description: 'Close collaboration with your team' },
    { id: 'autonomous', name: 'Autonomous Execution', description: 'Independent work with periodic check-ins' }
  ];

  const communicationPrefs = [
    { id: 'daily-updates', name: 'Daily Updates', description: 'Regular progress reports and quick check-ins' },
    { id: 'weekly-meetings', name: 'Weekly Meetings', description: 'Structured weekly progress meetings' },
    { id: 'milestone-reviews', name: 'Milestone Reviews', description: 'Formal reviews at project milestones' },
    { id: 'slack-chat', name: 'Slack/Chat', description: 'Real-time communication via messaging' },
    { id: 'video-calls', name: 'Video Calls', description: 'Regular video conferences and screen sharing' },
    { id: 'email-reports', name: 'Email Reports', description: 'Detailed email progress reports' }
  ];

  const professionals = [
    {
      id: 1,
      name: 'Hana Tesfaye',
      title: 'Senior Full Stack Developer',
      category: 'development',
      skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB', 'Docker', 'TypeScript', 'GraphQL'],
      rating: 4.9,
      reviews: 47,
      hourlyRate: 35,
      location: 'Addis Ababa',
      availability: 'Available',
      certified: true,
      level: 'Expert',
      responseTime: '2 hours',
      completionRate: 98,
      languages: ['English', 'Amharic'],
      experience: '6+ years',
      education: 'Computer Science, AAU',
      portfolio: ['E-commerce Platform', 'Mobile Banking App', 'Healthcare System', 'Real Estate Portal'],
      bio: 'Passionate full-stack developer with expertise in modern web technologies. Specialized in building scalable applications for Ethiopian businesses with international standards.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20female%20software%20developer%20with%20modern%20laptop%20in%20contemporary%20office%20setting%2C%20confident%20and%20skilled%20technology%20professional%2C%20clean%20professional%20atmosphere%20showcasing%20Ethiopian%20talent%20and%20innovation&width=300&height=300&seq=prof1&orientation=squarish',
      lastOnline: '2 hours ago',
      projectsCompleted: 89,
      clientSatisfaction: 98,
      specializations: ['E-commerce', 'Fintech', 'Healthcare'],
      industries: ['Technology', 'Finance', 'Healthcare'],
      projectTypes: ['Web Development', 'Mobile Apps', 'API Development'],
      totalEarnings: 125000,
      avgProjectValue: 3500,
      testimonials: [
        { client: 'TechCorp Ethiopia', text: 'Exceptional developer with great attention to detail and timely delivery.', rating: 5 },
        { client: 'Digital Solutions Ltd', text: 'Highly skilled and professional. Made our complex project seem easy.', rating: 5 }
      ],
      badges: ['Top Performer', 'Fast Delivery', 'Client Favorite'],
      workingHours: 'Mon-Fri 9AM-6PM EAT',
      timezone: 'East Africa Time (EAT)',
      verifications: ['Identity', 'Skills', 'Portfolio', 'Background'],
      collaborationPrefs: ['Agile', 'Slack', 'Video Calls', 'Screen Sharing']
    },
    {
      id: 2,
      name: 'Dawit Bekele',
      title: 'Senior UX/UI Designer',
      category: 'design',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems', 'Usability Testing', 'Sketch', 'InVision'],
      rating: 4.8,
      reviews: 32,
      hourlyRate: 30,
      location: 'Addis Ababa',
      availability: 'Available',
      certified: true,
      level: 'Expert',
      responseTime: '1 hour',
      completionRate: 96,
      languages: ['English', 'Amharic'],
      experience: '5+ years',
      education: 'Industrial Design, EiABC',
      portfolio: ['Banking Mobile App', 'E-learning Platform', 'Healthcare Dashboard', 'Tourism Website'],
      bio: 'Creative UX/UI designer focused on creating intuitive and beautiful digital experiences that solve real problems for Ethiopian users while meeting international design standards.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20male%20UX%20designer%20working%20on%20interface%20design%2C%20creative%20workspace%20with%20design%20tools%20and%20sketches%2C%20modern%20office%20environment%2C%20professional%20portrait%20style%20with%20clean%20background&width=300&height=300&seq=prof2&orientation=squarish',
      lastOnline: '1 hour ago',
      projectsCompleted: 67,
      clientSatisfaction: 97,
      specializations: ['Mobile UX', 'Dashboard Design', 'Design Systems'],
      industries: ['Fintech', 'Education', 'Healthcare'],
      projectTypes: ['UI/UX Design', 'Prototyping', 'User Research'],
      totalEarnings: 98000,
      avgProjectValue: 2800,
      testimonials: [
        { client: 'Bank of Abyssinia', text: 'Outstanding design work that perfectly captured our brand vision.', rating: 5 },
        { client: 'EduTech Solutions', text: 'Incredible attention to user experience. Highly recommended!', rating: 5 }
      ],
      badges: ['Design Expert', 'User Advocate', 'Innovation Award'],
      workingHours: 'Mon-Sat 8AM-5PM EAT',
      timezone: 'East Africa Time (EAT)',
      verifications: ['Identity', 'Skills', 'Portfolio', 'Education'],
      collaborationPrefs: ['Figma', 'Miro', 'Zoom', 'Slack']
    },
    {
      id: 3,
      name: 'Meron Alemayehu',
      title: 'Digital Marketing Strategist',
      category: 'marketing',
      skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics', 'Content Marketing', 'Email Marketing', 'Facebook Ads', 'LinkedIn Marketing'],
      rating: 4.9,
      reviews: 28,
      hourlyRate: 25,
      location: 'Hawassa',
      availability: 'Available',
      certified: true,
      level: 'Expert',
      responseTime: '3 hours',
      completionRate: 99,
      languages: ['English', 'Amharic', 'Oromo'],
      experience: '4+ years',
      education: 'Marketing, Hawassa University',
      portfolio: ['Tourism Campaign', 'E-commerce Growth', 'Brand Awareness', 'Lead Generation'],
      bio: 'Results-driven digital marketing specialist with proven track record of growing Ethiopian businesses through strategic online marketing and data-driven campaigns.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20female%20digital%20marketing%20specialist%20with%20laptop%20and%20marketing%20analytics%20charts%2C%20confident%20business%20professional%20in%20modern%20office%20setting%2C%20clean%20professional%20atmosphere%20showcasing%20Ethiopian%20talent%20and%20innovation&width=300&height=300&seq=prof3&orientation=squarish',
      lastOnline: '30 minutes ago',
      projectsCompleted: 54,
      clientSatisfaction: 99,
      specializations: ['Growth Marketing', 'Performance Marketing', 'Social Media Strategy'],
      industries: ['Tourism', 'E-commerce', 'Real Estate'],
      projectTypes: ['Marketing Strategy', 'Campaign Management', 'Analytics Setup'],
      totalEarnings: 67000,
      avgProjectValue: 2200,
      testimonials: [
        { client: 'Ethiopian Airlines', text: 'Exceptional marketing results. Increased our online bookings by 200%.', rating: 5 },
        { client: 'Sheger Tourism', text: 'Strategic approach and excellent execution. Great ROI on our campaigns.', rating: 5 }
      ],
      badges: ['Growth Expert', 'ROI Champion', 'Analytics Pro'],
      workingHours: 'Mon-Fri 9AM-6PM EAT',
      timezone: 'East Africa Time (EAT)',
      verifications: ['Identity', 'Skills', 'Certifications', 'Results'],
      collaborationPrefs: ['Google Analytics', 'Slack', 'Zoom', 'Asana']
    },
    {
      id: 4,
      name: 'Samuel Girma',
      title: 'Senior Data Scientist',
      category: 'data',
      skills: ['Python', 'Machine Learning', 'SQL', 'Tableau', 'R', 'TensorFlow', 'Power BI', 'Apache Spark'],
      rating: 4.8,
      reviews: 41,
      hourlyRate: 40,
      location: 'Addis Ababa',
      availability: 'Busy',
      certified: true,
      level: 'Expert',
      responseTime: '4 hours',
      completionRate: 97,
      languages: ['English', 'Amharic'],
      experience: '7+ years',
      education: 'Statistics, AAU',
      portfolio: ['Predictive Analytics', 'Customer Segmentation', 'Business Intelligence', 'Fraud Detection'],
      bio: 'Experienced data scientist helping Ethiopian organizations make data-driven decisions through advanced analytics, machine learning, and business intelligence solutions.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20male%20data%20scientist%20with%20multiple%20monitors%20showing%20data%20visualizations%20and%20code%2C%20analytical%20professional%20in%20modern%20tech%20workspace%2C%20professional%20portrait%20with%20clean%20background&width=300&height=300&seq=prof4&orientation=squarish',
      lastOnline: '1 day ago',
      projectsCompleted: 73,
      clientSatisfaction: 96,
      specializations: ['Machine Learning', 'Business Intelligence', 'Predictive Analytics'],
      industries: ['Banking', 'Telecom', 'Manufacturing'],
      projectTypes: ['Data Analysis', 'ML Models', 'Dashboard Development'],
      totalEarnings: 185000,
      avgProjectValue: 4500,
      testimonials: [
        { client: 'Commercial Bank of Ethiopia', text: 'Excellent data insights that transformed our decision making process.', rating: 5 },
        { client: 'Ethio Telecom', text: 'Advanced analytics capabilities. Delivered beyond expectations.', rating: 5 }
      ],
      badges: ['AI Expert', 'Data Wizard', 'Industry Leader'],
      workingHours: 'Mon-Fri 8AM-5PM EAT',
      timezone: 'East Africa Time (EAT)',
      verifications: ['Identity', 'Skills', 'Education', 'Projects'],
      collaborationPrefs: ['Jupyter', 'GitHub', 'Slack', 'Teams']
    },
    {
      id: 5,
      name: 'Bethlehem Tadesse',
      title: 'Content Strategist & Writer',
      category: 'content',
      skills: ['Content Strategy', 'SEO Writing', 'Copywriting', 'Research', 'Brand Voice', 'Social Media', 'Blog Writing', 'Technical Writing'],
      rating: 4.9,
      reviews: 35,
      hourlyRate: 20,
      location: 'Bahir Dar',
      availability: 'Available',
      certified: true,
      level: 'Professional',
      responseTime: '2 hours',
      completionRate: 100,
      languages: ['English', 'Amharic'],
      experience: '3+ years',
      education: 'Journalism, Bahir Dar University',
      portfolio: ['Brand Content Strategy', 'Website Copy', 'Marketing Materials', 'Blog Content'],
      bio: 'Creative content strategist specializing in authentic storytelling that resonates with Ethiopian audiences while meeting international standards and driving business results.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20female%20content%20writer%20with%20laptop%20and%20notebooks%2C%20creative%20writing%20workspace%20with%20books%20and%20plants%2C%20modern%20office%20environment%2C%20professional%20atmosphere%20showcasing%20Ethiopian%20talent%20and%20innovation&width=300&height=300&seq=prof5&orientation=squarish',
      lastOnline: '3 hours ago',
      projectsCompleted: 42,
      clientSatisfaction: 100,
      specializations: ['Brand Storytelling', 'SEO Content', 'Social Media Content'],
      industries: ['Technology', 'Tourism', 'Education'],
      projectTypes: ['Content Strategy', 'Copywriting', 'Blog Writing'],
      totalEarnings: 34000,
      avgProjectValue: 1200,
      testimonials: [
        { client: 'Visit Ethiopia', text: 'Amazing storytelling ability. Perfectly captured our brand essence.', rating: 5 },
        { client: 'TechStart Ethiopia', text: 'High-quality content that significantly improved our engagement.', rating: 5 }
      ],
      badges: ['Content Master', 'SEO Expert', 'Brand Voice'],
      workingHours: 'Mon-Fri 10AM-7PM EAT',
      timezone: 'East Africa Time (EAT)',
      verifications: ['Identity', 'Skills', 'Writing Samples', 'Education'],
      collaborationPrefs: ['Google Docs', 'Slack', 'Zoom', 'Trello']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Skills', icon: 'ri-apps-line', count: 47 },
    { id: 'development', name: 'Development', icon: 'ri-code-line', count: 12 },
    { id: 'design', name: 'Design', icon: 'ri-palette-line', count: 8 },
    { id: 'marketing', name: 'Marketing', icon: 'ri-megaphone-line', count: 6 },
    { id: 'data', name: 'Data & Analytics', icon: 'ri-bar-chart-line', count: 5 },
    { id: 'business', name: 'Business', icon: 'ri-briefcase-line', count: 7 },
    { id: 'content', name: 'Content & Writing', icon: 'ri-quill-pen-line', count: 4 },
    { id: 'finance', name: 'Finance', icon: 'ri-money-dollar-circle-line', count: 3 },
    { id: 'legal', name: 'Legal', icon: 'ri-scales-line', count: 2 }
  ];

  const skillCategories = [
    {
      category: 'Development & Programming',
      skills: ['React', 'Node.js', 'Python', 'JavaScript', 'PHP', 'Java', 'C#', 'Ruby', 'Go', 'Swift', 'Kotlin', 'Flutter', 'React Native', 'Vue.js', 'Angular', 'Django', 'Laravel', 'Spring Boot', 'Express.js', 'FastAPI']
    },
    {
      category: 'Design & Creative',
      skills: ['UI/UX Design', 'Graphic Design', 'Web Design', 'Logo Design', 'Branding', 'Illustration', 'Animation', 'Video Editing', 'Photography', 'Figma', 'Adobe Creative Suite', 'Sketch', 'InVision', 'Principle', 'After Effects']
    },
    {
      category: 'Marketing & Sales',
      skills: ['Digital Marketing', 'SEO', 'SEM', 'Social Media Marketing', 'Content Marketing', 'Email Marketing', 'Affiliate Marketing', 'Influencer Marketing', 'Google Ads', 'Facebook Ads', 'LinkedIn Marketing', 'Marketing Analytics', 'CRM Management', 'Sales Funnel', 'Lead Generation']
    },
    {
      category: 'Data & Analytics',
      skills: ['Data Analysis', 'Data Science', 'Machine Learning', 'AI Development', 'Business Intelligence', 'SQL', 'Python for Data', 'R Programming', 'Tableau', 'Power BI', 'Google Analytics', 'Statistical Analysis', 'Data Visualization', 'Big Data', 'Predictive Analytics']
    },
    {
      category: 'Business & Strategy',
      skills: ['Business Strategy', 'Project Management', 'Product Management', 'Business Analysis', 'Market Research', 'Financial Planning', 'Operations Management', 'Process Improvement', 'Change Management', 'Strategic Planning', 'Business Development', 'Consulting', 'Risk Management']
    },
    {
      category: 'Content & Writing',
      skills: ['Content Writing', 'Copywriting', 'Technical Writing', 'Blog Writing', 'SEO Writing', 'Social Media Content', 'Email Copy', 'Sales Copy', 'Grant Writing', 'Academic Writing', 'Creative Writing', 'Editing', 'Proofreading', 'Translation']
    }
  ];

  const experienceLevels = [
    { id: 'beginner', name: 'Beginner (0-1 years)', description: 'Just starting out, eager to learn and grow' },
    { id: 'intermediate', name: 'Intermediate (2-4 years)', description: 'Some experience, comfortable with most tasks' },
    { id: 'advanced', name: 'Advanced (5-7 years)', description: 'Highly skilled, can handle complex projects' },
    { id: 'expert', name: 'Expert (8+ years)', description: 'Industry expert, mentor others, lead complex initiatives' }
  ];

  const workPreferences = [
    { id: 'freelance', name: 'Freelance Projects', description: 'Short-term projects with flexible schedules' },
    { id: 'contract', name: 'Contract Work', description: 'Medium to long-term contracts with specific deliverables' },
    { id: 'part-time', name: 'Part-time Employment', description: 'Regular part-time work with consistent hours' },
    { id: 'full-time', name: 'Full-time Opportunities', description: 'Permanent full-time positions' },
    { id: 'consulting', name: 'Consulting & Advisory', description: 'Strategic consulting and expert advisory roles' }
  ];

  const availabilityOptions = [
    { id: 'immediate', name: 'Available Immediately', description: 'Ready to start new projects right away' },
    { id: 'within-week', name: 'Within 1 Week', description: 'Can start new projects within a week' },
    { id: 'within-month', name: 'Within 1 Month', description: 'Available for new projects within a month' },
    { id: 'future', name: 'Future Opportunities', description: 'Interested in future opportunities, not immediately available' }
  ];

  const professionalGoals = [
    { id: 'skill-development', name: 'Skill Development', description: 'Learn new technologies and improve existing skills' },
    { id: 'career-growth', name: 'Career Advancement', description: 'Advance to senior or leadership positions' },
    { id: 'income-increase', name: 'Increase Income', description: 'Earn more through higher-value projects' },
    { id: 'network-building', name: 'Network Building', description: 'Connect with industry professionals and clients' },
    { id: 'portfolio-building', name: 'Portfolio Building', description: 'Build a strong portfolio with diverse projects' },
    { id: 'work-life-balance', name: 'Work-Life Balance', description: 'Achieve better balance between work and personal life' },
    { id: 'entrepreneurship', name: 'Entrepreneurship', description: 'Start own business or consultancy' },
    { id: 'remote-work', name: 'Remote Work', description: 'Work remotely with international clients' }
  ];

  const handleSkillToggle = (skill: string) => {

    if (!mounted) return;
    const updatedSkills = assessmentData.selectedSkills.includes(skill)
      ? assessmentData.selectedSkills.filter(s => s !== skill)
      : [...assessmentData.selectedSkills, skill];

    setAssessmentData(prev => ({ ...prev, selectedSkills: updatedSkills }));
  };

  const handleGoalToggle = (goal: string) => {

    if (!mounted) return;
    const updatedGoals = assessmentData.goals.includes(goal)
      ? assessmentData.goals.filter(g => g !== goal)
      : [...assessmentData.goals, goal];

    setAssessmentData(prev => ({ ...prev, goals: updatedGoals }));
  };

  const handleAssessmentNext = () => {
    if (!mounted) return;
    if (assessmentStep < 6) {
      setAssessmentStep(assessmentStep + 1);
    }
  };

  const handleAssessmentPrev = () => {
    if (!mounted) return;
    if (assessmentStep > 1) {
      setAssessmentStep(assessmentStep - 1);
    }
  };

  const generateAssessmentResults = () => {
    const { selectedSkills, experienceLevel, workPreference, availability, hourlyRate, goals } = assessmentData;

    const skillScore = Math.min(selectedSkills.length * 10, 100);

    const expMultiplier = {
      'beginner': 1.0,
      'intermediate': 1.3,
      'advanced': 1.6,
      'expert': 2.0
    }[experienceLevel] || 1.0;

    const marketReadiness = Math.min((skillScore * expMultiplier) / 2, 100);

    const recommendations = [];

    if (selectedSkills.some(skill => ['React', 'Node.js', 'Python', 'JavaScript'].includes(skill))) {
      recommendations.push({
        type: 'skill-match',
        title: 'High Demand Development Skills',
        description: 'Your development skills are in high demand. Consider specializing in full-stack development.',
        action: 'Explore full-stack development opportunities'
      });
    }

    if (selectedSkills.some(skill => ['UI/UX Design', 'Figma', 'Adobe Creative Suite'].includes(skill))) {
      recommendations.push({
        type: 'skill-match',
        title: 'Design Skills Portfolio',
        description: 'Your design skills are valuable. Focus on building a strong visual portfolio.',
        action: 'Create a comprehensive design portfolio'
      });
    }

    if (goals.includes('income-increase')) {
      recommendations.push({
        type: 'goal-based',
        title: 'Income Optimization Strategy',
        description: 'Focus on high-value skills and premium clients to increase your earning potential.',
        action: 'Target enterprise clients and complex projects'
      });
    }

    if (goals.includes('skill-development')) {
      recommendations.push({
        type: 'goal-based',
        title: 'Continuous Learning Path',
        description: 'Consider learning complementary skills to become more versatile.',
        action: 'Enroll in advanced courses and certifications'
      });
    }

    const matchingProfessionals = professionals.filter(pro =>
      pro.skills.some(skill => selectedSkills.includes(skill))
    ).slice(0, 3);

    return {
      skillScore: Math.round(skillScore),
      marketReadiness: Math.round(marketReadiness),
      experienceLevel: experienceLevels.find(e => e.id === experienceLevel)?.name || 'Not specified',
      topSkills: selectedSkills.slice(0, 5),
      recommendations,
      matchingProfessionals,
      suggestedHourlyRate: {
        min: Math.round(20 * expMultiplier),
        max: Math.round(50 * expMultiplier)
      },
      nextSteps: [
        'Complete your professional profile',
        'Upload portfolio samples',
        'Get skill certifications',
        'Start applying to relevant projects',
        'Build your professional network'
      ]
    };
  };

  const handleAssessmentSubmit = async () => {
    if (!mounted) return;

    setIsSubmittingAssessment(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const results = generateAssessmentResults();
      setAssessmentResults(results as any);

      setAssessmentStep(7);
    } catch (error) {
      console.error('Assessment submission error:', error);
      alert('Assessment failed. Please try again.');
    } finally {
      setIsSubmittingAssessment(false);
    }
  };

  const resetAssessment = () => {
    if (!mounted) return;
    setAssessmentStep(1);
    setAssessmentData({
      selectedSkills: [],
      experienceLevel: '',
      workPreference: '',
      availability: '',
      hourlyRate: '',
      portfolio: [],
      certifications: [],
      languages: [],
      workingHours: '',
      bio: '',
      goals: []
    });
    setAssessmentResults(null);
  };

  const generateAdvancedAssessmentResults = () => {
    const { selectedSkills, experienceLevel, workPreference, availability, hourlyRate, goals } = assessmentData;

    const skillScore = Math.min(selectedSkills.length * 8 + Math.random() * 20, 100);
    const expMultiplier = {
      'beginner': 1.0,
      'intermediate': 1.3,
      'advanced': 1.6,
      'expert': 2.0
    }[experienceLevel] || 1.0;

    const marketReadiness = Math.min((skillScore * expMultiplier) / 1.8, 100);
    const competitiveAdvantage = Math.min((selectedSkills.length * 12 + Math.random() * 15), 100);

    const personalizedInsights = [];

    if (selectedSkills.includes('React') && selectedSkills.includes('Node.js')) {
      personalizedInsights.push({
        type: 'strength',
        title: 'Full-Stack Development Powerhouse',
        description: 'Your React + Node.js combination is highly sought after. You can command premium rates for full-stack projects.',
        impact: 'High',
        actionable: 'Focus on building complete applications showcasing both skills'
      });
    }

    if (selectedSkills.some(skill => ['UI/UX Design', 'Figma', 'User Research'].includes(skill))) {
      personalizedInsights.push({
        type: 'opportunity',
        title: 'Design Thinking Advantage',
        description: 'Your design skills complement technical abilities perfectly. This rare combination opens doors to leadership roles.',
        impact: 'Medium',
        actionable: 'Highlight design-thinking in your portfolio and proposals'
      });
    }

    if (goals.includes('income-increase') && experienceLevel === 'expert') {
      personalizedInsights.push({
        type: 'strategy',
        title: 'Premium Positioning Strategy',
        description: 'With your expertise level, focus on high-value consulting and enterprise clients.',
        impact: 'High',
        actionable: 'Target Fortune 500 companies and charge consultancy rates'
      });
    }

    const careerPathways = [];

    if (selectedSkills.some(skill => ['Python', 'Machine Learning', 'Data Analysis'].includes(skill))) {
      careerPathways.push({
        title: 'Data Science Leadership',
        description: 'Transition into senior data science roles or AI consulting',
        timeline: '6-12 months',
        nextSteps: ['Complete advanced ML certifications', 'Build AI portfolio projects', 'Network with data science leaders']
      });
    }

    if (selectedSkills.some(skill => ['Digital Marketing', 'SEO', 'Content Marketing'].includes(skill))) {
      careerPathways.push({
        title: 'Growth Marketing Expert',
        description: 'Specialize in growth hacking and performance marketing',
        timeline: '3-6 months',
        nextSteps: ['Master growth analytics tools', 'Build case studies', 'Get performance marketing certifications']
      });
    }

    const marketAnalysis = {
      demandLevel: Math.floor(Math.random() * 40) + 60,
      competitionLevel: Math.floor(Math.random() * 30) + 35,
      growthPotential: Math.floor(Math.random() * 25) + 65,
      averageRate: Math.floor(Math.random() * 30) + 25
    };

    return {
      skillScore: Math.round(skillScore),
      marketReadiness: Math.round(marketReadiness),
      competitiveAdvantage: Math.round(competitiveAdvantage),
      experienceLevel: experienceLevels.find(e => e.id === experienceLevel)?.name || 'Not specified',
      topSkills: selectedSkills.slice(0, 5),
      personalizedInsights,
      careerPathways,
      marketAnalysis,
      suggestedHourlyRate: {
        min: Math.round(20 * expMultiplier),
        max: Math.round(50 * expMultiplier),
        optimal: Math.round(35 * expMultiplier)
      },
      nextSteps: [
        'Complete your professional profile with portfolio samples',
        'Get skill certifications to boost credibility',
        'Apply to 3-5 relevant projects this week',
        'Build your professional network on InHub',
        'Set up automated project alerts for your skills'
      ],
      matchingProfessionals: professionals.filter(pro =>
        pro.skills.some(skill => selectedSkills.includes(skill))
      ).slice(0, 3)
    };
  };

const handleTeamBuilderSkillToggle = (skill: string) => {
  if (!mounted) return;

  setTeamBuilderData(prev => {
    const updatedSkills = prev.requiredSkills.includes(skill)
      ? prev.requiredSkills.filter(s => s !== skill)
      : [...prev.requiredSkills, skill];

    return { ...prev, requiredSkills: updatedSkills };
  });
};



 const handleCommunicationPrefToggle = (pref: string) => {

    if (!mounted) return;
    const updatedPrefs = teamBuilderData.communicationPrefs.includes(pref)
      ? teamBuilderData.communicationPrefs.filter(p => p !== pref)
      : [...teamBuilderData.communicationPrefs, pref];
    setTeamBuilderData(prev => ({ ...prev, communicationPrefs: updatedPrefs }));
  };

  const generateTeamRecommendations = async () => {
    if (!mounted) return;

    setIsGeneratingTeams(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      const projectTypeData = projectTypes.find(p => p.id === teamBuilderData.projectType);
      const budgetData = budgetRanges.find(b => b.id === teamBuilderData.budget);
      const timelineData = timelineOptions.find(t => t.id === teamBuilderData.timeline);

      const teams = [
        {
          id: 1,
          name: 'Elite Development Squad',
          type: 'full-stack',
          members: professionals.slice(0, 4),
          totalRate: 145,
          rating: 4.9,
          successRate: 98,
          specialties: ['Web Development', 'Mobile Apps', 'UI/UX Design', 'DevOps'],
          experience: '5+ years average',
          languages: ['English', 'Amharic'],
          availability: 'Available immediately',
          estimatedDelivery: timelineData?.name || '2-3 months',
          strengths: ['Rapid prototyping', 'Scalable architecture', 'Modern tech stack', 'Agile methodology'],
          pastProjects: ['E-commerce Platform for Ethiopian Airlines', 'Banking App for CBE', 'Tourism Portal for Ministry'],
          teamCulture: 'Collaborative, innovative, results-driven',
          communicationStyle: 'Daily standups, weekly demos, transparent progress tracking'
        },
        {
          id: 2,
          name: 'Creative Design Collective',
          type: 'design-focused',
          members: professionals.slice(1, 4),
          totalRate: 95,
          rating: 4.8,
          successRate: 96,
          specialties: ['UI/UX Design', 'Brand Identity', 'Digital Marketing', 'Content Strategy'],
          experience: '4+ years average',
          languages: ['English', 'Amharic', 'Oromo'],
          availability: 'Available in 1 week',
          estimatedDelivery: timelineData?.name || '1-2 months',
          strengths: ['User-centered design', 'Brand storytelling', 'Multi-platform expertise', 'Creative problem-solving'],
          pastProjects: ['Rebranding for Ethio Telecom', 'Tourism App for Ethiopian Tourism', 'Banking UX for Bank of Abyssinia'],
          teamCulture: 'Creative, user-focused, detail-oriented',
          communicationStyle: 'Design reviews, user feedback sessions, visual progress updates'
        },
        {
          id: 3,
          name: 'Data Intelligence Unit',
          type: 'data-analytics',
          members: professionals.slice(3, 5),
          totalRate: 125,
          rating: 4.7,
          successRate: 95,
          specialties: ['Data Science', 'Machine Learning', 'Business Intelligence', 'Analytics'],
          experience: '6+ years average',
          languages: ['English', 'Amharic'],
          availability: 'Available in 2 weeks',
          estimatedDelivery: timelineData?.name || '2-4 months',
          strengths: ['Advanced analytics', 'Predictive modeling', 'Big data processing', 'Actionable insights'],
          pastProjects: ['Fraud Detection for CBE', 'Customer Analytics for Ethio Telecom', 'Market Research for Ethiopian Airlines'],
          teamCulture: 'Analytical, research-driven, precision-focused',
          communicationStyle: 'Data-driven reports, insight presentations, methodology discussions'
        },
        {
          id: 4,
          name: 'Rapid MVP Builders',
          type: 'startup-focused',
          members: professionals.slice(0, 3),
          totalRate: 85,
          rating: 4.8,
          successRate: 97,
          specialties: ['MVP Development', 'Startup Consulting', 'Lean Development', 'Product Strategy'],
          experience: '3+ years average',
          languages: ['English', 'Amharic'],
          availability: 'Available immediately',
          estimatedDelivery: timelineData?.name || '2-6 weeks',
          strengths: ['Fast iteration', 'Cost-effective solutions', 'Startup expertise', 'Product-market fit focus'],
          pastProjects: ['Multiple startup MVPs', 'Prototype for tech accelerator', 'Minimum viable products for seed funding'],
          teamCulture: 'Entrepreneurial, fast-paced, lean methodology',
          communicationStyle: 'Sprint reviews, rapid iterations, founder-friendly updates'
        }
      ];

      const filteredTeams = teams.filter(team => {
        if (teamBuilderData.teamSize === 'solo') {
          return team.members.length === 1;
        } else if (teamBuilderData.teamSize === 'small') {
          return team.members.length <= 3;
        } else if (teamBuilderData.teamSize === 'medium') {
          return team.members.length <= 6;
        } else if (teamBuilderData.teamSize === 'large') {
          return team.members.length > 6;
        }
        return true;
      });

      setRecommendedTeams(filteredTeams.length > 0 ? filteredTeams : teams);
      setTeamBuilderStep(4);

    } catch (error) {
      console.error('Team generation error:', error);
      alert('Failed to generate team recommendations. Please try again.');
    } finally {
      setIsGeneratingTeams(false);
    }
  };

  const handleTeamBuilderNext = () => {
    if (!mounted) return;
    if (teamBuilderStep < 3) {
      setTeamBuilderStep(teamBuilderStep + 1);
    } else if (teamBuilderStep === 3) {
      generateTeamRecommendations();
    }
  };

  const handleTeamBuilderPrev = () => {
    if (!mounted) return;
    if (teamBuilderStep > 1) {
      setTeamBuilderStep(teamBuilderStep - 1);
    }
  };

  const resetTeamBuilder = () => {
    if (!mounted) return;
    setTeamBuilderStep(1);
    setTeamBuilderData({
      projectType: '',
      budget: '',
      timeline: '',
      teamSize: '',
      requiredSkills: [],
      projectDescription: '',
      industry: '',
      complexity: '',
      workStyle: '',
      communicationPrefs: []
    });
    setRecommendedTeams([]);
    setSelectedTeam(null);
  };

  useEffect(() => {
    setMounted(true);
    const savedFavorites = localStorage.getItem('inhub-favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const filteredProfessionals = professionals
    .filter(prof => {
      const matchesCategory = activeCategory === 'all' || prof.category === activeCategory;
      const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prof.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prof.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           prof.specializations?.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesPrice = priceRange === 'all' || (priceRange === 'budget' && prof.hourlyRate <= 25) ||
                           (priceRange === 'mid' && prof.hourlyRate > 25 && prof.hourlyRate <= 35) ||
                           (priceRange === 'premium' && prof.hourlyRate > 35);
      const matchesAvailability = availabilityFilter === 'all' || prof.availability === availabilityFilter;
      const matchesExperience = experienceFilter === 'all' || prof.experience === experienceFilter;
      const matchesCertification = certificationFilter === 'all' || prof.certified === (certificationFilter === 'certified');
      const matchesLocation = locationFilter === 'all' || prof.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesIndustry = industryFilter === 'all' || prof.industries?.some(ind => ind.toLowerCase().includes(industryFilter.toLowerCase()));
      const matchesLanguage = languageFilter === 'all' || prof.languages?.some(lang => lang.toLowerCase().includes(languageFilter.toLowerCase()));
      const matchesProjectType = projectTypeFilter === 'all' || prof.projectTypes?.some(type => type.toLowerCase().includes(projectTypeFilter.toLowerCase()));

      return matchesCategory && matchesSearch && matchesPrice && matchesAvailability && matchesExperience && matchesCertification &&
             matchesLocation && matchesIndustry && matchesLanguage && matchesProjectType;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.hourlyRate - b.hourlyRate;
      if (sortBy === 'price-high') return b.hourlyRate - a.hourlyRate;
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      if (sortBy === 'projects') return b.projectsCompleted - a.projectsCompleted;
      if (sortBy === 'recent') return new Date(b.lastOnline).getTime() - new Date(a.lastOnline).getTime();

      if (sortBy === 'earnings') return b.totalEarnings - a.totalEarnings;
      if (sortBy === 'completion') return b.completionRate - a.completionRate;
      return 0;
    });

const toggleFavorite = (professionalId: any) => {

    if (!mounted) return;
    const updatedFavorites = favorites.includes(professionalId)
      ? favorites.filter(id => id !== professionalId)
      : [...favorites, professionalId];

    setFavorites(updatedFavorites);
    localStorage.setItem('inhub-favorites', JSON.stringify(updatedFavorites));
  };

const addToComparison = (professional: any) => {

    if (!mounted) return;
    if (comparedProfessionals.length >= 3) {
      alert('You can only compare up to 3 professionals at once');
      return;
    }
    if (!comparedProfessionals.find(p => p.id === professional.id)) {
      setComparedProfessionals([...comparedProfessionals, professional]);
    }
  };

  const removeFromComparison = (professionalId: any) => {

    if (!mounted) return;
    setComparedProfessionals(comparedProfessionals.filter(p => p.id !== professionalId));
  };

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3D3A] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading skills marketplace...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <section
        className="relative py-20 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(31, 61, 58, 0.8), rgba(31, 61, 58, 0.8)), url('https://readdy.ai/api/search-image?query=Ethiopian%20professionals%20working%20together%20in%20modern%20coworking%20space%2C%20diverse%20team%20of%20developers%20designers%20and%20business%20professionals%20collaborating%2C%20contemporary%20office%20with%20laptops%20and%20creative%20workspace%2C%20professional%20atmosphere%20showcasing%20Ethiopian%20talent%20and%20innovation&width=1920&height=600&seq=skillshero&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">InHub Skills Marketplace</h1>
          <p className="text-base text-gray-300 max-w-3xl mx-auto mb-8">
            Connect with Ethiopia's top-tier professionals across technology, design, marketing, business, finance, and legal domains
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">3,200+</div>
              <div className="text-sm opacity-90">Professionals</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">4.9★</div>
              <div className="text-sm opacity-90">Avg Rating</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-sm opacity-90">Success Rate</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-90">Support</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.getElementById('browse')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              Browse Talent
            </button>
            <Link
              href="/post-project"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#1F3D3A] transition-colors whitespace-nowrap cursor-pointer"
            >
              Post a Project
            </Link>
            <button
              onClick={() => setShowAiModal(true)}
              className="bg-purple-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-ai-generate mr-2"></i>
              AI Match
            </button>
            <Link
              href="/account"
              className="bg-blue-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-600 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-user-line mr-2"></i>
              Account
            </Link>
          </div>
        </div>
      </section>
      <section className="py-4 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
              <button
                onClick={() => setShowSkillsAssessment(true)}
                className="flex items-center text-sm text-gray-600 hover:text-[#1F3D3A] transition-colors cursor-pointer px-3 sm:px-0 py-2 sm:py-0 bg-gray-100 sm:bg-transparent rounded-lg sm:rounded-none w-full sm:w-auto justify-center sm:justify-start"
              >
                <i className="ri-survey-line mr-2 text-base sm:text-sm"></i>
                Skills Assessment
              </button>
              <button
                onClick={() => setShowTeamBuilder(true)}
                className="flex items-center text-sm text-gray-600 hover:text-[#1F3D3A] transition-colors cursor-pointer px-3 sm:px-0 py-2 sm:py-0 bg-gray-100 sm:bg-transparent rounded-lg sm:rounded-none w-full sm:w-auto justify-center sm:justify-start"
              >
                <i className="ri-team-line mr-2 text-base sm:text-sm"></i>
                Team Builder
              </button>
              <Link href="/skills/dashboard" className="flex items-center text-sm text-gray-600 hover:text-[#1F3D3A] transition-colors cursor-pointer px-3 sm:px-0 py-2 sm:py-0 bg-gray-100 sm:bg-transparent rounded-lg sm:rounded-none w-full sm:w-auto justify-center sm:justify-start">
                <i className="ri-dashboard-line mr-2 text-base sm:text-sm"></i>
                Professional Dashboard
              </Link>
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto gap-4">
              {comparedProfessionals.length > 0 && (
                <button
                  onClick={() => setShowComparisonModal(true)}
                  className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-200"
                >
                  <i className="ri-scales-line mr-1"></i>
                  Compare ({comparedProfessionals.length})
                </button>
              )}
              {favorites.length > 0 && (
                <div className="flex items-center text-sm text-gray-600">
                  <i className="ri-heart-fill text-red-500 mr-1"></i>
                  {favorites.length} Favorites
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section id="browse" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Browse Top Talent</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find verified professionals ready to help you achieve your business goals
            </p>
          </div>
          <div className="mb-12">
            <div className="max-w-6xl mx-auto mb-8">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
                <div className="md:col-span-2 relative">
                  <input
                    type="text"
                    placeholder="Search by name, skill, or expertise..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-sm"
                  />
                  <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-sm pr-8"
                >
                  <option value="rating">Sort by Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="projects">Most Projects</option>
                  <option value="recent">Recently Active</option>
                  <option value="earnings">Top Earners</option>
                  <option value="completion">Best Completion Rate</option>
                </select>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-sm pr-8"
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Budget ($1-$25)</option>
                  <option value="mid">Mid-range ($26-$35)</option>
                  <option value="premium">Premium ($36+)</option>
                </select>
                <div className="flex border border-gray-300 rounded-full overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-3 transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-[#1F3D3A] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <i className="ri-grid-line"></i>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-4 py-3 transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-[#1F3D3A] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                  >
                    <i className="ri-list-unordered"></i>
                  </button>
                </div>
                <button
                  onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                  className="px-4 py-3 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <i className="ri-filter-line mr-2"></i>
                  Filters
                </button>
              </div>
              {showAdvancedFilters && (
                <div className="bg-gray-50 p-6 rounded-2xl mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                      <select
                        value={availabilityFilter}
                        onChange={(e) => setAvailabilityFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-sm pr-8"
                      >
                        <option value="all">All</option>
                        <option value="available">Available</option>
                        <option value="busy">Busy</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                      <select
                        value={experienceFilter}
                        onChange={(e) => setExperienceFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-sm pr-8"
                      >
                        <option value="all">All Levels</option>
                        <option value="junior">Junior (0-2 years)</option>
                        <option value="mid">Mid-level (3-5 years)</option>
                        <option value="senior">Senior (5+ years)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <select
                        value={locationFilter}
                        onChange={(e) => setLocationFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-sm pr-8"
                      >
                        <option value="all">All Locations</option>
                        <option value="addis">Addis Ababa</option>
                        <option value="hawassa">Hawassa</option>
                        <option value="bahir">Bahir Dar</option>
                        <option value="mekelle">Mekelle</option>
                        <option value="dire">Dire Dawa</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certification</label>
                      <select
                        value={certificationFilter}
                        onChange={(e) => setCertificationFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-sm pr-8"
                      >
                        <option value="all">All</option>
                        <option value="certified">Certified Only</option>
                        <option value="non-certified">Non-certified</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                      <select
                        value={industryFilter}
                        onChange={(e) => setIndustryFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-sm pr-8"
                      >
                        <option value="all">All Industries</option>
                        <option value="technology">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="tourism">Tourism</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                      <select
                        value={languageFilter}
                        onChange={(e) => setLanguageFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-sm pr-8"
                      >
                        <option value="all">All Languages</option>
                        <option value="english">English</option>
                        <option value="amharic">Amharic</option>
                        <option value="oromo">Oromo</option>
                        <option value="tigrinya">Tigrinya</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Type</label>
                      <select
                        value={projectTypeFilter}
                        onChange={(e) => setProjectTypeFilter(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-sm pr-8"
                      >
                        <option value="all">All Project Types</option>
                        <option value="web">Web Development</option>
                        <option value="mobile">Mobile Apps</option>
                        <option value="design">UI/UX Design</option>
                        <option value="marketing">Marketing</option>
                        <option value="data">Data Analysis</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => {
                        setActiveCategory('all');
                        setSearchTerm('');
                        setPriceRange('all');
                        setAvailabilityFilter('all');
                        setExperienceFilter('all');
                        setCertificationFilter('all');
                        setLocationFilter('all');
                        setIndustryFilter('all');
                        setLanguageFilter('all');
                        setProjectTypeFilter('all');
                        setSortBy('rating');
                      }}
                      className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                    >
                      Clear All Filters
                    </button>
                    <div className="text-sm text-gray-600">
                      Showing {filteredProfessionals.length} professionals
                    </div>
                  </div>
                </div>
              )}
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center px-4 py-2 rounded-full transition-colors whitespace-nowrap cursor-pointer text-sm ${activeCategory === category.id ? 'bg-[#1F3D3A] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    <i className={`${category.icon} mr-2`}></i>
                    {category.name}
                    <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProfessionals.map((professional) => (
                  <div key={professional.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                    <div className="flex items-start mb-4">
                      <div
                        className="w-16 h-16 rounded-full bg-gray-200 mr-4 flex-shrink-0"
                        style={{
                          backgroundImage: `url(${professional.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      ></div>
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center mb-1">
                          <h3 className="font-bold text-[#1F3D3A] mr-2 truncate">{professional.name}</h3>
                          {professional.certified && (
                            <div className="w-5 h-5 flex items-center justify-center bg-green-100 rounded-full flex-shrink-0">
                              <i className="ri-shield-check-fill text-xs text-green-600"></i>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-1 truncate">{professional.title}</p>
                        <p className="text-gray-500 text-xs truncate">{professional.location}</p>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <button
                          onClick={() => toggleFavorite(professional.id)}
                          className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer ${favorites.includes(professional.id) ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-500'}`}
                        >
                          <i className={`ri-heart-${favorites.includes(professional.id) ? 'fill' : 'line'} text-sm`}></i>
                        </button>
                        <button
                          onClick={() => addToComparison(professional)}
                          className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-400 rounded-full hover:bg-blue-100 hover:text-blue-500 transition-colors cursor-pointer"
                        >
                          <i className="ri-scales-line text-sm"></i>
                        </button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <i className="ri-star-fill text-yellow-400 text-sm mr-1"></i>
                          <span className="text-sm font-medium">{professional.rating}</span>
                          <span className="text-xs text-gray-500 ml-1">({professional.reviews})</span>
                        </div>
                        <div
                          className={`px-2 py-1 rounded-full text-xs font-medium ${professional.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                        >
                          {professional.availability}
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-lg font-bold text-[#1F3D3A]">${professional.hourlyRate}/hour</div>
                        <div className="text-xs text-gray-500">
                          <i className="ri-time-line mr-1"></i>
                          {professional.responseTime}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          <i className="ri-folder-line mr-1"></i>
                          {professional.projectsCompleted} projects
                        </span>
                        <span>
                          <i className="ri-check-line mr-1"></i>
                          {professional.completionRate}% success
                        </span>
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${professional.level === 'Expert' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}
                        >
                          {professional.level}
                        </span>
                        <span className="text-xs text-gray-500">{professional.experience}</span>
                      </div>
                      {professional.badges && professional.badges.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {professional.badges.slice(0, 2).map((badge, index) => (
                            <span key={index} className="px-2 py-0.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                              {badge}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mb-6">
                      <div className="flex flex-wrap gap-2">
                        {professional.skills.slice(0, 4).map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            {skill}
                          </span>
                        ))}
                        {professional.skills.length > 4 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                            +{professional.skills.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => setSelectedProfessional(professional)}
                        className="flex-1 bg-[#1F3D3A] text-white py-2 px-4 rounded-full text-sm font-medium hover:bg-[#2a5248] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => {
                          setSelectedContactPro(professional);
                          setShowContactModal(true);
                        }}
                        className="flex-1 border border-[#1F3D3A] text-[#1F3D3A] py-2 px-4 rounded-full hover:bg-[#1F3D3A] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProfessionals.map((professional) => (
                  <div key={professional.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-start gap-6">
                      <div
                        className="w-24 h-24 rounded-full bg-gray-200 flex-shrink-0"
                        style={{
                          backgroundImage: `url(${professional.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      ></div>
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <div className="flex items-center mb-2">
                              <h3 className="text-xl font-bold text-[#1F3D3A]">{professional.name}</h3>
                              {professional.certified && (
                                <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full">
                                  <i className="ri-shield-check-fill text-sm text-green-600"></i>
                                </div>
                              )}
                              <span
                                className={`ml-3 px-3 py-1 rounded-full text-xs font-medium ${professional.level === 'Expert' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}
                              >
                                {professional.level}
                              </span>
                              {professional.badges && professional.badges.slice(0, 2).map((badge, index) => (
                                <span key={index} className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                                  {badge}
                                </span>
                              ))}
                            </div>
                            <p className="text-gray-600">{professional.title}</p>
                            <p className="text-gray-500 text-sm">{professional.location} • {professional.experience}</p>
                            <p className="text-gray-700 text-sm mb-4">{professional.bio}</p>
                            {professional.specializations && (
                              <div className="mb-3">
                                <span className="text-sm font-medium text-gray-700 mr-2">Specializations:</span>
                                {professional.specializations.map((spec, index) => (
                                  <span key={index} className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs mr-2 mb-1">
                                    {spec}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="text-2xl font-bold text-[#1F3D3A]">${professional.hourlyRate}/hour</div>
                            <div
                              className={`px-3 py-1 rounded-full text-xs mb-2 inline-block ${professional.availability === 'Available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                            >
                              {professional.availability}
                            </div>
                            <div className="text-xs text-gray-500 mb-2">
                              <i className="ri-time-line mr-1"></i>
                              {professional.responseTime}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                          <div className="flex items-center">
                            <i className="ri-star-fill text-yellow-400 mr-1"></i>
                            <span className="text-sm font-medium">{professional.rating}</span>
                            <span className="text-gray-500 text-sm ml-1">({professional.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-folder-line text-gray-400 mr-1"></i>
                            <span className="text-sm text-gray-600">{professional.projectsCompleted} projects</span>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-check-line text-green-500 mr-1"></i>
                            <span className="text-sm text-gray-600">{professional.completionRate}% success</span>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-money-dollar-circle-line text-purple-500 mr-1"></i>
                            <span className="text-sm text-gray-600">${(professional.totalEarnings / 1000).toFixed(0)}k earned</span>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-award-line text-orange-500 mr-1"></i>
                            <span className="text-sm text-gray-600">{professional.clientSatisfaction}% satisfaction</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {professional.skills.slice(0, 6).map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              {skill}
                            </span>
                          ))}
                          {professional.skills.length > 6 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                              +{professional.skills.length - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 flex-shrink-0">
                      <button
                        onClick={() => setSelectedProfessional(professional)}
                        className="flex-1 bg-[#1F3D3A] text-white py-2 px-6 rounded-full text-sm font-medium hover:bg-[#2a5248] transition-colors whitespace-nowrap cursor-pointer"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => {
                          setSelectedContactPro(professional);
                          setShowContactModal(true);
                        }}
                        className="flex-1 border border-[#1F3D3A] text-[#1F3D3A] py-2 px-6 rounded-full hover:bg-[#1F3D3A] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                      >
                        Contact
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {filteredProfessionals.length === 0 && (
            <div className="text-center py-12">
              <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No professionals found</h3>
              <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setActiveCategory('all');
                  setSearchTerm('');
                  setPriceRange('all');
                  setAvailabilityFilter('all');
                  setExperienceFilter('all');
                  setCertificationFilter('all');
                  setLocationFilter('all');
                  setIndustryFilter('all');
                  setLanguageFilter('all');
                  setProjectTypeFilter('all');
                }}
                className="bg-[#1F3D3A] text-white px-6 py-2 rounded-full hover:bg-[#2a5248] transition-colors cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
      {showComparisonModal && comparedProfessionals.length > 0 && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl max-h-[90vh] overflow-y-auto w-full">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1F3D3A]">Compare Professionals</h2>
                <button
                  onClick={() => setShowComparisonModal(false)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold text-gray-800">Professional</th>
                      {comparedProfessionals.map((pro) => (
                        <th key={pro.id} className="text-center p-4 min-w-[200px]">
                          <div className="flex flex-col items-center">
                            <div
                              className="w-16 h-16 rounded-full bg-gray-200 mb-2"
                              style={{
                                backgroundImage: `url('${pro.image}')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                              }}
                            ></div>
                            <h3 className="font-bold text-[#1F3D3A]">{pro.name}</h3>
                            <p className="text-sm text-gray-600">{pro.title}</p>
                            <button
                              onClick={() => removeFromComparison(pro.id)}
                              className="mt-2 text-red-500 hover:text-red-700 cursor-pointer text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
{ label: 'Hourly Rate', key: 'hourlyRate', format: (val: any) => `$${val}/hr` },
                      { label: 'Rating', key: 'rating', format: (val:any) => `$${val} ★` },
                      { label: 'Reviews', key: 'reviews', format: (val:any) => `${val} reviews` },
                      { label: 'Projects Completed', key: 'projectsCompleted', format: (val:any) => `${val} projects` },
                      { label: 'Success Rate', key: 'completionRate', format: (val:any) => `$${val}%` },
                      { label: 'Response Time', key: 'responseTime', format: (val:any) => val },
                      { label: 'Experience', key: 'experience', format: (val:any)=> val },
                      { label: 'Location', key: 'location', format:(val:any) => val },
                      { label: 'Availability', key: 'availability', format: (val:any) => val }
                    ].map((row) => (
                      <tr key={row.key} className="border-b hover:bg-gray-50">
                        <td className="p-4 font-medium text-gray-700">{row.label}</td>
                        {comparedProfessionals.map((pro) => (
                          <td key={pro.id} className="p-4 text-center">
                            {row.format(pro[row.key])}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr>
                      <td className="p-4 font-medium text-gray-700">Top Skills</td>
                      {comparedProfessionals.map((pro) => (
                        <td key={pro.id} className="p-4">
                          <div className="flex flex-wrap gap-1 justify-center">
                            {pro.skills.slice(0, 3).map((skill :any, index:any) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-4 font-medium text-gray-700">Actions</td>
                      {comparedProfessionals.map((pro) => (
                        <td key={pro.id} className="p-4">
                          <div className="flex flex-col gap-2">
                            <button
                              onClick={() => setSelectedProfessional(pro)}
                              className="bg-[#1F3D3A] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#2a5248] transition-colors cursor-pointer"
                            >
                              View Profile
                            </button>
                            <button
                              onClick={() => {
                                setSelectedContactPro(pro);
                                setShowContactModal(true);
                              }}
                              className="border border-[#1F3D3A] text-[#1F3D3A] py-2 px-4 rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer"
                            >
                              Contact
                            </button>
                          </div>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
      {showTeamBuilder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-[#1F3D3A] mb-2">AI Team Builder</h2>
                  <p className="text-gray-600">Build your perfect team with AI-powered matching based on project requirements</p>
                  {teamBuilderStep <= 3 && (
                    <div className="flex items-center mt-4">
                      <span className="text-sm text-gray-500 mr-3">Step {teamBuilderStep} of 3</span>
                      <div className="w-64 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#1F3D3A] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(teamBuilderStep / 3) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setShowTeamBuilder(false)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              {teamBuilderStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#1F3D3A] mb-4">Project Basics</h3>
                    <p className="text-gray-600 mb-8">Tell us about your project so we can recommend the perfect team</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Project Type</label>
                        <div className="space-y-3">
                          {projectTypes.map((type) => (
                            <div
                              key={type.id}
                              onClick={() => setTeamBuilderData((prev) => ({ ...prev, projectType: type.id }))}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${teamBuilderData.projectType === type.id ? 'border-[#1F3D3A] bg-[#1F3D3A]/5' : 'border-gray-200 hover:border-[#1F3D3A]/50'}`}
                            >
                              <h4 className="font-semibold text-[#1F3D3A] mb-2">{type.name}</h4>
                              <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                              <div className="flex flex-wrap gap-1">
                                {type.skills.map((skill, index) => (
                                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Budget Range</label>
                        <div className="space-y-3">
                          {budgetRanges.map((budget) => (
                            <div
                              key={budget.id}
                              onClick={() => setTeamBuilderData((prev) => ({ ...prev, budget: budget.id }))}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${teamBuilderData.budget === budget.id ? 'border-[#1F3D3A] bg-[#1F3D3A]/5' : 'border-gray-200 hover:border-[#1F3D3A]/50'}`}
                            >
                              <h4 className="font-semibold text-[#1F3D3A] mb-1">{budget.name}</h4>
                              <p className="text-sm text-gray-600">{budget.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Timeline</label>
                        <div className="space-y-3">
                          {timelineOptions.map((timeline) => (
                            <div
                              key={timeline.id}
                              onClick={() => setTeamBuilderData((prev) => ({ ...prev, timeline: timeline.id }))}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${teamBuilderData.timeline === timeline.id ? 'border-[#1F3D3A] bg-[#1F3D3A]/5' : 'border-gray-200 hover:border-[#1F3D3A]/50'}`}
                            >
                              <h4 className="font-semibold text-[#1F3D3A] mb-1">{timeline.name}</h4>
                              <p className="text-sm text-gray-600">{timeline.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {teamBuilderStep === 2 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#1F3D3A] mb-4">Team Preferences</h3>
                    <p className="text-gray-600 mb-8">Define your ideal team size and required skills</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Preferred Team Size</label>
                        <div className="space-y-3">
                          {teamSizeOptions.map((size) => (
                            <div
                              key={size.id}
                              onClick={() => setTeamBuilderData((prev) => ({ ...prev, teamSize: size.id }))}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${teamBuilderData.teamSize === size.id ? 'border-[#1F3D3A] bg-[#1F3D3A]/5' : 'border-gray-200 hover:border-[#1F3D3A]/50'}`}
                            >
                              <h4 className="font-semibold text-[#1F3D3A] mb-1">{size.name}</h4>
                              <p className="text-sm text-gray-600 mb-1">{size.description}</p>
                              <p className="text-xs text-gray-500">{size.ideal}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Project Complexity</label>
                        <select
                          value={teamBuilderData.complexity}
                          onChange={(e) => setTeamBuilderData((prev) => ({ ...prev, complexity: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select complexity level</option>
                          <option value="simple">Simple - Basic features, standard implementation</option>
                          <option value="moderate">Moderate - Multiple features, some customization</option>
                          <option value="complex">Complex - Advanced features, high customization</option>
                          <option value="enterprise">Enterprise - Mission-critical, scalable solution</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Industry</label>
                        <select
                          value={teamBuilderData.industry}
                          onChange={(e) => setTeamBuilderData((prev) => ({ ...prev, industry: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select industry</option>
                          <option value="technology">Technology</option>
                          <option value="finance">Finance & Banking</option>
                          <option value="healthcare">Healthcare</option>
                          <option value="education">Education</option>
                          <option value="ecommerce">E-commerce</option>
                          <option value="tourism">Tourism</option>
                          <option value="manufacturing">Manufacturing</option>
                          <option value="government">Government</option>
                          <option value="nonprofit">Non-profit</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Required Skills</label>
                        <div className="bg-gray-50 p-4 rounded-lg max-h-60 overflow-y-auto">
                          <div className="grid grid-cols-2 gap-2">
                            {[
                              'React',
                              'Node.js',
                              'Python',
                              'JavaScript',
                              'UI/UX Design',
                              'Digital Marketing',
                              'Data Analysis',
                              'SEO',
                              'Content Writing',
                              'Project Management',
                              'DevOps',
                              'Mobile Development',
                              'E-commerce',
                              'Social Media',
                              'Branding',
                              'Photography',
                              'Video Editing',
                              'Business Strategy',
                              'Financial Analysis',
                              'Legal Consulting'
                            ].map((skill) => (
                              <label key={skill} className="flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={teamBuilderData.requiredSkills.includes(skill)}
                                  onChange={() => handleTeamBuilderSkillToggle(skill)}
                                  className="mr-2 w-4 h-4 text-[#1F3D3A] focus:ring-[#1F3D3A]"
                                />
                                <span className="text-sm text-gray-700">{skill}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Selected: {teamBuilderData.requiredSkills.length} skills
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Project Description</label>
                        <textarea
                          rows={4}
                          value={teamBuilderData.projectDescription}
                          onChange={(e) => setTeamBuilderData((prev) => ({ ...prev, projectDescription: e.target.value }))}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="Describe your project goals, key features, and any specific requirements..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {teamBuilderStep === 3 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#1F3D3A] mb-4">Work Style & Communication</h3>
                    <p className="text-gray-600 mb-8">How do you prefer to work with your team?</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Work Style</label>
                        <div className="space-y-3">
                          {workStyleOptions.map((style) => (
                            <div
                              key={style.id}
                              onClick={() => setTeamBuilderData((prev) => ({ ...prev, workStyle: style.id }))}
                              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${teamBuilderData.workStyle === style.id ? 'border-[#1F3D3A] bg-[#1F3D3A]/5' : 'border-gray-200 hover:border-[#1F3D3A]/50'}`}
                            >
                              <h4 className="font-semibold text-[#1F3D3A] mb-1">{style.name}</h4>
                              <p className="text-sm text-gray-600">{style.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">Communication Preferences</label>
                        <div className="space-y-2">
                          {communicationPrefs.map((pref) => (
                            <label key={pref.id} className="flex items-start cursor-pointer">
                              <input
                                type="checkbox"
                                checked={teamBuilderData.communicationPrefs.includes(pref.id)}
                                onChange={() => handleCommunicationPrefToggle(pref.id)}
                                className="mr-3 mt-1 w-4 h-4 text-[#1F3D3A] focus:ring-[#1F3D3A]"
                              />
                              <div>
                                <div className="font-medium text-gray-800">{pref.name}</div>
                                <div className="text-sm text-gray-600">{pref.description}</div>
                              </div>
                            </label>
                          ))}
                        </div>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-800 mb-2">Team Matching Summary</h4>
                        <div className="text-sm text-blue-700 space-y-1">
                          <p>
                            • Project: {projectTypes.find((p) => p.id === teamBuilderData.projectType)?.name || 'Not selected'}
                          </p>
                          <p>
                            • Budget: {budgetRanges.find((b) => b.id === teamBuilderData.budget)?.name || 'Not selected'}
                          </p>
                          <p>
                            • Timeline: {timelineOptions.find((t) => t.id === teamBuilderData.timeline)?.name || 'Not selected'}
                          </p>
                          <p>
                            • Team Size: {teamSizeOptions.find((s) => s.id === teamBuilderData.teamSize)?.name || 'Not selected'}
                          </p>
                          <p>
                            • Required Skills: {teamBuilderData.requiredSkills.length} selected
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {teamBuilderStep === 4 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#1F3D3A] mb-4">Recommended Teams</h3>
                    <p className="text-gray-600 mb-8">Based on your requirements, here are the perfect teams for your project</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {recommendedTeams.map((team) => (
                      <div key={team.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold text-[#1F3D3A] mb-2">{team.name}</h4>
                            <p className="text-gray-600 text-sm mb-2">{team.teamCulture}</p>
                            <div className="flex items-center space-x-4 text-sm">
                              <div className="flex items-center">
                                <i className="ri-star-fill text-yellow-400 text-sm mr-1"></i>
                                <span className="font-medium">{team.rating}</span>
                              </div>
                              <div className="flex items-center">
                                <i className="ri-check-circle-fill text-green-500 mr-1"></i>
                                <span>{team.successRate}% success</span>
                              </div>
                              <div className="flex items-center">
                                <i className="ri-time-line text-gray-400 mr-1"></i>
                                <span>{team.availability}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#1F3D3A]">${team.totalRate}/hour</div>
                            <div className="text-sm text-gray-500">
                              team rate
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-800 mb-2">Team Members</h5>
                          <div className="flex flex-wrap gap-2">
                            {team.members.map((member:any, index:any) => (
                              <div key={index} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                                <div
                                  className="w-8 h-8 rounded-full bg-gray-200"
                                  style={{
                                    backgroundImage: `url('${member.image}')`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                  }}
                                ></div>
                                <div>
                                  <div className="text-xs font-medium">{member.name}</div>
                                  <div className="text-xs text-gray-500">{member.title.split(' ').pop()}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <h5 className="font-semibold text-gray-800 mb-2">Specialties</h5>
                            <div className="flex flex-wrap gap-1">
                              {team.specialties.map((specialty:any, index:any) => (
                                <span key={index} className="px-2 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded text-xs">
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-800 mb-2">Key Strengths</h5>
                            <div className="flex flex-wrap gap-1">
                              {team.strengths.slice(0, 3).map((strength:any, index:any) => (
                                <span key={index} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                  {strength}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-800 mb-2">Recent Projects</h5>
                          <ul className="text-sm text-gray-600 space-y-1">
                            {team.pastProjects.slice(0, 2).map((project:any, index:any) => (
                              <li key={index}>• {project}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="mb-4">
                          <h5 className="font-semibold text-gray-800 mb-2">Communication</h5>
                          <p className="text-sm text-gray-600">{team.communicationStyle}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            <i className="ri-calendar-line mr-1"></i>
                            Delivery: {team.estimatedDelivery}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => {
                                setSelectedTeam(team);
                                setShowTeamDetails(true);
                              }}
                              className="px-4 py-2 border border-[#1F3D3A] text-[#1F3D3A] rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer"
                            >
                              View Details
                            </button>
                            <button className="px-4 py-2 bg-[#1F3D3A] text-white rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                              Select Team
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-[#1F3D3A] mb-4">
                      <i className="ri-lightbulb-line mr-2"></i>
                      AI Team Matching Insights
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2">Perfect Matches</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• Teams matched based on your specific requirements</li>
                          <li>• Skill alignment with your project needs</li>
                          <li>• Budget and timeline compatibility</li>
                          <li>• Communication style preferences</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-2">Success Factors</h5>
                        <ul className="text-sm text-gray-700 space-y-1">
                          <li>• All teams have 95%+ success rates</li>
                          <li>• Ethiopian professionals with global standards</li>
                          <li>• Proven track record with similar projects</li>
                          <li>• Direct communication in English and Amharic</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                {teamBuilderStep > 1 && teamBuilderStep <= 3 && (
                  <button
                    onClick={handleTeamBuilderPrev}
                    className="px-6 py-3 border border-[#1F3D3A] text-[#1F3D3A] rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer"
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Previous
                  </button>
                )}
                {teamBuilderStep === 4 ? (
                  <div className="flex items-center space-x-4 ml-auto">
                    <button
                      onClick={resetTeamBuilder}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Start Over
                    </button>
                    <Link href="/contact" className="bg-[#1F3D3A] text-white px-6 py-3 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                      Get Team Consultation
                    </Link>
                  </div>
                ) : teamBuilderStep === 3 ? (
                  <button
                    onClick={handleTeamBuilderNext}
                    disabled={
                      isGeneratingTeams ||
                      !teamBuilderData.projectType ||
                      !teamBuilderData.budget ||
                      !teamBuilderData.timeline ||
                      !teamBuilderData.teamSize ||
                      teamBuilderData.requiredSkills.length === 0
                    }
                    className={`ml-auto px-8 py-3 rounded-lg transition-colors cursor-pointer flex items-center ${
                      !isGeneratingTeams &&
                      teamBuilderData.projectType &&
                      teamBuilderData.budget &&
                      teamBuilderData.timeline &&
                      teamBuilderData.teamSize &&
                      teamBuilderData.requiredSkills.length > 0
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isGeneratingTeams ? (
                      <></>
                    ) : (
                      <></>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleTeamBuilderNext}
                    disabled={
                      (teamBuilderStep === 1 && (!teamBuilderData.projectType || !teamBuilderData.budget || !teamBuilderData.timeline)) ||
                      (teamBuilderStep === 2 && (!teamBuilderData.teamSize || teamBuilderData.requiredSkills.length === 0))
                    }
                    className={`ml-auto px-6 py-3 rounded-lg transition-colors cursor-pointer ${
                      (teamBuilderStep === 1 && teamBuilderData.projectType && teamBuilderData.budget && teamBuilderData.timeline) ||
                      (teamBuilderStep === 2 && teamBuilderData.teamSize && teamBuilderData.requiredSkills.length > 0)
                        ? 'bg-[#1F3D3A] text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue
                    <i className="ri-arrow-right-line ml-2"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {showSkillsAssessment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-[#1F3D3A] mb-2">Professional Skills Assessment</h2>
                  <p className="text-gray-600">Discover your market value and get personalized career recommendations</p>
                  {assessmentStep <= 6 && (
                    <div className="flex items-center mt-4">
                      <span className="text-sm text-gray-500 mr-3">Step {assessmentStep} of 6</span>
                      <div className="w-64 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-[#1F3D3A] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(assessmentStep / 6) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setShowSkillsAssessment(false)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>
              {assessmentStep === 1 && (
                <div className="space-y-8">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#1F3D3A] mb-4">What are your core skills?</h3>
                    <p className="text-gray-600 mb-4">Select all skills that you're proficient in. This helps us understand your expertise.</p>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                      <h4 className="font-semibold text-blue-800 mb-2">Assessment Tips:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        {skillsAssessmentTips.slice(0, 2).map((tip, index) => (
                          <li key={index}>• {tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="space-y-8">
                    {skillCategories.map((category, categoryIndex) => (
                      <div key={categoryIndex} className="bg-gray-50 p-6 rounded-xl">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">{category.category}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                          {category.skills.map((skill, skillIndex) => (
                            <button
                              key={skillIndex}
                              onClick={() => handleSkillToggle(skill)}
                              className={`p-3 text-sm rounded-lg border-2 transition-all cursor-pointer ${
                                assessmentData.selectedSkills.includes(skill)
                                  ? 'border-[#1F3D3A] bg-[#1F3D3A] text-white'
                                  : 'border-gray-200 bg-white text-gray-700 hover:border-[#1F3D3A] hover:bg-[#1F3D3A]/5'
                              }`}
                            >
                              {skill}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center text-green-700">
                        <i className="ri-information-line mr-2"></i>
                        <span className="font-medium">Selected Skills: {assessmentData.selectedSkills.length}</span>
                      </div>
                      <div className="text-sm text-green-600">
                        {assessmentData.selectedSkills.length >= 3 ? '✓ Ready to proceed' : `Need ${3 - assessmentData.selectedSkills.length} more skills`}
                      </div>
                    </div>
                    <p className="text-green-600 text-sm">
                      Select at least 3 skills to get accurate recommendations. More skills = better matching!
                    </p>
                    {assessmentData.selectedSkills.length > 0 && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 mb-2">Your selected skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {assessmentData.selectedSkills.map((skill, index) => (
                            <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {assessmentStep === 7 && assessmentResults && (
                <div className="space-y-8">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className="ri-trophy-line text-3xl text-green-600"></i>
                    </div>
                    <h3 className="text-3xl font-bold text-[#1F3D3A] mb-4">Your Professional Analysis</h3>
                    <p className="text-gray-600 mb-8">Comprehensive insights into your skills, market position, and career opportunities.</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1 space-y-6">
                      <div className="bg-gradient-to-br from-[#1F3D3A] to-green-600 text-white p-6 rounded-xl">
                        <h4 className="text-lg font-semibold mb-4">Your Professional Scores</h4>
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span>Skill Proficiency</span>
                              <span className="font-bold">{assessmentResults.skillScore}/100</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div
                                className="bg-white h-2 rounded-full"
                                style={{ width: `${assessmentResults.skillScore}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span>Market Readiness</span>
                              <span className="font-bold">{assessmentResults.marketReadiness}/100</span>
                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div
                                className="bg-white h-2 rounded-full"
                                style={{ width: `${assessmentResults.marketReadiness}%` }}
                              ></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span>Competitive Edge</span>
                              <span className="font-bold">{assessmentResults.skillScore}/100</span>

                            </div>
                            <div className="w-full bg-white/20 rounded-full h-2">
                              <div
                                className="bg-white h-2 rounded-full"
                                style={{ width: `${assessmentResults.skillScore}%` }}

                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 p-6 rounded-xl">
                        <h4 className="text-lg font-semibold text-blue-800 mb-4">Optimal Rate Range</h4>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 mb-2">
                            ${(assessmentResults as any).suggestedHourlyRate.optimal}

                          </div>
                          <div className="text-sm text-blue-700 mb-3">recommended per hour</div>
                          <div className="text-xs text-blue-600">
                            Range: ${assessmentResults.suggestedHourlyRate.min} - ${assessmentResults.suggestedHourlyRate.max}
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-6 rounded-xl">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Market Analysis</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Skill Demand</span>
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{ width: `${(assessmentResults as any).marketAnalysis.demandLevel}%` }}

                                ></div>
                              </div>
                              <span className="text-sm font-medium">{(assessmentResults as any).marketAnalysis.demandLevel}%</span>

                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Competition</span>
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-yellow-500 h-2 rounded-full"
                                 style={{ width: `${(assessmentResults as any).marketAnalysis.competitionLevel}%` }}

                                ></div>
                              </div>
                              <span className="text-sm font-medium">{(assessmentResults as any).marketAnalysis.competitionLevel}%</span>

                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-600">Growth Potential</span>
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full"
                                 style={{ width: `${(assessmentResults as any).marketAnalysis.growthPotential}%` }}

                                ></div>
                              </div>
<span className="text-sm font-medium">{(assessmentResults as any).marketAnalysis.growthPotential}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                      <div className="bg-white border border-gray-200 p-6 rounded-xl">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Your Skill Portfolio</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {assessmentResults.topSkills.map((skill, index) => (
                            <span key={index} className="px-4 py-2 bg-[#1F3D3A] text-white rounded-full text-sm font-medium">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600">
                          Experience Level: <span className="font-medium text-gray-800">{assessmentResults.experienceLevel}</span>
                        </div>
                      </div>
                      <div className="bg-white border border-gray-200 p-6 rounded-xl">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Personalized Career Insights</h4>
                        <div className="space-y-4">
{(assessmentResults as any).personalizedInsights.map((insight: any, index: number) => (
                            <div key={index} className={`border-l-4 p-4 rounded-r-lg ${insight.type === 'strength' ? 'border-green-500 bg-green-50' : insight.type === 'opportunity' ? 'border-blue-500 bg-blue-50' : 'border-purple-500 bg-purple-50'}`}>
                              <div className="flex items-start justify-between mb-2">
                                <h5
                                  className={`font-semibold ${insight.type === 'strength' ? 'text-green-800' : insight.type === 'opportunity' ? 'text-blue-800' : 'text-purple-800'}`}
                                >
                                  {insight.title}
                                </h5>
                                <span
                                  className={`px-2 py-1 rounded text-xs font-medium ${insight.impact === 'High' ? 'bg-red-100 text-red-700' : insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}
                                >
                                  {insight.impact} Impact
                                </span>
                              </div>
                              <p
                                className={`text-sm mb-3 ${insight.type === 'strength' ? 'text-green-700' : insight.type === 'opportunity' ? 'text-blue-700' : 'text-purple-700'}`}
                              >
                                {insight.description}
                              </p>
                              <div
                                className={`text-xs font-medium ${insight.type === 'strength' ? 'text-green-600' : insight.type === 'opportunity' ? 'text-blue-600' : 'text-purple-600'}`}
                              >
                                <i className="ri-arrow-right-line mr-1"></i>
                                {insight.actionable}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {(assessmentResults as any).careerPathways.length > 0 && (

                        <div className="bg-white border border-gray-200 p-6 rounded-xl">
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">Career Pathway Recommendations</h4>
                          <div className="space-y-4">
                            {(assessmentResults as any).careerPathways.map((pathway: any, index: number) => (
                              <div key={index} className="border border-gray-200 p-4 rounded-lg">
                                <div className="flex items-start justify-between mb-2">
                                  <h5 className="font-semibold text-gray-800">{pathway.title}</h5>
                                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                                    {pathway.timeline}
                                  </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">{pathway.description}</p>
                                <div>
                                  <p className="text-xs font-medium text-gray-700 mb-2">Next Steps:</p>
                                  <ul className="text-xs text-gray-600 space-y-1">
                                    {(pathway as any).nextSteps.map((step: any, stepIndex: number) => (

                                      <li key={stepIndex}>• {step}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      <div className="bg-white border border-gray-200 p-6 rounded-xl">
                        <h4 className="text-lg font-semibold text-gray-800 mb-4">Your Action Plan</h4>
                        <div className="space-y-3">
                          {assessmentResults.nextSteps.map((step, index) => (
                            <div key={index} className="flex items-start">
                              <div className="w-8 h-8 bg-[#1F3D3A] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                                {index + 1}
                              </div>
                              <div className="flex-grow">
                                <p className="text-gray-700">{step}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      {assessmentResults.matchingProfessionals.length > 0 && (
                        <div className="bg-white border border-gray-200 p-6 rounded-xl">
                          <h4 className="text-lg font-semibold text-gray-800 mb-4">Professionals with Similar Skills</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {assessmentResults.matchingProfessionals.map((pro) => (
                              <div key={(pro as any).id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex items-center mb-3">
                                  <div
                                    className="w-12 h-12 rounded-full bg-gray-200 mr-3"
                                   style={{
                    backgroundImage: `url('${(pro as any).image ?? pro.profileUrl}')`
                    ,backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}

                                  ></div>
                                  <div>
                                    <div className="font-medium text-gray-800 text-sm">{(pro as any).name}</div>
                                    <div className="text-xs text-gray-600">{(pro as any).title}</div>

                                  </div>
                                </div>
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center">
                                    <i className="ri-star-fill text-yellow-400 text-sm mr-1"></i>
                                    <span className="text-sm font-medium">{pro.rating}</span>
                                  </div>
                                  <span className="text-sm font-bold text-[#1F3D3A]">${pro.hourlyRate}/hr</span>
                                </div>
                                <div className="text-xs text-gray-500">
                                  {(pro as any).projectsCompleted} projects • {(pro as any).completionRate}% success
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
                {assessmentStep > 1 && assessmentStep <= 6 && (
                  <button
                    onClick={handleAssessmentPrev}
                    className="px-6 py-3 border border-[#1F3D3A] text-[#1F3D3A] rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer"
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Previous
                  </button>
                )}
                {assessmentStep === 7 ? (
                  <div className="flex items-center space-x-4 ml-auto">
                    <button
                      onClick={resetAssessment}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Take Again
                    </button>
                    <Link href="/skills/dashboard" className="bg-[#1F3D3A] text-white px-6 py-3 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                      Complete Your Profile
                    </Link>
                  </div>
                ) : assessmentStep === 6 ? (
                  <button
                    onClick={handleAssessmentSubmit}
                    disabled={
                      isSubmittingAssessment ||
                      assessmentData.selectedSkills.length < 3 ||
                      !assessmentData.experienceLevel ||
                      !assessmentData.workPreference ||
                      !assessmentData.availability
                    }
                    className={`ml-auto px-8 py-3 rounded-lg transition-colors cursor-pointer flex items-center ${
                      !isSubmittingAssessment &&
                      assessmentData.selectedSkills.length >= 3 &&
                      assessmentData.experienceLevel &&
                      assessmentData.workPreference &&
                      assessmentData.availability
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isSubmittingAssessment ? (
                      <></>
                    ) : (
                      <></>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={handleAssessmentNext}
                    disabled={
                      (assessmentStep === 1 && assessmentData.selectedSkills.length < 3) ||
                      (assessmentStep === 2 && !assessmentData.experienceLevel) ||
                      (assessmentStep === 3 && !assessmentData.workPreference) ||
                      (assessmentStep === 4 && !assessmentData.availability) ||
                      (assessmentStep === 5 && (!assessmentData.hourlyRate || assessmentData.goals.length === 0))
                    }
                    className={`ml-auto px-6 py-3 rounded-lg transition-colors cursor-pointer ${
                      (assessmentStep === 1 && assessmentData.selectedSkills.length >= 3) ||
                      (assessmentStep === 2 && assessmentData.experienceLevel) ||
                      (assessmentStep === 3 && assessmentData.workPreference) ||
                      (assessmentStep === 4 && assessmentData.availability) ||
                      (assessmentStep === 5 && assessmentData.hourlyRate && assessmentData.goals.length > 0)
                        ? 'bg-[#1F3D3A] text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Next Step
                    <i className="ri-arrow-right-line ml-2"></i>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

