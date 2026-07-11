import { motion } from 'framer-motion'
import { XCircle, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router'

export default function PaymentCancel() {
  const navigate = useNavigate()

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
        <div className="payment-status-card__icon payment-status-card__icon--cancel">
          <XCircle size={48} />
        </div>
        <h1>Payment Cancelled</h1>
        <p>No charges were made. You can continue using Starter or try again when you're ready.</p>
        <button className="payment-status-card__btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={16} />
          Back to Dashboard
        </button>
      </motion.div>
    </motion.main>
  )
}
