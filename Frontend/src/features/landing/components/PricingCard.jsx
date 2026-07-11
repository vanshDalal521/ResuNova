import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export default function PricingCard({ plan, onCtaClick }) {
  return (
    <motion.article
      className={`pricing-card ${plan.popular ? 'pricing-card--popular' : ''}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    >
      {plan.badge && (
        <span className="pricing-card__badge">{plan.badge}</span>
      )}
      <div className="pricing-card__header">
        <h3 className="pricing-card__name">{plan.name}</h3>
        <div className="pricing-card__price">
          <span className="pricing-card__amount">{plan.price}</span>
          <span className="pricing-card__period">{plan.period}</span>
        </div>
        <p className="pricing-card__tagline">{plan.tagline}</p>
      </div>
      <ul className="pricing-card__features">
        {plan.features.map((f, i) => (
          <li key={i} className="pricing-card__feature">
            <Check size={15} className="pricing-card__check" />
            <span>{f.text}</span>
          </li>
        ))}
      </ul>
      <motion.button
        className={`pricing-card__cta ${plan.popular ? 'pricing-card__cta--primary' : ''}`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onCtaClick}
      >
        {plan.cta}
      </motion.button>
    </motion.article>
  )
}
