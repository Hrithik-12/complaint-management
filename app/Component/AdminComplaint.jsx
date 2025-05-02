'use client';

import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import EditComplaintModal from './EditModal'; // Import the modal component

export default function AdminComplaintsTable() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [selectedComplaint, setSelectedComplaint] = useState(null); // Selected complaint for editing

  // Fetch complaints on mount
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch('/api/complaint');
        if (res.ok) {
          const data = await res.json();
          setComplaints(data);
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

  if (loading) return <p>Loading complaints...</p>;

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
    setComplaints(complaints.map((complaint) => 
      complaint._id === updatedComplaint._id ? updatedComplaint : complaint
    ));
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

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-xl font-bold mb-4">Admin Complaint Management</h2>
      <table className="min-w-full table-auto border-collapse border  border-gray-300">
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
          {complaints.length > 0 ? complaints.map((complaint) => (
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
                No complaints found
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
