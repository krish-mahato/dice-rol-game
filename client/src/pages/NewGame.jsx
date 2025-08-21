import React, { useState } from 'react'
import { api } from '../utils/api'

export default function NewGame() {
  const [p1, setP1] = useState('')
  const [p2, setP2] = useState('')
  const [error, setError] = useState('')

  const loadUser = async (username) => {
    const { data } = await api.get(`/api/users/by-username/${username}`)
    return data
  }

  const onStart = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const u1 = await loadUser(p1)
      const u2 = await loadUser(p2)
      sessionStorage.setItem('dd_game_players', JSON.stringify([u1, u2]))
      location.href = '/play'
    } catch (e) {
      setError('Make sure both usernames exist.')
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-card rounded-2xl p-8 shadow-soft">
      <h1 className="text-3xl font-bold mb-6">Choose players</h1>
      <p className="text-white/70 mb-4">Enter two existing usernames to play on this device.</p>
      {error && <div className="mb-4 text-red-400">{error}</div>}
      <form onSubmit={onStart} className="space-y-4">
        <input className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10" placeholder="Player 1 username" value={p1} onChange={e=>setP1(e.target.value)} />
        <input className="w-full px-4 py-3 rounded-xl bg-surface border border-white/10" placeholder="Player 2 username" value={p2} onChange={e=>setP2(e.target.value)} />
        <button className="w-full px-4 py-3 rounded-xl bg-primary font-semibold">Start</button>
      </form>
    </div>
  )
}