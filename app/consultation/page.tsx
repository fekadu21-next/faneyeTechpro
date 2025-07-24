
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ConsultationBookingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [consultationType, setConsultationType] = useState('strategy');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',

    // Business Information
    industry: '',
    companySize: '',
    annualRevenue: '',
    currentChallenges: '',
    specificGoals: '',
    timeline: '',
    budgetRange: '',
    previousConsulting: '',

    // Consultation Preferences
    preferredLanguage: 'english',
    meetingType: 'video',
    additionalNotes: '',

    // Agreement
    agreeToTerms: false,
    agreeToMarketing: false
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const consultationTypes = [
    {
      id: 'strategy',
      title: 'Business Strategy Consultation',
      duration: '60 minutes',
      description: 'Comprehensive review of your business strategy and growth opportunities',
      value: '$500',
      icon: 'ri-lightbulb-line',
      benefits: [
        'Strategic roadmap assessment',
        'Growth opportunity identification',
        'Market positioning analysis',
        'Actionable recommendations'
      ]
    },
    {
      id: 'innovation',
      title: 'Innovation Assessment',
      duration: '45 minutes',
      description: 'Evaluate your innovation capabilities and digital transformation needs',
      value: '$400',
      icon: 'ri-rocket-line',
      benefits: [
        'Innovation maturity assessment',
        'Technology gap analysis',
        'Digital transformation roadmap',
        'Implementation priorities'
      ]
    },
    {
      id: 'growth',
      title: 'Growth Strategy Session',
      duration: '60 minutes',
      description: 'Focus on scaling strategies and market expansion opportunities',
      value: '$500',
      icon: 'ri-line-chart-line',
      benefits: [
        'Scaling strategy development',
        'Market expansion planning',
        'Revenue optimization',
        'Growth metrics framework'
      ]
    },
    {
      id: 'general',
      title: 'General Business Consultation',
      duration: '30 minutes',
      description: 'Initial consultation to understand your needs and explore solutions',
      value: '$250',
      icon: 'ri-question-answer-line',
      benefits: [
        'Business needs assessment',
        'Solution recommendations',
        'Service matching',
        'Next steps planning'
      ]
    }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM'
  ];

  const industries = [
    'Technology', 'Finance & Banking', 'Healthcare', 'Education', 'Manufacturing',
    'Retail & E-commerce', 'Agriculture', 'Tourism & Hospitality', 'Construction',
    'Transportation', 'Energy', 'Telecommunications', 'Government', 'NGO', 'Other'
  ];

  const companySizes = [
    'Solo Entrepreneur', '2-10 employees', '11-50 employees', '51-200 employees',
    '201-500 employees', '500+ employees'
  ];

  const revenueRanges = [
    'Pre-revenue', 'Under $100K', '$100K - $500K', '$500K - $1M',
    '$1M - $5M', '$5M - $10M', '$10M+'
  ];

  const budgetRanges = [
    'Under $5K', '$5K - $10K', '$10K - $25K', '$25K - $50K',
    '$50K - $100K', '$100K+', 'To be discussed'
  ];

  const updateFormData = (field, value) => {
    if (!mounted) return;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          date: date.toISOString().split('T')[0],
          display: date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric' 
          }),
          available: Math.random() > 0.3 // Simulate availability
        });
      }
    }

    return dates;
  };

  const getAvailableTimeSlots = (date) => {
    // Simulate different availability for different dates
    const baseSlots = timeSlots.filter(() => Math.random() > 0.4);
    return baseSlots;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mounted) return;

    setIsSubmitting(true);

    try {
      // Prepare form data for submission
      const submissionData = new URLSearchParams();

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === 'boolean') {
          submissionData.append(key, value ? 'Yes' : 'No');
        } else {
          submissionData.append(key, value);
        }
      });

      // Add consultation details
      submissionData.append('consultationType', consultationType);
      submissionData.append('selectedDate', selectedDate);
      submissionData.append('selectedTime', selectedTime);
      submissionData.append('consultationTitle', consultationTypes.find(c => c.id === consultationType)?.title || '');
      submissionData.append('submissionDate', new Date().toISOString());

      // Submit to form endpoint
      const response = await fetch('https://readdy.ai/api/form/consultation-booking-2024', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: submissionData
      });

      if (response.ok) {
        setSubmitSuccess(true);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Consultation booking error:', error);
      alert('Booking submission failed. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (!mounted) return;
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (!mounted) return;
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3D3A] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading consultation booking...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen">
        <Header />
        <section className="py-20">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-6">
                <i className="ri-check-line text-3xl text-green-600"></i>
              </div>
              <h1 className="text-4xl font-bold text-[#1F3D3A] mb-6">Consultation Booked Successfully!</h1>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for booking your free consultation with InHub. We're excited to help transform your business!
              </p>

              <div className="bg-gradient-to-r from-[#1F3D3A]/10 to-green-500/10 p-8 rounded-2xl mb-8">
                <h3 className="text-2xl font-bold text-[#1F3D3A] mb-6">Your Consultation Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <i className="ri-calendar-line text-[#1F3D3A] mr-3"></i>
                      <div>
                        <div className="font-medium text-gray-800">Date & Time</div>
                        <div className="text-gray-600">{selectedDate} at {selectedTime}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-service-line text-[#1F3D3A] mr-3"></i>
                      <div>
                        <div className="font-medium text-gray-800">Consultation Type</div>
                        <div className="text-gray-600">{consultationTypes.find(c => c.id === consultationType)?.title}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <i className="ri-time-line text-[#1F3D3A] mr-3"></i>
                      <div>
                        <div className="font-medium text-gray-800">Duration</div>
                        <div className="text-gray-600">{consultationTypes.find(c => c.id === consultationType)?.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-gift-line text-[#1F3D3A] mr-3"></i>
                      <div>
                        <div className="font-medium text-gray-800">Value</div>
                        <div className="text-green-600 font-semibold">{consultationTypes.find(c => c.id === consultationType)?.value} - FREE</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-xl mb-8">
                <h3 className="font-semibold text-[#1F3D3A] mb-4">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center">
                    <i className="ri-mail-line text-blue-600 mr-3"></i>
                    <span className="text-gray-700">Confirmation email sent to {formData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-calendar-event-line text-blue-600 mr-3"></i>
                    <span className="text-gray-700">Calendar invite with meeting details will be sent within 1 hour</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-phone-line text-blue-600 mr-3"></i>
                    <span className="text-gray-700">Our team will call you 1 day before to confirm and prepare</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-file-text-line text-blue-600 mr-3"></i>
                    <span className="text-gray-700">Pre-consultation questionnaire will be sent for better preparation</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/services" className="bg-[#1F3D3A] text-white px-8 py-3 rounded-full hover:bg-[#2a5248] transition-colors whitespace-nowrap cursor-pointer">
                  Explore Our Services
                </Link>
                <Link href="/case-studies" className="border border-[#1F3D3A] text-[#1F3D3A] px-8 py-3 rounded-full hover:bg-[#1F3D3A] hover:text-white transition-colors whitespace-nowrap cursor-pointer">
                  View Success Stories
                </Link>
                <Link href="/" className="border border-gray-300 text-gray-600 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer">
                  Back to Home
                </Link>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-gray-600 mb-4">Need to reschedule or have questions?</p>
                <div className="flex items-center justify-center space-x-8 text-sm">
                  <div className="flex items-center">
                    <i className="ri-phone-line text-[#1F3D3A] mr-2"></i>
                    <span>+251947017777</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-mail-line text-[#1F3D3A] mr-2"></i>
                    <span>consultations@inhub.et</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const selectedConsultation = consultationTypes.find(c => c.id === consultationType);
  const availableDates = generateAvailableDates();
  const availableTimeSlots = selectedDate ? getAvailableTimeSlots(selectedDate) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(31, 61, 58, 0.9), rgba(31, 61, 58, 0.9)), url('https://readdy.ai/api/search-image?query=Professional%20Ethiopian%20business%20consultation%20meeting%20in%20modern%20office%2C%20business%20advisors%20reviewing%20strategy%20documents%20with%20client%2C%20contemporary%20meeting%20room%20with%20presentation%20screens%20and%20collaborative%20atmosphere%2C%20expert%20consultation%20and%20strategic%20planning%20session&width=1920&height=500&seq=consultation&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Book Your Free Strategy Consultation</h1>
          <p className="text-xl max-w-3xl mx-auto mb-6">
            Get personalized insights and actionable recommendations from our senior business strategists
          </p>
          <div className="flex items-center justify-center space-x-6 text-green-300">
            <div className="flex items-center">
              <i className="ri-gift-line mr-2"></i>
              <span>Worth $500 - Completely FREE</span>
            </div>
            <div className="flex items-center">
              <i className="ri-time-line mr-2"></i>
              <span>No Long-term Commitment</span>
            </div>
            <div className="flex items-center">
              <i className="ri-shield-check-line mr-2"></i>
              <span>100% Confidential</span>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Indicator */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-4 md:space-x-8">
              {[
                { step: 1, title: 'Consultation Type', icon: 'ri-service-line' },
                { step: 2, title: 'Schedule', icon: 'ri-calendar-line' },
                { step: 3, title: 'Your Information', icon: 'ri-user-line' },
                { step: 4, title: 'Confirmation', icon: 'ri-check-line' }
              ].map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 ${
                    currentStep >= item.step
                      ? 'bg-[#1F3D3A] border-[#1F3D3A] text-white'
                      : 'border-gray-300 text-gray-400'
                  }`}>
                    <i className={`${item.icon} text-sm md:text-lg`}></i>
                  </div>
                  <div className="ml-2 md:ml-3 hidden sm:block">
                    <div className={`font-medium text-sm ${
                      currentStep >= item.step ? 'text-[#1F3D3A]' : 'text-gray-400'
                    }`}>
                      Step {item.step}
                    </div>
                    <div className="text-xs text-gray-600">{item.title}</div>
                  </div>
                  {index < 3 && (
                    <div className={`w-8 md:w-16 h-1 mx-2 md:mx-6 ${
                      currentStep > item.step ? 'bg-[#1F3D3A]' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} id="consultation-booking-form">

              {/* Step 1: Consultation Type Selection */}
              {currentStep === 1 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-[#1F3D3A] mb-8 text-center">
                    Choose Your Consultation Type
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {consultationTypes.map((type) => (
                      <div
                        key={type.id}
                        onClick={() => setConsultationType(type.id)}
                        className={`border-2 rounded-xl p-6 cursor-pointer transition-all hover:shadow-lg ${
                          consultationType === type.id
                            ? 'border-[#1F3D3A] bg-[#1F3D3A]/5 shadow-lg'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${
                            consultationType === type.id ? 'bg-[#1F3D3A] text-white' : 'bg-gray-100 text-gray-600'
                          }`}>
                            <i className={`${type.icon} text-xl`}></i>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-green-600">{type.value}</div>
                            <div className="text-sm text-gray-500 line-through">Regular Price</div>
                            <div className="text-lg font-bold text-[#1F3D3A]">FREE</div>
                          </div>
                        </div>

                        <h3 className="text-xl font-bold text-[#1F3D3A] mb-2">{type.title}</h3>
                        <p className="text-gray-600 mb-2">{type.description}</p>
                        <p className="text-sm text-gray-500 mb-4">Duration: {type.duration}</p>

                        <div className="space-y-2">
                          <h4 className="font-semibold text-gray-800 text-sm">What you'll get:</h4>
                          {type.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center text-sm text-gray-600">
                              <i className="ri-check-line text-green-500 mr-2"></i>
                              {benefit}
                            </div>
                          ))}
                        </div>

                        {consultationType === type.id && (
                          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center text-green-800">
                              <i className="ri-check-circle-line mr-2"></i>
                              <span className="font-medium">Selected</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 text-center">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!consultationType}
                      className={`px-8 py-3 rounded-full font-semibold transition-colors cursor-pointer ${
                        consultationType
                          ? 'bg-[#1F3D3A] text-white hover:bg-[#2a5248]'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continue to Scheduling
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time Selection */}
              {currentStep === 2 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-[#1F3D3A] mb-8 text-center">
                    Schedule Your Consultation
                  </h2>

                  {selectedConsultation && (
                    <div className="bg-[#1F3D3A]/5 p-4 rounded-lg mb-8 text-center">
                      <h3 className="font-semibold text-[#1F3D3A] mb-1">{selectedConsultation.title}</h3>
                      <p className="text-sm text-gray-600">{selectedConsultation.duration} • {selectedConsultation.value} Value - FREE</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Date Selection */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {availableDates.map((date) => (
                          <button
                            key={date.date}
                            type="button"
                            onClick={() => setSelectedDate(date.date)}
                            disabled={!date.available}
                            className={`p-3 text-sm border rounded-lg transition-colors cursor-pointer ${
                              selectedDate === date.date
                                ? 'border-[#1F3D3A] bg-[#1F3D3A] text-white'
                                : date.available
                                  ? 'border-gray-300 hover:border-[#1F3D3A] hover:bg-[#1F3D3A]/5'
                                  : 'border-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            {date.display}
                            {!date.available && (
                              <div className="text-xs text-gray-400 mt-1">Unavailable</div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Select Time {selectedDate && `(${new Date(selectedDate).toLocaleDateString()})`}
                      </h3>
                      {selectedDate ? (
                        <div className="grid grid-cols-2 gap-3 max-h-80 overflow-y-auto">
                          {availableTimeSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setSelectedTime(time)}
                              className={`p-3 text-sm border rounded-lg transition-colors cursor-pointer ${
                                selectedTime === time
                                  ? 'border-[#1F3D3A] bg-[#1F3D3A] text-white'
                                  : 'border-gray-300 hover:border-[#1F3D3A] hover:bg-[#1F3D3A]/5'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                          {availableTimeSlots.length === 0 && (
                            <div className="col-span-2 text-center text-gray-500 py-4">
                              No available time slots for this date
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 py-8">
                          Please select a date first
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedDate && selectedTime && (
                    <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center justify-center">
                        <i className="ri-calendar-check-line text-green-600 mr-2"></i>
                        <span className="font-medium text-green-800">
                          Consultation scheduled for {new Date(selectedDate).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })} at {selectedTime}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-8 py-3 border border-[#1F3D3A] text-[#1F3D3A] rounded-full font-semibold hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer"
                    >
                      Back to Consultation Type
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!selectedDate || !selectedTime}
                      className={`px-8 py-3 rounded-full font-semibold transition-colors cursor-pointer ${
                        selectedDate && selectedTime
                          ? 'bg-[#1F3D3A] text-white hover:bg-[#2a5248]'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continue to Information
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Information Form */}
              {currentStep === 3 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-[#1F3D3A] mb-8 text-center">
                    Tell Us About Your Business
                  </h2>

                  <div className="space-y-8">
                    {/* Personal Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            required
                            value={formData.firstName}
                            onChange={(e) => updateFormData('firstName', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            required
                            value={formData.lastName}
                            onChange={(e) => updateFormData('lastName', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                            placeholder="Enter your last name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={(e) => updateFormData('email', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                            placeholder="your.email@company.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={(e) => updateFormData('phone', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                            placeholder="+251 911 123 456"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                          <input
                            type="text"
                            name="company"
                            required
                            value={formData.company}
                            onChange={(e) => updateFormData('company', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                            placeholder="Your company name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Job Title *</label>
                          <input
                            type="text"
                            name="jobTitle"
                            required
                            value={formData.jobTitle}
                            onChange={(e) => updateFormData('jobTitle', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                            placeholder="CEO, Founder, Manager, etc."
                          />
                        </div>
                      </div>
                    </div>

                    {/* Business Information */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Business Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Industry *</label>
                          <select
                            name="industry"
                            required
                            value={formData.industry}
                            onChange={(e) => updateFormData('industry', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                          >
                            <option value="">Select your industry</option>
                            {industries.map((industry) => (
                              <option key={industry} value={industry}>{industry}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Company Size *</label>
                          <select
                            name="companySize"
                            required
                            value={formData.companySize}
                            onChange={(e) => updateFormData('companySize', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                          >
                            <option value="">Select company size</option>
                            {companySizes.map((size) => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Annual Revenue</label>
                          <select
                            name="annualRevenue"
                            value={formData.annualRevenue}
                            onChange={(e) => updateFormData('annualRevenue', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                          >
                            <option value="">Select revenue range</option>
                            {revenueRanges.map((range) => (
                              <option key={range} value={range}>{range}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range for Consulting</label>
                          <select
                            name="budgetRange"
                            value={formData.budgetRange}
                            onChange={(e) => updateFormData('budgetRange', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                          >
                            <option value="">Select budget range</option>
                            {budgetRanges.map((budget) => (
                              <option key={budget} value={budget}>{budget}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Business Challenges & Goals */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Business Needs</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Current Challenges *</label>
                          <textarea
                            name="currentChallenges"
                            required
                            rows="4"
                            value={formData.currentChallenges}
                            onChange={(e) => updateFormData('currentChallenges', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                            placeholder="Describe the main challenges your business is facing..."
                            maxLength="500"
                          />
                          <div className="text-sm text-gray-500 mt-1">
                            {formData.currentChallenges.length}/500 characters
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Specific Goals *</label>
                          <textarea
                            name="specificGoals"
                            required
                            rows="4"
                            value={formData.specificGoals}
                            onChange={(e) => updateFormData('specificGoals', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                            placeholder="What specific goals do you want to achieve with this consultation?"
                            maxLength="500"
                          />
                          <div className="text-sm text-gray-500 mt-1">
                            {formData.specificGoals.length}/500 characters
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Timeline for Implementation</label>
                            <select
                              name="timeline"
                              value={formData.timeline}
                              onChange={(e) => updateFormData('timeline', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                            >
                              <option value="">Select timeline</option>
                              <option value="immediate">Immediate (within 1 month)</option>
                              <option value="short-term">Short-term (1-3 months)</option>
                              <option value="medium-term">Medium-term (3-6 months)</option>
                              <option value="long-term">Long-term (6+ months)</option>
                              <option value="flexible">Flexible</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Previous Consulting Experience</label>
                            <select
                              name="previousConsulting"
                              value={formData.previousConsulting}
                              onChange={(e) => updateFormData('previousConsulting', e.target.value)}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                            >
                              <option value="">Have you worked with consultants before?</option>
                              <option value="never">Never worked with consultants</option>
                              <option value="limited">Limited experience</option>
                              <option value="some">Some experience</option>
                              <option value="extensive">Extensive experience</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Consultation Preferences */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Consultation Preferences</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
                          <select
                            name="preferredLanguage"
                            value={formData.preferredLanguage}
                            onChange={(e) => updateFormData('preferredLanguage', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                          >
                            <option value="english">English</option>
                            <option value="amharic">Amharic</option>
                            <option value="both">Both English & Amharic</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Type</label>
                          <select
                            name="meetingType"
                            value={formData.meetingType}
                            onChange={(e) => updateFormData('meetingType', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                          >
                            <option value="video">Video Call (Zoom/Teams)</option>
                            <option value="phone">Phone Call</option>
                            <option value="in-person">In-Person (Addis Ababa)</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                        <textarea
                          name="additionalNotes"
                          rows="3"
                          value={formData.additionalNotes}
                          onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="Any specific topics you'd like to discuss or additional information..."
                          maxLength="300"
                        />
                        <div className="text-sm text-gray-500 mt-1">
                          {formData.additionalNotes.length}/300 characters
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-8 py-3 border border-[#1F3D3A] text-[#1F3D3A] rounded-full font-semibold hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer"
                    >
                      Back to Schedule
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.company || !formData.jobTitle || !formData.industry || !formData.companySize || !formData.currentChallenges || !formData.specificGoals}
                      className={`px-8 py-3 rounded-full font-semibold transition-colors cursor-pointer ${
                        formData.firstName && formData.lastName && formData.email && formData.phone && formData.company && formData.jobTitle && formData.industry && formData.companySize && formData.currentChallenges && formData.specificGoals
                          ? 'bg-[#1F3D3A] text-white hover:bg-[#2a5248]'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Review & Confirm
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {currentStep === 4 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-[#1F3D3A] mb-8 text-center">
                    Confirm Your Consultation
                  </h2>

                  <div className="space-y-6">
                    {/* Consultation Summary */}
                    <div className="bg-gradient-to-r from-[#1F3D3A]/10 to-green-500/10 p-6 rounded-xl">
                      <h3 className="text-xl font-bold text-[#1F3D3A] mb-4">Consultation Summary</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <i className="ri-service-line text-[#1F3D3A] mr-3"></i>
                            <div>
                              <div className="font-medium text-gray-800">Type</div>
                              <div className="text-gray-600">{selectedConsultation?.title}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-calendar-line text-[#1F3D3A] mr-3"></i>
                            <div>
                              <div className="font-medium text-gray-800">Date & Time</div>
                              <div className="text-gray-600">
                                {selectedDate && new Date(selectedDate).toLocaleDateString('en-US', { 
                                  weekday: 'long', 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })} at {selectedTime}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <i className="ri-time-line text-[#1F3D3A] mr-3"></i>
                            <div>
                              <div className="font-medium text-gray-800">Duration</div>
                              <div className="text-gray-600">{selectedConsultation?.duration}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <i className="ri-gift-line text-[#1F3D3A] mr-3"></i>
                            <div>
                              <div className="font-medium text-gray-800">Value</div>
                              <div className="text-green-600 font-semibold">{selectedConsultation?.value} - FREE</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Contact Information Summary */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="space-y-1">
                            <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                            <div><strong>Email:</strong> {formData.email}</div>
                            <div><strong>Phone:</strong> {formData.phone}</div>
                          </div>
                        </div>
                        <div>
                          <div className="space-y-1">
                            <div><strong>Company:</strong> {formData.company}</div>
                            <div><strong>Title:</strong> {formData.jobTitle}</div>
                            <div><strong>Industry:</strong> {formData.industry}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Agreement Checkboxes */}
                    <div className="space-y-4">
                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeToTerms"
                          required
                          checked={formData.agreeToTerms}
                          onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                          className="w-4 h-4 text-[#1F3D3A] border-gray-300 rounded focus:ring-2 focus:ring-[#1F3D3A] mt-1"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          I agree to the <Link href="/terms" className="text-[#1F3D3A] hover:underline">Terms of Service</Link> and{` `}
                          <Link href="/privacy" className="text-[#1F3D3A] hover:underline">Privacy Policy</Link>. 
                          I understand this consultation is confidential and no commitment is required.
                        </span>
                      </label>

                      <label className="flex items-start cursor-pointer">
                        <input
                          type="checkbox"
                          name="agreeToMarketing"
                          checked={formData.agreeToMarketing}
                          onChange={(e) => updateFormData('agreeToMarketing', e.target.checked)}
                          className="w-4 h-4 text-[#1F3D3A] border-gray-300 rounded focus:ring-2 focus:ring-[#1F3D3A] mt-1"
                        />
                        <span className="ml-3 text-sm text-gray-700">
                          I would like to receive helpful business insights and updates from InHub (optional)
                        </span>
                      </label>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <i className="ri-information-line text-blue-600 mr-3 mt-1"></i>
                        <div>
                          <h4 className="font-medium text-blue-800 mb-2">Important Information</h4>
                          <ul className="text-blue-700 text-sm space-y-1">
                            <li>• You will receive a confirmation email immediately after booking</li>
                            <li>• Calendar invite will be sent within 1 hour with meeting details</li>
                            <li>• Our team will call you 1 day before to confirm and prepare</li>
                            <li>• You can reschedule or cancel up to 24 hours before the consultation</li>
                            <li>• This consultation is completely free with no obligation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-8 py-3 border border-[#1F3D3A] text-[#1F3D3A] rounded-full font-semibold hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer"
                    >
                      Back to Information
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.agreeToTerms}
                      className={`px-8 py-3 rounded-full font-semibold transition-colors cursor-pointer flex items-center ${
                        !isSubmitting && formData.agreeToTerms
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="ri-loader-4-line animate-spin mr-2"></i>
                          Booking Consultation...
                        </>
                      ) : (
                        <>
                          <i className="ri-calendar-check-line mr-2"></i>
                          Book Free Consultation
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
