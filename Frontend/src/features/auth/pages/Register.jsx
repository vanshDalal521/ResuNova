import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'
import { motion } from 'framer-motion'
import { User, Mail, Lock, UserPlus } from 'lucide-react'
import toast from 'react-hot-toast'

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, handleRegister } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!username || !email || !password) {
            return toast.error("Please fill in all fields")
        }

        const promise = handleRegister({ username, email, password })

        toast.promise(promise, {
            loading: 'Creating your account...',
            success: 'Account created! Welcome abroad.',
            error: (err) => err.message,
        })

        const success = await promise
        if (success) {
            navigate("/")
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
                <h1>Initialize Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text" id="username" name='username' placeholder='johndoe'
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email" id="email" name='email' placeholder='name@example.com'
                        />
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
                        <UserPlus size={18} style={{ marginRight: '0.5rem', display: 'inline' }} />
                        {loading ? 'Processing...' : 'Secure Account'}
                    </button>
                </form>
                <p>Already a member? <Link to={"/login"}>Authorize Access</Link> </p>
            </motion.div>
        </main>
    )
}

export default Register