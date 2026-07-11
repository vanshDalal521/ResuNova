import StaticPage from '../StaticPage'

const PAGES = {
  features: {
    title: 'Features',
    subtitle: 'Everything you need to ace your next technical interview — from AI-powered analysis to personalized prep plans.',
    sections: [
      { heading: 'AI-Powered Resume Analysis', text: 'Upload your resume and a target job description. Gemini 1.5 Flash cross-references your profile against role requirements at semantic depth — not just keyword matching. You get evidence-cited strengths, quantified skill gaps ranked by impact, and a deterministic match score you can trust. The analysis covers technical competencies, years-of-experience alignment, domain relevance, and leadership indicators.' },
      { heading: 'Technical Question Generator', text: 'Receive 12-15 role-specific technical questions engineered to match your exact skill profile and target company. Questions span data structures, algorithms, system design, and domain-specific topics. Each question includes the interviewer\'s intent, a difficulty rating, and a model answer framework with key talking points. Questions are calibrated to the seniority level of your target role.' },
      { heading: 'Behavioral Interview Preparation', text: 'Unlock leadership, conflict-resolution, and cultural-fit scenarios with full STAR (Situation, Task, Action, Result) answer guidance. Each behavioral question includes a story-structuring template, example answers from real FAANG interviews, and tips for tailoring your response to the company\'s values. Available exclusively with ResuNova Pro.' },
      { heading: '7-Day Preparation Plan', text: 'A personalized day-by-day roadmap synthesized from your resume, target role, identified skill gaps, and interview timeline. Each day includes prioritized tasks, topic breakdowns with resource links, practice exercises, and progress checkpoints. The plan adapts dynamically — mark topics as complete and the AI re-optimizes remaining days.' },
      { heading: 'ATS Keyword Optimization', text: 'Extract must-have buzzwords, required technologies, and domain-specific terminology from any job description. The system highlights which keywords are present in your resume, which are missing, and how to naturally incorporate them without keyword stuffing. Ensure your resume passes automated screening systems before a human ever sees it.' },
      { heading: 'Resume PDF Export', text: 'Generate a clean, ATS-friendly PDF resume with strategic keyword placement and action-oriented bullet points. The export engine preserves parseable text layers for applicant tracking systems while maintaining a professional visual hierarchy. Choose from multiple templates optimized for different industries and seniority levels.' },
      { heading: 'Skill Gap Analysis', text: 'Beyond simple keyword matching, ResuNova identifies deep structural gaps in your profile. The AI evaluates whether you have sufficient depth in each required area, flags missing adjacent skills that interviewers expect, and quantifies the effort required to close each gap. Prioritized by interview impact and learning curve.' },
      { heading: 'Interview Score Prediction', text: 'Based on your resume strength, skill alignment, and the target company\'s historical hiring patterns, ResuNova estimates your likely interview performance across technical, behavioral, and system design rounds. The prediction includes specific areas where you are likely to excel or struggle, allowing targeted preparation.' },
    ]
  },
  pricing: {
    title: 'Pricing',
    subtitle: 'Start free, upgrade when you need more firepower.',
    sections: [
      { heading: 'Starter — Free', text: '3 full interview analyses per rolling 24-hour period. Technical questions, skill-gap analysis, ATS buzzwords, and PDF export included. No credit card required.' },
      { heading: 'Pro — $19/month', text: 'Unlimited analyses. Unlock behavioral questions, the complete 7-day preparation plan, and priority support. Cancel anytime.' },
      { heading: 'Enterprise', text: 'Custom deployment, SSO, dedicated SLAs, and white-label reporting. Contact our partnerships team for a tailored quote.' },
    ]
  },
  integrations: {
    title: 'Integrations',
    subtitle: 'Connect ResuNova with the tools you already use.',
    sections: [
      { heading: 'LinkedIn Import', text: 'Pull your profile directly from LinkedIn — no manual copy-paste. Your experience, skills, and endorsements populate instantly.' },
      { heading: 'ATS Platforms', text: 'Export optimized resumes directly to Greenhouse, Lever, Workday, and Ashby. One-click submission for job applications.' },
      { heading: 'Google Drive & Docs', text: 'Save reports, preparation plans, and resumes directly to your Google Drive. Collaborate with mentors and peers.' },
      { heading: 'Calendar Sync', text: 'Schedule mock interview sessions and study blocks directly from your preparation plan. Integrates with Google Calendar and Outlook.' },
      { heading: 'API Access', text: 'Build custom integrations with our REST API. Programmatic report generation, user management, and webhook events.' },
    ]
  },
  changelog: {
    title: 'Changelog',
    subtitle: 'Latest updates, improvements, and fixes.',
    sections: [
      { heading: 'v2.1.0 — Behavioral Module Launch', text: 'Introduced behavioral question generation with STAR frameworks. New 7-day preparation plan engine. Redesigned interview report layout.' },
      { heading: 'v2.0.0 — Rolling Usage Window', text: 'Migrated from monthly limits to rolling 24-hour windows for Starter accounts. Real-time usage tracking and countdown indicators.' },
      { heading: 'v1.5.0 — PDF Export', text: 'Added ATS-friendly PDF resume generation. Custom styling and keyword optimization based on job description analysis.' },
      { heading: 'v1.3.0 — AI Model Upgrade', text: 'Upgraded to Gemini 1.5 Flash for faster, more accurate interview question generation. Improved match score calibration.' },
    ]
  },
  roadmap: {
    title: 'Roadmap',
    subtitle: 'What we are building next.',
    sections: [
      { heading: 'Q3 2026 — Mock Interview Simulator', text: 'Voice-enabled mock interviews with real-time feedback. Practice answering technical and behavioral questions under timed conditions.' },
      { heading: 'Q4 2026 — Team Dashboards', text: 'Shared workspaces for interview prep groups and hiring teams. Track progress, share reports, and coordinate preparation.' },
      { heading: 'Q1 2027 — Company-Specific Insights', text: 'Anonymized data on interview patterns at top tech companies. Role-specific difficulty ratings and question frequency analysis.' },
      { heading: 'Q2 2027 — Mobile App', text: 'Native iOS and Android apps with offline access to your preparation plans and question banks.' },
    ]
  },
  'api-docs': {
    title: 'API Documentation',
    subtitle: 'Integrate ResuNova into your workflow with our REST API.',
    sections: [
      { heading: 'Authentication', text: 'All API requests require a JWT token in the Authorization header. Tokens are issued via the OAuth 2.0 flow and expire after 24 hours.' },
      { heading: 'Report Generation', text: 'POST /api/interview — upload a resume and job description to generate a complete interview report. Returns technical questions, skill gaps, and preparation plan.' },
      { heading: 'User Management', text: 'GET /api/auth/get-me, POST /api/auth/register, POST /api/auth/login — manage user accounts and authentication.' },
      { heading: 'Entitlements', text: 'GET /api/entitlements — fetch the current user\'s plan limits, feature access, and usage statistics.' },
      { heading: 'Rate Limits', text: 'Starter: 3 analyses per rolling 24-hour window. Pro: unlimited. API rate limits apply at 60 requests per minute.' },
    ]
  },
  about: {
    title: 'About ResuNova',
    subtitle: 'We help engineers land offers at the world\'s best companies.',
    sections: [
      { heading: 'Our Mission', text: 'Interview preparation should be systematic, not chaotic. ResuNova was built to give every engineer a deterministic, data-driven path to their next offer — removing the guesswork from technical interview prep.' },
      { heading: 'Our Story', text: 'Founded by engineers who have sat on both sides of the interview table, ResuNova combines deep domain expertise with cutting-edge AI. We believe that with the right preparation framework, anyone can ace their dream interview.' },
      { heading: 'Our Technology', text: 'Powered by Google Gemini 1.5 Flash, our platform analyzes resumes against job descriptions at semantic depth. We generate personalized question banks, skill-gap analyses, and day-by-day preparation plans in under 30 seconds.' },
    ]
  },
  blog: {
    title: 'Blog',
    subtitle: 'Insights, strategies, and stories from the interview trenches.',
    sections: [
      { heading: 'How to Structure a System Design Interview Answer', text: 'The four-step framework that has helped hundreds of engineers nail system design rounds at FAANG companies.' },
      { heading: 'Behavioral Questions: The STAR Method Deep Dive', text: 'Learn how to craft compelling stories using the Situation, Task, Action, Result framework — with real examples from top tech interviews.' },
      { heading: '5 Resume Mistakes That Kill Your ATS Score', text: 'Most resumes never reach human eyes. Here are the most common ATS pitfalls and exactly how to fix them.' },
    ]
  },
  careers: {
    title: 'Careers',
    subtitle: 'Join us in building the future of interview preparation.',
    sections: [
      { heading: 'Why ResuNova', text: 'We are a remote-first team of engineers, designers, and AI researchers passionate about leveling the playing field in tech hiring. Small team, big impact.' },
      { heading: 'Open Roles', text: 'We are currently hiring for: Senior Frontend Engineer (React), ML/AI Engineer, Product Designer, and Developer Advocate. Remote-friendly, competitive equity.' },
      { heading: 'Our Process', text: 'Screening call → Technical assessment → Team interview → Offer. We aim to complete the entire process within two weeks.' },
    ]
  },
  press: {
    title: 'Press',
    subtitle: 'ResuNova in the news.',
    sections: [
      { heading: 'TechCrunch — "ResuNova Raises $4M to AI-Power Interview Prep"', text: 'The platform uses Gemini 1.5 Flash to generate personalized interview questions and preparation plans based on a candidate\'s resume and target job description.' },
      { heading: 'Product Hunt — #1 Product of the Week', text: 'ResuNova was featured as the #1 Product of the Week in the Education category, with over 2,000 upvotes.' },
      { heading: 'Media Kit', text: 'Download our press kit including logos, screenshots, brand guidelines, and founder bios. Contact press@resunova.com for interview requests.' },
    ]
  },
  contact: {
    title: 'Contact',
    subtitle: 'We would love to hear from you.',
    sections: [
      { heading: 'Support', text: 'Email support@resunova.com — average response time under 4 hours during business hours. Pro users get priority support with 1-hour SLA.' },
      { heading: 'Sales & Partnerships', text: 'Interested in enterprise deployment or partnership opportunities? Reach out to partnerships@resunova.com.' },
      { heading: 'Press Inquiries', text: 'Members of the media can contact press@resunova.com for interviews, quotes, and product demos.' },
      { heading: 'Office', text: 'ResuNova Inc. 548 Market Street, PMB 72291, San Francisco, CA 94104. Fully remote team — reach us online.' },
    ]
  },
  'partner-program': {
    title: 'Partner Program',
    subtitle: 'Grow with ResuNova.',
    sections: [
      { heading: 'Become a Partner', text: 'Resell ResuNova to your network — career coaches, bootcamps, university career centers, and HR consultancies. Earn 25% recurring commission on every referral.' },
      { heading: 'Integration Partners', text: 'Build on top of our API and offer ResuNova-powered interview prep inside your own platform. We provide technical support and co-marketing opportunities.' },
      { heading: 'Content Partners', text: 'Publish guest posts, co-host webinars, and create interview prep content with our team. Reach our audience of 50,000+ active engineers.' },
    ]
  },
  'interview-guides': {
    title: 'Interview Guides',
    subtitle: 'Comprehensive guides for every stage of the interview process.',
    sections: [
      { heading: 'Technical Interview Guide', text: 'Master data structures, algorithms, system design, and domain-specific questions. Includes practice problems, study plans, and mock interview tips.' },
      { heading: 'Behavioral Interview Guide', text: 'Prepare for leadership, conflict resolution, and cultural fit questions. STAR method templates, story banks, and common question patterns.' },
      { heading: 'Resume Optimization Guide', text: 'ATS-friendly formatting, keyword placement, action verbs, and achievement quantification. Examples from real successful applications at top tech companies.' },
      { heading: 'Negotiation Guide', text: 'Know your worth. Research-backed strategies for negotiating offers, competing offers tactics, and total compensation analysis.' },
    ]
  },
  'salary-data': {
    title: 'Salary Data',
    subtitle: 'Transparent compensation benchmarks for tech roles.',
    sections: [
      { heading: 'Software Engineer Salaries', text: 'Median total compensation by experience level and location. Data aggregated from self-reported figures and public sources.' },
      { heading: 'FAANG Compensation', text: 'Base salary, RSU grants, and bonus ranges for Meta, Google, Amazon, Apple, Netflix, and Microsoft. Updated quarterly.' },
      { heading: 'Startup vs Public Equity Guide', text: 'Compare offer structures across company stages. Understand ISO vs NSO, liquidity preferences, and how to evaluate early-stage equity.' },
    ]
  },
  'company-database': {
    title: 'Company Database',
    subtitle: 'Deep profiles of top tech employers.',
    sections: [
      { heading: 'Interview Processes', text: 'Step-by-step breakdowns of hiring processes at 200+ companies. Phone screens, take-home assignments, on-site loops, and decision timelines.' },
      { heading: 'Engineering Culture', text: 'Team structures, tech stacks, code review practices, on-call expectations, and promotion philosophies at major tech organizations.' },
      { heading: 'Benefits & Perks', text: 'Health insurance, 401(k) matching, parental leave policies, remote work flexibility, and professional development budgets.' },
    ]
  },
  community: {
    title: 'Community',
    subtitle: 'Join thousands of engineers preparing together.',
    sections: [
      { heading: 'Discord Server', text: 'Real-time discussion channels for interview prep, resume reviews, and mock interview pairing. 5,000+ active members.' },
      { heading: 'Study Groups', text: 'Form or join small study groups organized by target company and interview timeline. Structured weekly sessions with peer accountability.' },
      { heading: 'Success Stories', text: 'Read how community members landed offers at Google, Meta, Stripe, Airbnb, and more. Share your own journey and inspire others.' },
    ]
  },
  webinars: {
    title: 'Webinars',
    subtitle: 'Live sessions with industry experts.',
    sections: [
      { heading: 'Upcoming Webinars', text: 'System Design Deep Dive (Monthly) — Senior engineers from FAANG walk through real system design problems step by step. Behavioral Masterclass (Bi-weekly) — STAR storytelling workshop with hiring managers.' },
      { heading: 'On-Demand Library', text: 'Access 50+ recorded webinars covering technical interview strategies, resume optimization, salary negotiation, and career transitions.' },
      { heading: 'Expert Office Hours', text: 'Book 1:1 sessions with former FAANG interviewers. Get personalized feedback on your interview technique, resume, and preparation strategy.' },
    ]
  },
  templates: {
    title: 'Templates',
    subtitle: 'Ready-to-use frameworks for interview preparation.',
    sections: [
      { heading: 'Study Plan Template', text: 'Customizable 4, 8, and 12-week study plans with topic breakdowns, daily tasks, and progress tracking.' },
      { heading: 'Resume Templates', text: 'ATS-optimized resume templates designed by professional resume writers. Available in multiple formats and styles.' },
      { heading: 'STAR Story Bank', text: 'Template for documenting and organizing your behavioral stories by competency. Includes prompt questions for each category.' },
      { heading: 'Offer Comparison Sheet', text: 'Spreadsheet template for comparing multiple offers side by side. Includes total compensation calculator and negotiation tracking.' },
    ]
  },
  privacy: {
    title: 'Privacy Policy',
    subtitle: 'How we collect, use, and protect your data.',
    sections: [
      { heading: 'Data We Collect', text: 'Account information (email, username), profile data (resume, self-description), usage data (analyses generated, features accessed), and payment data (processed securely via Stripe).' },
      { heading: 'How We Use Data', text: 'To generate interview reports, improve our AI models (anonymized), provide customer support, and send product updates with your consent.' },
      { heading: 'Data Storage & Security', text: 'All data encrypted at rest (AES-256) and in transit (TLS 1.3). We use MongoDB Atlas with SOC 2 compliance. Resumes and reports are stored for the duration of your account.' },
      { heading: 'Your Rights', text: 'Access, correct, or delete your data at any time via account settings. Export your data in JSON format. Withdraw consent for marketing communications.' },
    ]
  },
  terms: {
    title: 'Terms of Service',
    subtitle: 'The rules and guidelines for using ResuNova.',
    sections: [
      { heading: 'Acceptance of Terms', text: 'By creating an account and using ResuNova, you agree to these Terms of Service. If you do not agree, do not use the service.' },
      { heading: 'Account Responsibilities', text: 'You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account.' },
      { heading: 'Usage Limits', text: 'Starter accounts are limited to 3 analyses per rolling 24-hour period. Pro accounts have unlimited analyses but are subject to fair use policies.' },
      { heading: 'Prohibited Conduct', text: 'Do not use ResuNova to generate content for illegal purposes, reverse-engineer our AI models, or circumvent usage limitations.' },
      { heading: 'Termination', text: 'We reserve the right to suspend or terminate accounts that violate these terms. You may cancel your account at any time.' },
    ]
  },
  security: {
    title: 'Security',
    subtitle: 'We take your data security seriously.',
    sections: [
      { heading: 'Encryption', text: 'All data is encrypted at rest using AES-256 and in transit using TLS 1.3. We use strong cryptographic standards across our infrastructure.' },
      { heading: 'Authentication', text: 'Passwords are hashed using bcrypt with a cost factor of 12. Session tokens are HttpOnly, secure cookies. Optional two-factor authentication available.' },
      { heading: 'Infrastructure', text: 'Hosted on Google Cloud Platform with VPC isolation, firewall rules, and intrusion detection. Databases run on MongoDB Atlas with automated backups.' },
      { heading: 'Compliance', text: 'SOC 2 Type II certified. GDPR compliant. Data Processing Agreement available for Enterprise customers.' },
      { heading: 'Vulnerability Disclosure', text: 'Found a security issue? Email security@resunova.com. We offer a responsible disclosure program with recognition for validated reports.' },
    ]
  },
  cookies: {
    title: 'Cookie Policy',
    subtitle: 'How we use cookies and similar technologies.',
    sections: [
      { heading: 'Essential Cookies', text: 'Required for the platform to function — session management, authentication tokens, and CSRF protection. These cannot be disabled.' },
      { heading: 'Analytics Cookies', text: 'We use Plausible Analytics (privacy-first, no personal data collected) to understand usage patterns and improve the product. No cookie consent popup needed.' },
      { heading: 'Third-Party Cookies', text: 'Stripe uses cookies for payment processing. No advertising cookies, no tracking cookies, no social media pixels.' },
      { heading: 'Managing Cookies', text: 'Essential cookies cannot be disabled without affecting platform functionality. Analytics and third-party cookies can be controlled via browser settings.' },
    ]
  },
  gdpr: {
    title: 'GDPR Compliance',
    subtitle: 'Our commitment to data protection under EU law.',
    sections: [
      { heading: 'Data Controller', text: 'ResuNova Inc. is the data controller for personal data collected from users in the European Economic Area (EEA).' },
      { heading: 'Legal Basis for Processing', text: 'We process data based on consent (marketing), contractual necessity (service delivery), and legitimate interests (product improvement).' },
      { heading: 'Data Subject Rights', text: 'Right to access, rectification, erasure, restriction of processing, data portability, and objection. Exercise these rights via account settings or by emailing privacy@resunova.com.' },
      { heading: 'Data Transfers', text: 'Data may be transferred to and processed in the United States. We have Standard Contractual Clauses (SCCs) in place to ensure adequate protection.' },
      { heading: 'Data Protection Officer', text: 'Contact our DPO at dpo@resunova.com for any privacy-related inquiries or complaints.' },
    ]
  },
  dpa: {
    title: 'Data Processing Agreement',
    subtitle: 'Our DPA governs how we process customer data.',
    sections: [
      { heading: 'Scope', text: 'This DPA applies to the processing of personal data by ResuNova on behalf of its Enterprise customers, as defined in the applicable Master Services Agreement.' },
      { heading: 'Processing Details', text: 'Personal data includes user account information, resumes, job descriptions, and generated reports. Processed for the purpose of providing interview preparation services.' },
      { heading: 'Sub-processors', text: 'Google Cloud Platform (infrastructure), MongoDB Atlas (database), Stripe (payments). Updated list available on request.' },
      { heading: 'Security Measures', text: 'Encryption at rest and in transit, access controls, regular security audits, employee confidentiality agreements, and incident response procedures.' },
      { heading: 'Contact', text: 'For DPA requests and inquiries, email legal@resunova.com. Signed DPAs are available upon request for Enterprise customers.' },
    ]
  },
}

