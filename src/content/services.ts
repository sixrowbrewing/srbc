import {
  Factory,
  FlaskConical,
  Cog,
  ShieldCheck,
  BarChart3,
  Leaf,
  Beer,
  ClipboardCheck,
  TrendingUp,
  Coins,
  CalendarRange,
  ClipboardList,
  Zap,
  LineChart,
  Microscope,
  Target,
  Sprout,
  Bug,
  Ruler,
  FileBarChart,
  Building2,
  LayoutGrid,
  Wrench,
  HardHat,
  Rocket,
  TestTube2,
  ListChecks,
  SmilePlus,
  Scale,
  FileText,
  TrendingDown,
  Map,
  Recycle,
  Droplets,
  Globe,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  type LucideIcon,
} from "lucide-react";
import type { ServiceDetail, ServiceSlug, ServiceSummary } from "@/types/service";

const heroImages: Record<ServiceSlug, string> = {
  operations:
    "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=1200&h=720&fit=crop",
  recipe:
    "https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=1200&h=720&fit=crop",
  engineering:
    "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1200&h=720&fit=crop",
  quality:
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&h=720&fit=crop",
  strategy:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=720&fit=crop",
  sustainability:
    "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=1200&h=720&fit=crop",
  microbrewery:
    "https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=1200&h=720&fit=crop",
  audit:
    "https://images.unsplash.com/photo-1554224311-beee460ae6ba?w=1200&h=720&fit=crop",
};

