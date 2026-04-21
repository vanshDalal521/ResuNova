import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Code,
    MessageSquare,
    Map,
    FileDown,
    ChevronDown,
    AlertCircle,
    ArrowLeft,
    Target,
    Lightbulb,
    CheckCircle2,
    Zap,
    Clock,
    BookOpen,
} from 'lucide-react'
import toast from 'react-hot-toast'
import ProfileMenu from '../../auth/components/ProfileMenu'

// ── Animated SVG Score Ring ────────────────────────────────────────────────────
const ScoreRing = ({ score }) => {
    const radius = 58
    const circ = 2 * Math.PI * radius
    const dashOffset = circ - (circ * score) / 100
    const colorClass = score >= 80 ? 'score--high' : score >= 60 ? 'score--mid' : 'score--low'

    return (
        <div className="score-ring-container">
            <svg viewBox="0 0 140 140" width="140" height="140">
                <circle className="score-ring-bg" cx="70" cy="70" r={radius} />
                <motion.circle
                    className={`score-ring-fill ${colorClass}`}
                    cx="70"
                    cy="70"
                    r={radius}
                    strokeDasharray={circ}
                    initial={{ strokeDashoffset: circ }}
                    animate={{ strokeDashoffset: dashOffset }}
                    transition={{ duration: 1.6, ease: [0.23, 1, 0.32, 1], delay: 0.3 }}
                />
            </svg>
            <div className="score-center">
                <motion.span
                    className="score-value"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                >
                    {score}
                </motion.span>
                <span className="score-pct">/ 100</span>
            </div>
        </div>
    )
}

