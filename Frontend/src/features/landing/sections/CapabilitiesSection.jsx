import { motion } from 'framer-motion'
import RevealText from '../../../components/RevealText'
import CapabilityCard from '../components/CapabilityCard'
import { capabilities, staggerContainer, fadeUp } from '../data/landingData'

export default function CapabilitiesSection({ capsRef, capsGridY }) {
  return (
    <section className="section section--solution" id="capabilities" ref={capsRef}>
      <div className="section__parallax" aria-hidden="true">
        <div className="section__parallax-glow section__parallax-glow--3" />
      </div>
      <div className="section__container">
        <div className="section__number" aria-hidden="true">02</div>
        <motion.div className="section__head" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}>
          <motion.span className="section__label" variants={fadeUp(0)}>The Solution</motion.span>
          <RevealText as="h2" className="section__title" delay={1}>
            Six capabilities. <span className="grad">One complete system.</span>
          </RevealText>
          <motion.p className="section__sub" variants={fadeUp(2)}>
            Not features — outcomes. Each capability solves a specific interview failure mode.
          </motion.p>
        </motion.div>

        <motion.div className="capabilities-grid" style={{ y: capsGridY }} role="list">
          {capabilities.map((cap) => (
            <CapabilityCard
              key={cap.id}
              item={cap}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