export const services: ServiceDetail[] = [
  {
    slug: "operations",
    icon: Factory,
    title: "Operations & Manufacturing",
    shortTitle: "Operations",
    tagline: "Optimize Every Aspect of Your Brewing Operation",
    description:
      "Maximize efficiency, reduce waste, and improve product quality with proven operational methodologies.",
    image: heroImages.operations,
    offerings: [
      {
        icon: TrendingUp,
        name: "Process Optimization",
        description:
          "Streamline brewing processes to increase throughput and reduce cycle times.",
      },
      {
        icon: Coins,
        name: "Cost Reduction",
        description:
          "Identify and eliminate waste with systematic cost reduction approaches.",
      },
      {
        icon: CalendarRange,
        name: "Production Planning",
        description:
          "Advanced planning systems balancing capacity, demand, and inventory.",
      },
      {
        icon: ClipboardList,
        name: "SOPs Development",
        description:
          "Comprehensive standard operating procedures for consistency.",
      },
      {
        icon: Zap,
        name: "Lean Manufacturing",
        description: "Apply lean principles adapted for brewing operations.",
      },
      {
        icon: LineChart,
        name: "Performance Metrics",
        description: "KPIs and dashboards for real-time operational visibility.",
      },
    ],
    process: [
      { step: "Assessment", description: "Evaluate current operations and identify opportunities" },
      { step: "Design", description: "Develop customized solutions for your needs" },
      { step: "Implementation", description: "Deploy new processes with minimal disruption" },
      { step: "Optimization", description: "Continuous monitoring and refinement" },
    ],
    outcomes: [
      "15-30% cost reduction",
      "20-40% throughput improvement",
      "50% quality variance reduction",
      "Enhanced productivity",
      "Better inventory management",
      "Improved capacity utilization",
    ],
  },
  {
    slug: "recipe",
    icon: FlaskConical,
    title: "Recipe Development",
    shortTitle: "Recipe Development",
    tagline: "Craft Exceptional Beers That Define Your Brand",
    description:
      "Create products that resonate with consumers using brewing science and market insight.",
    image: heroImages.recipe,
    offerings: [
      {
        icon: Microscope,
        name: "New Product Development",
        description: "Full-service recipe creation from concept to commercialization.",
      },
      {
        icon: Target,
        name: "Recipe Optimization",
        description: "Refine existing recipes for consistency and cost efficiency.",
      },
      {
        icon: TestTube2,
        name: "Pilot Brewing",
        description: "Rapid iteration and testing on pilot brewing systems.",
      },
      {
        icon: Sprout,
        name: "NA Beer Development",
        description: "Premium non-alcoholic beers with advanced brewing techniques.",
      },
      {
        icon: Bug,
        name: "Probiotic Beers",
        description: "Innovative functional beers with beneficial bacteria strains.",
      },
      {
        icon: Ruler,
        name: "Scale-up Support",
        description: "Technical guidance from pilot to commercial production.",
      },
    ],
    process: [
      { step: "Discovery", description: "Understand brand vision and target market" },
      { step: "Concept", description: "Create recipe concepts with flavor profiles" },
      { step: "Pilot Brewing", description: "Iterative brewing and refinement" },
      { step: "Launch", description: "Scale-up engineering and market entry" },
    ],
    outcomes: [
      "Market-ready recipes in 4-8 weeks",
      "Award-winning formulations",
      "Reduced raw material costs",
      "Differentiated portfolio",
      "NA & functional beer expertise",
      "Competitive positioning",
    ],
  },
  {
    slug: "engineering",
    icon: Cog,
    title: "Engineering & Design",
    shortTitle: "Engineering",
    tagline: "Build Your Brewery Right the First Time",
    description:
      "Complete brewery design and construction management from feasibility through commissioning.",
    image: heroImages.engineering,
    offerings: [
      {
        icon: FileBarChart,
        name: "Feasibility Studies",
        description: "Comprehensive site analysis and project economics.",
      },
      {
        icon: Building2,
        name: "Process Design",
        description: "Complete engineering with equipment specs and P&IDs.",
      },
      {
        icon: LayoutGrid,
        name: "Facility Layout",
        description: "Optimized layouts maximizing efficiency and expansion.",
      },
      {
        icon: Wrench,
        name: "Equipment Selection",
        description: "Vendor-neutral procurement guidance.",
      },
      {
        icon: HardHat,
        name: "Project Management",
        description: "End-to-end construction oversight.",
      },
      {
        icon: Rocket,
        name: "Commissioning",
        description: "Hands-on startup assistance and training.",
      },
    ],
    process: [
      { step: "Concept", description: "Define scope, capacity, budget and timeline" },
      { step: "Engineering", description: "Complete design deliverables and specs" },
      { step: "Build", description: "Construction oversight and quality assurance" },
      { step: "Startup", description: "Commissioning, training and production support" },
    ],
    outcomes: [
      "On-schedule delivery",
      "5-15% under budget",
      "Optimized efficiency",
      "Future-proof designs",
      "Minimized risks",
      "Faster time to market",
    ],
  },
  {
    slug: "quality",
    icon: ShieldCheck,
    title: "Quality Assurance",
    shortTitle: "Quality",
    tagline: "Build Quality Into Every Batch",
    description:
      "Establish quality management systems ensuring consistency and regulatory compliance.",
    image: heroImages.quality,
    offerings: [
      {
        icon: ClipboardList,
        name: "QMS Implementation",
        description: "Complete quality system design and deployment.",
      },
      {
        icon: Microscope,
        name: "Lab Setup",
        description: "Equipment selection and method validation.",
      },
      {
        icon: ListChecks,
        name: "Testing Protocols",
        description: "Comprehensive sampling and quality procedures.",
      },
      {
        icon: SmilePlus,
        name: "Sensory Programs",
        description: "Trained panels and flavor quality standards.",
      },
      {
        icon: LineChart,
        name: "Statistical Control",
        description: "Real-time monitoring and trend analysis.",
      },
      {
        icon: Scale,
        name: "Compliance Support",
        description: "Regulatory requirements and certifications.",
      },
    ],
    process: [
      { step: "Assessment", description: "Evaluate current systems and identify gaps" },
      { step: "QMS Design", description: "Develop tailored quality management system" },
      { step: "Implementation", description: "Deploy systems with training and documentation" },
      { step: "Validation", description: "Verify effectiveness and continuous improvement" },
    ],
    outcomes: [
      "70% reduction in quality incidents",
      "ISO/FSSC certification",
      "Improved shelf-life",
      "Enhanced brand reputation",
      "Reduced complaints",
      "Better compliance",
    ],
  },
  {
    slug: "strategy",
    icon: BarChart3,
    title: "Strategy & Finance",
    shortTitle: "Strategy",
    tagline: "Make Informed Decisions for Sustainable Growth",
    description:
      "Strategic planning backed by brewing expertise and financial rigor.",
    image: heroImages.strategy,
    offerings: [
      {
        icon: FileText,
        name: "Business Planning",
        description: "Comprehensive plans for ventures and expansions.",
      },
      {
        icon: TrendingUp,
        name: "Financial Modeling",
        description: "Detailed projections and ROI analysis.",
      },
      {
        icon: Target,
        name: "Market Analysis",
        description: "In-depth research and positioning strategies.",
      },
      {
        icon: Coins,
        name: "Valuation Services",
        description: "Professional valuations for M&A and investment.",
      },
      {
        icon: TrendingDown,
        name: "Performance Improvement",
        description: "Diagnostic assessments and turnaround strategies.",
      },
      {
        icon: Map,
        name: "Strategic Planning",
        description: "Long-range planning with execution roadmaps.",
      },
    ],
    process: [
      { step: "Analysis", description: "Review business, market and competitive landscape" },
      { step: "Strategy", description: "Develop options with financial impact analysis" },
      { step: "Planning", description: "Create detailed execution plans with milestones" },
      { step: "Support", description: "Ongoing guidance and course corrections" },
    ],
    outcomes: [
      "Data-driven decisions",
      "Successful capital raises",
      "Profitable market entry",
      "Improved profitability",
      "Successful M&A",
      "Clear growth roadmap",
    ],
  },
  {
    slug: "sustainability",
    icon: Leaf,
    title: "Sustainability Solutions",
    shortTitle: "Sustainability",
    tagline: "Profitable Environmental Responsibility",
    description:
      "Practical sustainability programs reducing impact while improving efficiency.",
    image: heroImages.sustainability,
    offerings: [
      {
        icon: FileBarChart,
        name: "Sustainability Assessments",
        description: "Comprehensive environmental footprint evaluation.",
      },
      {
        icon: Recycle,
        name: "Waste Reduction",
        description: "Zero-waste strategies and circular economy.",
      },
      {
        icon: Zap,
        name: "Energy Efficiency",
        description: "Energy audits and renewable integration.",
      },
      {
        icon: Droplets,
        name: "Water Management",
        description: "Conservation and recycling systems.",
      },
      {
        icon: Globe,
        name: "Carbon Reduction",
        description: "Carbon accounting and offset programs.",
      },
      {
        icon: CheckCircle2,
        name: "Certification Support",
        description: "B-Corp, ISO 14001 and green certifications.",
      },
    ],
    process: [
      { step: "Baseline", description: "Establish current environmental performance" },
      { step: "Opportunity", description: "Identify improvements with cost-benefit analysis" },
      { step: "Implementation", description: "Deploy prioritized sustainability initiatives" },
      { step: "Reporting", description: "Measure results and continuous improvement" },
    ],
    outcomes: [
      "25-40% energy cost reduction",
      "30-50% water reduction",
      "80-95% waste diversion",
      "Enhanced brand value",
      "Better compliance",
      "Positive ROI",
    ],
  },
  {
    slug: "microbrewery",
    icon: Beer,
    title: "Microbrewery & Brewpub Consulting",
    shortTitle: "Microbrewery & Brewpub",
    tagline: "Your Partner in Craft Brewing Success",
    description:
      "Specialized consulting for microbreweries and brewpubs from concept to operation.",
    image: heroImages.microbrewery,
    offerings: [
      {
        icon: Rocket,
        name: "Startup Consulting",
        description: "Complete launch guidance including licensing and planning.",
      },
      {
        icon: Building2,
        name: "Brewpub Design",
        description: "Integrated brewery and restaurant design.",
      },
      {
        icon: FileText,
        name: "Licensing Support",
        description: "Navigate alcohol licensing and regulations.",
      },
      {
        icon: FlaskConical,
        name: "Recipe Portfolio",
        description: "Craft unique beers defining your brand.",
      },
      {
        icon: GraduationCap,
        name: "Operations Training",
        description: "Hands-on staff training and SOPs.",
      },
      {
        icon: Briefcase,
        name: "Business Optimization",
        description: "Revenue optimization and profitability strategies.",
      },
    ],
    process: [
      { step: "Concept", description: "Define unique concept and market positioning" },
      { step: "Planning", description: "Business plan, design and financial projections" },
      { step: "Setup", description: "Licensing, construction and staff training" },
      { step: "Support", description: "Ongoing operational and business support" },
    ],
    outcomes: [
      "Faster time to market",
      "Optimized investment",
      "Strong brand presence",
      "Profitability within 12 months",
      "Award-winning beers",
      "Sustainable model",
    ],
  },
  {
    slug: "audit",
    icon: ClipboardCheck,
    title: "Brewery Performance Audit",
    shortTitle: "Performance Audit",
    tagline: "Is Your Brewery Operating at Peak Efficiency?",
    description:
      "Comprehensive performance analysis with industry benchmarking to identify gaps and unlock hidden potential in your brewing operations.",
    image: heroImages.audit,
    offerings: [
      {
        icon: FlaskConical,
        name: "Production Efficiency",
        description:
          "Brewhouse utilization, batch consistency, yield rates, and production scheduling optimization.",
      },
      {
        icon: ShieldCheck,
        name: "Quality Control Systems",
        description:
          "Testing protocols, QA procedures, product consistency, and quality documentation review.",
      },
      {
        icon: Coins,
        name: "Cost Structure Analysis",
        description:
          "Raw material usage, waste reduction opportunities, and profitability per batch analysis.",
      },
      {
        icon: Cog,
        name: "Equipment Performance",
        description:
          "Maintenance schedules, downtime analysis, upgrade needs, and equipment efficiency metrics.",
      },
      {
        icon: GraduationCap,
        name: "Staff Competency",
        description:
          "Skill gaps identification, SOP adherence, training needs, and team efficiency evaluation.",
      },
      {
        icon: ClipboardList,
        name: "Compliance & Safety",
        description:
          "Regulatory compliance status, safety protocols review, and documentation completeness.",
      },
    ],
    process: [
      { step: "Initial Assessment", description: "Review operations, collect data, interview team" },
      { step: "On-Site Inspection", description: "2-3 day comprehensive evaluation" },
      { step: "Benchmarking", description: "Compare against industry standards" },
      { step: "Detailed Report", description: "Findings with actionable recommendations" },
      { step: "Implementation", description: "Optional ongoing support" },
    ],
    outcomes: [
      "Identify efficiency gaps",
      "Industry benchmark comparison",
      "Actionable recommendations",
      "Cost reduction roadmap",
      "Quality improvement plan",
      "Compliance verification",
    ],
  },
];

export const featuredServiceSlugs: ServiceSlug[] = ["operations", "recipe", "microbrewery"];

export const serviceMap: Record<ServiceSlug, ServiceDetail> = services.reduce(
  (acc, service) => {
    acc[service.slug] = service;
    return acc;
  },
  {} as Record<ServiceSlug, ServiceDetail>,
);

export function getService(slug: string): ServiceDetail | undefined {
  return serviceMap[slug as ServiceSlug];
}

export function getServiceSummaries(): ServiceSummary[] {
  return services.map(({ slug, icon, title, shortTitle, description, image }) => ({
    slug,
    icon,
    title,
    shortTitle,
    description,
    image,
  }));
}

export type { LucideIcon };
