import { useState, useEffect, useCallback, useContext } from "react"
import { fetchEntitlements } from "../services/entitlement.api"
import { AuthContext } from "../auth.context"

export function useEntitlements() {
  const auth = useContext(AuthContext)
  const isAdmin = auth?.user?.role === "admin" || false
  const [entitlements, setEntitlements] = useState(null)
  const [loading, setLoading] = useState(true)

  const refreshEntitlements = useCallback(async () => {
    try {
      setLoading(true)
      const data = await fetchEntitlements()
      setEntitlements(data)
    } catch {
      setEntitlements(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshEntitlements()
  }, [refreshEntitlements])

  const canAnalyze = isAdmin
    ? true
    : entitlements
      ? entitlements.plan === "pro" || entitlements.isAdmin || (entitlements.usage?.remaining ?? 0) > 0
      : true

  const canViewTechnicalQuestions = isAdmin || (entitlements?.features?.technicalQuestions ?? true)
  const canViewBehavioralQuestions = isAdmin || (entitlements?.features?.behavioralQuestions ?? false)
  const canViewSevenDayPlan = isAdmin || (entitlements?.features?.sevenDayPlan ?? false)

  return {
    entitlements,
    loading,
    refreshEntitlements,
    isAdmin,
    canAnalyze,
    canViewTechnicalQuestions,
    canViewBehavioralQuestions,
    canViewSevenDayPlan,
  }
}
