import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "",
    withCredentials: true,
})

export async function fetchAdminStats() {
    const res = await api.get("/api/admin/stats")
    return res.data
}

export async function fetchAdminUsers() {
    const res = await api.get("/api/admin/users")
    return res.data
}

export async function updateAdminUser(userId, payload) {
    const res = await api.patch(`/api/admin/users/${userId}`, payload)
    return res.data
}

export async function deleteAdminUser(userId) {
    const res = await api.delete(`/api/admin/users/${userId}`)
    return res.data
}

export async function fetchAdminReports() {
    const res = await api.get("/api/admin/reports")
    return res.data
}

export async function deleteAdminReport(reportId) {
    const res = await api.delete(`/api/admin/reports/${reportId}`)
    return res.data
}
