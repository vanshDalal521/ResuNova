import {
  FileText, TrendingUp, Clock, Brain, Layers, Target,
  BarChart3, Shield, Sparkles
} from 'lucide-react'

export const navLinks = ['Product', 'How It Works', 'Pricing', 'FAQ']

export const problemStats = [
  { num: '73%', label: 'of candidates fail due to poor prep', icon: FileText },
  { num: '4.2x', label: 'more interviews with tailored prep', icon: TrendingUp },
  { num: '30s', label: 'to generate a complete strategy', icon: Clock },
]

export const capabilities = [
  {
    id: 'analysis',
    title: 'AI Resume × JD Analysis',
    desc: 'Gemini 1.5 Flash cross-references your experience against role requirements with 98% semantic accuracy.',
    icon: Brain,
    metric: '98% match accuracy',
    color: '#C5D0F0',
    preview: 'analysis',
    previewContent: {
      label: 'Live Analysis View',
      summary: 'See exactly how your resume stacks up against any job description — skill by skill, gap by gap.',
      highlights: [
        { label: 'Role Match', value: '94%' },
        { label: 'Skills Matched', value: '18/24' },
        { label: 'Gaps Detected', value: '6' },
        { label: 'Confidence', value: 'High' },
      ],
      features: ['Semantic matching across 1M+ token context', 'Evidence-cited strength identification', 'Quantified gap analysis per requirement', 'Role-specific keyword alignment score'],
    }
  },
  {
    id: 'questions',
    title: 'Personalized Question Bank',
    desc: 'Technical + behavioral questions generated from your actual gaps — not generic lists.',
    icon: Target,
    metric: '50+ tailored questions',
    color: '#A7B7E7',
    preview: 'questions',
    previewContent: {
      label: 'Generated Questions',
      summary: 'Every question targets a specific gap found in your analysis — no filler, no generic LeetCode.',
      highlights: [
        { label: 'Technical', value: '32' },
        { label: 'Behavioral', value: '18' },
        { label: 'System Design', value: '8' },
        { label: 'Difficulty', value: 'Adaptive' },
      ],
      features: ['Role-specific technical depth calibration', 'Company-culture behavioral alignment', 'Follow-up question generation', 'Difficulty progression from current level'],
    }
  },
  {
    id: 'gaps',
    title: 'Skill Gap Roadmap',
    desc: 'Exact missing skills identified with priority-ranked learning resources and time estimates.',
    icon: BarChart3,
    metric: 'Priority-ranked gaps',
    color: '#8A9AD4',
    preview: 'gaps',
    previewContent: {
      label: 'Gap Analysis Dashboard',
      summary: 'Your missing skills ranked by impact, with curated learning paths and estimated close time.',
      highlights: [
        { label: 'Critical Gaps', value: '3' },
        { label: 'Moderate', value: '2' },
        { label: 'Minor', value: '1' },
        { label: 'Est. Close Time', value: '4 weeks' },
      ],
      features: ['Impact-priority ranking algorithm', 'Curated learning resources per gap', 'Time-to-close estimates per skill', 'Progress tracking with weekly milestones'],
    }
  },
  {
    id: 'plan',
    title: 'Day-by-Day Prep Plan',
    desc: 'Structured 7–30 day schedule telling you what to study, practice, and review each day.',
    icon: Layers,
    metric: '7–30 day roadmap',
    color: '#C5D0F0',
    preview: 'plan',
    previewContent: {
      label: 'Prep Calendar',
      summary: 'A complete day-by-day schedule that tells you exactly what to study, practice, and review.',
      highlights: [
        { label: 'Duration', value: '14 days' },
        { label: 'Study Hours', value: '42 total' },
        { label: 'Practice Sessions', value: '12' },
        { label: 'Mock Interviews', value: '3' },
      ],
      features: ['Adaptive timeline based on interview date', 'Daily study blocks with time estimates', 'Mixed topic rotation for retention', 'Built-in rest and review days'],
    }
  },
  {
    id: 'reports',
    title: 'Export-Ready Reports',
    desc: 'Professional PDF briefings you can bring to interviews — formatted, branded, actionable.',
    icon: FileText,
    metric: 'PDF + web view',
    color: '#A7B7E7',
    preview: 'reports',
    previewContent: {
      label: 'Export Preview',
      summary: 'Interview-ready PDF reports that impress recruiters and keep you on track.',
      highlights: [
        { label: 'Pages', value: '12–18' },
        { label: 'Format', value: 'PDF + Web' },
        { label: 'Sections', value: '6' },
        { label: 'Generated In', value: '~30s' },
      ],
      features: ['Professional formatting with branding', 'Executive summary for interviewers', 'Detailed gap analysis appendix', 'Printable one-page quick reference'],
    }
  },
  {
    id: 'privacy',
    title: 'Zero-Retention Privacy',
    desc: 'Your data processes in-memory, never stored. Delete account = instant purge. SOC2-ready.',
    icon: Shield,
    metric: 'Zero retention',
    color: '#8A9AD4',
    preview: 'privacy',
    previewContent: {
      label: 'Security Overview',
      summary: 'Enterprise-grade privacy with zero data retention. Your resume never leaves your control.',
      highlights: [
        { label: 'Data Retention', value: 'Zero' },
        { label: 'Encryption', value: 'AES-256' },
        { label: 'SOC2', value: 'In Progress' },
        { label: 'GDPR', value: 'Compliant' },
      ],
      features: ['In-memory processing only — no disk writes', 'Instant account deletion with full purge', 'No training data collection ever', 'End-to-end encryption in transit'],
    }
  },
]

