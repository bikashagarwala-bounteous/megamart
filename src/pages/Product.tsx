import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProductById } from '../utils/api'
import type { Product } from '../types'

const ProductPage: React.FC = () => {
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!id) return
        setLoading(true)
        fetchProductById(id).then((p) => setProduct(p)).catch(console.error).finally(() => setLoading(false))
    }, [id])

    if (loading) return <div className="container py-8">Loading...</div>
    if (!product) return <div className="container py-8">Product not found</div>

    return (
        <main className="container py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded p-6 flex items-center justify-center">
                    <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
                </div>
                <div className="md:col-span-2">
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <p className="mt-4 text-gray-700">{product.description}</p>
                    <div className="mt-6 flex items-center gap-6">
                        <div className="text-3xl font-extrabold">${product.price}</div>
                        <div className="text-sm text-gray-500">{product.rating?.rate ?? '-'} ⭐ ({product.rating?.count ?? 0})</div>
                    </div>

                    <div className="mt-8 flex gap-3">
                        <button className="px-4 py-2 rounded bg-sky-600 text-white">Buy Now</button>
                        <Link to="/products" className="px-4 py-2 rounded border">Back to products</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProductPage
