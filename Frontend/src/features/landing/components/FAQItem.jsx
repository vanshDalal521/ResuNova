import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function FAQItem({ item, index, isOpen, onToggle }) {
  const contentRef = useRef(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [isOpen])

  return (
    <motion.div
      className={`faq-item ${isOpen ? 'faq-item--open' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.23, 1, 0.32, 1] }}
    >
      <button className="faq-item__summary" onClick={() => onToggle(index)}>
        <span className="faq-item__question">{item.q}</span>
        <motion.span className="faq-item__chevron" animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>
          <ChevronDown size={18} />
        </motion.span>
      </button>
      <motion.div
        className="faq-item__content"
        initial={false}
        animate={{ height: isOpen ? contentHeight : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div ref={contentRef} className="faq-item__answer">
          <p>{item.a}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}
