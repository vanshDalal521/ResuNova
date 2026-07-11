import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import RevealText from '../../../components/RevealText'
import TestimonialCard from '../components/TestimonialCard'
import { socialProof, staggerContainer, fadeUp } from '../data/landingData'

export default function ProofSection() {
  return (
    <section className="section section--proof" id="proof">
      <div className="section__container">
        <div className="section__number" aria-hidden="true">03</div>
        <motion.div className="section__head" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}>
          <motion.span className="section__label" variants={fadeUp(0)}><Award size={12} /> Proof</motion.span>
          <RevealText as="h2" className="section__title" delay={1}>
            2,400+ engineers. <span className="grad">Real outcomes.</span>
          </RevealText>
          <motion.p className="section__sub" variants={fadeUp(2)}>
            Not cherry-picked testimonials — verifiable results from engineers at the companies you want to join.
          </motion.p>
        </motion.div>

        <div className="testimonials-grid" role="list">
          {socialProof.map((testimonial, i) => (
            <TestimonialCard
              key={i}
              item={testimonial}
            />
          ))}
        </div>

        <motion.div className="proof-stats" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }}>
          <div className="proof-stat">
            <span className="proof-stat__num">92%</span>
            <span className="proof-stat__label">Pro users get offers within 4 weeks</span>
          </div>
          <div className="proof-stat">
            <span className="proof-stat__num">4.9/5</span>
            <span className="proof-stat__label">Average satisfaction across 2,400+ reviews</span>
          </div>
          <div className="proof-stat">
            <span className="proof-stat__num">3.2x</span>
            <span className="proof-stat__label">More interviews vs. unprepared peers</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
