import { motion } from 'framer-motion'

export default function CapabilityCard({ item }) {
  return (
  <motion.article
    className="capability-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
    whileHover={{ y: -6, boxShadow: '0 32px 64px -16px rgba(167, 183, 231, 0.15)' }}
    style={{ '--card-color': item.color }}
  >
    <div className="capability-card__icon" style={{ background: `${item.color}15`, color: item.color, borderColor: `${item.color}30` }}>
      <item.icon size={22} />
    </div>
    <div className="capability-card__badge" style={{ background: `${item.color}15`, color: item.color, borderColor: `${item.color}30` }}>
      {item.metric}
    </div>
    <h3 className="capability-card__title">{item.title}</h3>
    <p className="capability-card__desc">{item.desc}</p>
  </motion.article>
)}
