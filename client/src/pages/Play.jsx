import React, { useEffect, useState } from 'react'
import { api, authHeader } from '../utils/api'
import { getUser } from '../utils/auth'

export default function Play() {
  const [players, setPlayers] = useState([])
  const [scores, setScores] = useState([0,0])
  const [turn, setTurn] = useState(0)
  const [target] = useState(20)
  const [rounds, setRounds] = useState([])
  const [winner, setWinner] = useState(null)
  const me = getUser()

  useEffect(() => {
    const raw = sessionStorage.getItem('dd_game_players')
    if (!raw) { location.href = '/new'; return }
    setPlayers(JSON.parse(raw))
  }, [])

  const roll = () => {
    if (winner) return
    const r = Math.floor(Math.random() * 6) + 1
    const next = [...scores]
    next[turn] += r
    setScores(next)
    const entry = {
      turn: turn + 1,
      playerUsername: players[turn].username,
      roll: r,
      cumulativeScore: next[turn]
    }
    setRounds(prev => [...prev, entry])
    if (next[turn] >= target) {
      const w = { id: players[turn].id || players[turn]._id, username: players[turn].username, score: next[turn] }
      setWinner(w)
    } else {
      setTurn((turn + 1) % 2)
    }
  }

  const saveResult = async () => {
    if (!me) { alert('Login to save results.'); return }
    if (!winner) return
    const payload = {
      players: players.map((p,i) => ({ id: p.id || p._id, username: p.username, finalScore: scores[i] })),
      winner,
      targetScore: target,
      rounds
    }
    try {
      await api.post('/api/games/record', payload, { headers: authHeader() })
      alert('Game saved!')
    } catch (e) {
      alert('Failed to save game. Ensure you are logged in.')
    }
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <h2 className="text-2xl font-bold mb-2">Players</h2>
        <div className="space-y-3">
          {players.map((p,i) => (
            <div key={i} className={`p-4 rounded-xl border border-white/10 ${turn===i && !winner ? 'bg-surface' : ''}`}>
              <div className="flex items-center justify-between">
                <div className="font-semibold">{p.username}</div>
                <div className="text-3xl">{scores[i]}</div>
              </div>
              {turn===i && !winner && <div className="text-sm text-white/60">Your turn</div>}
            </div>
          ))}
        </div>
        <div className="mt-4 text-white/70">Target: <span className="text-accent font-bold">{target}</span></div>
      </div>

      <div className="bg-card rounded-2xl p-6 shadow-soft md:col-span-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Game</h2>
          {!winner ? (
            <button onClick={roll} className="px-6 py-3 rounded-xl bg-primary font-semibold">Roll 🎲</button>
          ) : (
            <div className="flex items-center gap-3">
              <div className="text-xl"><span className="text-secondary font-bold">{winner.username}</span> wins with {winner.score}!</div>
              <button onClick={saveResult} className="px-6 py-3 rounded-xl bg-secondary text-black font-semibold">Save Result</button>
            </div>
          )}
        </div>
        <div className="h-64 overflow-y-auto space-y-2 border border-white/10 rounded-xl p-4">
          {rounds.map((r, idx) => (
            <div key={idx} className="text-white/80">
              Turn {idx+1}: <span className="text-accent">{r.playerUsername}</span> rolled <span className="font-bold">{r.roll}</span> → {r.cumulativeScore}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}