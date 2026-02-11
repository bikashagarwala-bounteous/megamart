import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchProductById } from '../utils/api'
import type { Product } from '../types'
import { useCartStore } from '../store/useCartStore'
import { useWishlistStore } from '../store/useWishlistStore'
import { useToast } from '../context/toastContext'

const ProductPage: React.FC = () => {
    const { id } = useParams()
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(false)
    const [quantity, setQuantity] = useState(1)

    const { addItem } = useCartStore()
    const { toggleWishlist, isInWishlist } = useWishlistStore()
    const { addToast } = useToast()
    const inWishlist = isInWishlist(product?.id || 0)

    const handleAddToCart = () => {
        if (product) {
            addItem({
                productId: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
                quantity,
            })
            addToast('Added to cart', 'success')
            setQuantity(1)
        }
    }

    const handleWishlistToggle = async () => {
        if (product) {
            await toggleWishlist({
                productId: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
            })
            addToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist', 'info')
        }
    }
    
    useEffect(() => {
        if (!id) return
        setLoading(true)
        fetchProductById(id).then((p) => setProduct(p)).catch(console.error).finally(() => setLoading(false))
    }, [id])

    if (loading) return <div className="container py-8">Loading...</div>
    if (!product) return <div className="container py-8">Product not found</div>

    return (
        <main className="container py-8">
            <Link to="/products" className="text-sky-600 hover:text-sky-700 font-semibold mb-6 inline-block">
                ← Back to Products
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded p-6 flex items-center justify-center">
                    <img src={product.image} alt={product.title} className="max-h-96 object-contain" />
                </div>
                <div className="md:col-span-2">
                    <h1 className="text-3xl font-bold text-slate-900">{product.title}</h1>
                    <p className="mt-4 text-gray-700 text-lg">{product.description}</p>
                    
                    <div className="mt-6 flex items-center gap-6">
                        <div className="text-4xl font-extrabold text-sky-600">${product.price.toFixed(2)}</div>
                        <div className="text-lg text-gray-500">
                            {product.rating?.rate ?? '-'} ⭐ ({product.rating?.count ?? 0} reviews)
                        </div>
                    </div>

                    <div className="mt-8 space-y-4">
                        <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-slate-900">Quantity:</span>
                            <div className="flex items-center gap-3 border border-slate-300 rounded px-3 py-2">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="hover:bg-slate-100 px-2 py-1 rounded font-bold"
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>
                                <span className="w-8 text-center font-semibold">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="hover:bg-slate-100 px-2 py-1 rounded font-bold"
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-3 flex-wrap">
                            <button
                                onClick={handleAddToCart}
                                className="px-6 py-3 rounded bg-sky-600 text-white font-semibold hover:bg-sky-700 transition"
                            >
                                Add to Cart
                            </button>
                            <button
                                onClick={handleWishlistToggle}
                                className={`px-6 py-3 rounded font-semibold transition ${
                                    inWishlist
                                        ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                        : 'border border-slate-300 text-slate-600 hover:border-red-300 hover:text-red-600'
                                }`}
                            >
                                {inWishlist ? '❤️ Saved' : '🤍 Add to Wishlist'}
                            </button>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded p-4 text-sm text-blue-800">
                            <p className="font-semibold mb-1">✓ Free Shipping</p>
                            <p>On orders above $50</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ProductPage
