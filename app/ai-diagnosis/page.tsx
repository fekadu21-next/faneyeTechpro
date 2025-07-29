
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
type RecommendedService = {
  name: string;
  matchScore: number;
  priority: string;
  description: string;
  benefits: string[];
  price: string;
  duration: string;
};
type ActionPlanItem = {
  phase: string;
  actions: string[];
};

type DiagnosticData = {
  overallScore: number;
  categoryScores: Record<string, number>;
  recommendedServices: RecommendedService[];
  frameworks: string[];
  problemsIdentified: string[];
  opportunityAreas: string[];
  actionPlan: ActionPlanItem[];
};

export default function AIDiagnosisPage() {
  const [mounted, setMounted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [responses, setResponses] = useState<Record<string, string[]>>({});

  const [showResults, setShowResults] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
type RecommendedService = {
  name: string;
  matchScore: number;
  priority: string;
  description: string;
  benefits: string[];
  price: string;
  duration: string;
};

const [recommendedServices, setRecommendedServices] = useState<RecommendedService[]>([]);


  const [businessScore, setBusinessScore] = useState(0);
  const [diagnosticData, setDiagnosticData] = useState<DiagnosticData | null>(null);


  const aiQuestions = [
    {
      id: 'business_stage',
      question: 'What stage is your business currently in?',
      type: 'single',
      options: [
        { text: 'Startup/Idea stage', value: 'startup', weight: 1 },
        { text: 'Early growth stage', value: 'early_growth', weight: 2 },
        { text: 'Established business', value: 'established', weight: 3 },
        { text: 'Scaling/Expansion phase', value: 'scaling', weight: 4 },
        { text: 'Mature/Optimization phase', value: 'mature', weight: 5 }
      ],
      category: 'business_maturity'
    },
    {
      id: 'revenue_status',
      question: 'What is your current annual revenue range?',
      type: 'single',
      options: [
        { text: 'Pre-revenue', value: 'pre_revenue', weight: 1 },
        { text: 'Less than $50K', value: 'under_50k', weight: 2 },
        { text: '$50K - $250K', value: '50k_250k', weight: 3 },
        { text: '$250K - $1M', value: '250k_1m', weight: 4 },
        { text: 'Over $1M', value: 'over_1m', weight: 5 }
      ],
      category: 'financial_health'
    },
    {
      id: 'primary_challenges',
      question: 'What are your primary business challenges? (Select all that apply)',
      type: 'multiple',
      options: [
        { text: 'Customer acquisition', value: 'customer_acquisition', weight: 1 },
        { text: 'Market positioning', value: 'market_positioning', weight: 1 },
        { text: 'Product development', value: 'product_development', weight: 1 },
        { text: 'Operational efficiency', value: 'operational_efficiency', weight: 1 },
        { text: 'Team building', value: 'team_building', weight: 1 },
        { text: 'Financial management', value: 'financial_management', weight: 1 },
        { text: 'Technology adoption', value: 'technology_adoption', weight: 1 },
        { text: 'Strategic planning', value: 'strategic_planning', weight: 1 }
      ],
      category: 'pain_points'
    },
    {
      id: 'growth_goals',
      question: 'What is your primary growth goal for the next 12 months?',
      type: 'single',
      options: [
        { text: 'Launch new product/service', value: 'product_launch', weight: 1 },
        { text: 'Expand to new markets', value: 'market_expansion', weight: 2 },
        { text: 'Increase revenue by 50%+', value: 'revenue_growth', weight: 3 },
        { text: 'Optimize operations', value: 'operational_optimization', weight: 4 },
        { text: 'Scale team and processes', value: 'team_scaling', weight: 5 }
      ],
      category: 'growth_objectives'
    },
    {
      id: 'market_position',
      question: 'How would you describe your current market position?',
      type: 'single',
      options: [
        { text: 'New entrant exploring market', value: 'new_entrant', weight: 1 },
        { text: 'Gaining initial traction', value: 'initial_traction', weight: 2 },
        { text: 'Established player with steady growth', value: 'established_player', weight: 3 },
        { text: 'Market leader in niche', value: 'niche_leader', weight: 4 },
        { text: 'Dominant market position', value: 'market_dominant', weight: 5 }
      ],
      category: 'market_presence'
    },
    {
      id: 'technology_readiness',
      question: 'How would you rate your technology and digital capabilities?',
      type: 'single',
      options: [
        { text: 'Basic/Traditional operations', value: 'basic', weight: 1 },
        { text: 'Some digital tools in use', value: 'some_digital', weight: 2 },
        { text: 'Moderate digital integration', value: 'moderate_digital', weight: 3 },
        { text: 'Advanced digital capabilities', value: 'advanced_digital', weight: 4 },
        { text: 'Cutting-edge technology leader', value: 'tech_leader', weight: 5 }
      ],
      category: 'technology_maturity'
    },
    {
      id: 'team_capabilities',
      question: 'What best describes your current team capabilities?',
      type: 'single',
      options: [
        { text: 'Solo founder/entrepreneur', value: 'solo', weight: 1 },
        { text: 'Small team (2-5 people)', value: 'small_team', weight: 2 },
        { text: 'Growing team (6-20 people)', value: 'growing_team', weight: 3 },
        { text: 'Established team (21-50 people)', value: 'established_team', weight: 4 },
        { text: 'Large organization (50+ people)', value: 'large_org', weight: 5 }
      ],
      category: 'organizational_capacity'
    },
    {
      id: 'competitive_pressure',
      question: 'How intense is the competitive pressure in your market?',
      type: 'single',
      options: [
        { text: 'Low competition/Blue ocean', value: 'low_competition', weight: 1 },
        { text: 'Moderate competition', value: 'moderate_competition', weight: 2 },
        { text: 'High competition', value: 'high_competition', weight: 3 },
        { text: 'Very intense competition', value: 'intense_competition', weight: 4 },
        { text: 'Saturated market', value: 'saturated_market', weight: 5 }
      ],
      category: 'market_dynamics'
    },
    {
      id: 'investment_readiness',
      question: 'What is your current investment/funding situation?',
      type: 'single',
      options: [
        { text: 'Self-funded/Bootstrapped', value: 'bootstrapped', weight: 1 },
        { text: 'Friends & family funding', value: 'friends_family', weight: 2 },
        { text: 'Angel investors/Small investment', value: 'angel_funded', weight: 3 },
        { text: 'VC funded/Series A+', value: 'vc_funded', weight: 4 },
        { text: 'Well-funded/Multiple rounds', value: 'well_funded', weight: 5 }
      ],
      category: 'financial_backing'
    },
    {
      id: 'strategic_focus',
      question: 'Where do you need the most strategic support?',
      type: 'multiple',
      options: [
        { text: 'Go-to-market strategy', value: 'gtm_strategy', weight: 1 },
        { text: 'Innovation and R&D', value: 'innovation', weight: 1 },
        { text: 'Growth and scaling', value: 'growth_scaling', weight: 1 },
        { text: 'Digital transformation', value: 'digital_transformation', weight: 1 },
        { text: 'Operational excellence', value: 'operational_excellence', weight: 1 },
        { text: 'Market expansion', value: 'market_expansion', weight: 1 },
        { text: 'Product development', value: 'product_development', weight: 1 },
        { text: 'Business model innovation', value: 'business_model', weight: 1 }
      ],
      category: 'strategic_needs'
    }
  ];

  const serviceRecommendations = {
    'Go-To-Market Strategy': {
      triggers: ['gtm_strategy', 'product_launch', 'market_expansion', 'customer_acquisition'],
      priority: 'high',
      description: 'Perfect for launching new products or entering new markets',
      benefits: ['Accelerated market entry', 'Reduced launch risks', 'Optimized customer acquisition'],
      price: '$8,500',
      duration: '4-6 weeks'
    },
    'Innovation Strategy': {
      triggers: ['innovation', 'product_development', 'tech_leader', 'advanced_digital'],
      priority: 'high',
      description: 'Essential for businesses focusing on innovation and R&D',
      benefits: ['Future-proof strategy', 'Competitive advantage', 'Innovation framework'],
      price: '$12,000',
      duration: '6-8 weeks'
    },
    'Growth Strategy': {
      triggers: ['growth_scaling', 'revenue_growth', 'scaling', 'established_player'],
      priority: 'high',
      description: 'Ideal for businesses ready to scale operations',
      benefits: ['Sustainable growth', 'Market expansion', 'Revenue optimization'],
      price: '$10,000',
      duration: '5-7 weeks'
    },
    'Digital Strategy Consulting': {
      triggers: ['digital_transformation', 'technology_adoption', 'operational_efficiency'],
      priority: 'medium',
      description: 'Transform your business with digital solutions',
      benefits: ['Digital transformation', 'Process optimization', 'Technology integration'],
      price: '$9,000',
      duration: '4-6 weeks'
    },
    'Business Development': {
      triggers: ['business_model', 'strategic_planning', 'early_growth', 'established'],
      priority: 'medium',
      description: 'Build robust business foundations',
      benefits: ['Business model optimization', 'Strategic planning', 'Partnership development'],
      price: '$7,500',
      duration: '4-6 weeks'
    },
    'Product Development': {
      triggers: ['product_development', 'innovation', 'startup', 'product_launch'],
      priority: 'medium',
      description: 'From concept to market success',
      benefits: ['Product-market fit', 'Development roadmap', 'Launch strategy'],
      price: '$15,000',
      duration: '6-10 weeks'
    },
    'AI-Powered Business Analysis': {
      triggers: ['technology_adoption', 'digital_transformation', 'operational_efficiency', 'innovation'],
      priority: 'high',
      description: 'Advanced AI-driven business optimization',
      benefits: ['Data-driven insights', 'Predictive analytics', 'Automation opportunities'],
      price: '$6,000',
      duration: '2-4 weeks'
    },
    'Strategic Planning Workshop': {
      triggers: ['strategic_planning', 'business_model', 'growth_scaling', 'market_expansion'],
      priority: 'medium',
      description: 'Intensive strategic planning and roadmap development',
      benefits: ['Clear strategic roadmap', 'Stakeholder alignment', 'Action plan'],
      price: '$4,500',
      duration: '2-3 weeks'
    }
  };
  const businessFrameworks = {
    grow: {
      title: 'Growth Framework',
      description: 'Strategies to accelerate business growth',
      areas: [
        'Market penetration strategies',
        'Product development roadmap',
        'Customer acquisition optimization',
        'Revenue stream diversification',
        'Partnership development',
        'Digital marketing enhancement'
      ],
      timeline: '3-6 months',
      expectedOutcome: '25-50% revenue growth'
    },
    maintain: {
      title: 'Optimization Framework',
      description: 'Maintain competitive advantage and efficiency',
      areas: [
        'Operational efficiency improvements',
        'Quality assurance systems',
        'Customer retention strategies',
        'Cost optimization',
        'Performance monitoring',
        'Continuous improvement processes'
      ],
      timeline: '2-4 months',
      expectedOutcome: '15-30% cost reduction'
    },
    pivot: {
      title: 'Transformation Framework',
      description: 'Strategic pivoting and business model innovation',
      areas: [
        'Market repositioning',
        'Business model innovation',
        
        'Digital transformation',
        'New market exploration',
        'Product line restructuring',
        'Organizational restructuring'
      ],
      timeline: '6-12 months',
      expectedOutcome: 'New growth opportunities'
    },
    drop: {
      title: 'Elimination Framework',
      description: 'Identify and eliminate inefficiencies',
      areas: [
        'Unprofitable product lines',
        'Inefficient processes',
        'Redundant systems',
        'Underperforming markets',
        'Obsolete technologies',
        'Non-core activities'
      ],
      timeline: '1-3 months',
      expectedOutcome: '20-40% efficiency gain'
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

const handleResponse = (questionId: string | number, answer: string) => {
  if (!mounted) return;

  const question = aiQuestions.find(q => q.id === String(questionId));
  if (!question) return;

  if (question.type === 'multiple') {
    const currentAnswers = (responses[questionId] as string[]) || [];
    const newAnswers = currentAnswers.includes(answer)
      ? currentAnswers.filter((a: string) => a !== answer)
      : [...currentAnswers, answer];

    setResponses({ ...responses, [questionId]: newAnswers });
  } else {
    setResponses({ ...responses, [questionId]: [answer] });
  }
};





  const nextStep = () => {
    if (!mounted) return;
    if (currentStep < aiQuestions.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (!mounted) return;
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateAIAnalysis = () => {
    if (!mounted) return;
    
    setAnalysisComplete(false);
    
    // Simulate AI analysis
    setTimeout(() => {
      const analysis = performAIAnalysis();
      setDiagnosticData(analysis);
      setRecommendedServices(analysis.recommendedServices);
      setBusinessScore(analysis.overallScore);
      setAnalysisComplete(true);
      setShowResults(true);
    }, 3000);
  };

  const performAIAnalysis = () => {
    // AI Analysis Logic
    type RecommendedService = {
  name: string;
  matchScore: number;
  priority: string;
  description: string;
  benefits: string[];
  price: string;
  duration: string;
};
type ActionPlanItem = {
  phase: string;
  actions: string[];
};

    const analysisResults: {
  overallScore: number;
  categoryScores: Record<string, number>; // ✅ fix here
  recommendedServices: RecommendedService[];
  frameworks: string[];
  problemsIdentified: string[];
  opportunityAreas: string[];
   actionPlan: ActionPlanItem[];
} = {
  overallScore: 0,
  categoryScores: {}, // now properly typed
  recommendedServices: [],
  frameworks: [],
  problemsIdentified: [],
  opportunityAreas: [],
  actionPlan: [],
};


    // Calculate category scores
    const categories = ['business_maturity', 'financial_health', 'market_presence', 'technology_maturity'];
    categories.forEach(category => {
      const categoryQuestions = aiQuestions.filter(q => q.category === category);
      let categoryScore = 0;
      let questionCount = 0;
      
      categoryQuestions.forEach(question => {
        const response = responses[question.id];
        if (response) {
          if (Array.isArray(response)) {
            response.forEach(ans => {
              const option = question.options.find(opt => opt.value === ans);
              if (option) categoryScore += option.weight;
            });
          } else {
            const option = question.options.find(opt => opt.value === response);
            if (option) categoryScore += option.weight;
          }
          questionCount++;
        }
      });
      
      analysisResults.categoryScores[category] = questionCount > 0 ? (categoryScore / questionCount) * 20 : 0;
    });

    // Calculate overall score
    const scores = Object.values(analysisResults.categoryScores);
    analysisResults.overallScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);

    // Determine recommended services
// Determine recommended services
const userTriggers: string[] = [];

Object.entries(responses).forEach(([questionId, answer]) => {
  if (Array.isArray(answer)) {
    userTriggers.push(...answer);
  } else {
    userTriggers.push(answer);
  }
});


    Object.entries(serviceRecommendations).forEach(([service, config]) => {
      const matchCount = config.triggers.filter(trigger => userTriggers.includes(trigger)).length;
      if (matchCount > 0) {
        analysisResults.recommendedServices.push({
          name: service,
          matchScore: matchCount,
          priority: config.priority,
          description: config.description,
          benefits: config.benefits,
          price: config.price,
          duration: config.duration
        });
      }
    });

    // Sort by match score and priority
    analysisResults.recommendedServices.sort((a, b) => {
      if (a.priority === 'high' && b.priority !== 'high') return -1;
      if (a.priority !== 'high' && b.priority === 'high') return 1;
      return b.matchScore - a.matchScore;
    });

    // Identify problems and opportunities
    if (analysisResults.overallScore < 60) {
      analysisResults.problemsIdentified = [
        'Limited market positioning strategy',
        'Insufficient growth acceleration',
        'Operational inefficiencies detected',
        'Technology adoption gaps'
      ];
    }

    if (analysisResults.overallScore >= 60 && analysisResults.overallScore < 80) {
      analysisResults.opportunityAreas = [
        'Market expansion opportunities',
        'Product innovation potential',
        'Customer acquisition optimization',
        'Digital transformation benefits'
      ];
    }
    if (analysisResults.overallScore >= 80) {
      analysisResults.opportunityAreas = [
        'Strategic scaling opportunities',
        'Market leadership positioning',
        'Innovation ecosystem development',
        'Partnership and acquisition potential'
      ];
    }
    // Recommend frameworks
    if (analysisResults.overallScore < 50) {
      analysisResults.frameworks = ['pivot', 'drop'];
    } else if (analysisResults.overallScore < 70) {
      analysisResults.frameworks = ['grow', 'maintain'];
    } else {
      analysisResults.frameworks = ['grow', 'maintain'];
    }
    // Generate action plan
    analysisResults.actionPlan = generateActionPlan(analysisResults);

    return analysisResults;
  };

  type AnalysisResult = {
  overallScore: number;
  categoryScores: Record<string, number>;
  recommendedServices: RecommendedService[];
  frameworks: string[];
  problemsIdentified: string[];
  opportunityAreas: string[];
  actionPlan: ActionPlanItem[]; // Or string[] if still using plain strings
};

const generateActionPlan = (analysis: AnalysisResult) => {

    const plan = [];
    
    // Immediate actions (0-30 days)
    plan.push({
      phase: 'Immediate Actions (0-30 days)',
      actions: [
        'Complete comprehensive business audit',
        'Identify top 3 priority areas for improvement',
        'Establish performance metrics and KPIs',
        'Begin stakeholder alignment process'
      ]
    });

    // Short-term actions (1-3 months)
    plan.push({
      phase: 'Short-term Actions (1-3 months)',
      actions: [
        'Implement recommended service solutions',
        'Execute quick wins and process improvements',
        'Establish new systems and workflows',
        'Begin team training and development'
      ]
    });

    // Medium-term actions (3-6 months)
    plan.push({
      phase: 'Medium-term Actions (3-6 months)',
      actions: [
        'Scale successful initiatives',
        'Expand market reach and customer base',
        'Optimize operations and technology',
        'Measure and adjust strategy based on results'
      ]
    });

    // Long-term actions (6-12 months)
    plan.push({
      phase: 'Long-term Actions (6-12 months)',
      actions: [
        'Achieve strategic objectives and goals',
        'Establish market leadership position',
        'Build sustainable competitive advantages',
        'Plan for next phase of growth'
      ]
    });

    return plan;
  };

  const resetDiagnosis = () => {
    if (!mounted) return;
    setCurrentStep(1);
    setResponses({});
    setShowResults(false);
    setAnalysisComplete(false);
    setDiagnosticData(null);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1F3D3A] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading AI diagnostic system...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentQuestion = aiQuestions[currentStep - 1];
  const progressPercentage = Math.round((currentStep / aiQuestions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <section
        className="relative py-20 text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(31, 61, 58, 0.9), rgba(31, 61, 58, 0.9)), url('https://readdy.ai/api/search-image?query=Advanced%20AI%20technology%20interface%20with%20Ethiopian%20business%20professionals%20using%20artificial%20intelligence%20for%20business%20analysis%2C%20modern%20office%20with%20holographic%20displays%20showing%20data%20analytics%20and%20strategic%20insights%2C%20futuristic%20business%20intelligence%20dashboard%20with%20AI-powered%20recommendations%2C%20sophisticated%20technology%20environment%20with%20machine%20learning%20visualization&width=1920&height=600&seq=aidiagnosis&orientation=landscape')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <span className="inline-block px-4 py-2 bg-green-500/20 text-green-100 rounded-full text-sm font-medium backdrop-blur-sm border border-green-400/30">
                AI-Powered Business Intelligence
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
              Advanced AI Business Diagnosis
            </h1>
            <p className="text-xl mb-8 opacity-90 text-gray-100">
              Get personalized service recommendations, problem identification, and strategic frameworks powered by advanced AI
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full">
                <span className="text-sm">🤖 AI-Powered Analysis • 📊 Strategic Frameworks • 🎯 Service Matching</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            {!showResults ? (
              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-[#1F3D3A] mb-3">
                    AI Business Analysis
                  </h2>
                  <p className="text-gray-600 text-lg">Advanced diagnostic questionnaire powered by machine learning</p>
                </div>

                <div className="mb-10">
                  <div className="flex justify-between text-sm text-gray-500 mb-3">
                    <span className="font-medium">Question {currentStep} of {aiQuestions.length}</span>
                    <span className="font-medium">{progressPercentage}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-[#1F3D3A] via-green-500 to-green-600 h-3 rounded-full transition-all duration-500 ease-out relative"
                      style={{ width: `${progressPercentage}%` }}
                    >
                      <div className="absolute right-0 top-0 h-full w-2 bg-white/30 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-400 text-center">
                    AI analyzing your responses in real-time
                  </div>
                </div>

                <div className="mb-10">
                  <div className="flex items-center mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#1F3D3A] to-green-500 rounded-full flex items-center justify-center mr-3">
                      <span className="text-white font-bold text-sm">{currentStep}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-semibold text-[#1F3D3A] leading-tight">
                        {currentQuestion.question}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {currentQuestion.type === 'multiple' ? 'Select all that apply' : 'Choose one option'}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 max-w-3xl mx-auto">
                    {currentQuestion.options.map((option, index) => (
                      <label 
                        key={index} 
                        className={`flex items-center p-4 sm:p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:border-[#1F3D3A] group ${
                          currentQuestion.type === 'multiple'
                            ? (responses[currentQuestion.id] || []).includes(option.value)
                              ? 'border-[#1F3D3A] bg-[#1F3D3A]/5'
                              : 'border-gray-200 hover:bg-gray-50'
                            :(responses[currentQuestion.id] as any) === option.value
                              ? 'border-[#1F3D3A] bg-[#1F3D3A]/5'
                              : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type={currentQuestion.type === 'multiple' ? 'checkbox' : 'radio'}
                          name={currentQuestion.id}
                          value={option.value}
                          onChange={(e) => handleResponse(currentQuestion.id, e.target.value)}
                          checked={
                            currentQuestion.type === 'multiple'
                              ? (responses[currentQuestion.id] || []).includes(option.value)
                              : (responses[currentQuestion.id] as any) === option.value
                          }
                          className="mr-4 w-5 h-5 text-[#1F3D3A] focus:ring-[#1F3D3A] flex-shrink-0"
                        />
                        <div className="flex-1">
                          <span className="text-gray-700 text-base sm:text-lg leading-relaxed group-hover:text-[#1F3D3A] transition-colors">
                            {option.text}
                          </span>
                        </div>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                          <i className="ri-arrow-right-line text-[#1F3D3A]"></i>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <button
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={`w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-full border-2 transition-colors whitespace-nowrap cursor-pointer order-2 sm:order-1 ${
                      currentStep === 1
                        ? 'border-gray-200 text-gray-400 cursor-not-allowed'
                        : 'border-[#1F3D3A] text-[#1F3D3A] hover:bg-[#1F3D3A] hover:text-white'
                    }`}
                  >
                    <i className="ri-arrow-left-line mr-2"></i>
                    Previous
                  </button>

                  {currentStep === aiQuestions.length ? (
                    <button
                      onClick={generateAIAnalysis}
                      disabled={!responses[currentQuestion.id] || (Array.isArray(responses[currentQuestion.id]) && responses[currentQuestion.id].length === 0)}
                      className={`w-full sm:w-auto flex items-center justify-center px-8 py-3 rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer order-1 sm:order-2 ${
                        (responses[currentQuestion.id] && (!Array.isArray(responses[currentQuestion.id]) || responses[currentQuestion.id].length > 0))
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg transform hover:scale-105'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <i className="ri-ai-generate mr-2"></i>
                      Start AI Analysis
                    </button>
                  ) : (
                    <button
                      onClick={nextStep}
                      disabled={!responses[currentQuestion.id] || (Array.isArray(responses[currentQuestion.id]) && responses[currentQuestion.id].length === 0)}
                      className={`w-full sm:w-auto flex items-center justify-center px-6 py-3 rounded-full transition-colors whitespace-nowrap cursor-pointer order-1 sm:order-2 ${
                        (responses[currentQuestion.id] && (!Array.isArray(responses[currentQuestion.id]) || responses[currentQuestion.id].length > 0))
                          ? 'bg-[#1F3D3A] text-white hover:bg-[#2a5248]'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Next Question
                      <i className="ri-arrow-right-line ml-2"></i>
                    </button>
                  )}
                </div>
              </div>
            ) : !analysisComplete ? (
              <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 text-center">
                <div className="mb-8">
                  <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
                    <div className="absolute inset-0 rounded-full border-4 border-green-200 animate-pulse"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-[#1F3D3A] border-t-transparent animate-spin"></div>
                    <i className="ri-ai-generate text-3xl text-[#1F3D3A] animate-pulse"></i>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1F3D3A] mb-4">AI Analysis in Progress</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Our advanced AI system is analyzing your responses and generating personalized recommendations...
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                    <i className="ri-search-eye-line text-2xl text-blue-600 mb-3"></i>
                    <h3 className="font-semibold text-blue-800 mb-2">Analyzing Business Profile</h3>
                    <p className="text-sm text-blue-700">Processing your business stage, goals, and challenges</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                    <i className="ri-service-line text-2xl text-green-600 mb-3"></i>
                    <h3 className="font-semibold text-green-800 mb-2">Matching Services</h3>
                    <p className="text-sm text-green-700">Finding the perfect services for your needs</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
                    <i className="ri-strategy-line text-2xl text-purple-600 mb-3"></i>
                    <h3 className="font-semibold text-purple-800 mb-2">Creating Strategy</h3>
                    <p className="text-sm text-purple-700">Developing your personalized action plan</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                  <div className="text-center mb-8">
                    <div className="relative inline-flex items-center justify-center w-32 h-32 mb-6">
                      <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                      <div 
                        className="absolute inset-0 rounded-full border-8 border-green-500 transition-all duration-1000 ease-out"
                        style={{ 
                          background: `conic-gradient(#10b981 ${businessScore * 3.6}deg, transparent 0deg)`,
                          borderRadius: '50%'
                        }}
                      ></div>
                      <div className="relative bg-white rounded-full w-24 h-24 flex items-center justify-center">
                        <span className="text-3xl font-bold text-[#1F3D3A]">{businessScore}</span>
                      </div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1F3D3A] mb-3">
                      Your Business Readiness Score
                    </h2>
                    <p className={`text-lg font-semibold mb-2 ${
                      businessScore >= 80 ? 'text-green-600' :
                      businessScore >= 60 ? 'text-blue-600' :
                      businessScore >= 40 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {businessScore >= 80 ? 'Excellent - Ready for Scale' :
                       businessScore >= 60 ? 'Good - Ready for Growth' :
                       businessScore >= 40 ? 'Fair - Needs Optimization' : 'Needs Significant Improvement'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                   {Object.entries(diagnosticData?.categoryScores ?? {}).map(([category, score]) => (

                      <div key={category} className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="font-semibold text-[#1F3D3A] mb-3 capitalize">
                          {category.replace('_', ' ')}
                        </h3>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">Score</span>
                          <span className="font-bold text-[#1F3D3A]">{Math.round(score)}/100</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#1F3D3A] to-green-500 h-2 rounded-full transition-all duration-1000"
                            style={{ width: `${score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                  <h2 className="text-2xl font-bold text-[#1F3D3A] mb-6 flex items-center">
                    <i className="ri-service-line mr-3"></i>
                    Recommended Services
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendedServices.slice(0, 6).map((service, index) => (
                      <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-[#1F3D3A] text-lg">{service.name}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            service.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                          }`}>
                            {service.priority} priority
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                        <div className="mb-4">
                          <h4 className="font-medium text-gray-800 mb-2">Key Benefits:</h4>
                          <ul className="space-y-1">
                            {service.benefits.map((benefit, i) => (
                              <li key={i} className="flex items-start text-sm text-gray-600">
                                <i className="ri-check-line text-green-500 mr-2 mt-0.5 flex-shrink-0"></i>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-sm text-gray-500">
                            <i className="ri-time-line mr-1"></i>
                            {service.duration}
                          </div>
                          <div className="text-lg font-bold text-[#1F3D3A]">
                            {service.price}
                          </div>
                        </div>
                        <Link 
                          href="/contact" 
                          className="w-full bg-[#1F3D3A] text-white py-3 px-4 rounded-lg hover:bg-[#2a5248] transition-colors text-center block cursor-pointer"
                        >
                          Get Started
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                  <h2 className="text-2xl font-bold text-[#1F3D3A] mb-6 flex items-center">
                    <i className="ri-strategy-line mr-3"></i>
                    Strategic Frameworks
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(diagnosticData?.frameworks ?? []).map((frameworkKey, index) => {

                      const framework = businessFrameworks[frameworkKey as keyof typeof businessFrameworks];

                      return (
                        <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#1F3D3A] transition-colors">
                          <h3 className="text-xl font-bold text-[#1F3D3A] mb-3">{framework.title}</h3>
                          <p className="text-gray-600 mb-4">{framework.description}</p>
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-800 mb-2">Focus Areas:</h4>
                            <ul className="space-y-1">
                              {framework.areas.map((area, i) => (
                                <li key={i} className="flex items-start text-sm text-gray-600">
                                  <i className="ri-arrow-right-line text-[#1F3D3A] mr-2 mt-0.5 flex-shrink-0"></i>
                                  {area}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="grid grid-cols-1 gap-3">
                            <div className="bg-blue-50 p-3 rounded-lg">
                              <div className="flex items-center">
                                <i className="ri-time-line text-blue-600 mr-2"></i>
                                <span className="text-sm font-medium text-blue-800">Timeline: {framework.timeline}</span>
                              </div>
                            </div>
                            <div className="bg-green-50 p-3 rounded-lg">
                              <div className="flex items-center">
                                <i className="ri-target-line text-green-600 mr-2"></i>
                                <span className="text-sm font-medium text-green-800">Outcome: {framework.expectedOutcome}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {(diagnosticData?.problemsIdentified ?? []).length > 0 && (
                    <div className="bg-white rounded-3xl shadow-xl p-8">
                      <h2 className="text-xl font-bold text-red-600 mb-6 flex items-center">
                        <i className="ri-error-warning-line mr-3"></i>
                        Problems Identified
                      </h2>
                      <ul className="space-y-3">
                        {(diagnosticData?.problemsIdentified ?? []).map((problem, index) => (
                          <li key={index} className="flex items-start">
                            <i className="ri-close-circle-line text-red-500 mr-3 mt-0.5 flex-shrink-0"></i>
                            <span className="text-gray-700">{problem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                 {(diagnosticData?.opportunityAreas ?? []).length > 0 && (

                    <div className="bg-white rounded-3xl shadow-xl p-8">
                      <h2 className="text-xl font-bold text-green-600 mb-6 flex items-center">
                        <i className="ri-lightbulb-line mr-3"></i>
                        Opportunities
                      </h2>
                      <ul className="space-y-3">
                  {(diagnosticData?.opportunityAreas ?? []).map((opportunity, index) => (

                          <li key={index} className="flex items-start">
                            <i className="ri-check-circle-line text-green-500 mr-3 mt-0.5 flex-shrink-0"></i>
                            <span className="text-gray-700">{opportunity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                  <h2 className="text-2xl font-bold text-[#1F3D3A] mb-6 flex items-center">
                    <i className="ri-roadmap-line mr-3"></i>
                    Strategic Action Plan
                  </h2>
                  <div className="space-y-6">
                    {(diagnosticData?.actionPlan ?? []).map((phase, index) => (

                      <div key={index} className="border-l-4 border-[#1F3D3A] pl-6">
                        <h3 className="text-lg font-semibold text-[#1F3D3A] mb-3">{phase.phase}</h3>
                        <ul className="space-y-2">
                          {phase.actions.map((action, i) => (
                            <li key={i} className="flex items-start">
                              <i className="ri-play-circle-line text-green-500 mr-3 mt-0.5 flex-shrink-0"></i>
                              <span className="text-gray-700">{action}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-[#1F3D3A] to-green-600 rounded-3xl p-8 text-white text-center">
                  <h2 className="text-2xl font-bold mb-4">Ready to Transform Your Business?</h2>
                  <p className="text-lg mb-6 opacity-90">
                    Let our experts help you implement these recommendations and achieve your goals
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/contact" className="bg-white text-[#1F3D3A] px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap cursor-pointer">
                      Book Expert Consultation
                    </Link>
                    <Link href="/services" className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-[#1F3D3A] transition-colors whitespace-nowrap cursor-pointer">
                      Explore Services
                    </Link>
                    <button
                      onClick={resetDiagnosis}
                      className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors whitespace-nowrap cursor-pointer"
                    >
                      New Diagnosis
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[#1F3D3A] mb-4">Why Choose Our AI Diagnosis?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Advanced artificial intelligence meets strategic business consulting
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-500 rounded-full mx-auto mb-4">
                  <i className="ri-ai-generate text-2xl text-white"></i>
                </div>
                <h3 className="font-semibold text-[#1F3D3A] mb-2">AI-Powered Analysis</h3>
                <p className="text-gray-600 text-sm">Advanced machine learning algorithms analyze your business and provide personalized recommendations</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="w-16 h-16 flex items-center justify-center bg-green-500 rounded-full mx-auto mb-4">
                  <i className="ri-service-line text-2xl text-white"></i>
                </div>
                <h3 className="font-semibold text-[#1F3D3A] mb-2">Service Matching</h3>
                <p className="text-gray-600 text-sm">Intelligent matching system connects you with the most relevant services for your specific needs</p>
              </div>

              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="w-16 h-16 flex items-center justify-center bg-purple-500 rounded-full mx-auto mb-4">
                  <i className="ri-strategy-line text-2xl text-white"></i>
                </div>
                <h3 className="font-semibold text-[#1F3D3A] mb-2">Strategic Frameworks</h3>
                <p className="text-gray-600 text-sm">Proven business frameworks tailored to your situation with clear growth, maintain, pivot, or drop strategies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
