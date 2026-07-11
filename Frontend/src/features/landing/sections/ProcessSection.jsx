import { motion } from 'framer-motion'
import { Upload, Search, Award } from 'lucide-react'
import RevealText from '../../../components/RevealText'
import { steps, staggerContainer, fadeUp } from '../data/landingData'

export default function ProcessSection() {
  return (
    <section className="section section--process" id="how-it-works">
      <div className="section__container">
        <div className="section__number" aria-hidden="true">04</div>
        <motion.div className="section__head" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}>
          <motion.span className="section__label" variants={fadeUp(0)}>How It Works</motion.span>
          <RevealText as="h2" className="section__title" delay={1}>
            Resume to strategy <span className="grad">in 30 seconds.</span>
          </RevealText>
          <motion.p className="section__sub" variants={fadeUp(2)}>
            No complex setup. No prompt engineering. Upload → Analyze → Execute.
          </motion.p>
        </motion.div>

        <div className="process-flow">
          {steps.map((step, i) => (
            <motion.article
              key={i}
              className="process-step"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="process-step__number">{step.num}</div>
              <div className="process-step__icon" style={{ background: i === 0 ? 'rgba(167, 183, 231, 0.15)' : i === 1 ? 'rgba(167, 183, 231, 0.15)' : 'rgba(167, 183, 231, 0.15)', color: i === 0 ? '#3d4d9a' : i === 1 ? '#2a3a8a' : '#141442', borderColor: i === 0 ? 'rgba(167, 183, 231, 0.25)' : i === 1 ? 'rgba(167, 183, 231, 0.25)' : 'rgba(167, 183, 231, 0.25)' }}>
                {i === 0 && <Upload size={22} />}
                {i === 1 && <Search size={22} />}
                {i === 2 && <Award size={22} />}
              </div>
              <h3 className="process-step__title">{step.title}</h3>
              <p className="process-step__desc">{step.desc}</p>
              {i < steps.length - 1 && <div className="process-step__connector" />}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
