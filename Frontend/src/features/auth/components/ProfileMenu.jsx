import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../hooks/useAuth'
import { LogOut, User, Settings, Shield } from 'lucide-react'
import "../style/profile.scss"

const ProfileMenu = () => {
    const { user, handleLogout } = useAuth()
    const [ isOpen, setIsOpen ] = useState(false)
    const menuRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    if (!user) return null

    const initial = user.username?.charAt(0).toUpperCase() || "U"

    return (
        <div className="profile-menu" ref={menuRef}>
            <button 
                className="profile-menu__trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="avatar">{initial}</div>
                <span className="username">{user.username}</span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="profile-menu__dropdown"
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <div className="dropdown-header">
                            <p className="name">{user.username}</p>
                            <p className="email">{user.email}</p>
                        </div>

                        <button className="dropdown-item">
                            <User size={16} />
                            View Account
                        </button>
                        <button className="dropdown-item">
                            <Shield size={16} />
                            Security
                        </button>
                        
                        <div style={{ margin: '0.5rem 0', height: '1px', background: 'rgba(255,255,255,0.05)' }} />
                        
                        <button 
                            className="dropdown-item dropdown-item--logout"
                            onClick={handleLogout}
                        >
                            <LogOut size={16} />
                            Authorize Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default ProfileMenu
