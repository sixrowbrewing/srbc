import React, { useState, useEffect } from 'react';

// ==================== UTILITY COMPONENTS ====================

// SEO Component
const SEO = ({ title, description, keywords }) => {
  useEffect(() => {
    document.title = title;
    
    const updateMetaTag = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };
    
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
  }, [title, description, keywords]);
  
  return null;
};

// Simple Router Hook
const useRouter = () => {
  const [currentPage, setCurrentPage] = useState('home');
  
  return {
    currentPage,
    navigate: (page) => {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    goBack: () => setCurrentPage('services')
  };
};

// ==================== NAVIGATION ====================

const Navigation = ({ navigate, visitorCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg border-b-4 border-yellow-400' : 'bg-white/95 backdrop-blur-sm border-b-4 border-yellow-400'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 md:py-5 flex justify-between items-center">
        <button onClick={() => navigate('home')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <span className="text-2xl md:text-3xl font-bold text-black tracking-wider">SRBC</span>
          <span className="text-xs md:text-sm text-gray-700 italic font-light hidden sm:inline">Six Row Brewing Consulting</span>
        </button>
        
        <div className="flex items-center gap-4 md:gap-10">
          <div className="hidden lg:flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full border-2 border-yellow-400">
            <span className="text-xl md:text-2xl">👥</span>
            <div className="text-left">
              <div className="text-xs text-gray-600 font-medium">Total Visitors</div>
              <div className="text-base md:text-lg font-bold text-black">{visitorCount.toLocaleString()}</div>
            </div>
          </div>
          
          <ul className="flex gap-4 md:gap-8">
            <li>
              <button 
                onClick={() => navigate('services')} 
                className="text-black font-semibold text-sm tracking-wide hover:text-yellow-500 transition-colors"
              >
                Services
              </button>
            </li>
            <li>
              <button 
                onClick={() => navigate('contact')} 
                className="text-black font-semibold text-sm tracking-wide hover:text-yellow-500 transition-colors"
              >
                Contact
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// ==================== WHATSAPP BUTTON ====================

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const phoneNumber = '918559907991';
  const message = 'Hello! I would like to know more about your brewing consulting services.';
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 md:bottom-8 right-6 md:right-8 z-50">
      <div className="relative">
        {showTooltip && (
          <div className="absolute bottom-20 right-0 bg-black text-white px-4 py-2 rounded-lg shadow-lg whitespace-nowrap animate-bounce">
            <div className="text-sm font-semibold">Chat with us on WhatsApp!</div>
            <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-black transform rotate-45"></div>
          </div>
        )}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 group"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-8 h-8 md:w-9 md:h-9 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full"></span>
        </a>
      </div>
    </div>
  );
};

// ==================== SERVICE DATA ====================

const SERVICE_CONTENT = {
  operations: {
    icon: '🏭',
    title: 'Operations & Manufacturing',
    tagline: 'Optimize Every Aspect of Your Brewing Operation',
    description: 'Maximize efficiency, reduce waste, and improve product quality with proven operational methodologies.',
    offerings: [
      { icon: '📈', name: 'Process Optimization', desc: 'Streamline brewing processes to increase throughput and reduce cycle times.' },
      { icon: '💰', name: 'Cost Reduction', desc: 'Identify and eliminate waste with systematic cost reduction approaches.' },
      { icon: '📅', name: 'Production Planning', desc: 'Advanced planning systems balancing capacity, demand, and inventory.' },
      { icon: '📋', name: 'SOPs Development', desc: 'Comprehensive standard operating procedures for consistency.' },
      { icon: '⚡', name: 'Lean Manufacturing', desc: 'Apply lean principles adapted for brewing operations.' },
      { icon: '📊', name: 'Performance Metrics', desc: 'KPIs and dashboards for real-time operational visibility.' }
    ],
    process: [
      { step: 'Assessment', desc: 'Evaluate current operations and identify opportunities' },
      { step: 'Design', desc: 'Develop customized solutions for your needs' },
      { step: 'Implementation', desc: 'Deploy new processes with minimal disruption' },
      { step: 'Optimization', desc: 'Continuous monitoring and refinement' }
    ],
    outcomes: [
      '15-30% cost reduction',
      '20-40% throughput improvement',
      '50% quality variance reduction',
      'Enhanced productivity',
      'Better inventory management',
      'Improved capacity utilization'
    ]
  },
  recipe: {
    icon: '⚗️',
    title: 'Recipe Development',
    tagline: 'Craft Exceptional Beers That Define Your Brand',
    description: 'Create products that resonate with consumers using brewing science and market insight.',
    offerings: [
      { icon: '🔬', name: 'New Product Development', desc: 'Full-service recipe creation from concept to commercialization.' },
      { icon: '🎯', name: 'Recipe Optimization', desc: 'Refine existing recipes for consistency and cost efficiency.' },
      { icon: '⚗️', name: 'Pilot Brewing', desc: 'Rapid iteration and testing on pilot brewing systems.' },
      { icon: '🍃', name: 'NA Beer Development', desc: 'Premium non-alcoholic beers with advanced brewing techniques.' },
      { icon: '🦠', name: 'Probiotic Beers', desc: 'Innovative functional beers with beneficial bacteria strains.' },
      { icon: '📏', name: 'Scale-up Support', desc: 'Technical guidance from pilot to commercial production.' }
    ],
    process: [
      { step: 'Discovery', desc: 'Understand brand vision and target market' },
      { step: 'Concept', desc: 'Create recipe concepts with flavor profiles' },
      { step: 'Pilot Brewing', desc: 'Iterative brewing and refinement' },
      { step: 'Launch', desc: 'Scale-up engineering and market entry' }
    ],
    outcomes: [
      'Market-ready recipes in 4-8 weeks',
      'Award-winning formulations',
      'Reduced raw material costs',
      'Differentiated portfolio',
      'NA & functional beer expertise',
      'Competitive positioning'
    ]
  },
  engineering: {
    icon: '⚙️',
    title: 'Engineering & Design',
    tagline: 'Build Your Brewery Right the First Time',
    description: 'Complete brewery design and construction management from feasibility through commissioning.',
    offerings: [
      { icon: '📊', name: 'Feasibility Studies', desc: 'Comprehensive site analysis and project economics.' },
      { icon: '🏗️', name: 'Process Design', desc: 'Complete engineering with equipment specs and P&IDs.' },
      { icon: '📐', name: 'Facility Layout', desc: 'Optimized layouts maximizing efficiency and expansion.' },
      { icon: '🔧', name: 'Equipment Selection', desc: 'Vendor-neutral procurement guidance.' },
      { icon: '👷', name: 'Project Management', desc: 'End-to-end construction oversight.' },
      { icon: '🚀', name: 'Commissioning', desc: 'Hands-on startup assistance and training.' }
    ],
    process: [
      { step: 'Concept', desc: 'Define scope, capacity, budget and timeline' },
      { step: 'Engineering', desc: 'Complete design deliverables and specs' },
      { step: 'Build', desc: 'Construction oversight and quality assurance' },
      { step: 'Startup', desc: 'Commissioning, training and production support' }
    ],
    outcomes: [
      'On-schedule delivery',
      '5-15% under budget',
      'Optimized efficiency',
      'Future-proof designs',
      'Minimized risks',
      'Faster time to market'
    ]
  },
  quality: {
    icon: '✓',
    title: 'Quality Assurance',
    tagline: 'Build Quality Into Every Batch',
    description: 'Establish quality management systems ensuring consistency and regulatory compliance.',
    offerings: [
      { icon: '📋', name: 'QMS Implementation', desc: 'Complete quality system design and deployment.' },
      { icon: '🔬', name: 'Lab Setup', desc: 'Equipment selection and method validation.' },
      { icon: '✅', name: 'Testing Protocols', desc: 'Comprehensive sampling and quality procedures.' },
      { icon: '👅', name: 'Sensory Programs', desc: 'Trained panels and flavor quality standards.' },
      { icon: '📈', name: 'Statistical Control', desc: 'Real-time monitoring and trend analysis.' },
      { icon: '⚖️', name: 'Compliance Support', desc: 'Regulatory requirements and certifications.' }
    ],
    process: [
      { step: 'Assessment', desc: 'Evaluate current systems and identify gaps' },
      { step: 'QMS Design', desc: 'Develop tailored quality management system' },
      { step: 'Implementation', desc: 'Deploy systems with training and documentation' },
      { step: 'Validation', desc: 'Verify effectiveness and continuous improvement' }
    ],
    outcomes: [
      '70% reduction in quality incidents',
      'ISO/FSSC certification',
      'Improved shelf-life',
      'Enhanced brand reputation',
      'Reduced complaints',
      'Better compliance'
    ]
  },
  strategy: {
    icon: '📊',
    title: 'Strategy & Finance',
    tagline: 'Make Informed Decisions for Sustainable Growth',
    description: 'Strategic planning backed by brewing expertise and financial rigor.',
    offerings: [
      { icon: '📝', name: 'Business Planning', desc: 'Comprehensive plans for ventures and expansions.' },
      { icon: '💹', name: 'Financial Modeling', desc: 'Detailed projections and ROI analysis.' },
      { icon: '🎯', name: 'Market Analysis', desc: 'In-depth research and positioning strategies.' },
      { icon: '💰', name: 'Valuation Services', desc: 'Professional valuations for M&A and investment.' },
      { icon: '🔍', name: 'Performance Improvement', desc: 'Diagnostic assessments and turnaround strategies.' },
      { icon: '🗺️', name: 'Strategic Planning', desc: 'Long-range planning with execution roadmaps.' }
    ],
    process: [
      { step: 'Analysis', desc: 'Review business, market and competitive landscape' },
      { step: 'Strategy', desc: 'Develop options with financial impact analysis' },
      { step: 'Planning', desc: 'Create detailed execution plans with milestones' },
      { step: 'Support', desc: 'Ongoing guidance and course corrections' }
    ],
    outcomes: [
      'Data-driven decisions',
      'Successful capital raises',
      'Profitable market entry',
      'Improved profitability',
      'Successful M&A',
      'Clear growth roadmap'
    ]
  },
  sustainability: {
    icon: '🌱',
    title: 'Sustainability Solutions',
    tagline: 'Profitable Environmental Responsibility',
    description: 'Practical sustainability programs reducing impact while improving efficiency.',
    offerings: [
      { icon: '📊', name: 'Sustainability Assessments', desc: 'Comprehensive environmental footprint evaluation.' },
      { icon: '♻️', name: 'Waste Reduction', desc: 'Zero-waste strategies and circular economy.' },
      { icon: '⚡', name: 'Energy Efficiency', desc: 'Energy audits and renewable integration.' },
      { icon: '💧', name: 'Water Management', desc: 'Conservation and recycling systems.' },
      { icon: '🌍', name: 'Carbon Reduction', desc: 'Carbon accounting and offset programs.' },
      { icon: '✅', name: 'Certification Support', desc: 'B-Corp, ISO 14001 and green certifications.' }
    ],
    process: [
      { step: 'Baseline', desc: 'Establish current environmental performance' },
      { step: 'Opportunity', desc: 'Identify improvements with cost-benefit analysis' },
      { step: 'Implementation', desc: 'Deploy prioritized sustainability initiatives' },
      { step: 'Reporting', desc: 'Measure results and continuous improvement' }
    ],
    outcomes: [
      '25-40% energy cost reduction',
      '30-50% water reduction',
      '80-95% waste diversion',
      'Enhanced brand value',
      'Better compliance',
      'Positive ROI'
    ]
  },
  microbrewery: {
    icon: '🍺',
    title: 'Microbrewery & Brewpub Consulting',
    tagline: 'Your Partner in Craft Brewing Success',
    description: 'Specialized consulting for microbreweries and brewpubs from concept to operation.',
    offerings: [
      { icon: '🚀', name: 'Startup Consulting', desc: 'Complete launch guidance including licensing and planning.' },
      { icon: '🏗️', name: 'Brewpub Design', desc: 'Integrated brewery and restaurant design.' },
      { icon: '📜', name: 'Licensing Support', desc: 'Navigate alcohol licensing and regulations.' },
      { icon: '⚗️', name: 'Recipe Portfolio', desc: 'Craft unique beers defining your brand.' },
      { icon: '👨‍🏫', name: 'Operations Training', desc: 'Hands-on staff training and SOPs.' },
      { icon: '💼', name: 'Business Optimization', desc: 'Revenue optimization and profitability strategies.' }
    ],
    process: [
      { step: 'Concept', desc: 'Define unique concept and market positioning' },
      { step: 'Planning', desc: 'Business plan, design and financial projections' },
      { step: 'Setup', desc: 'Licensing, construction and staff training' },
      { step: 'Support', desc: 'Ongoing operational and business support' }
    ],
    outcomes: [
      'Faster time to market',
      'Optimized investment',
      'Strong brand presence',
      'Profitability within 12 months',
      'Award-winning beers',
      'Sustainable model'
    ]
  }
};

const INDUSTRY_BENCHMARKS = [
  {
    icon: '⚗️',
    title: 'Brewhouse Efficiency',
    description: 'Measures extract efficiency from malt to fermentable sugars',
    levels: [
      { label: 'World Class', value: '85-90%', color: 'green', width: '90%' },
      { label: 'Good', value: '75-84%', color: 'yellow', width: '80%' },
      { label: 'Needs Improvement', value: '<75%', color: 'red', width: '70%' }
    ]
  },
  {
    icon: '📦',
    title: 'Packaging Efficiency',
    description: 'Beer successfully packaged vs total production volume',
    levels: [
      { label: 'World Class', value: '95-98%', color: 'green', width: '97%' },
      { label: 'Good', value: '90-94%', color: 'yellow', width: '92%' },
      { label: 'Needs Improvement', value: '<90%', color: 'red', width: '85%' }
    ]
  },
  {
    icon: '💰',
    title: 'Raw Material Cost',
    description: 'Percentage of total revenue spent on raw materials',
    levels: [
      { label: 'World Class', value: '35-40%', color: 'green', width: '38%' },
      { label: 'Good', value: '41-50%', color: 'yellow', width: '45%' },
      { label: 'Needs Improvement', value: '>50%', color: 'red', width: '55%' }
    ]
  },
  {
    icon: '⏱️',
    title: 'Brewery Utilization',
    description: 'Actual production vs maximum capacity over time',
    levels: [
      { label: 'World Class', value: '80-90%', color: 'green', width: '85%' },
      { label: 'Good', value: '60-79%', color: 'yellow', width: '70%' },
      { label: 'Needs Improvement', value: '<60%', color: 'red', width: '50%' }
    ]
  },
  {
    icon: '🔄',
    title: 'Batch Turnaround Time',
    description: 'From brewing to packaging readiness for ales',
    levels: [
      { label: 'World Class', value: '14-18 days', color: 'green', width: '90%' },
      { label: 'Good', value: '19-25 days', color: 'yellow', width: '70%' },
      { label: 'Needs Improvement', value: '>25 days', color: 'red', width: '50%' }
    ]
  },
  {
    icon: '💧',
    title: 'Water Usage Ratio',
    description: 'Liters of water used per liter of beer produced',
    levels: [
      { label: 'World Class', value: '3-4:1', color: 'green', width: '95%' },
      { label: 'Good', value: '5-6:1', color: 'yellow', width: '75%' },
      { label: 'Needs Improvement', value: '>7:1', color: 'red', width: '60%' }
    ]
  }
];

// ==================== PAGE COMPONENTS ====================

const HomePage = ({ navigate }) => {
  const featuredServices = [
    { 
      id: 'operations', 
      icon: '🏭', 
      title: 'Operations', 
      image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&h=400&fit=crop' 
    },
    { 
      id: 'recipe', 
      icon: '⚗️', 
      title: 'Recipe Development', 
      image: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=600&h=400&fit=crop' 
    },
    { 
      id: 'microbrewery', 
      icon: '🍺', 
      title: 'Microbrewery', 
      image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=600&h=400&fit=crop' 
    }
  ];

  return (
    <>
      <SEO 
        title="Six Row Brewing Consulting | Best Microbrewery Consultant in Pune, India | Brewpub Setup & NA Beer Experts"
        description="Leading brewery consultant in Pune, India. Expert microbrewery setup, brewpub consulting, NA beer development, probiotic beer formulation. 15+ successful projects. Call +91 8559907991"
        keywords="microbrewery consultant Pune, brewery consultant India, brewpub setup Maharashtra, NA beer consultant, probiotic beer development, craft brewery consulting India, microbrewery equipment India, brewery licensing consultant, beer recipe development India, sustainable brewing consultant"
      />
      
      {/* Hero Section */}
      <section className="mt-20 min-h-screen relative flex items-center overflow-hidden border-b-4 border-yellow-400">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1608690464772-f251c71c02ba?w=1920&h=1080&fit=crop)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/75 to-black/60"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 py-12">
          <p className="text-base md:text-xl text-yellow-400 italic mb-4 font-semibold animate-fade-in">
            Expert Brewing Industry Consultants
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-wide leading-tight animate-slide-up">
            Crafting Success,<br/>Brewing Excellence
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-white mb-8 max-w-3xl font-light leading-relaxed animate-slide-up-delay">
            From grain to glass, we deliver comprehensive brewing solutions that elevate quality, optimize operations, and drive sustainable growth.
          </p>
          <p className="text-base md:text-lg lg:text-xl text-yellow-400 mb-12 max-w-3xl font-bold animate-slide-up-delay-2">
            Specializing in Microbreweries, Brewpubs, and Craft Brewing Operations
          </p>
          <button 
            onClick={() => navigate('contact')}
            className="px-8 md:px-12 py-4 bg-yellow-400 text-black font-bold tracking-widest uppercase text-sm hover:bg-yellow-500 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 animate-fade-in-delay"
          >
            Start Your Project
          </button>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-white py-12 md:py-16 border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-4 tracking-wide">
              Why Choose SRBC?
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
              Expert brewing consultants specializing in microbreweries, brewpubs, and craft brewing operations across India. 
              From startup guidance to operational excellence, we deliver results.
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <article className="prose prose-lg max-w-none">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-6">
              Premier Microbrewery & Brewpub Consultant in Pune, Maharashtra
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Six Row Brewing Consulting (SRBC)</strong> is India's leading <strong>microbrewery consultant</strong> based in <strong>Pune, Maharashtra</strong>. 
              We specialize in complete <strong>brewery setup solutions</strong>, <strong>brewpub consulting</strong>, and innovative beer development including 
              <strong> NA (non-alcoholic) beer</strong> and <strong>probiotic beer formulation</strong>.
            </p>
            
            <h3 className="text-xl md:text-2xl font-bold text-black mt-8 mb-4">
              Comprehensive Brewery Consulting Services in India
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Whether you're launching a new <strong>microbrewery in Pune</strong>, expanding an existing <strong>craft brewery</strong>, or opening a 
              <strong> brewpub in Maharashtra</strong>, SRBC provides end-to-end consulting services including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6 ml-4">
              <li><strong>Microbrewery Setup & Equipment Selection</strong> - Complete turnkey solutions</li>
              <li><strong>Brewery Licensing & Compliance</strong> - Navigate Indian regulations effortlessly</li>
              <li><strong>Recipe Development</strong> - Including trending NA beers and functional probiotic beers</li>
              <li><strong>Operations Optimization</strong> - Maximize efficiency and profitability</li>
              <li><strong>Quality Control Systems</strong> - Ensure consistent, award-winning products</li>
              <li><strong>Staff Training & SOPs</strong> - Build capable brewing teams</li>
            </ul>
            
            <h3 className="text-xl md:text-2xl font-bold text-black mt-8 mb-4">
              Why We're the Best Brewery Consultant in Pune
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Unlike other brewing consultants in India, SRBC offers specialized expertise in emerging beer categories like 
              <strong> non-alcoholic craft beer</strong> and <strong>probiotic beer development</strong> - positioning your brewery at the forefront of market trends.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 my-8">
              <h4 className="text-lg md:text-xl font-bold text-black mb-2">🎯 Local Expertise in Pune & Maharashtra</h4>
              <p className="text-gray-700">
                Based in Pune, we understand the local market dynamics, regulatory landscape, and consumer preferences across Maharashtra. 
                Our hands-on approach ensures your brewery succeeds from day one.
              </p>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-black mt-8 mb-4">
              Serving All of India - From Bangalore to Delhi
            </h3>
            <p className="text-gray-700 leading-relaxed">
              While headquartered in Pune, we provide <strong>brewery consulting services across India</strong> including Mumbai, Bangalore, 
              Delhi NCR, Hyderabad, Chennai, and beyond. Our team travels nationwide to ensure your brewery success.
            </p>
          </article>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-4 tracking-wide">
              Our Services
            </h2>
            <p className="text-base md:text-lg text-gray-700 mb-6 font-medium">
              Complete consulting for breweries, microbreweries and brewpubs
            </p>
            <button 
              onClick={() => navigate('services')}
              className="text-yellow-500 font-bold inline-flex items-center gap-2 hover:gap-4 transition-all text-lg group"
            >
              View All Services 
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {featuredServices.map((service) => (
              <div 
                key={service.id}
                onClick={() => navigate(`service-${service.id}`)}
                className="bg-white border-4 border-gray-200 hover:border-yellow-400 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group"
              >
                <div className="relative h-48 md:h-56 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url(${service.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="text-4xl md:text-5xl mb-3">{service.icon}</div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-wide">{service.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

const ServicesPage = ({ navigate }) => {
  const services = [
    { id: 'operations', icon: '🏭', title: 'Operations & Manufacturing', desc: 'Optimize brewing operations for maximum efficiency', image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&h=500&fit=crop' },
    { id: 'recipe', icon: '⚗️', title: 'Recipe Development', desc: 'Create award-winning products including NA and probiotic beers', image: 'https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=800&h=500&fit=crop' },
    { id: 'engineering', icon: '⚙️', title: 'Engineering & Design', desc: 'Turnkey brewery expansion solutions', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&h=500&fit=crop' },
    { id: 'quality', icon: '✓', title: 'Quality Assurance', desc: 'Implement robust quality systems', image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&h=500&fit=crop' },
    { id: 'strategy', icon: '📊', title: 'Strategy & Finance', desc: 'Data-driven business planning', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop' },
    { id: 'sustainability', icon: '🌱', title: 'Sustainability', desc: 'Environmentally responsible operations', image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&h=500&fit=crop' },
    { id: 'microbrewery', icon: '🍺', title: 'Microbrewery & Brewpub', desc: 'Complete setup and operational guidance', image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=800&h=500&fit=crop' },
    { id: 'audit', icon: '📋', title: 'Brewery Performance Audit', desc: 'Comprehensive efficiency analysis with industry benchmarks', image: 'https://images.unsplash.com/photo-1554224311-beee460ae6ba?w=800&h=500&fit=crop' }
  ];

  return (
    <div className="pt-24 min-h-screen bg-white">
      <SEO 
        title="Brewery Consulting Services India | Microbrewery Setup | Brewpub Consulting - SRBC"
        description="Complete brewery consulting services in India. Microbrewery setup, brewpub design, NA beer development, quality assurance, operations optimization, brewery performance audit. Expert consultants in Pune."
        keywords="brewery consulting services India, microbrewery setup Pune, brewpub consulting Maharashtra, NA beer development, brewery operations consultant, craft beer quality assurance, brewing equipment selection India, brewery audit services"
      />
      
      <section className="bg-black text-white py-12 md:py-16 lg:py-20 border-b-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-wide">Our Services</h1>
          <p className="text-base md:text-lg lg:text-2xl text-gray-300 max-w-3xl font-light">
            Comprehensive consulting for breweries, microbreweries, and brewpubs
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service) => (
            <div 
              key={service.id}
              onClick={() => navigate(`service-${service.id}`)}
              className="bg-white border-4 border-gray-200 hover:border-yellow-400 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group"
            >
              <div className="relative h-40 md:h-48 overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url(${service.image})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="text-3xl md:text-4xl mb-2">{service.icon}</div>
                  <h3 className="text-base md:text-lg font-bold">{service.title}</h3>
                </div>
              </div>
              <div className="p-4 md:p-6">
                <p className="text-gray-700 text-sm font-medium">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) {
      alert('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Thank you for your inquiry! We will get back to you soon.');
      setForm({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="pt-24 min-h-screen bg-white">
      <SEO 
        title="Contact Six Row Brewing Consulting Pune | Call +91 8559907991 | Best Brewery Consultant India"
        description="Contact SRBC for microbrewery setup, brewpub consulting in Pune, Maharashtra. Call +91 8559907991 or email info@sixrowbrewing.com. Expert brewery consultants ready to help."
        keywords="contact brewery consultant Pune, microbrewery consultant phone number, brewpub setup inquiry Pune, Six Row Brewing Consulting contact, brewery consulting Pune Maharashtra"
      />
      
      <section className="relative h-48 md:h-64 overflow-hidden border-b-4 border-yellow-400">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=1920&h=800&fit=crop)' }}
        >
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-white px-6">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h1>
            <p className="text-lg md:text-xl text-yellow-400 italic font-semibold">Let's discuss your brewing goals</p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <div className="bg-yellow-50 p-6 md:p-8 shadow-lg border-4 border-yellow-400">
            <h3 className="text-xl md:text-2xl font-bold text-black mb-6 md:mb-8">Send Us a Message</h3>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label className="block mb-2 font-bold text-black text-sm md:text-base">Full Name</label>
                <input 
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  className="w-full p-3 md:p-4 border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-sm md:text-base"
                  placeholder="John Smith"
                />
              </div>
              <div>
                <label className="block mb-2 font-bold text-black text-sm md:text-base">Email</label>
                <input 
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  className="w-full p-3 md:p-4 border-2 border-gray-300 focus:border-yellow-400 focus:outline-none text-sm md:text-base"
                  placeholder="john@brewery.com"
                />
              </div>
              <div>
                <label className="block mb-2 font-bold text-black text-sm md:text-base">Message</label>
                <textarea 
                  value={form.message}
                  onChange={(e) => setForm({...form, message: e.target.value})}
                  className="w-full p-3 md:p-4 border-2 border-gray-300 focus:border-yellow-400 focus:outline-none resize-y min-h-[120px] md:min-h-[150px] text-sm md:text-base"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full px-8 md:px-12 py-3 md:py-4 bg-yellow-400 text-black font-bold uppercase hover:bg-yellow-500 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 md:space-y-8">
            <div className="bg-white p-6 md:p-8 shadow-lg border-4 border-gray-200">
              <h3 className="text-xl md:text-2xl font-bold text-black mb-6 md:mb-8">Our Office</h3>
              <div>
                <h4 className="font-bold text-yellow-500 mb-3 text-base md:text-lg">India Headquarters</h4>
                <p className="text-gray-700 mb-3 font-medium text-sm md:text-base">
                  📍 Six Row Brewing Consulting<br/>
                  Pune, Maharashtra<br/>
                  India
                </p>
                <p className="text-gray-700 font-medium text-sm md:text-base">
                  📞 +91 8559907991<br/>
                  📧 info@sixrowbrewing.com
                </p>
              </div>
            </div>

            <div className="bg-yellow-400 p-6 md:p-8 shadow-lg border-4 border-black">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-black">Need Help?</h3>
              <p className="mb-4 md:mb-6 text-black font-medium text-sm md:text-base">Call us for urgent consultations:</p>
              <p className="text-2xl md:text-4xl font-bold text-black">+91 8559907991</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ServiceDetailPage = ({ serviceId, goBack }) => {
  if (serviceId === 'audit') {
    return (
      <div className="pt-24 min-h-screen bg-white">
        <SEO 
          title="Brewery Performance Audit Services | Efficiency Benchmarking India - SRBC"
          description="Professional brewery performance audit with industry benchmarking. Optimize brewhouse efficiency, packaging, costs, and operations. Expert analysis in Pune, India."
          keywords="brewery audit India, brewery performance benchmarking, brewhouse efficiency audit, brewery cost analysis, microbrewery optimization Pune"
        />
        
        {/* Hero */}
        <section className="bg-black text-white py-12 md:py-16 border-b-4 border-yellow-400">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <button 
              onClick={goBack} 
              className="mb-6 text-yellow-400 font-semibold hover:text-yellow-300 transition-colors inline-flex items-center gap-2"
            >
              ← Back to Services
            </button>
            <div className="text-5xl md:text-6xl mb-6">📋</div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Brewery Performance Audit</h1>
            <p className="text-xl md:text-2xl text-yellow-400 mb-6 italic font-semibold">
              Is Your Brewery Operating at Peak Efficiency?
            </p>
            <p className="text-base md:text-lg lg:text-xl max-w-4xl">
              Comprehensive performance analysis with industry benchmarking to identify gaps and unlock hidden potential in your brewing operations.
            </p>
          </div>
        </section>

        {/* What We Audit */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12 text-center">What We Audit</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {[
                { icon: '⚗️', title: 'Production Efficiency', desc: 'Brewhouse utilization, batch consistency, yield rates, and production scheduling optimization.' },
                { icon: '✓', title: 'Quality Control Systems', desc: 'Testing protocols, QA procedures, product consistency, and quality documentation review.' },
                { icon: '💰', title: 'Cost Structure Analysis', desc: 'Raw material usage, waste reduction opportunities, and profitability per batch analysis.' },
                { icon: '⚙️', title: 'Equipment Performance', desc: 'Maintenance schedules, downtime analysis, upgrade needs, and equipment efficiency metrics.' },
                { icon: '👥', title: 'Staff Competency', desc: 'Skill gaps identification, SOP adherence, training needs, and team efficiency evaluation.' },
                { icon: '📋', title: 'Compliance & Safety', desc: 'Regulatory compliance status, safety protocols review, and documentation completeness.' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 md:p-8 border-l-4 border-yellow-400 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-3xl md:text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-3">{item.title}</h3>
                  <p className="text-gray-700 text-sm md:text-base">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audit Process */}
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12 text-center">Our 5-Step Audit Process</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
              {[
                { num: 1, title: 'Initial Assessment', desc: 'Review operations, collect data, interview team' },
                { num: 2, title: 'On-Site Inspection', desc: '2-3 day comprehensive evaluation' },
                { num: 3, title: 'Benchmarking', desc: 'Compare against industry standards' },
                { num: 4, title: 'Detailed Report', desc: 'Findings with actionable recommendations' },
                { num: 5, title: 'Implementation', desc: 'Optional ongoing support' }
              ].map((step) => (
                <div key={step.num} className="bg-yellow-50 p-4 md:p-6 border-4 border-yellow-400 text-center hover:bg-yellow-100 transition-colors">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-black text-yellow-400 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold mx-auto mb-4">
                    {step.num}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-black mb-2">{step.title}</h3>
                  <p className="text-gray-700 text-xs md:text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Benchmarks */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-6 text-center">Industry Performance Benchmarks</h2>
            <p className="text-center text-gray-700 mb-8 md:mb-12 max-w-3xl mx-auto text-base md:text-lg">
              Compare your brewery's performance against these industry standards for microbreweries and brewpubs in India.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {INDUSTRY_BENCHMARKS.map((benchmark, idx) => (
                <div key={idx} className="bg-white border-4 border-gray-200 p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-4xl md:text-5xl mb-4">{benchmark.icon}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-4">{benchmark.title}</h3>
                  <div className="space-y-4">
                    {benchmark.levels.map((level, levelIdx) => (
                      <div key={levelIdx}>
                        <div className="flex justify-between mb-2">
                          <span className="font-semibold text-gray-700 text-sm md:text-base">{level.label}</span>
                          <span className={`font-bold text-sm md:text-base ${
                            level.color === 'green' ? 'text-green-600' : 
                            level.color === 'yellow' ? 'text-yellow-600' : 
                            'text-red-600'
                          }`}>
                            {level.value}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 h-3 rounded-full">
                          <div 
                            className={`h-3 rounded-full ${
                              level.color === 'green' ? 'bg-green-500' : 
                              level.color === 'yellow' ? 'bg-yellow-400' : 
                              'bg-red-500'
                            }`}
                            style={{ width: level.width }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 mt-4 italic">{benchmark.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-12 md:py-16 bg-black">
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">Ready to Optimize Your Brewery?</h2>
            <p className="text-base md:text-xl text-white mb-8">
              Get a comprehensive performance audit and discover opportunities to improve efficiency, reduce costs, and boost profitability.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.hash = 'contact'}
                className="px-8 md:px-10 py-3 md:py-4 bg-yellow-400 text-black font-bold uppercase hover:bg-yellow-500 transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
              >
                Request Audit
              </button>
              <a
                href="https://wa.me/918559907991?text=Hello! I would like to schedule a brewery performance audit."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 md:px-10 py-3 md:py-4 bg-green-500 text-white font-bold uppercase hover:bg-green-600 transition-all shadow-lg hover:shadow-xl inline-block text-sm md:text-base"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const service = SERVICE_CONTENT[serviceId];
  
  if (service) {
    return (
      <div className="pt-24 min-h-screen bg-white">
        <section className="bg-black text-white py-12 md:py-16 border-b-4 border-yellow-400">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <button 
              onClick={goBack} 
              className="mb-6 text-yellow-400 font-semibold hover:text-yellow-300 transition-colors inline-flex items-center gap-2"
            >
              ← Back to Services
            </button>
            <div className="text-5xl md:text-6xl mb-6">{service.icon}</div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{service.title}</h1>
            <p className="text-xl md:text-2xl text-yellow-400 mb-6 italic font-semibold">{service.tagline}</p>
            <p className="text-base md:text-lg lg:text-xl max-w-4xl">{service.description}</p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12 text-center">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {service.offerings.map((offer, idx) => (
                <div key={idx} className="bg-white p-6 md:p-8 border-l-4 border-yellow-400 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="text-3xl md:text-4xl mb-4">{offer.icon}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-3">{offer.name}</h3>
                  <p className="text-gray-700 text-sm md:text-base">{offer.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12 text-center">Our Process</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {service.process.map((step, idx) => (
                <div key={idx} className="bg-yellow-50 p-4 md:p-6 border-4 border-yellow-400 text-center hover:bg-yellow-100 transition-colors">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-black text-yellow-400 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold mx-auto mb-4">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-black mb-2">{step.step}</h3>
                  <p className="text-gray-700 text-xs md:text-sm">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-black mb-8 md:mb-12 text-center">Expected Outcomes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {service.outcomes.map((outcome, idx) => (
                <div key={idx} className="bg-white p-4 md:p-6 border-l-4 border-yellow-400 shadow-lg flex items-center gap-4 hover:shadow-xl transition-shadow">
                  <span className="text-2xl md:text-3xl text-yellow-500 flex-shrink-0">✓</span>
                  <p className="text-base md:text-lg text-black font-medium">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-black">
          <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6">Ready to Get Started?</h2>
            <p className="text-base md:text-xl text-white mb-8">Contact us today to discuss your {service.title.toLowerCase()} needs.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.location.hash = 'contact'} 
                className="px-8 md:px-10 py-3 md:py-4 bg-yellow-400 text-black font-bold uppercase hover:bg-yellow-500 transition-all text-sm md:text-base"
              >
                Contact Us
              </button>
              <a 
                href="https://wa.me/918559907991" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="px-8 md:px-10 py-3 md:py-4 bg-green-500 text-white font-bold uppercase hover:bg-green-600 transition-all inline-block text-sm md:text-base"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-white">
      <section className="bg-black text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <button onClick={goBack} className="mb-6 text-yellow-400 font-semibold">← Back</button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Service Details</h1>
          <p className="text-lg md:text-xl">Details for this service coming soon.</p>
        </div>
      </section>
    </div>
  );
};

// ==================== MAIN APP ====================

export default function App() {
  const router = useRouter();
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Visitor counter logic
    const storedCount = localStorage.getItem('visitorCount');
    const currentCount = storedCount ? parseInt(storedCount) : 1247;
    
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      const newCount = currentCount + 1;
      setVisitorCount(newCount);
      localStorage.setItem('visitorCount', newCount.toString());
      sessionStorage.setItem('hasVisited', 'true');
    } else {
      setVisitorCount(currentCount);
    }

    // Simulate real-time updates
    const interval = setInterval(() => {
      setVisitorCount(prev => prev + Math.floor(Math.random() * 3));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-sans min-h-screen bg-white">
      <Navigation navigate={router.navigate} visitorCount={visitorCount} />
      
      {router.currentPage === 'home' && <HomePage navigate={router.navigate} />}
      {router.currentPage === 'services' && <ServicesPage navigate={router.navigate} />}
      {router.currentPage === 'contact' && <ContactPage />}
      {router.currentPage.startsWith('service-') && (
        <ServiceDetailPage 
          serviceId={router.currentPage.replace('service-', '')} 
          goBack={router.goBack}
        />
      )}

      <WhatsAppButton />

      <footer className="bg-black text-white py-8 md:py-12 border-t-4 border-yellow-400">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-yellow-400 mb-4">SRBC</h3>
          <p className="text-gray-300 mb-6 md:mb-8 font-medium text-sm md:text-base">
            Six Row Brewing Consulting - Expert brewing solutions for India
          </p>
          <p className="text-gray-400 text-sm">&copy; 2026 Six Row Brewing Consulting. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
