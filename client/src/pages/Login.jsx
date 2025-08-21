import React, { useState } from 'react'
import { api } from '../utils/api'
import { setToken } from '../utils/auth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await api.post('/api/auth/login', { email, password })
      setToken(data.token)
      location.href = '/'
    } catch (e) {
      setError(e?.response?.data?.error || 'Login failed')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-card rounded-2xl p-8 shadow-soft">
      <h1 className="text-3xl font-bold mb-6">Welcome back</h1>
      {error && <div className="mb-4 text-red-400">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <input className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full px-4 py-3 rounded-xl bg-primary font-semibold">Login</button>
      </form>
    </div>
  )
}