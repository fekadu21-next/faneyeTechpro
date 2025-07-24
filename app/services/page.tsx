
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ServicesPage() {
  const [mounted, setMounted] = useState(false);
  const [activeServiceTabs, setActiveServiceTabs] = useState({});
  const [selectedService, setSelectedService] = useState(null);
  const [comparisonServices, setComparisonServices] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [selectedServiceForStart, setSelectedServiceForStart] = useState(null);
  const [showAIDiagnosisModal, setShowAIDiagnosisModal] = useState(false);
  const [aiDiagnosisStep, setAIDiagnosisStep] = useState(1);
  const [getStartedStep, setGetStartedStep] = useState(1);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState(null);
  const [quoteStep, setQuoteStep] = useState(1);
  const [quoteData, setQuoteData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    projectDescription: '',
    budget: '',
    timeline: '',
    urgency: '',
    specificRequirements: '',
    additionalServices: [],
    deliveryPreference: '',
    preferredMeetingTime: '',
    communicationChannel: '',
    hasWorkedWithConsultants: '',
    biggestChallenge: '',
    successDefinition: '',
    agreeToTerms: false,
    subscribeUpdates: false
  });
  const [aiDiagnosisData, setAIDiagnosisData] = useState({
    businessStage: '',
    revenue: '',
    challenges: [],
    goals: '',
    timeline: '',
  });

  const services = [
    {
      id: 1,
      title: 'Go-To-Market Strategy',
      description: 'Comprehensive market entry strategy development to launch your products with precision and maximize impact while minimizing risk.',
      icon: 'ri-rocket-line',
      complexity: 'advanced',
      duration: '4-6 weeks',
      teamSize: '3-5 experts',
      price: '$8,500',
      category: 'consulting',
      roi: '250-400% within 12 months',
      testimonial: { rating: 5 },
      features: [
        'Market analysis & research',
        'Competitive positioning strategy',
        'Launch planning & execution',
        'Customer acquisition framework',
        'Pricing strategy optimization',
        'Channel partner identification',
        'Risk assessment & mitigation',
        'Performance metrics setup',
      ],
      deliverables: [
        'Go-to-Market Strategy Report',
        'Market Analysis Document',
        'Competitive Positioning Map',
        'Launch Timeline & Roadmap',
        'Customer Acquisition Plan',
        'Pricing Strategy Framework',
        'Partner Identification List',
        'Success Metrics Dashboard',
      ],
      technologies: [
        'Market Research Tools',
        'Analytics Platforms',
        'CRM Systems',
        'Marketing Automation',
        'Business Intelligence',
        'Competitive Analysis Tools',
      ],
    },
    {
      id: 2,
      title: 'Innovation Strategy',
      description: 'Transform your organization with cutting-edge innovation methodologies and future-focused thinking to stay ahead of the competition.',
      icon: 'ri-lightbulb-line',
      complexity: 'advanced',
      duration: '6-8 weeks',
      teamSize: '4-6 strategists',
      price: '$12,000',
      category: 'consulting',
      roi: '300-500% within 18 months',
      testimonial: { rating: 5 },
      features: [
        'Innovation audit & assessment',
        'Future trend analysis',
        'Technology roadmap development',
        'Innovation framework design',
        'R&D strategy planning',
        'Innovation culture building',
        'Ideation process optimization',
        'Innovation metrics tracking',
      ],
      deliverables: [
        'Innovation Strategy Blueprint',
        'Technology Roadmap',
        'Innovation Framework Guide',
        'R&D Investment Plan',
        'Innovation Culture Playbook',
        'Ideation Process Manual',
        'Innovation Metrics Dashboard',
        'Future Trends Report',
      ],
      technologies: [
        'Innovation Management',
        'Trend Analysis Tools',
        'R&D Platforms',
        'Collaboration Software',
        'Innovation Metrics',
        'Future Forecasting',
      ],
    },
    {
      id: 3,
      title: 'Growth Strategy',
      description: 'Scale your business with data-driven growth frameworks tailored to Ethiopian and global markets for sustainable expansion.',
      icon: 'ri-line-chart-line',
      complexity: 'advanced',
      duration: '5-7 weeks',
      teamSize: '3-5 analysts',
      price: '$10,000',
      category: 'consulting',
      roi: '200-350% within 15 months',
      testimonial: { rating: 5 },
      features: [
        'Growth opportunity identification',
        'Market expansion analysis',
        'Revenue optimization strategies',
        'Scaling framework development',
        'Growth metrics design',
        'Resource allocation planning',
        'Performance tracking setup',
        'Growth acceleration tactics',
      ],
      deliverables: [
        'Growth Strategy Document',
        'Market Expansion Plan',
        'Revenue Optimization Guide',
        'Scaling Framework',
        'Growth Metrics System',
        'Resource Allocation Plan',
        'Performance Dashboard',
        'Growth Acceleration Toolkit',
      ],
      technologies: [
        'Growth Analytics',
        'Market Research',
        'Business Intelligence',
        'Performance Tracking',
        'Revenue Analytics',
        'Scaling Platforms',
      ],
    },
    {
      id: 4,
      title: 'Business Development',
      description: 'Build robust business models with clear value propositions and sustainable competitive advantages for long-term success.',
      icon: 'ri-briefcase-line',
      complexity: 'intermediate',
      duration: '4-6 weeks',
      teamSize: '2-4 consultants',
      price: '$7,500',
      category: 'development',
      roi: '180-300% within 12 months',
      testimonial: { rating: 5 },
      features: [
        'Business model design',
        'Value proposition development',
        'Partnership strategy creation',
        'Revenue stream optimization',
        'Market opportunity analysis',
        'Business process improvement',
        'Competitive advantage building',
        'Strategic planning facilitation',
      ],
      deliverables: [
        'Business Model Canvas',
        'Value Proposition Framework',
        'Partnership Strategy Plan',
        'Revenue Stream Analysis',
        'Market Opportunity Report',
        'Process Improvement Guide',
        'Competitive Strategy Document',
        'Strategic Planning Toolkit',
      ],
      technologies: [
        'Business Modeling Tools',
        'Strategic Planning',
        'Partnership Management',
        'Revenue Analytics',
        'Market Analysis',
        'Process Optimization',
      ],
    },
    {
      id: 5,
      title: 'Service Development',
      description: 'Design and optimize service offerings that delight customers and drive business growth through systematic service innovation.',
      icon: 'ri-customer-service-line',
      complexity: 'intermediate',
      duration: '3-5 weeks',
      teamSize: '2-4 designers',
      price: '$6,000',
      category: 'development',
      roi: '150-250% within 10 months',
      testimonial: { rating: 5 },
      features: [
        'Service design methodology',
        'Customer journey mapping',
        'Service blueprint creation',
        'Touchpoint optimization',
        'Service quality framework',
        'Customer experience design',
        'Service delivery optimization',
        'Service innovation planning',
      ],
      deliverables: [
        'Service Design Strategy',
        'Customer Journey Maps',
        'Service Blueprint',
        'Touchpoint Optimization Plan',
        'Service Quality Framework',
        'Customer Experience Guide',
        'Service Delivery Manual',
        'Innovation Roadmap',
      ],
      technologies: [
        'Service Design Tools',
        'Customer Journey Mapping',
        'Experience Analytics',
        'Quality Management',
        'Service Optimization',
        'Innovation Platforms',
      ],
    },
    {
      id: 6,
      title: 'Product Development',
      description: 'From concept to market with comprehensive product development and validation processes ensuring market success.',
      icon: 'ri-product-hunt-line',
      complexity: 'advanced',
      duration: '6-10 weeks',
      teamSize: '4-6 developers',
      price: '$15,000',
      category: 'development',
      roi: '250-400% within 18 months',
      testimonial: { rating: 5 },
      features: [
        'Product concept development',
        'Market validation testing',
        'Product-market fit analysis',
        'Prototyping & testing',
        'User feedback integration',
        'Product roadmap creation',
        'Launch strategy planning',
        'Iterative improvement process',
      ],
      deliverables: [
        'Product Development Plan',
        'Market Validation Report',
        'Product-Market Fit Analysis',
        'Prototype & Testing Results',
        'User Feedback Summary',
        'Product Roadmap',
        'Launch Strategy Document',
        'Improvement Framework',
      ],
      technologies: [
        'Product Development',
        'Validation Tools',
        'Prototyping Software',
        'Testing Platforms',
        'User Research',
        'Product Analytics',
      ],
    },
    {
      id: 7,
      title: 'Digital Strategy Consulting',
      description: 'Comprehensive digital transformation strategy development to optimize your business processes and enhance customer engagement.',
      icon: 'ri-strategy-line',
      complexity: 'advanced',
      duration: '4-6 weeks',
      teamSize: '3-5 experts',
      price: '$9,000',
      category: 'consulting',
      roi: '250-400% within 12 months',
      testimonial: { rating: 5 },
      features: [
        'Digital maturity assessment',
        'Technology roadmap development',
        'Process optimization analysis',
        'Customer journey mapping',
        'Digital transformation planning',
        'Technology stack evaluation',
        'Change management strategy',
        'Digital performance metrics',
      ],
      deliverables: [
        'Digital Strategy Report',
        'Technology Roadmap Document',
        'Process Optimization Plan',
        'Customer Journey Maps',
        'Transformation Timeline',
        'Technology Stack Analysis',
        'Change Management Guide',
        'Digital Metrics Dashboard',
      ],
      technologies: [
        'Digital Analytics',
        'CRM Systems',
        'Marketing Automation',
        'Cloud Platforms',
        'Business Intelligence',
        'Workflow Management',
      ],
    },
    {
      id: 8,
      title: 'Digital Marketing Automation',
      description: 'Complete marketing automation system with email campaigns, social media management, and lead nurturing for maximum ROI.',
      icon: 'ri-mail-send-line',
      complexity: 'intermediate',
      duration: '4-6 weeks',
      teamSize: '2-3 marketers',
      price: '$6,500',
      category: 'marketing',
      roi: '300-500% within 6 months',
      testimonial: { rating: 5 },
      features: [
        'Email campaign automation',
        'Lead scoring & nurturing',
        'Social media scheduling',
        'Customer segmentation',
        'A/B testing framework',
        'Analytics & reporting',
        'CRM integration',
        'Multi-channel campaigns',
      ],
      deliverables: [
        'Marketing Automation Platform',
        'Email Campaign Templates',
        'Lead Scoring System',
        'Social Media Calendar',
        'Analytics Dashboard',
        'CRM Integration Setup',
        'Campaign Performance Reports',
        'Training & Support Materials',
      ],
      technologies: [
        'HubSpot/Marketo',
        'Mailchimp',
        'Hootsuite',
        'Google Analytics',
        'Salesforce',
        'Zapier',
        'Facebook Ads API',
        'Google Ads API',
      ],
    },
    {
      id: 9,
      title: 'AI-Powered Business Intelligence',
      description: 'Advanced artificial intelligence solutions for data analysis, predictive modeling, and automated business insights.',
      icon: 'ri-ai-generate',
      complexity: 'advanced',
      duration: '3-6 weeks',
      teamSize: '3-4 AI specialists',
      price: '$11,000',
      category: 'ai',
      roi: '300-600% within 12 months',
      testimonial: { rating: 5 },
      features: [
        'AI-powered data analytics',
        'Predictive business modeling',
        'Automated reporting systems',
        'Machine learning implementation',
        'Natural language processing',
        'Computer vision solutions',
        'Intelligent automation',
        'AI strategy development',
      ],
      deliverables: [
        'AI Implementation Plan',
        'Custom AI Models',
        'Data Analytics Dashboard',
        'Predictive Analytics System',
        'AI Training Materials',
        'Performance Monitoring Tools',
        'Integration Documentation',
        'AI Maintenance Guide',
      ],
      technologies: [
        'TensorFlow/PyTorch',
        'Azure AI/AWS AI',
        'Python/R',
        'Big Data Analytics',
        'Machine Learning',
        'Natural Language Processing',
      ],
    },
    {
      id: 10,
      title: 'AI Process Automation',
      description: 'Streamline business operations with intelligent automation solutions that reduce costs and increase efficiency.',
      icon: 'ri-robot-line',
      complexity: 'intermediate',
      duration: '4-8 weeks',
      teamSize: '2-4 automation experts',
      price: '$8,500',
      category: 'ai',
      roi: '250-450% within 8 months',
      testimonial: { rating: 5 },
      features: [
        'Process automation analysis',
        'Workflow optimization',
        'Robotic process automation',
        'AI-driven decision making',
        'Intelligent document processing',
        'Automated quality control',
        'Performance monitoring',
        'Continuous improvement',
      ],
      deliverables: [
        'Process Automation Plan',
        'Workflow Automation Tools',
        'RPA Implementation',
        'AI Decision Systems',
        'Quality Control Framework',
        'Performance Dashboards',
        'Training Documentation',
        'Support & Maintenance',
      ],
      technologies: [
        'UiPath/Automation Anywhere',
        'Microsoft Power Automate',
        'Zapier/Integromat',
        'API Integration',
        'Business Process Management',
        'Workflow Automation',
      ],
    },
    {
      id: 11,
      title: 'AI Customer Experience',
      description: 'Enhance customer interactions with AI-powered chatbots, personalization engines, and intelligent customer service solutions.',
      icon: 'ri-customer-service-2-line',
      complexity: 'intermediate',
      duration: '5-7 weeks',
      teamSize: '3-5 CX specialists',
      price: '$9,500',
      category: 'ai',
      roi: '200-400% within 10 months',
      testimonial: { rating: 5 },
      features: [
        'AI chatbot development',
        'Personalization engines',
        'Customer behavior analysis',
        'Sentiment analysis',
        'Predictive customer service',
        'Automated support systems',
        'Customer journey optimization',
        'Voice assistant integration',
      ],
      deliverables: [
        'AI Chatbot System',
        'Personalization Platform',
        'Customer Analytics Dashboard',
        'Sentiment Analysis Tools',
        'Support Automation System',
        'Journey Optimization Plan',
        'Voice Assistant Integration',
        'Customer Success Metrics',
      ],
      technologies: [
        'Dialogflow/Rasa',
        'Natural Language Processing',
        'Machine Learning',
        'Customer Analytics',
        'Voice Recognition',
        'Sentiment Analysis',
      ],
    },
    {
      id: 12,
      title: 'AI Business Diagnosis',
      description: 'Comprehensive AI-powered analysis of your business to identify opportunities, challenges, and strategic recommendations.',
      icon: 'ri-ai-generate',
      complexity: 'advanced',
      duration: '2-4 weeks',
      teamSize: '2-3 AI analysts',
      price: '$6,000',
      category: 'ai',
      roi: '400-800% within 6 months',
      testimonial: { rating: 5 },
      features: [
        'Comprehensive business analysis',
        'AI-powered opportunity detection',
        'Strategic recommendation engine',
        'Market positioning assessment',
        'Competitive intelligence analysis',
        'Growth potential evaluation',
        'Risk assessment framework',
        'Personalized action roadmap',
      ],
      deliverables: [
        'AI Business Analysis Report',
        'Strategic Recommendations',
        'Opportunity Assessment',
        'Risk Analysis Document',
        'Personalized Action Plan',
        'Market Positioning Strategy',
        'Growth Roadmap',
        'Implementation Timeline',
      ],
      technologies: [
        'Machine Learning',
        'Business Intelligence',
        'Data Analytics',
        'Predictive Modeling',
        'Natural Language Processing',
        'Strategic Planning AI',
      ],
    },
  ];

  const aiDiagnosisQuestions = [
    {
      id: 'businessStage',
      question: 'What stage is your business currently in?',
      options: [
        { value: 'startup', label: 'Startup/Idea Stage' },
        { value: 'early', label: 'Early Stage' },
        { value: 'growth', label: 'Growth Stage' },
        { value: 'mature', label: 'Mature/Established' },
        { value: 'scaling', label: 'Scaling/Expansion' },
      ],
    },
    {
      id: 'revenue',
      question: 'What is your current annual revenue?',
      options: [
        { value: 'pre-revenue', label: 'Pre-revenue' },
        { value: 'under-100k', label: 'Under $100K' },
        { value: '100k-500k', label: '$100K - $500K' },
        { value: '500k-1m', label: '$500K - $1M' },
        { value: 'over-1m', label: 'Over $1M' },
      ],
    },
    {
      id: 'challenges',
      question: 'What are your primary business challenges? (Select all that apply)',
      multiple: true,
      options: [
        { value: 'customer-acquisition', label: 'Customer Acquisition' },
        { value: 'revenue-growth', label: 'Revenue Growth' },
        { value: 'operational-efficiency', label: 'Operational Efficiency' },
        { value: 'market-competition', label: 'Market Competition' },
        { value: 'technology-adoption', label: 'Technology Adoption' },
        { value: 'team-scaling', label: 'Team Scaling' },
        { value: 'financial-management', label: 'Financial Management' },
        { value: 'strategic-planning', label: 'Strategic Planning' },
      ],
    },
    {
      id: 'goals',
      question: 'What is your primary business goal for the next 12 months?',
      options: [
        { value: 'launch-product', label: 'Launch New Product/Service' },
        { value: 'expand-market', label: 'Expand to New Markets' },
        { value: 'increase-revenue', label: 'Increase Revenue by 50%+' },
        { value: 'improve-operations', label: 'Improve Operations' },
        { value: 'scale-team', label: 'Scale Team & Infrastructure' },
      ],
    },
    {
      id: 'timeline',
      question: 'When do you want to start implementing solutions?',
      options: [
        { value: 'immediately', label: 'Immediately' },
        { value: 'within-month', label: 'Within 1 Month' },
        { value: 'within-quarter', label: 'Within 3 Months' },
        { value: 'within-6months', label: 'Within 6 Months' },
        { value: 'exploring', label: 'Just Exploring Options' },
      ],
    },
  ];

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000+',
    'Need guidance on budget'
  ];

  const timelineOptions = [
    'ASAP (Rush project)',
    'Within 1 month',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    'Flexible timeline'
  ];

  const urgencyLevels = [
    'Critical - Need immediate attention',
    'High - Important for business',
    'Medium - Part of planned initiatives',
    'Low - Future consideration'
  ];

  const additionalServiceOptions = [
    'Training & Knowledge Transfer',
    'Ongoing Support & Maintenance',
    'Implementation Assistance',
    'Performance Monitoring',
    'Team Augmentation',
    'Technology Integration',
    'Change Management',
    'Quality Assurance'
  ];

  const deliveryPreferences = [
    'Regular milestone reviews',
    'Weekly progress updates',
    'Final delivery only',
    'Collaborative working sessions',
    'Hybrid approach'
  ];

  const communicationChannels = [
    'Email',
    'Video calls (Zoom/Teams)',
    'Phone calls',
    'In-person meetings',
    'Slack/Teams chat',
    'Project management tools'
  ];

  const filteredServices = activeFilter === 'all' ? services : services.filter((service) => service.category === activeFilter);

  const addToComparison = (service) => {
    if (comparisonServices.length < 3 && !comparisonServices.find((s) => s.id === service.id)) {
      setComparisonServices([...comparisonServices, service]);
    }
  };

  const handleGetStarted = (service) => {
    setSelectedServiceForStart(service);
    setShowGetStartedModal(true);
    setGetStartedStep(1);
  };

  const handleGetQuote = (service) => {
    if (!mounted) return;

    setSelectedServiceForQuote(service);
    setShowQuoteModal(true);
    setQuoteStep(1);

    try {
      const serviceData = {
        id: service.id,
        title: service.title,
        price: service.price,
        duration: service.duration,
        category: service.category,
        description: service.description,
        features: service.features,
        deliverables: service.deliverables,
        technologies: service.technologies,
        roi: service.roi,
        teamSize: service.teamSize,
        complexity: service.complexity,
        timestamp: new Date().toISOString(),
        action: 'quote',
      };

      localStorage.setItem('selectedService', JSON.stringify(serviceData));
    } catch (error) {
      console.error('Error storing service data:', error);
    }
  };

  const handleQuoteFormSubmit = async (e) => {
    e.preventDefault();
    if (!mounted) return;

    try {
      const quoteSubmissionData = {
        serviceId: selectedServiceForQuote.id,
        serviceName: selectedServiceForQuote.title,
        servicePrice: selectedServiceForQuote.price,
        serviceDuration: selectedServiceForQuote.duration,
        serviceCategory: selectedServiceForQuote.category,

        fullName: quoteData.fullName,
        email: quoteData.email,
        phone: quoteData.phone,
        company: quoteData.company,
        jobTitle: quoteData.jobTitle,

        projectDescription: quoteData.projectDescription,
        budget: quoteData.budget,
        timeline: quoteData.timeline,
        urgency: quoteData.urgency,

        specificRequirements: quoteData.specificRequirements,
        additionalServices: quoteData.additionalServices.join(', '),
        deliveryPreference: quoteData.deliveryPreference,

        preferredMeetingTime: quoteData.preferredMeetingTime,
        communicationChannel: quoteData.communicationChannel,

        hasWorkedWithConsultants: quoteData.hasWorkedWithConsultants,
        biggestChallenge: quoteData.biggestChallenge,
        successDefinition: quoteData.successDefinition,

        submissionDate: new Date().toISOString(),
        quoteStatus: 'pending',
        agreeToTerms: quoteData.agreeToTerms ? 'Yes' : 'No',
        subscribeUpdates: quoteData.subscribeUpdates ? 'Yes' : 'No'
      };

      localStorage.setItem('quoteRequest', JSON.stringify(quoteSubmissionData));

      window.location.href = `/business-registration?service=${selectedServiceForQuote.id}&action=quote&category=${selectedServiceForQuote.category}&step=quote`;

    } catch (error) {
      console.error('Error submitting quote request:', error);
      alert('There was an error submitting your quote request. Please try again.');
    }
  };

  const handleQuoteDataUpdate = (field, value) => {
    if (!mounted) return;

    setQuoteData(prev => {
      if (field === 'additionalServices') {
        const currentServices = prev.additionalServices || [];
        const newServices = currentServices.includes(value)
          ? currentServices.filter(s => s !== value)
          : [...currentServices, value];
        return { ...prev, additionalServices: newServices };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleQuoteNext = () => {
    if (!mounted) return;
    if (quoteStep < 4) {
      setQuoteStep(quoteStep + 1);
    }
  };

  const handleQuotePrev = () => {
    if (!mounted) return;
    if (quoteStep > 1) {
      setQuoteStep(quoteStep - 1);
    }
  };

  const isQuoteStepValid = (step) => {
    if (!mounted) return false;

    switch (step) {
      case 1:
        return quoteData.fullName && quoteData.email && quoteData.company;
      case 2:
        return quoteData.projectDescription && quoteData.budget && quoteData.timeline;
      case 3:
        return quoteData.biggestChallenge && quoteData.successDefinition;
      case 4:
        return quoteData.agreeToTerms;
      default:
        return true;
    }
  };

  const handleAIDiagnosisClick = () => {
    if (!mounted) return;
    setShowAIDiagnosisModal(true);
    setAIDiagnosisStep(1);
  };

  const handleAIDiagnosisResponse = (questionId, value) => {
    if (!mounted) return;

    setAIDiagnosisData((prev) => {
      const question = aiDiagnosisQuestions.find((q) => q.id === questionId);
      if (question?.multiple) {
        const currentValues = prev[questionId] || [];
        const newValues = currentValues.includes(value) ? currentValues.filter((v) => v !== value) : [...currentValues, value];
        return { ...prev, [questionId]: newValues };
      } else {
        return { ...prev, [questionId]: value };
      }
    });
  };

  const handleAIDiagnosisNext = () => {
    if (!mounted) return;

    if (aiDiagnosisStep < aiDiagnosisQuestions.length) {
      setAIDiagnosisStep(aiDiagnosisStep + 1);
    } else {
      try {
        const queryParams = new URLSearchParams({
          stage: aiDiagnosisData.businessStage,
          revenue: aiDiagnosisData.revenue,
          challenges: Array.isArray(aiDiagnosisData.challenges) ? aiDiagnosisData.challenges.join(', ') : aiDiagnosisData.challenges,
          goals: aiDiagnosisData.goals,
          timeline: aiDiagnosisData.timeline,
        }).toString();

        window.location.href = `/ai-diagnosis?${queryParams}`;
      } catch (error) {
        console.error('Error handling AI diagnosis:', error);
        window.location.href = '/ai-diagnosis';
      }
    }
  };

  const handleAIDiagnosisPrev = () => {
    if (!mounted) return;

    if (aiDiagnosisStep > 1) {
      setAIDiagnosisStep(aiDiagnosisStep - 1);
    }
  };

  const getCurrentAIQuestion = () => {
    return aiDiagnosisQuestions[aiDiagnosisStep - 1];
  };

  const isAIQuestionAnswered = (question) => {
    if (!mounted) return false;

    const answer = aiDiagnosisData[question.id];
    if (question.multiple) {
      return Array.isArray(answer) && answer.length > 0;
    }
    return answer && answer.length > 0;
  };

  const handleQuickStart = (service) => {
    if (!mounted) return;

    try {
      localStorage.setItem(
        'selectedService',
        JSON.stringify({
          id: service.id,
          title: service.title,
          price: service.price,
          duration: service.duration,
          category: service.category,
        }),
      );

      window.location.href = `/contact?service=${service.id}&action=start`;
    } catch (error) {
      console.error('Error handling quick start:', error);
      window.location.href = '/contact';
    }
  };

  const handleQuickQuote = (service) => {
    if (!mounted) return;

    setSelectedServiceForStart(service);
    setShowGetStartedModal(true);
    setGetStartedStep(1);
  };

  useEffect(() => {
    setMounted(true);
    const initialTabs = {};
    services.forEach((service) => {
      initialTabs[service.id] = 'features';
    });
    setActiveServiceTabs(initialTabs);
  }, []);

  const handleServiceTabChange = (serviceId, tab) => {
    if (!mounted) return;

    setActiveServiceTabs((prev) => ({ ...prev, [serviceId]: tab }));
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3D3A] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading services...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(31, 61, 58, 0.6) 0%, rgba(16, 185, 129, 0.3) 50%, rgba(31, 61, 58, 0.7) 100%), url('https://readdy.ai/api/search-image?query=Modern%20Ethiopian%20business%20consulting%20office%20with%20sophisticated%20meeting%20room%20setup%2C%20professional%20consultants%20presenting%20strategic%20solutions%20to%20clients%2C%20contemporary%20conference%20room%20with%20advanced%20presentation%20technology%2C%20sleek%20glass%20architecture%20with%20natural%20lighting%2C%20collaborative%20workspace%20showing%20business%20analytics%20and%20strategy%20documents%2C%20high-end%20professional%20environment%20with%20diverse%20Ethiopian%20business%20professionals%20engaged%20in%20strategic%20planning%20session&width=1920&height=1080&seq=services-hero-consulting-2024&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F3D3A]/40 via-green-500/20 to-[#1F3D3A]/50"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#1F3D3A]/10 to-[#1F3D3A]/30"></div>

        {/* Brand accent elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-[#1F3D3A]/30 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-300/15 rounded-full blur-lg"></div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-green-500/20 text-green-100 rounded-full text-sm font-medium backdrop-blur-sm border border-green-400/30">
                Professional Services Excellence
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
              Professional Services That Drive Results
            </h1>
            <p className="text-xl mb-8 opacity-90 text-gray-100">
              Transform your business with our comprehensive digital solutions designed for growth and innovation
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Get Started Today
              </Link>
              <Link href="/case-studies" className="border border-white/50 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                View Case Studies
              </Link>
            </div>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {[
                { key: 'all', label: 'All Services' },
                { key: 'consulting', label: 'Consulting' },
                { key: 'development', label: 'Development' },
                { key: 'analytics', label: 'Analytics' },
                { key: 'marketing', label: 'Marketing' },
                { key: 'ai', label: 'AI Services' },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeFilter === filter.key ? 'bg-[#1F3D3A] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
              {filteredServices.map((service) => (
                <div key={service.id} className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <div className="relative p-4 sm:p-8 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-gradient-to-br from-[#1F3D3A] to-green-600 rounded-xl sm:rounded-2xl text-white">
                        <i className={`${service.icon} text-lg sm:text-2xl`}></i>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                            service.complexity === 'basic'
                              ? 'bg-green-100 text-green-700'
                              : service.complexity === 'intermediate'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}
                        >
                          {service.complexity}
                        </span>
                        <button
                          onClick={() => addToComparison(service)}
                          disabled={comparisonServices.length >= 3 || comparisonServices.find((s) => s.id === service.id)}
                          className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Add to comparison"
                        >
                          <i className="ri-scales-line text-gray-600 text-sm sm:text-base"></i>
                        </button>
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#1F3D3A] mb-3 group-hover:text-green-600 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">{service.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 mb-4 sm:mb-6 text-xs sm:text-sm">
                      <div className="flex items-center text-gray-500">
                        <i className="ri-time-line mr-2"></i>
                        {service.duration}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <i className="ri-team-line mr-2"></i>
                        {service.teamSize}
                      </div>
                    </div>
                  </div>

                  <div className="px-4 sm:px-8">
                    <div className="flex overflow-x-auto border-b border-gray-200 mb-4 -mx-2 px-2 sm:mx-0 sm:px-0">
                      {['features', 'deliverables', 'tech'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => handleServiceTabChange(service.id, tab)}
                          className={`flex-shrink-0 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium border-b-2 transition-all duration-300 cursor-pointer whitespace-nowrap relative ${
                            activeServiceTabs[service.id] === tab
                              ? 'border-[#1F3D3A] text-[#1F3D3A] bg-[#1F3D3A]/5'
                              : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-1">
                            <i
                              className={`${tab === 'features' ? 'ri-star-line' : tab === 'deliverables' ? 'ri-file-text-line' : 'ri-code-s-slash-line'} text-sm`}
                            ></i>
                            {tab === 'features' ? 'Features' : tab === 'deliverables' ? 'Deliverables' : 'Technology'}
                          </div>
                          {activeServiceTabs[service.id] === tab && (
                            <div className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-[#1F3D3A] to-green-500 rounded-full"></div>
                          )}
                        </button>
                      ))}
                    </div>

                    <div className="min-h-[160px] sm:min-h-[200px] transition-all duration-300">
                      {activeServiceTabs[service.id] === 'features' && (
                        <div className="animate-fade-in">
                          <div className="flex items-center mb-3">
                            <i className="ri-star-line text-[#1F3D3A] mr-2"></i>
                            <h4 className="font-semibold text-gray-800 text-sm">Key Features</h4>
                          </div>
                          <ul className="space-y-2">
                            {service.features.slice(0, 6).map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start text-gray-600 group/item hover:text-gray-800 transition-colors">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3 mt-2 flex-shrink-0 group-hover/item:bg-green-600"></div>
                                <span className="text-xs sm:text-sm leading-relaxed">{feature}</span>
                              </li>
                            ))}
                            {service.features.length > 6 && (
                              <li className="text-xs sm:text-sm text-gray-500 italic pl-5">
                                +{service.features.length - 6} more advanced features...
                              </li>
                            )}
                          </ul>
                        </div>
                      )}

                      {activeServiceTabs[service.id] === 'deliverables' && (
                        <div className="animate-fade-in">
                          <div className="flex items-center mb-3">
                            <i className="ri-file-text-line text-blue-500 mr-2"></i>
                            <h4 className="font-semibold text-gray-800 text-sm">What You'll Receive</h4>
                          </div>
                          <ul className="space-y-2">
                            {service.deliverables.map((deliverable, deliverableIndex) => (
                              <li key={deliverableIndex} className="flex items-start text-gray-600 group/item hover:text-gray-800 transition-colors">
                                <div className="w-4 h-4 bg-blue-100 rounded flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 group-hover/item:bg-blue-200">
                                  <i className="ri-file-text-line text-blue-500 text-xs"></i>
                                </div>
                                <span className="text-xs sm:text-sm leading-relaxed">{deliverable}</span>
                              </li>
                            ))}
                            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                              <div className="flex items-center text-blue-700 mb-1">
                                <i className="ri-time-line text-sm mr-2"></i>
                                <span className="text-xs font-medium">Delivery Timeline</span>
                              </div>
                              <p className="text-xs text-blue-600">{service.duration} with milestone-based delivery</p>
                            </div>
                          </ul>
                        </div>
                      )}

                      {activeServiceTabs[service.id] === 'tech' && (
                        <div className="animate-fade-in">
                          <div className="flex items-center mb-3">
                            <i className="ri-code-s-slash-line text-purple-500 mr-2"></i>
                            <h4 className="font-semibold text-gray-800 text-sm">Technology Stack</h4>
                          </div>
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {service.technologies.map((tech, techIndex) => (
                              <div key={techIndex} className="flex items-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group/tech">
                                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 flex-shrink-0 group-hover/tech:bg-purple-600"></div>
                                <span className="text-xs text-gray-700 group-hover/tech:text-gray-900">{tech}</span>
                              </div>
                            ))}
                          </div>
                          <div className="space-y-3">
                            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                              <div className="flex items-center text-green-700 mb-1">
                                <i className="ri-trophy-line text-sm mr-2"></i>
                                <span className="text-xs font-medium">Expected ROI</span>
                              </div>
                              <p className="text-xs text-green-600 font-semibold">{service.roi}</p>
                            </div>
                            <div className="p-3 bg-orange-50 rounded-lg border border-orange-100">
                              <div className="flex items-center text-orange-700 mb-1">
                                <i className="ri-shield-check-line text-sm mr-2"></i>
                                <span className="text-xs font-medium">Quality Guarantee</span>
                              </div>
                              <p className="text-xs text-orange-600">100% satisfaction guaranteed with unlimited revisions</p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4 sm:p-8 pt-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
                      <div className="text-xl sm:text-2xl font-bold text-[#1F3D3A] order-2 sm:order-1">{service.price}</div>
                      <div className="flex items-center text-yellow-500 order-1 sm:order-2">
                        {[...Array(service.testimonial.rating)].map((_, i) => (
                          <i key={i} className="ri-star-fill text-lg sm:text-xl"></i>
                        ))}
                        <span className="ml-1 text-sm text-gray-600">({service.testimonial.rating}.0)</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <button
                        onClick={() => service.id === 12 ? handleAIDiagnosisClick() : setSelectedService(service)}
                        className="w-full sm:flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer text-sm font-medium whitespace-nowrap"
                      >
                        <i className="ri-eye-line mr-2"></i>
                        {service.id === 12 ? 'Start Diagnosis' : 'View Details'}
                      </button>
                      <button
                        onClick={() => service.id === 12 ? handleAIDiagnosisClick() : handleGetQuote(service)}
                        className="w-full sm:flex-1 bg-gradient-to-r from-[#1F3D3A] to-green-600 text-white py-3 px-4 rounded-lg hover:from-[#2a5248] hover:to-green-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl cursor-pointer text-sm font-medium text-center whitespace-nowrap relative overflow-hidden group"
                      >
                        <span className="relative z-10 flex items-center justify-center">
                          <i className={`${service.id === 12 ? 'ri-ai-generate' : 'ri-file-text-line'} mr-2`}></i>
                          {service.id === 12 ? 'Begin AI Analysis' : 'Get Quote'}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Quote Request Modal */}
      {showQuoteModal && selectedServiceForQuote && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowQuoteModal(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#1F3D3A] to-green-600 rounded-2xl text-white">
                    <i className={`${selectedServiceForQuote.icon} text-2xl`}></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#1F3D3A]">Request Quote</h2>
                    <p className="text-gray-600">{selectedServiceForQuote.title}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowQuoteModal(false)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Step {quoteStep} of 4</span>
                  <span>{Math.round((quoteStep / 4) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-[#1F3D3A] to-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(quoteStep / 4) * 100}%` }}
                  ></div>
                </div>
              </div>

              <form onSubmit={handleQuoteFormSubmit}>
                {/* Step 1: Contact Information */}
                {quoteStep === 1 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-[#1F3D3A] mb-2">Contact Information</h3>
                      <p className="text-gray-600">Let's start with your basic details</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          required
                          value={quoteData.fullName}
                          onChange={(e) => handleQuoteDataUpdate('fullName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={quoteData.email}
                          onChange={(e) => handleQuoteDataUpdate('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="your.email@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={quoteData.phone}
                          onChange={(e) => handleQuoteDataUpdate('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="+251947017777"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                        <input
                          type="text"
                          required
                          value={quoteData.company}
                          onChange={(e) => handleQuoteDataUpdate('company', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                      <input
                        type="text"
                        value={quoteData.jobTitle}
                        onChange={(e) => handleQuoteDataUpdate('jobTitle', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="Your job title"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Project Details */}
                {quoteStep === 2 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-[#1F3D3A] mb-2">Project Details</h3>
                      <p className="text-gray-600">Tell us about your project requirements</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
                      <textarea
                        required
                        rows="4"
                        value={quoteData.projectDescription}
                        onChange={(e) => handleQuoteDataUpdate('projectDescription', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="Describe your project, goals, and what you hope to achieve..."
                        maxLength="1000"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {quoteData.projectDescription.length}/1000 characters
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range *</label>
                        <select
                          required
                          value={quoteData.budget}
                          onChange={(e) => handleQuoteDataUpdate('budget', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select your budget range</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timeline *</label>
                        <select
                          required
                          value={quoteData.timeline}
                          onChange={(e) => handleQuoteDataUpdate('timeline', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select your timeline</option>
                          {timelineOptions.map((option) => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Urgency</label>
                      <select
                        value={quoteData.urgency}
                        onChange={(e) => handleQuoteDataUpdate('urgency', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                      >
                        <option value="">Select urgency level</option>
                        {urgencyLevels.map((level) => (
                          <option key={level} value={level}>{level}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Additional Services (Optional)</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {additionalServiceOptions.map((service) => (
                          <label key={service} className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={quoteData.additionalServices.includes(service)}
                              onChange={() => handleQuoteDataUpdate('additionalServices', service)}
                              className="w-4 h-4 text-[#1F3D3A] border-gray-300 rounded focus:ring-[#1F3D3A]"
                            />
                            <span className="ml-2 text-sm text-gray-700">{service}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specific Requirements</label>
                      <textarea
                        rows="3"
                        value={quoteData.specificRequirements}
                        onChange={(e) => handleQuoteDataUpdate('specificRequirements', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="Any specific requirements, constraints, or preferences..."
                        maxLength="500"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {quoteData.specificRequirements.length}/500 characters
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Business Context */}
                {quoteStep === 3 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-[#1F3D3A] mb-2">Business Context</h3>
                      <p className="text-gray-600">Help us understand your business better</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">What's your biggest business challenge? *</label>
                      <textarea
                        required
                        rows="4"
                        value={quoteData.biggestChallenge}
                        onChange={(e) => handleQuoteDataUpdate('biggestChallenge', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="Describe the main challenge you're facing that this service will help address..."
                        maxLength="500"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {quoteData.biggestChallenge.length}/500 characters
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">How do you define success for this project? *</label>
                      <textarea
                        required
                        rows="4"
                        value={quoteData.successDefinition}
                        onChange={(e) => handleQuoteDataUpdate('successDefinition', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="What outcomes would make you consider this project a success?"
                        maxLength="500"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {quoteData.successDefinition.length}/500 characters
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Have you worked with consultants before?</label>
                      <select
                        value={quoteData.hasWorkedWithConsultants}
                        onChange={(e) => handleQuoteDataUpdate('hasWorkedWithConsultants', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                      >
                        <option value="">Select an option</option>
                        <option value="yes-positive">Yes, and had positive experiences</option>
                        <option value="yes-mixed">Yes, but experiences were mixed</option>
                        <option value="yes-negative">Yes, but had challenges</option>
                        <option value="no">No, this is my first time</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Communication</label>
                        <select
                          value={quoteData.communicationChannel}
                          onChange={(e) => handleQuoteDataUpdate('communicationChannel', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select preferred method</option>
                          {communicationChannels.map((channel) => (
                            <option key={channel} value={channel}>{channel}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Preference</label>
                        <select
                          value={quoteData.deliveryPreference}
                          onChange={(e) => handleQuoteDataUpdate('deliveryPreference', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select delivery style</option>
                          {deliveryPreferences.map((pref) => (
                            <option key={pref} value={pref}>{pref}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Best Time for Initial Meeting</label>
                      <input
                        type="text"
                        value={quoteData.preferredMeetingTime}
                        onChange={(e) => handleQuoteDataUpdate('preferredMeetingTime', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="e.g., Weekday mornings, Tuesday afternoons, etc."
                      />
                    </div>
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {quoteStep === 4 && (
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold text-[#1F3D3A] mb-2">Review & Submit</h3>
                      <p className="text-gray-600">Please review your information and submit your quote request</p>
                    </div>

                    {/* Quote Summary */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-[#1F3D3A] mb-4">Quote Summary</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Service:</strong> {selectedServiceForQuote.title}
                        </div>
                        <div>
                          <strong>Contact:</strong> {quoteData.fullName}
                        </div>
                        <div>
                          <strong>Company:</strong> {quoteData.company}
                        </div>
                        <div>
                          <strong>Budget:</strong> {quoteData.budget}
                        </div>
                        <div>
                          <strong>Timeline:</strong> {quoteData.timeline}
                        </div>
                        <div>
                          <strong>Urgency:</strong> {quoteData.urgency || 'Not specified'}
                        </div>
                      </div>
                    </div>

                    {/* Service Details */}
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-blue-800 mb-4">Service Details</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <strong>Base Price:</strong> {selectedServiceForQuote.price}
                        </div>
                        <div>
                          <strong>Duration:</strong> {selectedServiceForQuote.duration}
                        </div>
                        <div>
                          <strong>Team Size:</strong> {selectedServiceForQuote.teamSize}
                        </div>
                        <div>
                          <strong>Expected ROI:</strong> {selectedServiceForQuote.roi}
                        </div>
                      </div>
                    </div>

                    {/* Next Steps */}
                    <div className="bg-green-50 p-6 rounded-xl">
                      <h4 className="font-semibold text-green-800 mb-4">What Happens Next?</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex items-center">
                          <i className="ri-check-line text-green-600 mr-3"></i>
                          <span>We'll review your requirements within 24 hours</span>
                        </div>
                        <div className="flex items-center">
                          <i className="ri-check-line text-green-600 mr-3"></i>
                          <span>You'll receive a detailed, personalized quote</span>
                        </div>
                        <div className="flex items-center">
                          <i className="ri-check-line text-green-600 mr-3"></i>
                          <span>We'll schedule a free consultation call</span>
                        </div>
                        <div className="flex items-center">
                          <i className="ri-check-line text-green-600 mr-3"></i>
                          <span>No commitment required until you're ready</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="agreeToTerms"
                          required
                          checked={quoteData.agreeToTerms}
                          onChange={(e) => handleQuoteDataUpdate('agreeToTerms', e.target.checked)}
                          className="w-4 h-4 text-[#1F3D3A] border-gray-300 rounded focus:ring-[#1F3D3A] mt-1"
                        />
                        <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-700">
                          I agree to the <Link href="/terms" className="text-[#1F3D3A] hover:underline">Terms of Service</Link> and{' '}
                          <Link href="/privacy" className="text-[#1F3D3A] hover:underline">Privacy Policy</Link>
                        </label>
                      </div>

                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="subscribeUpdates"
                          checked={quoteData.subscribeUpdates}
                          onChange={(e) => handleQuoteDataUpdate('subscribeUpdates', e.target.checked)}
                          className="w-4 h-4 text-[#1F3D3A] border-gray-300 rounded focus:ring-[#1F3D3A] mt-1"
                        />
                        <label htmlFor="subscribeUpdates" className="ml-3 text-sm text-gray-700">
                          I'd like to receive updates about InHub services and business insights
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleQuotePrev}
                    disabled={quoteStep === 1}
                    className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                      quoteStep === 1
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Previous
                  </button>

                  <div className="flex space-x-2">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`w-3 h-3 rounded-full ${
                          step === quoteStep ? 'bg-[#1F3D3A]' : step < quoteStep ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {quoteStep < 4 ? (
                    <button
                      type="button"
                      onClick={handleQuoteNext}
                      disabled={!isQuoteStepValid(quoteStep)}
                      className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                        isQuoteStepValid(quoteStep)
                          ? 'bg-[#1F3D3A] text-white hover:bg-[#2a5248]'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Next
                      <i className="ri-arrow-right-line ml-2"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isQuoteStepValid(quoteStep)}
                      className={`flex items-center px-8 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                        isQuoteStepValid(quoteStep)
                          ? 'bg-gradient-to-r from-[#1F3D3A] to-green-600 text-white hover:from-[#2a5248] hover:to-green-700'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <i className="ri-send-plane-line mr-2"></i>
                      Submit Quote Request
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* AI Business Diagnosis Modal */}
      {showAIDiagnosisModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAIDiagnosisModal(false)}>
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl text-white">
                    <i className="ri-ai-generate text-2xl"></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#1F3D3A]">AI Business Diagnosis</h2>
                    <p className="text-gray-600">Smart analysis for strategic insights</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAIDiagnosisModal(false)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>Question {aiDiagnosisStep} of {aiDiagnosisQuestions.length}</span>
                  <span>{Math.round((aiDiagnosisStep / aiDiagnosisQuestions.length) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(aiDiagnosisStep / aiDiagnosisQuestions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-[#1F3D3A] mb-6">{getCurrentAIQuestion()?.question}</h3>

                <div className="space-y-3">
                  {getCurrentAIQuestion()?.options.map((option, index) => (
                    <label
                      key={index}
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:border-purple-500 ${
                        getCurrentAIQuestion()?.multiple
                          ? aiDiagnosisData[getCurrentAIQuestion().id] instanceof Array && aiDiagnosisData[getCurrentAIQuestion().id].includes(option.value)
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200'
                          : aiDiagnosisData[getCurrentAIQuestion().id] === option.value
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200'
                      }`}
                    >
                      <input
                        type={getCurrentAIQuestion()?.multiple ? 'checkbox' : 'radio'}
                        name={getCurrentAIQuestion()?.id}
                        value={option.value}
                        onChange={(e) => handleAIDiagnosisResponse(getCurrentAIQuestion().id, e.target.value)}
                        checked={
                          getCurrentAIQuestion()?.multiple
                            ? aiDiagnosisData[getCurrentAIQuestion().id] instanceof Array && aiDiagnosisData[getCurrentAIQuestion().id].includes(option.value)
                            : aiDiagnosisData[getCurrentAIQuestion().id] === option.value
                        }
                        className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="ml-3 text-gray-700 font-medium">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handleAIDiagnosisPrev}
                  disabled={aiDiagnosisStep === 1}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                    aiDiagnosisStep === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <i className="ri-arrow-left-line mr-2"></i>
                  Previous
                </button>

                <div className="flex space-x-2">
                  {Array.from({ length: aiDiagnosisQuestions.length }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i + 1 === aiDiagnosisStep ? 'bg-purple-500' : i + 1 < aiDiagnosisStep ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleAIDiagnosisNext}
                  disabled={!isAIQuestionAnswered(getCurrentAIQuestion())}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer ${
                    isAIQuestionAnswered(getCurrentAIQuestion())
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {aiDiagnosisStep === aiDiagnosisQuestions.length ? 'Complete Analysis' : 'Next'}
                  <i className="ri-arrow-right-line ml-2"></i>
                </button>
              </div>

              {/* AI Features */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <i className="ri-brain-line text-2xl text-blue-600 mb-2"></i>
                    <h4 className="font-semibold text-blue-800 mb-1">AI Analysis</h4>
                    <p className="text-xs text-blue-600">Advanced machine learning insights</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <i className="ri-target-line text-2xl text-green-600 mb-2"></i>
                    <h4 className="font-semibold text-green-800 mb-1">Personalized</h4>
                    <p className="text-xs text-green-600">Tailored to your business needs</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <i className="ri-rocket-line text-2xl text-purple-600 mb-2"></i>
                    <h4 className="font-semibold text-purple-800 mb-1">Actionable</h4>
                    <p className="text-xs text-purple-600">Ready-to-implement strategies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Our Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Our Process</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                A proven methodology that delivers results through strategic thinking and execution excellence
              </p>
            </div>

            {/* Process Timeline */}
            <div className="relative mb-16">
              {/* Progress Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 via-green-500 to-orange-500 transform -translate-y-1/2 hidden lg:block"></div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: '01',
                    title: 'Discovery',
                    description: 'Deep dive into your business, market, and challenges',
                    icon: 'ri-search-eye-line',
                    color: 'from-blue-500 to-blue-600',
                    details: [
                      'Business analysis & audit',
                      'Market research & competitor analysis',
                      'Stakeholder interviews',
                      'Pain point identification',
                      'Opportunity assessment',
                    ],
                    timeline: '1-2 weeks',
                    deliverables: 'Discovery Report, SWOT Analysis',
                  },
                  {
                    step: '02',
                    title: 'Strategy',
                    description: 'Develop tailored solutions and actionable roadmaps',
                    icon: 'ri-lightbulb-line',
                    color: 'from-purple-500 to-purple-600',
                    details: [
                      'Strategic planning & roadmap',
                      'Solution architecture',
                      'Resource allocation',
                      'Timeline development',
                      'Risk assessment',
                    ],
                    timeline: '2-3 weeks',
                    deliverables: 'Strategy Document, Implementation Plan',
                  },
                  {
                    step: '03',
                    title: 'Implementation',
                    description: 'Execute strategies with ongoing support and guidance',
                    icon: 'ri-rocket-line',
                    color: 'from-green-500 to-green-600',
                    details: [
                      'Project execution',
                      'Team coordination',
                      'Quality assurance',
                      'Progress monitoring',
                      'Stakeholder communication',
                    ],
                    timeline: '4-12 weeks',
                    deliverables: 'Project Deliverables, Progress Reports',
                  },
                  {
                    step: '04',
                    title: 'Optimization',
                    description: 'Monitor, measure, and continuously improve performance',
                    icon: 'ri-line-chart-line',
                    color: 'from-orange-500 to-orange-600',
                    details: [
                      'Performance monitoring',
                      'Data analysis & insights',
                      'Continuous improvement',
                      'Feedback integration',
                      'Long-term optimization',
                    ],
                    timeline: 'Ongoing',
                    deliverables: 'Analytics Reports, Optimization Plan',
                  },
                ].map((process, index) => (
                  <div key={index} className="relative group">
                    <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-2xl hover:border-[#1F3D3A]/20 transition-all duration-500 h-full transform hover:-translate-y-2 cursor-pointer">
                      {/* Step Icon */}
                      <div className="relative mb-6">
                        <div
                          className={`w-20 h-20 bg-gradient-to-br ${process.color} rounded-2xl flex items-center justify-center`}
                        >
                          <i className={`${process.icon} text-2xl text-white`}></i>
                        </div>
                        {/* Step Number Badge */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#1F3D3A] text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {process.step}
                        </div>
                      </div>

                      {/* Process Content */}
                      <h3 className="text-2xl font-bold text-[#1F3D3A] mb-3 group-hover:text-green-600 transition-colors">{process.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{process.description}</p>

                      {/* Expandable Details */}
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="font-semibold text-[#1F3D3A] mb-3 flex items-center">
                            <i className="ri-checkbox-circle-line mr-2 text-green-500"></i>
                            Key Activities
                          </h4>
                          <ul className="space-y-2">
                            {process.details.map((detail, detailIndex) => (
                              <li key={detailIndex} className="flex items-start text-sm text-gray-600">
                                <div className="w-2 h-2 bg-[#1F3D3A] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                            <div className="flex items-center">
                              <i className="ri-time-line text-blue-600 mr-2"></i>
                              <span className="text-sm font-medium text-blue-800">Timeline: {process.timeline}</span>
                            </div>
                          </div>
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <div className="flex items-center">
                              <i className="ri-file-text-line text-green-600 mr-2"></i>
                              <span className="text-sm font-medium text-green-800">Deliverables: {process.deliverables}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Hover Effect Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-2xl"></div>
                    </div>

                    {/* Connection Arrow (Desktop Only) */}
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                        <div className="w-8 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400"></div>
                        <div className="w-0 h-0 border-l-4 border-l-gray-400 border-t-2 border-t-transparent border-b-2 border-b-transparent absolute right-0 top-1/2 transform -translate-y-1/2"></div>
                      </div>
                    )}

                    {/* Step Connector Line (Mobile) */}
                    {index < 3 && (
                      <div className="lg:hidden flex justify-center mt-6">
                        <div className="w-0.5 h-8 bg-gradient-to-b from-gray-300 to-gray-400"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Process Statistics */}
            <div className="bg-gradient-to-r from-[#1F3D3A] to-green-600 rounded-3xl p-8 text-white">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-sm opacity-90">Success Rate</div>
                  <div className="text-xs opacity-75">Projects completed successfully</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">30%</div>
                  <div className="text-sm opacity-90">Faster Delivery</div>
                  <div className="text-xs opacity-75">Compared to industry average</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-sm opacity-90">Support Available</div>
                  <div className="text-xs opacity-75">Throughout the process</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">100%</div>
                  <div className="text-sm opacity-90">Client Satisfaction</div>
                  <div className="text-xs opacity-75">Guaranteed results</div>
                </div>
              </div>
            </div>

            {/* Process CTA */}
            <div className="text-center mt-16">
              <h3 className="text-2xl font-bold text-[#1F3D3A] mb-4">Ready to Get Started?</h3>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Let's discuss how our proven process can transform your business and drive exceptional results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-[#1F3D3A] text-white px-8 py-4 rounded-full font-semibold hover:bg-[#2a5248] transition-colors whitespace-nowrap cursor-pointer">
                  Start Your Project
                </Link>
                <Link href="/consultation" className="border-2 border-[#1F3D3A] text-[#1F3D3A] px-8 py-4 rounded-full font-semibold hover:bg-[#1F3D3A] hover:text-white transition-colors whitespace-nowrap cursor-pointer">
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className="ri-shield-check-line text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#1F3D3A] mb-3">100% Satisfaction Guarantee</h3>
                <p className="text-gray-600">We stand behind our work with a complete satisfaction guarantee and unlimited revisions</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className="ri-time-line text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#1F3D3A] mb-3">Fast 24h Response</h3>
                <p className="text-gray-600">Quick turnaround times with dedicated project managers ensuring timely delivery</p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <i className="ri-trophy-line text-3xl text-white"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#1F3D3A] mb-3">150+ Successful Projects</h3>
                <p className="text-gray-600">Proven track record of delivering exceptional results across diverse industries</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Why Choose InHub?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the difference of working with Ethiopia's leading professional services platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                  <i className="ri-user-star-line text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-[#1F3D3A] mb-3">Expert Consultants</h3>
                <p className="text-gray-700 mb-4">
                  Work directly with senior strategists who have transformed 100+ businesses
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    10+ years average experience
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    Industry-specific expertise
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-2"></i>
                    Continuous learning & certification
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                  <i className="ri-line-chart-line text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-[#1F3D3A] mb-3">Proven Results</h3>
                <p className="text-gray-700 mb-4">
                  Average 300% ROI within 12 months of strategy implementation
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    Measurable business outcomes
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    Performance tracking & reporting
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    Success guarantee
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                  <i className="ri-handshake-line text-2xl text-white"></i>
                </div>
                <h3 className="text-xl font-bold text-[#1F3D3A] mb-3">Long-term Partnership</h3>
                <p className="text-gray-700 mb-4">
                  Ongoing support and guidance beyond initial strategy development
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    Dedicated account manager
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    Quarterly strategy reviews
                  </li>
                  <li className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    24/7 support access
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedService(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#1F3D3A] to-green-600 rounded-2xl text-white">
                    <i className={`${selectedService.icon} text-2xl`}></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#1F3D3A]">{selectedService.title}</h2>
                    <p className="text-gray-600">{selectedService.complexity} • {selectedService.duration}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h3 className="font-semibold text-[#1F3D3A] mb-3">Service Overview</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedService.description}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-[#1F3D3A] mb-3">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedService.features.map((feature, index) => (
                        <div key={index} className="flex items-start">
                          <i className="ri-check-line text-green-500 mr-2 mt-0.5"></i>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-[#1F3D3A] mb-3">Deliverables</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedService.deliverables.map((deliverable, index) => (
                        <div key={index} className="flex items-start">
                          <i className="ri-file-text-line text-blue-500 mr-2 mt-0.5"></i>
                          <span className="text-gray-700 text-sm">{deliverable}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-[#1F3D3A] mb-3">Technology Stack</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.technologies.map((tech, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-xl mb-6">
                    <h3 className="font-semibold text-[#1F3D3A] mb-4">Service Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-bold text-[#1F3D3A] text-xl">{selectedService.price}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{selectedService.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Team Size:</span>
                        <span className="font-medium">{selectedService.teamSize}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Expected ROI:</span>
                        <span className="font-medium text-green-600">{selectedService.roi}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          {[...Array(selectedService.testimonial.rating)].map((_, i) => (
                            <i key={i} className="ri-star-fill text-yellow-500 text-sm"></i>
                          ))}
                          <span className="ml-1 text-sm text-gray-600">({selectedService.testimonial.rating}.0)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => {
                        setSelectedService(null);
                        handleGetQuote(selectedService);
                      }}
                      className="w-full bg-gradient-to-r from-[#1F3D3A] to-green-600 text-white py-4 px-6 rounded-lg hover:from-[#2a5248] hover:to-green-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl font-semibold text-center cursor-pointer"
                    >
                      <i className="ri-file-text-line mr-2"></i>
                      Get Quote
                    </button>
                    <button
                      onClick={() => {
                        setSelectedService(null);
                        handleQuickQuote(selectedService);
                      }}
                      className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors font-medium text-center cursor-pointer"
                    >
                      <i className="ri-chat-quote-line mr-2"></i>
                      Quick Quote
                    </button>
                    <Link
                      href="/consultation"
                      className="w-full border border-[#1F3D3A] text-[#1F3D3A] py-3 px-6 rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors font-medium text-center block cursor-pointer"
                    >
                      <i className="ri-calendar-line mr-2"></i>
                      Free Consultation
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Get Started Modal */}
      {showGetStartedModal && selectedServiceForStart && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowGetStartedModal(false)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-[#1F3D3A] to-green-600 rounded-2xl text-white">
                    <i className={`${selectedServiceForStart.icon} text-2xl`}></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-[#1F3D3A]">Get Quote for {selectedServiceForStart.title}</h2>
                    <p className="text-gray-600">Complete your business registration to receive a personalized quote</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowGetStartedModal(false)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              {/* Service Overview */}
              <div className="bg-gradient-to-r from-[#1F3D3A]/5 to-green-500/5 p-6 rounded-xl mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-[#1F3D3A] mb-2">Service Details</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-bold text-[#1F3D3A]">{selectedServiceForStart.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{selectedServiceForStart.duration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Team Size:</span>
                        <span className="font-medium">{selectedServiceForStart.teamSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Expected ROI:</span>
                        <span className="font-medium text-green-600">{selectedServiceForStart.roi}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1F3D3A] mb-2">Key Features</h3>
                    <ul className="space-y-1 text-sm">
                      {selectedServiceForStart.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <i className="ri-check-line text-green-500 mr-2 text-xs"></i>
                          {feature}
                        </li>
                      ))}
                      {selectedServiceForStart.features.length > 4 && (
                        <li className="text-gray-500 text-xs italic">+{selectedServiceForStart.features.length - 4} more features</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Quote Process Steps */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-[#1F3D3A] mb-4">Quote Process</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-medium text-blue-800">Registration</h4>
                      <p className="text-blue-600 text-sm">Complete business profile</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-green-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-medium text-green-800">Analysis</h4>
                      <p className="text-green-600 text-sm">Requirements assessment</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mr-3 text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-medium text-purple-800">Quote</h4>
                      <p className="text-purple-600 text-sm">Personalized proposal</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h3 className="font-semibold text-[#1F3D3A] mb-4">Why Get a Quote?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-3"></i>
                      <span className="text-sm text-gray-700">Personalized pricing based on your needs</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-3"></i>
                      <span className="text-sm text-gray-700">Custom timeline and milestone planning</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-3"></i>
                      <span className="text-sm text-gray-700">No obligation to proceed</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-3"></i>
                      <span className="text-sm text-gray-700">Free consultation included</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-3"></i>
                      <span className="text-sm text-gray-700">Expert team assignment</span>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-check-line text-green-500 mr-3"></i>
                      <span className="text-sm text-gray-700">24-hour response guarantee</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="border-t border-gray-200 pt-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-[#1F3D3A]">150+</div>
                    <div className="text-sm text-gray-600">Projects Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1F3D3A]">98%</div>
                    <div className="text-sm text-gray-600">Client Satisfaction</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-[#1F3D3A]">24h</div>
                    <div className="text-sm text-gray-600">Response Time</div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setShowGetStartedModal(false);
                    handleGetQuote(selectedServiceForStart);
                  }}
                  className="flex-1 bg-gradient-to-r from-[#1F3D3A] to-green-600 text-white py-4 px-6 rounded-lg hover:from-[#2a5248] hover:to-green-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl font-semibold text-center cursor-pointer"
                >
                  <i className="ri-file-text-line mr-2"></i>
                  Get Personalized Quote
                </button>
                <button
                  onClick={() => {
                    setShowGetStartedModal(false);
                    try {
                      localStorage.setItem('selectedService', JSON.stringify(selectedServiceForStart));
                      window.location.href = '/consultation';
                    } catch (error) {
                      window.location.href = '/consultation';
                    }
                  }}
                  className="flex-1 border-2 border-[#1F3D3A] text-[#1F3D3A] py-4 px-6 rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors font-semibold text-center cursor-pointer"
                >
                  <i className="ri-calendar-line mr-2"></i>
                  Schedule Free Consultation
                </button>
              </div>

              {/* Support Information */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Need help? Contact our team at{' '}
                  <a href="mailto:quotes@inhub.et" className="text-[#1F3D3A] hover:underline">
                    quotes@inhub.et
                  </a>{' '}
                  or{' '}
                  <a href="tel:+251947017777" className="text-[#1F3D3A] hover:underline">
                    +251947017777
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Updated CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#1F3D3A] to-green-700">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss how our services can help you achieve your goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-white text-[#1F3D3A] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
                Start Your Project
              </Link>
              <Link href="/consultation" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer">
                Book Free Consultation
              </Link>
              <Link href="/ai-diagnosis" className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors whitespace-nowrap cursor-pointer">
                Start AI Business Diagnosis
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
