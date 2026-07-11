import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router'
import '../../style/featuresPage.scss'
import {
  Brain, FileText, Target, Calendar, Search, Download,
  BarChart3, Sparkles, Zap, ArrowRight, Check,
  Upload, Cpu, LayoutTemplate, TrendingUp
} from 'lucide-react'
import Logo from '../../../../components/Logo'
import FooterSection from '../../sections/FooterSection'

const ease = [0.23, 1, 0.32, 1]

const features = [
  {
    icon: Brain,
    title: 'AI Resume Analysis',
    desc: 'Gemini 1.5 Flash cross-references your resume against job requirements at semantic depth — evidence-cited strengths, quantified gaps, and a deterministic match score.',
    color: '#4a5aad',
    bg: 'rgba(74, 90, 173, .06)',
    large: true,
  },
  {
    icon: Target,
    title: 'Technical Questions',
    desc: '12-15 role-specific questions with interviewer intent, difficulty rating, and model answer frameworks calibrated to your seniority level.',
    color: '#6B7ABF',
    bg: 'rgba(107, 122, 191, .06)',
  },
  {
    icon: FileText,
    title: 'Behavioral Prep',
    desc: 'STAR-guided behavioral scenarios with story-structuring templates and real FAANG interview examples.',
    color: '#8A9AD4',
    bg: 'rgba(138, 154, 212, .06)',
  },
  {
    icon: Calendar,
    title: '7-Day Plan',
    desc: 'Personalized day-by-day roadmap that adapts dynamically as you complete topics.',
    color: '#3d4d9a',
    bg: 'rgba(61, 77, 154, .06)',
  },
  {
    icon: Search,
    title: 'ATS Keywords',
    desc: 'Extract must-have buzzwords from job descriptions. See which keywords you are missing and how to incorporate them naturally.',
    color: '#4a5aad',
    bg: 'rgba(74, 90, 173, .06)',
  },
  {
    icon: Download,
    title: 'PDF Export',
    desc: 'ATS-friendly PDF resume with strategic keyword placement and parseable text layers.',
    color: '#6B7ABF',
    bg: 'rgba(107, 122, 191, .06)',
  },
  {
    icon: BarChart3,
    title: 'Skill Gap Analysis',
    desc: 'Deep structural gap detection — flags missing adjacent skills and quantifies the effort to close each gap, prioritized by interview impact.',
    color: '#8A9AD4',
    bg: 'rgba(138, 154, 212, .06)',
  },
  {
    icon: Sparkles,
    title: 'Score Prediction',
    desc: 'Estimated performance across technical, behavioral, and system design rounds based on your profile and target company.',
    color: '#3d4d9a',
    bg: 'rgba(61, 77, 154, .06)',
  },
]

const steps = [
  { num: '01', icon: Upload, title: 'Upload', desc: 'Drop your resume and paste the job description' },
  { num: '02', icon: Cpu, title: 'Analyze', desc: 'Gemini 1.5 Flash cross-references your profile at semantic depth' },
  { num: '03', icon: LayoutTemplate, title: 'Prepare', desc: 'Get your personalized blueprint — questions, gaps, and day-by-day plan' },
  { num: '04', icon: TrendingUp, title: 'Land the Offer', desc: 'Walk into your interview fully prepared and confident' },
]

