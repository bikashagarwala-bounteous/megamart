import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useOrdersStore } from '../store/useOrdersStore';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const OrderHistory: React.FC = () => {
  const { orders, isInitialized, initializeOrders } = useOrdersStore();

  useEffect(() => {
    if (!isInitialized) {
      initializeOrders();
    }
  }, [isInitialized, initializeOrders]);

  if (!isInitialized) {
    return (
      <main className="container py-8">
        <div className="text-center text-slate-500">Loading orders...</div>
      </main>
    );
  }

  if (orders.length === 0) {
    return (
      <main className="container py-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Order History</h1>
        <div className="text-center">
          <div className="text-8xl mb-4">📦</div>
          <p className="text-slate-600 mb-6">No orders yet</p>
          <Link to="/products">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Order History</h1>

      <div className="space-y-4">
        {orders.map((order) => {
          const orderDate = new Date(order.createdAt);
          const totalAmount = order.totalAmount + order.totalAmount * 0.1;

          return (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900">
                        {order.id}
                      </h3>
                      <div
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          order.status === 'CONFIRMED'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'SHIPPED'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'DELIVERED'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.status}
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 mb-2">
                      {orderDate.toLocaleDateString()} at{' '}
                      {orderDate.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>

                    <div className="text-sm text-slate-700">
                      <p className="font-semibold">
                        {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                      </p>
                      <div className="mt-1 space-y-1">
                        {order.items.slice(0, 2).map((item) => (
                          <p key={item.id} className="text-slate-600 line-clamp-1">
                            • {item.title} x {item.quantity}
                          </p>
                        ))}
                        {order.items.length > 2 && (
                          <p className="text-slate-600">
                            +{order.items.length - 2} more item
                            {order.items.length - 2 !== 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Total and Actions */}
                  <div className="md:text-right">
                    <p className="text-sm text-slate-600 mb-1">Total Amount</p>
                    <p className="text-2xl font-bold text-sky-600 mb-4">
                      ${totalAmount.toFixed(2)}
                    </p>

                    <Link to={`/order-confirmation/${order.id}`}>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8">
        <Link to="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    </main>
  );
};

export default OrderHistory;
