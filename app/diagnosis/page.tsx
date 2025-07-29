
'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DiagnosisPage() {
  type DiagnosticKey = 'gtm' | 'innovation' | 'startup';
const [activeTab, setActiveTab] = useState<DiagnosticKey>('gtm');

  const [currentStep, setCurrentStep] = useState(1);
 const [responses, setResponses] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const diagnostics = {
    gtm: {
      title: 'Go-To-Market Diagnostic',
      description: 'Assess your market entry readiness and strategy effectiveness',
      color: 'blue',
      questions: [
        {
          id: 'target_market',
          question: 'How well-defined is your target market?',
          type: 'multiple',
          options: [
            { text: 'Very specific with detailed personas', score: 4 },
            { text: 'Somewhat defined with basic segments', score: 3 },
            { text: 'Broadly defined market categories', score: 2 },
            { text: 'Not clearly defined yet', score: 1 }
          ]
        },
        {
          id: 'competitive_analysis',
          question: 'Have you conducted comprehensive competitive analysis?',
          type: 'multiple',
          options: [
            { text: 'Yes, detailed analysis with positioning map', score: 4 },
            { text: 'Basic competitor identification done', score: 3 },
            { text: 'Aware of some competitors', score: 2 },
            { text: 'Limited competitive knowledge', score: 1 }
          ]
        },
        {
          id: 'value_proposition',
          question: 'How clear is your value proposition?',
          type: 'multiple',
          options: [
            { text: 'Crystal clear and validated with customers', score: 4 },
            { text: 'Well-defined but needs validation', score: 3 },
            { text: 'Somewhat clear but could be stronger', score: 2 },
            { text: 'Still working on defining it', score: 1 }
          ]
        },
        {
          id: 'pricing_strategy',
          question: 'How developed is your pricing strategy?',
          type: 'multiple',
          options: [
            { text: 'Comprehensive pricing model with testing', score: 4 },
            { text: 'Basic pricing strategy in place', score: 3 },
            { text: 'Some pricing ideas but not finalized', score: 2 },
            { text: 'No clear pricing strategy yet', score: 1 }
          ]
        },
        {
          id: 'market_validation',
          question: 'Have you validated your product/service with real customers?',
          type: 'multiple',
          options: [
            { text: 'Extensive validation with paying customers', score: 4 },
            { text: 'Some customer feedback and testing', score: 3 },
            { text: 'Limited validation efforts', score: 2 },
            { text: 'No market validation yet', score: 1 }
          ]
        }
      ]
    },
    innovation: {
      title: 'Innovation Readiness Assessment',
      description: 'Evaluate your organization\'s innovation capabilities and culture',
      color: 'purple',
      questions: [
        {
          id: 'innovation_culture',
          question: 'How would you rate your organization\'s innovation culture?',
          type: 'multiple',
          options: [
            { text: 'Highly innovative with dedicated resources', score: 4 },
            { text: 'Encourages innovation with some support', score: 3 },
            { text: 'Open to innovation but limited resources', score: 2 },
            { text: 'Traditional approach with minimal innovation', score: 1 }
          ]
        },
        {
          id: 'technology_adoption',
          question: 'How quickly does your organization adopt new technologies?',
          type: 'multiple',
          options: [
            { text: 'Early adopter with dedicated tech team', score: 4 },
            { text: 'Adopts proven technologies quickly', score: 3 },
            { text: 'Follows industry standards with some delay', score: 2 },
            { text: 'Conservative approach to new technology', score: 1 }
          ]
        },
        {
          id: 'rnd_investment',
          question: 'What percentage of revenue is invested in R&D?',
          type: 'multiple',
          options: [
            { text: 'More than 10% of revenue', score: 4 },
            { text: '5-10% of revenue', score: 3 },
            { text: '1-5% of revenue', score: 2 },
            { text: 'Less than 1% of revenue', score: 1 }
          ]
        },
        {
          id: 'innovation_process',
          question: 'Do you have structured innovation processes?',
          type: 'multiple',
          options: [
            { text: 'Formal innovation methodology in place', score: 4 },
            { text: 'Some structured approaches used', score: 3 },
            { text: 'Ad-hoc innovation activities', score: 2 },
            { text: 'No structured innovation process', score: 1 }
          ]
        },
        {
          id: 'failure_tolerance',
          question: 'How does your organization handle failure and experimentation?',
          type: 'multiple',
          options: [
            { text: 'Celebrates learning from failure', score: 4 },
            { text: 'Tolerates failure in innovation projects', score: 3 },
            { text: 'Somewhat risk-averse but open to experimentation', score: 2 },
            { text: 'Risk-averse culture that avoids failure', score: 1 }
          ]
        }
      ]
    },
    startup: {
      title: 'Startup Diagnostic',
      description: 'Evaluate your startup\'s readiness and growth potential',
      color: 'green',
      questions: [
        {
          id: 'startup_stage',
          question: 'What stage is your startup currently in?',
          type: 'multiple',
          options: [
            { text: 'Idea stage with business plan', score: 1 },
            { text: 'MVP developed with early testing', score: 2 },
            { text: 'Early traction with initial customers', score: 3 },
            { text: 'Proven product-market fit', score: 4 }
          ]
        },
        {
          id: 'funding_status',
          question: 'What is your current funding situation?',
          type: 'multiple',
          options: [
            { text: 'Self-funded/bootstrapped', score: 1 },
            { text: 'Friends & family funding', score: 2 },
            { text: 'Angel investment secured', score: 3 },
            { text: 'VC funded with multiple rounds', score: 4 }
          ]
        },
        {
          id: 'team_composition',
          question: 'How complete is your founding team?',
          type: 'multiple',
          options: [
            { text: 'Solo founder with advisors', score: 1 },
            { text: 'Co-founders with complementary skills', score: 2 },
            { text: 'Full team with key hires', score: 3 },
            { text: 'Experienced team with proven track record', score: 4 }
          ]
        },
        {
          id: 'market_traction',
          question: 'What level of market traction have you achieved?',
          type: 'multiple',
          options: [
            { text: 'Concept validation with surveys', score: 1 },
            { text: 'Beta users with feedback', score: 2 },
            { text: 'Paying customers with revenue', score: 3 },
            { text: 'Scalable revenue with growth metrics', score: 4 }
          ]
        },
        {
          id: 'competitive_advantage',
          question: 'How strong is your competitive advantage?',
          type: 'multiple',
          options: [
            { text: 'Similar to existing solutions', score: 1 },
            { text: 'Some unique features or approach', score: 2 },
            { text: 'Clear differentiation with IP protection', score: 3 },
            { text: 'Significant moat with network effects', score: 4 }
          ]
        }
      ]
    }
  };

  const handleResponse = (questionId: string, answer: any) => {

    if (!mounted) return;
    setResponses(prev => ({ ...prev, [questionId]: answer }));
  };

  const nextStep = () => {
    if (!mounted) return;
    if (currentStep < (((diagnostics as any)[activeTab]?.questions?.length) ?? 0)) {

      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (!mounted) return;
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateReport = () => {
    if (!mounted) return;
    setShowResults(true);
  };

  const resetAssessment = () => {
    if (!mounted) return;
    setCurrentStep(1);
    setResponses({});
    setShowResults(false);
  };

  const calculateScore = () => {
    const questions = diagnostics[activeTab as keyof typeof diagnostics].questions;

    let totalScore = 0;
    let answeredQuestions = 0;

    questions.forEach(question => {
     const response = responses[question.id as keyof typeof responses];

      if (response) {
        const option = question.options.find(opt => opt.text === response);
        if (option) {
          totalScore += option.score;
          answeredQuestions++;
        }
      }
    });

    return answeredQuestions > 0 ? Math.round((totalScore / (answeredQuestions * 4)) * 100) : 0;
  };

 interface ScoreLevel {
  level: string;
  color: string;
  message: string;
}

const getScoreLevel = (score: number): ScoreLevel => {
  if (score >= 80) {
    return { level: 'Excellent', color: 'green', message: "You're well-positioned for success!" };
  }
  if (score >= 60) {
    return { level: 'Good', color: 'blue', message: 'Strong foundation with room for optimization.' };
  }
  if (score >= 40) {
    return { level: 'Fair', color: 'yellow', message: 'Some areas need attention and improvement.' };
  }
  return { level: 'Needs Improvement', color: 'red', message: 'Significant opportunities for enhancement.' };
};


  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3D3A] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading diagnostic tools...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentQuestion = (diagnostics as Record<string, typeof diagnostics.gtm>)[activeTab].questions[currentStep - 1];

  const score = calculateScore();
  const scoreData = getScoreLevel(score);

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        className="relative py-20 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(31, 61, 58, 0.9), rgba(31, 61, 58, 0.9)), url('https://readdy.ai/api/search-image?query=Ethiopian%20business%20professionals%20analyzing%20charts%20and%20data%20on%20laptops%20and%20tablets%2C%20modern%20office%20setting%20with%20strategic%20planning%20documents%20and%20digital%20analytics%20dashboards%2C%20contemporary%20workspace%20showcasing%20business%20intelligence%20and%20assessment%20tools%2C%20professional%20atmosphere%20with%20natural%20lighting&width=1920&height=600&seq=diaghero&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">Business Diagnostic Tools</h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Get personalized insights and actionable recommendations with our comprehensive AI-powered diagnostic assessments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
              <span className="text-sm"> Free Assessment • Instant Results • Expert Recommendations</span>
            </div>
          </div>
          <div className="mt-8">
            <Link href="/business-registration" className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer">
              Register here
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-[#1F3D3A] mb-2">12,000+</div>
              <div className="text-gray-600 text-sm">Assessments Completed</div>
            </div>
            <div className="text-center bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-[#1F3D3A] mb-2">95%</div>
              <div className="text-gray-600 text-sm">Accuracy Rate</div>
            </div>
            <div className="text-center bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-[#1F3D3A] mb-2">3 Min</div>
              <div className="text-gray-600 text-sm">Average Time</div>
            </div>
            <div className="text-center bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl font-bold text-[#1F3D3A] mb-2">24/7</div>
              <div className="text-gray-600 text-sm">Available Anytime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic Tools */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-gray-100 p-1 rounded-2xl overflow-x-auto">
                <div className="flex space-x-1 min-w-max">
                  {Object.entries(diagnostics).map(([key, diagnostic]) => (
                    <button
                      key={key}
                      onClick={() => { setActiveTab(key as 'gtm' | 'innovation' | 'startup'); setCurrentStep(1); setResponses({}); setShowResults(false); }}

                      className={`px-3 sm:px-6 py-2 sm:py-3 rounded-xl transition-all duration-300 whitespace-nowrap cursor-pointer font-medium text-xs sm:text-sm ${activeTab === key ? 'bg-[#1F3D3A] text-white shadow-lg' : 'text-gray-600 hover:text-[#1F3D3A] hover:bg-gray-50'}`}
                    >
                      <span className="block sm:hidden">
                        {key === 'gtm' ? 'Go-To-Market' : key === 'innovation' ? 'Innovation' : 'Startup'}
                      </span>
                      <span className="hidden sm:block">
                        {key === 'gtm' ? 'Go-To-Market Diagnostic' : key === 'innovation' ? 'Innovation Readiness' : 'Startup Diagnostic'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {!showResults ? (
              /* Assessment Interface */
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 lg:p-12">
                <div className="text-center mb-6 sm:mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1F3D3A] mb-2 sm:mb-3">
  {(diagnostics as Record<string, { title: string }>)[activeTab].title}
</h2>

                 <p className="text-gray-600 text-base sm:text-lg">
  {(diagnostics as Record<string, { description: string }>)[activeTab].description}
</p>

                </div>

                {/* Progress Bar */}
                <div className="mb-8 sm:mb-10">
                  <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-500 mb-3 gap-1 sm:gap-0">
                   <span className="font-medium">
  Question {currentStep} of {(diagnostics as Record<string, { questions: any[] }>)[activeTab].questions.length}
</span>

                    <span className="font-medium">{Math.round((currentStep / diagnostics[activeTab].questions.length) * 100)}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3">
                    <div
                      className="bg-gradient-to-r from-[#1F3D3A] to-green-500 h-2 sm:h-3 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${(currentStep / diagnostics[activeTab].questions.length) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Question */}
                <div className="mb-8 sm:mb-10">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#1F3D3A] mb-6 sm:mb-8 text-center leading-tight">
                    {currentQuestion.question}
                  </h3>

                  <div className="space-y-3 sm:space-y-4 max-w-2xl mx-auto">
                    {currentQuestion.options.map((option, index) => (
                      <label key={index} className={`flex items-start sm:items-center p-4 sm:p-5 border-2 rounded-xl hover:border-[#1F3D3A] cursor-pointer transition-all duration-200 ${responses[currentQuestion.id] === option.text ? 'border-[#1F3D3A] bg-[#1F3D3A]/5' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <input
                          type="radio"
                          name={currentQuestion.id}
                          value={option.text}
                          onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
                          checked={responses[currentQuestion.id] === option.text}
                          className="mr-3 sm:mr-4 w-4 h-4 sm:w-5 sm:h-5 text-[#1F3D3A] focus:ring-[#1F3D3A] flex-shrink-0 mt-1 sm:mt-0"
                        />
                        <span className="text-gray-700 text-base sm:text-lg leading-relaxed">{option.text}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-3 rounded-full border-2 transition-colors whitespace-nowrap cursor-pointer order-2 sm:order-1 ${currentStep === 1 ? 'border-gray-200 text-gray-400 cursor-not-allowed' : 'border-[#1F3D3A] text-[#1F3D3A] hover:bg-[#1F3D3A] hover:text-white'}`}
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Previous
                  </button>

                  {currentStep === diagnostics[activeTab].questions.length ? (
                    <button
                      onClick={generateReport}
                      disabled={!responses[currentQuestion.id]}
                      className={`w-full sm:w-auto flex items-center justify-center px-6 sm:px-8 py-3 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer order-1 sm:order-2 ${responses[currentQuestion.id] ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    >
                      <i className="ri-file-chart-line mr-2"></i>
                      Generate Report
                    </button>
                  ) : (
                    <button
                      onClick={nextStep}
                      disabled={!responses[currentQuestion.id]}
                      className={`w-full sm:w-auto flex items-center justify-center px-4 sm:px-6 py-3 rounded-full transition-colors whitespace-nowrap cursor-pointer order-1 sm:order-2 ${responses[currentQuestion.id] ? 'bg-[#1F3D3A] text-white hover:bg-[#2a5248]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                    >
                      Next Question
                      <i className="ri-arrow-right-line ml-2"></i>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Results Interface */
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-8 lg:p-12">
                <div className="text-center mb-8 sm:mb-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full mb-4 sm:mb-6 ${scoreData.color === 'green' ? 'bg-green-100' : scoreData.color === 'blue' ? 'bg-blue-100' : scoreData.color === 'yellow' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                    <span className={`text-2xl sm:text-3xl font-bold ${scoreData.color === 'green' ? 'text-green-600' : scoreData.color === 'blue' ? 'text-blue-600' : scoreData.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'}`}>
                      {score}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1F3D3A] mb-2 sm:mb-3">Your Assessment Results</h2>
                  <p className={`text-lg sm:text-xl font-semibold mb-2 ${scoreData.color === 'green' ? 'text-green-600' : scoreData.color === 'blue' ? 'text-blue-600' : scoreData.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'}`}>
                    {scoreData.level}
                  </p>
                  <p className="text-gray-600 text-sm sm:text-base">{scoreData.message}</p>
                </div>

                {/* Score Breakdown */}
                <div className="mb-8 sm:mb-10">
                  <h3 className="text-lg sm:text-xl font-bold text-[#1F3D3A] mb-4 sm:mb-6 text-center">Detailed Analysis</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {diagnostics[activeTab].questions.map((question, index) => {
                      const response = responses[question.id];
                      const option = response ? question.options.find(opt => opt.text === response) : null;
                      const questionScore = option ? (option.score / 4) * 100 : 0;

                      return (
                        <div key={question.id} className="bg-gray-50 p-3 sm:p-4 rounded-xl">
                          <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2 sm:gap-0">
                            <h4 className="font-medium text-gray-800 text-sm sm:text-base">{question.question}</h4>
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex-shrink-0 ${questionScore >= 75 ? 'bg-green-100 text-green-800' : questionScore >= 50 ? 'bg-blue-100 text-blue-800' : questionScore >= 25 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                              {questionScore.toFixed(0)}%
                            </span>
                          </div>
                          <p className="text-gray-600 text-xs sm:text-sm">{response || 'Not answered'}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="mb-8 sm:mb-10 bg-gradient-to-r from-[#1F3D3A]/10 to-green-500/10 p-4 sm:p-6 rounded-xl">
                  <h3 className="text-lg sm:text-xl font-bold text-[#1F3D3A] mb-3 sm:mb-4">Recommended Next Steps</h3>
                  <ul className="space-y-2 sm:space-y-3">
                    {score >= 80 ? (
                      <>
                        <li className="flex items-start">
                          <i className="ri-check-line text-green-500 mr-2 mt-1 flex-shrink-0"></i>
                          <span className="text-gray-700 text-sm sm:text-base">Consider advanced strategy optimization sessions</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-green-500 mr-2 mt-1 flex-shrink-0"></i>
                          <span className="text-gray-700 text-sm sm:text-base">Explore scaling opportunities and market expansion</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-check-line text-green-500 mr-2 mt-1 flex-shrink-0"></i>
                          <span className="text-gray-700 text-sm sm:text-base">Share your success story and mentor others</span>
                        </li>
                      </>
                    ) : score >= 60 ? (
                      <>
                        <li className="flex items-start">
                          <i className="ri-lightbulb-line text-blue-500 mr-2 mt-1 flex-shrink-0"></i>
                          <span className="text-gray-700 text-sm sm:text-base">Focus on strengthening weak areas identified</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-lightbulb-line text-blue-500 mr-2 mt-1 flex-shrink-0"></i>
                          <span className="text-gray-700 text-sm sm:text-base">Consider targeted consulting in specific domains</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-lightbulb-line text-blue-500 mr-2 mt-1 flex-shrink-0"></i>
                          <span className="text-gray-700 text-sm sm:text-base">Implement best practices in identified gap areas</span>
                        </li>
                      </>
                    ) : (
                      <>
                        <li className="flex items-start">
                          <i className="ri-alert-line text-orange-500 mr-2 mt-1 flex-shrink-0"></i>
                          <span className="text-gray-700 text-sm sm:text-base">Schedule a comprehensive strategy consultation</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-alert-line text-orange-500 mr-2 mt-1 flex-shrink-0"></i>
                          <span className="text-gray-700 text-sm sm:text-base">Develop foundational frameworks before scaling</span>
                        </li>
                        <li className="flex items-start">
                          <i className="ri-alert-line text-orange-500 mr-2 mt-1 flex-shrink-0"></i>
                          <span className="text-gray-700 text-sm sm:text-base">Consider our intensive business transformation program</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link href="/contact" className="bg-[#1F3D3A] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#2a5248] transition-colors whitespace-nowrap cursor-pointer text-center order-1">
                    Book Expert Consultation
                  </Link>
                  <button
                    onClick={resetAssessment}
                    className="border-2 border-[#1F3D3A] text-[#1F3D3A] px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-[#1F3D3A] hover:text-white transition-colors whitespace-nowrap cursor-pointer order-3 sm:order-2"
                  >
                    Take Another Assessment
                  </button>
                  <Link href="/services" className="bg-green-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg font-semibold hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer text-center order-2 sm:order-3">
                    View Our Services
                  </Link>
                </div>
              </div>
            )}

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-16 h-16 flex items-center justify-center bg-green-100 rounded-full mx-auto mb-4">
                  <i className="ri-ai-generate text-2xl text-green-600"></i>
                </div>
                <h3 className="font-semibold text-[#1F3D3A] mb-2">AI-Powered Analysis</h3>
                <p className="text-gray-600 text-sm">Advanced algorithms provide personalized insights based on industry best practices</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4">
                  <i className="ri-file-pdf-line text-2xl text-blue-600"></i>
                </div>
                <h3 className="font-semibold text-[#1F3D3A] mb-2">Detailed PDF Report</h3>
                <p className="text-gray-600 text-sm">Comprehensive analysis with actionable recommendations and implementation roadmap</p>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                <div className="w-16 h-16 flex items-center justify-center bg-purple-100 rounded-full mx-auto mb-4">
                  <i className="ri-phone-line text-2xl text-purple-600"></i>
                </div>
                <h3 className="font-semibold text-[#1F3D3A] mb-2">Expert Consultation</h3>
                <p className="text-gray-600 text-sm">Follow-up call with our innovation specialists to discuss your results</p>
              </div>
            </div>

            {/* Advanced AI Business Diagnosis Tool Button */}
            <div className="text-center mt-12">
              <Link
                href="/ai-diagnosis"
                className="inline-flex items-center bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 cursor-pointer"
              >
                <i className="ri-ai-generate mr-3"></i>
                Advanced AI Business Diagnosis Tool
                <i className="ri-arrow-right-line ml-3"></i>
              </Link>
              <p className="text-gray-600 text-sm mt-3">
                Get comprehensive AI-powered business analysis with personalized recommendations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F3D3A] mb-4">Additional Resources</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Enhance your business knowledge with our comprehensive resource library
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mb-4">
                <i className="ri-book-open-line text-xl text-blue-600"></i>
              </div>
              <h3 className="font-semibold text-[#1F3D3A] mb-2">Strategy Playbooks</h3>
              <p className="text-gray-600 text-sm mb-4">Downloadable guides for business strategy implementation</p>
              <Link href="/warehouse" className="text-[#1F3D3A] text-sm font-medium hover:underline">
                View Playbooks →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center bg-green-100 rounded-lg mb-4">
                <i className="ri-video-line text-xl text-green-600"></i>
              </div>
              <h3 className="font-semibold text-[#1F3D3A] mb-2">Video Tutorials</h3>
              <p className="text-gray-600 text-sm mb-4">Step-by-step guidance for business development</p>
              <Link href="/warehouse" className="text-[#1F3D3A] text-sm font-medium hover:underline">
                Watch Videos →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-lg mb-4">
                <i className="ri-calendar-event-line text-xl text-purple-600"></i>
              </div>
              <h3 className="font-semibold text-[#1F3D3A] mb-2">Webinars</h3>
              <p className="text-gray-600 text-sm mb-4">Live sessions with industry experts and thought leaders</p>
              <Link href="/warehouse" className="text-[#1F3D3A] text-sm font-medium hover:underline">
                Join Webinars →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-lg mb-4">
                <i className="ri-article-line text-xl text-orange-600"></i>
              </div>
              <h3 className="font-semibold text-[#1F3D3A] mb-2">Case Studies</h3>
              <p className="text-gray-600 text-sm mb-4">Real-world examples of successful business transformations</p>
              <Link href="/case-studies" className="text-[#1F3D3A] text-sm font-medium hover:underline">
                Read Cases →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#1F3D3A]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Need Personalized Strategy Support?</h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Book a consultation for in-depth business analysis and custom strategy development tailored to your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer">
              Book Expert Consultation
            </Link>
            <Link href="/services" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#1F3D3A] transition-colors whitespace-nowrap cursor-pointer">
              View Our Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
