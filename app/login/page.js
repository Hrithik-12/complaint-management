'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '', role: 'user' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    const toastId = toast.loading('Logging in...');
    
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success('Login successful!', { id: toastId });
        console.log('Redirecting to: ', `/com-man/${form.role}`);
        
        // Force a hard navigation instead of client-side navigation
        window.location.href = `/com-man/${form.role}`;
      } else {
        setIsLoading(false);
        toast.error(data.error || 'Login failed', { id: toastId });
      }
    } catch (err) {
      setIsLoading(false);
      console.error('Login error:', err);
      toast.error('Something went wrong. Please try again.', { id: toastId });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-500 to-blue-900">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Welcome Back!</h2>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
            disabled={isLoading}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="role" className="block text-lg font-medium text-gray-700">Role</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={isLoading}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
          disabled={isLoading}
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up here
          </a>
        </p>
      </form>
    </div>
  );
}