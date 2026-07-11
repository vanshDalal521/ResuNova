import { motion } from 'framer-motion'
import FAQItem from '../components/FAQItem'
import { faqs, staggerContainer, fadeUp } from '../data/landingData'

export default function FAQSection({ openFaq, setOpenFaq }) {
  return (
    <section className="section section--faq" id="faq">
      <div className="section__container">
        <div className="section__number" aria-hidden="true">06</div>
        <motion.div className="section__head" initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={staggerContainer}>
          <motion.span className="section__label" variants={fadeUp(0)}>FAQ</motion.span>
          <motion.h2 className="section__title" variants={fadeUp(1)}>
            <span className="grad">Questions?</span> We have answers.
          </motion.h2>
        </motion.div>

        <div className="faq-grid" role="list">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              item={faq}
              index={i}
              isOpen={openFaq === i}
              onToggle={setOpenFaq}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
