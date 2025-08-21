import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
})

export function authHeader() {
  const token = localStorage.getItem('dd_token')
  return token ? { Authorization: `Bearer ${token}` } : {}
}