'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

export default function EditComplaintModal({ complaint, onClose, onSave }) {
  const [form, setForm] = useState({
    status: '',
    priority: '',
  });

  useEffect(() => {
    if (complaint) {
      setForm({
        status: complaint.status || 'Pending',
        priority: complaint.priority || 'Medium',
      });
    }
  }, [complaint]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading('Updating complaint...');

    try {
      const res = await fetch(`/api/complaint/${complaint._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const updated = await res.json();
        onSave(updated);
        toast.success('Complaint updated successfully!', { id: toastId });
        onClose();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || 'Failed to update complaint', { id: toastId });
      }
    } catch (error) {
      console.error('Error updating complaint:', error);
      toast.error('Something went wrong', { id: toastId });
    }
  };

  if (!complaint) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
        aria-hidden="true"
      ></div>

      <div 
        className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md z-10 animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <h2 className="text-xl font-bold mb-4">Update Complaint</h2>
        
        <div className="mb-4">
          <p className="text-gray-700 font-medium">Title: <span className="font-normal">{complaint.title}</span></p>
          <p className="text-gray-700 font-medium mt-1">Category: <span className="font-normal">{complaint.category}</span></p>
          <p className="text-gray-700 font-medium mt-1">Description: <span className="font-normal">{complaint.description}</span></p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <label className="block mb-4">
            <span className="text-gray-700 font-medium">Status:</span>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Under Review">Under Review</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </label>

          <label className="block mb-6">
            <span className="text-gray-700 font-medium">Priority:</span>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 px-3 py-2 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </label>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
