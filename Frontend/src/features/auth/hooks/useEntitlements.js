import { useState, useEffect, useCallback } from "react"
import { fetchEntitlements } from "../services/entitlement.api"

export function useEntitlements() {
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

  const canAnalyze = entitlements
    ? entitlements.plan === "pro" || (entitlements.usage?.remaining ?? 0) > 0
    : true

  const canViewTechnicalQuestions = entitlements?.features?.technicalQuestions ?? true
  const canViewBehavioralQuestions = entitlements?.features?.behavioralQuestions ?? false
  const canViewSevenDayPlan = entitlements?.features?.sevenDayPlan ?? false

  return {
    entitlements,
    loading,
    refreshEntitlements,
    canAnalyze,
    canViewTechnicalQuestions,
    canViewBehavioralQuestions,
    canViewSevenDayPlan,
  }
}
