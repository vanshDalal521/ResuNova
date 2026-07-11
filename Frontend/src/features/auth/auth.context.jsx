import { createContext, useState, useEffect } from "react";
import { getMe } from "./services/auth.api";


export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [entitlements, setEntitlements] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const data = await getMe()
                if (data && data.user) {
                    setUser(data.user)
                    if (data.entitlements) {
                        setEntitlements(data.entitlements)
                    }
                } else {
                    setUser(null)
                    setEntitlements(null)
                }
            } catch {
                setUser(null)
                setEntitlements(null)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])


    return (
        <AuthContext.Provider value={{ user, setUser, entitlements, setEntitlements, loading, setLoading }} >
            {children}
        </AuthContext.Provider>
    )


}
