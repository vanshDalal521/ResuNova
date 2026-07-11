import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Lock, LogIn, Eye, EyeOff, BrainCircuit, FileSearch, CalendarDays, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'
import Logo from '../../../components/Logo'
import '../style/login.scss'

const features = [
    {
        icon: FileSearch,
        title: 'AI Resume Analysis',
        desc: 'Deep-scan syntax and semantic alignment against industry benchmarks.',
    },
    {
        icon: BrainCircuit,
        title: 'Tailored Questions',
        desc: 'Predictive interview scenarios based on target corporate profiles.',
    },
    {
        icon: CalendarDays,
        title: '7-Day Roadmap',
        desc: 'Actionable, algorithmic sprint planning for accelerated hiring.',
    },
]

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [focused, setFocused] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            return toast.error('Please fill in all fields')
        }

        const promise = handleLogin({ email, password })

        toast.promise(promise, {
            loading: 'Authorizing...',
            success: 'Welcome back! 🚀',
            error: (err) => err.message,
        })

        const success = await promise
        if (success) {
            navigate('/dashboard')
        }
    }

    return (
        <div className="login-page">
            {/* Animated background orbs */}
            <div className="login-orb login-orb--1" />
            <div className="login-orb login-orb--2" />
            <div className="login-orb login-orb--3" />

            {/* LEFT — Brand Panel */}
            <motion.aside
                className="login-brand"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
                {/* Particles */}
                {[...Array(8)].map((_, i) => (
                    <span key={i} className={`login-particle login-particle--${i + 1}`} />
                ))}

                <div className="login-brand__inner">
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <Logo size={56} />
                    </motion.div>

                    <motion.h1
                        className="login-brand__tagline"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                    >
                        Architect Your Career with{' '}
                        <span className="login-brand__tagline--accent">AI Precision</span>
                    </motion.h1>

                    {/* Feature list */}
                    <ul className="login-features">
                        {features.map((f, i) => (
                            <motion.li
                                key={f.title}
                                className="login-feature"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
                            >
                                <div className="login-feature__icon-wrap">
                                    <f.icon size={18} />
                                </div>
                                <div>
                                    <p className="login-feature__title">{f.title}</p>
                                    <p className="login-feature__desc">{f.desc}</p>
                                </div>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Bottom badge */}
                <div className="login-brand__badge">
                    <span className="login-brand__badge-dot" />
                    Powered by Google Gemini
                </div>
            </motion.aside>

            {/* RIGHT — Login Form */}
            <main className="login-right">
                <motion.div
                    className="login-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                >
                    {/* Top gradient border */}
                    <div className="login-card__top-border" />

                    {/* Header */}
                    <div className="login-card__header">
                        <h2 className="login-card__title">Welcome Back</h2>
                        <p className="login-card__subtitle">Sign in to continue your journey</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="login-form" noValidate>
                        {/* Email */}
                        <div className={`login-field ${focused === 'email' ? 'login-field--focused' : ''}`}>
                            <label htmlFor="email" className="login-field__label">Email Address</label>
                            <div className="login-field__input-wrap">
                                <Mail className="login-field__icon" size={17} />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocused('email')}
                                    onBlur={() => setFocused(null)}
                                    placeholder="name@example.com"
                                    className="login-field__input"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className={`login-field ${focused === 'password' ? 'login-field--focused' : ''}`}>
                            <div className="login-field__label-row">
                                <label htmlFor="password" className="login-field__label">Password</label>
                                <a href="#" className="login-field__forgot">Forgot Password?</a>
                            </div>
                            <div className="login-field__input-wrap">
                                <Lock className="login-field__icon" size={17} />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocused('password')}
                                    onBlur={() => setFocused(null)}
                                    placeholder="••••••••"
                                    className="login-field__input"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    className="login-field__eye-btn"
                                    onClick={() => setShowPassword((s) => !s)}
                                    tabIndex={-1}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.span
                                            key={showPassword ? 'hide' : 'show'}
                                            initial={{ opacity: 0, scale: 0.7 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.7 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </motion.span>
                                    </AnimatePresence>
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            className="login-submit"
                            disabled={loading}
                            whileHover={!loading ? { y: -3, boxShadow: '0 20px 40px -10px rgba(99,102,241,0.55)' } : {}}
                            whileTap={!loading ? { scale: 0.98, y: 0 } : {}}
                        >
                            {loading ? (
                                <>
                                    <span className="login-submit__spinner" />
                                    Authorizing...
                                </>
                            ) : (
                                <>
                                    <LogIn size={17} />
                                    Authorize Access
                                    <ArrowRight size={15} className="login-submit__arrow" />
                                </>
                            )}
                        </motion.button>

                        {/* Divider */}
                        <div className="login-divider">
                            <span />
                            <p>OR</p>
                            <span />
                        </div>
                    </form>

                    {/* Register link */}
                    <p className="login-card__register">
                        New to ResuNova?{' '}
                        <Link to="/register" className="login-card__register-link">
                            Begin Your Evolution
                        </Link>
                    </p>
                </motion.div>
            </main>
        </div>
    )
}

export default Login