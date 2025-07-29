
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PostProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<{ skills: string[]; [key: string]: any }>({
    projectTitle: '',
    projectType: '',
    category: '',
    description: '',
    skills: [],
    budget: '',
    timeline: '',
    experienceLevel: '',
    projectDuration: '',
    attachments: [],
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    additionalRequirements: '',
    priority: 'medium',
    teamSize: '1',
    communicationPreference: 'platform',
    workingHours: 'flexible',
    milestones: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = [
    { id: 'development', name: 'Development & Programming', icon: 'ri-code-line' },
    { id: 'design', name: 'Design & Creative', icon: 'ri-palette-line' },
    { id: 'marketing', name: 'Marketing & Sales', icon: 'ri-megaphone-line' },
    { id: 'data', name: 'Data & Analytics', icon: 'ri-bar-chart-line' },
    { id: 'business', name: 'Business & Strategy', icon: 'ri-briefcase-line' },
    { id: 'content', name: 'Content & Writing', icon: 'ri-quill-pen-line' },
    { id: 'finance', name: 'Finance & Accounting', icon: 'ri-money-dollar-circle-line' },
    { id: 'legal', name: 'Legal & Compliance', icon: 'ri-scales-line' },
    { id: 'consultation', name: 'Consultation & Advisory', icon: 'ri-user-star-line' },
    { id: 'other', name: 'Other', icon: 'ri-more-line' }
  ];

  const skillSuggestions = {
    development: ['React', 'Node.js', 'Python', 'JavaScript', 'PHP', 'Mobile Development', 'WordPress', 'Database Design'],
    design: ['UI/UX Design', 'Graphic Design', 'Logo Design', 'Web Design', 'Branding', 'Figma', 'Adobe Creative Suite'],
    marketing: ['Digital Marketing', 'SEO', 'Social Media', 'Google Ads', 'Content Marketing', 'Email Marketing', 'Analytics'],
    data: ['Data Analysis', 'Machine Learning', 'Python', 'SQL', 'Tableau', 'Power BI', 'Statistical Analysis'],
    business: ['Business Strategy', 'Project Management', 'Process Improvement', 'Market Research', 'Financial Planning'],
    content: ['Content Writing', 'Copywriting', 'Blog Writing', 'Technical Writing', 'Social Media Content', 'SEO Writing'],
    finance: ['Financial Analysis', 'Accounting', 'Tax Planning', 'Budgeting', 'QuickBooks', 'Financial Planning'],
    legal: ['Contract Review', 'Legal Research', 'Compliance', 'Business Registration', 'Intellectual Property'],
    consultation: ['Strategic Consulting', 'Business Advisory', 'Market Entry', 'Process Optimization', 'Change Management'],
    other: ['Research', 'Translation', 'Virtual Assistant', 'Customer Service', 'Data Entry']
  };

  const updateFormData = (field: string, value: any) => {

    if (!mounted) return;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

 const addSkill = (skill: string) => {

    if (!mounted) return;
    if (!formData.skills.includes(skill)) {
      updateFormData('skills', [...formData.skills, skill]);
    }
  };

  const removeSkill = (skill: string) => {

    if (!mounted) return;
    updateFormData('skills', formData.skills.filter(s => s !== skill));
  };

  const addMilestone = () => {
    if (!mounted) return;
    const newMilestone = {
      id: Date.now(),
      title: '',
      description: '',
      deliverables: '',
      duration: '',
      budget: ''
    };
    updateFormData('milestones', [...formData.milestones, newMilestone]);
  };

  const updateMilestone = (id: string | number, field: string, value: any) => {

    if (!mounted) return;
    const updated = formData.milestones.map((m: any) =>
  m.id === id ? { ...m, [field]: value } : m
);

    updateFormData('milestones', updated);
  };

  const removeMilestone = (id: string | number) => {

    if (!mounted) return;
    updateFormData('milestones', formData.milestones.filter((m: { id: string | number }) => m.id !== id));
  };
    if (!mounted) return;
const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const fileArray = e.target.files ? Array.from(e.target.files).map((file: File) => ({
    id: Date.now() + Math.random(),
    name: file.name,
    size: file.size,
    type: file.type,
  })) : [];

  updateFormData('attachments', [...formData.attachments, ...fileArray]);
};

  const removeAttachment = (id: number) => {
  if (!mounted) return;
  updateFormData(
    'attachments',
    formData.attachments.filter((f: { id: number }) => f.id !== id)
  );
};

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {

    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload({ target: { files: e.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);

    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!mounted) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setSubmitSuccess(true);
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
            <p className="text-gray-600">Loading project posting form...</p>
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
              <h1 className="text-4xl font-bold text-[#1F3D3A] mb-6">Project Posted Successfully!</h1>
              <p className="text-xl text-gray-600 mb-8">
                Your project has been submitted and will be reviewed by our team. We'll match you with qualified professionals within 24 hours.
              </p>
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h3 className="font-semibold text-[#1F3D3A] mb-4">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    <span className="text-gray-700">Project review and optimization (within 2 hours)</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    <span className="text-gray-700">Professional matching and notifications (within 12 hours)</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    <span className="text-gray-700">Receive qualified proposals (within 24 hours)</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    <span className="text-gray-700">Access your project management dashboard</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/project-management" className="bg-green-500 text-white px-8 py-3 rounded-full hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer">
                  Go to Project Dashboard
                </Link>
                <Link href="/skills" className="bg-[#1F3D3A] text-white px-8 py-3 rounded-full hover:bg-[#2a5248] transition-colors whitespace-nowrap cursor-pointer">
                  Browse Professionals
                </Link>
                <Link href="/" className="border border-[#1F3D3A] text-[#1F3D3A] px-8 py-3 rounded-full hover:bg-[#1F3D3A] hover:text-white transition-colors whitespace-nowrap cursor-pointer">
                  Back to Home
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
          backgroundImage: `linear-gradient(rgba(31, 61, 58, 0.9), rgba(31, 61, 58, 0.9)), url('https://readdy.ai/api/search-image?query=Ethiopian%20business%20professional%20reviewing%20project%20proposals%20and%20documents%20on%20laptop%20in%20modern%20office%2C%20project%20planning%20materials%20and%20digital%20collaboration%20tools%20on%20desk%2C%20contemporary%20workspace%20showcasing%20project%20management%20and%20professional%20services%2C%20clean%20organized%20environment%20with%20natural%20lighting&width=1920&height=500&seq=postproject&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Your Project</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Connect with Ethiopia's top professionals and get your project completed with excellence
          </p>
        </div>
      </section>

      {/* Progress Indicator */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center space-x-4 md:space-x-8">
              {[
                { step: 1, title: 'Project Details', icon: 'ri-file-text-line' },
                { step: 2, title: 'Requirements', icon: 'ri-settings-line' },
                { step: 3, title: 'Milestones & Files', icon: 'ri-flag-line' },
                { step: 4, title: 'Contact Info', icon: 'ri-user-line' }
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

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Project Details */}
              {currentStep === 1 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-[#1F3D3A] mb-8">Tell us about your project</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={formData.projectTitle}
                        onChange={(e) => updateFormData('projectTitle', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="e.g., E-commerce Website Development"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Project Category *</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {categories.map((category) => (
                          <label key={category.id} className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                            formData.category === category.id
                              ? 'border-[#1F3D3A] bg-[#1F3D3A]/5'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}>
                            <input
                              type="radio"
                              name="category"
                              value={category.id}
                              checked={formData.category === category.id}
                              onChange={(e) => updateFormData('category', e.target.value)}
                              className="sr-only"
                            />
                            <i className={`${category.icon} text-xl text-[#1F3D3A] mr-3`}></i>
                            <span className="text-sm font-medium">{category.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Project Type *</label>
                        <select
                          required
                          value={formData.projectType}
                          onChange={(e) => updateFormData('projectType', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select project type</option>
                          <option value="one-time">One-time Project</option>
                          <option value="ongoing">Ongoing Work</option>
                          <option value="consultation">Consultation</option>
                          <option value="contract">Long-term Contract</option>
                          <option value="maintenance">Maintenance & Support</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                        <select
                          value={formData.priority}
                          onChange={(e) => updateFormData('priority', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
                      <textarea
                        required
                        rows={6}
                        value={formData.description}
                        onChange={(e) => updateFormData('description', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="Describe your project in detail. Include objectives, expected deliverables, target audience, and any specific requirements..."
                        maxLength={2000}
                      ></textarea>
                      <div className="text-sm text-gray-500 mt-1">
                        {formData.description.length}/2000 characters
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.projectTitle || !formData.category || !formData.projectType || !formData.description}
                      className={`px-8 py-3 rounded-full font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        formData.projectTitle && formData.category && formData.projectType && formData.description
                          ? 'bg-[#1F3D3A] text-white hover:bg-[#2a5248]'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continue to Requirements
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Requirements */}
              {currentStep === 2 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-[#1F3D3A] mb-8">Project Requirements</h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">Required Skills *</label>
                      {formData.category && (
                        <div className="mb-4">
                          <div className="text-sm text-gray-600 mb-2">Suggested skills for {categories.find(c => c.id === formData.category)?.name}:</div>
                          <div className="flex flex-wrap gap-2">
                            {skillSuggestions[formData.category as keyof typeof skillSuggestions]?.map((skill) => (

                              <button
                                key={skill}
                                type="button"
                                onClick={() => addSkill(skill)}
                                className={`px-3 py-1 text-sm rounded-full transition-colors cursor-pointer ${
                                  formData.skills.includes(skill)
                                    ? 'bg-[#1F3D3A] text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                              >
                                {skill}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {formData.skills.length > 0 && (
                        <div className="mb-4">
                          <div className="text-sm text-gray-600 mb-2">Selected skills:</div>
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

                      <input
                        type="text"
                        placeholder="Type a skill and press Enter to add"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            const skill =  (e.target as HTMLInputElement).value = ''.trim();
                            if (skill) {
                              addSkill(skill);
                               (e.target as HTMLInputElement).value = '';
                            }
                          }
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range *</label>
                        <select
                          required
                          value={formData.budget}
                          onChange={(e) => updateFormData('budget', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select budget range</option>
                          <option value="under-500">Under $500</option>
                          <option value="500-1000">$500 - $1,000</option>
                          <option value="1000-2500">$1,000 - $2,500</option>
                          <option value="2500-5000">$2,500 - $5,000</option>
                          <option value="5000-10000">$5,000 - $10,000</option>
                          <option value="10000-25000">$10,000 - $25,000</option>
                          <option value="over-25000">Over $25,000</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timeline *</label>
                        <select
                          required
                          value={formData.timeline}
                          onChange={(e) => updateFormData('timeline', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select timeline</option>
                          <option value="asap">ASAP (Rush job)</option>
                          <option value="1-week">Within 1 week</option>
                          <option value="2-weeks">Within 2 weeks</option>
                          <option value="1-month">Within 1 month</option>
                          <option value="2-months">Within 2 months</option>
                          <option value="3-months">Within 3 months</option>
                          <option value="6-months">Within 6 months</option>
                          <option value="flexible">Flexible timeline</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level *</label>
                        <select
                          required
                          value={formData.experienceLevel}
                          onChange={(e) => updateFormData('experienceLevel', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select experience level</option>
                          <option value="entry">Entry Level (0-2 years)</option>
                          <option value="intermediate">Intermediate (2-5 years)</option>
                          <option value="expert">Expert (5+ years)</option>
                          <option value="any">Any experience level</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Team Size Needed</label>
                        <select
                          value={formData.teamSize}
                          onChange={(e) => updateFormData('teamSize', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="1">Individual Professional</option>
                          <option value="2-3">Small Team (2-3 people)</option>
                          <option value="4-6">Medium Team (4-6 people)</option>
                          <option value="7+">Large Team (7+ people)</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Communication Preference</label>
                        <select
                          value={formData.communicationPreference}
                          onChange={(e) => updateFormData('communicationPreference', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="platform">Platform Messages Only</option>
                          <option value="email">Email Communication</option>
                          <option value="video">Video Calls Preferred</option>
                          <option value="mixed">Mixed Communication</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
                        <select
                          value={formData.workingHours}
                          onChange={(e) => updateFormData('workingHours', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="flexible">Flexible Hours</option>
                          <option value="ethiopian">Ethiopian Business Hours</option>
                          <option value="european">European Hours</option>
                          <option value="american">American Hours</option>
                          <option value="overlap">Overlap Required</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Additional Requirements</label>
                      <textarea
                        rows={4}
                        value={formData.additionalRequirements}
                        onChange={(e) => updateFormData('additionalRequirements', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="Any specific requirements, preferences, industry experience, certifications, or additional information..."
                        maxLength={1000}
                      ></textarea>
                      <div className="text-sm text-gray-500 mt-1">
                        {formData.additionalRequirements.length}/1000 characters
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-8 py-3 border border-[#1F3D3A] text-[#1F3D3A] rounded-full font-semibold hover:bg-[#1F3D3A] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Back to Project Details
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      disabled={!formData.skills.length || !formData.budget || !formData.timeline || !formData.experienceLevel}
                      className={`px-8 py-3 rounded-full font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                        formData.skills.length && formData.budget && formData.timeline && formData.experienceLevel
                          ? 'bg-[#1F3D3A] text-white hover:bg-[#2a5248]'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Continue to Milestones
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Milestones & Files */}
              {currentStep === 3 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-[#1F3D3A] mb-8">Project Milestones & Files</h2>

                  <div className="space-y-8">
                    {/* Milestones Section */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-gray-800">Project Milestones</h3>
                        <button
                          type="button"
                          onClick={addMilestone}
                          className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600 transition-colors cursor-pointer"
                        >
                          <i className="ri-add-line mr-2"></i>
                          Add Milestone
                        </button>
                      </div>

                      {formData.milestones.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                          <i className="ri-flag-line text-3xl text-gray-400 mb-2"></i>
                          <p className="text-gray-600">No milestones added yet</p>
                          <p className="text-sm text-gray-500">Break your project into manageable milestones for better tracking</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {formData.milestones.map((milestone: any, index: number) => (
                            <div key={milestone.id} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="font-medium text-gray-800">Milestone {index + 1}</h4>
                                <button
                                  type="button"
                                  onClick={() => removeMilestone(milestone.id)}
                                  className="text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                  <i className="ri-delete-bin-line"></i>
                                </button>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Milestone Title</label>
                                  <input
                                    type="text"
                                    value={milestone.title}
                                    onChange={(e) => updateMilestone(milestone.id, 'title', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                                    placeholder="e.g., Design Phase Complete"
                                  />
                                </div>

                                <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                                  <input
                                    type="text"
                                    value={milestone.duration}
                                    onChange={(e) => updateMilestone(milestone.id, 'duration', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                                    placeholder="e.g., 2 weeks"
                                  />
                                </div>
                              </div>

                              <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                  rows={2}
                                  value={milestone.description}
                                  onChange={(e) => updateMilestone(milestone.id, 'description', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                                  placeholder="Describe what will be delivered in this milestone..."
                                ></textarea>
                              </div>

                              <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Deliverables</label>
                                <input
                                  type="text"
                                  value={milestone.deliverables}
                                  onChange={(e) => updateMilestone(milestone.id, 'deliverables', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                                  placeholder="e.g., Wireframes, Mockups, Style Guide"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* File Upload Section */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Files & Documents</h3>

                      <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                          dragActive
                            ? 'border-[#1F3D3A] bg-[#1F3D3A]/5'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                      >
                        <i className="ri-upload-cloud-2-line text-4xl text-gray-400 mb-4"></i>
                        <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
                        <p className="text-sm text-gray-500 mb-4">
                          Upload project briefs, wireframes, references, or any relevant documents
                        </p>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}

                          className="hidden"
                          id="file-upload"
                          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.zip,.rar"
                        />
                        <label
                          htmlFor="file-upload"
                          className="bg-[#1F3D3A] text-white px-6 py-2 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer"
                        >
                          Choose Files
                        </label>
                        <p className="text-xs text-gray-500 mt-2">
                          Supported: PDF, DOC, Images, ZIP (Max 10MB each)
                        </p>
                      </div>

                      {formData.attachments.length > 0 && (
                        <div className="mt-6">
                          <h4 className="font-medium text-gray-800 mb-3">Uploaded Files</h4>
                          <div className="space-y-2">
                            {(formData.attachments as any[]).map((file: any) => (
                              <div key={file.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                <div className="flex items-center">
                                  <i className="ri-file-text-line text-[#1F3D3A] mr-3"></i>
                                  <div>
                                    <p className="font-medium text-gray-800">{file.name}</p>
                                    <p className="text-sm text-gray-500">
                                      {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => removeAttachment(file.id)}
                                  className="text-red-500 hover:text-red-700 cursor-pointer"
                                >
                                  <i className="ri-close-line"></i>
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-8 py-3 border border-[#1F3D3A] text-[#1F3D3A] rounded-full font-semibold hover:bg-[#1F3D3A] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Back to Requirements
                    </button>
                    <button
                      type="button"
                      onClick={nextStep}
                      className="bg-[#1F3D3A] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#2a5248] transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Continue to Contact Info
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Contact Information */}
              {currentStep === 4 && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-[#1F3D3A] mb-8">Contact Information</h2>

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => updateFormData('companyName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="Your company or organization name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.contactName}
                          onChange={(e) => updateFormData('contactName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="Your full name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="your.email@example.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="+251 9XX XXX XXX"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                      <select
                        required
                        value={formData.location}
                        onChange={(e) => updateFormData('location', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                      >
                        <option value="">Select your location</option>
                        <option value="addis-ababa">Addis Ababa</option>
                        <option value="dire-dawa">Dire Dawa</option>
                        <option value="mekelle">Mekelle</option>
                        <option value="hawassa">Hawassa</option>
                        <option value="bahir-dar">Bahir Dar</option>
                        <option value="gondar">Gondar</option>
                        <option value="adama">Adama</option>
                        <option value="jimma">Jimma</option>
                        <option value="dessie">Dessie</option>
                        <option value="other-ethiopia">Other (Ethiopia)</option>
                        <option value="international">International</option>
                      </select>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-xl">
                      <div className="flex items-start">
                        <i className="ri-information-line text-blue-600 text-xl mr-3 mt-1"></i>
                        <div>
                          <h3 className="font-semibold text-blue-800 mb-2">Project Posting & Management</h3>
                          <ul className="text-blue-700 text-sm space-y-1">
                            <li>• Your project will be reviewed within 2 hours</li>
                            <li>• Only verified professionals can submit proposals</li>
                            <li>• You'll receive qualified proposals within 24 hours</li>
                            <li>• Access to comprehensive project management dashboard</li>
                            <li>• Real-time collaboration tools and milestone tracking</li>
                            <li>• Secure payment system with escrow protection</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="terms"
                        required
                        className="mr-3 w-4 h-4 text-[#1F3D3A] focus:ring-[#1F3D3A]"
                      />
                      <label htmlFor="terms" className="text-gray-700">
                        I agree to the <Link href="/terms" className="text-[#1F3D3A] hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-[#1F3D3A] hover:underline">Privacy Policy</Link>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-8 py-3 border border-[#1F3D3A] text-[#1F3D3A] rounded-full font-semibold hover:bg-[#1F3D3A] hover:text-white transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Back to Milestones
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting || !formData.contactName || !formData.email || !formData.location}
                      className={`px-8 py-3 rounded-full font-semibold transition-colors whitespace-nowrap cursor-pointer flex items-center ${
                        !isSubmitting && formData.contactName && formData.email && formData.location
                          ? 'bg-green-500 text-white hover:bg-green-600'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <i className="ri-loader-4-line animate-spin mr-2"></i>
                          Posting Project...
                        </>
                      ) : (
                        <>
                          <i className="ri-send-plane-line mr-2"></i>
                          Post Project
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

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1F3D3A] mb-4">Why Post on InHub Skills</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get access to Ethiopia's top talent with guaranteed quality and security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: 'ri-shield-check-line',
                title: 'Verified Professionals',
                description: 'All professionals go through rigorous verification including skill tests, portfolio review, and background checks.'
              },
              {
                icon: 'ri-time-line',
                title: 'Fast Turnaround',
                description: 'Receive qualified proposals within 24 hours and start working with your chosen professional immediately.'
              },
              {
                icon: 'ri-wallet-line',
                title: 'Secure Payments',
                description: 'Protected payments with escrow system, milestone-based releases, and dispute resolution support.'
              },
              {
                icon: 'ri-customer-service-line',
                title: '24/7 Support',
                description: 'Dedicated support team available around the clock to help you throughout your project journey.'
              },
              {
                icon: 'ri-star-line',
                title: 'Quality Guarantee',
                description: 'Money-back guarantee if you\'re not satisfied with the delivered work quality.'
              },
              {
                icon: 'ri-global-line',
                title: 'Local Expertise',
                description: 'Access to professionals who understand Ethiopian market dynamics and international standards.'
              }
            ].map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="w-12 h-12 flex items-center justify-center bg-[#1F3D3A]/10 rounded-lg mb-4">
                  <i className={`${benefit.icon} text-xl text-[#1F3D3A]`}></i>
                </div>
                <h3 className="font-semibold text-[#1F3D3A] mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#1F3D3A] mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600">
                Get answers to common questions about posting projects
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: 'How long does it take to receive proposals?',
                  answer: 'Most projects receive their first proposals within 2-4 hours. You can expect 3-8 qualified proposals within 24 hours of posting.'
                },
                {
                  question: 'How do I choose the right professional?',
                  answer: 'Review their portfolios, ratings, past client feedback, and conduct interviews. Our matching algorithm also suggests the best fits for your project.'
                },
                {
                  question: 'What if I\'m not satisfied with the work?',
                  answer: 'We offer dispute resolution services and money-back guarantee. Our milestone-based payment system ensures you only pay for satisfactory work.'
                },
                {
                  question: 'Can I hire multiple professionals for one project?',
                  answer: 'Yes, you can hire multiple professionals for different aspects of your project or create a team for larger projects.'
                },
                {
                  question: 'Are there any fees for posting projects?',
                  answer: 'Posting projects is completely free. We only charge a small service fee when you successfully hire a professional.'
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                  <h3 className="font-semibold text-[#1F3D3A] mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
