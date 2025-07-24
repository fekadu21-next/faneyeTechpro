
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Link from 'next/link';
import { useState } from 'react';

export default function AboutPage() {
  const [activeTimelineItem, setActiveTimelineItem] = useState(0);

  const timeline = [
    {
      year: '2019',
      title: 'The Beginning',
      description: 'Founded in Addis Ababa with a vision to bridge the gap between Ethiopian talent and global opportunities.',
      milestone: 'Company Founded',
      achievement: '5 founding team members'
    },
    {
      year: '2020',
      title: 'First Partnerships',
      description: 'Established partnerships with leading Ethiopian universities and launched our first professional development programs.',
      milestone: 'Education Partnerships',
      achievement: '500+ students trained'
    },
    {
      year: '2021',
      title: 'Platform Launch',
      description: 'Officially launched InHub platform connecting Ethiopian professionals with businesses across Africa.',
      milestone: 'Platform Goes Live',
      achievement: '1,000+ active users'
    },
    {
      year: '2022',
      title: 'International Expansion',
      description: 'Expanded services to serve clients across East Africa while maintaining our Ethiopian roots.',
      milestone: 'Regional Expansion',
      achievement: '10,000+ projects completed'
    },
    {
      year: '2023',
      title: 'Innovation Hub',
      description: 'Launched dedicated innovation center and advanced business consulting services.',
      milestone: 'Innovation Center',
      achievement: '50+ enterprise clients'
    },
    {
      year: '2024',
      title: 'Industry Leadership',
      description: 'Recognized as Ethiopia\'s leading professional services platform with nationwide presence.',
      milestone: 'Market Leadership',
      achievement: '25,000+ professionals'
    }
  ];

  const values = [
    {
      icon: 'ri-heart-line',
      title: 'Ethiopian Pride',
      description: 'We celebrate and promote Ethiopian talent, culture, and innovation on the global stage.',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: 'ri-team-line',
      title: 'Community First',
      description: 'Building strong communities where professionals and businesses thrive together.',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: 'ri-star-line',
      title: 'Excellence',
      description: 'Committed to delivering exceptional quality in every project and interaction.',
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Trust & Integrity',
      description: 'Building lasting relationships through transparency, honesty, and reliability.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'Innovation',
      description: 'Continuously evolving and embracing new technologies to serve our community better.',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: 'ri-global-line',
      title: 'Global Vision',
      description: 'Connecting Ethiopian talent with opportunities worldwide while staying rooted locally.',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const leadership = [
    {
      name: 'Nathnael Fasil',
      role: 'Founder & CEO',
      bio: 'Visionary entrepreneur and innovator with 6+ years of building tech solutions for the Ethiopian market. Passionate about connecting local talent with global opportunities.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20male%20entrepreneur%20and%20startup%20founder%20wearing%20modern%20business%20casual%20attire%20with%20confident%20innovative%20expression%2C%20young%20CEO%20portrait%20with%20contemporary%20office%20background%2C%20creative%20leader%20in%20tech%20startup%20environment&width=300&height=300&seq=ceo-entrepreneur&orientation=squarish',
      linkedin: '#',
      twitter: '#',
      education: 'Addis Ababa University, Entrepreneurship Program',
      experience: '6+ years in entrepreneurship'
    },
    {
      name: 'Bethel Asrat',
      role: 'Chief Marketing Officer',
      bio: 'Creative marketing strategist with expertise in brand building and digital marketing. Specializes in connecting Ethiopian brands with their target audiences.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20female%20marketing%20executive%20wearing%20modern%20business%20attire%20with%20creative%20confident%20expression%2C%20experienced%20marketing%20leader%20in%20contemporary%20office%20environment%2C%20professional%20headshot%20with%20clean%20background&width=300&height=300&seq=cmo&orientation=squarish',
      linkedin: '#',
      twitter: '#',
      education: 'AAU School of Business, Digital Marketing Certificate',
      experience: '5+ years in marketing'
    },
    {
      name: 'Samuel Girma',
      role: 'Chief Technology Officer',
      bio: 'Tech innovator with expertise in platform development and system architecture. Builds scalable solutions that power InHub\'s growing ecosystem.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20male%20technology%20executive%20in%20business%20casual%20attire%20with%20innovative%20tech-focused%20expression%2C%20experienced%20software%20engineer%20and%20startup%20CTO%20in%20modern%20office%20environment%2C%20professional%20portrait%20with%20contemporary%20background&width=300&height=300&seq=cto-tech&orientation=squarish',
      linkedin: '#',
      twitter: '#',
      education: 'Addis Ababa University, Computer Science',
      experience: '5+ years in tech development'
    },
    {
      name: 'Selemon Tadesse',
      role: 'Chief Financial Officer',
      bio: 'Financial strategist with strong background in startup finance and investment. Ensures sustainable growth and financial stability for InHub\'s expansion.',
      image: 'https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20male%20financial%20executive%20wearing%20business%20suit%20with%20analytical%20confident%20expression%2C%20experienced%20CFO%20and%20finance%20leader%20in%20modern%20office%20setting%2C%20professional%20headshot%20with%20contemporary%20background&width=300&height=300&seq=cfo-male&orientation=squarish',
      linkedin: '#',
      twitter: '#',
      education: 'AAU School of Business, Financial Management',
      experience: '6+ years in finance'
    }
  ];

  const stats = [
    { number: '25,000+', label: 'Registered Professionals', icon: 'ri-user-line' },
    { number: '5,000+', label: 'Completed Projects', icon: 'ri-checkbox-circle-line' },
    { number: '1,200+', label: 'Active Clients', icon: 'ri-building-line' },
    { number: '98%', label: 'Client Satisfaction', icon: 'ri-heart-line' },
    { number: '15+', label: 'Industry Sectors', icon: 'ri-pie-chart-line' },
    { number: '4.9/5', label: 'Average Rating', icon: 'ri-star-line' }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(31, 61, 58, 0.8), rgba(31, 61, 58, 0.8)), url('https://readdy.ai/api/search-image?query=Four%20professional%20Ethiopian%20business%20executives%20standing%20together%20in%20confident%20poses%2C%20InHub%20leadership%20team%20portrait%20with%20Nathnael%20Fasil%20CEO%2C%20Bethel%20Asrat%20CTO%2C%20Samuel%20Girma%20COO%20and%20Dr.%20Meron%20Haile%20CSO%2C%20diverse%20group%20of%20accomplished%20leaders%20in%20elegant%20business%20attire%20standing%20in%20modern%20office%20boardroom%2C%20sophisticated%20executive%20team%20photo%20with%20professional%20lighting%20and%20contemporary%20corporate%20background&width=1920&height=1080&seq=abouthero-leaders-standing&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Empowering <span className="text-green-400">Ethiopian</span> Excellence
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              We connect Ethiopia's brightest minds with opportunities that drive innovation, growth, and prosperity across Africa and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer">
                Join Our Mission
              </Link>
              <Link href="/case-studies" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#1F3D3A] transition-colors whitespace-nowrap cursor-pointer">
                See Our Impact
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <i className="ri-arrow-down-line text-2xl text-white"></i>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-8">Our Mission</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-12">
              To unlock the incredible potential of Ethiopian talent by creating a platform where professionals and businesses can connect, collaborate, and achieve extraordinary results together. We believe that Ethiopia's greatest export is its people – their skills, creativity, and dedication to excellence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-[#1F3D3A]/10 rounded-2xl mx-auto mb-4">
                  <i className="ri-rocket-line text-2xl text-[#1F3D3A]"></i>
                </div>
                <h3 className="text-xl font-bold text-[#1F3D3A] mb-3">Empower</h3>
                <p className="text-gray-600">Enable Ethiopian professionals to showcase their talents and access global opportunities</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-[#1F3D3A]/10 rounded-2xl mx-auto mb-4">
                  <i className="ri-links-line text-2xl text-[#1F3D3A]"></i>
                </div>
                <h3 className="text-xl font-bold text-[#1F3D3A] mb-3">Connect</h3>
                <p className="text-gray-600">Bridge the gap between exceptional talent and businesses seeking innovative solutions</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-[#1F3D3A]/10 rounded-2xl mx-auto mb-4">
                  <i className="ri-trophy-line text-2xl text-[#1F3D3A]"></i>
                </div>
                <h3 className="text-xl font-bold text-[#1F3D3A] mb-3">Excel</h3>
                <p className="text-gray-600">Drive excellence in every project while building lasting partnerships and success stories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Five years of connecting talent with opportunity across Ethiopia and beyond
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow text-center">
                <div className="w-16 h-16 flex items-center justify-center bg-[#1F3D3A]/10 rounded-2xl mx-auto mb-4">
                  <i className={`${stat.icon} text-2xl text-[#1F3D3A]`}></i>
                </div>
                <div className="text-4xl font-bold text-[#1F3D3A] mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From a small startup in Addis Ababa to Ethiopia's leading professional services platform
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="relative">
              {/* Timeline Line - Hidden on mobile */}
              <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-[#1F3D3A]/20 hidden md:block"></div>

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Mobile Layout: Content */}
                    <div className="w-full md:w-1/2 md:pr-8 md:text-right order-2 md:order-1">
                      <div className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow ${index % 2 !== 0 ? 'md:ml-8 md:text-left' : ''}`}>
                        <div className="text-2xl font-bold text-[#1F3D3A] mb-2">{item.year}</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                        <p className="text-gray-600 mb-4">{item.description}</p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                          <span className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-sm font-medium">
                            {item.milestone}
                          </span>
                          <span className="text-sm font-semibold text-green-600">{item.achievement}</span>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Dot */}
                    <div className="w-8 h-8 bg-[#1F3D3A] rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center order-1 md:order-2 mb-4 md:mb-0">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>

                    {/* Desktop spacer */}
                    <div className="hidden md:block w-1/2 order-3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do and every decision we make
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
                <div className={`w-16 h-16 flex items-center justify-center rounded-2xl mb-6 ${value.color}`}>
                  <i className={`${value.icon} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#1F3D3A] mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet the visionaries leading InHub's mission to transform Ethiopia's professional landscape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div 
                  className="w-24 h-24 rounded-full mx-auto mb-4 mt-6"
                  style={{
                    backgroundImage: `url('${member.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1F3D3A] mb-1">{member.name}</h3>
                  <p className="text-[#1F3D3A] font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm mb-4">{member.bio}</p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {member.role === 'Founder & CEO' && (
                      <>
                        <span className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-xs">Strategic Leadership</span>
                        <span className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-xs">Innovation</span>
                        <span className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-xs">Entrepreneurship</span>
                      </>
                    )}
                    {member.role === 'Chief Marketing Officer' && (
                      <>
                        <span className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-xs">Brand Strategy</span>
                        <span className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-xs">Digital Marketing</span>
                        <span className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-xs">Market Expansion</span>
                      </>
                    )}
                    {member.role === 'Chief Technology Officer' && (
                      <>
                        <span className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-xs">Tech Innovation</span>
                        <span className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-xs">Platform Development</span>
                        <span className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-xs">Team Leadership</span>
                      </>
                    )}
                    {member.role === 'Chief Financial Officer' && (
                      <>
                        <span className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-xs">Financial Strategy</span>
                        <span className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-xs">Investment Planning</span>
                        <span className="px-3 py-1 bg-[#1F3D3A]/10 text-[#1F3D3A] rounded-full text-xs">Risk Management</span>
                      </>
                    )}
                  </div>
                  <div className="flex space-x-3 justify-center">
                    <a href={member.linkedin} className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors cursor-pointer">
                      <i className="ri-linkedin-line"></i>
                    </a>
                    <a href={member.twitter} className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors cursor-pointer">
                      <i className="ri-twitter-line"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Honored to be recognized for our contribution to Ethiopia's professional ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                year: '2024',
                award: 'Best Professional Platform',
                organization: 'Ethiopian Chamber of Commerce',
                icon: 'ri-trophy-line',
                color: 'text-yellow-600 bg-yellow-100'
              },
              {
                year: '2023',
                award: 'Innovation Excellence Award',
                organization: 'Ministry of Innovation & Technology',
                icon: 'ri-rocket-line',
                color: 'text-blue-600 bg-blue-100'
              },
              {
                year: '2023',
                award: 'Top Employer Recognition',
                organization: 'Ethiopian HR Association',
                icon: 'ri-team-line',
                color: 'text-green-600 bg-green-100'
              },
              {
                year: '2022',
                award: 'Digital Excellence Award',
                organization: 'African Tech Awards',
                icon: 'ri-computer-line',
                color: 'text-purple-600 bg-purple-100'
              }
            ].map((award, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-sm text-center hover:shadow-lg transition-shadow">
                <div className={`w-16 h-16 flex items-center justify-center rounded-2xl mx-auto mb-4 ${award.color}`}>
                  <i className={`${award.icon} text-2xl`}></i>
                </div>
                <div className="text-lg font-bold text-[#1F3D3A] mb-2">{award.award}</div>
                <div className="text-sm text-gray-600 mb-1">{award.organization}</div>
                <div className="text-sm font-semibold text-gray-800">{award.year}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture & Life */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1F3D3A] mb-4">Life at InHub</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A culture that celebrates diversity, innovation, and the rich heritage of Ethiopia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                image: 'https://readdy.ai/api/search-image?query=Ethiopian%20office%20team%20celebrating%20success%20together%20in%20modern%20workplace%2C%20diverse%20group%20of%20professionals%20in%20casual%20business%20attire%2C%20collaborative%20and%20joyful%20work%20environment%20with%20cultural%20decorations&width=400&height=300&seq=culture1&orientation=landscape',
                title: 'Team Celebrations',
                description: 'Regular team building events celebrating both achievements and Ethiopian culture'
              },
              {
                image: 'https://readdy.ai/api/search-image?query=Modern%20Ethiopian%20office%20space%20with%20traditional%20coffee%20ceremony%20setup%2C%20professional%20workspace%20incorporating%20cultural%20elements%2C%20contemporary%20office%20design%20with%20Ethiopian%20artistic%20touches&width=400&height=300&seq=culture2&orientation=landscape',
                title: 'Coffee Culture',
                description: 'Daily coffee ceremonies bringing the team together in Ethiopian tradition'
              },
              {
                image: 'https://readdy.ai/api/search-image?query=Ethiopian%20professionals%20attending%20training%20workshop%20in%20modern%20conference%20room%2C%20learning%20and%20development%20session%20with%20diverse%20participants%2C%20contemporary%20educational%20environment%20with%20presentation%20setup&width=400&height=300&seq=culture3&orientation=landscape',
                title: 'Continuous Learning',
                description: 'Regular training sessions and professional development opportunities'
              },
              {
                image: 'https://readdy.ai/api/search-image?query=Ethiopian%20business%20team%20volunteering%20in%20community%20service%20project%2C%20professionals%20giving%20back%20to%20local%20community%2C%20social%20responsibility%20and%20community%20engagement%20activities&width=400&height=300&seq=culture4&orientation=landscape',
                title: 'Community Impact',
                description: 'Monthly community service projects supporting local Ethiopian communities'
              },
              {
                image: 'https://readdy.ai/api/search-image?query=Ethiopian%20office%20innovation%20lab%20with%20modern%20technology%20and%20collaborative%20workspace%2C%20creative%20brainstorming%20session%20with%20whiteboards%20and%20digital%20tools%2C%20contemporary%20innovation%20environment&width=400&height=300&seq=culture5&orientation=landscape',
                title: 'Innovation Labs',
                description: 'Dedicated spaces for experimentation and creative problem-solving'
              },
              {
                image: 'https://readdy.ai/api/search-image?query=Ethiopian%20professionals%20enjoying%20healthy%20lunch%20together%20in%20modern%20office%20cafeteria%2C%20workplace%20wellness%20and%20social%20interaction%2C%20contemporary%20office%20dining%20area%20with%20natural%20lighting&width=400&height=300&seq=culture6&orientation=landscape',
                title: 'Work-Life Balance',
                description: 'Flexible schedules and wellness programs supporting healthy work-life integration'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-shadow">
                <div 
                  className="h-48 bg-gray-200"
                  style={{
                    backgroundImage: `url('${item.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                ></div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#1F3D3A] mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/team" 
              className="bg-[#1F3D3A] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-[#2a5248] transition-colors whitespace-nowrap cursor-pointer inline-flex items-center"
            >
              <i className="ri-team-line mr-2"></i>
              Meet Our Team
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1F3D3A]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join Our Journey?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Whether you're a talented professional looking for opportunities or a business seeking exceptional talent, we're here to connect you with success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/skills" className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer">
              Find Talent
            </Link>
            <Link href="/business-registration" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#1F3D3A] transition-colors whitespace-nowrap cursor-pointer">
              Join as Professional
            </Link>
            <Link href="/contact" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#1F3D3A] transition-colors whitespace-nowrap cursor-pointer">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
