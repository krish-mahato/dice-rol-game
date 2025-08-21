import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="grid md:grid-cols-2 gap-6 items-center">
      <div className="bg-card rounded-2xl p-8 shadow-soft">
        <h1 className="text-4xl font-bold mb-4">Welcome to Dice Duel</h1>
        <p className="text-white/80 mb-6">A slick, two–player race to 20. Sign up with your game name, start a match, and whoever hits 20 first wins. Results are saved to your history and the global leaderboard.</p>
        <div className="flex gap-3">
          <Link to="/new" className="px-5 py-3 rounded-xl bg-primary font-semibold">Start a Game</Link>
          <Link to="/leaderboard" className="px-5 py-3 rounded-xl bg-secondary text-black font-semibold">View Leaderboard</Link>
        </div>
      </div>
      <div className="bg-card rounded-2xl p-8 shadow-soft">
        <h2 className="text-2xl font-semibold mb-3">How it works</h2>
        <ul className="space-y-2 text-white/80 list-disc pl-5">
          <li>Sign in or create your player name.</li>
          <li>Pick two players and play on one device.</li>
          <li>Tap <span className="text-accent">Roll</span> to add 1–6 points.</li>
          <li>First to 20 wins. 🎉</li>
          <li>Winners are recorded with their highest score.</li>
        </ul>
      </div>
    </div>
  )
}