import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import { useOrdersStore } from '../store/useOrdersStore';
import { useToast } from '../context/toastContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import type { ShippingAddress } from '../types';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, isInitialized, initializeCart, clearCart } =
    useCartStore();
  const { addOrder } = useOrdersStore();
  const { addToast } = useToast();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'CARD' | 'UPI'>(
    'COD'
  );

  useEffect(() => {
    if (!isInitialized) {
      initializeCart();
    }
    if (items.length === 0 && isInitialized) {
      addToast('Cart is empty', 'error');
      navigate('/cart');
    }
  }, [isInitialized, items, initializeCart, navigate, addToast]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const totalAmount = getTotalPrice();
      const orderId = addOrder({
        items,
        totalAmount,
        shippingAddress: formData,
        paymentMethod,
        status: 'CONFIRMED',
      });

      clearCart();
      addToast('Order placed successfully!', 'success');
      navigate(`/order-confirmation/${orderId}`);
    } catch (error) {
      addToast('Failed to place order. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (!isInitialized || items.length === 0) {
    return (
      <main className="container py-8">
        <div className="text-center text-slate-500">Loading...</div>
      </main>
    );
  }

  const totalAmount = getTotalPrice();
  const taxAmount = totalAmount * 0.1;
  const finalTotal = totalAmount + taxAmount;

  return (
    <main className="container py-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handlePlaceOrder} className="space-y-6">
            {/* Contact Details */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Contact Details
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        errors.fullName ? 'border-red-500' : 'border-slate-300'
                      }`}
                      placeholder="John Doe"
                      disabled={loading}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                          errors.email ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder="john@example.com"
                        disabled={loading}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                          errors.phone ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder="9876543210"
                        disabled={loading}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-1">
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none ${
                        errors.address ? 'border-red-500' : 'border-slate-300'
                      }`}
                      rows={3}
                      placeholder="Enter your address"
                      disabled={loading}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                          errors.city ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder="New York"
                        disabled={loading}
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-900 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                          errors.state ? 'border-red-500' : 'border-slate-300'
                        }`}
                        placeholder="NY"
                        disabled={loading}
                      />
                      {errors.state && (
                        <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-900 mb-1">
                      Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                        errors.pincode ? 'border-red-500' : 'border-slate-300'
                      }`}
                      placeholder="110001"
                      disabled={loading}
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-slate-900 mb-4">
                  Payment Method
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center p-3 border-2 border-sky-500 rounded-lg cursor-pointer bg-sky-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as 'COD' | 'CARD' | 'UPI')
                      }
                      className="mr-3"
                      disabled={loading}
                    />
                    <span className="font-semibold text-slate-900">
                      Cash on Delivery (COD)
                    </span>
                  </label>
                  <label className="flex items-center p-3 border border-slate-300 rounded-lg cursor-pointer hover:border-sky-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="CARD"
                      checked={paymentMethod === 'CARD'}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as 'COD' | 'CARD' | 'UPI')
                      }
                      className="mr-3"
                      disabled={loading}
                    />
                    <span className="font-semibold text-slate-900">
                      Credit/Debit Card
                    </span>
                  </label>
                  <label className="flex items-center p-3 border border-slate-300 rounded-lg cursor-pointer hover:border-sky-500">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="UPI"
                      checked={paymentMethod === 'UPI'}
                      onChange={(e) =>
                        setPaymentMethod(e.target.value as 'COD' | 'CARD' | 'UPI')
                      }
                      className="mr-3"
                      disabled={loading}
                    />
                    <span className="font-semibold text-slate-900">
                      UPI Payment
                    </span>
                  </label>
                </div>
              </CardContent>
            </Card>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 text-lg"
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-20 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>

              <div className="space-y-2 max-h-96 overflow-y-auto border-b border-slate-200 pb-4">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-600 line-clamp-1">
                      {item.title} x {item.quantity}
                    </span>
                    <span className="font-medium text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-b border-slate-200 py-4">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
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
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Checkout;
