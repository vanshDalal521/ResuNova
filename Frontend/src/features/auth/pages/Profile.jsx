import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { User, Mail, Calendar, Shield, ArrowLeft, LogOut, Crown, CreditCard } from 'lucide-react'
import { useNavigate } from 'react-router'
import { createPortalSession } from '../services/payment.api'
import "../style/profile.scss"

const Profile = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()
    const [portalLoading, setPortalLoading] = useState(false)

    if (!user) return null

    const joinedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
        day: 'numeric'
    }) : "Recently"

    const initial = user.username?.charAt(0).toUpperCase() || "U"
    const isPro = user.plan === 'pro' && user.subscriptionStatus === 'active'

    const handleManageBilling = async () => {
        setPortalLoading(true)
        try {
            const data = await createPortalSession()
            if (data.url) {
                window.location.href = data.url
            }
        } catch (err) {
            console.error('Failed to open billing portal:', err)
        } finally {
            setPortalLoading(false)
        }
    }

    return (
        <motion.div
            className="profile-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="profile-container">
                <button className="back-link" onClick={() => navigate('/dashboard')}>
                    <ArrowLeft size={18} />
                    <span>Back to Dashboard</span>
                </button>

                <motion.div
                    className="profile-card"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="profile-card__header">
                        <div className="avatar-large">{initial}</div>
                        <div className="user-info">
                            <h1>{user.username}</h1>
                            <p className="user-email">{user.email}</p>
                            <span className={`badge ${isPro ? 'badge--pro' : 'badge--starter'}`}>
                                {isPro ? 'Pro' : 'Starter'}
                            </span>
                        </div>
                    </div>

                    <div className="profile-card__body">
                        <div className="info-grid">
                            <div className="info-item">
                                <div className="info-item__icon">
                                    <User size={20} />
                                </div>
                                <div className="info-item__content">
                                    <label>Display Name</label>
                                    <p>{user.username}</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-item__icon">
                                    <Mail size={20} />
                                </div>
                                <div className="info-item__content">
                                    <label>Email Address</label>
                                    <p>{user.email}</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-item__icon">
                                    <Calendar size={20} />
                                </div>
                                <div className="info-item__content">
                                    <label>Member Since</label>
                                    <p>{joinedDate}</p>
                                </div>
                            </div>

                            <div className="info-item">
                                <div className="info-item__icon">
                                    {isPro ? <Crown size={20} /> : <Shield size={20} />}
                                </div>
                                <div className="info-item__content">
                                    <label>Plan</label>
                                    <p>{isPro ? 'Pro — Unlimited Reports' : 'Starter — 3 Reports / 24h'}</p>
                                </div>
                            </div>
                        </div>

                        {isPro && (
                            <div className="membership-section">
                                <h3><CreditCard size={18} style={{ marginRight: '0.5rem' }} /> Subscription</h3>
                                <button
                                    className="action-btn action-btn--billing"
                                    onClick={handleManageBilling}
                                    disabled={portalLoading}
                                >
                                    <CreditCard size={18} />
                                    <span>{portalLoading ? 'Opening...' : 'Manage Billing'}</span>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="profile-card__footer">
                        <button className="action-btn action-btn--logout" onClick={() => { handleLogout(); navigate('/') }}>
                            <LogOut size={18} />
                            <span>Sign Out of Session</span>
                        </button>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    )
}

export default Profile
