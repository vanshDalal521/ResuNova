import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'

const sections = [
  { id: 'hero', number: '0', label: 'Home' },
  { id: 'problem', number: '1', label: 'Problem' },
  { id: 'capabilities', number: '2', label: 'Capabilities' },
  { id: 'proof', number: '3', label: 'Proof' },
  { id: 'how-it-works', number: '4', label: 'Process' },
  { id: 'pricing', number: '5', label: 'Pricing' },
  { id: 'faq', number: '6', label: 'FAQ' },
  { id: 'cta', number: '7', label: 'Start' },
]

export default function SectionNav() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { scrollY } = useScroll()
  const scrollSmooth = useSpring(scrollY, { stiffness: 100, damping: 30 })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120
      let current = 0
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.offsetTop <= scrollPos) {
          current = i
          break
        }
      }
      setActiveIndex(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="section-nav" aria-label="Section navigation">
      <div className="section-nav__track">
        <motion.div
          className="section-nav__indicator"
          layout
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          style={{
            top: `${(activeIndex / (sections.length - 1)) * 100}%`,
          }}
        />
      </div>
      <ul className="section-nav__items">
        {sections.map((s, i) => (
          <li key={s.id}>
            <button
              className={`section-nav__item ${i === activeIndex ? 'section-nav__item--active' : ''}`}
              onClick={() => scrollToSection(s.id)}
              aria-label={`Scroll to ${s.label}`}
            >
              <span className="section-nav__number">{s.number}</span>
              <span className="section-nav__label">{s.label}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
