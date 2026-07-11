import React, { useState, useMemo } from 'react'
import { useNavigate, Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { motion, AnimatePresence } from 'framer-motion'
import {
    User, Mail, Lock, Eye, EyeOff, UserPlus,
    ArrowRight, ShieldCheck, Sparkles, Zap, Target, TrendingUp
} from 'lucide-react'
import toast from 'react-hot-toast'
import Logo from '../../../components/Logo'
import '../style/register.scss'

/* ── Password strength helper ── */
const getStrength = (pwd) => {
    if (!pwd) return 0
    let s = 0
    if (pwd.length >= 8) s++
    if (/[A-Z]/.test(pwd)) s++
    if (/[0-9]/.test(pwd)) s++
    if (/[^A-Za-z0-9]/.test(pwd)) s++
    return s
}
const strengthLabels = ['', 'Weak', 'Fair', 'Strong', 'Unbreakable']
const strengthColors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e']

/* ── Neural-network node data (static decorative) ── */
const NODES = [
    { cx: 120, cy: 90 }, { cx: 280, cy: 60 }, { cx: 420, cy: 130 },
    { cx: 80,  cy: 220 }, { cx: 220, cy: 260 }, { cx: 370, cy: 200 },
    { cx: 460, cy: 300 }, { cx: 150, cy: 350 }, { cx: 310, cy: 390 },
    { cx: 60,  cy: 430 }, { cx: 410, cy: 440 }, { cx: 240, cy: 140 },
]
const EDGES = [
    [0,1],[1,2],[0,3],[1,4],[2,5],[3,4],[4,5],[5,6],[3,7],[4,8],
    [7,8],[6,10],[8,9],[8,10],[1,11],[11,4],[11,2],
]

const stats = [
    { icon: TrendingUp, value: '2,400+', label: 'Careers Transformed' },
    { icon: Target,     value: '98%',    label: 'Match Rate'          },
    { icon: Zap,        value: '7-Day',  label: 'Ready to Interview'  },
]

const Register = () => {
    const navigate = useNavigate()
    const { loading, handleRegister } = useAuth()

    const [username, setUsername]       = useState('')
    const [email, setEmail]             = useState('')
    const [password, setPassword]       = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [focused, setFocused]         = useState(null)

    const strength = useMemo(() => getStrength(password), [password])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!username || !email || !password) {
            return toast.error('Please fill in all fields')
        }
        if (password.length < 8) {
            return toast.error('Password must be at least 8 characters')
        }
        if (!/[A-Z]/.test(password)) {
            return toast.error('Password must contain at least one uppercase letter')
        }
        if (!/[a-z]/.test(password)) {
            return toast.error('Password must contain at least one lowercase letter')
        }
        if (!/[0-9]/.test(password)) {
            return toast.error('Password must contain at least one number')
        }

        try {
            await handleRegister({ username, email, password })
            toast.success('Account created! Welcome to ResuNova.')
            navigate('/dashboard')
        } catch (err) {
            toast.error(err.message)
        }
    }

    return (
        <div className="reg-page">
            {/* Background orbs */}
            <div className="reg-orb reg-orb--1" />
            <div className="reg-orb reg-orb--2" />
            <div className="reg-orb reg-orb--3" />

            {/* ── LEFT — AI Visual Panel ── */}
            <motion.aside
                className="reg-brand"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <span key={i} className={`reg-particle reg-particle--${i + 1}`} />
                ))}

                <div className="reg-brand__inner">
                    {/* Logo */}
                    <motion.div
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        <Logo size={48} />
                    </motion.div>

                    {/* Neural network SVG */}
                    <motion.div
                        className="reg-neural"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                    >
                        <svg viewBox="0 0 540 500" className="reg-neural__svg" aria-hidden>
                            <defs>
                                <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
                                    <stop offset="0%" stopColor="#6366f1" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0.4" />
                                </radialGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            {/* Edges */}
                            {EDGES.map(([a, b], i) => (
                                <motion.line
                                    key={i}
                                    x1={NODES[a].cx} y1={NODES[a].cy}
                                    x2={NODES[b].cx} y2={NODES[b].cy}
                                    stroke="url(#nodeGrad)"
                                    strokeWidth="1.2"
                                    strokeOpacity="0.35"
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    transition={{ delay: 0.5 + i * 0.04, duration: 0.6 }}
                                />
                            ))}
                            {/* Nodes */}
                            {NODES.map((n, i) => (
                                <motion.circle
                                    key={i}
                                    cx={n.cx} cy={n.cy} r={i % 3 === 0 ? 8 : 5}
                                    fill="url(#nodeGrad)"
                                    filter="url(#glow)"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.4 + i * 0.06, duration: 0.4, type: 'spring' }}
                                />
                            ))}
                            {/* Travelling pulse dots on random edges */}
                            {[EDGES[0], EDGES[3], EDGES[7]].map(([a, b], i) => (
                                <motion.circle
                                    key={`pulse-${i}`}
                                    cx={NODES[a].cx}
                                    cy={NODES[a].cy}
                                    r={3}
                                    fill="#2dd4bf"
                                    filter="url(#glow)"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: [0, 1, 1, 0],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        delay: i * 0.8,
                                        repeat: Infinity,
                                        repeatDelay: 1.5,
                                        ease: 'easeInOut',
                                    }}
                                />
                            ))}
                        </svg>
                    </motion.div>

                    {/* Headline */}
                    <div className="reg-brand__copy">
                        <motion.div
                            className="reg-brand__eyebrow"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Sparkles size={13} />
                            AI Intelligence Active
                        </motion.div>

                        <motion.h1
                            className="reg-brand__title"
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            Join the <span className="reg-brand__title--accent">Elite</span>
                        </motion.h1>

                        <motion.p
                            className="reg-brand__subtitle"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.5 }}
                        >
                            Your AI-powered career transformation begins here.
                        </motion.p>

                        {/* Stats row */}
                        <motion.div
                            className="reg-stats"
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.85, duration: 0.5 }}
                        >
                            {stats.map((s) => (
                                <div key={s.label} className="reg-stat">
                                    <s.icon size={14} className="reg-stat__icon" />
                                    <span className="reg-stat__value">{s.value}</span>
                                    <span className="reg-stat__label">{s.label}</span>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </motion.aside>

            {/* ── RIGHT — Register Form ── */}
            <main className="reg-right">
                <motion.div
                    className="reg-card"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
                >
                    {/* Top teal → violet border */}
                    <div className="reg-card__top-border" />

                    {/* Header */}
                    <div className="reg-card__header">
                        <div className="reg-card__trust-badge">
                            <ShieldCheck size={14} />
                            Free — No credit card required
                        </div>
                        <h2 className="reg-card__title">Initialize Profile</h2>
                        <p className="reg-card__subtitle">Begin your evolution — it's completely free</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="reg-form" noValidate>
                        {/* Username */}
                        <div className={`reg-field ${focused === 'username' ? 'reg-field--focused' : ''}`}>
                            <label htmlFor="reg-username" className="reg-field__label">Username</label>
                            <div className="reg-field__input-wrap">
                                <User className="reg-field__icon" size={16} />
                                <input
                                    id="reg-username"
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onFocus={() => setFocused('username')}
                                    onBlur={() => setFocused(null)}
                                    placeholder="johndoe"
                                    className="reg-field__input"
                                    autoComplete="username"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className={`reg-field ${focused === 'email' ? 'reg-field--focused' : ''}`}>
                            <label htmlFor="reg-email" className="reg-field__label">Email Address</label>
                            <div className="reg-field__input-wrap">
                                <Mail className="reg-field__icon" size={16} />
                                <input
                                    id="reg-email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocused('email')}
                                    onBlur={() => setFocused(null)}
                                    placeholder="name@example.com"
                                    className="reg-field__input"
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className={`reg-field ${focused === 'password' ? 'reg-field--focused' : ''}`}>
                            <label htmlFor="reg-password" className="reg-field__label">Password</label>
                            <div className="reg-field__input-wrap">
                                <Lock className="reg-field__icon" size={16} />
                                <input
                                    id="reg-password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocused('password')}
                                    onBlur={() => setFocused(null)}
                                    placeholder="min 6 characters"
                                    className="reg-field__input"
                                    autoComplete="new-password"
                                />
                                <button
                                    type="button"
                                    className="reg-field__eye-btn"
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
                                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                        </motion.span>
                                    </AnimatePresence>
                                </button>
                            </div>

                            {/* Password strength meter */}
                            <AnimatePresence>
                                {password.length > 0 && (
                                    <motion.div
                                        className="reg-strength"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <div className="reg-strength__bars">
                                            {[1, 2, 3, 4].map((lvl) => (
                                                <motion.div
                                                    key={lvl}
                                                    className="reg-strength__bar"
                                                    animate={{
                                                        backgroundColor: lvl <= strength
                                                            ? strengthColors[strength]
                                                            : 'rgba(255,255,255,0.08)',
                                                    }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                            ))}
                                        </div>
                                        <motion.span
                                            className="reg-strength__label"
                                            animate={{ color: strengthColors[strength] }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {strengthLabels[strength]}
                                        </motion.span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Submit */}
                        <motion.button
                            type="submit"
                            className="reg-submit"
                            disabled={loading}
                            whileHover={!loading ? { y: -3, boxShadow: '0 20px 40px -10px rgba(45,212,191,0.45)' } : {}}
                            whileTap={!loading ? { scale: 0.98, y: 0 } : {}}
                        >
                            {loading ? (
                                <>
                                    <span className="reg-submit__spinner" />
                                    Initializing...
                                </>
                            ) : (
                                <>
                                    <UserPlus size={16} />
                                    Create Account
                                    <ArrowRight size={14} className="reg-submit__arrow" />
                                </>
                            )}
                        </motion.button>

                        {/* Terms */}
                        <p className="reg-form__terms">
                            By signing up, you agree to our{' '}
                            <a href="#" className="reg-form__terms-link">Terms of Service</a>
                            {' '}and{' '}
                            <a href="#" className="reg-form__terms-link">Privacy Policy</a>
                        </p>
                    </form>

                    {/* Login link */}
                    <p className="reg-card__login">
                        Already a member?{' '}
                        <Link to="/login" className="reg-card__login-link">
                            Authorize Access
                        </Link>
                    </p>
                </motion.div>
            </main>
        </div>
    )
}

export default Register