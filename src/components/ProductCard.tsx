import React from 'react'
import type { Product } from '../types'
import { Link } from 'react-router-dom'
import { Card, CardContent } from './ui/card'
import { useCartStore } from '../store/useCartStore'
import { useWishlistStore } from '../store/useWishlistStore'
import { useToast } from '../context/toastContext'

interface Props { product: Product }

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addItem } = useCartStore()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const { addToast } = useToast()
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    addToast('Added to cart', 'success')
  }

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    await toggleWishlist({
      productId: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
    })
    addToast(inWishlist ? 'Removed from wishlist' : 'Added to wishlist', 'info')
  }

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
        <div className="flex items-center justify-center h-48 bg-slate-50 hover:bg-slate-100 transition relative">
          <img src={product.image} alt={product.title} className="max-h-40 object-contain" />
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 p-2 rounded-full transition ${
              inWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white/80 hover:bg-white text-slate-600 hover:text-red-500'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            {inWishlist ? '❤️' : '🤍'}
          </button>
        </div>
        <CardContent className="p-4 flex flex-col flex-1">
          <h3 className="text-sm font-medium text-slate-900 line-clamp-2">{product.title}</h3>
          <div className="mt-3 flex items-center justify-between mb-4">
            <div className="text-lg font-bold text-sky-600">${product.price.toFixed(2)}</div>
            <div className="text-sm text-slate-500 flex items-center gap-1">
              {product.rating?.rate ? `${product.rating.rate} ⭐` : '- ⭐'}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-auto w-full px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded font-semibold text-sm transition"
          >
            Add to Cart
          </button>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProductCard
