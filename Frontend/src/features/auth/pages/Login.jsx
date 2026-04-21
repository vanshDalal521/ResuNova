import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import { motion } from 'framer-motion'
import { Mail, Lock, LogIn } from 'lucide-react'
import toast from 'react-hot-toast'

const Login = () => {
    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            return toast.error("Please fill in all fields")
        }

        const promise = handleLogin({ email, password })

        toast.promise(promise, {
            loading: 'Logging in...',
            success: 'Welcome back!',
            error: (err) => err.message,
        })

        const success = await promise
        if (success) {
            navigate('/')
        }
    }

    return (
        <main>
            <motion.div
                className="form-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1>Secure Access</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email" id="email" name='email' placeholder='name@example.com'
                            />
                        </div>
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" id="password" name='password' placeholder='••••••••'
                        />
                    </div>
                    <button className='auth-button' disabled={loading}>
                        <LogIn size={18} style={{ marginRight: '0.5rem', display: 'inline' }} />
                        {loading ? 'Authorizing...' : 'Authorize Access'}
                    </button>
                </form>
                <p>New to ResuNova? <Link to={"/register"}>Begin Your Evolution</Link> </p>
            </motion.div>
        </main>
    )
}

export default Login