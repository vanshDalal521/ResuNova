import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Crown, X, Zap, MessageSquare, Map, Sparkles, Clock, CheckCircle } from "lucide-react"
import { createCheckoutSession } from "../features/auth/services/payment.api"
import toast from "react-hot-toast"
import "./upgradeModal.scss"

const MODAL_CONFIG = {
  USAGE_LIMIT: {
    title: "You've used all 3 free analyses",
    description: (timeLeft) =>
      `Your Free plan includes 3 interview analyses within every rolling 24-hour period. Your next free analysis will be available in ${timeLeft}. Upgrade to Pro for unlimited analyses.`,
    benefits: [
      { icon: <Sparkles size={16} />, text: "Unlimited interview analyses" },
      { icon: <MessageSquare size={16} />, text: "Behavioral interview questions" },
      { icon: <Map size={16} />, text: "Complete 7-day preparation plan" },
      { icon: <Zap size={16} />, text: "Advanced interview preparation features" },
    ],
    primaryCta: "Upgrade to Pro",
    secondaryCta: "Wait for free reset",
  },
  BEHAVIORAL_QUESTIONS: {
    title: "Unlock Behavioral Questions",
    description:
      "Behavioral interview questions and structured answer frameworks are available with ResuNova Pro. Upgrade to prepare for both technical and behavioral interviews.",
    benefits: [
      { icon: <MessageSquare size={16} />, text: "Role-specific behavioral questions" },
      { icon: <CheckCircle size={16} />, text: "STAR answer guidance" },
      { icon: <Zap size={16} />, text: "Leadership and teamwork scenarios" },
      { icon: <Sparkles size={16} />, text: "Unlimited analyses" },
      { icon: <Map size={16} />, text: "Complete 7-day preparation plan" },
    ],
    primaryCta: "Upgrade to Pro",
    secondaryCta: "Continue with Technical Questions",
  },
  SEVEN_DAY_PLAN: {
    title: "Unlock Your 7-Day Preparation Plan",
    description:
      "Get a personalized day-by-day interview roadmap built from your resume, target role, and skill gaps. The complete 7-day preparation plan is available with ResuNova Pro.",
    benefits: [
      { icon: <Map size={16} />, text: "Daily preparation tasks" },
      { icon: <Zap size={16} />, text: "Topic priorities and focus areas" },
      { icon: <Clock size={16} />, text: "Practice schedule" },
      { icon: <CheckCircle size={16} />, text: "Skill-gap roadmap" },
      { icon: <Sparkles size={16} />, text: "Progress checkpoints" },
    ],
    primaryCta: "Upgrade to Pro",
    secondaryCta: "Continue with Free Features",
  },
}

export default function UpgradeToProModal({ open, reason, usageResetAt, onClose, onSecondary, intendedFeature }) {
  const dialogRef = useRef(null)
  const previousActiveElement = useRef(null)

  const config = MODAL_CONFIG[reason] || MODAL_CONFIG.USAGE_LIMIT

  // Trap focus and handle escape
  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement
      dialogRef.current?.focus()
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose()
        if (e.key === "Tab") {
          const focusable = dialogRef.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
          if (!focusable || focusable.length === 0) return
          const first = focusable[0]
          const last = focusable[focusable.length - 1]
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault()
            last.focus()
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
      document.addEventListener("keydown", handleKeyDown)
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
        previousActiveElement.current?.focus()
      }
    }
  }, [open, onClose])

  // Compute countdown for usage limit
  const getTimeLeft = () => {
    if (!usageResetAt) return ""
    const diff = new Date(usageResetAt).getTime() - Date.now()
    if (diff <= 0) return "any moment now"
    const h = Math.floor(diff / 3600000)
    const m = Math.floor((diff % 3600000) / 60000)
    if (h > 0) return `${h}h ${m}m`
    return `${m}m`
  }

  const handleUpgrade = async () => {
    try {
      const data = await createCheckoutSession()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to start checkout")
    }
  }

  const handleSecondary = () => {
    if (onSecondary) onSecondary()
    else onClose()
  }

  const resetDateFormatted = usageResetAt
    ? new Date(usageResetAt).toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null

  return (
    <AnimatePresence>
      {open && <motion.div
          key="upgrade-overlay"
          className="upgrade-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Dialog */}
          <motion.div
            key="upgrade-modal"
            ref={dialogRef}
            className="upgrade-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="upgrade-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button className="upgrade-modal__close" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>

            {/* Badge */}
            <div className="upgrade-modal__badge">
              <Crown size={14} />
              <span>PRO</span>
            </div>

            {/* Title */}
            <h2 id="upgrade-title" className="upgrade-modal__title">{config.title}</h2>

            {/* Description */}
            <p className="upgrade-modal__desc">
              {typeof config.description === "function"
                ? config.description(getTimeLeft())
                : config.description}
            </p>

            {/* Reset date */}
            {reason === "USAGE_LIMIT" && resetDateFormatted && (
              <p className="upgrade-modal__reset-date">
                Reset time: <strong>{resetDateFormatted}</strong>
              </p>
            )}

            {/* Benefits */}
            <ul className="upgrade-modal__benefits">
              {config.benefits.map((b, i) => (
                <li key={i} className="upgrade-modal__benefit">
                  <span className="upgrade-modal__benefit-icon">{b.icon}</span>
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button className="upgrade-modal__cta" onClick={handleUpgrade}>
              <Crown size={18} />
              {config.primaryCta}
            </button>

            {/* Secondary */}
            <button className="upgrade-modal__secondary" onClick={handleSecondary}>
              {config.secondaryCta}
            </button>

            {/* Trust note */}
            <p className="upgrade-modal__trust">
              Secure checkout. Cancel anytime.
            </p>
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>
  )
}
