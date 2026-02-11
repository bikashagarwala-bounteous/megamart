import React, { useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { useCartStore } from '../store/useCartStore'
import { useAuthStore } from '../store/useAuthStore'

const SiteHeader: React.FC = () => {
  const navigate = useNavigate()
  const { isInitialized, initializeCart, getItemCount } = useCartStore()
  const { user, isInitialized: authInitialized, logout } = useAuthStore()
  const itemCount = getItemCount()

  useEffect(() => {
    if (!isInitialized) {
      initializeCart()
    }
  }, [isInitialized, initializeCart])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="text-2xl font-bold text-sky-600 flex items-center gap-2">🛒 MegaMart</Link>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <NavLink to="/" className={({ isActive }: { isActive: boolean }) => isActive ? 'text-sky-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }: { isActive: boolean }) => isActive ? 'text-sky-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}>Products</NavLink>
          <NavLink to="/wishlist" className={({ isActive }: { isActive: boolean }) => isActive ? 'text-sky-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}>Wishlist</NavLink>
          {authInitialized && user && (
            <NavLink to="/orders" className={({ isActive }: { isActive: boolean }) => isActive ? 'text-sky-600 font-semibold' : 'text-slate-600 hover:text-slate-900'}>Orders</NavLink>
          )}
        </div>

        <div className="flex items-center gap-3 md:gap-4 ml-auto">
          <input aria-label="Search" className="hidden sm:block border border-slate-300 rounded-md px-3 py-2 text-sm w-40 focus:outline-none focus:ring-2 focus:ring-sky-500" placeholder="Search..." />
          
          <Link to="/cart" className="relative text-slate-600 hover:text-slate-900">
            <span className="text-2xl">🛒</span>
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {authInitialized && (
            <>
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="hidden sm:block text-sm">
                    <p className="font-semibold text-slate-900">Hi, {user.name}</p>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="outline"
                    size="sm"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link to="/login">
                  <Button variant="default" size="sm">
                    Login
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
