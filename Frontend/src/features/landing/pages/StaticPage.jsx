import { motion } from 'framer-motion'
import FooterSection from '../sections/FooterSection'
import Logo from '../../../components/Logo'
import { Link, useNavigate } from 'react-router'
import {
  Shield, Zap, Calendar, Brain, FileText, Target,
  Search, Download, BarChart3, Sparkles, ArrowRight,
  Users, Lock, Globe, Mail, Phone, MapPin,
  BookOpen, TrendingUp, Award, Clock, CheckCircle,
  Code, Database, Server, Cloud, GitBranch, Terminal, Settings
} from 'lucide-react'

const ease = [0.23, 1, 0.32, 1]

const iconMap = {
  'security': Shield, 'encryption': Shield, 'compliance': Shield,
  'authentication': Lock, 'infrastructure': Server, 'vulnerability': Shield,
  'authentication': Lock, 'sub-processors': Cloud, 'data controller': Globe,
  'data subject': Users, 'data transfers': Globe, 'data protection': Shield,
  'legal basis': FileText, 'scope': Target, 'processing': Database,
  'contact': Mail, 'support': Phone, 'sales': TrendingUp, 'press': Award,
  'office': MapPin, 'partnerships': Users, 'inquiries': Mail,
  'mission': Target, 'story': BookOpen, 'technology': Code,
  'mission': Target, 'story': BookOpen, 'technology': Code,
  'open roles': Users, 'process': GitBranch, 'why': Sparkles,
  'how to': BookOpen, 'behavioral': Brain, '5 resume': FileText,
  'star': Brain, 'system design': Server, 'negotiation': TrendingUp,
  'resume': FileText, 'salary': BarChart3, 'compensation': BarChart3,
  'startup': TrendingUp, 'interview processes': Target, 'engineering culture': Code,
  'benefits': Award, 'discord': Users, 'study groups': Users, 'success': TrendingUp,
  'upcoming': Calendar, 'on-demand': Clock, 'expert': Brain,
  'study plan': Calendar, 'templates': FileText, 'star story': Brain, 'offer': Award,
  'data we collect': Database, 'how we use': Globe, 'your rights': Users,
  'acceptance': FileText, 'account': Users, 'usage limits': BarChart3,
  'prohibited': Shield, 'termination': Lock,
  'essential': Lock, 'analytics': BarChart3, 'third-party': Globe, 'managing': Settings,
  'data controller': Globe, 'legal basis': FileText, 'data subject': Users,
  'data transfers': Globe, 'data protection': Shield,
  'linkedin': Globe, 'ats platforms': Target, 'google': Cloud, 'calendar': Calendar, 'api access': Code,
  'authentication': Lock, 'report generation': FileText, 'user management': Users,
  'entitlements': BarChart3, 'rate limits': Clock,
  'v2.': TrendingUp, 'v1.': TrendingUp, 'migrated': TrendingUp,
  'q3': Calendar, 'q4': Calendar, 'q1': Calendar, 'q2': Calendar,
  'become': Users, 'integration partners': Code, 'content': FileText,
}

function getIcon(heading) {
  const lower = heading.toLowerCase()
  for (const [key, Icon] of Object.entries(iconMap)) {
    if (lower.includes(key)) return Icon
  }
  return Sparkles
}

const fallback = { icon: Sparkles }

export default function StaticPage({ data, cta }) {
  const navigate = useNavigate()

  if (!data) return <div className="sp__empty">Page content not found.</div>

  const Icon = ({ name }) => {
    const I = getIcon(name)
    return <I size={20} strokeWidth={1.8} />
  }

  return (
    <main className="sp">
      {/* ── NAVBAR ── */}
      <header className="sp-nav">
        <div className="sp-nav__inner">
          <button className="sp-nav__logo" onClick={() => navigate('/')}>
            <Logo size={28} />
          </button>
          <nav className="sp-nav__links">
            <Link to="/features" className="sp-nav__link">Features</Link>
            <Link to="/pricing" className="sp-nav__link">Pricing</Link>
            <Link to="/about" className="sp-nav__link">About</Link>
            <Link to="/contact" className="sp-nav__link">Contact</Link>
          </nav>
          <div className="sp-nav__actions">
            <button className="sp-nav__signin" onClick={() => navigate('/login')}>Sign In</button>
            <motion.button
              className="sp-nav__cta"
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
      <section className="sp-hero">
        <div className="sp-hero__bg" aria-hidden="true">
          <div className="sp-hero__orb sp-hero__orb--1" />
          <div className="sp-hero__orb sp-hero__orb--2" />
        </div>
        <div className="sp-hero__inner">
          <motion.h1
            className="sp-hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
          >
            {data.title}
          </motion.h1>
          <motion.p
            className="sp-hero__sub"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            {data.subtitle}
          </motion.p>
        </div>
      </section>

      {/* ── SECTIONS GRID ── */}
      <section className="sp-sections">
        <div className="sp-sections__inner">
          {data.sections.map((section, i) => {
            const SectionIcon = getIcon(section.heading)
            return (
              <motion.article
                key={i}
                className="sp-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.05, ease }}
                whileHover={{ y: -4, boxShadow: '0 20px 48px -12px rgba(167, 183, 231, .16)' }}
              >
                <div className="sp-card__icon">
                  <SectionIcon size={20} strokeWidth={1.8} />
                </div>
                <h2 className="sp-card__title">{section.heading}</h2>
                <p className="sp-card__text">{section.text}</p>
                <div className="sp-card__shimmer" aria-hidden="true" />
              </motion.article>
            )
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sp-cta">
        <div className="sp-cta__inner">
          <motion.h2
            className="sp-cta__title"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            {cta?.title || 'Ready to ace your interview?'}
          </motion.h2>
          <motion.p
            className="sp-cta__sub"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            {cta?.subtitle || 'Join 2,400+ engineers who landed offers with ResuNova.'}
          </motion.p>
          <motion.button
            className="sp-cta__btn"
            whileHover={{ scale: 1.04, boxShadow: '0 20px 48px -12px rgba(74, 90, 173, .3)' }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            onClick={() => navigate(cta?.href || '/register')}
          >
            {cta?.label || 'Start Free'} <ArrowRight size={15} />
          </motion.button>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
