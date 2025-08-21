import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { getToken, logout } from '../utils/auth'

const NavItem = ({ to, children }) => (
  <NavLink to={to} className={({isActive}) => `px-4 py-2 rounded-xl transition ${isActive ? 'bg-primary text-white' : 'text-white/80 hover:bg-card'}`}>
    {children}
  </NavLink>
)

export default function AppLayout() {
  const token = getToken()
  return (
    <div className="max-w-6xl mx-auto p-6">
      <header className="flex items-center justify-between bg-card rounded-2xl p-4 shadow-soft mb-6">
        <div className="text-xl font-bold tracking-wide">
          🎲 <span className="text-primary">Dice</span> <span className="text-secondary">Duel</span>
        </div>
        <nav className="flex gap-2">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/leaderboard">Leaderboard</NavItem>
          {token && <NavItem to="/profile">Profile</NavItem>}
          <NavItem to="/new">New Game</NavItem>
        </nav>
        <div>
          {token ? (
            <button onClick={() => { logout(); location.href='/' }} className="px-4 py-2 rounded-xl bg-secondary text-black font-semibold">Logout</button>
          ) : (
            <div className="flex gap-2">
              <NavItem to="/login">Login</NavItem>
              <NavItem to="/register">Sign up</NavItem>
            </div>
          )}
        </div>
      </header>
      <Outlet />
      <footer className="text-center text-white/50 mt-8">Built with ❤️ using MERN</footer>
    </div>
  )
}