// ── Question Card ──────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [open, setOpen] = useState(false)

    return (
        <motion.div
            className={`q-card ${open ? 'q-card--open' : ''}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.35 }}
        >
            <div className="q-card__header" onClick={() => setOpen(o => !o)}>
                <span className="q-card__index">{index + 1}</span>
                <p className="q-card__question">{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <ChevronDown size={18} />
                </span>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="q-card__body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                    >
                        {/* Intention Section */}
                        <div className="q-card__section q-card__section--intention">
                            <div className="q-card__label q-card__label--intention">
                                <Target size={13} />
                                <span>Interviewer's Intention</span>
                            </div>
                            <p>{item.intention}</p>
                        </div>

                        {/* Answer Strategy Section */}
                        <div className="q-card__section q-card__section--answer">
                            <div className="q-card__label q-card__label--answer">
                                <Lightbulb size={13} />
                                <span>Model Answer Strategy</span>
                            </div>
                            <p>{item.answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

// ── Roadmap Day (Timeline) ─────────────────────────────────────────────────────
const RoadMapDay = ({ day, index }) => (
    <motion.div
        className="roadmap-day"
        initial={{ opacity: 0, x: -15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.08, duration: 0.4 }}
    >
        {/* Timeline node */}
        <div className="roadmap-day__node">
            <div className="roadmap-day__bullet">
                {day.day}
            </div>
        </div>

        {/* Card */}
        <div className="roadmap-day__card">
            <div className="roadmap-day__header">
                <span className="roadmap-day__badge">Day {day.day}</span>
                <h3 className="roadmap-day__focus">{day.focus}</h3>
            </div>
            <ul className="roadmap-day__tasks">
                {day.tasks.map((task, i) => (
                    <li key={i}>
                        <div className="task-check">
                            <CheckCircle2 size={11} />
                        </div>
                        <span>{task}</span>
                    </li>
                ))}
            </ul>
        </div>
    </motion.div>
)

// ── Nav Config ─────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
    { id: 'technical',  label: 'Technical',  subLabel: 'Precision Analysis', icon: <Code size={16} /> },
    { id: 'behavioral', label: 'Behavioral', subLabel: 'Impact Framework',   icon: <MessageSquare size={16} /> },
    { id: 'roadmap',    label: 'Roadmap',    subLabel: 'Readiness Pathway',  icon: <Map size={16} /> },
]

// ── Main Component ─────────────────────────────────────────────────────────────
const Interview = () => {
    const [activeNav, setActiveNav] = useState('technical')
    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        if (interviewId) getReportById(interviewId)
    }, [interviewId])

    const handleDownload = async () => {
        const promise = getResumePdf(interviewId)
        toast.promise(promise, {
            loading: 'Crafting your tailored resume…',
            success: 'Resume downloaded!',
            error: 'Failed to generate resume. Try again.',
        })
    }

    // ── Loading State ────────────────────────────────────────────────────────
    if (loading) {
        return (
            <main className="loading-screen">
                <div className="loading-spinner" />
                <h1>Analyzing your profile…</h1>
                <p>Generating your personalized interview plan</p>
            </main>
        )
    }

    // ── Error State ──────────────────────────────────────────────────────────
    if (!report) {
        return (
            <main className="loading-screen">
                <AlertCircle size={52} color="#f87171" />
                <h1>Report Not Found</h1>
                <p>We couldn't load the requested interview plan.</p>
                <button className="back-btn" onClick={() => navigate('/')} style={{ marginTop: '1rem', width: 'auto' }}>
                    <ArrowLeft size={16} /> Back to Dashboard
                </button>
            </main>
        )
    }

    const scoreColor = report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'
    const scoreStatus = report.matchScore >= 80 ? 'Mastery Fit' : report.matchScore >= 60 ? 'Strong Alignment' : 'Skill Gap Present'

    const NAV_COUNTS = {
        technical:  report.technicalQuestions?.length  ?? 0,
        behavioral: report.behavioralQuestions?.length ?? 0,
        roadmap:    report.preparationPlan?.length     ?? 0,
    }

    const CONTENT_META = {
        technical:  { eyebrow: 'Technical Analysis', title: 'Precision Interview Questions', sub: 'Architectural and syntax-level challenges synthesized from your exact stack and experience.', chips: [`${NAV_COUNTS.technical} Questions`, 'Stack-specific'] },
        behavioral: { eyebrow: 'Behavioral Framework', title: 'Situational Impact Questions', sub: 'Scenario-driven questions designed to showcase leadership, ownership, and cultural alignment.', chips: [`${NAV_COUNTS.behavioral} Questions`, 'Culture-fit'] },
        roadmap:    { eyebrow: 'Preparation Roadmap', title: 'Optimised Readiness Pathway', sub: 'A deterministic day-by-day timeline engineered for maximum retention before your interview.', chips: [`${NAV_COUNTS.roadmap} Days`, 'Structured'] },
    }

    const meta = CONTENT_META[activeNav]

    return (
        <motion.div
            className="interview-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="interview-layout">

                {/* ── Left Sidebar Navigation ──────────────────────────── */}
                <nav className="interview-nav">
                    <div className="nav-header">
                        <button className="back-btn" onClick={() => navigate('/')}>
                            <ArrowLeft size={15} />
                            Dashboard
                        </button>
                        <div style={{ marginTop: '1.25rem' }}>
                            <ProfileMenu />
                        </div>
                    </div>

                    <div className="nav-content">
                        <p className="interview-nav__section-label">Report Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className="nav-icon">{item.icon}</span>
                                <span className="interview-nav__text">{item.label}</span>
                                <span className="nav-count">{NAV_COUNTS[item.id]}</span>
                            </button>
                        ))}
                    </div>

                    <div className="nav-footer">
                        <button className="download-btn" onClick={handleDownload}>
                            <FileDown size={17} />
                            Generate Resume
                        </button>
                    </div>
                </nav>

                {/* ── Main Content ─────────────────────────────────────── */}
                <main className="interview-content">

                    {/* Pinned header — never scrolls away */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeNav + '-header'}
                            className="content-header"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="section-eyebrow">
                                <span className="dot" />
                                {meta.eyebrow}
                            </div>
                            <h2>{meta.title}</h2>
                            <p>{meta.sub}</p>
                            <div className="content-meta">
                                {meta.chips.map((c, i) => (
                                    <div className="meta-chip" key={i}>
                                        {i === 0 ? <BookOpen size={12} /> : <Zap size={12} />}
                                        {c}
                                    </div>
                                ))}
                                <div className="meta-chip">
                                    <Clock size={12} />
                                    AI Generated
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Scrollable list body — each tab mounts fresh, always starts at top */}
                    <div className="content-body-scroll">
                        <AnimatePresence mode="wait">
                            {activeNav === 'technical' && (
                                <motion.div
                                    key="technical"
                                    className="q-list"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {report.technicalQuestions.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </motion.div>
                            )}
                            {activeNav === 'behavioral' && (
                                <motion.div
                                    key="behavioral"
                                    className="q-list"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {report.behavioralQuestions.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </motion.div>
                            )}
                            {activeNav === 'roadmap' && (
                                <motion.div
                                    key="roadmap"
                                    className="roadmap-list"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {report.preparationPlan.map((day, i) => (
                                        <RoadMapDay key={day.day} day={day} index={i} />
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </main>

                {/* ── Right Sidebar ────────────────────────────────────── */}
                <aside className="interview-sidebar">

                    {/* Match Score */}
                    <div className="sidebar-section">
                        <p className="sidebar-label">Strategic Alignment</p>
                        <div className="match-score-wrapper">
                            <ScoreRing score={report.matchScore} />
                            <div className="score-info">
                                <p className={`score-status ${scoreColor}`}>{scoreStatus}</p>
                                <p className="score-sub">Core competency index</p>
                            </div>
                        </div>

                        <div className="score-stats">
                            <div className="stat-chip">
                                <span className="stat-val">{report.technicalQuestions?.length ?? 0}</span>
                                <span className="stat-lbl">Technical Q</span>
                            </div>
                            <div className="stat-chip">
                                <span className="stat-val">{report.behavioralQuestions?.length ?? 0}</span>
                                <span className="stat-lbl">Behavioral Q</span>
                            </div>
                            <div className="stat-chip">
                                <span className="stat-val">{report.preparationPlan?.length ?? 0}</span>
                                <span className="stat-lbl">Day Plan</span>
                            </div>
                            <div className="stat-chip">
                                <span className="stat-val">{report.skillGaps?.length ?? 0}</span>
                                <span className="stat-lbl">Skill Gaps</span>
                            </div>
                        </div>
                    </div>

                    {/* Skill Gaps */}
                    <div className="sidebar-section">
                        <p className="sidebar-label">Bridgeable Skill Gaps</p>
                        <div className="skill-gaps__list">
                            {report.skillGaps.map((gap, i) => (
                                <motion.div
                                    key={i}
                                    className={`skill-tag skill-tag--${gap.severity}`}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.25 + i * 0.07 }}
                                >
                                    <div className="skill-name">
                                        {gap.severity === 'high' && <AlertCircle size={13} />}
                                        <span>{gap.skill}</span>
                                    </div>
                                    <span className="severity-badge">{gap.severity}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Report Title */}
                    {report.title && (
                        <div className="sidebar-section">
                            <p className="sidebar-label">Report Title</p>
                            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, fontWeight: 600 }}>
                                {report.title}
                            </p>
                        </div>
                    )}
                </aside>

            </div>
        </motion.div>
    )
}

export default Interview