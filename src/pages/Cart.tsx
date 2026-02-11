import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useToast } from '../context/toastContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { items, isInitialized, initializeCart, updateQuantity, removeItem } =
    useCartStore();
  const { getTotalPrice, getItemCount } = useCartStore();
  const { addToast } = useToast();

  useEffect(() => {
    if (!isInitialized) {
      initializeCart();
    }
  }, [isInitialized, initializeCart]);

  const totalPrice = getTotalPrice();
  const totalItems = getItemCount();

  if (!isInitialized) {
    return (
      <main className="container py-8">
        <div className="text-center text-slate-500">Loading cart...</div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="container py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Shopping Cart</h1>
          <div className="text-8xl mb-4">🛒</div>
          <p className="text-slate-600 mb-6">Your cart is empty</p>
          <Link to="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </main>
    );
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <main className="container py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex gap-4">

                  <div className="w-20 h-20 bg-slate-50 rounded flex items-center justify-center shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="max-h-16 object-contain"
                    />
                  </div>


                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-900 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-sky-600 font-bold mt-1">${item.price.toFixed(2)}</p>
                  </div>


                  <div className="flex items-center gap-2 border border-slate-300 rounded px-2 py-1 h-fit">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="hover:bg-slate-100 px-2 py-1 rounded"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="hover:bg-slate-100 px-2 py-1 rounded"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>


                  <div className="text-right min-w-fit">
                    <p className="text-sm text-slate-600">Total</p>
                    <p className="text-lg font-bold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>


                  <button
                    onClick={() => {
                      removeItem(item.id);
                      addToast('Item removed from cart', 'info');
                    }}
                    className="text-red-500 hover:text-red-700 font-semibold px-2"
                    aria-label="Remove item"
                  >
                    Remove
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>


        <div className="lg:col-span-1">
          <Card className="sticky top-20 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>

              <div className="space-y-3 border-t border-b border-slate-200 py-4">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span>${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-sky-600">
                  ${(totalPrice + totalPrice * 0.1).toFixed(2)}
                </span>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white"
              >
                Proceed to Checkout
              </Button>

              <Link to="/products" className="block">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Cart;