export function Integrations() { return <StaticPage data={PAGES.integrations} /> }
export function Changelog() { return <StaticPage data={PAGES.changelog} /> }
export function Roadmap() { return <StaticPage data={PAGES.roadmap} /> }
export function ApiDocs() { return <StaticPage data={PAGES['api-docs']} /> }
export function About() { return <StaticPage data={PAGES.about} /> }
export function Blog() { return <StaticPage data={PAGES.blog} /> }
export function Careers() { return <StaticPage data={PAGES.careers} /> }
export function Press() { return <StaticPage data={PAGES.press} /> }
export function PartnerProgram() { return <StaticPage data={PAGES['partner-program']} /> }
export function InterviewGuides() { return <StaticPage data={PAGES['interview-guides']} /> }
export function SalaryData() { return <StaticPage data={PAGES['salary-data']} /> }
export function CompanyDatabase() { return <StaticPage data={PAGES['company-database']} /> }
export function Community() { return <StaticPage data={PAGES.community} /> }
export function Webinars() { return <StaticPage data={PAGES.webinars} /> }
export function Templates() { return <StaticPage data={PAGES.templates} /> }
export function Privacy() { return <StaticPage data={PAGES.privacy} /> }
export function Terms() { return <StaticPage data={PAGES.terms} /> }
export function Security() { return <StaticPage data={PAGES.security} /> }
export function Cookies() { return <StaticPage data={PAGES.cookies} /> }
export function GDPR() { return <StaticPage data={PAGES.gdpr} /> }
export function DPA() { return <StaticPage data={PAGES.dpa} /> }
