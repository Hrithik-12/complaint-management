'use client';

import Header from '@/app/Component/Header';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function UserComplaintForm() {
  const [form, setForm] = useState({
    title: '',
    category: '',
    priority: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading('Submitting complaint...');
    setLoading(true);

    try {
      const res = await fetch('/api/complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Complaint submitted successfully!', { id: toastId });
        setForm({ title: '', category: '', priority: '', description: '' });
      } else {
        toast.error(data.message || 'Failed to submit complaint', { id: toastId });
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again.', { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center " style={{ backgroundImage: "url('/bgg1.jpg')" }}
    >
      <Header />
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white bg-opacity-95 shadow-xl rounded-xl w-full max-w-2xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-center text-blue-700">Register a Complaint</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Enter complaint title"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="">Select Category</option>
                <option value="Product">Product</option>
                <option value="Service">Service</option>
                <option value="Billing">Billing</option>
                <option value="Support">Support</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              >
                <option value="">Select Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Describe your complaint"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setForm({ title: '', category: '', priority: '', description: '' })}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-6 rounded-lg transition"
              >
                Clear
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition disabled:bg-blue-400"
              >
                {loading ? 'Submitting...' : 'Submit Complaint'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
