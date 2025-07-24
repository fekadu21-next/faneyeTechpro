
'use client';

import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState({ projects: 0, clients: 0, experts: 0 });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [slideDirection, setSlideDirection] = useState('right');
  const [showGetStartedModal, setShowGetStartedModal] = useState(false);
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('');
  const [currentModalStep, setCurrentModalStep] = useState(1);

  const heroSlides = [
    {
      title: "Innovation as a Service",
      subtitle: "Transform Your Business Vision",
      description: "Ethiopia's premier innovation hub providing comprehensive business solutions, talent marketplace, and creative design services to accelerate your growth.",
      cta: "Let's Start Now",
      ctaLink: "/consultation",
      image: "https://readdy.ai/api/search-image?query=Modern%20Ethiopian%20business%20innovation%20center%20with%20professional%20consultants%20collaborating%20on%20digital%20transformation%20projects%2C%20diverse%20team%20of%20experts%20working%20with%20advanced%20technology%20and%20data%20analytics%20in%20contemporary%20office%20environment%2C%20sleek%20workspace%20with%20glass%20walls%20and%20modern%20furniture%20showcasing%20business%20excellence%20and%20technological%20advancement&width=1920&height=1080&seq=hero-business-innovation-updated&orientation=landscape"
    },
    {
      title: "Talent Marketplace",
      subtitle: "Connect with Ethiopia's Best",
      description: "Access curated Ethiopian talent across technology, design, marketing, and business development to scale your operations efficiently.",
      cta: "Find Talent",
      ctaLink: "/skills",
      image: "https://readdy.ai/api/search-image?query=Ethiopian%20freelance%20professionals%20working%20independently%20in%20modern%20coworking%20spaces%20and%20coffee%20shops%2C%20mature%20experienced%20consultants%20aged%2028-45%20with%20laptops%20and%20professional%20notebooks%2C%20diverse%20skilled%20contractors%20showcasing%20portfolio%20work%20on%20tablets%2C%20contemporary%20gig%20economy%20workspace%20with%20natural%20lighting%20and%20authentic%20business%20atmosphere%2C%20professional%20freelancers%20networking%20and%20collaborating%20on%20projects&width=1920&height=1080&seq=talentmarketplace-gig&orientation=landscape"
    },
    {
      title: "Design Excellence",
      subtitle: "Where Creativity Meets Strategy",
      description: "Full-service creative studio delivering exceptional UI/UX design, branding solutions, and industrial design innovation for forward-thinking businesses.",
      cta: "View Portfolio",
      ctaLink: "/design",
      image: "https://readdy.ai/api/search-image?query=Ultra-modern%20high-tech%20creative%20design%20studio%20with%20multiple%20curved%204K%20monitors%20displaying%20UI%2FUX%20interfaces%2C%20holographic%20design%20projections%2C%20sleek%20minimalist%20workspace%20with%20LED%20ambient%20lighting%2C%20futuristic%20design%20tools%20and%20tablets%2C%20contemporary%20Ethiopian%20designers%20working%20with%20advanced%20digital%20interfaces%2C%20glass%20surfaces%20reflecting%20colorful%20design%20elements%2C%20modern%20ergonomic%20furniture%2C%20sophisticated%20technology%20setup%20with%20wireless%20charging%20stations%20and%20smart%20displays&width=1920&height=1080&seq=design-tech-creative-space&orientation=landscape"
    }
  ];

  useEffect(() => {
    setIsVisible(true);

    const slideInterval = setInterval(() => {
      setSlideDirection('right');
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsTransitioning(false);
      }, 800);
    }, 5000);

    const animateStats = () => {
      const targets = { projects: 150, clients: 89, experts: 45 };
      const duration = 2000;
      const steps = 60;
      const stepTime = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setStats({
          projects: Math.floor(targets.projects * progress),
          clients: Math.floor(targets.clients * progress),
          experts: Math.floor(targets.experts * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
          setStats(targets);
        }
      }, stepTime);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id === 'stats-section') {
          animateStats();
        }
      });
    });

    const statsElement = document.getElementById('stats-section');
    if (statsElement) observer.observe(statsElement);

    return () => {
      clearInterval(slideInterval);
      observer.disconnect();
    };
  }, []);

  const nextSlide = () => {
    setSlideDirection('right');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setIsTransitioning(false);
    }, 800);
  };

  const prevSlide = () => {
    setSlideDirection('left');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setIsTransitioning(false);
    }, 800);
  };

  const goToSlide = (index) => {
    if (index !== currentSlide) {
      setSlideDirection(index > currentSlide ? 'right' : 'left');
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSlide(index);
        setIsTransitioning(false);
      }, 800);
    }
  };

  const testimonials = [
    {
      name: "Meron Tadesse",
      role: "CEO, TechFlow Solutions",
      content: "InHub transformed our go-to-market strategy. Their insights helped us achieve 300% growth in just 8 months.",
      avatar: "https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20businesswoman%20CEO%20in%20modern%20office%20setting%2C%20confident%20smile%2C%20business%20suit%2C%20contemporary%20corporate%20portrait%2C%20bright%20natural%20lighting%2C%20clean%20professional%20background&width=150&height=150&seq=test1&orientation=squarish"
    },
    {
      name: "Daniel Bekele",
      role: "Founder, AgriTech Innovations",
      content: "The talent marketplace connected us with exceptional developers. The quality and dedication exceeded our expectations.",
      avatar: "https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20businessman%20founder%20in%20modern%20workspace%2C%20confident%20expression%2C%20business%20casual%20attire%2C%20contemporary%20corporate%20portrait%2C%20bright%20office%20environment%2C%20clean%20professional%20background&width=150&height=150&seq=test2&orientation=squarish"
    },
    {
      name: "Sara Mohammed",
      role: "Marketing Director, FinanceHub",
      content: "InHub Design created a brand identity that perfectly captures our vision. Their creative process is truly exceptional.",
      avatar: "https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20businesswoman%20marketing%20director%20in%20creative%20office%2C%20warm%20smile%2C%20professional%20attire%2C%20contemporary%20corporate%20portrait%2C%20modern%20workspace%20background%2C%20natural%20lighting&width=150&height=150&seq=test3&orientation=squarish"
    }
  ];

  const servicesData = [
    {
      icon: 'ri-rocket-line',
      title: 'Go-To-Market Strategy',
      description: 'Launch your products with precision-crafted market entry strategies that maximize impact and minimize risk.',
      color: 'bg-blue-500',
      features: ['Market Analysis', 'Competitive Positioning', 'Launch Planning'],
      category: 'strategy',
      price: 'Starting from $8,500',
      duration: '4-6 weeks',
      deliverables: ['Market Research Report', 'Go-to-Market Plan', 'Launch Timeline']
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Growth Strategy',
      description: 'Scale your business with data-driven growth frameworks tailored to Ethiopian and global markets.',
      color: 'bg-green-500',
      features: ['Growth Metrics', 'Scaling Framework', 'Market Expansion'],
      category: 'growth',
      price: 'Starting from $10,000',
      duration: '6-8 weeks',
      deliverables: ['Growth Strategy Document', 'KPI Dashboard', 'Scaling Roadmap']
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'Innovation Strategy',
      description: 'Transform your organization with cutting-edge innovation methodologies and future-focused thinking.',
      color: 'bg-purple-500',
      features: ['Innovation Framework', 'Future Planning', 'Tech Integration'],
      category: 'innovation',
      price: 'Starting from $12,000',
      duration: '8-10 weeks',
      deliverables: ['Innovation Framework', 'Technology Roadmap', 'Implementation Plan']
    },
    {
      icon: 'ri-settings-line',
      title: 'Business Logic Development',
      description: 'Build robust business models with clear value propositions and sustainable competitive advantages.',
      color: 'bg-orange-500',
      features: ['Business Modeling', 'Value Proposition', 'Competitive Analysis'],
      category: 'business',
      price: 'Starting from $7,500',
      duration: '4-6 weeks',
      deliverables: ['Business Model Canvas', 'Value Proposition Design', 'Competitive Analysis']
    },
    {
      icon: 'ri-product-hunt-line',
      title: 'Product Development',
      description: 'From concept to market with comprehensive product development and validation processes.',
      color: 'bg-red-500',
      features: ['Product Design', 'Validation Testing', 'Market Fit'],
      category: 'product',
      price: 'Starting from $15,000',
      duration: '8-12 weeks',
      deliverables: ['Product Specifications', 'Prototype', 'Market Validation Report']
    },
    {
      icon: 'ri-customer-service-line',
      title: 'Service Development',
      description: 'Design and optimize service offerings that delight customers and drive business growth.',
      color: 'bg-teal-500',
      features: ['Service Design', 'Customer Experience', 'Process Optimization'],
      category: 'service',
      price: 'Starting from $9,000',
      duration: '6-8 weeks',
      deliverables: ['Service Blueprint', 'Customer Journey Map', 'Process Documentation']
    }
  ];

  const getStartedOptions = [
    {
      id: 'consultation',
      icon: 'ri-calendar-check-line',
      title: 'Free Consultation',
      description: 'Book a 30-minute strategy session with our experts',
      action: 'Schedule Now',
      link: '/consultation',
      color: 'bg-green-500',
      popular: true,
      badge: 'Most Popular'
    },
    {
      id: 'membership',
      icon: 'ri-vip-crown-line',
      title: 'Premium Membership',
      description: 'Join our exclusive member community with benefits',
      action: 'Become Member',
      link: '/business-registration',
      color: 'bg-purple-500',
      popular: false,
      badge: 'Best Value'
    },
    {
      id: 'ai-diagnosis',
      icon: 'ri-ai-generate',
      title: 'AI Business Diagnosis',
      description: 'Get instant insights with our AI-powered assessment tool',
      action: 'Start Assessment',
      link: '/ai-diagnosis',
      color: 'bg-blue-500',
      popular: false,
      badge: 'Smart Choice'
    },
    {
      id: 'contact',
      icon: 'ri-chat-3-line',
      title: 'Contact Us',
      description: 'Speak directly with our team about your needs',
      action: 'Get in Touch',
      link: '/contact',
      color: 'bg-orange-500',
      popular: false,
      badge: 'Personal Touch'
    }
  ];

  const subscriptionTiers = [
    {
      id: 'basic',
      name: 'Basic Member',
      price: 'Free',
      description: 'Perfect for startups and small businesses',
      features: [
        'Monthly newsletters',
        'Community access',
        'Event invitations',
        '10% service discount',
        'Basic support'
      ],
      color: 'border-gray-300',
      buttonColor: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
      icon: 'ri-medal-line'
    },
    {
      id: 'premium',
      name: 'Premium Member',
      price: '$99/month',
      description: 'For growing businesses seeking acceleration',
      features: [
        'All Basic features',
        'Priority support',
        'Exclusive workshops',
        '20% service discount',
        'Free monthly consultation',
        'Networking events access'
      ],
      color: 'border-purple-500',
      buttonColor: 'bg-purple-500 text-white hover:bg-purple-600',
      icon: 'ri-vip-crown-line',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Member',
      price: '$299/month',
      description: 'For established enterprises and organizations',
      features: [
        'All Premium features',
        'Dedicated account manager',
        'Custom workshops',
        '30% service discount',
        'Quarterly business reviews',
        'Strategic planning sessions'
      ],
      color: 'border-gold-500',
      buttonColor: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600',
      icon: 'ri-vip-diamond-line'
    }
  ];

  const ecosystemFeatures = [
    {
      icon: 'ri-check-double-line',
      text: 'Curated Ethiopian talent pool'
    },
    {
      icon: 'ri-award-line',
      text: 'Skill certification programs'
    },
    {
      icon: 'ri-wallet-line',
      text: 'Integrated wallet system'
    },
    {
      icon: 'ri-shield-check-line',
      text: 'Quality assurance guarantee'
    }
  ];

  const designFeatures = [
    {
      icon: 'ri-computer-line',
      text: 'UI/UX Design Excellence'
    },
    {
      icon: 'ri-brush-line',
      text: 'Brand Identity Creation'
    },
    {
      icon: 'ri-tools-line',
      text: 'Industrial Design Innovation'
    },
    {
      icon: 'ri-eye-line',
      text: 'Visual Strategy Consulting'
    }
  ];

  const handleGetStartedClick = (serviceIndex) => {
    setSelectedServiceCategory(servicesData[serviceIndex].category);
    setShowGetStartedModal(true);
    setCurrentModalStep(1);
  };

  const closeGetStartedModal = () => {
    setShowGetStartedModal(false);
    setSelectedServiceCategory('');
    setCurrentModalStep(1);
  };

  const nextModalStep = () => {
    if (currentModalStep < 2) {
      setCurrentModalStep(currentModalStep + 1);
    }
  };

  const prevModalStep = () => {
    if (currentModalStep > 1) {
      setCurrentModalStep(currentModalStep - 1);
    }
  };

  const getSelectedService = () => {
    return servicesData.find(service => service.category === selectedServiceCategory);
  };

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section with 3D Cube Effect */}
      <section className="relative h-screen overflow-hidden">
        {/* 3D Sliding Background */}
        <div className="absolute inset-0 perspective-1000">
          <div className="relative w-full h-full preserve-3d">
            {heroSlides.map((slide, index) => {
              const isActive = index === currentSlide;
              const isPrev = index === (currentSlide - 1 + heroSlides.length) % heroSlides.length;
              const isNext = index === (currentSlide + 1) % heroSlides.length;

              let transform = '';
              if (isActive) {
                transform = 'translateX(0) rotateY(0deg)';
              } else if (isPrev) {
                transform = slideDirection === 'right' ? 'translateX(-100%) rotateY(-90deg)' : 'translateX(100%) rotateY(90deg)';
              } else if (isNext) {
                transform = slideDirection === 'right' ? 'translateX(100%) rotateY(90deg)' : 'translateX(-100%) rotateY(-90deg)';
              } else {
                transform = 'translateX(200%) rotateY(180deg)';
              }

              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out transform-gpu preserve-3d backface-hidden ${isActive ? 'opacity-100 z-20' : 'opacity-0 z-10'}`}
                  style={{
                    transform,
                  }}
                >
                  <div
                    className="w-full h-full bg-cover bg-center relative"
                    style={{
                      backgroundImage: `url('${slide.image}')`,
                      filter: isActive ? 'none' : 'blur(2px)'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#1F3D3A]/85 via-[#1F3D3A]/60 to-transparent"></div>
                    <div className="absolute inset-0">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/20 via-transparent to-green-500/10"></div>
                      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>

                    {/* Dynamic geometric patterns */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className={`absolute top-10 right-10 w-32 h-32 border-2 border-green-400/30 rounded-full transition-all duration-2000 ${isActive ? 'animate-spin' : ''}`}></div>
                      <div className={`absolute bottom-20 left-20 w-24 h-24 border-2 border-white/20 rotate-45 transition-all duration-1500 ${isActive ? 'animate-pulse' : ''}`}></div>
                      <div className={`absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-green-400/20 to-blue-500/20 rounded-lg transition-all duration-1000 ${isActive ? 'animate-bounce' : ''}`}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content with Staggered Animations */}
        <div className="flex items-center justify-center min-h-screen text-white relative z-30">
          <div className="container mx-auto px-6">
            <div className="text-center">
              <div
                className={`inline-block px-8 py-4 bg-gradient-to-r from-green-500/30 to-blue-500/30 backdrop-blur-md rounded-full text-green-200 text-sm font-bold mb-8 border border-green-400/40 shadow-lg transform transition-all duration-1000 ${isTransitioning ? slideDirection === 'right' ? 'translate-x-full opacity-0 rotate-12' : 'translate-x-[-100%] opacity-0 rotate-[-12deg]' : 'translate-x-0 opacity-100 rotate-0'}`}
                style={{ transitionDelay: '0ms' }}
              >
                <i className="ri-sparkling-line mr-2"></i>
                {heroSlides[currentSlide].subtitle}
              </div>

              <h1
                className={`text-6xl md:text-8xl font-black mb-8 leading-tight transform transition-all duration-1200 ${isTransitioning ? slideDirection === 'right' ? 'translate-x-full opacity-0 scale-110' : 'translate-x-[-100%] opacity-0 scale-90' : 'translate-x-0 opacity-100 scale-100'}`}
                style={{
                  transitionDelay: '200ms',
                  textShadow: '0 4px 20px rgba(0,0,0,0.5)'
                }}
              >
                {heroSlides[currentSlide].title === "Design Excellence" ? (
                  <>
                    Design{` `}
                    <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent animate-pulse">
                      Excellence
                    </span>
                  </>
                ) : heroSlides[currentSlide].title === "Innovation as a Service" ? (
                  <>
                    Innovation as a{` `}
                    <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent animate-pulse">
                      Service
                    </span>
                  </>
                ) : heroSlides[currentSlide].title === "Talent Marketplace" ? (
                  <>
                    Talent{` `}
                    <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent animate-pulse">
                      Marketplace
                    </span>
                  </>
                ) : (
                  heroSlides[currentSlide].title
                )}
              </h1>

              <p
                className={`text-xl md:text-2xl mb-12 max-w-4xl mx-auto text-gray-100 leading-relaxed transform transition-all duration-1400 ${isTransitioning ? slideDirection === 'right' ? 'translate-x-full opacity-0 translate-y-8' : 'translate-x-[-100%] opacity-0 translate-y-8' : 'translate-x-0 opacity-100 translate-y-0'}`}
                style={{
                  transitionDelay: '400ms',
                  textShadow: '0 2px 10px rgba(0,0,0,0.5)'
                }}
              >
                {heroSlides[currentSlide].description}
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-6 justify-center transform transition-all duration-1600 ${isTransitioning ? slideDirection === 'right' ? 'translate-x-full opacity-0 translate-y-12' : 'translate-x-[-100%] opacity-0 translate-y-12' : 'translate-x-0 opacity-100 translate-y-0'}`}
                style={{ transitionDelay: '600ms' }}
              >
                <Link
                  href={heroSlides[currentSlide].ctaLink}
                  className="group relative bg-gradient-to-r from-green-500 to-emerald-600 text-white px-12 py-5 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-green-500/50 whitespace-nowrap cursor-pointer overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    <i className="ri-rocket-line mr-2"></i>
                    {heroSlides[currentSlide].cta}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                </Link>
                <Link
                  href="/services"
                  className="group relative bg-transparent border-2 border-white text-white px-12 py-5 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-blue-500/30 whitespace-nowrap cursor-pointer overflow-hidden backdrop-blur-sm"
                >
                  <span className="relative z-10 flex items-center">
                    <i className="ri-service-line mr-2"></i>
                    Explore Services
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <i className="ri-service-line mr-2"></i>
                    Explore Services
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced 3D Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 hover:from-white/30 hover:to-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center text-white hover:scale-125 transition-all duration-500 cursor-pointer z-40 border border-white/30 shadow-2xl group"
          style={{
            transform: 'translateY(-50%) perspective(1000px) rotateY(-10deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          <i className="ri-arrow-left-s-line text-2xl group-hover:translate-x-[-2px] transition-transform duration-300"></i>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 w-16 h-16 bg-gradient-to-br from-white/20 to-white/5 hover:from-white/30 hover:to-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center text-white hover:scale-125 transition-all duration-500 cursor-pointer z-40 border border-white/30 shadow-2xl group"
          style={{
            transform: 'translateY(-50%) perspective(1000px) rotateY(10deg)',
            transformStyle: 'preserve-3d'
          }}
        >
          <i className="ri-arrow-right-s-line text-2xl group-hover:translate-x-[2px] transition-transform duration-300"></i>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* 3D Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex space-x-6 z-40">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative group transition-all duration-700 cursor-pointer transform-style:preserve-3d ${index === currentSlide ? 'w-16 h-4' : 'w-4 h-4 hover:w-6'}`}
              style={{
                transform: 'perspective(1000px) rotateX(20deg)'
              }}
            >
              <div className={`absolute inset-0 rounded-full transition-all duration-500 ${index === currentSlide ? 'bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 shadow-lg shadow-green-500/50' : 'bg-white/60 hover:bg-white/80 shadow-md'}`}></div>
              {index === currentSlide && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-400 rounded-full animate-pulse"></div>
              )}
              <div className={`absolute inset-0 rounded-full transition-all duration-300 ${index === currentSlide ? 'animate-ping bg-green-400/40' : ''}`}></div>
            </button>
          ))}
        </div>

        {/* Animated Progress Ring */}
        <div className="absolute bottom-6 right-6 w-16 h-16 z-40">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * ((currentSlide + 1) / heroSlides.length))}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#06D6A0" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-sm">
            {currentSlide + 1}/{heroSlides.length}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="py-16 bg-[#1F3D3A]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div className="transform transition-all duration-500 hover:scale-105">
              <div className="text-5xl font-bold text-green-400 mb-2">{stats.projects}+</div>
              <div className="text-xl">Successful Projects</div>
              <div className="text-gray-300 mt-2">Delivered with Excellence</div>
            </div>
            <div className="transform transition-all duration-500 hover:scale-105">
              <div className="text-5xl font-bold text-green-400 mb-2">{stats.clients}+</div>
              <div className="text-xl">Happy Clients</div>
              <div className="text-gray-300 mt-2">Across Ethiopia & Beyond</div>
            </div>
            <div className="transform transition-all duration-500 hover:scale-105">
              <div className="text-5xl font-bold text-green-400 mb-2">{stats.experts}+</div>
              <div className="text-xl">Expert Professionals</div>
              <div className="text-gray-300 mt-2">Ready to Serve</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#1F3D3A]/10 rounded-full text-[#1F3D3A] text-sm font-semibold mb-4">
              Our Expertise
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#1F3D3A] mb-4">Core Innovation Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions to transform your business and accelerate growth with cutting-edge methodologies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, index) => (
              <div key={index} className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2">
                <div className={`w-16 h-16 flex items-center justify-center ${service.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`${service.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#1F3D3A] mb-4 group-hover:text-green-600 transition-colors">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                  <Link
                    href="/services"
                    className="flex-1 bg-transparent border-2 border-[#1F3D3A] text-[#1F3D3A] py-3 px-4 rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-all duration-300 cursor-pointer text-sm font-medium text-center whitespace-nowrap"
                  >
                    Learn More
                  </Link>
                  <button
                    onClick={() => handleGetStartedClick(index)}
                    onDoubleClick={() => window.location.href = '/business-registration'}
                    className="w-full sm:flex-1 bg-gradient-to-r from-[#1F3D3A] to-green-600 text-white py-3 px-4 rounded-lg hover:from-[#2a5248] hover:to-green-700 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl cursor-pointer text-sm font-medium text-center whitespace-nowrap relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <i className="ri-rocket-launch-line mr-2"></i>
                      Get Started Now
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-green-400 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="bg-[#1F3D3A] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#2a5248] transition-all duration-300 transform hover:scale-105 whitespace-nowrap cursor-pointer">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-green-100 rounded-full text-green-600 text-sm font-semibold mb-4">
              Client Success Stories
            </div>
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Hear from business leaders who have transformed their operations with InHub
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover object-top mr-4"
                  />
                  <div>
                    <div className="font-bold text-[#1F3D3A]">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 italic">{testimonial.content}</p>
                <div className="flex text-yellow-400 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="ri-star-fill"></i>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrated Ecosystem Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-[#1F3D3A]/10 rounded-full text-[#1F3D3A] text-sm font-semibold mb-4">
              Integrated Ecosystem
            </div>
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Complete Innovation Ecosystem</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Three integrated platforms serving all your business innovation needs
            </p>
          </div>

          <div className="space-y-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-xl mr-4">
                    <i className="ri-team-line text-3xl text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#1F3D3A]">InHub Skills</h3>
                    <div className="text-blue-600 font-semibold">Talent Marketplace</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 text-lg">
                  Ethiopia's premier talent marketplace connecting businesses with skilled professionals across technology, marketing, design, and administration.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {ecosystemFeatures.map((item, idx) => (
                    <div key={idx} className="flex items-center">
                      <i className={`${item.icon} text-green-500 mr-2`}></i>
                      <span className="text-gray-600 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
                <Link href="/skills" className="inline-flex items-center text-[#1F3D3A] font-semibold hover:text-[#2a5248] transition-colors cursor-pointer">
                  Explore Talent Marketplace
                  <i className="ri-arrow-right-line ml-2"></i>
                </Link>
              </div>
              <div
                className="order-1 lg:order-2 h-96 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage: `url('https://readdy.ai/api/search-image?query=Ethiopian%20professionals%20working%20on%20computers%20in%20modern%20coworking%20space%2C%20diverse%20team%20collaboration%2C%20laptops%20and%20digital%20screens%2C%20contemporary%20office%20environment%20with%20natural%20lighting%2C%20showcasing%20skilled%20workforce%20and%20professional%20development%20in%20Ethiopia&width=600&height=400&seq=skills1&orientation=landscape')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div
                className="h-96 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
                style={{
                  backgroundImage: `url('https://readdy.ai/api/search-image?query=Creative%20Ethiopian%20designers%20working%20on%20UI%2FUX%20projects%2C%20multiple%20monitors%20showing%20design%20interfaces%20and%20prototypes%2C%20modern%20design%20studio%20with%20creative%20materials%20and%20inspiration%20boards%2C%20bright%20contemporary%20workspace%20with%20artistic%20elements%20and%20design%20tools&width=600&height=400&seq=design1&orientation=landscape')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-xl mr-4">
                    <i className="ri-palette-line text-3xl text-purple-600"></i>
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-[#1F3D3A]">InHub Design</h3>
                    <div className="text-purple-600 font-semibold">Creative Studio</div>
                  </div>
                </div>
                <p className="text-gray-600 mb-6 text-lg">
                  Full-service creative studio specializing in UI/UX design, branding, and industrial product design with award-winning expertise.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {designFeatures.map((item, idx) => (
                    <div key={idx} className="flex items-center">
                      <i className={`${item.icon} text-green-500 mr-2`}></i>
                      <span className="text-gray-600 text-sm">{item.text}</span>
                    </div>
                  ))}
                </div>
                <Link href="/design" className="inline-flex items-center text-[#1F3D3A] font-semibold hover:text-[#2a5248] transition-colors cursor-pointer">
                  View Design Portfolio
                  <i className="ri-arrow-right-line ml-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative py-20 bg-[#1F3D3A] overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of Ethiopian businesses that have accelerated their growth with our expert consulting and talented professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/consultation" className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer">
              Get Free Consultation
            </Link>
            <Link href="/ai-diagnosis" className="flex items-center px-6 py-3 rounded-lg font-medium transition-colors cursor-pointer bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700">
              Complete Analysis<i className="ri-arrow-right-line ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Get Started Modal */}
      {showGetStartedModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-3xl">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-[#1F3D3A] to-green-600 rounded-full">
                  <i className="ri-rocket-launch-line text-white text-sm"></i>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-[#1F3D3A]">Get Started with InHub</h2>
                  <p className="text-sm text-gray-600">Choose your preferred way to begin your transformation journey</p>
                </div>
              </div>
              <button
                onClick={closeGetStartedModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xl text-gray-600"></i>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {currentModalStep === 1 && (
                <div className="space-y-8">
                  {/* Selected Service Info */}
                  {selectedServiceCategory && (
                    <div className="bg-gradient-to-r from-[#1F3D3A]/10 to-green-600/10 p-6 rounded-2xl mb-8">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`w-12 h-12 flex items-center justify-center ${getSelectedService()?.color} rounded-xl`}>
                          <i className={`${getSelectedService()?.icon} text-xl text-white`}></i>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-[#1F3D3A]">{getSelectedService()?.title}</h3>
                          <p className="text-gray-600">{getSelectedService()?.description}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/80 p-4 rounded-xl">
                          <div className="flex items-center space-x-2 mb-2">
                            <i className="ri-money-dollar-circle-line text-green-600"></i>
                            <span className="font-semibold text-gray-800">Investment</span>
                          </div>
                          <p className="text-sm text-gray-600">{getSelectedService()?.price}</p>
                        </div>
                        <div className="bg-white/80 p-4 rounded-xl">
                          <div className="flex items-center space-x-2 mb-2">
                            <i className="ri-time-line text-blue-600"></i>
                            <span className="font-semibold text-gray-800">Timeline</span>
                          </div>
                          <p className="text-sm text-gray-600">{getSelectedService()?.duration}</p>
                        </div>
                        <div className="bg-white/80 p-4 rounded-xl">
                          <div className="flex items-center space-x-2 mb-2">
                            <i className="ri-file-list-line text-purple-600"></i>
                            <span className="font-semibold text-gray-800">Deliverables</span>
                          </div>
                          <div className="space-y-1">
                            {getSelectedService()?.deliverables.slice(0, 2).map((item, idx) => (
                              <p key={idx} className="text-xs text-gray-600">• {item}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Get Started Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {getStartedOptions.map((option) => (
                      <div key={option.id} className="relative group cursor-pointer">
                        <Link
                          href={option.link}
                          className="block bg-white border-2 border-gray-200 hover:border-[#1F3D3A] rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                          onClick={closeGetStartedModal}
                        >
                          {option.popular && (
                            <div className="absolute -top-3 left-6">
                              <span className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                {option.badge}
                              </span>
                            </div>
                          )}

                          {!option.popular && option.badge && (
                            <div className="absolute -top-3 left-6">
                              <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                {option.badge}
                              </span>
                            </div>
                          )}

                          <div className="flex items-start space-x-4 mb-4">
                            <div className={`w-12 h-12 flex items-center justify-center ${option.color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                              <i className={`${option.icon} text-xl text-white`}></i>
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-[#1F3D3A] mb-2 group-hover:text-green-600 transition-colors">
                                {option.title}
                              </h3>
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {option.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <i className="ri-check-line text-green-500"></i>
                              <span className="text-sm text-gray-600">
                                {option.id === 'consultation' && 'Free & No Commitment'}
                                {option.id === 'membership' && 'Exclusive Benefits'}
                                {option.id === 'ai-diagnosis' && 'Instant Results'}
                                {option.id === 'contact' && 'Direct Communication'}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2 text-[#1F3D3A] group-hover:text-green-600 transition-colors">
                              <span className="text-sm font-semibold">{option.action}</span>
                              <i className="ri-arrow-right-line"></i>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* Subscription Tiers Preview */}
                  <div className="bg-gray-50 p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-[#1F3D3A]">Membership Benefits</h3>
                      <button
                        onClick={() => setCurrentModalStep(2)}
                        className="text-green-600 hover:text-green-700 font-semibold text-sm cursor-pointer"
                      >
                        View All Plans <i className="ri-arrow-right-line ml-1"></i>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {subscriptionTiers.map((tier) => (
                        <div key={tier.id} className={`bg-white p-4 rounded-xl border-2 ${tier.color} relative ${tier.popular ? 'ring-2 ring-purple-500' : ''}`}>
                          {tier.popular && (
                            <div className="absolute -top-3 left-6">
                              <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                RECOMMENDED
                              </span>
                            </div>
                          )}

                          <div className="text-center mb-3">
                            <i className={`${tier.icon} text-2xl mb-2 ${tier.popular ? 'text-purple-500' : 'text-gray-600'}`}></i>
                            <h4 className="font-bold text-[#1F3D3A]">{tier.name}</h4>
                            <p className="text-lg font-bold text-gray-800">{tier.price}</p>
                          </div>

                          <ul className="space-y-1 text-xs text-gray-600">
                            {tier.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="flex items-center">
                                <i className="ri-check-line text-green-500 mr-1"></i>
                                {feature}
                              </li>
                            ))}
                            {tier.features.length > 3 && (
                              <li className="text-gray-500 italic">+{tier.features.length - 3} more...</li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Why Choose InHub */}
                  <div className="bg-gradient-to-r from-[#1F3D3A] to-green-600 p-6 rounded-2xl text-white">
                    <h3 className="text-xl font-bold mb-4">Why Choose InHub?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <i className="ri-medal-line text-yellow-400"></i>
                        <span>5+ Years Experience</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="ri-team-line text-blue-400"></i>
                        <span>150+ Experts</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="ri-trophy-line text-green-400"></i>
                        <span>98% Success Rate</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="ri-shield-check-line text-purple-400"></i>
                        <span>Quality Guaranteed</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="ri-customer-service-line text-orange-400"></i>
                        <span>24/7 Support</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="ri-global-line text-red-400"></i>
                        <span>Global Standards</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Membership Details Step */}
              {currentModalStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-[#1F3D3A] mb-2">Choose Your Membership</h3>
                    <p className="text-gray-600">Select the plan that best fits your business needs</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {subscriptionTiers.map((tier) => (
                      <div key={tier.id} className={`bg-white rounded-2xl border-2 ${tier.color} p-6 relative ${tier.popular ? 'transform scale-105 shadow-2xl' : 'shadow-lg'}`}>
                        {tier.popular && (
                          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                              MOST POPULAR
                            </span>
                          </div>
                        )}

                        <div className="text-center mb-6">
                          <div className={`w-16 h-16 flex items-center justify-center ${tier.popular ? 'bg-purple-100' : 'bg-gray-100'} rounded-2xl mx-auto mb-4`}>
                            <i className={`${tier.icon} text-2xl ${tier.popular ? 'text-purple-600' : 'text-gray-600'}`}></i>
                          </div>
                          <h3 className="text-xl font-bold text-[#1F3D3A] mb-2">{tier.name}</h3>
                          <div className="text-3xl font-bold text-gray-800 mb-2">{tier.price}</div>
                          <p className="text-gray-600 text-sm">{tier.description}</p>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold text-[#1F3D3A] mb-3">Features included:</h4>
                          <ul className="space-y-2">
                            {tier.features.map((feature, idx) => (
                              <li key={idx} className="flex items-start text-sm text-gray-600">
                                <i className="ri-check-line text-green-500 mr-2 mt-0.5"></i>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Link
                          href={tier.id === 'basic' ? '/auth/signup' : '/business-registration'}
                          className={`w-full ${tier.buttonColor} py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer text-center block`}
                          onClick={closeGetStartedModal}
                        >
                          {tier.id === 'basic' ? 'Join Free' : 'Get Started'}
                        </Link>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 p-6 rounded-2xl">
                    <h4 className="font-semibold text-[#1F3D3A] mb-3">Not sure which plan is right for you?</h4>
                    <p className="text-gray-600 mb-4">
                      Book a free consultation with our experts to discuss your specific needs and get personalized recommendations.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href="/consultation"
                        className="bg-[#1F3D3A] text-white px-6 py-3 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer text-center"
                        onClick={closeGetStartedModal}
                      >
                        <i className="ri-calendar-check-line mr-2"></i>
                        Book Free Consultation
                      </Link>
                      <Link
                        href="/contact"
                        className="border border-[#1F3D3A] text-[#1F3D3A] px-6 py-3 rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer text-center"
                        onClick={closeGetStartedModal}
                      >
                        <i className="ri-chat-3-line mr-2"></i>
                        Contact Us
                      </Link>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-4">
                    <button
                      onClick={() => setCurrentModalStep(1)}
                      className="flex items-center text-gray-600 hover:text-[#1F3D3A] transition-colors cursor-pointer"
                    >
                      <i className="ri-arrow-left-line mr-2"></i>
                      Back to Options
                    </button>
                    <div className="text-sm text-gray-500">
                      <i className="ri-shield-check-line mr-1"></i>
                      30-day money-back guarantee
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Info Footer */}
              <div className="border-t border-gray-200 pt-6 mt-8">
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Need help deciding? Our team is here to help!</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <div className="flex items-center space-x-2 text-[#1F3D3A]">
                      <i className="ri-phone-line"></i>
                      <span className="text-sm">+251947017777</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#1F3D3A]">
                      <i className="ri-mail-line"></i>
                      <span className="text-sm">hello@inhub.et</span>
                    </div>
                    <div className="flex items-center space-x-2 text-[#1F3D3A]">
                      <i className="ri-time-line"></i>
                      <span className="text-sm">Mon-Fri 9AM-6PM</span>
                    </div>
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
