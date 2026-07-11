import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router'
import { Mail, Phone, MapPin, ArrowRight, Send, MessageSquare, Headphones, Building2 } from 'lucide-react'
import Logo from '../../../../components/Logo'
import FooterSection from '../../sections/FooterSection'
import '../../style/featuresPage.scss'

const ease = [0.23, 1, 0.32, 1]

const channels = [
  { icon: Headphones, title: 'Support', desc: 'Average response under 4 hours', detail: 'support@resunova.com', href: 'mailto:support@resunova.com' },
  { icon: Building2, title: 'Sales & Partnerships', desc: 'Enterprise deployment & partnerships', detail: 'partnerships@resunova.com', href: 'mailto:partnerships@resunova.com' },
  { icon: MessageSquare, title: 'Press Inquiries', desc: 'Interviews, quotes, and product demos', detail: 'press@resunova.com', href: 'mailto:press@resunova.com' },
  { icon: MapPin, title: 'Office', desc: 'San Francisco, CA — Fully remote team', detail: '548 Market Street, PMB 72291', href: null },
]

export default function ContactPage() {
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
            <Link to="/pricing" className="sp-nav__link">Pricing</Link>
            <Link to="/about" className="sp-nav__link">About</Link>
            <Link to="/contact" className="sp-nav__link sp-nav__link--active">Contact</Link>
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
            <Mail size={14} />
            <span>We respond within 4 hours</span>
          </motion.div>
          <motion.h1
            className="sp-hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            Get in touch
          </motion.h1>
          <motion.p
            className="sp-hero__sub"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease }}
          >
            Whether you need technical support, want to explore a partnership,
            or have a press inquiry — we would love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* ── CONTACT CHANNELS ── */}
      <section className="contact-channels">
        <div className="contact-channels__inner">
          {channels.map((ch, i) => (
            <motion.div
              key={ch.title}
              className="contact-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              whileHover={{ y: -4, boxShadow: '0 20px 48px -12px rgba(167, 183, 231, .16)' }}
            >
              <div className="contact-card__icon">
                <ch.icon size={22} strokeWidth={1.8} />
              </div>
              <h3 className="contact-card__title">{ch.title}</h3>
              <p className="contact-card__desc">{ch.desc}</p>
              {ch.href ? (
                <a href={ch.href} className="contact-card__link">{ch.detail}</a>
              ) : (
                <span className="contact-card__link">{ch.detail}</span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="contact-form-section">
        <div className="contact-form-section__inner">
          <motion.div
            className="contact-form-section__head"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
          >
            <span className="fp-label">Send a Message</span>
            <h2 className="contact-form-section__title">How can we help?</h2>
          </motion.div>
          <motion.form
            className="contact-form"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            onSubmit={e => e.preventDefault()}
          >
            <div className="contact-form__row">
              <div className="contact-form__field">
                <label>Name</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className="contact-form__field">
                <label>Email</label>
                <input type="email" placeholder="name@example.com" />
              </div>
            </div>
            <div className="contact-form__field">
              <label>Subject</label>
              <select defaultValue="">
                <option value="" disabled>Select a topic</option>
                <option>Technical Support</option>
                <option>Sales & Partnerships</option>
                <option>Press Inquiry</option>
                <option>Enterprise</option>
                <option>Other</option>
              </select>
            </div>
            <div className="contact-form__field">
              <label>Message</label>
              <textarea rows={5} placeholder="Tell us how we can help..." />
            </div>
            <motion.button
              type="submit"
              className="contact-form__submit"
              whileHover={{ scale: 1.03, boxShadow: '0 16px 40px -12px rgba(74, 90, 173, .25)' }}
              whileTap={{ scale: 0.97 }}
            >
              <Send size={16} /> Send Message
            </motion.button>
          </motion.form>
        </div>
      </section>

      <FooterSection />
    </main>
  )
}
