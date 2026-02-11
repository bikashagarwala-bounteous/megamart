import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useToast } from '../context/toastContext';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { addToast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 3) {
      newErrors.password = 'Password must be at least 3 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const success = await login(email, password);

      if (success) {
        addToast('Login successful!', 'success');
        navigate('/');
      } else {
        addToast('Invalid email or password', 'error');
      }
    } catch (error) {
      addToast('Login failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-b from-slate-50 to-white flex items-center justify-center py-8">
      <div className="w-full max-w-md px-4">
        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-900">Welcome to MegaMart</h1>
              <p className="text-slate-600 mt-2">Sign in to your account</p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm font-semibold text-blue-900 mb-2">Demo Credentials:</p>
              <p className="text-sm text-blue-800">Email: <code className="bg-white px-1 py-0.5 rounded">demo@megamart.com</code></p>
              <p className="text-sm text-blue-800">Password: <code className="bg-white px-1 py-0.5 rounded">demo123</code></p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Enter your email"
                  disabled={loading}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-900 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    errors.password ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="Enter your password"
                  disabled={loading}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <p className="text-center text-sm text-slate-600 mt-6">
              Don't have an account?{' '}
              <a href="#" className="text-sky-600 hover:text-sky-700 font-semibold">
                Sign up
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Login;
