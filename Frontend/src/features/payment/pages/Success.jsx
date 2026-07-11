import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router'
import { useAuth } from '../../auth/hooks/useAuth'
import { fetchEntitlements } from '../../auth/services/entitlement.api'

export default function PaymentSuccess() {
  const navigate = useNavigate()
  const { setEntitlements } = useAuth()

  useEffect(() => {
    // Refresh entitlements after successful payment
    const refresh = async () => {
      try {
        const data = await fetchEntitlements()
        if (setEntitlements) setEntitlements(data)
      } catch { }
    }
    refresh()
  }, [setEntitlements])

  return (
    <motion.main
      className="payment-status-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="payment-status-card"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="payment-status-card__icon">
          <CheckCircle size={48} />
        </div>
        <h1>Payment Successful!</h1>
        <p>Welcome to ResuNova Pro. You now have unlimited access to all features.</p>
        <button className="payment-status-card__btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={16} />
          Go to Dashboard
        </button>
      </motion.div>
    </motion.main>
  )
}
