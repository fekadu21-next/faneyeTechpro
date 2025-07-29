
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [mounted, setMounted] = useState(false);
  const [selectedCase, setSelectedCase] = useState<{
  title: string;
  image?: string;
  challenge?: string;
  solution?: string;
  results?: string[]; // <-- add this line
} | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    setMounted(true);
  }, []);

  const caseStudies = [
    {
      id: 1,
      title: 'TechStart Ethiopia: From Concept to Market Leader',
      category: 'gtm',
      client: 'TechStart Ethiopia',
      industry: 'Technology',
      date: '2024-01-15',
      tags: ['Fintech', 'Mobile Payment', 'Regulatory Compliance', 'Partnership Strategy'],
      challenge: 'A promising fintech startup needed to launch their mobile payment solution in Ethiopia\'s competitive market while navigating regulatory requirements.',
      solution: 'Developed comprehensive go-to-market strategy including regulatory compliance roadmap, customer acquisition framework, and partnership strategy with local banks.',
      results: [
        '250% increase in user acquisition within 6 months',
        'Successfully obtained all required licenses',
        'Partnerships with 12 major Ethiopian banks',
        '$2.5M Series A funding secured'
      ],
      kpis: [
        { metric: 'User Growth', value: '250%', trend: 'up' },
        { metric: 'Bank Partnerships', value: '12', trend: 'up' },
        { metric: 'Funding Raised', value: '$2.5M', trend: 'up' },
        { metric: 'Time to Market', value: '6 months', trend: 'neutral' }
      ],
      duration: '8 months',
      teamSize: '12 specialists',
      budget: '$150K',
      complexity: 'High',
      rating: 4.9,
      views: 1247,
      metrics: { roi: '250%', growth: '180%' },
      clientInfo: {
        name: 'Alemayehu Tadesse',
        role: 'CEO, TechStart Ethiopia',
        company: 'TechStart Ethiopia',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20male%20CEO%20in%20business%20suit&width=64&height=64&seq=client1&orientation=squarish'
      },
      image: 'https://readdy.ai/api/search-image?query=Modern%20Ethiopian%20technology%20company%20office%20with%20software%20developers%20programming%20on%20multiple%20monitors%2C%20IT%20professionals%20working%20with%20cloud%20computing%20systems%2C%20AI%20and%20machine%20learning%20platforms%2C%20cybersecurity%20dashboards%2C%20and%20enterprise%20software%20solutions%2C%20contemporary%20tech%20workspace%20with%20professional%20development%20environment%2C%20advanced%20computing%20infrastructure%20with%20servers%20and%20networking%20equipment%2C%20innovative%20technology%20solutions%20showcase&width=600&height=400&seq=case1-tech-comprehensive&orientation=landscape',
      testimonial: 'InHub\'s strategic guidance was instrumental in our successful market entry. Their deep understanding of the Ethiopian market dynamics helped us avoid costly mistakes and accelerate our growth.',
      clientName: 'Alemayehu Tadesse',
      clientRole: 'CEO, TechStart Ethiopia',
      featured: true,
      downloadables: [
        { name: 'Go-to-Market Strategy Template', type: 'PDF' },
        { name: 'Regulatory Compliance Checklist', type: 'Excel' }
      ]
    },
    {
      id: 2,
      title: 'Animal Food Processing Platform',
      category: 'gtm',
      client: 'Bejala',
      industry: 'Agriculture',
      date: '2024-07-15',
      tags: ['Animal Feed', 'Processing', 'Quality Control', 'Supply Chain', 'Market Expansion'],
      challenge: 'Bejala needed to modernize their animal feed processing operations and expand market reach while maintaining strict quality standards and optimizing supply chain efficiency.',
      solution: 'Implemented comprehensive go-to-market strategy with innovation in product development, quality control systems, supply chain management, and strategic market expansion planning.',
      results: [
        '160% return on investment achieved',
        'Streamlined processing operations with 40% efficiency gain',
        'Expanded market coverage to 8 new regions',
        'Implemented advanced quality control systems',
        'Enhanced supply chain optimization reducing costs by 25%'
      ],
      kpis: [
        { metric: 'ROI', value: '160%', trend: 'up' },
        { metric: 'Efficiency Gain', value: '40%', trend: 'up' },
        { metric: 'Market Expansion', value: '8 regions', trend: 'up' },
        { metric: 'Cost Reduction', value: '25%', trend: 'up' }
      ],
      duration: '9 months',
      teamSize: '5 specialists',
      budget: '$65K',
      complexity: 'High',
      rating: 4.7,
      views: 892,
      metrics: { roi: '160%', growth: '145%' },
      clientInfo: {
        name: 'Lidia',
        role: 'Operations Director, Bejala',
        company: 'Bejala',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20female%20operations%20director&width=64&height=64&seq=client2&orientation=squarish'
      },
      image: 'https://readdy.ai/api/search-image?query=Modern%20Ethiopian%20animal%20feed%20processing%20facility%20with%20industrial%20machinery%2C%20grain%20silos%2C%20production%20lines%2C%20and%20quality%20control%20equipment%2C%20workers%20in%20safety%20gear%20operating%20processing%20equipment%2C%20contemporary%20agricultural%20processing%20environment%20with%20professional%20industrial%20photography%20style&width=600&height=400&seq=case-animal-feed&orientation=landscape',
      testimonial: 'InHub\'s comprehensive approach to our go-to-market strategy and product development transformed our entire operation. Their expertise in innovation and market expansion helped us achieve remarkable growth while maintaining our quality standards.',
      clientName: 'Lidia',
      clientRole: 'Operations Director, Bejala',
      featured: true,
      downloadables: [
        { name: 'Animal Feed Processing Guide', type: 'PDF' },
        { name: 'Quality Control Framework', type: 'Excel' },
        { name: 'Market Expansion Strategy', type: 'PDF' }
      ]
    },
    {
      id: 3,
      title: 'Green Manufacturing Co: Digital Transformation Journey',
      category: 'digital',
      client: 'Green Manufacturing Co',
      industry: 'Manufacturing',
      date: '2024-02-20',
      tags: ['Industry 4.0', 'IoT Implementation', 'Process Automation', 'Sustainability'],
      challenge: 'Traditional manufacturing company needed to modernize operations and implement Industry 4.0 technologies to remain competitive.',
      solution: 'Designed phased digital transformation roadmap including IoT implementation, process automation, and data analytics integration.',
      results: [
        '40% reduction in production costs',
        '60% improvement in operational efficiency',
        '25% decrease in waste generation',
        'ISO 14001 certification achieved'
      ],
      kpis: [
        { metric: 'Cost Reduction', value: '40%', trend: 'up' },
        { metric: 'Efficiency Gain', value: '60%', trend: 'up' },
        { metric: 'Waste Reduction', value: '25%', trend: 'up' },
        { metric: 'ROI', value: '180%', trend: 'up' }
      ],
      duration: '12 months',
      teamSize: '18 specialists',
      budget: '$300K',
      complexity: 'Very High',
      rating: 4.8,
      views: 1543,
      metrics: { roi: '180%', growth: '220%' },
      clientInfo: {
        name: 'Dr. Meron Bekele',
        role: 'Operations Director',
        company: 'Green Manufacturing Co',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20female%20operations%20director&width=64&height=64&seq=client3&orientation=squarish'
      },
      image: 'https://readdy.ai/api/search-image?query=Modern%20Ethiopian%20manufacturing%20facility%20with%20digital%20displays%20showing%20production%20analytics%20and%20IoT%20sensors%2C%20workers%20using%20tablets%20and%20digital%20interfaces%2C%20contemporary%20industrial%20setting%20with%20green%20technology%20integration%20and%20professional%20lighting&width=600&height=400&seq=case2&orientation=landscape',
      testimonial: 'The transformation exceeded our expectations. InHub helped us not just adopt new technologies, but fundamentally reimagine how we operate.',
      clientName: 'Dr. Meron Bekele',
      clientRole: 'Operations Director, Green Manufacturing Co',
      featured: true,
      downloadables: [
        { name: 'Digital Transformation Roadmap', type: 'PDF' },
        { name: 'IoT Implementation Guide', type: 'PDF' }
      ]
    },
    {
      id: 4,
      title: 'AgriTech Solutions: Innovation Strategy Implementation',
      category: 'innovation',
      client: 'AgriTech Solutions',
      industry: 'Agriculture',
      date: '2023-11-10',
      tags: ['AgTech', 'User-Centered Design', 'MVP Development', 'Farmer Engagement'],
      challenge: 'Agricultural technology company needed to develop innovative solutions for smallholder farmers while building sustainable business model.',
      solution: 'Created innovation framework focusing on user-centered design, developed minimum viable products, and established farmer feedback loops.',
      results: [
        '15,000 farmers onboarded to platform',
        '30% increase in crop yields for users',
        '3 patent applications filed',
        'Expansion to 4 additional regions'
      ],
      kpis: [
        { metric: 'Farmer Adoption', value: '15K', trend: 'up' },
        { metric: 'Yield Increase', value: '30%', trend: 'up' },
        { metric: 'Patent Applications', value: '3', trend: 'up' },
        { metric: 'Regional Expansion', value: '4', trend: 'up' }
      ],
      duration: '10 months',
      teamSize: '14 specialists',
      budget: '$200K',
      complexity: 'High',
      rating: 4.6,
      views: 734,
      metrics: { roi: '130%', growth: '95%' },
      clientInfo: {
        name: 'Dawit Hailu',
        role: 'Founder',
        company: 'AgriTech Solutions',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20male%20founder&width=64&height=64&seq=client4&orientation=squarish'
      },
      image: 'https://readdy.ai/api/search-image?query=Ethiopian%20farmers%20using%20modern%20agricultural%20technology%20tablets%20and%20mobile%20apps%20in%20green%20farm%20fields%2C%20drone%20technology%20for%20crop%20monitoring%2C%20contemporary%20agritech%20solutions%20with%20traditional%20farming%20landscape%2C%20professional%20documentation%20style%20with%20natural%20lighting&width=600&height=400&seq=case3&orientation=landscape',
      testimonial: 'InHub\'s innovation methodology helped us create solutions that truly serve our farmers. The impact on crop yields and farmer livelihoods has been remarkable.',
      clientName: 'Dawit Hailu',
      clientRole: 'Founder, AgriTech Solutions',
      featured: false,
      downloadables: [
        { name: 'Innovation Framework Guide', type: 'PDF' },
        { name: 'User Research Toolkit', type: 'PDF' }
      ]
    },
    {
      id: 5,
      title: 'EduCorp International: Growth Strategy Execution',
      category: 'growth',
      client: 'EduCorp International',
      industry: 'Education',
      date: '2023-09-05',
      tags: ['Market Expansion', 'Operational Scaling', 'Quality Assurance', 'Capital Raising'],
      challenge: 'Educational services company wanted to scale from regional to national presence while maintaining quality standards.',
      solution: 'Developed multi-phase growth strategy including market analysis, operational scaling framework, and quality assurance systems.',
      results: [
        'Expanded from 3 to 15 cities',
        '400% increase in student enrollment',
        'Maintained 95% student satisfaction rate',
        'Successfully raised $5M growth capital'
      ],
      kpis: [
        { metric: 'City Expansion', value: '15', trend: 'up' },
        { metric: 'Enrollment Growth', value: '400%', trend: 'up' },
        { metric: 'Satisfaction Rate', value: '95%', trend: 'neutral' },
        { metric: 'Capital Raised', value: '$5M', trend: 'up' }
      ],
      duration: '14 months',
      teamSize: '16 specialists',
      budget: '$250K',
      complexity: 'High',
      rating: 4.5,
      views: 627,
      metrics: { roi: '200%', growth: '165%' },
      clientInfo: {
        name: 'Prof. Sara Wolde',
        role: 'CEO',
        company: 'EduCorp International',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20female%20CEO%20professor&width=64&height=64&seq=client5&orientation=squarish'
      },
      image: 'https://readdy.ai/api/search-image?query=Modern%20Ethiopian%20educational%20center%20with%20students%20using%20laptops%20and%20interactive%20learning%20technology%2C%20contemporary%20classroom%20setting%20with%20digital%20whiteboards%20and%20collaborative%20learning%20spaces%2C%20professional%20educational%20environment%20with%20natural%20lighting&width=600&height=400&seq=case4&orientation=landscape',
      testimonial: 'InHub\'s growth strategy enabled us to scale rapidly without compromising on our educational quality. Their systematic approach was exactly what we needed.',
      clientName: 'Prof. Sara Wolde',
      clientRole: 'CEO, EduCorp International',
      featured: false,
      downloadables: [
        { name: 'Growth Strategy Framework', type: 'PDF' },
        { name: 'Quality Assurance Checklist', type: 'Excel' }
      ]
    },
    {
      id: 6,
      title: 'RetailMax: Business Model Innovation',
      category: 'strategy',
      client: 'RetailMax',
      industry: 'Retail',
      date: '2023-12-18',
      tags: ['Omnichannel Strategy', 'Business Model Design', 'Customer Experience', 'Digital Integration'],
      challenge: 'Traditional retailer needed to compete with e-commerce while leveraging physical store advantages in omnichannel strategy.',
      solution: 'Redesigned business model to integrate online and offline channels, implemented customer data platform, and optimized supply chain.',
      results: [
        '180% increase in online sales',
        '45% improvement in customer retention',
        '35% reduction in inventory costs',
        'Successful launch of mobile app with 50K downloads'
      ],
      kpis: [
        { metric: 'Online Sales Growth', value: '180%', trend: 'up' },
        { metric: 'Customer Retention', value: '45%', trend: 'up' },
        { metric: 'Inventory Cost Reduction', value: '35%', trend: 'up' },
        { metric: 'App Downloads', value: '50K', trend: 'up' }
      ],
      duration: '9 months',
      teamSize: '10 specialists',
      budget: '$180K',
      complexity: 'Medium',
      rating: 4.4,
      views: 512,
      metrics: { roi: '155%', growth: '135%' },
      clientInfo: {
        name: 'Henok Girma',
        role: 'Managing Director',
        company: 'RetailMax',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20male%20managing%20director&width=64&height=64&seq=client6&orientation=squarish'
      },
      image: 'https://readdy.ai/api/search-image?query=Modern%20Ethiopian%20retail%20store%20with%20integrated%20digital%20displays%20and%20mobile%20payment%20systems%2C%20customers%20using%20smartphones%20for%20shopping%2C%20contemporary%20retail%20environment%20blending%20traditional%20and%20digital%20commerce%2C%20professional%20retail%20photography%20with%20good%20lighting&width=600&height=400&seq=case5&orientation=landscape',
      testimonial: 'The business model transformation helped us not just survive the digital disruption, but thrive in it. Our customers love the seamless experience.',
      clientName: 'Henok Girma',
      clientRole: 'Managing Director, RetailMax',
      featured: false,
      downloadables: [
        { name: 'Omnichannel Strategy Guide', type: 'PDF' },
        { name: 'Customer Journey Mapping Tool', type: 'Excel' }
      ]
    },
    {
      id: 7,
      title: 'HealthTech Innovations: Market Entry Strategy',
      category: 'gtm',
      client: 'HealthTech Innovations',
      industry: 'Healthcare',
      date: '2024-03-12',
      tags: ['Healthcare Regulatory', 'Medical Device Launch', 'Professional Engagement', 'Evidence-Based Marketing'],
      challenge: 'Medical device startup needed to navigate complex healthcare regulations and establish trust with medical professionals.',
      solution: 'Developed regulatory compliance strategy, medical professional engagement program, and evidence-based marketing approach.',
      results: [
        'FDA and Ethiopian FDA approvals obtained',
        'Partnerships with 25 hospitals established',
        '90% physician adoption rate in pilot programs',
        'Featured in 3 major medical conferences'
      ],
      kpis: [
        { metric: 'Regulatory Approvals', value: '2', trend: 'up' },
        { metric: 'Hospital Partnerships', value: '25', trend: 'up' },
        { metric: 'Physician Adoption', value: '90%', trend: 'up' },
        { metric: 'Conference Features', value: '3', trend: 'up' }
      ],
      duration: '11 months',
      teamSize: '15 specialists',
      budget: '$220K',
      complexity: 'Very High',
      rating: 4.9,
      views: 1186,
      metrics: { roi: '190%', growth: '175%' },
      clientInfo: {
        name: 'Dr. Rahel Teshome',
        role: 'CEO',
        company: 'HealthTech Innovations',
        avatar: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20female%20doctor%20CEO&width=64&height=64&seq=client7&orientation=squarish'
      },
      image: 'https://readdy.ai/api/search-image?query=Ethiopian%20medical%20professionals%20using%20advanced%20healthcare%20technology%20and%20medical%20devices%20in%20modern%20hospital%20setting%2C%20doctors%20with%20tablets%20and%20medical%20equipment%2C%20contemporary%20healthcare%20environment%20with%20professional%20medical%20atmosphere%20and%20clean%20lighting&width=600&height=400&seq=case6&orientation=landscape',
      testimonial: 'InHub\'s expertise in healthcare market entry was invaluable. They helped us build credibility and trust with the medical community from day one.',
      clientName: 'Dr. Rahel Teshome',
      clientRole: 'CEO, HealthTech Innovations',
      featured: true,
      downloadables: [
        { name: 'Healthcare Market Entry Guide', type: 'PDF' },
        { name: 'Regulatory Compliance Roadmap', type: 'PDF' }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Cases', count: 7 },
    { id: 'strategy', name: 'Strategy', count: 1 },
    { id: 'innovation', name: 'Innovation', count: 1 },
    { id: 'gtm', name: 'Go-To-Market', count: 3 },
    { id: 'growth', name: 'Growth', count: 1 },
    { id: 'digital', name: 'Digital Transformation', count: 1 }
  ];

  const filteredAndSortedCases = caseStudies
    .filter(study => {
      const matchesFilter = activeFilter === 'all' || study.category === activeFilter;
      const matchesSearch = study.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            study.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            study.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
         return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'industry':
          return a.industry.localeCompare(b.industry);
        default:
          return 0;
      }
    });

  const featuredCases = caseStudies.filter(study => study.featured);

  const handleCaseClick = (caseStudy: any) => {
    if (!mounted) return;
    setSelectedCase(caseStudy);
    setShowModal(true);
  };

  const closeModal = () => {
    if (!mounted) return;
    setShowModal(false);
    setSelectedCase(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!mounted) return;
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!mounted) return;
    setSortBy(e.target.value);
  };

  const handleFilterChange = (filter: string) => {

    if (!mounted) return;
    setActiveFilter(filter);
  };

  const handleViewModeChange = (mode: string) => {
    if (!mounted) return;
    setViewMode(mode);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3D3A] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading case studies...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section 
        className="relative py-20 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(31, 61, 58, 0.8), rgba(31, 61, 58, 0.8)), url('https://readdy.ai/api/search-image?query=Happy%20satisfied%20Ethiopian%20business%20customers%20celebrating%20successful%20project%20completion%20with%20big%20smiles%20and%20handshakes%2C%20diverse%20group%20of%20professionals%20showing%20joy%20and%20satisfaction%20after%20achieving%20business%20goals%2C%20contemporary%20office%20setting%20with%20celebration%20atmosphere%20and%20positive%20energy&width=1920&height=600&seq=casehero-customers&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Success Stories</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Discover how we\'ve helped Ethiopian businesses transform, grow, and achieve remarkable results through strategic innovation
          </p>

          {/* Search and Filter Controls */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70"></i>
                  <input
                    type="text"
                    placeholder="Search case studies..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full pl-10 pr-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>

                <div className="flex gap-4">
                  <select
                    value={sortBy}
                    onChange={handleSortChange}
                    className="px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/50 pr-8"
                  >
                    <option value="recent">Most Recent</option>
                    <option value="oldest">Oldest First</option>
                    <option value="alphabetical">A-Z</option>
                    <option value="industry">By Industry</option>
                  </select>

                  <div className="flex bg-white/20 rounded-lg p-1">
                    <button
                      onClick={() => handleViewModeChange('grid')}
                      className={`p-2 rounded cursor-pointer ${viewMode === 'grid' ? 'bg-white/30' : 'hover:bg-white/20'}`}
                    >
                      <i className="ri-grid-line text-white"></i>
                    </button>
                    <button
                      onClick={() => handleViewModeChange('list')}
                      className={`p-2 rounded cursor-pointer ${viewMode === 'list' ? 'bg-white/30' : 'hover:bg-white/20'}`}
                    >
                      <i className="ri-list-check text-white"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Success Metrics Banner */}
          <div className="bg-gradient-to-r from-[#1F3D3A] via-green-600 to-blue-600 rounded-3xl p-8 mb-16 text-white text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-6">Our Impact in Numbers</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold">180%</div>
                  <div className="text-sm opacity-90">Average ROI</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold">95%</div>
                  <div className="text-sm opacity-90">Success Rate</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold">$52M+</div>
                  <div className="text-sm opacity-90">Revenue Generated</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-3xl font-bold">150+</div>
                  <div className="text-sm opacity-90">Projects Delivered</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Featured Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Our most impactful transformations that showcase the power of strategic innovation
            </p>

            {/* Interactive Filter System */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all cursor-pointer ${activeFilter === 'all' ? 'bg-[#1F3D3A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                All Stories
              </button>
              <button
                onClick={() => handleFilterChange('technology')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all cursor-pointer ${activeFilter === 'technology' ? 'bg-[#1F3D3A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Technology
              </button>
              <button
                onClick={() => handleFilterChange('healthcare')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all cursor-pointer ${activeFilter === 'healthcare' ? 'bg-[#1F3D3A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Healthcare
              </button>
              <button
                onClick={() => handleFilterChange('manufacturing')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all cursor-pointer ${activeFilter === 'manufacturing' ? 'bg-[#1F3D3A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Manufacturing
              </button>
              <button
                onClick={() => handleFilterChange('agriculture')}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all cursor-pointer ${activeFilter === 'agriculture' ? 'bg-[#1F3D3A] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                Agriculture
              </button>
            </div>
          </div>

          {/* Enhanced Case Study Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredAndSortedCases.map((study, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group hover:-translate-y-2"
                onClick={() => handleCaseClick(study)}
              >
                <div className="relative h-48" style={{
                  backgroundImage: `url('${study.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <span className="bg-white/90 text-[#1F3D3A] px-3 py-1 rounded-full text-sm font-medium">
                      {study.industry}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-3">
                    <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <i className="ri-star-fill text-yellow-400 mr-1"></i>
                      <span className="text-white text-sm font-medium">{study.rating}</span>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                      <span className="text-white text-sm font-medium">{study.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-[#1F3D3A] group-hover:text-green-600 transition-colors">
                      {study.title}
                    </h3>
                    <div className="flex items-center space-x-1">
                      <i className="ri-eye-line text-gray-400"></i>
                      <span className="text-sm text-gray-500">{study.views}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {study.challenge}
                  </p>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-green-600">{study.metrics.roi}</div>
                      <div className="text-xs text-green-700">ROI Increase</div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg text-center">
                      <div className="text-lg font-bold text-blue-600">{study.metrics.growth}</div>
                      <div className="text-xs text-blue-700">Growth Rate</div>
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-8 h-8 rounded-full bg-gray-200"
                        style={{
                          backgroundImage: `url('${study.clientInfo.avatar}')`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      ></div>
                      <div>
                        <div className="text-sm font-medium text-gray-800">{study.clientInfo.name}</div>
                        <div className="text-xs text-gray-500">{study.clientInfo.company}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-800">{study.teamSize}</div>
                      <div className="text-xs text-gray-500">{study.budget}</div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {study.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs hover:bg-gray-200 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCaseClick(study);
                      }}
                      className="flex-1 bg-[#1F3D3A] text-white py-2 px-4 rounded-lg hover:bg-[#2a5248] transition-colors whitespace-nowrap cursor-pointer text-sm font-medium"
                    >
                      Read Case Study
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to favorites functionality
                      }}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <i className="ri-heart-line text-gray-600"></i>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Share functionality
                      }}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <i className="ri-share-line text-gray-600"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Enhanced CTA Section */}
          <div className="bg-gradient-to-r from-[#1F3D3A] via-green-600 to-blue-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Ready to Create Your Success Story?</h3>
              <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
                Join our portfolio of successful transformations and discover how we can help your business achieve extraordinary results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="bg-white text-[#1F3D3A] px-8 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-chat-1-line mr-2"></i>
                  Start Your Project
                </Link>
                <Link href="/case-studies" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#1F3D3A] transition-colors cursor-pointer whitespace-nowrap">
                  <i className="ri-file-text-line mr-2"></i>
                  View All Case Studies
                </Link>
              </div>
            </div>
          </div>

          {/* Client Testimonials Carousel */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-[#1F3D3A] mb-4">What Our Clients Say</h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Hear directly from the leaders who trusted us with their transformation journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[{
                name: "Alemayehu Tadesse",
                role: "CEO, TechStart Ethiopia",
                company: "TechStart Ethiopia",
                rating: 5,
                testimonial: "InHub's strategic guidance was instrumental in our successful market entry. Their deep understanding of the Ethiopian fintech landscape helped us navigate complex regulations and build trust with our users. The results exceeded our expectations.",
                avatar: "https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20male%20CEO%20in%20business%20suit%20with%20confident%20expression%2C%20technology%20startup%20founder%2C%20clean%20background%20with%20natural%20lighting&width=300&height=300&seq=testimonial1&orientation=squarish"
              },
              {
                name: "Dr. Meron Haile",
                role: "Chief Medical Officer, HealthTech Innovations",
                company: "HealthTech Innovations",
                rating: 5,
                testimonial: "Working with InHub transformed our approach to healthcare technology. Their team's expertise in regulatory compliance and market strategy helped us successfully launch our medical device solution across Ethiopia's healthcare system.",
                avatar: "https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20female%20doctor%20in%20medical%20coat%20with%20stethoscope%2C%20healthcare%20executive%2C%20clean%20medical%20background%20with%20natural%20lighting&width=300&height=300&seq=testimonial2&orientation=squarish"
              },
              {
                name: "Dawit Mengistu",
                role: "Operations Director, Green Manufacturing Co",
                company: "Green Manufacturing Co",
                rating: 5,
                testimonial: "The digital transformation journey with InHub revolutionized our manufacturing processes. We achieved 40% efficiency improvement and significant cost savings. Their Industry 4.0 implementation was seamless and results-driven.",
                avatar: "https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20male%20operations%20director%20in%20manufacturing%20facility%2C%20industrial%20executive%20with%20safety%20helmet%2C%20modern%20factory%20background&width=300&height=300&seq=testimonial3&orientation=squarish"
              }].map((testimonial, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                  <div className="flex items-center mb-6">
                    <div 
                      className="w-16 h-16 rounded-full bg-gray-200 mr-4"
                      style={{
                        backgroundImage: `url('${testimonial.avatar}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>
                    <div>
                      <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-[#1F3D3A] font-medium">{testimonial.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <i key={i} className="ri-star-fill text-yellow-400"></i>
                    ))}
                  </div>

                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.testimonial}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">All Case Studies</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real transformations, measurable results, lasting impact
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleFilterChange(category.id)}
                className={`px-6 py-3 rounded-full transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${activeFilter === category.id ? 'bg-[#1F3D3A] text-white' : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'}`}
              >
                {category.name}
                <span className={`px-2 py-0.5 rounded-full text-xs ${activeFilter === category.id ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          <div className="text-center text-gray-600 mb-8">
            Showing {filteredAndSortedCases.length} of {caseStudies.length} case studies
          </div>
        </div>
      </section>

      {/* Case Studies Grid/List */}
      <section className="pb-20">
        <div className="container mx-auto px-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {filteredAndSortedCases.map((study) => (
                <div key={study.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1" onClick={() => handleCaseClick(study)}>
                  <div 
                    className="h-64"
                    style={{
                      backgroundImage: `url('${study.image}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="h-full bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                      <div className="flex items-center gap-2">
                        <span className="bg-white/90 text-[#1F3D3A] px-3 py-1 rounded-full text-sm font-medium">
                          {study.industry}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${study.complexity === 'Very High' ? 'bg-red-500/90 text-white' : study.complexity === 'High' ? 'bg-orange-500/90 text-white' : 'bg-green-500/90 text-white'}`}>
                          {study.complexity}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-[#1F3D3A]">{study.title}</h3>
                      {study.featured && (
                        <i className="ri-star-fill text-yellow-500"></i>
                      )}
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{study.challenge}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {study.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                      {study.kpis.slice(0, 2).map((kpi, index) => (
                        <div key={index} className="text-center">
                          <div className="flex items-center justify-center gap-1">
                            <span className="font-bold text-[#1F3D3A]">{kpi.value}</span>
                            {kpi.trend === 'up' && <i className="ri-arrow-up-line text-green-500 text-sm"></i>}
                          </div>
                          <div className="text-xs text-gray-600">{kpi.metric}</div>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{study.duration}</span>
                      <span>{study.teamSize}</span>
                      <i className="ri-arrow-right-line text-[#1F3D3A]"></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredAndSortedCases.map((study) => (
                <div key={study.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer" onClick={() => handleCaseClick(study)}>
                  <div className="flex gap-6">
                    <div 
                      className="w-32 h-32 rounded-xl flex-shrink-0"
                      style={{
                        backgroundImage: `url('${study.image}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                    ></div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-[#1F3D3A] mb-1">{study.title}</h3>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span>{study.industry}</span>
                            <span>•</span>
                            <span>{study.duration}</span>
                            <span>•</span>
                            <span>{study.teamSize}</span>
                          </div>
                        </div>
                        {study.featured && (
                          <i className="ri-star-fill text-yellow-500"></i>
                        )}
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">{study.challenge}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {study.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-4 gap-4">
                        {study.kpis.map((kpi, index) => (
                          <div key={index} className="text-center p-2 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-center gap-1 mb-1">
                              <span className="font-bold text-[#1F3D3A] text-sm">{kpi.value}</span>
                              {kpi.trend === 'up' && <i className="ri-arrow-up-line text-green-500 text-xs"></i>}
                            </div>
                            <div className="text-xs text-gray-600">{kpi.metric}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredAndSortedCases.length === 0 && (
            <div className="text-center py-16">
              <i className="ri-search-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No case studies found</h3>
              <p className="text-gray-500">Try adjusting your search terms or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Case Study Detail Modal */}
      {showModal && selectedCase && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={closeModal}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-[#1F3D3A]">{selectedCase?.title ?? ''}</h2>


              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="p-6">
              <div 
                className="h-64 rounded-xl mb-6"
                style={{
                  backgroundImage: `url('${selectedCase.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#1F3D3A] mb-3">Challenge</h3>
                    <p className="text-gray-700">{selectedCase.challenge}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#1F3D3A] mb-3">Solution</h3>
                    <p className="text-gray-700">{selectedCase.solution}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#1F3D3A] mb-3">Results</h3>
                    <ul className="space-y-2">
                      {selectedCase?.results?.map((result, index) => (
                        <li key={index} className="flex items-center text-gray-700">
                          <i className="ri-check-line text-green-500 mr-2"></i>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <div className="bg-gray-50 p-4 rounded-xl mb-6">
                    <h3 className="text-lg font-semibold text-[#1F3D3A] mb-4">Project Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Industry:</span>
                        <span className="font-medium">{(selectedCase as any)?.industry ?? ''}</span>


                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Duration:</span>
                        <span className="font-medium">{(selectedCase as any)?.duration ?? ''}</span>

                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Team Size:</span>
                        <span className="font-medium">{(selectedCase as any)?.teamSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Investment:</span>
                        <span className="font-medium">{(selectedCase as any).budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Complexity:</span>
                        <span className={`font-medium ${(selectedCase as any).complexity === 'Very High' ? 'text-red-600' : (selectedCase as any).complexity === 'High' ? 'text-orange-600' : 'text-green-600'}`}>{(selectedCase as any).complexity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl mb-6">
                    <h3 className="text-lg font-semibold text-[#1F3D3A] mb-4">Key Metrics</h3>
                    <div className="grid grid-cols-2 gap-3">
                     {(selectedCase as any)?.kpis?.map((kpi: any, index: number) => (

                        <div key={index} className="text-center p-3 bg-white rounded-lg">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <span className="font-bold text-[#1F3D3A]">{kpi.value}</span>
                            {kpi.trend === 'up' && <i className="ri-arrow-up-line text-green-500"></i>}
                          </div>
                          <div className="text-xs text-gray-600">{kpi.metric}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {(selectedCase as any)?.downloadables && (
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <h3 className="text-lg font-semibold text-[#1F3D3A] mb-4">Resources</h3>
                      <div className="space-y-2">
                       {(selectedCase as { downloadables?: any[] } | null)?.downloadables?.map((download, index) => (


                          <button key={index} className="w-full flex items-center justify-between p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                              <i className="ri-file-download-line text-[#1F3D3A]"></i>
                              <span className="text-sm font-medium">{download.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">{download.type}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-[#1F3D3A] mb-4">Client Testimonial</h3>
                <p className="text-gray-700 italic mb-4">{(selectedCase as any)?.testimonial}</p>
                <div className="flex items-center">
                  <div>
                    <div className="font-semibold text-[#1F3D3A]">{(selectedCase as any)?.clientName}</div>
                    <div className="text-gray-600 text-sm">{(selectedCase as any)?.clientRole}</div>
                  </div>
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
