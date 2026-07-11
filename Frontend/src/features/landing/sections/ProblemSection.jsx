import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import RevealText from '../../../components/RevealText'
import { problemStats, staggerContainer, fadeUp } from '../data/landingData'

export default function ProblemSection() {
  return (
    <section className="section section--problem" id="problem">
      <div className="section__parallax" aria-hidden="true">
        <div className="section__parallax-glow section__parallax-glow--1" />
        <div className="section__parallax-glow section__parallax-glow--2" />
      </div>
      <div className="section__container">
        <div className="section__number" aria-hidden="true">01</div>
        <motion.div className="section__head" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}>
          <motion.span className="section__label" variants={fadeUp(0)}><Sparkles size={12} /> The Problem</motion.span>
          <RevealText as="h2" className="section__title" delay={1}>
            Most candidates prepare wrong. <span className="grad">We fix the approach.</span>
          </RevealText>
          <motion.p className="section__sub" variants={fadeUp(2)}>
            Generic questions. Random study. No feedback loop. You&apos;re competing against candidates who know exactly what each company tests.
          </motion.p>
        </motion.div>

        <div className="problem-grid">
          {problemStats.map((stat, i) => (
            <motion.article
              key={i}
              className="problem-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="problem-card__icon" style={{ background: i === 0 ? 'rgba(167, 183, 231, 0.15)' : i === 1 ? 'rgba(167, 183, 231, 0.15)' : 'rgba(167, 183, 231, 0.15)', color: i === 0 ? '#3d4d9a' : i === 1 ? '#2a3a8a' : '#141442', borderColor: i === 0 ? 'rgba(167, 183, 231, 0.25)' : i === 1 ? 'rgba(167, 183, 231, 0.25)' : 'rgba(167, 183, 231, 0.25)' }}>
                <stat.icon size={22} />
              </div>
              <span className="problem-card__num">{stat.num}</span>
              <p className="problem-card__label">{stat.label}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
