import { Link } from 'react-router'
import Logo from '../../../components/Logo'
import { footerLinks, footerLinkPaths } from '../data/landingData'

export default function FooterSection() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <Logo size={28} />
          <p className="footer__desc">
            AI-powered interview preparation for engineers who want to win offers, not just interviews.
          </p>
          <div className="footer__social">
            <a href="https://www.linkedin.com/in/vanshdalal1/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer__social-link"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></a>
            <a href="mailto:vanshd994@gmail.com" aria-label="Email" className="footer__social-link"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></a>
          </div>
        </div>

        <nav className="footer__nav" aria-label="Footer navigation">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="footer__col">
              <h4 className="footer__col-title">{category}</h4>
              <ul className="footer__col-links">
                {links.map(link => (
                  <li key={link}>
                    <Link to={footerLinkPaths[link] || '/'} className="footer__link">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} ResuNova. All rights reserved.</p>
      </div>
    </footer>
  )
}
