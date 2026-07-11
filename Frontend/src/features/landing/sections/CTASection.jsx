import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router'
import { staggerContainer, fadeUp } from '../data/landingData'

export default function CTASection() {
  const navigate = useNavigate()

  return (
    <section className="cta" id="cta">
      <div className="cta__bg" aria-hidden="true">
        <div className="cta__orb cta__orb--1" />
        <div className="cta__orb cta__orb--2" />
      </div>
      <motion.div className="cta__inner" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}>
        <motion.h2 className="cta__title" variants={fadeUp(0)}>
          Ready to stop guessing
          <br />
          <span className="grad">and start winning?</span>
        </motion.h2>
        <motion.p className="cta__sub" variants={fadeUp(1)}>
          Join 2,400+ engineers who transformed their interview outcomes with AI.
        </motion.p>
        <motion.div className="cta__actions" variants={fadeUp(2)}>
          <motion.button
            className="btn btn--primary btn--lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/register')}
          >
            Start Free — No Credit Card <ArrowRight size={17} />
          </motion.button>
          <motion.button
            className="btn btn--ghost btn--lg"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/login')}
          >
            Already have an account?
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}
