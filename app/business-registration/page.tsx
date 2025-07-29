
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function BusinessRegistrationPage() {
  const [selectedType, setSelectedType] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Business Registration Fields
    fullName: '',
    email: '',
    companyName: '',
    phoneNumber: '',
    jobTitle: '',
    businessIndustry: '',
    companyTurnover: '',
    numberOfEmployees: '',
    typeOfBusiness: '',
    location: '',
    yearsInOperation: '',

    // Startup Fields
    startupName: '',
    startupStage: '',
    fundingStatus: '',
    teamSize: '',
    businessModel: '',
    targetMarket: '',

    // Skill Owner Fields
    professionalTitle: '',
    experienceLevel: '',
    skills: [],
    hourlyRate: '',
    availability: '',
    portfolioLinks: '',
    certifications: '',

    // Project Owner Fields
    organizationType: '',
    budgetRange: '',
    projectTypes: [],
    frequency: '',
    teamStructure: '',
    industry: '',
    pmExperience: '',
    communicationStyle: '',
    communicationChannels: [],
    workingHours: '',
    specificRequirements: '',

    // Common
    agreeToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const registrationTypes = [
    {
      id: 'business',
      title: 'Established Business',
      description: 'For existing companies and enterprises looking to leverage professional services',
      icon: 'ri-building-line',
      features: ['Access to verified professionals', 'Project management tools', 'Secure payment system', 'Dedicated account manager']
    },
    {
      id: 'startup',
      title: 'Startup',
      description: 'For new businesses and startups seeking growth and development support',
      icon: 'ri-rocket-line',
      features: ['Startup-friendly pricing', 'Growth-focused services', 'Mentorship access', 'Flexible engagement models']
    },
    {
      id: 'skill-owner',
      title: 'Skill Owner',
      description: 'For professionals offering services and expertise to businesses',
      icon: 'ri-user-star-line',
      features: ['Professional profile creation', 'Project bidding system', 'Skill verification', 'Earnings tracking']
    },
    {
      id: 'project-owner',
      title: 'Project Owner',
      description: 'For individuals or organizations needing specific project services',
      icon: 'ri-briefcase-line',
      features: ['Project posting tools', 'Professional matching', 'Milestone management', 'Quality assurance']
    }
  ];

  const businessIndustries = [
    'Startup', 'Retail', 'Tech', 'Manufacturing', 'Transport', 'E-commerce',
    'Real Estate', 'Construction', 'Logistics', 'Agriculture', 'Government',
    'NGO', 'Health', 'Education', 'Bank', 'Micro-finance', 'Other'
  ];

  const companyTurnovers = [
    'Under $500K', '$500K–$1M', '$1M–$10M', '$10M–$50M', '$50M+'
  ];

  const employeeCounts = [
    '1–10', '11–50', '51–100', '101+'
  ];

  const businessTypes = [
    'B2B', 'B2C', 'NGO', 'Public Sector', 'Hybrid'
  ];

  const yearsInOperationOptions = [
    'Less than 1 year', '1–3', '4–10', '10+'
  ];

  const skillCategories = [
    'Development & Programming',
    'Design & Creative',
    'Marketing & Sales',
    'Data & Analytics',
    'Business & Strategy',
    'Content & Writing',
    'Finance & Accounting',
    'Legal & Compliance',
    'Engineering & Technical',
    'Other'
  ];

  const skillOptions = {
    'Development & Programming': ['React', 'Node.js', 'Python', 'JavaScript', 'PHP', 'Mobile Development', 'WordPress', 'Database Design', 'DevOps', 'Cloud Computing'],
    'Design & Creative': ['UI/UX Design', 'Graphic Design', 'Logo Design', 'Web Design', 'Branding', 'Figma', 'Adobe Creative Suite', 'Video Editing', 'Animation', '3D Design'],
    'Marketing & Sales': ['Digital Marketing', 'SEO', 'Social Media', 'Google Ads', 'Content Marketing', 'Email Marketing', 'Sales Strategy', 'Lead Generation', 'Analytics', 'CRM'],
    'Data & Analytics': ['Data Analysis', 'Machine Learning', 'Python', 'SQL', 'Tableau', 'Power BI', 'Statistical Analysis', 'Business Intelligence', 'Data Visualization', 'Excel'],
    'Business & Strategy': ['Business Strategy', 'Project Management', 'Process Improvement', 'Market Research', 'Financial Planning', 'Consulting', 'Operations', 'Business Development', 'Strategic Planning', 'Change Management'],
    'Content & Writing': ['Content Writing', 'Copywriting', 'Blog Writing', 'Technical Writing', 'Social Media Content', 'SEO Writing', 'Grant Writing', 'Editing', 'Translation', 'Creative Writing'],
    'Finance & Accounting': ['Financial Analysis', 'Accounting', 'Tax Planning', 'Budgeting', 'QuickBooks', 'Financial Planning', 'Bookkeeping', 'Auditing', 'Investment Analysis', 'Risk Management'],
    'Legal & Compliance': ['Contract Review', 'Legal Research', 'Compliance', 'Business Registration', 'Intellectual Property', 'Corporate Law', 'Employment Law', 'Data Protection', 'Regulatory Affairs', 'Legal Writing'],
    'Engineering & Technical': ['Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Industrial Design', 'Quality Assurance', 'Technical Documentation', 'Product Development', 'Manufacturing', 'CAD Design', 'Testing'],
    'Other': ['Virtual Assistant', 'Customer Service', 'Data Entry', 'Research', 'Translation', 'Administrative Support', 'Event Planning', 'HR Services', 'Training', 'Consultation']
  };

  const experienceLevels = [
    'Entry Level (0-2 years)',
    'Mid Level (2-5 years)',
    'Senior Level (5-10 years)',
    'Expert Level (10+ years)'
  ];

  const availabilityOptions = [
    'Full-time (40+ hours/week)',
    'Part-time (20-40 hours/week)',
    'Project-based (As needed)',
    'Weekends only',
    'Evenings only'
  ];

  const updateFormData = (field: string, value: any) => {

    if (!mounted) return;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

 const handleTypeSelection = (typeId: string) => {

    if (!mounted) return;
    setSelectedType(typeId);
    setCurrentStep(2);
  };

  const addSkill = (skill: string) => {

    if (!mounted) return;
   if (!(formData.skills as string[]).includes(skill)) {
  updateFormData('skills', [ ...(formData.skills as string[]), skill ]);
}

  };

 const removeSkill = (skill: string) => {

    if (!mounted) return;
    updateFormData('skills', formData.skills.filter(s => s !== skill));
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (!mounted) return;

    setIsSubmitting(true);

    try {
      // Prepare form data according to form-post-rule requirements
      const formDataToSubmit = new URLSearchParams();

      if (selectedType === 'business') {
        // Add all business form fields with their values
        formDataToSubmit.append('registrationType', 'business');
        formDataToSubmit.append('fullName', formData.fullName);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('companyName', formData.companyName);
        formDataToSubmit.append('phoneNumber', formData.phoneNumber);
        formDataToSubmit.append('jobTitle', formData.jobTitle);
        formDataToSubmit.append('businessIndustry', formData.businessIndustry);
        formDataToSubmit.append('companyTurnover', formData.companyTurnover);
        formDataToSubmit.append('numberOfEmployees', formData.numberOfEmployees);
        formDataToSubmit.append('typeOfBusiness', formData.typeOfBusiness);
        formDataToSubmit.append('location', formData.location);
        formDataToSubmit.append('yearsInOperation', formData.yearsInOperation);
        formDataToSubmit.append('agreeToTerms', formData.agreeToTerms ? 'Yes' : 'No');
      } else if (selectedType === 'skill-owner') {
        // Add all skill owner form fields with their values
        formDataToSubmit.append('registrationType', 'skill-owner');
        formDataToSubmit.append('fullName', formData.fullName);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('phoneNumber', formData.phoneNumber);
        formDataToSubmit.append('location', formData.location);
        formDataToSubmit.append('professionalTitle', formData.professionalTitle);
        formDataToSubmit.append('experienceLevel', formData.experienceLevel);
        formDataToSubmit.append('hourlyRate', formData.hourlyRate);
        formDataToSubmit.append('availability', formData.availability);
        formDataToSubmit.append('skills', formData.skills.join(', '));
        formDataToSubmit.append('portfolioLinks', formData.portfolioLinks);
        formDataToSubmit.append('certifications', formData.certifications);
        formDataToSubmit.append('agreeToTerms', formData.agreeToTerms ? 'Yes' : 'No');
      } else if (selectedType === 'project-owner') {
        // Add all project owner form fields with their values
        formDataToSubmit.append('registrationType', 'project-owner');
        formDataToSubmit.append('fullName', formData.fullName);
        formDataToSubmit.append('email', formData.email);
        formDataToSubmit.append('phoneNumber', formData.phoneNumber);
        formDataToSubmit.append('location', formData.location);
        formDataToSubmit.append('organizationType', formData.organizationType);
        formDataToSubmit.append('budgetRange', formData.budgetRange);
        formDataToSubmit.append('projectTypes', formData.projectTypes.join(', '));
        formDataToSubmit.append('frequency', formData.frequency);
        formDataToSubmit.append('teamStructure', formData.teamStructure);
        formDataToSubmit.append('industry', formData.industry);
        formDataToSubmit.append('pmExperience', formData.pmExperience);
        formDataToSubmit.append('communicationStyle', formData.communicationStyle);
        formDataToSubmit.append('communicationChannels', formData.communicationChannels.join(', '));
        formDataToSubmit.append('workingHours', formData.workingHours);
        formDataToSubmit.append('specificRequirements', formData.specificRequirements);
        formDataToSubmit.append('agreeToTerms', formData.agreeToTerms ? 'Yes' : 'No');
      } else {
        // For other registration types (startup)
        formDataToSubmit.append('registrationType', selectedType);
        formDataToSubmit.append('agreeToTerms', formData.agreeToTerms ? 'Yes' : 'No');
      }

      // Submit form data using application/x-www-form-urlencoded encoding
      const response = await fetch('https://readdy.ai/api/form/d1sm1vl4072tvml0diu0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formDataToSubmit
      });

      if (response.ok) {
        setIsSubmitting(false);
        setSubmitSuccess(true);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setIsSubmitting(false);
      // Show error message on current page instead of redirecting
      alert('Registration submission failed. Please try again.');
    }
  };

  const nextStep = () => {
    if (!mounted) return;
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (!mounted) return;
    if (currentStep === 2) {
      setSelectedType('');
      setCurrentStep(1);
    } else {
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
            <p className="text-gray-600">Loading registration form...</p>
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
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-6">
                <i className="ri-check-line text-3xl text-green-600"></i>
              </div>
              <h1 className="text-4xl font-bold text-[#1F3D3A] mb-6">Registration Successful!</h1>
              <p className="text-xl text-gray-600 mb-8">
                Welcome to InHub! Your registration has been submitted successfully. We'll review your application and get back to you within 24 hours.
              </p>
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h3 className="font-semibold text-[#1F3D3A] mb-4">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    <span className="text-gray-700">Application review and verification (within 24 hours)</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    <span className="text-gray-700">Account activation and welcome email</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    <span className="text-gray-700">Access to platform features and services</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    <span className="text-gray-700">Onboarding call with our team</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/" className="bg-[#1F3D3A] text-white px-8 py-3 rounded-full hover:bg-[#2a5248] transition-colors whitespace-nowrap cursor-pointer">
                  Back to Home
                </Link>
                <Link href="/services" className="border border-[#1F3D3A] text-[#1F3D3A] px-8 py-3 rounded-full hover:bg-[#1F3D3A] hover:text-white transition-colors whitespace-nowrap cursor-pointer">
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(31, 61, 58, 0.9), rgba(31, 61, 58, 0.9)), url('https://readdy.ai/api/search-image?query=Ethiopian%20business%20professionals%20in%20modern%20office%20setting%20reviewing%20registration%20documents%20and%20digital%20forms%2C%20contemporary%20workspace%20with%20laptops%20and%20business%20materials%2C%20professional%20registration%20and%20onboarding%20process%2C%20clean%20organized%20environment&width=1920&height=500&seq=biznezreg&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Business Registration</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Join InHub's ecosystem and connect with Ethiopia's top professionals and businesses
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">

            {/* Step 1: Registration Type Selection */}
            {currentStep === 1 && (
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-[#1F3D3A] mb-4">Choose Your Registration Type</h2>
                <p className="text-xl text-gray-600 mb-12">
                  Select the option that best describes your organization or role
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {registrationTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => handleTypeSelection(type.id)}
                      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 border-gray-100 hover:border-[#1F3D3A] group"
                    >
                      <div className="w-16 h-16 flex items-center justify-center bg-[#1F3D3A]/10 rounded-2xl mx-auto mb-6 group-hover:bg-[#1F3D3A] transition-colors">
                        <i className={`${type.icon} text-2xl text-[#1F3D3A] group-hover:text-white`}></i>
                      </div>
                      <h3 className="text-xl font-semibold text-[#1F3D3A] mb-2">{type.title}</h3>
                      <p className="text-gray-600 mb-6">{type.description}</p>
                      <div className="space-y-2">
                        {type.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-sm text-gray-600">
                            <i className="ri-check-line text-green-500 mr-2"></i>
                            {feature}
                          </div>
                        ))}
                      </div>
                      <div className="mt-6">
                        <span className="bg-[#1F3D3A] text-white px-6 py-2 rounded-full group-hover:bg-white group-hover:text-[#1F3D3A] transition-colors">
                          Get Started
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Registration Forms */}
            {currentStep === 2 && selectedType && (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8" data-readdy-form>
                <div className="flex items-center mb-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-colors cursor-pointer mr-4"
                  >
                    <i className="ri-arrow-left-line"></i>
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-[#1F3D3A]">
                      {registrationTypes.find(t => t.id === selectedType)?.title} Registration
                    </h2>
                    <p className="text-gray-600">Please fill in your information below</p>
                  </div>
                </div>

                {/* Business Registration Form */}
                {selectedType === 'business' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={(e) => updateFormData('fullName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="Enter your full name"
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
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                        <input
                          type="text"
                          name="companyName"
                          required
                          value={formData.companyName}
                          onChange={(e) => updateFormData('companyName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="Enter your company name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="+251947017777"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={(e) => updateFormData('jobTitle', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="Enter your job title"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Business Industry *</label>
                        <select
                          name="businessIndustry"
                          required
                          value={formData.businessIndustry}
                          onChange={(e) => updateFormData('businessIndustry', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select industry</option>
                          {businessIndustries.map((industry) => (
                            <option key={industry} value={industry}>{industry}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Turnover *</label>
                        <select
                          name="companyTurnover"
                          required
                          value={formData.companyTurnover}
                          onChange={(e) => updateFormData('companyTurnover', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select turnover range</option>
                          {companyTurnovers.map((turnover) => (
                            <option key={turnover} value={turnover}>{turnover}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Number of Employees *</label>
                        <select
                          name="numberOfEmployees"
                          required
                          value={formData.numberOfEmployees}
                          onChange={(e) => updateFormData('numberOfEmployees', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select employee count</option>
                          {employeeCounts.map((count) => (
                            <option key={count} value={count}>{count}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Type of Business *</label>
                        <select
                          name="typeOfBusiness"
                          required
                          value={formData.typeOfBusiness}
                          onChange={(e) => updateFormData('typeOfBusiness', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select business type</option>
                          {businessTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                        <input
                          type="text"
                          name="location"
                          required
                          value={formData.location}
                          onChange={(e) => updateFormData('location', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="City/Region, Office address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Years in Operation *</label>
                        <select
                          name="yearsInOperation"
                          required
                          value={formData.yearsInOperation}
                          onChange={(e) => updateFormData('yearsInOperation', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select years in operation</option>
                          {yearsInOperationOptions.map((years) => (
                            <option key={years} value={years}>{years}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Skill Owner Registration Form */}
                {selectedType === 'skill-owner' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={(e) => updateFormData('fullName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="Enter your full name"
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
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="+251947017777"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                        <input
                          type="text"
                          name="location"
                          required
                          value={formData.location}
                          onChange={(e) => updateFormData('location', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="City, Country"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title *</label>
                      <input
                        type="text"
                        name="professionalTitle"
                        required
                        value={formData.professionalTitle}
                        onChange={(e) => updateFormData('professionalTitle', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="e.g., Senior Full Stack Developer, UI/UX Designer"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
                        <select
                          name="experienceLevel"
                          required
                          value={formData.experienceLevel}
                          onChange={(e) => updateFormData('experienceLevel', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select experience level</option>
                          {experienceLevels.map((level) => (
                            <option key={level} value={level}>{level}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate (USD) *</label>
                        <input
                          type="number"
                          name="hourlyRate"
                          required
                          min="1"
                          max="500"
                          value={formData.hourlyRate}
                          onChange={(e) => updateFormData('hourlyRate', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="25"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Availability *</label>
                      <select
                        name="availability"
                        required
                        value={formData.availability}
                        onChange={(e) => updateFormData('availability', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                      >
                        <option value="">Select availability</option>
                        {availabilityOptions.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Skills & Expertise *</label>
                      <div className="space-y-4">
                        {skillCategories.map((category) => (
                          <div key={category} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-medium text-gray-800 mb-3">{category}</h4>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                              {skillOptions[category as keyof typeof skillOptions]?.map((skill) => (
                                <button
                                  key={skill}
                                  type="button"
                                  onClick={() => ((formData.skills as string[]).includes(skill) ? removeSkill(skill) : addSkill(skill))}

                                  className={`px-3 py-2 text-sm rounded-full transition-colors cursor-pointer ${
                                  (formData.skills as string[]).includes(skill)


                                      ? 'bg-[#1F3D3A] text-white'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  {skill}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      {formData.skills.length > 0 && (
                        <div className="mt-4">
                          <div className="text-sm text-gray-600 mb-2">Selected skills ({formData.skills.length}):</div>
                          <div className="flex flex-wrap gap-2">
                            {formData.skills.map((skill) => (
                              <div key={skill} className="flex items-center bg-[#1F3D3A] text-white px-3 py-1 rounded-full text-sm">
                                {skill}
                                <button
                                  type="button"
                                  onClick={() => removeSkill(skill)}
                                  className="ml-2 text-white hover:text-gray-300 cursor-pointer"
                                >
                                  <i className="ri-close-line"></i>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Links</label>
                      <textarea
                        name="portfolioLinks"
                        value={formData.portfolioLinks}
                        onChange={(e) => updateFormData('portfolioLinks', e.target.value)}
                        rows={3}
                        maxLength={500}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="Share links to your portfolio, GitHub, Behance, LinkedIn, or previous work examples (one per line)"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {formData.portfolioLinks.length}/500 characters
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Certifications & Qualifications</label>
                      <textarea
                        name="certifications"
                        value={formData.certifications}
                        onChange={(e) => updateFormData('certifications', e.target.value)}
                        rows={3}
                        maxLength={500}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="List your relevant certifications, degrees, training, and qualifications"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {formData.certifications.length}/500 characters
                      </div>
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <i className="ri-information-line text-blue-600 mr-3 mt-1"></i>
                        <div>
                          <h4 className="font-medium text-blue-800 mb-2">Skill Owner Benefits</h4>
                          <ul className="text-blue-700 text-sm space-y-1">
                            <li>• Access to verified project opportunities</li>
                            <li>• Secure payment system with milestone protection</li>
                            <li>• Professional profile showcasing your expertise</li>
                            <li>• Skill verification and certification programs</li>
                            <li>• Dedicated support and career guidance</li>
                            <li>• Networking opportunities with other professionals</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Project Owner Registration Form */}
                {selectedType === 'project-owner' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={(e) => updateFormData('fullName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="Enter your full name"
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
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={(e) => updateFormData('phoneNumber', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="+251947017777"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                        <input
                          type="text"
                          name="location"
                          required
                          value={formData.location}
                          onChange={(e) => updateFormData('location', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="City, Country"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Organization Type *</label>
                      <select
                        name="organizationType"
                        required
                        value={formData.organizationType}
                        onChange={(e) => updateFormData('organizationType', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                      >
                        <option value="">Select organization type</option>
                        <option value="individual">Individual/Freelancer</option>
                        <option value="small-business">Small Business (1-50 employees)</option>
                        <option value="medium-business">Medium Business (51-250 employees)</option>
                        <option value="large-enterprise">Large Enterprise (250+ employees)</option>
                        <option value="startup">Startup</option>
                        <option value="ngo">NGO/Non-Profit</option>
                        <option value="government">Government Agency</option>
                        <option value="educational">Educational Institution</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Budget Range *</label>
                      <select
                        name="budgetRange"
                        required
                        value={formData.budgetRange}
                        onChange={(e) => updateFormData('budgetRange', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                      >
                        <option value="">Select typical project budget</option>
                        <option value="under-1k">Under $1,000</option>
                        <option value="1k-5k">$1,000 - $5,000</option>
                        <option value="5k-10k">$5,000 - $10,000</option>
                        <option value="10k-25k">$10,000 - $25,000</option>
                        <option value="25k-50k">$25,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="over-100k">Over $100,000</option>
                        <option value="varies">Varies by project</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Project Types You're Interested In *</label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                          'Web Development',
                          'Mobile Apps',
                          'UI/UX Design',
                          'Digital Marketing',
                          'Branding & Identity',
                          'Content Creation',
                          'Data Analysis',
                          'Business Consulting',
                          'Software Development',
                          'E-commerce Solutions',
                          'Cloud Services',
                          'Quality Assurance',
                          'Project Management',
                          'Technical Writing',
                          'Training & Education',
                          'Other'
                        ].map((type) => (
                          <label key={type} className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={(formData.projectTypes as string[]).includes(type)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  updateFormData('projectTypes', [...formData.projectTypes, type]);
                                } else {
                                  updateFormData('projectTypes', formData.projectTypes.filter(t => t !== type));
                                }
                              }}
                              className="w-4 h-4 text-[#1F3D3A] border-gray-300 rounded focus:ring-[#1F3D3A]"
                            />
                            <span className="ml-2 text-sm text-gray-700">{type}</span>
                          </label>
                        ))}
                      </div>
                      <div className="text-sm text-gray-500 mt-2">
                        Selected: {formData.projectTypes.length} project types
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Frequency *</label>
                        <select
                          name="frequency"
                          required
                          value={formData.frequency}
                          onChange={(e) => updateFormData('frequency', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">How often do you have projects?</option>
                          <option value="weekly">Weekly</option>
                          <option value="monthly">Monthly</option>
                          <option value="quarterly">Quarterly</option>
                          <option value="semi-annually">Semi-annually</option>
                          <option value="annually">Annually</option>
                          <option value="as-needed">As needed</option>
                          <option value="first-time">This is my first project</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Team Structure *</label>
                        <select
                          name="teamStructure"
                          required
                          value={formData.teamStructure}
                          onChange={(e) => updateFormData('teamStructure', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select preferred structure</option>
                          <option value="individual">Individual Professional</option>
                          <option value="small-team">Small Team (2-3 people)</option>
                          <option value="medium-team">Medium Team (4-8 people)</option>
                          <option value="large-team">Large Team (9+ people)</option>
                          <option value="flexible">Flexible - depends on project</option>
                          <option value="agency">Full-service Agency</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Industry/Sector</label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={(e) => updateFormData('industry', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                      >
                        <option value="">Select your industry (optional)</option>
                        {businessIndustries.map((industry) => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Management Experience</label>
                      <select
                        name="pmExperience"
                        value={formData.pmExperience}
                        onChange={(e) => updateFormData('pmExperience', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                      >
                        <option value="">How experienced are you with managing projects?</option>
                        <option value="first-time">First-time project owner</option>
                        <option value="beginner">Beginner (1-3 projects)</option>
                        <option value="intermediate">Intermediate (4-10 projects)</option>
                        <option value="experienced">Experienced (11-25 projects)</option>
                        <option value="expert">Expert (25+ projects)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Communication Preferences</label>
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="communicationStyle"
                              value="frequent"
                              checked={formData.communicationStyle === 'frequent'}
                              onChange={(e) => updateFormData('communicationStyle', e.target.value)}
                              className="w-4 h-4 text-[#1F3D3A] border-gray-300 focus:ring-[#1F3D3A]"
                            />
                            <span className="ml-2 text-sm text-gray-700">Frequent updates (daily/weekly)</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="communicationStyle"
                              value="moderate"
                              checked={formData.communicationStyle === 'moderate'}
                              onChange={(e) => updateFormData('communicationStyle', e.target.value)}
                              className="w-4 h-4 text-[#1F3D3A] border-gray-300 focus:ring-[#1F3D3A]"
                            />
                            <span className="ml-2 text-sm text-gray-700">Moderate updates (weekly/bi-weekly)</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="communicationStyle"
                              value="milestone"
                              checked={formData.communicationStyle === 'milestone'}
                              onChange={(e) => updateFormData('communicationStyle', e.target.value)}
                              className="w-4 h-4 text-[#1F3D3A] border-gray-300 focus:ring-[#1F3D3A]"
                            />
                            <span className="ml-2 text-sm text-gray-700">Milestone-based updates</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name="communicationStyle"
                              value="minimal"
                              checked={formData.communicationStyle === 'minimal'}
                              onChange={(e) => updateFormData('communicationStyle', e.target.value)}
                              className="w-4 h-4 text-[#1F3D3A] border-gray-300 focus:ring-[#1F3D3A]"
                            />
                            <span className="ml-2 text-sm text-gray-700">Minimal communication</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Communication Channels</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {['Platform Messages', 'Email', 'Video Calls', 'Phone Calls', 'Slack', 'WhatsApp', 'Telegram', 'Microsoft Teams'].map((channel) => (
                          <label key={channel} className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={(formData.communicationChannels as string[])?.includes(channel)}

                              onChange={(e) => {
                                const channels = formData.communicationChannels || [];
                                if (e.target.checked) {
                                  updateFormData('communicationChannels', [...channels, channel]);
                                } else {
                                  updateFormData('communicationChannels', channels.filter(c => c !== channel));
                                }
                              }}
                              className="w-4 h-4 text-[#1F3D3A] border-gray-300 rounded focus:ring-[#1F3D3A]"
                            />
                            <span className="ml-2 text-sm text-gray-700">{channel}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours Preference</label>
                      <select
                        name="workingHours"
                        value={formData.workingHours}
                        onChange={(e) => updateFormData('workingHours', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                      >
                        <option value="">Select preferred working hours</option>
                        <option value="ethiopian-hours">Ethiopian Business Hours (9 AM - 5 PM EAT)</option>
                        <option value="european-hours">European Hours (9 AM - 5 PM CET)</option>
                        <option value="american-hours">American Hours (9 AM - 5 PM EST/PST)</option>
                        <option value="flexible-hours">Flexible Hours</option>
                        <option value="overlap-required">Some Overlap Required</option>
                        <option value="24-7-availability">24/7 Availability Needed</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Specific Requirements or Notes</label>
                      <textarea
                        name="specificRequirements"
                        value={formData.specificRequirements}
                        onChange={(e) => updateFormData('specificRequirements', e.target.value)}
                        rows={4}
                        maxLength={1000}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="Tell us about any specific requirements, preferences, quality standards, compliance needs, or any other information that would help us match you with the right professionals..."
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {formData.specificRequirements?.length || 0}/1000 characters
                      </div>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl">
                      <div className="flex items-start">
                        <i className="ri-information-line text-blue-600 mr-3 mt-1"></i>
                        <div>
                          <h4 className="font-medium text-blue-800 mb-2">Project Owner Benefits</h4>
                          <ul className="text-blue-700 text-sm space-y-1">
                            <li>• Access to Ethiopia's top verified professionals</li>
                            <li>• Comprehensive project management tools and dashboard</li>
                            <li>• Secure payment system with milestone-based releases</li>
                            <li>• 24/7 customer support and dispute resolution</li>
                            <li>• Quality guarantee and satisfaction protection</li>
                            <li>• Real-time project tracking and communication tools</li>
                            <li>• Dedicated account manager for larger projects</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Terms and Submit */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center mb-6">
                    <input
                      type="checkbox"
                      id="terms"
                      name="agreeToTerms"
                      required
                      checked={formData.agreeToTerms}
                      onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                      className="w-4 h-4 text-[#1F3D3A] focus:ring-[#1F3D3A] border-gray-300 rounded"
                    />
                    <label htmlFor="terms" className="ml-3 text-gray-700">
                      I agree to the <Link href="/terms" className="text-[#1F3D3A] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#1F3D3A] hover:underline">Privacy Policy</Link>
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || (selectedType === 'business' && (!formData.fullName || !formData.email || !formData.companyName || !formData.businessIndustry || !formData.companyTurnover || !formData.numberOfEmployees || !formData.typeOfBusiness || !formData.location || !formData.yearsInOperation)) || (selectedType === 'skill-owner' && (!formData.fullName || !formData.email || !formData.location || !formData.professionalTitle || !formData.experienceLevel || !formData.hourlyRate || !formData.availability || formData.skills.length === 0)) || (selectedType === 'project-owner' && (!formData.fullName || !formData.email || !formData.location || !formData.organizationType || !formData.budgetRange || formData.projectTypes.length === 0 || !formData.frequency || !formData.teamStructure)) || !formData.agreeToTerms}
                    className={`w-full py-3 rounded-lg font-semibold transition-colors cursor-pointer flex items-center justify-center ${
                      !isSubmitting && formData.agreeToTerms &&
                      ((selectedType === 'business' && formData.fullName && formData.email && formData.companyName && formData.businessIndustry && formData.companyTurnover && formData.numberOfEmployees && formData.typeOfBusiness && formData.location && formData.yearsInOperation) ||
                       (selectedType === 'skill-owner' && formData.fullName && formData.email && formData.location && formData.professionalTitle && formData.experienceLevel && formData.hourlyRate && formData.availability && formData.skills.length > 0) ||
                       (selectedType === 'project-owner' && formData.fullName && formData.email && formData.location && formData.organizationType && formData.budgetRange && formData.projectTypes.length > 0 && formData.frequency && formData.teamStructure) ||
                       (selectedType !== 'business' && selectedType !== 'skill-owner' && selectedType !== 'project-owner'))
                        ? 'bg-[#1F3D3A] text-white hover:bg-[#2a5248]'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Submitting Registration...
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-line mr-2"></i>
                        Complete Registration
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
