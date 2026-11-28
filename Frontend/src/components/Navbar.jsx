import React from 'react'
import { useNavigate, useLocation } from 'react-router'
import { ShieldCheck } from 'lucide-react'
import Logo from './Logo'
import ProfileMenu from '../features/auth/components/ProfileMenu'
import { useAuth } from '../features/auth/hooks/useAuth'
import './navbar.scss'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user } = useAuth()
  const isHome = location.pathname === '/dashboard'
  const isAdminPage = location.pathname === '/admin'

  return (
    <nav className="navbar" aria-label="Primary">
      <div className="navbar__left">
        <button className="navbar__logo-btn" onClick={() => navigate('/dashboard')}>
          <Logo size={34} />
        </button>
      </div>
      <div className="navbar__right">
        <button
          className={`navbar__link ${isHome ? 'navbar__link--active' : ''}`}
          aria-current={isHome ? 'page' : undefined}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </button>
        {user?.role === 'admin' && (
          <button
            className={`navbar__link ${isAdminPage ? 'navbar__link--active' : ''}`}
            aria-current={isAdminPage ? 'page' : undefined}
            onClick={() => navigate('/admin')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <ShieldCheck size={14} aria-hidden="true" />
            Admin Panel
          </button>
        )}
        <ProfileMenu />
      </div>
    </nav>
  )
}

export default Navbar
