
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function DesignPage() {
  const [activePortfolioTab, setActivePortfolioTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    year: '',
    client: '',
    award: false
  });
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonProjects, setComparisonProjects] = useState([]);
  const [activeServiceTab, setActiveServiceTab] = useState(0);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('designFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const portfolioCategories = [
    { id: 'all', name: 'All Projects', count: 12 },
    { id: 'uiux', name: 'UI/UX Design', count: 4 },
    { id: 'branding', name: 'Brand Identity', count: 3 },
    { id: 'industrial', name: 'Industrial Design', count: 2 },
    { id: 'web', name: 'Web Design', count: 2 },
    { id: 'mobile', name: 'Mobile Apps', count: 1 }
  ];

  const projects = [
    {
      id: 1,
      title: 'EthioBank Mobile Banking App',
      category: 'uiux',
      type: 'UI/UX Design',
      client: 'EthioBank',
      year: '2024',
      duration: '4 months',
      teamSize: 6,
      budget: '$45,000',
      status: 'Launched',
      award: true,
      complexity: 'High',
      rating: 4.9,
      downloads: '250K+',
      description: 'Complete redesign of mobile banking experience with focus on Ethiopian user needs and financial behaviors.',
      challenge: 'Create intuitive banking interface for users with varying digital literacy levels while ensuring security and compliance.',
      solution: 'Developed progressive disclosure UI with visual cues, local language support, and simplified transaction flows.',
      results: [
        '85% increase in mobile app adoption',
        '60% reduction in customer support calls',
        '95% user satisfaction rating',
        'Winner of African Mobile Banking Design Award'
      ],
      metrics: {
        userSatisfaction: 95,
        adoptionRate: 85,
        supportReduction: 60,
        performanceScore: 92
      },
      image: 'https://readdy.ai/api/search-image?query=Modern%20Ethiopian%20mobile%20banking%20app%20interface%20design%20showing%20clean%20dashboard%20with%20financial%20transactions%20and%20balance%20information%2C%20professional%20UI%2FUX%20design%20with%20contemporary%20visual%20elements%20and%20user-friendly%20navigation%2C%20smartphone%20mockup%20with%20Ethiopian%20banking%20context&width=600&height=400&seq=design1&orientation=landscape',
      tags: [ 'Mobile Design', 'Fintech', 'User Research', 'Accessibility' ],
      technologies: [ 'React Native', 'Figma', 'Adobe XD', 'UserTesting' ],
      testimonial: {
        text: "InHub Design transformed our mobile banking experience completely. The user adoption rate exceeded all our expectations.",
        author: "Alemayehu Tadesse",
        position: "Head of Digital Banking, EthioBank"
      }
    },
    {
      id: 2,
      title: 'Addis Coffee Brand Identity',
      category: 'branding',
      type: 'Brand Identity',
      client: 'Addis Coffee Co.',
      year: '2024',
      duration: '3 months',
      teamSize: 4,
      budget: '$25,000',
      status: 'Launched',
      award: true,
      complexity: 'Medium',
      rating: 4.8,
      downloads: 'N/A',
      description: 'Complete brand identity system for premium Ethiopian coffee export company targeting international markets.',
      challenge: 'Balance authentic Ethiopian coffee heritage with modern international appeal for global market penetration.',
      solution: 'Created sophisticated brand system celebrating Ethiopian coffee culture with contemporary design language.',
      results: [
        'Successful launch in 15 international markets',
        '200% increase in premium product sales',
        'Featured in International Design Awards',
        'Brand recognition increased by 300%'
      ],
      metrics: {
        brandRecognition: 300,
        salesIncrease: 200,
        marketExpansion: 15,
        designAwards: 3
      },
      image: 'https://readdy.ai/api/search-image?query=Premium%20Ethiopian%20coffee%20brand%20identity%20design%20showing%20elegant%20packaging%2C%20logo%20design%2C%20and%20brand%20materials%20with%20sophisticated%20typography%20and%20Ethiopian%20coffee%20cultural%20elements%2C%20professional%20brand%20identity%20showcase%20with%20coffee%20beans%20and%20modern%20packaging%20design&width=600&height=400&seq=design2&orientation=landscape',
      tags: [ 'Brand Identity', 'Packaging', 'Export', 'Cultural Design' ],
      technologies: [ 'Adobe Illustrator', 'Photoshop', 'InDesign', 'Sketch' ],
      testimonial: {
        text: "The brand identity they created perfectly captures our Ethiopian heritage while appealing to international markets.",
        author: "Meron Girma",
        position: "CEO, Addis Coffee Co."
      }
    },
    {
      id: 3,
      title: 'Smart Agriculture IoT Dashboard',
      category: 'web',
      type: 'Web Design',
      client: 'AgriTech Solutions',
      year: '2024',
      duration: '6 months',
      teamSize: 8,
      budget: '$60,000',
      status: 'Launched',
      award: false,
      complexity: 'High',
      rating: 4.7,
      downloads: 'N/A',
      description: 'Comprehensive web dashboard for IoT-enabled smart farming solutions targeting Ethiopian agricultural sector.',
      challenge: 'Design complex agricultural data visualization that farmers and agronomists can easily understand and act upon.',
      solution: 'Developed intuitive dashboard with real-time monitoring, predictive analytics, and actionable insights.',
      results: [
        '40% improvement in crop management efficiency',
        'Adoption by 500+ commercial farms',
        '25% reduction in water usage',
        'Best AgTech Design Award 2024'
      ],
      metrics: {
        cropManagement: 40,
        adoptionRate: 500,
        waterSavings: 25,
        designAwards: 1
      },
      image: 'https://readdy.ai/api/search-image?query=Modern%20agricultural%20IoT%20dashboard%20interface%20showing%20farm%20monitoring%20data%2C%20charts%2C%20and%20analytics%20on%20laptop%20screen%2C%20clean%20web%20design%20with%20data%20visualization%20for%20smart%20farming%2C%20contemporary%20dashboard%20with%20Ethiopian%20agricultural%20context%20and%20professional%20presentation&width=600&height=400&seq=design3&orientation=landscape',
      tags: [ 'Dashboard Design', 'Data Visualization', 'IoT', 'Agriculture' ],
      technologies: [ 'React', 'Node.js', 'MongoDB', 'D3.js' ],
      testimonial: {
        text: "InHub Design's IoT dashboard has significantly improved our farm's productivity and reduced water waste.",
        author: "Teshome Mengistu",
        position: "Farm Manager, AgriTech Solutions"
      }
    },
    {
      id: 4,
      title: 'Traditional Coffee Maker Redesign',
      category: 'industrial',
      type: 'Industrial Design',
      client: 'Heritage Appliances',
      year: '2024',
      duration: '9 months',
      teamSize: 10,
      budget: '$80,000',
      status: 'Launched',
      award: true,
      complexity: 'High',
      rating: 4.9,
      downloads: 'N/A',
      description: 'Modern interpretation of traditional Ethiopian coffee brewing equipment for contemporary kitchens.',
      challenge: 'Preserve authentic coffee ceremony experience while creating modern appliance for international markets.',
      solution: 'Innovative design blending traditional clay pot aesthetics with modern materials and brewing technology.',
      results: [
        'CES Innovation Award winner',
        'Pre-orders exceeded 10,000 units',
        'Licensed to 3 major appliance manufacturers',
        'Featured in international design museums'
      ],
      metrics: {
        awards: 1,
        preOrders: 10000,
        licenses: 3,
        museumFeatures: 2
      },
      image: 'https://readdy.ai/api/search-image?query=Modern%20Ethiopian%20coffee%20maker%20industrial%20design%20product%20photography%20showing%20sleek%20contemporary%20appliance%20inspired%20by%20traditional%20clay%20coffee%20pots%2C%20professional%20product%20design%20with%20clean%20lines%20and%20cultural%20heritage%20elements%2C%20studio%20lighting%20on%20clean%20background&width=600&height=400&seq=design4&orientation=landscape',
      tags: [ 'Product Design', 'Cultural Heritage', 'Innovation', 'Manufacturing' ],
      technologies: [ 'SolidWorks', 'KeyShot', 'Adobe Creative Suite', '3D Printing' ],
      testimonial: {
        text: "The redesigned coffee maker has been a game-changer for our company, combining tradition with modernity.",
        author: "Melat Assefa",
        position: "Design Director, Heritage Appliances"
      }
    },
    {
      id: 5,
      title: 'EduTech Learning Platform',
      category: 'mobile',
      type: 'Mobile App',
      client: 'LearnEthio',
      year: '2024',
      duration: '12 months',
      teamSize: 12,
      budget: '$100,000',
      status: 'Launched',
      award: true,
      complexity: 'High',
      rating: 4.8,
      downloads: '50,000+',
      description: 'Mobile-first educational platform designed for Ethiopian students with offline capabilities and local content.',
      challenge: 'Create engaging learning experience that works with limited internet connectivity and diverse learning styles.',
      solution: 'Gamified learning interface with offline content sync, progress tracking, and culturally relevant educational content.',
      results: [
        '50,000+ active student users',
        '78% improvement in learning outcomes',
        'Partnerships with 200+ schools',
        'UNESCO Digital Learning Recognition'
      ],
      metrics: {
        userBase: 50000,
        learningImprovement: 78,
        schoolPartnerships: 200,
        awards: 1
      },
      image: 'https://readdy.ai/api/search-image?query=Ethiopian%20educational%20mobile%20app%20interface%20design%20showing%20engaging%20learning%20modules%20and%20student%20progress%20tracking%2C%20colorful%20and%20intuitive%20mobile%20UI%20design%20with%20educational%20content%20and%20gamification%20elements%2C%20smartphone%20mockup%20with%20Ethiopian%20educational%20context&width=600&height=400&seq=design5&orientation=landscape',
      tags: [ 'Educational Design', 'Mobile UI', 'Gamification', 'Offline-First' ],
      technologies: [ 'React Native', 'Flutter', 'Firebase', 'Adobe Creative Suite' ],
      testimonial: {
        text: "InHub Design's EduTech platform has revolutionized the way our students learn, making education more accessible and fun.",
        author: "Tadesse Alemu",
        position: "CEO, LearnEthio"
      }
    },
    {
      id: 6,
      title: 'Healthcare Telemedicine Platform',
      category: 'uiux',
      type: 'UI/UX Design',
      client: 'TeleMed Ethiopia',
      year: '2024',
      duration: '9 months',
      teamSize: 10,
      budget: '$80,000',
      status: 'Launched',
      award: true,
      complexity: 'High',
      rating: 4.9,
      downloads: 'N/A',
      description: 'Comprehensive telemedicine platform connecting rural patients with urban healthcare providers.',
      challenge: 'Design healthcare interface that works for users with limited digital experience while maintaining medical accuracy.',
      solution: 'Simple, icon-based interface with voice navigation and multi-language support for accessible healthcare delivery.',
      results: [
        '15,000+ patients connected to healthcare',
        '90% patient satisfaction rate',
        '50% reduction in travel for medical care',
        'WHO Digital Health Innovation Award'
      ],
      metrics: {
        patientReach: 15000,
        satisfactionRate: 90,
        travelReduction: 50,
        awards: 1
      },
      image: 'https://readdy.ai/api/search-image?query=Ethiopian%20telemedicine%20platform%20interface%20design%20showing%20doctor-patient%20video%20consultation%20and%20health%20monitoring%20dashboard%2C%20professional%20healthcare%20UI%20design%20with%20medical%20information%20and%20communication%20tools%2C%20clean%20modern%20interface%20for%20healthcare%20delivery&width=600&height=400&seq=design6&orientation=landscape',
      tags: [ 'Healthcare Design', 'Telemedicine', 'Accessibility', 'Rural Healthcare' ],
      technologies: [ 'Figma', 'Adobe XD', 'React', 'Node.js' ],
      testimonial: {
        text: "InHub Design's telemedicine platform has expanded our healthcare services to rural areas, improving patient outcomes.",
        author: "Dr. Worku Mengesha",
        position: "Medical Director, TeleMed Ethiopia"
      }
    }
  ];

  const advancedServices = [
    {
      icon: 'ri-smartphone-line',
      title: 'UI/UX Design',
      description: 'User-centered design for web and mobile applications that deliver exceptional user experiences.',
      features: [
        'User research and persona development',
        'Information architecture and wireframing',
        'Interactive prototyping and testing',
        'Design system creation',
        'Usability testing and optimization'
      ],
      deliverables: 'Wireframes, Prototypes, Design Systems, User Testing Reports',
      timeline: '4-8 weeks',
      pricing: 'Starting from $3,500',
      process: [
        'Discovery & Research Phase',
        'Wireframing & Information Architecture',
        'Visual Design & Prototyping',
        'User Testing & Iteration',
        'Design System Documentation'
      ],
      tools: [ 'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle' ],
      caseStudies: [ 'EthioBank Mobile App', 'Healthcare Telemedicine Platform' ]
    },
    {
      icon: 'ri-palette-line',
      title: 'Brand Identity Design',
      description: 'Comprehensive brand identity systems that capture your essence and resonate with your audience.',
      features: [
        'Brand strategy and positioning',
        'Logo design and visual identity',
        'Brand guidelines and standards',
        'Packaging and collateral design',
        'Brand application across touchpoints'
      ],
      deliverables: 'Logo Suite, Brand Guidelines, Stationery, Marketing Materials',
      timeline: '3-6 weeks',
      pricing: 'Starting from $2,500',
      process: [
        'Brand Discovery Workshop',
        'Concept Development',
        'Logo Design & Refinement',
        'Brand System Creation',
        'Guidelines & Implementation'
      ],
      tools: [ 'Adobe Illustrator', 'Photoshop', 'InDesign', 'After Effects' ],
      caseStudies: [ 'Addis Coffee Brand Identity', 'Heritage Appliances' ]
    },
    {
      icon: 'ri-tools-line',
      title: 'Industrial Design',
      description: 'Innovative product design solutions that blend functionality, aesthetics, and manufacturability for market success.',
      features: [
        'Product concept development and ideation',
        '3D modeling and visualization',
        'Ergonomic analysis and user testing',
        'Material selection and manufacturing guidance',
        'Prototyping and design validation'
      ],
      deliverables: '3D Models, Technical Drawings, Prototypes, Manufacturing Specs',
      timeline: '8-16 weeks',
      pricing: 'Starting from $5,000',
      process: [
        'Market Research & User Analysis',
        'Concept Development & Sketching',
        '3D Modeling & Visualization',
        'Prototyping & Testing',
        'Manufacturing Documentation'
      ],
      tools: [ 'SolidWorks', 'KeyShot', 'Rhino', '3D Printing', 'Fusion 360' ],
      caseStudies: [ 'Traditional Coffee Maker Redesign', 'Smart Agriculture Tools' ]
    }
  ];

  const designTools = [
    { name: 'Figma', category: 'Design', usage: 95 },
    { name: 'Adobe Creative Suite', category: 'Design', usage: 90 },
    { name: 'Sketch', category: 'Design', usage: 85 },
    { name: 'InVision', category: 'Prototyping', usage: 80 },
    { name: 'Principle', category: 'Animation', usage: 75 },
    { name: 'Blender', category: '3D Modeling', usage: 85 },
    { name: 'After Effects', category: 'Motion', usage: 80 },
    { name: 'Framer', category: 'Prototyping', usage: 70 }
  ];

  const clientLogos = [
    'EthioBank', 'Addis Coffee Co.', 'AgriTech Solutions', 'Heritage Appliances',
    'LearnEthio', 'TeleMed Ethiopia', 'Ethiopian Airlines', 'Commercial Bank of Ethiopia'
  ];

  const toggleFavorite = (projectId) => {
    const newFavorites = favorites.includes(projectId)
      ? favorites.filter(id => id !== projectId)
      : [ ...favorites, projectId ];
    setFavorites(newFavorites);
    localStorage.setItem('designFavorites', JSON.stringify(newFavorites));
  };

  const addToComparison = (project) => {
    if (comparisonProjects.length < 3 && !comparisonProjects.find(p => p.id === project.id)) {
      setComparisonProjects([ ...comparisonProjects, project ]);
    }
  };

  const removeFromComparison = (projectId) => {
    setComparisonProjects(comparisonProjects.filter(p => p.id !== projectId));
  };

  const filteredProjects = projects.filter(project => {
    const matchesCategory = activePortfolioTab === 'all' || project.category === activePortfolioTab;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesYear = !selectedFilters.year || project.year === selectedFilters.year;
    const matchesClient = !selectedFilters.client || project.client === selectedFilters.client;
    const matchesAward = !selectedFilters.award || project.award;

    return matchesCategory && matchesSearch && matchesYear && matchesClient && matchesAward;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return parseInt(b.year) - parseInt(a.year);
      case 'oldest':
        return parseInt(a.year) - parseInt(b.year);
      case 'rating':
        return b.rating - a.rating;
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

  const uniqueYears = [ ...new Set(projects.map(p => p.year)) ].sort((a, b) => b - a);
  const uniqueClients = [ ...new Set(projects.map(p => p.client)) ].sort();

  return (
    <div className="min-h-screen">
      <Header />

      {/* Enhanced Hero Section with Statistics */}
      <section
        className="relative min-h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(31, 61, 58, 0.8), rgba(31, 61, 58, 0.8)), url('https://readdy.ai/api/search-image?query=Creative%20Ethiopian%20design%20studio%20workspace%20with%20inspiring%20artistic%20environment%2C%20design%20sketches%20and%20color%20palettes%20spread%20across%20modern%20desks%2C%20typography%20samples%20and%20brand%20identity%20mockups%20displayed%20on%20walls%2C%20natural%20lighting%20streaming%20through%20large%20windows%20creating%20inspiring%20creative%20atmosphere%2C%20contemporary%20design%20tools%20including%20tablets%20and%20drawing%20materials%2C%20artistic%20workspace%20setup%20with%20mood%20boards%20and%20creative%20materials%2C%20vibrant%20creative%20energy%20with%20organized%20design%20resources%20and%20innovative%20workspace%20layout&width=1920&height=1080&seq=creativeworkspace&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                InHub <span className="text-green-400">Design</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                Ethiopia's premier creative studio specializing in award-winning UI/UX design, brand identity, and industrial design innovation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="#portfolio" className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer">
                  View Portfolio
                </Link>
                <Link href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#1F3D3A] transition-colors whitespace-nowrap cursor-pointer">
                  Start Project
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">150+</div>
                <div className="text-sm text-gray-200">Projects Completed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">25+</div>
                <div className="text-sm text-gray-200">Design Awards</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
                <div className="text-sm text-gray-200">Client Satisfaction</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
                <div className="text-sm text-gray-200">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 mb-8">Trusted by leading Ethiopian companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {clientLogos.map((client, index) => (
              <div key={index} className="text-xl font-bold text-gray-400">
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Services Overview with Tabs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Design Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive design solutions from concept to execution
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {advancedServices.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-8">
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 flex items-center justify-center bg-[#1F3D3A]/10 rounded-2xl mr-6 flex-shrink-0">
                      <i className={`${service.icon} text-2xl text-[#1F3D3A]`}></i>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#1F3D3A] mb-3">{service.title}</h3>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>

                  {/* Service Tabs */}
                  <div className="mb-6">
                    <div className="flex border-b border-gray-200 mb-4">
                      {[ 'Features', 'Process', 'Tools' ].map((tab, tabIndex) => (
                        <button
                          key={tabIndex}
                          onClick={() => setActiveServiceTab(activeServiceTab === index * 3 + tabIndex ? -1 : index * 3 + tabIndex)}
                          className={`px-4 py-2 font-medium text-sm transition-colors ${
                            activeServiceTab === index * 3 + tabIndex
                              ? 'text-[#1F3D3A] border-b-2 border-[#1F3D3A]'
                              : 'text-gray-500 hover:text-gray-700'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {activeServiceTab === index * 3 && (
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-gray-600 text-sm">
                            <i className="ri-check-line text-green-500 mr-2"></i>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}

                    {activeServiceTab === index * 3 + 1 && (
                      <ul className="space-y-2">
                        {service.process.map((step, stepIndex) => (
                          <li key={stepIndex} className="flex items-center text-gray-600 text-sm">
                            <span className="w-6 h-6 bg-[#1F3D3A] text-white rounded-full flex items-center justify-center text-xs mr-3">
                              {stepIndex + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ul>
                    )}

                    {activeServiceTab === index * 3 + 2 && (
                      <div className="flex flex-wrap gap-2">
                        {service.tools.map((tool, toolIndex) => (
                          <span key={toolIndex} className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-xs">
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="space-y-3 mb-6 text-sm">
                    <div><span className="font-medium text-[#1F3D3A]">Deliverables:</span> {service.deliverables}</div>
                    <div><span className="font-medium text-[#1F3D3A]">Timeline:</span> {service.timeline}</div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div className="text-2xl font-bold text-[#1F3D3A]">{service.pricing}</div>
                    <Link href="/contact" className="bg-[#1F3D3A] text-white px-6 py-3 rounded-full hover:bg-[#2a5248] transition-colors whitespace-nowrap cursor-pointer">
                      Get Quote
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Portfolio Section with Advanced Filtering */}
      <section id="portfolio" className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Featured Portfolio</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Award-winning designs that drive business success and user delight
            </p>
          </div>

          {/* Enhanced Search and Filter Controls */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 relative">
                <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search projects, clients, or technologies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-[#1F3D3A] focus:border-transparent text-sm"
                />
              </div>

              <div className="flex items-center gap-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border border-gray-200 rounded-full focus:ring-2 focus:ring-[#1F3D3A] text-sm pr-8"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="rating">Highest Rated</option>
                  <option value="alphabetical">A-Z</option>
                </select>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-4 py-3 border border-gray-200 rounded-full hover:bg-gray-50 transition-colors text-sm whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-filter-line mr-2"></i>
                  Filters
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                      viewMode === 'grid'
                        ? 'bg-[#1F3D3A] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <i className="ri-grid-line"></i>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                      viewMode === 'list'
                        ? 'bg-[#1F3D3A] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <i className="ri-list-unordered"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Advanced Filters Panel */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <select
                    value={selectedFilters.year}
                    onChange={(e) => setSelectedFilters({ ...selectedFilters, year: e.target.value })}
                    className="px-4 py-2 border border-gray-200 rounded-full text-sm pr-8"
                  >
                    <option value="">All Years</option>
                    {uniqueYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>

                  <select
                    value={selectedFilters.client}
                    onChange={(e) => setSelectedFilters({ ...selectedFilters, client: e.target.value })}
                    className="px-4 py-2 border border-gray-200 rounded-full text-sm pr-8"
                  >
                    <option value="">All Clients</option>
                    {uniqueClients.map(client => (
                      <option key={client} value={client}>{client}</option>
                    ))}
                  </select>

                  <label className="flex items-center px-4 py-2 border border-gray-200 rounded-full cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.award}
                      onChange={(e) => setSelectedFilters({ ...selectedFilters, award: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm">Award Winners Only</span>
                  </label>

                  <button
                    onClick={() => setSelectedFilters({ year: '', client: '', award: false })}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 text-sm whitespace-nowrap cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Portfolio Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {portfolioCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setActivePortfolioTab(category.id)}
                className={`px-6 py-3 rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                  activePortfolioTab === category.id
                    ? 'bg-[#1F3D3A] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{category.count}</span>
              </button>
            ))}
          </div>

          {/* Project Comparison Bar */}
          {comparisonProjects.length > 0 && (
            <div className="bg-[#1F3D3A] text-white p-4 rounded-2xl mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Compare Projects ({comparisonProjects.length}/3):</span>
                  <div className="flex gap-2">
                    {comparisonProjects.map(project => (
                      <span key={project.id} className="bg-white/20 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                        {project.title.substring(0, 20)}...
                        <button
                          onClick={() => removeFromComparison(project.id)}
                          className="hover:bg-white/20 rounded-full w-4 h-4 flex items-center justify-center cursor-pointer"
                        >
                          <i className="ri-close-line text-xs"></i>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setShowComparison(true)}
                  className="bg-green-500 px-4 py-2 rounded-full hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Compare Now
                </button>
              </div>
            </div>
          )}

          {/* Portfolio Results Count */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-gray-600">
              Showing {filteredProjects.length} of {projects.length} projects
            </p>
            {favorites.length > 0 && (
              <button
                onClick={() => setActivePortfolioTab('favorites')}
                className="flex items-center gap-2 text-[#1F3D3A] hover:text-[#2a5248] cursor-pointer"
              >
                <i className="ri-heart-fill text-red-500"></i>
                {favorites.length} Favorites
              </button>
            )}
          </div>

          {/* Portfolio Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map(project => (
                <div key={project.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative">
                    <div
                      className="h-48 bg-gray-200 group-hover:scale-105 transition-transform duration-300"
                      style={{
                        backgroundImage: `url('${project.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => toggleFavorite(project.id)}
                        className={`w-8 h-8 flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer ${
                          favorites.includes(project.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <i className={`ri-heart-${favorites.includes(project.id) ? 'fill' : 'line'} text-sm`}></i>
                      </button>
                      <button
                        onClick={() => addToComparison(project)}
                        disabled={comparisonProjects.length >= 3 || comparisonProjects.find(p => p.id === project.id)}
                        className="w-8 h-8 flex items-center justify-center bg-white/80 rounded-full hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <i className="ri-add-line text-sm"></i>
                      </button>
                    </div>
                    {project.award && (
                      <div className="absolute top-4 left-4 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        <i className="ri-trophy-line mr-1"></i>
                        Award Winner
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-sm font-medium">
                        {project.type}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <i className="ri-star-fill text-yellow-500 text-sm"></i>
                          <span className="text-sm font-medium">{project.rating}</span>
                        </div>
                        <span className="text-gray-500 text-sm">{project.year}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-[#1F3D3A] mb-2">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-gray-500">
                        <i className="ri-building-line mr-1"></i>
                        {project.client}
                      </div>
                      <div className="text-sm text-gray-500">
                        <i className="ri-time-line mr-1"></i>
                        {project.duration}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                      {project.tags.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          +{project.tags.length - 3} more
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="w-full bg-[#1F3D3A] text-white py-3 rounded-full hover:bg-[#2a5248] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      View Case Study
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProjects.map(project => (
                <div key={project.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex gap-6">
                    <div
                      className="w-32 h-24 rounded-lg bg-gray-200 flex-shrink-0"
                      style={{
                        backgroundImage: `url('${project.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-[#1F3D3A]">{project.title}</h3>
                            {project.award && (
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                                <i className="ri-trophy-line mr-1"></i>
                                Award Winner
                              </span>
                            )}
                            <div className="flex items-center gap-1">
                              <i className="ri-star-fill text-yellow-500 text-sm"></i>
                              <span className="text-sm font-medium">{project.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-3">{project.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleFavorite(project.id)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                              favorites.includes(project.id)
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-red-500 hover:text-white'
                            }`}
                          >
                            <i className={`ri-heart-${favorites.includes(project.id) ? 'fill' : 'line'} text-sm`}></i>
                          </button>
                          <button
                            onClick={() => addToComparison(project)}
                            disabled={comparisonProjects.length >= 3 || comparisonProjects.find(p => p.id === project.id)}
                            className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <i className="ri-add-line text-sm"></i>
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-4 mb-4 text-sm">
                        <div>
                          <span className="text-gray-500">Client:</span>
                          <div className="font-medium">{project.client}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <div className="font-medium">{project.duration}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Team Size:</span>
                          <div className="font-medium">{project.teamSize} people</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Status:</span>
                          <div className="font-medium text-green-600">{project.status}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 4).map((tag, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="bg-[#1F3D3A] text-white px-6 py-2 rounded-full hover:bg-[#2a5248] transition-colors whitespace-nowrap cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-bold text-gray-600 mb-2">No projects found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Comparison Modal */}
      {showComparison && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-6xl max-h-[90vh] overflow-y-auto w-full">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-[#1F3D3A]">Project Comparison</h2>
                <button
                  onClick={() => setShowComparison(false)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-4 font-medium text-gray-600">Attribute</th>
                      {comparisonProjects.map(project => (
                        <th key={project.id} className="text-center p-4 min-w-[200px]">
                          <div
                            className="h-24 rounded-lg mb-3"
                            style={{
                              backgroundImage: `url('${project.image}')`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center'
                            }}
                          ></div>
                          <div className="font-bold text-[#1F3D3A]">{project.title}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[ 
                      { label: 'Client', key: 'client' },
                      { label: 'Year', key: 'year' },
                      { label: 'Duration', key: 'duration' },
                      { label: 'Team Size', key: 'teamSize' },
                      { label: 'Budget', key: 'budget' },
                      { label: 'Rating', key: 'rating' },
                      { label: 'Complexity', key: 'complexity' },
                      { label: 'Status', key: 'status' }
                    ].map(attr => (
                      <tr key={attr.key} className="border-t border-gray-100">
                        <td className="p-4 font-medium text-gray-600">{attr.label}</td>
                        {comparisonProjects.map(project => (
                          <td key={project.id} className="p-4 text-center">
                            {attr.key === 'rating' ? (
                              <div className="flex items-center justify-center gap-1">
                                <i className="ri-star-fill text-yellow-500"></i>
                                <span>{project[attr.key]}</span>
                              </div>
                            ) : (
                              <span className={attr.key === 'status' && project[attr.key] === 'Launched' ? 'text-green-600 font-medium' : ''}>
                                {project[attr.key]}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={() => setShowComparison(false)}
                  className="flex-1 border border-[#1F3D3A] text-[#1F3D3A] py-3 rounded-full hover:bg-[#1F3D3A] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  Close Comparison
                </button>
                <Link href="/contact" className="flex-1 bg-[#1F3D3A] text-white py-3 rounded-full text-center hover:bg-[#2a5248] transition-colors whitespace-nowrap cursor-pointer">
                  Discuss Similar Project
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Design Tools & Technologies */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Our Design Arsenal</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Industry-leading tools and technologies we use to create exceptional designs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {designTools.map((tool, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="font-bold text-[#1F3D3A] mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{tool.category}</p>
                <div className="relative w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#1F3D3A] h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${tool.usage}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">{tool.usage}% proficiency</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-[#1F3D3A]">{selectedProject.title}</h2>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div
                className="h-64 rounded-xl mb-6"
                style={{
                  backgroundImage: `url('${selectedProject.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="mb-6">
                    <h3 className="font-semibold text-[#1F3D3A] mb-2">Project Overview</h3>
                    <p className="text-gray-600">{selectedProject.description}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-[#1F3D3A] mb-2">Challenge</h3>
                    <p className="text-gray-600">{selectedProject.challenge}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-[#1F3D3A] mb-2">Solution</h3>
                    <p className="text-gray-600">{selectedProject.solution}</p>
                  </div>
                </div>

                <div>
                  <div className="mb-6">
                    <h3 className="font-semibold text-[#1F3D3A] mb-3">Key Results</h3>
                    <ul className="space-y-2">
                      {selectedProject.results.map((result, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <i className="ri-check-line text-green-500 mr-2"></i>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h3 className="font-semibold text-[#1F3D3A] mb-3">Project Details</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="font-medium">Client:</span> {selectedProject.client}</div>
                      <div><span className="font-medium">Year:</span> {selectedProject.year}</div>
                      <div><span className="font-medium">Type:</span> {selectedProject.type}</div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#1F3D3A] mb-3">Technologies & Tools</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100">
                <Link href="/contact" className="flex-1 bg-[#1F3D3A] text-white py-3 rounded-full text-center hover:bg-[#2a5248] transition-colors whitespace-nowrap cursor-pointer">
                  Start Similar Project
                </Link>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 border border-[#1F3D3A] text-[#1F3D3A] py-3 rounded-full hover:bg-[#1F3D3A] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Our Design Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A proven methodology that ensures exceptional results every time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[ 
              {
                step: '01',
                title: 'Research & Discovery',
                description: 'Deep dive into user needs, market research, and competitive analysis',
                icon: 'ri-search-line'
              },
              {
                step: '02',
                title: 'Concept & Ideation',
                description: 'Creative brainstorming, concept development, and initial sketches',
                icon: 'ri-lightbulb-line'
              },
              {
                step: '03',
                title: 'Design & Prototype',
                description: 'Visual design creation, interactive prototypes, and user testing',
                icon: 'ri-pencil-ruler-line'
              },
              {
                step: '04',
                title: 'Refine & Deliver',
                description: 'Final refinements, design system creation, and handoff to development',
                icon: 'ri-rocket-line'
              }
            ].map((process, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 bg-[#1F3D3A] text-white rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className={`${process.icon} text-2xl`}></i>
                </div>
                <div className="text-3xl font-bold text-[#1F3D3A] mb-2">{process.step}</div>
                <h3 className="text-xl font-bold text-[#1F3D3A] mb-3">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our design excellence recognized by industry leaders worldwide
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[ 
              {
                award: 'Red Dot Design Award',
                year: '2024',
                category: 'Product Design',
                project: 'Traditional Coffee Maker'
              },
              {
                award: 'African Mobile Banking Design',
                year: '2024',
                category: 'UI/UX Design',
                project: 'EthioBank Mobile App'
              },
              {
                award: 'CES Innovation Award',
                year: '2024',
                category: 'Industrial Design',
                project: 'Smart Coffee Brewer'
              },
              {
                award: 'UNESCO Digital Learning',
                year: '2024',
                category: 'Educational Design',
                project: 'EduTech Platform'
              }
            ].map((award, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-yellow-100 rounded-full mx-auto mb-4">
                  <i className="ri-trophy-line text-2xl text-yellow-600"></i>
                </div>
                <h3 className="font-bold text-[#1F3D3A] mb-2">{award.award}</h3>
                <p className="text-gray-600 text-sm mb-1">{award.category} • {award.year}</p>
                <p className="text-gray-500 text-xs">{award.project}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Meet Our Design Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Talented Ethiopian designers creating world-class experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[ 
              {
                name: 'Selamawit Desta',
                role: 'Creative Director',
                specialties: [ 'Brand Strategy', 'Visual Identity', 'Creative Direction' ],
                experience: '8+ years',
                image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20female%20creative%20director%20with%20confident%20smile%20in%20modern%20design%20studio%2C%20creative%20professional%20with%20design%20materials%20and%20artistic%20workspace%2C%20contemporary%20portrait%20with%20natural%20lighting%2C%20artistic%20workspace%20setup%20with%20mood%20boards%20and%20creative%20materials%2C%20vibrant%20creative%20energy%20with%20organized%20design%20resources%20and%20innovative%20workspace%20layout&width=300&height=300&seq=team1&orientation=squarish'
              },
              {
                name: 'Bereket Haile',
                role: 'Senior UX Designer',
                specialties: [ 'User Research', 'Interaction Design', 'Prototyping' ],
                experience: '6+ years',
                image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20male%20UX%20designer%20working%20with%20design%20tools%20and%20user%20interface%20sketches%2C%20experienced%20design%20professional%20in%20modern%20creative%20workspace%2C%20contemporary%20professional%20portrait%20with%20clean%20background&width=300&height=300&seq=team2&orientation=squarish'
              },
              {
                name: 'Mahlet Solomon',
                role: 'Industrial Designer',
                specialties: [ 'Product Design', '3D Modeling', 'Manufacturing' ],
                experience: '7+ years',
                image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20female%20industrial%20designer%20with%203D%20models%20and%20product%20prototypes%2C%20skilled%20design%20professional%20in%20modern%20design%20studio%20with%20creative%20tools%2C%20contemporary%20portrait%20with%20professional%20lighting&width=300&height=300&seq=team3&orientation=squarish'
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center">
                <div
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                  style={{
                    backgroundImage: `url('${member.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
                <h3 className="text-xl font-bold text-[#1F3D3A] mb-1">{member.name}</h3>
                <p className="text-gray-600 mb-3">{member.role}</p>
                <p className="text-sm text-gray-500 mb-4">{member.experience} experience</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {member.specialties.map((specialty, specialtyIndex) => (
                    <span key={specialtyIndex} className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-xs">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1F3D3A]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Something Amazing?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Let's collaborate to bring your vision to life with world-class design that drives results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer">
              Start Your Project
            </Link>
            <Link href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#1F3D3A] transition-colors whitespace-nowrap cursor-pointer">
              Schedule Consultation
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
