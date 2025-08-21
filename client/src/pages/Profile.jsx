import React, { useEffect, useState } from 'react'
import { api, authHeader } from '../utils/api'

export default function Profile() {
  const [me, setMe] = useState(null)
  const [history, setHistory] = useState([])

  useEffect(() => {
    api.get('/api/users/me', { headers: authHeader() }).then(res => {
      setMe(res.data)
      return api.get(`/api/games/history/${res.data.id}`, { headers: authHeader() })
    }).then(res => setHistory(res.data))
      .catch(() => {})
  }, [])

  if (!me) return <div className="text-white/70">Loading...</div>

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <h2 className="text-2xl font-bold mb-2">Profile</h2>
        <div className="space-y-2">
          <div><span className="text-white/60">Username:</span> {me.username}</div>
          <div><span className="text-white/60">Email:</span> {me.email}</div>
          <div><span className="text-white/60">Games Played:</span> {me.stats.gamesPlayed}</div>
          <div><span className="text-white/60">Wins:</span> {me.stats.wins}</div>
          <div><span className="text-white/60">Highest Score:</span> {me.stats.highestScore}</div>
          <div><span className="text-white/60">Last Played:</span> {me.stats.lastPlayedAt ? new Date(me.stats.lastPlayedAt).toLocaleString() : '-'}</div>
        </div>
      </div>
      <div className="bg-card rounded-2xl p-6 shadow-soft md:col-span-2">
        <h2 className="text-2xl font-bold mb-4">Recent Games</h2>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.map(g => (
            <div key={g._id} className="p-4 rounded-xl border border-white/10">
              <div className="text-white/80 mb-1">Winner: <span className="text-secondary font-semibold">{g.winner?.username}</span> with {g.winner?.score}</div>
              <div className="text-white/60 text-sm">Players: {g.players.map(p=>p.username).join(' vs ')} • {new Date(g.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}