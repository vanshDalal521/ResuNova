import React from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { User, Mail, Calendar, Shield, ArrowLeft, LogOut, Briefcase } from 'lucide-react'
import { useNavigate } from 'react-router'
import "../style/profile.scss"

const Profile = () => {
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    if (!user) return null

    const joinedDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
        day: 'numeric'
    }) : "Recently"

    const initial = user.username?.charAt(0).toUpperCase() || "U"

    return (
        <motion.div 
            className="profile-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="profile-container">
                {/* Back Button */}
                <button className="back-link" onClick={() => navigate('/')}>
                    <ArrowLeft size={18} />
                    <span>Back to Dashboard</span>
                </button>

                {/* Profile Card */}
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
                            <div className="badge badge--pro">Premium Architect</div>
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
                                    <Shield size={20} />
                                </div>
                                <div className="info-item__content">
                                    <label>Account Security</label>
                                    <p>Standard Protection</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Suggestion (Visual Only) */}
                        <div className="membership-section">
                            <h3><Briefcase size={18} style={{ marginRight: '0.5rem' }} /> Deployment Stats</h3>
                            <div className="stats-row">
                                <div className="stat-box">
                                    <span className="stat-box__val">Active</span>
                                    <span className="stat-box__lbl">Status</span>
                                </div>
                                <div className="stat-box">
                                    <span className="stat-box__val">∞</span>
                                    <span className="stat-box__lbl">API Requests</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="profile-card__footer">
                        <button className="action-btn action-btn--logout" onClick={handleLogout}>
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
