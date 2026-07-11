import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "",
  withCredentials: true,
})

export async function fetchEntitlements() {
  const response = await api.get("/api/entitlements")
  return response.data
}

export async function requireFeature(feature) {
  const response = await api.post("/api/entitlements/require-feature", { feature })
  return response.data
}
