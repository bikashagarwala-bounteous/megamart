import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { fetchProducts } from '../utils/api'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel'
import ProductCard from '../components/ProductCard'

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetchProducts()
      .then(data => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const featured = products.slice(0, 6)
  const deals = products.slice(6, 14)

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <section className="container max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-linear-to-r from-sky-500 to-sky-600 rounded-lg p-8 text-white">
            <h2 className="text-4xl font-bold">SMART WEARABLE.</h2>
            <p className="mt-2 text-sky-100">Best Deal Online on smart watches — up to 80% off</p>
            <div className="mt-6">
              <Link to="/products">
                <Button variant="secondary" size="lg">Shop Now</Button>
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 flex items-center justify-center shadow-sm border border-slate-200">
            <div className="text-8xl">⌚</div>
          </div>
        </div>
      </section>

      <section className="container max-w-6xl mx-auto px-4 py-12">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-3xl font-bold text-slate-900">Featured Products</h3>
            <Link to="/products" className="text-sky-600 hover:text-sky-700 font-semibold">View all →</Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-slate-500">Loading featured products...</div>
        ) : featured.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent className="-ml-2 md:-ml-4">
              {featured.map(product => (
                <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full sm:basis-1/2 md:basis-1/3">
                  <ProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0" />
            <CarouselNext className="right-0" />
          </Carousel>
        ) : null}
      </section>

      <section className="container max-w-6xl mx-auto px-4 py-12 border-t border-slate-200">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-3xl font-bold text-slate-900">Best Deals Today</h3>
            <Link to="/products" className="text-sky-600 hover:text-sky-700 font-semibold">View all →</Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8 text-slate-500">Loading products...</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {deals.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <section className="container max-w-6xl mx-auto px-4 py-16">
        <Card className="bg-linear-to-r from-blue-900 to-blue-800 border-0 text-white">
          <CardContent className="flex flex-col sm:flex-row items-center justify-between p-8">
            <div>
              <h3 className="text-2xl font-bold">Special Offers Waiting</h3>
              <p className="mt-2 text-slate-300">Get exclusive deals on thousands of products</p>
            </div>
            <Link to="/products" className="mt-4 sm:mt-0">
              <Button variant="secondary" size="lg">Explore Now</Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}

export default Home
