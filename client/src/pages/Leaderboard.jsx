import React, { useEffect, useState } from 'react'
import { api } from '../utils/api'

export default function Leaderboard() {
  const [rows, setRows] = useState([])

  useEffect(() => {
    api.get('/api/leaderboard').then(res => setRows(res.data)).catch(() => setRows([]))
  }, [])

  return (
    <div className="bg-card rounded-2xl p-6 shadow-soft">
      <h1 className="text-3xl font-bold mb-4">🏆 Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-white/70">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Player</th>
              <th className="py-3 px-4">Wins</th>
              <th className="py-3 px-4">Highest Score</th>
              <th className="py-3 px-4">Last Win</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r._id} className="border-t border-white/10">
                <td className="py-3 px-4">{i+1}</td>
                <td className="py-3 px-4 font-semibold">{r.username}</td>
                <td className="py-3 px-4">{r.wins}</td>
                <td className="py-3 px-4">{r.highestScore}</td>
                <td className="py-3 px-4">{r.lastWinAt ? new Date(r.lastWinAt).toLocaleString() : '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}