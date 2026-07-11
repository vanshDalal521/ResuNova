import { motion } from 'framer-motion'
import { ArrowRight, ChevronDown, Sparkles, Shield, Award, Zap, Clock } from 'lucide-react'
import { useNavigate } from 'react-router'
import LiquidHeroCanvas from '../../../components/hero/LiquidHeroCanvas'
import RevealText from '../../../components/RevealText'

export default function HeroSection({ heroRef, heroCardY, heroCardScale, scrollTo }) {
  const navigate = useNavigate()

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <LiquidHeroCanvas />

      <div className="hero__bg" aria-hidden="true">
        <div className="hero__gradient" />
        <div className="hero__grid" />
        <div className="hero__glow hero__glow--1" />
        <div className="hero__glow hero__glow--2" />
        <div className="hero__glow hero__glow--3" />
      </div>

      <div className="hero__overlay" />

      <div className="hero__layout">
        <div className="hero__copy">
          <motion.div
            className="hero__badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          >
            <Sparkles size={14} />
            <span>Powered by Gemini 1.5 Flash &middot; 98% Match Accuracy</span>
          </motion.div>

          <RevealText
            as="h1"
            className="hero__title"
            delay={0.15}
            once={false}
          >
            Your Interview Strategy, Generated in Seconds
          </RevealText>

          <motion.p
            className="hero__sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          >
            Upload your resume, paste any job description, and get a complete interview blueprint —
            tailored questions, skill gaps, and a day-by-day prep plan.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            <motion.button
              className="btn btn--hero-primary btn--lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/register')}
            >
              Build My Strategy <ArrowRight size={17} />
            </motion.button>
            <motion.button
              className="btn btn--hero-ghost btn--lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo('how-it-works')}
            >
              See How It Works <ChevronDown size={16} />
            </motion.button>
          </motion.div>
        </div>

        <div className="hero__showcase">
          <div className="hero__showcase-bg" />
          <motion.div style={{ y: heroCardY, scale: heroCardScale }}>
            <motion.div
              className="hero__card-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
            <div className="hero__card">
              <div className="hero__card-header">
                <div className="hero__card-dots">
                  <span /><span /><span />
                </div>
                <span className="hero__card-title">Interview Strategy Report</span>
                <span className="hero__card-status">Live</span>
              </div>
              <div className="hero__card-tabs">
                <button className="hero__card-tab hero__card-tab--active">Analysis</button>
                <button className="hero__card-tab">Questions</button>
                <button className="hero__card-tab">Gaps</button>
                <button className="hero__card-tab">Plan</button>
              </div>
              <div className="hero__card-body">
                <div className="hero__card-metrics">
                  <div className="hero__card-metric">
                    <span className="hero__card-metric-val">94%</span>
                    <span className="hero__card-metric-label">Role Match</span>
                  </div>
                  <div className="hero__card-metric">
                    <span className="hero__card-metric-val">12</span>
                    <span className="hero__card-metric-label">Strengths</span>
                  </div>
                  <div className="hero__card-metric">
                    <span className="hero__card-metric-val">5</span>
                    <span className="hero__card-metric-label">Gaps Found</span>
                  </div>
                  <div className="hero__card-metric">
                    <span className="hero__card-metric-val">47</span>
                    <span className="hero__card-metric-label">Questions</span>
                  </div>
                  <div className="hero__card-metric">
                    <span className="hero__card-metric-val">92</span>
                    <span className="hero__card-metric-label">Confidence</span>
                  </div>
                  <div className="hero__card-metric">
                    <span className="hero__card-metric-val">21d</span>
                    <span className="hero__card-metric-label">Prep Plan</span>
                  </div>
                </div>
                <div className="hero__card-bars">
                  <div className="hero__card-bar">
                    <div className="hero__card-bar-label">
                      <span>System Design</span>
                      <span className="hero__card-bar-tag hero__card-bar-tag--strong">Strong</span>
                    </div>
                    <div className="hero__card-bar-track">
                      <div className="hero__card-bar-fill" style={{ width: '92%' }} />
                    </div>
                  </div>
                  <div className="hero__card-bar">
                    <div className="hero__card-bar-label">
                      <span>React Internals</span>
                      <span className="hero__card-bar-tag hero__card-bar-tag--gap">Gap</span>
                    </div>
                    <div className="hero__card-bar-track">
                      <div className="hero__card-bar-fill hero__card-bar-fill--gap" style={{ width: '35%' }} />
                    </div>
                  </div>
                  <div className="hero__card-bar">
                    <div className="hero__card-bar-label">
                      <span>TypeScript</span>
                      <span className="hero__card-bar-tag hero__card-bar-tag--strong">Strong</span>
                    </div>
                    <div className="hero__card-bar-track">
                      <div className="hero__card-bar-fill" style={{ width: '88%' }} />
                    </div>
                  </div>
                  <div className="hero__card-bar">
                    <div className="hero__card-bar-label">
                      <span>Distributed Systems</span>
                      <span className="hero__card-bar-tag hero__card-bar-tag--gap">Gap</span>
                    </div>
                    <div className="hero__card-bar-track">
                      <div className="hero__card-bar-fill hero__card-bar-fill--gap" style={{ width: '28%' }} />
                    </div>
                  </div>
                  <div className="hero__card-bar">
                    <div className="hero__card-bar-label">
                      <span>Algorithms</span>
                      <span className="hero__card-bar-tag hero__card-bar-tag--strong">Strong</span>
                    </div>
                    <div className="hero__card-bar-track">
                      <div className="hero__card-bar-fill" style={{ width: '76%' }} />
                    </div>
                  </div>
                  <div className="hero__card-bar">
                    <div className="hero__card-bar-label">
                      <span>System Architecture</span>
                      <span className="hero__card-bar-tag hero__card-bar-tag--intermediate">Needs Work</span>
                    </div>
                    <div className="hero__card-bar-track">
                      <div className="hero__card-bar-fill hero__card-bar-fill--intermediate" style={{ width: '54%' }} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="hero__card-footer">
                <span className="hero__card-footer-info">
                  <Clock size={12} />
                  <span>Generated in 23s</span>
                </span>
                <span className="hero__card-footer-link">View Full Report →</span>
              </div>
            </div>
          </motion.div>
          </motion.div>

          <motion.div
            className="hero__showcase-badge hero__showcase-badge--accuracy"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.0, ease: [0.23, 1, 0.32, 1] }}
          >
            <Shield size={10} />
            98% Accuracy
          </motion.div>

          <motion.div
            className="hero__showcase-badge hero__showcase-badge--companies"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            <Award size={10} />
            2,400+ Engineers
          </motion.div>

          <motion.div
            className="hero__showcase-badge hero__showcase-badge--speed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.4, ease: [0.23, 1, 0.32, 1] }}
          >
            <Zap size={10} />
            ~30s Generation
          </motion.div>
        </div>
      </div>

      <motion.div
        className="hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </motion.div>
    </section>
  )
}
