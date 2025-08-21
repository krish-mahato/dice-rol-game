import { jwtDecode } from "jwt-decode";

const KEY = 'dd_token'

export function setToken(token) {
  localStorage.setItem(KEY, token)
}

export function getToken() {
  return localStorage.getItem(KEY)
}

export function getUser() {
  const t = getToken()
  if (!t) return null
  try { return jwtDecode(t) } catch { return null }
}

export function logout() {
  localStorage.removeItem(KEY)
}