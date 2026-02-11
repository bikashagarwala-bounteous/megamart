import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useWishlistStore } from '../store/useWishlistStore';
import { useCartStore } from '../store/useCartStore';
import { useToast } from '../context/toastContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Wishlist: React.FC = () => {
  const { items, isInitialized, initializeWishlist, removeItem } =
    useWishlistStore();
  const { addItem: addToCart } = useCartStore();
  const { addToast } = useToast();

  useEffect(() => {
    if (!isInitialized) {
      initializeWishlist();
    }
  }, [isInitialized, initializeWishlist]);

  if (!isInitialized) {
    return (
      <main className="container py-8">
        <div className="text-center text-slate-500">Loading wishlist...</div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="container py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Wishlist</h1>
          <div className="text-8xl mb-4">❤️</div>
          <p className="text-slate-600 mb-6">Your wishlist is empty</p>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </main>
    );
  }

  const handleMoveToCart = (item: any) => {
    addToCart({
      productId: item.productId,
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: 1,
    });
    removeItem(item.id);
    addToast('Added to cart', 'success');
  };

  return (
    <main className="container py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Wishlist</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <Link to={`/products/${item.productId}`}>
              <div className="flex items-center justify-center h-48 bg-slate-50 hover:bg-slate-100 transition">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-40 object-contain"
                />
              </div>
            </Link>

            <CardContent className="p-4">
              <Link to={`/products/${item.productId}`}>
                <h3 className="text-sm font-medium text-slate-900 line-clamp-2 hover:text-sky-600">
                  {item.title}
                </h3>
              </Link>

              <div className="mt-3 flex items-center justify-between mb-3">
                <div className="text-lg font-bold text-sky-600">
                  ${item.price.toFixed(2)}
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="w-full px-3 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded text-sm font-semibold transition"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    removeItem(item.id);
                    addToast('Removed from wishlist', 'info');
                  }}
                  className="w-full px-3 py-2 border border-red-300 hover:bg-red-50 text-red-600 rounded text-sm font-semibold transition"
                >
                  Remove
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default Wishlist;
