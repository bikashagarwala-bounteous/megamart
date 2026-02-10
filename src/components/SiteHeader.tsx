import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from './ui/button'

const SiteHeader: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-sky-600 flex items-center gap-2">🛒 MegaMart</Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={({isActive}: {isActive: boolean})=> isActive? 'text-sky-600 font-semibold':'text-slate-600 hover:text-slate-900'}>Home</NavLink>
          <NavLink to="/products" className={({isActive}: {isActive: boolean})=> isActive? 'text-sky-600 font-semibold':'text-slate-600 hover:text-slate-900'}>Products</NavLink>
        </div>

        <div className="flex items-center gap-2">
          <input aria-label="Search" className="hidden sm:block border border-slate-300 rounded-md px-3 py-2 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Search products..." />
          <Link to="/products">
            <Button variant="default" size="sm">Browse All</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
