import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "",
    withCredentials: true,
})

export async function createCheckoutSession() {
    const response = await api.post("/api/payment/create-checkout")
    return response.data
}

export async function createPortalSession() {
    const response = await api.post("/api/payment/create-portal")
    return response.data
}

export async function getPlanStatus() {
    const response = await api.get("/api/payment/plan")
    return response.data
}
