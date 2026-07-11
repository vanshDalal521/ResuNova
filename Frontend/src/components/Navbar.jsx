import React from 'react'
import { useNavigate, useLocation } from 'react-router'
import Logo from './Logo'
import ProfileMenu from '../features/auth/components/ProfileMenu'
import './navbar.scss'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/dashboard'

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <button className="navbar__logo-btn" onClick={() => navigate('/dashboard')}>
          <Logo size={34} />
        </button>
      </div>
      <div className="navbar__right">
        <button
          className={`navbar__link ${isHome ? 'navbar__link--active' : ''}`}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </button>
        <ProfileMenu />
      </div>
    </nav>
  )
}

export default Navbar
