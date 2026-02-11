import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import SiteHeader from './components/SiteHeader'
import Toast from './components/Toast'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastProvider } from './context/toastContext'
import { useCartStore } from './store/useCartStore'
import { useAuthStore } from './store/useAuthStore'
import { useWishlistStore } from './store/useWishlistStore'
import { useOrdersStore } from './store/useOrdersStore'
import './index.css'

import Home from './pages/Home'
import Products from './pages/Products'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Checkout from './pages/Checkout'
import OrderConfirmation from './pages/OrderConfirmation'
import OrderHistory from './pages/OrderHistory'
import Wishlist from './pages/Wishlist'

function App() {
  const initializeCart = useCartStore((state) => state.initializeCart)
  const initializeAuth = useAuthStore((state) => state.initializeAuth)
  const initializeWishlist = useWishlistStore((state) => state.initializeWishlist)
  const initializeOrders = useOrdersStore((state) => state.initializeOrders)

  useEffect(() => {
    initializeCart()
    initializeAuth()
    initializeWishlist()
    initializeOrders()
  }, [initializeCart, initializeAuth, initializeWishlist, initializeOrders])

  return (
    <ToastProvider>
      <AppRoutes />
    </ToastProvider>
  )
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/order-confirmation/:orderId"
          element={
            <ProtectedRoute>
              <OrderConfirmation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toast />
    </BrowserRouter>
  )
}

export default App
