import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

export default function TestimonialCard({ item }) {
  return (
  <motion.article
    className="testimonial-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    whileHover={{ y: -4, boxShadow: '0 24px 48px -12px rgba(167, 183, 231, 0.12)' }}
  >
    <div className="testimonial-card__quote">
      <Quote size={28} className="testimonial-card__quote-icon" />
      <p className="testimonial-card__text">{item.quote}</p>
    </div>
    <div className="testimonial-card__outcome">
      <span className="testimonial-card__metric">{item.metric}</span>
      <span className="testimonial-card__timeline">{item.outcome}</span>
    </div>
    <footer className="testimonial-card__footer">
      <div className="testimonial-card__avatar">{item.avatar}</div>
      <div className="testimonial-card__identity">
        <p className="testimonial-card__name">{item.author}</p>
        <p className="testimonial-card__role">{item.role} · {item.company}</p>
      </div>
    </footer>
  </motion.article>
)
}