export default function FeaturesPage() {
  const navigate = useNavigate()

  return (
    <main className="fp">
      {/* ── NAVBAR ── */}
      <header className="fp-nav">
        <div className="fp-nav__inner">
          <button className="fp-nav__logo" onClick={() => navigate('/')}>
            <Logo size={28} />
          </button>
          <nav className="fp-nav__links">
            <Link to="/features" className="fp-nav__link fp-nav__link--active">Features</Link>
            <Link to="/pricing" className="fp-nav__link">Pricing</Link>
            <Link to="/about" className="fp-nav__link">About</Link>
            <Link to="/contact" className="fp-nav__link">Contact</Link>
          </nav>
          <div className="fp-nav__actions">
            <button className="fp-nav__signin" onClick={() => navigate('/login')}>Sign In</button>
            <motion.button
              className="fp-nav__cta"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/register')}
            >
              Get Started <ArrowRight size={14} />
            </motion.button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="fp-hero">
        <div className="fp-hero__bg" aria-hidden="true">
          <div className="fp-hero__orb fp-hero__orb--1" />
          <div className="fp-hero__orb fp-hero__orb--2" />
          <div className="fp-hero__orb fp-hero__orb--3" />
        </div>
        <div className="fp-hero__inner">
          <motion.div
            className="fp-hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <Sparkles size={14} />
            <span>Powered by Gemini 1.5 Flash</span>
          </motion.div>
          <motion.h1
            className="fp-hero__title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
          >
            Every tool to <span className="fp-hero__grad">ace the interview</span>
          </motion.h1>
          <motion.p
            className="fp-hero__sub"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
          >
            From AI-powered resume analysis to personalized 7-day preparation plans —
            ResuNova gives you the exact blueprint to win your next technical offer.
          </motion.p>
          <motion.div
            className="fp-hero__ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
          >
            <motion.button
              className="fp-hero__cta-primary"
              whileHover={{ scale: 1.04, boxShadow: '0 20px 48px -12px rgba(74, 90, 173, .3)' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/register')}
            >
              Start Free <ArrowRight size={16} />
            </motion.button>
            <motion.button
              className="fp-hero__cta-secondary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/pricing')}
            >
              View Pricing
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* ── BENTO FEATURES GRID ── */}
      <section className="fp-features">
        <div className="fp-features__inner">
          <motion.div
            className="fp-features__head"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="fp-label">Features</span>
            <h2 className="fp-features__title">Everything you need, nothing you don&apos;t</h2>
          </motion.div>

          <div className="fp-grid">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                className={`fp-card ${f.large ? 'fp-card--large' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease }}
                whileHover={{ y: -6, boxShadow: '0 24px 56px -12px rgba(167, 183, 231, .18)' }}
              >
                <div className="fp-card__icon" style={{ background: f.bg, color: f.color }}>
                  <f.icon size={22} strokeWidth={1.8} />
                </div>
                <h3 className="fp-card__title">{f.title}</h3>
                <p className="fp-card__desc">{f.desc}</p>
                <div className="fp-card__shimmer" aria-hidden="true" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="fp-steps">
        <div className="fp-steps__inner">
          <motion.div
            className="fp-steps__head"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="fp-label">How It Works</span>
            <h2 className="fp-steps__title">From resume to offer in four steps</h2>
          </motion.div>

          <div className="fp-steps__grid">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                className="fp-step"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
              >
                <div className="fp-step__num">{s.num}</div>
                <div className="fp-step__icon">
                  <s.icon size={20} strokeWidth={1.8} />
                </div>
                <h3 className="fp-step__title">{s.title}</h3>
                <p className="fp-step__desc">{s.desc}</p>
                {i < steps.length - 1 && <div className="fp-step__connector" aria-hidden="true" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET (Free vs Pro) ── */}
      <section className="fp-compare">
        <div className="fp-compare__inner">
          <motion.div
            className="fp-compare__head"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="fp-label">Plans</span>
            <h2 className="fp-compare__title">Start free, upgrade when you need more</h2>
          </motion.div>

          <div className="fp-compare__grid">
            <motion.div
              className="fp-plan"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease }}
            >
              <div className="fp-plan__tag">Starter</div>
              <div className="fp-plan__price">Free</div>
              <p className="fp-plan__sub">3 analyses per rolling 24h</p>
              <ul className="fp-plan__list">
                {['AI Resume Analysis', 'Technical Questions', 'Skill Gap Analysis', 'ATS Keywords', 'PDF Export'].map(f => (
                  <li key={f}><Check size={16} /> {f}</li>
                ))}
              </ul>
              <motion.button
                className="fp-plan__cta"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/register')}
              >
                Get Started Free
              </motion.button>
            </motion.div>

            <motion.div
              className="fp-plan fp-plan--pro"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease }}
            >
              <div className="fp-plan__tag fp-plan__tag--pro">Pro</div>
              <div className="fp-plan__price">$19<span>/mo</span></div>
              <p className="fp-plan__sub">Unlimited analyses</p>
              <ul className="fp-plan__list">
                {['Everything in Starter', 'Behavioral Questions', '7-Day Preparation Plan', 'Score Prediction', 'Priority Support'].map(f => (
                  <li key={f}><Check size={16} /> {f}</li>
                ))}
              </ul>
              <motion.button
                className="fp-plan__cta fp-plan__cta--pro"
                whileHover={{ scale: 1.03, boxShadow: '0 20px 48px -12px rgba(74, 90, 173, .3)' }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate('/pricing')}
              >
                Upgrade to Pro <ArrowRight size={14} />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="fp-cta">
        <div className="fp-cta__inner">
          <motion.h2
            className="fp-cta__title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            Ready to win your next offer?
          </motion.h2>
          <motion.p
            className="fp-cta__sub"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
          >
            Join 2,400+ engineers who used ResuNova to land offers at top tech companies.
          </motion.p>
          <motion.button
            className="fp-cta__btn"
            whileHover={{ scale: 1.04, boxShadow: '0 24px 56px -12px rgba(74, 90, 173, .35)' }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25, ease }}
            onClick={() => navigate('/register')}
          >
            Start Free <ArrowRight size={16} />
          </motion.button>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
