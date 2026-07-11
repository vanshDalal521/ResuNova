import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router'
import { Check, ArrowRight, Sparkles, Zap, Building2 } from 'lucide-react'
import Logo from '../../../../components/Logo'
import FooterSection from '../../sections/FooterSection'
import '../../style/featuresPage.scss'

const ease = [0.23, 1, 0.32, 1]

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    desc: '3 analyses per rolling 24-hour period',
    features: [
      'AI Resume Analysis',
      '12-15 Technical Questions',
      'Skill Gap Analysis',
      'ATS Keyword Extraction',
      'PDF Resume Export',
      'Interview Score Prediction',
    ],
    cta: 'Get Started Free',
    href: '/register',
    icon: Zap,
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    desc: 'Unlimited analyses with full feature access',
    features: [
      'Everything in Starter',
      'Behavioral Interview Questions',
      '7-Day Preparation Plan',
      'Priority Support',
      'Early Access to New Features',
      'Unlimited PDF Exports',
    ],
    cta: 'Upgrade to Pro',
    href: '/register',
    icon: Sparkles,
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'SSO & Team Management',
      'Dedicated Account Manager',
      'Custom Integrations',
      'SLA Guarantees',
      'White-Label Reporting',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    icon: Building2,
    popular: false,
  },
]

const faqs = [
  { q: 'How does the rolling 24-hour window work?', a: 'Unlike monthly limits, ResuNova resets your usage 24 hours after each analysis. This means you always have fresh quota available when you need it most — no waiting until the next month.' },
  { q: 'Can I switch between plans at any time?', a: 'Yes. Upgrade to Pro instantly and your features activate immediately. Downgrade anytime and you keep Pro access until the end of your current billing period.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex) via Stripe. Enterprise customers can also pay via invoice with NET 30 terms.' },
  { q: 'Is there a free trial for Pro?', a: 'No trial needed — the Starter plan is free forever with 3 analyses per 24-hour period. Upgrade to Pro only when you need unlimited analyses and advanced features.' },
  { q: 'What happens when I reach my analysis limit?', a: 'On the Starter plan, you will see a countdown timer showing when your oldest analysis expires and a new slot opens. Pro users never hit limits.' },
]

export default function PricingPage() {
  const navigate = useNavigate()

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
            <Link to="/pricing" className="sp-nav__link sp-nav__link--active">Pricing</Link>
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
          <motion.div
            className="sp-hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
          >
            <Sparkles size={14} />
            <span>Simple, transparent pricing</span>
          </motion.div>
          <motion.h1
            className="sp-hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            Start free, scale when ready
          </motion.h1>
          <motion.p
            className="sp-hero__sub"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            No credit card required. 3 free analyses every 24 hours.
            Upgrade to Pro for unlimited access and advanced preparation tools.
          </motion.p>
        </div>
      </section>

      {/* ── PRICING CARDS ── */}
      <section className="pricing-cards">
        <div className="pricing-cards__inner">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
              whileHover={{ y: -6, boxShadow: plan.popular ? '0 24px 56px -12px rgba(74, 90, 173, .22)' : '0 20px 48px -12px rgba(167, 183, 231, .16)' }}
            >
              {plan.popular && <div className="pricing-card__popular">Most Popular</div>}
              <div className="pricing-card__icon">
                <plan.icon size={22} strokeWidth={1.8} />
              </div>
              <h3 className="pricing-card__name">{plan.name}</h3>
              <div className="pricing-card__price">
                {plan.price}<span>{plan.period}</span>
              </div>
              <p className="pricing-card__desc">{plan.desc}</p>
              <ul className="pricing-card__list">
                {plan.features.map(f => (
                  <li key={f}><Check size={16} strokeWidth={2} /> {f}</li>
                ))}
              </ul>
              <motion.button
                className={`pricing-card__cta ${plan.popular ? 'pricing-card__cta--primary' : ''}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(plan.href)}
              >
                {plan.cta} <ArrowRight size={14} />
              </motion.button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="pricing-faq">
        <div className="pricing-faq__inner">
          <motion.div
            className="pricing-faq__head"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="fp-label">FAQ</span>
            <h2 className="pricing-faq__title">Frequently asked questions</h2>
          </motion.div>
          <div className="pricing-faq__grid">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="pricing-faq__item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
              >
                <h3 className="pricing-faq__q">{faq.q}</h3>
                <p className="pricing-faq__a">{faq.a}</p>
              </motion.div>
            ))}
          </div>
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
            Ready to ace your interview?
          </motion.h2>
          <motion.p
            className="sp-cta__sub"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            Join 2,400+ engineers who landed offers with ResuNova.
          </motion.p>
          <motion.button
            className="sp-cta__btn"
            whileHover={{ scale: 1.04, boxShadow: '0 20px 48px -12px rgba(74, 90, 173, .3)' }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            onClick={() => navigate('/register')}
          >
            Start Free <ArrowRight size={15} />
          </motion.button>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
