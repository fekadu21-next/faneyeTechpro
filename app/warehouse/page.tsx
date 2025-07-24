
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function WarehousePage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [downloadStatus, setDownloadStatus] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedFormat, setSelectedFormat] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [favorites, setFavorites] = useState([]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [showResourceComparison, setShowResourceComparison] = useState(false);
  const [comparisonList, setComparisonList] = useState([]);

  useEffect(() => {
    setMounted(true);
    // Load favorites and recently viewed from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const savedRecentlyViewed = JSON.parse(localStorage.getItem('recentlyViewed') || '[]');
    setFavorites(savedFavorites);
    setRecentlyViewed(savedRecentlyViewed);
  }, []);

  const categories = [
    { id: 'all', name: 'All Resources', icon: 'ri-apps-line', count: 180, description: 'Complete collection of all available resources' },
    { id: 'templates', name: 'Templates & Frameworks', icon: 'ri-file-text-line', count: 55, description: 'Ready-to-use business templates and frameworks' },
    { id: 'tools', name: 'Assessment Tools', icon: 'ri-tools-line', count: 38, description: 'Interactive tools for business evaluation' },
    { id: 'playbooks', name: 'Strategy Playbooks', icon: 'ri-book-line', count: 34, description: 'Step-by-step strategic guides' },
    { id: 'webinars', name: 'Webinars & Videos', icon: 'ri-video-line', count: 28, description: 'Educational video content and masterclasses' },
    { id: 'reports', name: 'Research Reports', icon: 'ri-file-chart-line', count: 25, description: 'Market research and industry insights' },
    { id: 'case-studies', name: 'Case Studies', icon: 'ri-article-line', count: 22, description: 'Real-world success stories and examples' },
    { id: 'worksheets', name: 'Worksheets', icon: 'ri-edit-line', count: 18, description: 'Interactive planning and analysis sheets' }
  ];

  const resources = [
    {
      id: 1,
      title: 'Business Model Canvas Template',
      category: 'templates',
      type: 'Template',
      description: 'Complete business model canvas with Ethiopian market considerations and local business examples. Includes detailed instructions, case studies, and implementation guide.',
      downloads: 1250,
      rating: 4.9,
      reviews: 127,
      format: 'PDF, Excel',
      size: '2.1 MB',
      difficulty: 'Beginner',
      tags: ['Business Model', 'Strategy', 'Planning'],
      image: 'https://readdy.ai/api/search-image?query=Business%20model%20canvas%20template%20with%20Ethiopian%20business%20examples%20and%20strategic%20planning%20frameworks%2C%20professional%20document%20layout%20with%20colorful%20sections%20and%20clear%20structure%2C%20modern%20business%20template%20design&width=300&height=200&seq=res1&orientation=landscape',
      featured: true,
      premium: false,
      lastUpdated: '2024-02-15',
      price: 0,
      estimatedTime: '2-3 hours',
      author: 'InHub Strategy Team',
      compatibility: ['Excel 2016+', 'Google Sheets', 'PDF Reader'],
      languages: ['English', 'Amharic'],
      industry: ['All Industries'],
      businessSize: ['Startup', 'SME', 'Enterprise']
    },
    {
      id: 2,
      title: 'Go-To-Market Strategy Framework',
      category: 'playbooks',
      type: 'Playbook',
      description: 'Step-by-step guide for launching products in Ethiopian and international markets with proven methodologies. Includes market analysis templates, competitive intelligence frameworks, and launch checklists.',
      downloads: 980,
      rating: 4.8,
      reviews: 89,
      format: 'PDF, PPT',
      size: '5.3 MB',
      difficulty: 'Intermediate',
      tags: ['GTM', 'Market Entry', 'Launch Strategy'],
      image: 'https://readdy.ai/api/search-image?query=Professional%20go-to-market%20strategy%20framework%20document%20with%20charts%20and%20Ethiopian%20market%20analysis%2C%20strategic%20business%20planning%20materials%20with%20colorful%20infographics%20and%20data%20visualization&width=300&height=200&seq=res2&orientation=landscape',
      featured: true,
      premium: false,
      lastUpdated: '2024-02-10',
      price: 0,
      estimatedTime: '4-6 hours',
      author: 'Market Entry Specialists',
      compatibility: ['PowerPoint 2016+', 'PDF Reader'],
      languages: ['English'],
      industry: ['Technology', 'Consumer Goods', 'Services'],
      businessSize: ['SME', 'Enterprise']
    },
    {
      id: 3,
      title: 'Innovation Readiness Assessment',
      category: 'tools',
      type: 'Assessment Tool',
      description: 'Comprehensive self-assessment tool to evaluate your organization\'s innovation capabilities and readiness. Features automated scoring, benchmarking against industry standards, and personalized recommendations.',
      downloads: 1450,
      rating: 4.9,
      reviews: 156,
      format: 'Interactive PDF',
      size: '1.8 MB',
      difficulty: 'Beginner',
      tags: ['Innovation', 'Assessment', 'Capability'],
      image: 'https://readdy.ai/api/search-image?query=Innovation%20assessment%20tool%20interface%20with%20Ethiopian%20business%20context%2C%20professional%20evaluation%20framework%20with%20charts%20and%20scoring%20systems%2C%20modern%20business%20assessment%20design&width=300&height=200&seq=res3&orientation=landscape',
      featured: true,
      premium: false,
      lastUpdated: '2024-02-08',
      price: 0,
      estimatedTime: '1-2 hours',
      author: 'Innovation Lab Team',
      compatibility: ['PDF Reader with Forms'],
      languages: ['English', 'Amharic'],
      industry: ['All Industries'],
      businessSize: ['SME', 'Enterprise']
    },
    {
      id: 4,
      title: 'Advanced Financial Modeling Suite',
      category: 'templates',
      type: 'Template Suite',
      description: 'Comprehensive financial modeling templates including 3-statement models, DCF analysis, scenario planning, and sensitivity analysis specifically designed for Ethiopian market conditions.',
      downloads: 650,
      rating: 4.8,
      reviews: 73,
      format: 'Excel, Google Sheets',
      size: '8.4 MB',
      difficulty: 'Advanced',
      tags: ['Financial Modeling', 'Valuation', 'Investment Analysis'],
      image: 'https://readdy.ai/api/search-image?query=Advanced%20financial%20modeling%20spreadsheet%20templates%20with%20Ethiopian%20business%20scenarios%20and%20complex%20financial%20analysis%20charts%2C%20professional%20finance%20dashboard%20with%20sophisticated%20calculations%20and%20projections&width=300&height=200&seq=res13&orientation=landscape',
      featured: true,
      premium: true,
      lastUpdated: '2024-02-12',
      price: 149,
      estimatedTime: '8-12 hours',
      author: 'Financial Analytics Team',
      compatibility: ['Excel 2019+', 'Google Sheets'],
      languages: ['English'],
      industry: ['Finance', 'Investment', 'Banking'],
      businessSize: ['Enterprise']
    },
    {
      id: 5,
      title: 'Digital Transformation Accelerator',
      category: 'playbooks',
      type: 'Transformation Guide',
      description: 'Complete digital transformation roadmap with technology assessment frameworks, change management strategies, and implementation timelines. Includes vendor evaluation matrices and ROI calculators.',
      downloads: 780,
      rating: 4.7,
      reviews: 92,
      format: 'PDF, PPT, Excel',
      size: '12.3 MB',
      difficulty: 'Advanced',
      tags: ['Digital Transformation', 'Technology Strategy', 'Change Management'],
      image: 'https://readdy.ai/api/search-image?query=Digital%20transformation%20roadmap%20with%20Ethiopian%20business%20technology%20adoption%20strategies%20and%20digital%20frameworks%2C%20professional%20transformation%20guide%20with%20implementation%20timelines%20and%20technology%20assessment%20tools&width=300&height=200&seq=res14&orientation=landscape',
      featured: false,
      premium: true,
      lastUpdated: '2024-02-05',
      price: 199,
      estimatedTime: '10-15 hours',
      author: 'Digital Strategy Consultants',
      compatibility: ['Office 365', 'PDF Reader'],
      languages: ['English'],
      industry: ['Technology', 'Manufacturing', 'Services'],
      businessSize: ['SME', 'Enterprise']
    },
    {
      id: 6,
      title: 'Customer Experience Design Kit',
      category: 'tools',
      type: 'Design Toolkit',
      description: 'Complete customer experience design toolkit with journey mapping templates, persona development frameworks, touchpoint analysis tools, and satisfaction measurement systems.',
      downloads: 920,
      rating: 4.8,
      reviews: 104,
      format: 'PDF, Miro Templates, Figma',
      size: '6.7 MB',
      difficulty: 'Intermediate',
      tags: ['Customer Experience', 'Journey Mapping', 'Design Thinking'],
      image: 'https://readdy.ai/api/search-image?query=Customer%20experience%20design%20toolkit%20with%20Ethiopian%20consumer%20journey%20maps%20and%20touchpoint%20analysis%2C%20professional%20UX%20design%20framework%20with%20customer%20personas%20and%20experience%20mapping%20tools&width=300&height=200&seq=res15&orientation=landscape',
      featured: false,
      premium: false,
      lastUpdated: '2024-02-03',
      price: 0,
      estimatedTime: '3-5 hours',
      author: 'CX Design Team',
      compatibility: ['PDF Reader', 'Miro', 'Figma'],
      languages: ['English'],
      industry: ['Retail', 'Services', 'Technology'],
      businessSize: ['SME', 'Enterprise']
    },
    {
      id: 7,
      title: 'AI Implementation Playbook',
      category: 'playbooks',
      type: 'Implementation Guide',
      description: 'Strategic guide for implementing artificial intelligence solutions in Ethiopian businesses. Includes AI readiness assessment, use case identification, vendor selection criteria, and implementation frameworks.',
      downloads: 450,
      rating: 4.9,
      reviews: 48,
      format: 'PDF, Interactive Worksheets',
      size: '7.2 MB',
      difficulty: 'Advanced',
      tags: ['Artificial Intelligence', 'Technology Implementation', 'Innovation'],
      image: 'https://readdy.ai/api/search-image?query=AI%20implementation%20playbook%20with%20Ethiopian%20business%20artificial%20intelligence%20adoption%20strategies%2C%20professional%20AI%20guide%20with%20machine%20learning%20frameworks%20and%20technology%20implementation%20roadmaps&width=300&height=200&seq=res16&orientation=landscape',
      featured: true,
      premium: true,
      lastUpdated: '2024-02-01',
      price: 299,
      estimatedTime: '6-10 hours',
      author: 'AI Strategy Consultants',
      compatibility: ['PDF Reader', 'Excel'],
      languages: ['English'],
      industry: ['Technology', 'Manufacturing', 'Finance'],
      businessSize: ['Enterprise']
    },
    {
      id: 8,
      title: 'Startup Legal Compliance Checklist',
      category: 'templates',
      type: 'Legal Framework',
      description: 'Comprehensive legal compliance checklist for Ethiopian startups including business registration, tax obligations, employment law, intellectual property protection, and regulatory requirements.',
      downloads: 1890,
      rating: 4.9,
      reviews: 201,
      format: 'PDF, Word, Checklist',
      size: '3.5 MB',
      difficulty: 'Beginner',
      tags: ['Legal Compliance', 'Startup', 'Regulations'],
      image: 'https://readdy.ai/api/search-image?query=Ethiopian%20startup%20legal%20compliance%20checklist%20with%20business%20registration%20requirements%20and%20regulatory%20guidelines%2C%20professional%20legal%20framework%20with%20compliance%20checkboxes%20and%20regulatory%20documentation&width=300&height=200&seq=res17&orientation=landscape',
      featured: true,
      premium: false,
      lastUpdated: '2024-01-28',
      price: 0,
      estimatedTime: '2-4 hours',
      author: 'Legal Advisory Team',
      compatibility: ['PDF Reader', 'Word 2016+'],
      languages: ['English', 'Amharic'],
      industry: ['All Industries'],
      businessSize: ['Startup']
    },
    {
      id: 9,
      title: 'Market Research Methodology Suite',
      category: 'tools',
      type: 'Research Framework',
      description: 'Advanced market research toolkit with quantitative and qualitative research methodologies, survey design templates, statistical analysis guides, and Ethiopian market data sources.',
      downloads: 1120,
      rating: 4.8,
      reviews: 118,
      format: 'PDF, Excel, Survey Templates',
      size: '9.1 MB',
      difficulty: 'Intermediate',
      tags: ['Market Research', 'Data Analysis', 'Consumer Insights'],
      image: 'https://readdy.ai/api/search-image?query=Advanced%20market%20research%20methodology%20suite%20with%20Ethiopian%20consumer%20data%20analysis%20and%20survey%20design%20templates%2C%20professional%20research%20framework%20with%20statistical%20analysis%20tools%20and%20data%20visualization&width=300&height=200&seq=res18&orientation=landscape',
      featured: false,
      premium: false,
      lastUpdated: '2024-01-25',
      price: 0,
      estimatedTime: '4-8 hours',
      author: 'Market Research Team',
      compatibility: ['Excel 2016+', 'PDF Reader'],
      languages: ['English', 'Amharic'],
      industry: ['All Industries'],
      businessSize: ['SME', 'Enterprise']
    },
    {
      id: 10,
      title: 'Sustainability Strategy Framework',
      category: 'playbooks',
      type: 'Strategy Guide',
      description: 'Complete sustainability strategy development framework with ESG assessment tools, carbon footprint calculators, sustainable business model templates, and impact measurement systems.',
      downloads: 580,
      rating: 4.7,
      reviews: 64,
      format: 'PDF, Excel Templates',
      size: '5.8 MB',
      difficulty: 'Intermediate',
      tags: ['Sustainability', 'ESG', 'Impact Measurement'],
      image: 'https://readdy.ai/api/search-image?query=Sustainability%20strategy%20framework%20with%20Ethiopian%20environmental%20and%20social%20impact%20assessment%20tools%2C%20professional%20ESG%20guide%20with%20carbon%20footprint%20calculators%20and%20sustainable%20business%20models&width=300&height=200&seq=res19&orientation=landscape',
      featured: false,
      premium: true,
      lastUpdated: '2024-01-20',
      price: 179,
      estimatedTime: '5-8 hours',
      author: 'Sustainability Consultants',
      compatibility: ['Excel 2016+', 'PDF Reader'],
      languages: ['English'],
      industry: ['Manufacturing', 'Agriculture', 'Energy'],
      businessSize: ['SME', 'Enterprise']
    }
  ];

  const filterResources = () => {
    return resources
      .filter(resource => {
        const matchesCategory = activeTab === 'all' || resource.category === activeTab;
        const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                             resource.author.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' ||
                           (filterType === 'free' && !resource.premium) ||
                           (filterType === 'premium' && resource.premium) ||
                           (filterType === 'featured' && resource.featured);
        const matchesDifficulty = selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty;
        const matchesFormat = selectedFormat === 'all' || resource.format.toLowerCase().includes(selectedFormat.toLowerCase());
        const matchesPrice = priceRange === 'all' ||
                            (priceRange === 'free' && resource.price === 0) ||
                            (priceRange === 'low' && resource.price > 0 && resource.price <= 100) ||
                            (priceRange === 'medium' && resource.price > 100 && resource.price <= 200) ||
                            (priceRange === 'high' && resource.price > 200);

        return matchesCategory && matchesSearch && matchesType && matchesDifficulty && matchesFormat && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.downloads - a.downloads;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'recent') return new Date(b.lastUpdated) - new Date(a.lastUpdated);
        if (sortBy === 'title') return a.title.localeCompare(b.title);
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return 0;
      });
  };

  const filteredResources = filterResources();

  const toggleFavorite = (resourceId) => {
    const newFavorites = favorites.includes(resourceId)
      ? favorites.filter(id => id !== resourceId)
      : [...favorites, resourceId];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const addToRecentlyViewed = (resource) => {
    const updated = [resource.id, ...recentlyViewed.filter(id => id !== resource.id)].slice(0, 10);
    setRecentlyViewed(updated);
    localStorage.setItem('recentlyViewed', JSON.stringify(updated));
  };

  const handleResourceClick = (resource) => {
    if (!mounted) return;
    addToRecentlyViewed(resource);
    setSelectedResource(resource);
  };

  const toggleComparison = (resourceId) => {
    if (comparisonList.includes(resourceId)) {
      setComparisonList(comparisonList.filter(id => id !== resourceId));
    } else if (comparisonList.length < 3) {
      setComparisonList([...comparisonList, resourceId]);
    }
  };

  const handleDownload = async (resource) => {
    if (!mounted) return;

    // Check if it's a premium resource and user doesn't have access
    if (resource.premium) {
      setDownloadStatus({
        type: 'premium',
        message: 'This is a premium resource. Upgrade to InHub Pro to access exclusive content.',
        resource: resource
      });
      return;
    }

    setIsDownloading(true);
    setDownloadStatus({
      type: 'downloading',
      message: `Preparing ${resource.title} for download...`,
      resource: resource
    });

    try {
      // Simulate download process
      await new Promise(resolve => setTimeout(resolve, 2000));

      // In a real implementation, this would trigger the actual file download
      // For now, we'll simulate a successful download

      // Update download count (in real app, this would be done on the server)
      resource.downloads += 1;

      setDownloadStatus({
        type: 'success',
        message: `${resource.title} has been downloaded successfully!`,
        resource: resource
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setDownloadStatus(null);
      }, 5000);

    } catch (error) {
      setDownloadStatus({
        type: 'error',
        message: 'Download failed. Please try again or contact support.',
        resource: resource
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const closeDownloadStatus = () => {
    if (!mounted) return;
    setDownloadStatus(null);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3D3A] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading resource warehouse...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      {downloadStatus && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="text-center">
              {downloadStatus.type === 'downloading' && (
                <div className="mb-4">
                  <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4">
                    <i className="ri-download-cloud-line text-2xl text-blue-600 animate-pulse"></i>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                    <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
                  </div>
                </div>
              )}

              {downloadStatus.type === 'success' && (
                <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                  <i className="ri-check-line text-2xl text-green-600"></i>
                </div>
              )}

              {downloadStatus.type === 'error' && (
                <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-4">
                  <i className="ri-error-warning-line text-2xl text-red-600"></i>
                </div>
              )}

              {downloadStatus.type === 'premium' && (
                <div className="w-16 h-16 flex items-center justify-center bg-yellow-100 rounded-full mx-auto mb-4">
                  <i className="ri-vip-crown-line text-2xl text-yellow-600"></i>
                </div>
              )}

              <h3 className={`text-lg font-bold mb-2 ${downloadStatus.type === 'success' ? 'text-green-800' : downloadStatus.type === 'error' ? 'text-red-800' : downloadStatus.type === 'premium' ? 'text-yellow-800' : 'text-blue-800'}`}>
                {downloadStatus.type === 'downloading' ? 'Downloading...' : downloadStatus.type === 'success' ? 'Download Complete!' : downloadStatus.type === 'error' ? 'Download Failed' : 'Premium Content'}
              </h3>

              <p className="text-gray-600 mb-6">{downloadStatus.message}</p>

              {downloadStatus.type === 'premium' && (
                <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-yellow-800 mb-2">Upgrade Benefits:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Access to all premium resources</li>
                    <li>• Priority customer support</li>
                    <li>• Early access to new content</li>
                    <li>• Expert consultation sessions</li>
                  </ul>
                </div>
              )}

              {downloadStatus.type === 'success' && (
                <div className="bg-green-50 p-4 rounded-lg mb-6">
                  <h4 className="font-semibold text-green-800 mb-2">What's Next?</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Check your downloads folder</li>
                    <li>• Follow the included implementation guide</li>
                    <li>• Join our community for support</li>
                    <li>• Rate this resource to help others</li>
                  </ul>
                </div>
              )}

              <div className="flex gap-3">
                {downloadStatus.type === 'premium' ? (
                  <>
                    <Link href="/contact" className="flex-1 bg-yellow-500 text-white py-3 px-4 rounded-lg hover:bg-yellow-600 transition-colors cursor-pointer text-center">
                      Upgrade to Pro
                    </Link>
                    <button onClick={closeDownloadStatus} className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      Maybe Later
                    </button>
                  </>
                ) : downloadStatus.type === 'error' ? (
                  <>
                    <button onClick={() => { closeDownloadStatus(); handleDownload(downloadStatus.resource); }} className="flex-1 bg-[#1F3D3A] text-white py-3 px-4 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                      Try Again
                    </button>
                    <Link href="/contact" className="flex-1 border border-[#1F3D3A] text-[#1F3D3A] py-3 px-4 rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer text-center">
                      Get Help
                    </Link>
                  </>
                ) : downloadStatus.type === 'downloading' ? (
                  <button disabled className="w-full bg-gray-300 text-gray-500 py-3 px-4 rounded-lg cursor-not-allowed">
                    <i className="ri-loader-4-line animate-spin mr-2"></i>
                    Downloading...
                  </button>
                ) : (
                  <>
                    <button onClick={closeDownloadStatus} className="flex-1 bg-[#1F3D3A] text-white py-3 px-4 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                      Great!
                    </button>
                    <Link href="/contact" className="flex-1 border border-[#1F3D3A] text-[#1F3D3A] py-3 px-4 rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer text-center">
                      Need Help?
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="relative py-24 text-white" style={{ backgroundImage: `linear-gradient(rgba(31, 61, 58, 0.9), rgba(31, 61, 58, 0.9)), url('https://readdy.ai/api/search-image?query=Ethiopian%20professionals%20accessing%20comprehensive%20digital%20business%20resource%20library%20with%20advanced%20tools%20and%20frameworks%2C%20modern%20knowledge%20management%20platform%20with%20interactive%20dashboards%20and%20professional%20learning%20environment&width=1920&height=700&seq=warehousehero2&orientation=landscape')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                New: AI Implementation Playbook Available
              </span>
            </div>
            <h1 className="text-6xl font-bold mb-6">Advanced Business Resource Hub</h1>
            <p className="text-xl max-w-3xl mx-auto mb-8 leading-relaxed">
              Access our comprehensive library of 180+ premium business tools, templates, frameworks, and strategic resources specifically designed for Ethiopian businesses and international expansion
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button onClick={() => setSearchTerm('')} className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors cursor-pointer">
                <i className="ri-search-line mr-2"></i>
                Explore Resources
              </button>
              <Link href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#1F3D3A] transition-colors cursor-pointer">
                Get Custom Solutions
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                <div className="text-2xl font-bold">180+</div>
                <div className="text-sm opacity-90">Resources</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm opacity-90">Downloads</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm opacity-90">Avg Rating</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                <div className="text-2xl font-bold">Weekly</div>
                <div className="text-sm opacity-90">Updates</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                <div className="text-2xl font-bold">Expert</div>
                <div className="text-sm opacity-90">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <i className="ri-bookmark-line text-[#1F3D3A]"></i>
                <span className="font-medium text-[#1F3D3A]">Quick Access:</span>
              </div>
              <button onClick={() => setFilterType('featured')} className="text-gray-600 hover:text-[#1F3D3A] transition-colors cursor-pointer">
                Featured Resources
              </button>
              <button onClick={() => setFilterType('premium')} className="text-gray-600 hover:text-[#1F3D3A] transition-colors cursor-pointer">
                Premium Content
              </button>
              <button onClick={() => setActiveTab('templates')} className="text-gray-600 hover:text-[#1F3D3A] transition-colors cursor-pointer">
                Templates
              </button>
            </div>
            <div className="flex items-center gap-4">
              {favorites.length > 0 && (
                <div className="flex items-center gap-2">
                  <i className="ri-heart-fill text-red-500"></i>
                  <span className="text-sm text-gray-600">{favorites.length} favorites</span>
                </div>
              )}
              {comparisonList.length > 0 && (
                <button onClick={() => setShowResourceComparison(true)} className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm hover:bg-blue-200 transition-colors cursor-pointer">
                  <i className="ri-scales-line"></i>
                  Compare ({comparisonList.length})
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-6">
              <div className="lg:col-span-2 relative">
                <input type="text" placeholder="Search resources, authors, tags..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-sm" />
                <i className="ri-search-line absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              </div>

              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-sm pr-8">
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="recent">Most Recent</option>
                <option value="title">Alphabetical</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>

              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-sm pr-8">
                <option value="all">All Types</option>
                <option value="free">Free Only</option>
                <option value="premium">Premium Only</option>
                <option value="featured">Featured</option>
              </select>

              <div className="flex gap-2">
                <button onClick={() => setViewMode('grid')} className={`px-3 py-3 rounded-lg transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-[#1F3D3A] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
                  <i className="ri-grid-line"></i>
                </button>
                <button onClick={() => setViewMode('list')} className={`px-3 py-3 rounded-lg transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-[#1F3D3A] text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}>
                  <i className="ri-list-check"></i>
                </button>
              </div>

              <button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} className="bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center">
                <i className="ri-filter-line mr-2"></i>
                Filters
                <i className={`ri-arrow-${showAdvancedFilters ? 'up' : 'down'}-s-line ml-2`}></i>
              </button>
            </div>

            {showAdvancedFilters && (
              <div className="bg-white p-6 rounded-xl shadow-sm border mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                    <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-sm pr-8">
                      <option value="all">All Levels</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                    <select value={selectedFormat} onChange={(e) => setSelectedFormat(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-sm pr-8">
                      <option value="all">All Formats</option>
                      <option value="pdf">PDF</option>
                      <option value="excel">Excel</option>
                      <option value="powerpoint">PowerPoint</option>
                      <option value="interactive">Interactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] text-sm pr-8">
                      <option value="all">All Prices</option>
                      <option value="free">Free ($0)</option>
                      <option value="low">$1 - $100</option>
                      <option value="medium">$101 - $200</option>
                      <option value="high">$200+</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <button onClick={() => { setSelectedDifficulty('all'); setSelectedFormat('all'); setPriceRange('all'); setSearchTerm(''); setActiveTab('all'); setFilterType('all'); }} className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer">
                      Clear All Filters
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mb-6">
              <div className="text-gray-600">
                <span className="font-semibold text-[#1F3D3A]">{filteredResources.length}</span>
                <span className="ml-1">resources found</span>
                {searchTerm && (
                  <span className="ml-2 text-sm">
                    for "{searchTerm}"
                  </span>
                )}
              </div>
              {recentlyViewed.length > 0 && (
                <div className="text-sm text-gray-500">
                  Recently viewed: {recentlyViewed.length} items
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <button key={category.id} onClick={() => setActiveTab(category.id)} className={`group flex items-center px-6 py-4 rounded-xl transition-all cursor-pointer ${activeTab === category.id ? 'bg-[#1F3D3A] text-white shadow-lg' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 hover:shadow-md'}`}>
                <i className={`${category.icon} text-xl mr-3`}></i>
                <div className="text-left">
                  <div className="font-semibold">{category.name}</div>
                  <div className={`text-xs ${activeTab === category.id ? 'text-gray-200' : 'text-gray-500'}`}>
                    {category.count} resources
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group">
                  <div className="relative">
                    <div className="h-48 bg-gray-200 rounded-t-xl" style={{ backgroundImage: `url(${resource.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${resource.premium ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        {resource.premium ? `$${resource.price}` : 'Free'}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button onClick={() => toggleFavorite(resource.id)} className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer ${favorites.includes(resource.id) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'}`}>
                        <i className={`ri-heart-${favorites.includes(resource.id) ? 'fill' : 'line'} text-sm`}></i>
                      </button>
                      {comparisonList.length < 3 && (
                        <button onClick={() => toggleComparison(resource.id)} className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer ${comparisonList.includes(resource.id) ? 'bg-blue-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'}`}>
                          <i className="ri-scales-line text-sm"></i>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-xs font-medium">
                        {resource.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs ${resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' : resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {resource.difficulty}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#1F3D3A] mb-2 line-clamp-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{resource.description}</p>

                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center">
                        <i className="ri-star-fill text-yellow-400 mr-1"></i>
                        <span className="font-semibold">{resource.rating}</span>
                        <span className="text-gray-500 ml-1">({resource.reviews})</span>
                      </div>
                      <div className="text-gray-500">
                        <i className="ri-download-line mr-1"></i>
                        {resource.downloads.toLocaleString()}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                      <span>
                        <i className="ri-time-line mr-1"></i>
                        {resource.estimatedTime}
                      </span>
                      <span>
                        <i className="ri-file-line mr-1"></i>
                        {resource.size}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <button onClick={() => handleResourceClick(resource)} className="flex-1 bg-[#1F3D3A] text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-[#2a5248] transition-colors cursor-pointer whitespace-nowrap">
                        View Details
                      </button>
                      <button onClick={() => handleDownload(resource)} className="px-4 py-2 border border-[#1F3D3A] text-[#1F3D3A] rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer">
                        <i className="ri-download-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredResources.map((resource) => (
                <div key={resource.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6">
                  <div className="flex items-start gap-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0" style={{ backgroundImage: `url(${resource.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-[#1F3D3A] mb-1">{resource.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="px-2 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded text-xs font-medium">
                              {resource.type}
                            </span>
                            <span>{resource.author}</span>
                            <span>Updated {resource.lastUpdated}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {resource.premium ? (
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                              ${resource.price}
                            </span>
                          ) : (
                            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                              Free
                            </span>
                          )}
                          <button onClick={() => toggleFavorite(resource.id)} className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors cursor-pointer ${favorites.includes(resource.id) ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            <i className={`ri-heart-${favorites.includes(resource.id) ? 'fill' : 'line'} text-sm`}></i>
                          </button>
                        </div>
                      </div>

                      <p className="text-gray-600 mb-4 line-clamp-2">{resource.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center">
                            <i className="ri-star-fill text-yellow-400 mr-1"></i>
                            <span>{resource.rating} ({resource.reviews})</span>
                          </div>
                          <div>
                            <i className="ri-download-line mr-1"></i>
                            {resource.downloads.toLocaleString()} downloads
                          </div>
                          <div>
                            <i className="ri-time-line mr-1"></i>
                            {resource.estimatedTime}
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${resource.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' : resource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                            {resource.difficulty}
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <button onClick={() => handleResourceClick(resource)} className="bg-[#1F3D3A] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-[#2a5248] transition-colors cursor-pointer whitespace-nowrap">
                            View Details
                          </button>
                          <button onClick={() => handleDownload(resource)} className="border border-[#1F3D3A] text-[#1F3D3A] px-4 py-2 rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer">
                            <i className="ri-download-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredResources.length === 0 && (
            <div className="text-center py-16">
              <i className="ri-search-line text-6xl text-gray-300 mb-6"></i>
              <h3 className="text-2xl font-semibold text-gray-600 mb-4">No resources found</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                We couldn't find any resources matching your criteria. Try adjusting your search or filter settings.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => { setSearchTerm(''); setActiveTab('all'); setFilterType('all'); setSelectedDifficulty('all'); setSelectedFormat('all'); setPriceRange('all'); }} className="bg-[#1F3D3A] text-white px-6 py-3 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                  Clear All Filters
                </button>
                <Link href="/contact" className="border border-[#1F3D3A] text-[#1F3D3A] px-6 py-3 rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer">
                  Request Custom Resource
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {selectedResource && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-5xl max-h-[90vh] overflow-y-auto w-full">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#1F3D3A]">{selectedResource.title}</h2>
                <button onClick={() => setSelectedResource(null)} className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-64 bg-gray-200 rounded-xl mb-6" style={{ backgroundImage: `url(${selectedResource.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#1F3D3A] mb-3">Description</h3>
                    <p className="text-gray-600">{selectedResource.description}</p>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#1F3D3A] mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedResource.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-2 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-sm font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-[#1F3D3A] mb-3">What You'll Get</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-center">
                        <i className="ri-check-line text-green-500 mr-2"></i>
                        Complete {selectedResource.type.toLowerCase()} with instructions
                      </li>
                      <li className="flex items-center">
                        <i className="ri-check-line text-green-500 mr-2"></i>
                        Ethiopian market context and examples
                      </li>
                      <li className="flex items-center">
                        <i className="ri-check-line text-green-500 mr-2"></i>
                        Step-by-step implementation guide
                      </li>
                      <li className="flex items-center">
                        <i className="ri-check-line text-green-500 mr-2"></i>
                        Access to updates and improvements
                      </li>
                      {selectedResource.premium && (
                        <li className="flex items-center">
                          <i className="ri-check-line text-green-500 mr-2"></i>
                          Priority support and consultation
                        </li>
                      )}
                    </ul>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-gray-50 p-6 rounded-xl mb-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">{selectedResource.type}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Format:</span>
                        <span className="font-medium">{selectedResource.format}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium">{selectedResource.size}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Difficulty:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${selectedResource.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' : selectedResource.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                          {selectedResource.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Downloads:</span>
                        <span className="font-medium">{selectedResource.downloads.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          <i className="ri-star-fill text-yellow-400 mr-1"></i>
                          <span className="font-medium">{selectedResource.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Updated:</span>
                        <span className="font-medium">{selectedResource.lastUpdated}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button onClick={() => handleDownload(selectedResource)} disabled={isDownloading} className={`w-full py-3 rounded-lg font-semibold transition-colors cursor-pointer flex items-center justify-center ${isDownloading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-[#1F3D3A] text-white hover:bg-[#2a5248]}'}`}>
                      {isDownloading ? (
                        <>
                          <i className="ri-loader-4-line animate-spin mr-2"></i>
                          Preparing Download...
                        </>
                      ) : (
                        <>
                          <i className="ri-download-line mr-2"></i>
                          {selectedResource.premium ? 'Get Premium Access' : 'Download Free'}
                        </>
                      )}
                    </button>
                    {selectedResource.premium && (
                      <p className="text-xs text-gray-500 text-center">
                        Premium resources require InHub Pro subscription
                      </p>
                    )}
                    <button onClick={() => setSelectedResource(null)} className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                      Close
                    </button>
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
