import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router'
import { useScroll, useTransform } from 'framer-motion'
import { useAuth } from '../../auth/hooks/useAuth'
import SectionNav from '../../../components/SectionNav'
import ScrollProgress from '../components/ScrollProgress'
import FloatingOrbs from '../components/FloatingOrbs'
import Navbar from '../components/Navbar'
import HeroSection from '../sections/HeroSection'
import ProblemSection from '../sections/ProblemSection'
import CapabilitiesSection from '../sections/CapabilitiesSection'
import ProofSection from '../sections/ProofSection'
import ProcessSection from '../sections/ProcessSection'
import PricingSection from '../sections/PricingSection'
import FAQSection from '../sections/FAQSection'
import CTASection from '../sections/CTASection'
import FooterSection from '../sections/FooterSection'
import '../style/landing.scss'

const Landing = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const heroRef = useRef(null)
  const capsRef = useRef(null)

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start end', 'end start'],
  })
  const heroCardY = useTransform(heroScroll, [0, 1], [0, -120])
  const heroCardScale = useTransform(heroScroll, [0, 0.5, 1], [1, 0.98, 0.95])

  const { scrollYProgress: capsScroll } = useScroll({
    target: capsRef,
    offset: ['start end', 'end start'],
  })
  const capsGridY = useTransform(capsScroll, [0, 1], [40, -40])

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  const navId = (label) => label === 'How It Works' ? 'how-it-works' : label.toLowerCase()

  return (
    <div className="landing">
      <ScrollProgress />
      <SectionNav />
      <FloatingOrbs />

      <Navbar
        scrolled={scrolled}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        scrollTo={scrollTo}
        navId={navId}
      />

      <HeroSection
        heroRef={heroRef}
        heroCardY={heroCardY}
        heroCardScale={heroCardScale}
        scrollTo={scrollTo}
      />

      <ProblemSection />

      <CapabilitiesSection
        capsRef={capsRef}
        capsGridY={capsGridY}
      />

      <ProofSection />
      <ProcessSection />
      <PricingSection />

      <FAQSection
        openFaq={openFaq}
        setOpenFaq={setOpenFaq}
      />

      <CTASection />
      <FooterSection />
    </div>
  )
}

export default Landing
