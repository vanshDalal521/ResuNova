import React, { useState, useRef, useEffect } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Briefcase, User, UploadCloud, Sparkles, Clock, ChevronRight,
  FileText, Building2, ArrowUpFromLine, Target, Zap, ScrollText, Crown
} from 'lucide-react'
import toast from 'react-hot-toast'
import Navbar from '../../../components/Navbar'
import { useAuth } from '../../auth/hooks/useAuth'
import { useEntitlements } from '../../auth/hooks/useEntitlements'
import UpgradeToProModal from '../../../components/UpgradeToProModal'

const Home = () => {
  const { user } = useAuth()
  const { entitlements, loading: entitlementsLoading, refreshEntitlements, canAnalyze } = useEntitlements()
  const { loading, generateReport, reports } = useInterview()
  const [jobDescription, setJobDescription] = useState("")
  const [selfDescription, setSelfDescription] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [fileName, setFileName] = useState("")
  const [showLimitModal, setShowLimitModal] = useState(false)
  const resumeInputRef = useRef()
  const navigate = useNavigate()

  const isPro = user?.plan === 'pro' && user?.subscriptionStatus === 'active'
  const usage = entitlements?.usage
  const used = usage?.used ?? 0
  const limit = usage?.limit ?? 3
  const remaining = usage?.remaining ?? 0
  const blocked = usage?.blocked ?? false
  const nextResetAt = usage?.nextResetAt

  // Countdown timer
  const [countdown, setCountdown] = useState("")
  useEffect(() => {
    if (!nextResetAt || isPro) return
    const interval = setInterval(() => {
      const diff = new Date(nextResetAt).getTime() - Date.now()
      if (diff <= 0) {
        clearInterval(interval)
        setCountdown("Available now")
        refreshEntitlements()
        return
      }
      const h = Math.floor(diff / 3600000)
      const m = Math.floor((diff % 3600000) / 60000)
      const s = Math.floor((diff % 60000) / 1000)
      setCountdown(h > 0 ? `${h}h ${m}m ${s}s` : `${m}m ${s}s`)
    }, 1000)
    return () => clearInterval(interval)
  }, [nextResetAt, isPro, refreshEntitlements])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5MB")
        e.target.value = ""
        setFileName("")
        return
      }
      setFileName(file.name)
      toast.success(`Selected: ${file.name}`)
    }
  }

  const handleGenerateReport = async () => {
    const resumeFile = resumeInputRef.current.files[0]
    if (!jobDescription.trim()) {
      toast.error("Please provide a job description")
      return
    }
    if (!resumeFile && !selfDescription.trim()) {
      toast.error("Please upload a resume or provide a self-description")
      return
    }

    // Check limit before attempting
    if (!isPro && blocked) {
      setShowLimitModal(true)
      return
    }

    try {
      const data = await generateReport({ jobDescription, selfDescription, resumeFile, companyName })
      if (data && data._id) {
        refreshEntitlements()
        navigate(`/interview/${data._id}`)
      }
    } catch (err) {
      const statusCode = err?.response?.status
      const errCode = err?.response?.data?.error?.code
      let msg = err?.response?.data?.error?.message || 'Failed to generate strategy. Please try again.'

      if (statusCode === 429 && errCode === "GEMINI_QUOTA_EXHAUSTED") {
        msg = "AI service quota exhausted. Please try again later."
      } else if (statusCode === 429) {
        msg = "Too many requests. Please wait a moment and try again."
      }

      toast.error(msg)
      if (errCode === "FREE_ANALYSIS_LIMIT_REACHED") {
        setShowLimitModal(true)
      }
      throw err
    }
  }

  // Also check backend error for limit
  const handleGenerateClick = async () => {
    if (!isPro && blocked) {
      setShowLimitModal(true)
      return
    }
    try {
      await handleGenerateReport()
    } catch (err) {
      console.error("Report generation failed:", err)
    }
  }

  if (loading) {
    return (
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="dashboard-loading"
      >
        <div className="dashboard-loading__spinner" />
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="dashboard-loading__title">Neural Matching in Progress</h1>
          <p className="dashboard-loading__sub">
            Our agentic core is synthesizing your profile with market benchmarks to generate a deterministic success plan.
          </p>
        </motion.div>
      </motion.main>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="dashboard"
    >
      {/* Decorative background orbs */}
      <div className="dashboard-bg" aria-hidden="true">
        <div className="dashboard-orb dashboard-orb--1" />
        <div className="dashboard-orb dashboard-orb--2" />
        <div className="dashboard-orb dashboard-orb--3" />
      </div>

      <Navbar />

      <div className="dashboard__container">
        {/* ── Header ── */}
        <header className="dashboard-header">
          <div className="dashboard-header__badges">
            <motion.div
              className="dashboard-header__badge"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Zap size={12} />
              AI-Powered Interview Architecture
            </motion.div>
            <motion.div
              className={`dashboard-header__plan-badge ${isPro ? 'dashboard-header__plan-badge--pro' : ''}`}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
            >
              {isPro ? (
                <><Crown size={14} /> Unlimited analyses</>
              ) : (
                <>{used}/{limit} analyses used</>
              )}
            </motion.div>
          </div>

          {/* Blocked warning with countdown */}
          {blocked && !isPro && (
            <motion.div
              className="dashboard-header__limit-warning"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Clock size={14} />
              <span>Next free analysis available in <strong>{countdown}</strong></span>
            </motion.div>
          )}

          <motion.h1
            className="dashboard-header__title"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Elevate Your{' '}
            <span className="dashboard-header__highlight">Placement Strategy</span>
          </motion.h1>
          <motion.p
            className="dashboard-header__sub"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Transform your resume into a personalized interview blueprint — technical questions,
            behavioral frameworks, and a day-by-day readiness plan.
          </motion.p>
        </header>

        {/* ── Form ── */}
        <div className="dashboard-form">
          <div className="dashboard-form__grid">
            {/* Position Details */}
            <motion.div
              className="dashboard-card"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <div className="dashboard-card__header">
                <div className="dashboard-card__icon">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h2 className="dashboard-card__title">Position Details</h2>
                  <p className="dashboard-card__sub">Target company and role specifications</p>
                </div>
              </div>
              <div className="dashboard-card__body">
                <div className="dashboard-field">
                  <label className="dashboard-field__label">
                    <Building2 size={14} /> Target Company
                  </label>
                  <input
                    className="dashboard-field__input"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Google, Amazon, OpenAI"
                  />
                </div>
                <div className="dashboard-field">
                  <label className="dashboard-field__label">
                    <ScrollText size={14} /> Job Description
                  </label>
                  <textarea
                    className="dashboard-field__textarea"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the full job description here..."
                    maxLength={5000}
                  />
                  <span className="dashboard-field__counter">
                    {jobDescription.length}/5000
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Candidate Profile */}
            <motion.div
              className="dashboard-card"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
            >
              <div className="dashboard-card__header">
                <div className="dashboard-card__icon dashboard-card__icon--teal">
                  <User size={20} />
                </div>
                <div>
                  <h2 className="dashboard-card__title">Candidate Profile</h2>
                  <p className="dashboard-card__sub">Your resume or quick self-summary</p>
                </div>
              </div>
              <div className="dashboard-card__body">
                <div className="dashboard-field">
                  <label className="dashboard-field__label">
                    <FileText size={14} /> Upload Resume{' '}
                    <span className="dashboard-field__label-badge">Best</span>
                  </label>
                  <label className="dashboard-upload" htmlFor="resume">
                    <div className="dashboard-upload__icon">
                      <ArrowUpFromLine size={24} />
                    </div>
                    <p className="dashboard-upload__title">
                      {fileName || "Choose a file or drag & drop"}
                    </p>
                    <p className="dashboard-upload__sub">PDF or DOCX up to 5MB</p>
                    <input
                      ref={resumeInputRef}
                      hidden
                      type="file"
                      id="resume"
                      accept=".pdf,.docx"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                <div className="dashboard-divider"><span>or describe yourself</span></div>

                <div className="dashboard-field">
                  <label className="dashboard-field__label">
                    <Target size={14} /> Quick Self-Description
                  </label>
                  <textarea
                    className="dashboard-field__textarea dashboard-field__textarea--short"
                    value={selfDescription}
                    onChange={(e) => setSelfDescription(e.target.value)}
                    placeholder="Briefly describe your experience, key skills, and years of expertise..."
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Actions ── */}
        <motion.div
          className="dashboard-actions"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <span className="dashboard-actions__info">
            <Clock size={14} /> Analysis takes ~30 seconds
          </span>
          <button
            className="dashboard-actions__btn"
            onClick={handleGenerateClick}
            disabled={loading}
          >
            <Sparkles size={18} />
            Analyze My Profile
          </button>
        </motion.div>

        {/* ── Recent Reports ── */}
        <AnimatePresence mode="popLayout">
          {reports && reports.length > 0 ? (
            <motion.section
              className="dashboard-reports"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              layout
            >
              <div className="dashboard-reports__header">
                <h2 className="dashboard-reports__title">Recent Reports</h2>
                <span className="dashboard-reports__count">
                  {reports.length} total
                </span>
              </div>
              <div className="dashboard-reports__grid">
                {reports.map((report, i) => (
                  <motion.div
                    key={report._id}
                    className="dashboard-report"
                    onClick={() => navigate(`/interview/${report._id}`)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06 }}
                    layout
                  >
                    <div className="dashboard-report__top">
                      <div
                        className={`dashboard-report__score ${
                          report.matchScore >= 80
                            ? 'dashboard-report__score--high'
                            : report.matchScore >= 60
                            ? 'dashboard-report__score--mid'
                            : 'dashboard-report__score--low'
                        }`}
                      >
                        {report.matchScore}%
                      </div>
                      <ChevronRight size={16} className="dashboard-report__arrow" />
                    </div>
                    <h3 className="dashboard-report__role">
                      {report.title || 'Untitled'}
                    </h3>
                    <span className="dashboard-report__meta">
                      <Clock size={11} />{' '}
                      {new Date(report.createdAt).toLocaleDateString()}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ) : (
            <motion.div
              className="dashboard-reports"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="dashboard-reports__header">
                <h2 className="dashboard-reports__title">Recent Reports</h2>
              </div>
              <div className="dashboard-reports__empty">
                <p>No reports yet. Analyze your first profile to get started.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer ── */}
        <footer className="dashboard-footer">
          <div className="dashboard-footer__inner">
            <span className="dashboard-footer__brand">
              &copy; {new Date().getFullYear()} ResuNova
            </span>
            <div className="dashboard-footer__links">
              <a href="#" className="dashboard-footer__link">Privacy Policy</a>
              <span className="dashboard-footer__dot">&middot;</span>
              <a href="#" className="dashboard-footer__link">Terms of Service</a>
              <span className="dashboard-footer__dot">&middot;</span>
              <a href="#" className="dashboard-footer__link">Documentation</a>
              <span className="dashboard-footer__dot">&middot;</span>
              <a href="#" className="dashboard-footer__link">Support</a>
            </div>
          </div>
        </footer>
      </div>

      {/* ── Usage Limit Upgrade Modal ── */}
      <UpgradeToProModal
        open={showLimitModal}
        reason="USAGE_LIMIT"
        usageResetAt={nextResetAt}
        onClose={() => setShowLimitModal(false)}
        intendedFeature="PROFILE_ANALYSIS"
      />
    </motion.div>
  )
}

export default Home
