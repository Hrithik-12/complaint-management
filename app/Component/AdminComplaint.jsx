'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import EditComplaintModal from './EditModal';

export default function AdminComplaintsTable() {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  // Predefined status options
  const statusOptions = ['Pending', 'In Progress', 'Under Review', 'Closed', 'Resolved'];
  // Priority values will still be dynamically generated
  const [priorityOptions, setPriorityOptions] = useState([]);

  // Fetch complaints on mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch('/api/complaint');
        if (res.ok) {
          const data = await res.json();
          setComplaints(data);
          setFilteredComplaints(data);
          
          // Only extract unique priority values - status options are predefined
          const uniquePriorities = [...new Set(data.map(item => item.priority))];
          setPriorityOptions(uniquePriorities);
          
          toast.success('Complaints loaded');
        } else {
          toast.error('Failed to fetch complaints');
        }
      } catch (err) {
        console.error('Failed to fetch complaints:', err);
        toast.error('Error fetching complaints');
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  // Apply filters when filter states change
  useEffect(() => {
    let result = [...complaints];
    
    if (statusFilter) {
      result = result.filter(complaint => complaint.status === statusFilter);
    }
    
    if (priorityFilter) {
      result = result.filter(complaint => complaint.priority === priorityFilter);
    }
    
    setFilteredComplaints(result);
  }, [complaints, statusFilter, priorityFilter]);

  const handleEditClick = (complaint) => {
    setSelectedComplaint(complaint);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedComplaint(null);
  };

  const handleSave = (updatedComplaint) => {
    // Update the complaint in the table after editing
    const updatedComplaints = complaints.map((complaint) => 
      complaint._id === updatedComplaint._id ? updatedComplaint : complaint
    );
    setComplaints(updatedComplaints);
    toast.success('Complaint updated in table');
  };

  const handleDelete = async (complaintId) => {
    const confirmed = window.confirm("Are you sure you want to delete this complaint?");
    if (!confirmed) return;

    const toastId = toast.loading('Deleting complaint...');

    try {
      const res = await fetch(`/api/complaint/${complaintId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Filter out the deleted complaint from the state
        setComplaints(complaints.filter((complaint) => complaint._id !== complaintId));
        toast.success('Complaint deleted successfully', { id: toastId });
      } else {
        toast.error('Failed to delete complaint', { id: toastId });
      }
    } catch (err) {
      console.error('Failed to delete complaint:', err);
      toast.error('Error deleting complaint', { id: toastId });
    }
  };

  const resetFilters = () => {
    setStatusFilter('');
    setPriorityFilter('');
  };

  if (loading) return <p>Loading complaints...</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-bold mb-4">Admin Complaint Management</h2>
      
      {/* Filter Controls */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <div className="flex items-center">
          <label htmlFor="statusFilter" className="mr-2 font-medium">Status:</label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1"
          >
            <option value="">All</option>
            {statusOptions.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center">
          <label htmlFor="priorityFilter" className="mr-2 font-medium">Priority:</label>
          <select
            id="priorityFilter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1"
          >
            <option value="">All</option>
            {priorityOptions.map(priority => (
              <option key={priority} value={priority}>{priority}</option>
            ))}
          </select>
        </div>

        {(statusFilter || priorityFilter) && (
          <button
            onClick={resetFilters}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-3 py-1 rounded"
          >
            Clear Filters
          </button>
        )}
        
        <span className="text-sm text-gray-500">
          Showing {filteredComplaints.length} of {complaints.length} complaints
        </span>
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Priority</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredComplaints.length > 0 ? filteredComplaints.map((complaint) => (
            <tr key={complaint._id}>
              <td className="border px-4 py-2">{complaint.title}</td>
              <td className="border px-4 py-2">{complaint.category}</td>
              <td className="border px-4 py-2">{complaint.priority}</td>
              <td className="border px-4 py-2">{complaint.status}</td>
              <td className="border px-4 py-2">{new Date(complaint.dateSubmitted).toLocaleDateString()}</td>
              <td className="border px-4 py-2 flex justify-center gap-2"> 
                <button 
                  className="text-blue-500 hover:text-blue-700 mr-2" 
                  onClick={() => handleEditClick(complaint)}
                >
                  Edit
                </button>
                <button 
                  className="text-red-500 hover:text-red-700" 
                  onClick={() => handleDelete(complaint._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan={6} className="border px-4 py-8 text-center text-gray-500">
                {complaints.length > 0 ? 'No complaints match the selected filters' : 'No complaints found'}
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && selectedComplaint && (
        <EditComplaintModal 
          complaint={selectedComplaint} 
          onClose={handleModalClose} 
          onSave={handleSave}
        />
      )}
    </div>
  );
}