export const socialProof = [
  {
    quote: 'ResuNova identified system design gaps I had zero awareness of. The day-by-day plan turned 6 weeks of panic into structured progress. Got the Google offer.',
    author: 'Sarah Chen',
    role: 'Senior Software Engineer',
    company: 'Google',
    avatar: 'SC',
    metric: 'L6 Offer',
    outcome: '3 weeks prep'
  },
  {
    quote: 'The behavioral questions were eerily accurate — same themes, same follow-ups as my actual Stripe loops. Felt like I had the answer key.',
    author: 'James Rodriguez',
    role: 'Product Manager',
    company: 'Stripe',
    avatar: 'JR',
    metric: 'PM Offer',
    outcome: '2 weeks prep'
  },
  {
    quote: 'Used it for three different applications. Each report was uniquely tailored to the company and role. The skill gap analysis saved me weeks of guessing.',
    author: 'Priya Sharma',
    role: 'Data Scientist',
    company: 'Netflix',
    avatar: 'PS',
    metric: 'DS Offer',
    outcome: '4 weeks prep'
  },
  {
    quote: 'As a career switcher, I had no idea how to translate my experience. ResuNova mapped my background to the role perfectly. Landed Meta.',
    author: 'Marcus Johnson',
    role: 'Frontend Engineer',
    company: 'Meta',
    avatar: 'MJ',
    metric: 'E5 Offer',
    outcome: '5 weeks prep'
  },
  {
    quote: 'The PDF export is interview-ready — I brought it to every loop. Interviewers were impressed by the preparation depth.',
    author: 'Aisha Patel',
    role: 'Backend Engineer',
    company: 'Airbnb',
    avatar: 'AP',
    metric: 'L5 Offer',
    outcome: '3 weeks prep'
  },
  {
    quote: 'Enterprise plan for our team. 12 engineers prepped, 11 offers. The custom benchmarking against our tech stack was a force multiplier.',
    author: 'David Kim',
    role: 'Engineering Manager',
    company: 'Databricks',
    avatar: 'DK',
    metric: 'Team Success',
    outcome: '92% offer rate'
  },
]

export const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: '/month',
    tagline: 'Get started for free',
    features: [
      { text: '3 interview reports/month', included: true },
      { text: 'AI resume × JD analysis', included: true },
      { text: 'Technical questions only', included: true },
      { text: 'Basic skill gap identification', included: true },
      { text: 'Web view only', included: true },
      { text: 'Email support (48hr)', included: true },
    ],
    cta: 'Get Started',
    popular: false,
    badge: null
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    tagline: 'Unlock unlimited potential',
    features: [
      { text: 'Unlimited reports', included: true },
      { text: 'Behavioral + technical questions', included: true },
      { text: 'Advanced skill gap roadmap', included: true },
      { text: 'Day-by-day prep calendar', included: true },
      { text: 'Professional PDF exports', included: true },
      { text: 'Priority support (4hr)', included: true },
    ],
    cta: 'Upgrade to Pro',
    popular: true,
    badge: 'Most Popular'
  },
]

