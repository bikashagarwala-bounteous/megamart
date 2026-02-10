import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { fetchProducts, fetchCategories, fetchProductsByCategory } from '../utils/api'
import type { Product } from '../types'

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    fetchProducts().then((data) => {
      setProducts(data)
    }).catch(console.error).finally(()=>setLoading(false))

    fetchCategories().then(c => setCategories(c)).catch(console.error)
  }, [])

  useEffect(() => {
    if (!selected) return
    setLoading(true)
    fetchProductsByCategory(selected).then(data => setProducts(data)).catch(console.error).finally(()=>setLoading(false))
  }, [selected])

  return (
    <main className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex items-center gap-2">
          <select className="border rounded px-3 py-2" onChange={(e)=> setSelected(e.target.value || null)} defaultValue="">
            <option value="">All categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {products.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Products
