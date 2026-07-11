import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import Logo from '../../../components/Logo'
import { navLinks } from '../data/landingData'

export default function Navbar({ scrolled, menuOpen, setMenuOpen, scrollTo, navId }) {
  const navigate = useNavigate()

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <button className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Logo size={32} />
        </button>
        <nav className="navbar__links">
          {navLinks.map(l => (
            <button key={l} className="navbar__link" onClick={() => scrollTo(navId(l))}>{l}</button>
          ))}
        </nav>
        <div className="navbar__actions">
          <button className="navbar__signin" onClick={() => navigate('/login')}>Sign In</button>
          <motion.button
            className="navbar__cta"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/register')}
          >
            Get Started <ArrowRight size={13} />
          </motion.button>
        </div>
        <button className="navbar__menu" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="navbar__mobile" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
            {navLinks.map(l => (
              <button key={l} className="navbar__mobile-link" onClick={() => scrollTo(navId(l))}>{l}</button>
            ))}
            <hr />
            <button className="navbar__mobile-link" onClick={() => navigate('/login')}>Sign In</button>
            <button className="navbar__mobile-cta" onClick={() => navigate('/register')}>Get Started</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
