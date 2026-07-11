import { motion } from 'framer-motion'

const wordVariant = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  },
}

const containerVariant = (delay) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 * delay },
  },
})

export default function RevealText({
  children,
  as: Tag = 'h1',
  className = '',
  delay = 0,
  once = true,
}) {
  const isString = typeof children === 'string'
  const isArray = Array.isArray(children)

  if (isString) {
    const words = children.split(' ')
    return (
      <Tag className={className} style={{ overflow: 'hidden' }}>
        <motion.span
          variants={containerVariant(delay)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once, margin: '-80px' }}
          style={{ display: 'inline-block' }}
          aria-label={children}
        >
          {words.map((word, i) => (
            <span key={i} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
              <motion.span
                variants={wordVariant}
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
              >
                {word}{i < words.length - 1 ? '\u00A0' : ''}
              </motion.span>
            </span>
          ))}
        </motion.span>
      </Tag>
    )
  }

  return (
    <Tag className={className}>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.05 * delay, ease: [0.23, 1, 0.32, 1] }}
        style={{ display: 'inline' }}
      >
        {children}
      </motion.span>
    </Tag>
  )
}
