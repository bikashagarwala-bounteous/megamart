import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SiteHeader from './components/SiteHeader'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductPage from './pages/Product'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
