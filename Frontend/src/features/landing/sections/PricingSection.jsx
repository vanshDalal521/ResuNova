import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import RevealText from '../../../components/RevealText'
import PricingCard from '../components/PricingCard'
import { plans, staggerContainer, fadeUp } from '../data/landingData'
import { createCheckoutSession } from '../../auth/services/payment.api'
import { useAuth } from '../../auth/hooks/useAuth'

export default function PricingSection() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleStarterClick = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      navigate('/register')
    }
  }

  const handleProClick = async () => {
    if (!user) {
      navigate('/register')
      return
    }
    try {
      const data = await createCheckoutSession()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error('Checkout failed:', err)
    }
  }

  return (
    <section className="section section--pricing" id="pricing">
      <div className="section__container">
        <div className="section__number" aria-hidden="true">05</div>
        <motion.div className="section__head" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}>
          <motion.span className="section__label" variants={fadeUp(0)}>Pricing</motion.span>
          <RevealText as="h2" className="section__title" delay={1}>
            Simple, <span className="grad">value-aligned</span> pricing.
          </RevealText>
          <motion.p className="section__sub" variants={fadeUp(2)}>
            Start free. Upgrade when the ROI is obvious.
          </motion.p>
        </motion.div>

        <div className="pricing-grid" role="list">
          <PricingCard plan={plans[0]} onCtaClick={handleStarterClick} />
          <PricingCard plan={plans[1]} onCtaClick={handleProClick} />
        </div>

        <motion.p className="pricing-note" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, margin: '-60px' }}>
          Cancel anytime. No questions asked.
        </motion.p>
      </div>
    </section>
  )
}
