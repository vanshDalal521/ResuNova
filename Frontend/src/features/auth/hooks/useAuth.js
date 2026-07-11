import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api";



export const useAuth = () => {

    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    const { user, setUser, entitlements, setEntitlements, loading, setLoading } = context


    const handleLogin = async ({ email, password }) => {
        setLoading(true)
        try {
            const data = await login({ email, password })
            if (data && data.user) {
                setUser(data.user)
                if (data.entitlements) {
                    setEntitlements(data.entitlements)
                }
                return true
            }
        } catch (err) {
            setUser(null)
            setEntitlements(null)
            throw new Error(err.response?.data?.message || "Invalid email or password")
        } finally {
            setLoading(false)
        }
        return false
    }

    const handleRegister = async ({ username, email, password }) => {
        setLoading(true)
        try {
            const data = await register({ username, email, password })
            if (data && data.user) {
                setUser(data.user)
                if (data.entitlements) {
                    setEntitlements(data.entitlements)
                }
                return true
            }
        } catch (err) {
            setUser(null)
            setEntitlements(null)
            throw new Error(err.response?.data?.message || "Registration failed")
        } finally {
            setLoading(false)
        }
        return false
    }

    const handleLogout = async () => {
        setLoading(true)
        try {
            await logout()
            setUser(null)
            setEntitlements(null)
        } catch {
        } finally {
            setLoading(false)
        }
    }

    return { user, entitlements, setEntitlements, loading, handleRegister, handleLogin, handleLogout }
}
