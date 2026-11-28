import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { motion } from 'framer-motion'
import {
  ShieldCheck, User, Lock, Eye, EyeOff, ArrowLeft,
  Sparkles, LogIn, AlertCircle
} from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../../auth/hooks/useAuth'
import '../style/admin.scss'

const AdminLogin = () => {
  const { user, loading, handleLogin, handleLogout } = useAuth()
  const navigate = useNavigate()

  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [touched, setTouched] = useState({ identifier: false, password: false })

  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin', { replace: true })
    }
  }, [user, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTouched({ identifier: true, password: true })
    setErrorMsg('')

    if (!identifier.trim() || !password) {
      setErrorMsg('Please enter both admin username and password.')
      return
    }

    try {
      const loggedInUser = await handleLogin({ email: identifier.trim(), password })
      if (loggedInUser?.role !== 'admin') {
        await handleLogout()
        throw new Error('This account does not have administrator access.')
      }
      toast.success('Admin access authorized.')
      navigate('/admin', { replace: true })
    } catch (err) {
      const msg = err?.message || 'Invalid admin credentials'
      setErrorMsg(msg)
      toast.error(msg)
    }
  }

  const idInvalid = touched.identifier && !identifier.trim()
  const pwdInvalid = touched.password && !password

  return (
    <div className="admin-shell">
      <div className="admin-ambient" aria-hidden="true">
        <div className="admin-blob admin-blob--1" />
        <div className="admin-blob admin-blob--2" />
        <div className="admin-blob admin-blob--3" />
        <div className="admin-grid-overlay" />
      </div>

      <main className="admin-login-page">
        <motion.div
          className="admin-login-card admin-glass"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <button
            type="button"
            className="admin-login-back"
            onClick={() => navigate('/')}
          >
            <ArrowLeft size={15} aria-hidden="true" />
            Back to ResuNova
          </button>

          <div className="admin-login-header">
            <div className="admin-login-shield" aria-hidden="true">
              <ShieldCheck size={30} />
            </div>
            <div className="admin-login-badge">
              <Sparkles size={12} aria-hidden="true" />
              Admin Portal
            </div>
            <h1 className="admin-login-title">Admin Command Access</h1>
            <p className="admin-login-sub">
              Sign in with your administrator account to manage users, reports, and platform access.
            </p>
          </div>

          <form
            className="admin-form"
            method="POST"
            onSubmit={handleSubmit}
            aria-label="Admin login form"
            noValidate
          >
            {errorMsg && (
              <div className="admin-error-banner" role="status" aria-live="polite">
                <AlertCircle size={16} aria-hidden="true" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="admin-field">
              <label htmlFor="admin-username" className="admin-field__label">
                Admin Username or Email <span aria-hidden="true">*</span>
              </label>
              <div className="admin-field__wrap">
                <User className="admin-field__icon" size={17} aria-hidden="true" />
                <input
                  id="admin-username"
                  name="username"
                  type="text"
                  className="admin-field__input"
                  value={identifier}
                  onChange={(e) => {
                    setIdentifier(e.target.value)
                    if (errorMsg) setErrorMsg('')
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, identifier: true }))}
                  placeholder="admin username or email"
                  autoComplete="username"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  enterKeyHint="next"
                  required
                  aria-invalid={idInvalid}
                  aria-describedby={idInvalid ? 'admin-id-err' : undefined}
                />
              </div>
              {idInvalid && (
                <span id="admin-id-err" className="admin-field__error">
                  Admin username is required.
                </span>
              )}
            </div>

            <div className="admin-field">
              <label htmlFor="admin-password" className="admin-field__label">
                Admin Password <span aria-hidden="true">*</span>
              </label>
              <div className="admin-field__wrap">
                <Lock className="admin-field__icon" size={17} aria-hidden="true" />
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  className="admin-field__input"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    if (errorMsg) setErrorMsg('')
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  enterKeyHint="done"
                  required
                  aria-invalid={pwdInvalid}
                  aria-describedby={pwdInvalid ? 'admin-pwd-err' : undefined}
                />
                <button
                  type="button"
                  className="admin-field__eye"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-pressed={showPassword}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                </button>
              </div>
              {pwdInvalid && (
                <span id="admin-pwd-err" className="admin-field__error">
                  Admin password is required.
                </span>
              )}
            </div>

            <button
              type="submit"
              className="admin-submit-btn"
              disabled={loading}
            >
              <LogIn size={18} aria-hidden="true" />
              {loading ? 'Verifying Access…' : 'Enter Admin Panel'}
            </button>
          </form>
        </motion.div>
      </main>
    </div>
  )
}

export default AdminLogin
