
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    // General Contact Form
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',

    // Consultation Form
    consultationType: '',
    preferredDate: '',
    preferredTime: '',
    budget: '',
    timeline: '',
    projectDescription: '',

    // Support Form
    supportType: '',
    priority: '',
    ticketSubject: '',
    ticketMessage: '',

    // Partnership Form
    partnershipType: '',
    organizationName: '',
    organizationSize: '',
    proposalDetails: '',

    // Common
    agreeToTerms: false,
    subscribeNewsletter: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const contactMethods = [
    {
      icon: 'ri-phone-line',
      title: 'Phone Support',
      description: 'Speak directly with our team',
      contact: '+251947017777',
      availability: 'Mon-Fri, 9AM-6PM EAT',
      color: 'blue',
      action: 'Call Now'
    },
    {
      icon: 'ri-mail-line',
      title: 'Email Support',
      description: 'Send us a detailed message',
      contact: 'hello@inhub.et',
      availability: 'Response within 24 hours',
      color: 'green',
      action: 'Send Email'
    },
    {
      icon: 'ri-chat-3-line',
      title: 'Live Chat',
      description: 'Get instant help from our team',
      contact: 'Available now',
      availability: 'Mon-Fri, 9AM-6PM EAT',
      color: 'purple',
      action: 'Start Chat'
    },
    {
      icon: 'ri-calendar-line',
      title: 'Book Meeting',
      description: 'Schedule a consultation',
      contact: 'Free 30-min session',
      availability: 'Flexible scheduling',
      color: 'orange',
      action: 'Schedule Now'
    }
  ];

  const officeLocations = [
    {
      name: 'Addis Ababa Headquarters',
      address: 'Bole Atlas, 4th Floor, Suite 401',
      city: 'Addis Ababa, Ethiopia',
      phone: '+251947017777',
      email: 'addis@inhub.et',
      hours: 'Mon-Fri: 9AM-6PM EAT',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.5403!2d38.7614!3d9.0280!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0%3A0!2zOcKwMDEnNDAuOCJOIDM4wrA0NSczOS4wIkU!5e0!3m2!1sen!2set!4v1234567890',
      services: ['Strategy Consulting', 'Business Development', 'Innovation Labs'],
      image: 'https://readdy.ai/api/search-image?query=Modern%20Ethiopian%20business%20office%20building%20in%20Addis%20Ababa%20with%20professional%20glass%20facade%20and%20contemporary%20architecture%2C%20urban%20business%20district%20with%20clean%20modern%20design%20and%20professional%20atmosphere&width=400&height=300&seq=office1&orientation=landscape'
    },
    {
      name: 'Business Innovation Hub',
      address: 'Kazanchis Business District',
      city: 'Addis Ababa, Ethiopia',
      phone: '+251947017778',
      email: 'innovation@inhub.et',
      hours: 'Mon-Sat: 8AM-7PM EAT',
      mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6271!2d38.7580!3d9.0250!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0%3A0!2zOcKwMDEnMzAuMCJOIDM4wrA0NSczMC4wIkU!5e0!3m2!1sen!2set!4v1234567891',
      services: ['Digital Transformation', 'Tech Solutions', 'Startup Incubation'],
      image: 'https://readdy.ai/api/search-image?query=Ethiopian%20innovation%20center%20and%20startup%20hub%20with%20modern%20co-working%20spaces%2C%20technology%20equipment%20and%20collaborative%20meeting%20areas%2C%20contemporary%20business%20incubator%20environment%20with%20professional%20lighting&width=400&height=300&seq=office2&orientation=landscape'
    }
  ];

  const faqs = [
    {
      question: 'How do I get started with InHub services?',
      answer: 'Getting started is easy! You can book a free consultation through our contact form, call us directly, or register for our services online. We\'ll assess your needs and recommend the best approach for your business.'
    },
    {
      question: 'What types of projects do you typically work on?',
      answer: 'We work on a wide range of projects including business strategy development, digital transformation, market entry strategies, innovation consulting, and operational optimization. Our expertise spans across technology, healthcare, finance, agriculture, and other key sectors.'
    },
    {
      question: 'How long do projects typically take?',
      answer: 'Project timelines vary based on scope and complexity. Strategy consultations can be completed in 2-4 weeks, while comprehensive transformation projects may take 3-12 months. We provide detailed timelines during the initial consultation.'
    },
    {
      question: 'Do you work with startups or only established businesses?',
      answer: 'We work with businesses of all sizes - from early-stage startups to large enterprises. Our services are tailored to meet the specific needs and budget constraints of each client, regardless of their size or industry.'
    },
    {
      question: 'What are your payment terms and pricing structure?',
      answer: 'We offer flexible payment structures including project-based fees, hourly consulting rates, and milestone-based payments. Pricing depends on project scope and requirements. We provide transparent quotes with no hidden fees.'
    },
    {
      question: 'Can you work with international clients?',
      answer: 'Yes, we serve clients across Africa and internationally. We have experience working with remote teams and can accommodate different time zones and cultural contexts. Many of our services can be delivered virtually.'
    },
    {
      question: 'What makes InHub different from other consulting firms?',
      answer: 'InHub combines deep Ethiopian market knowledge with international best practices. We focus on practical, implementable solutions and maintain ongoing relationships with our clients to ensure long-term success.'
    },
    {
      question: 'Do you provide ongoing support after project completion?',
      answer: 'Yes, we offer various support packages including implementation assistance, training programs, and ongoing advisory services. We believe in building long-term partnerships with our clients.'
    }
  ];

  const consultationTypes = [
    'Business Strategy Consultation',
    'Digital Transformation Assessment',
    'Market Entry Strategy',
    'Innovation Workshop',
    'Operational Efficiency Review',
    'Financial Planning & Analysis',
    'Custom Consultation'
  ];

  const supportTypes = [
    'Technical Support',
    'Account Management',
    'Billing Inquiry',
    'Project Support',
    'General Question',
    'Feedback'
  ];

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $15,000',
    '$15,000 - $50,000',
    '$50,000 - $100,000',
    '$100,000+',
    'To be discussed'
  ];

  const partnershipTypes = [
    'Strategic Partnership',
    'Technology Integration',
    'Channel Partnership',
    'Joint Venture',
    'Supplier Partnership',
    'Referral Program'
  ];

  const updateFormData = (field, value) => {
    if (!mounted) return;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mounted) return;

    setIsSubmitting(true);

    try {
      // Prepare form data for submission
      const submissionData = new URLSearchParams();

      // Add form type
      submissionData.append('formType', activeTab);

      // Add all form fields based on active tab
      if (activeTab === 'general') {
        submissionData.append('name', formData.name);
        submissionData.append('email', formData.email);
        submissionData.append('phone', formData.phone);
        submissionData.append('company', formData.company);
        submissionData.append('subject', formData.subject);
        submissionData.append('message', formData.message);
      } else if (activeTab === 'consultation') {
        submissionData.append('name', formData.name);
        submissionData.append('email', formData.email);
        submissionData.append('phone', formData.phone);
        submissionData.append('company', formData.company);
        submissionData.append('consultationType', formData.consultationType);
        submissionData.append('preferredDate', formData.preferredDate);
        submissionData.append('preferredTime', formData.preferredTime);
        submissionData.append('budget', formData.budget);
        submissionData.append('timeline', formData.timeline);
        submissionData.append('projectDescription', formData.projectDescription);
      } else if (activeTab === 'support') {
        submissionData.append('name', formData.name);
        submissionData.append('email', formData.email);
        submissionData.append('supportType', formData.supportType);
        submissionData.append('priority', formData.priority);
        submissionData.append('ticketSubject', formData.ticketSubject);
        submissionData.append('ticketMessage', formData.ticketMessage);
      } else if (activeTab === 'partnership') {
        submissionData.append('name', formData.name);
        submissionData.append('email', formData.email);
        submissionData.append('phone', formData.phone);
        submissionData.append('partnershipType', formData.partnershipType);
        submissionData.append('organizationName', formData.organizationName);
        submissionData.append('organizationSize', formData.organizationSize);
        submissionData.append('proposalDetails', formData.proposalDetails);
      }

      // Add common fields
      submissionData.append('agreeToTerms', formData.agreeToTerms ? 'Yes' : 'No');
      submissionData.append('subscribeNewsletter', formData.subscribeNewsletter ? 'Yes' : 'No');
      submissionData.append('submissionDate', new Date().toISOString());

      // Submit to form endpoint
      const response = await fetch('https://readdy.ai/api/form/contact-inhub-2024', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: submissionData
      });

      if (response.ok) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          subject: '',
          message: '',
          consultationType: '',
          preferredDate: '',
          preferredTime: '',
          budget: '',
          timeline: '',
          projectDescription: '',
          supportType: '',
          priority: '',
          ticketSubject: '',
          ticketMessage: '',
          partnershipType: '',
          organizationName: '',
          organizationSize: '',
          proposalDetails: '',
          agreeToTerms: false,
          subscribeNewsletter: false
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      alert('Message submission failed. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3D3A] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading contact page...</p>
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
              <h1 className="text-4xl font-bold text-[#1F3D3A] mb-6">Message Sent Successfully!</h1>
              <p className="text-xl text-gray-600 mb-8">
                Thank you for contacting InHub! We've received your message and will get back to you within 24 hours.
              </p>
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h3 className="font-semibold text-[#1F3D3A] mb-4">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    <span className="text-gray-700">We'll review your inquiry and assign it to the right specialist</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    <span className="text-gray-700">You'll receive a response within 24 hours (business days)</span>
                  </div>
                  <div className="flex items-center">
                    <i className="ri-check-line text-green-500 mr-3"></i>
                    <span className="text-gray-700">For urgent matters, call us at +251947017777</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => { setSubmitSuccess(false); setActiveTab('general'); }}
                  className="bg-[#1F3D3A] text-white px-8 py-3 rounded-full hover:bg-[#2a5248] transition-colors whitespace-nowrap cursor-pointer"
                >
                  Send Another Message
                </button>
                <Link href="/services" className="border border-[#1F3D3A] text-[#1F3D3A] px-8 py-3 rounded-full hover:bg-[#1F3D3A] hover:text-white transition-colors whitespace-nowrap cursor-pointer text-center">
                  Explore Our Services
                </Link>
                <Link href="/" className="border border-gray-300 text-gray-600 px-8 py-3 rounded-full hover:bg-gray-50 transition-colors whitespace-nowrap cursor-pointer text-center">
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
      <section
        className="relative py-20 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(31, 61, 58, 0.9), rgba(31, 61, 58, 0.9)), url('https://readdy.ai/api/search-image?query=Ethiopian%20business%20professionals%20in%20modern%20office%20providing%20customer%20support%20and%20consultation%20services%2C%20contemporary%20workplace%20with%20communication%20technology%20and%20professional%20team%20members%20assisting%20clients%2C%20welcoming%20business%20environment%20with%20natural%20lighting&width=1920&height=600&seq=contacthero&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Ready to transform your business? Our team of experts is here to help you succeed. Let's start the conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-sm"> +251947017777 •  hello@inhub.et •  Live Chat Available</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Contact Methods */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F3D3A] mb-4">Choose Your Preferred Contact Method</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Multiple ways to reach us - pick what works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group">
                <div className={`w-16 h-16 flex items-center justify-center rounded-2xl mb-4 mx-auto ${method.color === 'blue' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : method.color === 'green' ? 'bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white' : method.color === 'purple' ? 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white' : 'bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white'} transition-all duration-300`}>
                  <i className={`${method.icon} text-2xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-[#1F3D3A] mb-2 text-center">{method.title}</h3>
                <p className="text-gray-600 text-center mb-3">{method.description}</p>
                <div className="text-center mb-3">
                  <p className="font-semibold text-gray-800">{method.contact}</p>
                  <p className="text-sm text-gray-500">{method.availability}</p>
                </div>
                <div className="text-center">
                  <button className={`px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer ${method.color === 'blue' ? 'bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white' : method.color === 'green' ? 'bg-green-50 text-green-700 hover:bg-green-600 hover:text-white' : method.color === 'purple' ? 'bg-purple-50 text-purple-700 hover:bg-purple-600 hover:text-white' : 'bg-orange-50 text-orange-700 hover:bg-orange-600 hover:text-white'}`}>
                    {method.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Be Our Member Section */}
      <section className="py-20 bg-gradient-to-br from-[#1F3D3A] to-green-600">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="w-20 h-20 flex items-center justify-center bg-white/20 rounded-2xl mx-auto mb-6">
              <i className="ri-team-line text-3xl"></i>
            </div>
            <h2 className="text-4xl font-bold mb-6">Be Our Member</h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join the InHub community and unlock exclusive benefits, networking opportunities, and access to Ethiopia's premier business ecosystem.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg mx-auto mb-4">
                  <i className="ri-vip-crown-line text-xl"></i>
                </div>
                <h3 className="text-lg font-bold mb-3">Exclusive Access</h3>
                <p className="text-gray-200 text-sm">Priority access to events, workshops, and business opportunities</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg mx-auto mb-4">
                  <i className="ri-group-line text-xl"></i>
                </div>
                <h3 className="text-lg font-bold mb-3">Professional Network</h3>
                <p className="text-gray-200 text-sm">Connect with like-minded professionals and industry leaders</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl">
                <div className="w-12 h-12 flex items-center justify-center bg-white/20 rounded-lg mx-auto mb-4">
                  <i className="ri-trophy-line text-xl"></i>
                </div>
                <h3 className="text-lg font-bold mb-3">Member Benefits</h3>
                <p className="text-gray-200 text-sm">Special discounts, free consultations, and premium resources</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl mb-8">
              <h3 className="text-2xl font-bold mb-6">Membership Tiers</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/5 p-6 rounded-xl border border-white/20">
                  <div className="text-center mb-4">
                    <i className="ri-medal-line text-3xl mb-2"></i>
                    <h4 className="text-xl font-bold">Basic Member</h4>
                    <p className="text-gray-300 text-sm">Perfect for startups</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><i className="ri-check-line mr-2"></i>Monthly newsletters</li>
                    <li className="flex items-center"><i className="ri-check-line mr-2"></i>Community access</li>
                    <li className="flex items-center"><i className="ri-check-line mr-2"></i>Event invitations</li>
                    <li className="flex items-center"><i className="ri-check-line mr-2"></i>10% service discount</li>
                  </ul>
                  <div className="text-center mt-4">
                    <div className="text-lg font-bold">Free</div>
                  </div>
                </div>

                <div className="bg-white/10 p-6 rounded-xl border-2 border-green-400 relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-400 text-[#1F3D3A] px-3 py-1 rounded-full text-xs font-bold">POPULAR</span>
                  </div>
                  <div className="text-center mb-4">
                    <i className="ri-vip-crown-line text-3xl mb-2 text-green-400"></i>
                    <h4 className="text-xl font-bold">Premium Member</h4>
                    <p className="text-gray-300 text-sm">For growing businesses</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><i className="ri-check-line mr-2 text-green-400"></i>All Basic features</li>
                    <li className="flex items-center"><i className="ri-check-line mr-2 text-green-400"></i>Priority support</li>
                    <li className="flex items-center"><i className="ri-check-line mr-2 text-green-400"></i>Exclusive workshops</li>
                    <li className="flex items-center"><i className="ri-check-line mr-2 text-green-400"></i>20% service discount</li>
                    <li className="flex items-center"><i className="ri-check-line mr-2 text-green-400"></i>Free monthly consultation</li>
                  </ul>
                  <div className="text-center mt-4">
                    <div className="text-lg font-bold">$99/month</div>
                  </div>
                </div>

                <div className="bg-white/5 p-6 rounded-xl border border-white/20">
                  <div className="text-center mb-4">
                    <i className="ri-vip-diamond-line text-3xl mb-2"></i>
                    <h4 className="text-xl font-bold">Enterprise Member</h4>
                    <p className="text-gray-300 text-sm">For established enterprises</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center"><i className="ri-check-line mr-2"></i>All Premium features</li>
                    <li className="flex items-center"><i className="ri-check-line mr-2"></i>Dedicated account manager</li>
                    <li className="flex items-center"><i className="ri-check-line mr-2"></i>Custom workshops</li>
                    <li className="flex items-center"><i className="ri-check-line mr-2"></i>30% service discount</li>
                    <li className="flex items-center"><i className="ri-check-line mr-2"></i>Quarterly business reviews</li>
                  </ul>
                  <div className="text-center mt-4">
                    <div className="text-lg font-bold">$299/month</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/business-registration" className="bg-white text-[#1F3D3A] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-user-add-line mr-2"></i>
                Join as Member
              </Link>
              <Link href="/auth/signup" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#1F3D3A] transition-colors whitespace-nowrap cursor-pointer">
                <i className="ri-information-line mr-2"></i>
                Learn More
              </Link>
              <button
                onClick={() => setActiveTab('partnership')}
                className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-handshake-line mr-2"></i>
                Partnership Inquiry
              </button>
            </div>

            <div className="mt-8 pt-8 border-t border-white/20">
              <p className="text-gray-300 text-sm">
                <i className="ri-shield-check-line mr-2"></i>
                Secure membership • Cancel anytime • 30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Forms Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#1F3D3A] mb-4">Send Us a Message</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Choose the form that best matches your needs for a more targeted response
              </p>
            </div>

            {/* Form Tabs */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-2xl">
                {[
                  { id: 'general', name: 'General Inquiry', icon: 'ri-chat-3-line' },
                  { id: 'consultation', name: 'Book Consultation', icon: 'ri-calendar-line' },
                  { id: 'support', name: 'Support', icon: 'ri-customer-service-line' },
                  { id: 'partnership', name: 'Partnership', icon: 'ri-handshake-line' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer ${activeTab === tab.id ? 'bg-[#1F3D3A] text-white shadow-lg' : 'text-gray-600 hover:text-[#1F3D3A] hover:bg-gray-50'}`}
                  >
                    <i className={`${tab.icon} mr-2`}></i>
                    {tab.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={handleSubmit} id="contact-form">
                {/* General Inquiry Form */}
                {activeTab === 'general' && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-[#1F3D3A] mb-2">General Inquiry</h3>
                      <p className="text-gray-600">Have a question or want to learn more? We'd love to hear from you.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
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
                          placeholder="your.email@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="+251947017777"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={(e) => updateFormData('company', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={(e) => updateFormData('subject', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="What can we help you with?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                      <textarea
                        name="message"
                        required
                        rows="6"
                        value={formData.message}
                        onChange={(e) => updateFormData('message', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="Tell us more about your inquiry..."
                        maxLength="1000"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {formData.message.length}/1000 characters
                      </div>
                    </div>
                  </div>
                )}

                {/* Consultation Booking Form */}
                {activeTab === 'consultation' && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-[#1F3D3A] mb-2">Book a Free Consultation</h3>
                      <p className="text-gray-600">Schedule a personalized consultation with our experts.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
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
                          placeholder="+251947017777"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Company *</label>
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
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Consultation Type *</label>
                      <select
                        name="consultationType"
                        required
                        value={formData.consultationType}
                        onChange={(e) => updateFormData('consultationType', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                      >
                        <option value="">Select consultation type</option>
                        {consultationTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                        <input
                          type="date"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={(e) => updateFormData('preferredDate', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Time</label>
                        <select
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={(e) => updateFormData('preferredTime', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select preferred time</option>
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                          <option value="2:00 PM">2:00 PM</option>
                          <option value="3:00 PM">3:00 PM</option>
                          <option value="4:00 PM">4:00 PM</option>
                          <option value="5:00 PM">5:00 PM</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={(e) => updateFormData('budget', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select budget range</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>{range}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Timeline</label>
                        <select
                          name="timeline"
                          value={formData.timeline}
                          onChange={(e) => updateFormData('timeline', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select timeline</option>
                          <option value="ASAP">ASAP</option>
                          <option value="Within 1 month">Within 1 month</option>
                          <option value="1-3 months">1-3 months</option>
                          <option value="3-6 months">3-6 months</option>
                          <option value="6+ months">6+ months</option>
                          <option value="Just exploring">Just exploring</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Project Description *</label>
                      <textarea
                        name="projectDescription"
                        required
                        rows="5"
                        value={formData.projectDescription}
                        onChange={(e) => updateFormData('projectDescription', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="Please describe your project, goals, and challenges..."
                        maxLength="1000"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {formData.projectDescription.length}/1000 characters
                      </div>
                    </div>
                  </div>
                )}

                {/* Support Form */}
                {activeTab === 'support' && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-[#1F3D3A] mb-2">Get Support</h3>
                      <p className="text-gray-600">Need help with our services? Our support team is here to assist you.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
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
                          placeholder="your.email@company.com"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Support Type *</label>
                        <select
                          name="supportType"
                          required
                          value={formData.supportType}
                          onChange={(e) => updateFormData('supportType', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select support type</option>
                          {supportTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level *</label>
                        <select
                          name="priority"
                          required
                          value={formData.priority}
                          onChange={(e) => updateFormData('priority', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select priority</option>
                          <option value="Low">Low - General question</option>
                          <option value="Medium">Medium - Need assistance</option>
                          <option value="High">High - Urgent issue</option>
                          <option value="Critical">Critical - Service down</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                      <input
                        type="text"
                        name="ticketSubject"
                        required
                        value={formData.ticketSubject}
                        onChange={(e) => updateFormData('ticketSubject', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="Brief description of your issue"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description *</label>
                      <textarea
                        name="ticketMessage"
                        required
                        rows="6"
                        value={formData.ticketMessage}
                        onChange={(e) => updateFormData('ticketMessage', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="Please provide detailed information about your issue, including any error messages or steps to reproduce..."
                        maxLength="1000"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {formData.ticketMessage.length}/1000 characters
                      </div>
                    </div>
                  </div>
                )}

                {/* Partnership Form */}
                {activeTab === 'partnership' && (
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-[#1F3D3A] mb-2">Partnership Inquiry</h3>
                      <p className="text-gray-600">Interested in partnering with InHub? Let's explore opportunities together.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={(e) => updateFormData('name', e.target.value)}
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
                          placeholder="your.email@company.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={(e) => updateFormData('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="+251947017777"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Organization Name *</label>
                        <input
                          type="text"
                          name="organizationName"
                          required
                          value={formData.organizationName}
                          onChange={(e) => updateFormData('organizationName', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                          placeholder="Your organization name"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Partnership Type *</label>
                        <select
                          name="partnershipType"
                          required
                          value={formData.partnershipType}
                          onChange={(e) => updateFormData('partnershipType', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select partnership type</option>
                          {partnershipTypes.map((type) => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Organization Size</label>
                        <select
                          name="organizationSize"
                          value={formData.organizationSize}
                          onChange={(e) => updateFormData('organizationSize', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A] pr-8"
                        >
                          <option value="">Select organization size</option>
                          <option value="1-10 employees">1-10 employees</option>
                          <option value="11-50 employees">11-50 employees</option>
                          <option value="51-200 employees">51-200 employees</option>
                          <option value="201-1000 employees">201-1000 employees</option>
                          <option value="1000+ employees">1000+ employees</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Partnership Proposal *</label>
                      <textarea
                        name="proposalDetails"
                        required
                        rows="6"
                        value={formData.proposalDetails}
                        onChange={(e) => updateFormData('proposalDetails', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1F3D3A]"
                        placeholder="Please describe your partnership proposal, what value you can bring, and how we can work together..."
                        maxLength="1000"
                      />
                      <div className="text-sm text-gray-500 mt-1">
                        {formData.proposalDetails.length}/1000 characters
                      </div>
                    </div>
                  </div>
                )}

                {/* Common Form Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      name="agreeToTerms"
                      required
                      checked={formData.agreeToTerms}
                      onChange={(e) => updateFormData('agreeToTerms', e.target.checked)}
                      className="w-4 h-4 text-[#1F3D3A] border-gray-300 rounded focus:ring-[#1F3D3A] mt-1"
                    />
                    <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-700">
                      I agree to the <Link href="/terms" className="text-[#1F3D3A] hover:underline">Terms of Service</Link> and{` `}
                      <Link href="/privacy" className="text-[#1F3D3A] hover:underline">Privacy Policy</Link>
                    </label>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="subscribeNewsletter"
                      name="subscribeNewsletter"
                      checked={formData.subscribeNewsletter}
                      onChange={(e) => updateFormData('subscribeNewsletter', e.target.checked)}
                      className="w-4 h-4 text-[#1F3D3A] border-gray-300 rounded focus:ring-[#1F3D3A] mt-1"
                    />
                    <label htmlFor="subscribeNewsletter" className="ml-3 text-sm text-gray-700">
                      Subscribe to our newsletter for business insights and updates
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.agreeToTerms}
                    className={`w-full py-4 rounded-lg font-semibold text-lg transition-colors cursor-pointer flex items-center justify-center ${!isSubmitting && formData.agreeToTerms ? 'bg-[#1F3D3A] text-white hover:bg-[#2a5248]' : 'bg-gray-300 text-gray-500 cursor-not-allowed'} `}
                  >
                    {isSubmitting ? (
                      <>
                        <i className="ri-loader-4-line animate-spin mr-2"></i>
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-line mr-2"></i>
                        {activeTab === 'consultation' ? 'Book Consultation' :
                          activeTab === 'support' ? 'Submit Support Ticket' :
                            activeTab === 'partnership' ? 'Submit Partnership Inquiry' :
                              'Send Message'
                        }
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#1F3D3A] mb-4">Visit Our Offices</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Meet our team in person at our modern office locations in Addis Ababa
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {officeLocations.map((office, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src={office.image}
                    alt={office.name}
                    className="w-full h-48 object-cover object-top"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#1F3D3A] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {index === 0 ? 'Headquarters' : 'Innovation Hub'}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#1F3D3A] mb-4">{office.name}</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start">
                      <i className="ri-map-pin-line text-[#1F3D3A] mr-3 mt-1"></i>
                      <div>
                        <p className="font-medium text-gray-800">{office.address}</p>
                        <p className="text-gray-600">{office.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-phone-line text-[#1F3D3A] mr-3"></i>
                      <p className="text-gray-700">{office.phone}</p>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-mail-line text-[#1F3D3A] mr-3"></i>
                      <p className="text-gray-700">{office.email}</p>
                    </div>
                    <div className="flex items-center">
                      <i className="ri-time-line text-[#1F3D3A] mr-3"></i>
                      <p className="text-gray-700">{office.hours}</p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Services Available:</h4>
                    <div className="flex flex-wrap gap-2">
                      {office.services.map((service, serviceIndex) => (
                        <span key={serviceIndex} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <iframe
                      src={office.mapEmbed}
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="rounded-lg"
                    ></iframe>
                  </div>

                  <div className="flex gap-3">
                    <button className="flex-1 bg-[#1F3D3A] text-white py-3 px-4 rounded-lg hover:bg-[#2a5248] transition-colors cursor-pointer">
                      <i className="ri-direction-line mr-2"></i>
                      Get Directions
                    </button>
                    <button className="flex-1 border border-[#1F3D3A] text-[#1F3D3A] py-3 px-4 rounded-lg hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer">
                      <i className="ri-calendar-line mr-2"></i>
                      Schedule Visit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#1F3D3A] mb-4">Frequently Asked Questions</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Find answers to common questions about our services and approach
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-gray-800 pr-4">{faq.question}</h3>
                    <i className={`ri-${expandedFaq === index ? 'subtract' : 'add'}-line text-xl text-[#1F3D3A] flex-shrink-0`}></i>
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setActiveTab('general')}
                  className="bg-[#1F3D3A] text-white px-8 py-3 rounded-full hover:bg-[#2a5248] transition-colors cursor-pointer"
                >
                  <i className="ri-chat-3-line mr-2"></i>
                  Ask a Question
                </button>
                <Link href="/consultation" className="border border-[#1F3D3A] text-[#1F3D3A] px-8 py-3 rounded-full hover:bg-[#1F3D3A] hover:text-white transition-colors cursor-pointer text-center">
                  <i className="ri-calendar-line mr-2"></i>
                  Book Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Hours & Response Times */}
      <section className="py-16 bg-[#1F3D3A]">
        <div className="container mx-auto px-6">
          <div className="text-center text-white mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Commitment to You</h2>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              We're dedicated to providing timely, professional responses to all inquiries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-2xl mx-auto mb-4">
                <i className="ri-customer-service-line text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">24-Hour Response</h3>
              <p className="text-gray-200 text-sm">We respond to all inquiries within 24 hours during business days</p>
            </div>
            <div className="text-center text-white">
              <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-2xl mx-auto mb-4">
                <i className="ri-time-line text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Business Hours</h3>
              <p className="text-gray-200 text-sm">Monday - Friday: 9:00 AM - 6:00 PM EAT<br />Saturday: 9:00 AM - 2:00 PM EAT</p>
            </div>
            <div className="text-center text-white">
              <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-2xl mx-auto mb-4">
                <i className="ri-global-line text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Multiple Languages</h3>
              <p className="text-gray-200 text-sm">We communicate in English, Amharic, and other Ethiopian languages</p>
            </div>
            <div className="text-center text-white">
              <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-2xl mx-auto mb-4">
                <i className="ri-shield-check-line text-2xl"></i>
              </div>
              <h3 className="text-lg font-bold mb-2">Confidential</h3>
              <p className="text-gray-200 text-sm">All communications are kept strictly confidential and secure</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
