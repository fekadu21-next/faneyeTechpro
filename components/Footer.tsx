
'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (!mounted || !email || isSubscribing) return;

    setIsSubscribing(true);
    setSubscriptionStatus('');

    try {
      // Prepare form data for submission
      const formData = new URLSearchParams();
      formData.append('email', email);
      formData.append('subscriptionType', 'newsletter');
      formData.append('subscriptionDate', new Date().toISOString());

      // Submit to newsletter endpoint
      const response = await fetch('https://readdy.ai/api/form/newsletter-subscription-2024', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
      });

      if (response.ok) {
        setSubscriptionStatus('success');
        setEmail('');
        setTimeout(() => {
          setSubscriptionStatus('');
        }, 5000);
      } else {
        throw new Error('Subscription failed');
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setSubscriptionStatus('error');
      setTimeout(() => {
        setSubscriptionStatus('');
      }, 5000);
    } finally {
      setIsSubscribing(false);
    }
  };

  const currentYear = new Date().getFullYear();

  if (!mounted) {
    return (
      <footer className="bg-gradient-to-br from-[#1a2c38] via-[#1F3D3A] to-[#0f1419] text-white">
        <div className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="animate-pulse h-8 bg-white/10 rounded w-32 mx-auto"></div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-gradient-to-br from-[#1a2c38] via-[#1F3D3A] to-[#0f1419] text-white relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-400 to-blue-500 rounded-full -translate-x-48 -translate-y-48 blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-gradient-to-bl from-purple-400 to-pink-500 rounded-full translate-x-32 blur-2xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full translate-y-40 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative">
        {/* Enhanced Newsletter Section */}
        <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 mb-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 rounded-3xl"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <i className="ri-mail-line text-2xl text-white"></i>
              </div>
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Stay Ahead with InHub Insights</h3>
            <p className="text-green-100 mb-8 max-w-3xl mx-auto text-base lg:text-lg">
              Join 10,000+ Ethiopian business leaders receiving exclusive market insights, innovation trends, and growth opportunities delivered weekly to your inbox.
            </p>

            {subscriptionStatus === 'success' ? (
              <div className="flex items-center justify-center text-white bg-white/20 rounded-2xl p-6 backdrop-blur-sm max-w-lg mx-auto">
                <i className="ri-check-line text-3xl mr-3"></i>
                <span className="text-lg lg:text-xl font-bold">Welcome to InHub Insights! Check your email.</span>
              </div>
            ) : (
              <div className="max-w-lg mx-auto">
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your professional email"
                      className="w-full px-4 lg:px-6 py-3 lg:py-4 rounded-xl lg:rounded-2xl text-gray-800 focus:outline-none focus:ring-4 focus:ring-white/30 bg-white/95 backdrop-blur-sm text-base lg:text-lg disabled:opacity-50"
                      required
                      disabled={isSubscribing}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubscribing || !email}
                    className={`px-6 lg:px-8 py-3 lg:py-4 rounded-xl lg:rounded-2xl font-bold transition-all duration-300 whitespace-nowrap cursor-pointer shadow-lg flex items-center justify-center ${
                      isSubscribing || !email
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-green-600 hover:bg-gray-100 hover:scale-105'
                    }`}
                  >
                    {isSubscribing ? (
                      <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Subscribing...
                      </>
                    ) : (
                      'Subscribe Free'
                    )}
                  </button>
                </form>

                {subscriptionStatus === 'error' && (
                  <div className="mb-4 text-red-200 bg-red-500/20 rounded-lg p-3">
                    <i className="ri-error-warning-line mr-2"></i>
                    Subscription failed. Please try again or contact support.
                  </div>
                )}

                <p className="text-white/80 text-sm">
                  ✓ Weekly insights ✓ Exclusive opportunities ✓ Unsubscribe anytime
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-10 mb-16">
          {/* Company Info - Expanded */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6 hover:scale-105 transform transition-all duration-300">
              <img
                src="https://static.readdy.ai/image/f7efb641c38d6268640c0be8ec3ad911/7eb3f01d570e89252e6c837ee7292c13.png"
                alt="InHub Logo"
                className="h-10 lg:h-12 w-auto"
              />
            </Link>
            <p className="text-gray-300 mb-8 text-base lg:text-lg leading-relaxed">
              Ethiopia's premier innovation ecosystem connecting talent, technology, and opportunity. We're building the future of African business through strategic partnerships and cutting-edge solutions.
            </p>

            {/* Enhanced Contact Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center group">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-green-500/30 transition-colors">
                  <i className="ri-map-pin-line text-green-400"></i>
                </div>
                <div>
                  <p className="text-white font-semibold">Bole Atlas, 4th Floor</p>
                  <p className="text-gray-300">Addis Ababa, Ethiopia</p>
                </div>
              </div>
              <div className="flex items-center group">
                <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-blue-500/30 transition-colors">
                  <i className="ri-phone-line text-blue-400"></i>
                </div>
                <div>
                  <p className="text-white font-semibold">+251947017777</p>
                  <p className="text-gray-300">24/7 Business Support</p>
                </div>
              </div>
              <div className="flex items-center group">
                <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center mr-4 group-hover:bg-purple-500/30 transition-colors">
                  <i className="ri-mail-line text-purple-400"></i>
                </div>
                <div>
                  <p className="text-white font-semibold">hello@inhub.et</p>
                  <p className="text-gray-300">General Inquiries</p>
                </div>
              </div>
            </div>

            {/* Enhanced Social Media */}
            <div>
              <h4 className="text-white font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl hover:from-blue-500 hover:to-blue-600 hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer group shadow-lg">
                  <i className="ri-linkedin-fill text-xl text-white"></i>
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl hover:from-sky-400 hover:to-sky-500 hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer group shadow-lg">
                  <i className="ri-twitter-fill text-xl text-white"></i>
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-800 rounded-xl hover:from-blue-600 hover:to-blue-700 hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer group shadow-lg">
                  <i className="ri-facebook-fill text-xl text-white"></i>
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-pink-600 to-purple-600 rounded-xl hover:from-pink-500 hover:to-purple-500 hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer group shadow-lg">
                  <i className="ri-instagram-fill text-xl text-white"></i>
                </a>
                <a href="#" className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-gray-800 to-black rounded-xl hover:from-gray-700 hover:to-gray-900 hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer group shadow-lg">
                  <i className="ri-tiktok-fill text-xl text-white"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg flex items-center">
              <i className="ri-links-line mr-2 text-green-400"></i>
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-green-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-green-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-green-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-green-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/skills" className="text-gray-300 hover:text-green-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-green-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  Find Talent
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-300 hover:text-green-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-green-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-300 hover:text-green-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-green-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  Success Stories
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-gray-300 hover:text-green-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-green-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  Analytics
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg flex items-center">
              <i className="ri-service-line mr-2 text-blue-400"></i>
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/business-registration" className="text-gray-300 hover:text-blue-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-blue-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  Business Setup
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="text-gray-300 hover:text-blue-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-blue-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  Strategic Consulting
                </Link>
              </li>
              <li>
                <Link href="/project-management" className="text-gray-300 hover:text-blue-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-blue-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  Project Management
                </Link>
              </li>
              <li>
                <Link href="/design" className="text-gray-300 hover:text-blue-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-blue-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  Design Studio
                </Link>
              </li>
              <li>
                <Link href="/diagnosis" className="text-gray-300 hover:text-blue-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-blue-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  Business Analysis
                </Link>
              </li>
              <li>
                <Link href="/warehouse" className="text-gray-300 hover:text-blue-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-blue-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  Supply Chain
                </Link>
              </li>
            </ul>
          </div>

          {/* Support & Resources */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg flex items-center">
              <i className="ri-customer-service-2-line mr-2 text-purple-400"></i>
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-purple-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-purple-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-gray-300 hover:text-purple-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-purple-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-300 hover:text-purple-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-purple-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/documentation" className="text-gray-300 hover:text-purple-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-purple-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-purple-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-purple-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  Blog & Insights
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-300 hover:text-purple-400 hover:translate-x-2 transition-all duration-200 cursor-pointer flex items-center group">
                  <i className="ri-arrow-right-s-line text-purple-400 opacity-0 group-hover:opacity-100 mr-2 transition-opacity"></i>
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Trusted Partners */}
          <div>
            <h3 className="text-white font-bold mb-6 text-lg flex items-center">
              <i className="ri-medal-line mr-2 text-yellow-400"></i>
              Partners
            </h3>
            <div className="space-y-3">
              <div className="text-sm text-gray-300 bg-gradient-to-r from-white/10 to-white/5 px-4 py-3 rounded-xl border border-white/20 hover:from-white/20 hover:to-white/10 hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div className="flex items-center">
                  <i className="ri-plane-line text-blue-400 mr-2"></i>
                  Ethiopian Airlines
                </div>
              </div>
              <div className="text-sm text-gray-300 bg-gradient-to-r from-white/10 to-white/5 px-4 py-3 rounded-xl border border-white/20 hover:from-white/20 hover:to-white/10 hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div className="flex items-center">
                  <i className="ri-bank-line text-green-400 mr-2"></i>
                  Commercial Bank
                </div>
              </div>
              <div className="text-sm text-gray-300 bg-gradient-to-r from-white/10 to-white/5 px-4 py-3 rounded-xl border border-white/20 hover:from-white/20 hover:to-white/10 hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div className="flex items-center">
                  <i className="ri-phone-line text-purple-400 mr-2"></i>
                  Ethio Telecom
                </div>
              </div>
              <div className="text-sm text-gray-300 bg-gradient-to-r from-white/10 to-white/5 px-4 py-3 rounded-xl border border-white/20 hover:from-white/20 hover:to-white/10 hover:scale-105 transition-all duration-300 group cursor-pointer">
                <div className="flex items-center">
                  <i className="ri-government-line text-yellow-400 mr-2"></i>
                  Ministry of Innovation
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-16">
          <div className="bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-2xl p-4 lg:p-6 text-center border border-green-500/20 hover:border-green-400/40 transition-all duration-300 group">
            <div className="text-2xl lg:text-4xl font-bold text-green-400 mb-2 group-hover:scale-110 transition-transform">5,200+</div>
            <div className="text-gray-300 text-xs lg:text-sm">Active Professionals</div>
            <div className="w-12 h-1 bg-green-400 rounded-full mx-auto mt-2"></div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/10 rounded-2xl p-4 lg:p-6 text-center border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 group">
            <div className="text-2xl lg:text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform">1,450+</div>
            <div className="text-gray-300 text-xs lg:text-sm">Projects Delivered</div>
            <div className="w-12 h-1 bg-blue-400 rounded-full mx-auto mt-2"></div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl p-4 lg:p-6 text-center border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group">
            <div className="text-2xl lg:text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform">420+</div>
            <div className="text-gray-300 text-xs lg:text-sm">Enterprise Clients</div>
            <div className="w-12 h-1 bg-purple-400 rounded-full mx-auto mt-2"></div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-2xl p-4 lg:p-6 text-center border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 group">
            <div className="text-2xl lg:text-4xl font-bold text-yellow-400 mb-2 group-hover:scale-110 transition-transform">99.2%</div>
            <div className="text-gray-300 text-xs lg:text-sm">Client Satisfaction</div>
            <div className="w-12 h-1 bg-yellow-400 rounded-full mx-auto mt-2"></div>
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <div className="border-t border-gray-600/50 pt-8 lg:pt-12">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">
            <div className="text-center lg:text-left">
              <p className="text-gray-300 mb-3 text-base lg:text-lg">
                © {currentYear} InHub Ethiopia. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm max-w-md">
                Pioneering Ethiopian innovation and connecting exceptional talent with transformative opportunities across Africa and beyond.
              </p>
            </div>

            <div className="flex flex-wrap justify-center lg:justify-end gap-4 lg:gap-8 text-sm">
              <Link href="/terms" className="text-gray-300 hover:text-white hover:underline transition-all duration-200 cursor-pointer">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-300 hover:text-white hover:underline transition-all duration-200 cursor-pointer">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-gray-300 hover:text-white hover:underline transition-all duration-200 cursor-pointer">
                Cookie Policy
              </Link>
              <Link href="/security" className="text-gray-300 hover:text-white hover:underline transition-all duration-200 cursor-pointer">
                Security
              </Link>
              <Link href="/careers" className="text-gray-300 hover:text-white hover:underline transition-all duration-200 cursor-pointer">
                Careers
              </Link>
            </div>
          </div>

          {/* Enhanced Trust Indicators */}
          <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-gray-700/50">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-4 lg:mb-6">Trusted by Ethiopia's leading organizations and international partners</p>
              <div className="flex flex-wrap justify-center items-center gap-3 lg:gap-4 opacity-60">
                <div className="text-xs text-gray-500 bg-gradient-to-r from-white/10 to-white/5 px-3 lg:px-4 py-2 rounded-full border border-white/10 hover:opacity-100 transition-opacity">
                  Ethiopian Airlines
                </div>
                <div className="text-xs text-gray-500 bg-gradient-to-r from-white/10 to-white/5 px-3 lg:px-4 py-2 rounded-full border border-white/10 hover:opacity-100 transition-opacity">
                  Commercial Bank of Ethiopia
                </div>
                <div className="text-xs text-gray-500 bg-gradient-to-r from-white/10 to-white/5 px-3 lg:px-4 py-2 rounded-full border border-white/10 hover:opacity-100 transition-opacity">
                  Ethio Telecom
                </div>
                <div className="text-xs text-gray-500 bg-gradient-to-r from-white/10 to-white/5 px-3 lg:px-4 py-2 rounded-full border border-white/10 hover:opacity-100 transition-opacity">
                  Ministry of Innovation
                </div>
                <div className="text-xs text-gray-500 bg-gradient-to-r from-white/10 to-white/5 px-3 lg:px-4 py-2 rounded-full border border-white/10 hover:opacity-100 transition-opacity">
                  African Union
                </div>
              </div>
            </div>
          </div>

          {/* Certifications & Awards */}
          <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-700/30">
            <div className="text-center">
              <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8 text-xs text-gray-500">
                <div className="flex items-center">
                  <i className="ri-shield-check-line text-green-400 mr-1"></i>
                  ISO 27001 Certified
                </div>
                <div className="flex items-center">
                  <i className="ri-award-line text-yellow-400 mr-1"></i>
                  Best Innovation Hub 2024
                </div>
                <div className="flex items-center">
                  <i className="ri-star-line text-purple-400 mr-1"></i>
                  Top Employer Ethiopia
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 lg:w-14 lg:h-14 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-2xl shadow-2xl hover:from-green-400 hover:to-blue-400 hover:scale-110 hover:rotate-12 transition-all duration-300 cursor-pointer z-50 flex items-center justify-center group"
        aria-label="Back to top"
      >
        <i className="ri-arrow-up-line text-lg lg:text-xl group-hover:scale-110 transition-transform"></i>
      </button>
    </footer>
  );
}