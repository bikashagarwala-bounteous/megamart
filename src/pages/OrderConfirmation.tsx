import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrdersStore } from '../store/useOrdersStore';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import type { Order } from '../types';

const OrderConfirmation: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById, isInitialized, initializeOrders } = useOrdersStore();
  const [order, setOrder] = useState<Order | undefined>(undefined);

  useEffect(() => {
    if (!isInitialized) {
      initializeOrders();
    } else if (orderId) {
      const foundOrder = getOrderById(orderId);
      setOrder(foundOrder);
    }
  }, [isInitialized, orderId, getOrderById, initializeOrders]);

  if (!isInitialized) {
    return (
      <main className="container py-8">
        <div className="text-center text-slate-500">Loading...</div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="container py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Order Not Found</h1>
          <p className="text-slate-600 mb-6">We couldn't find the order you're looking for.</p>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </main>
    );
  }

  const orderDate = new Date(order.createdAt);
  const taxAmount = order.totalAmount * 0.1;
  const finalTotal = order.totalAmount + taxAmount;

  return (
    <main className="container py-8 max-w-4xl mx-auto">

      <div className="text-center mb-8">
        <div className="text-6xl mb-4">✅</div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Order Confirmed!</h1>
        <p className="text-slate-600">Thank you for your purchase</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 space-y-6">

          <Card>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Order ID</p>
                  <p className="text-xl font-bold text-slate-900">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Status</p>
                  <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {order.status}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Order Date</p>
                  <p className="font-semibold text-slate-900">{orderDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Payment Method</p>
                  <p className="font-semibold text-slate-900">{order.paymentMethod}</p>
                </div>
              </div>
            </CardContent>
          </Card>


          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Shipping Address</h2>
              <div className="space-y-1 text-slate-700">
                <p className="font-semibold">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.pincode}
                </p>
                <p>{order.shippingAddress.phone}</p>
                <p className="text-sm text-slate-600">{order.shippingAddress.email}</p>
              </div>
            </CardContent>
          </Card>


          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Order Items</h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:pb-0 last:border-0">
                    <div className="w-20 h-20 bg-slate-50 rounded flex items-center justify-center shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-16 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>


        <div className="lg:col-span-1">
          <Card className="sticky top-20 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>

              <div className="space-y-3 border-b border-slate-200 py-4">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax (10%)</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-sky-600">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
                <p className="font-semibold mb-1">Expected Delivery</p>
                <p>
                  {new Date(order.createdAt + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </p>
              </div>

              <Link to="/" className="block">
                <Button className="w-full">Back to Home</Button>
              </Link>

              <Link to="/orders" className="block">
                <Button variant="outline" className="w-full">
                  View Order History
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default OrderConfirmation;