export const faqs = [
  {
    q: 'How accurate is the AI analysis really?',
    a: 'Gemini 1.5 Flash processes your resume and the job description at 1M token context — it sees nuance other models miss. Our benchmark: 98% semantic match vs. human expert review on 500+ test cases. You\'ll see specific evidence citations, not vague summaries.'
  },
  {
    q: 'What if I\'m switching careers or have non-traditional experience?',
    a: 'This is where ResuNova excels. The AI maps transferable skills, reframes your narrative, and identifies exactly which gaps matter for your target role. Career switchers are our highest-success segment — 94% report feeling "well-prepared" post-analysis.'
  },
  {
    q: 'Can I use one report for multiple applications?',
    a: 'Each report is tailored to a specific job description. The Pro plan includes unlimited reports — generate a fresh, optimized strategy for every role you target. The Free tier gives you 3/month to start.'
  },
  {
    q: 'Is my resume data used for training?',
    a: 'Absolutely not. Zero retention. Your resume and JD process in-memory for analysis only, then immediately discarded. No logs, no training, no analytics on your content. Delete your account and every trace is gone instantly. SOC2 Type II audit in progress.'
  },
  {
    q: 'What file formats and sizes are supported?',
    a: 'PDF and DOCX up to 5MB. You can also paste a plain-text resume or LinkedIn profile URL. The parser handles complex formatting, columns, and embedded graphics gracefully.'
  },
  {
    q: 'How long does a full report take?',
    a: 'Typically 15–30 seconds. Complex resumes (10+ years, multiple roles) may take up to 45s. You\'ll see a live progress indicator with stage breakdown: parsing → analysis → question generation → plan synthesis → formatting.'
  },
]

export const footerLinks = {
  Product: ['Features', 'Pricing', 'Integrations', 'Changelog', 'Roadmap', 'API Docs'],
  Company: ['About', 'Blog', 'Careers', 'Press', 'Contact', 'Partner Program'],
  Resources: ['Interview Guides', 'Salary Data', 'Company Database', 'Community', 'Webinars', 'Templates'],
  Legal: ['Privacy', 'Terms', 'Security', 'Cookies', 'GDPR', 'DPA'],
}

export const footerLinkPaths = {
  'Features': '/features',
  'Pricing': '/pricing',
  'Integrations': '/integrations',
  'Changelog': '/changelog',
  'Roadmap': '/roadmap',
  'API Docs': '/api-docs',
  'About': '/about',
  'Blog': '/blog',
  'Careers': '/careers',
  'Press': '/press',
  'Contact': '/contact',
  'Partner Program': '/partner-program',
  'Interview Guides': '/interview-guides',
  'Salary Data': '/salary-data',
  'Company Database': '/company-database',
  'Community': '/community',
  'Webinars': '/webinars',
  'Templates': '/templates',
  'Privacy': '/privacy',
  'Terms': '/terms',
  'Security': '/security',
  'Cookies': '/cookies',
  'GDPR': '/gdpr',
  'DPA': '/dpa',
}

export const steps = [
  { num: '01', title: 'Upload & Target', desc: 'Drop your resume (PDF/DOCX) or paste LinkedIn. Add any job description — we parse requirements automatically.' },
  { num: '02', title: 'AI Cross-Reference', desc: 'Gemini 1.5 Flash maps your experience to the role at semantic level. Evidence-cited strengths, quantified gaps.' },
  { num: '03', title: 'Get Your Blueprint', desc: 'Receive tailored questions, priority gap roadmap, day-by-day plan, and export-ready PDF — all in ~30 seconds.' },
]

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

export const fadeUp = (delay = 0) => ({
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] } },
})
