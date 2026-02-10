import React from 'react'
import type { Product } from '../types'
import { Link } from 'react-router-dom'
import { Card, CardContent } from './ui/card'

interface Props { product: Product }

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
        <div className="flex items-center justify-center h-48 bg-slate-50">
          <img src={product.image} alt={product.title} className="max-h-40 object-contain" />
        </div>
        <CardContent className="p-4">
          <h3 className="text-sm font-medium text-slate-900 line-clamp-2">{product.title}</h3>
          <div className="mt-3 flex items-center justify-between">
            <div className="text-lg font-bold text-sky-600">${product.price}</div>
            <div className="text-sm text-slate-500 flex items-center gap-1">
              {product.rating?.rate ? `${product.rating.rate} ⭐` : '- ⭐'}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default ProductCard
