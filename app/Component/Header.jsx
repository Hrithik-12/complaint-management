'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    const toastId = toast.loading('Logging out...');
    
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (res.ok) {
        toast.success('Logged out successfully', { id: toastId });
        window.location.href = '/login';
      } else {
        toast.error('Failed to logout', { id: toastId });
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
      <Link href={'/'} >
      <div className="flex items-center cursor-pointer ">
          <div className="h-10 w-10 relative mr-2">
            <div className="h-10 w-10 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xl">CM</span>
            </div>
          </div>
          <span className="text-xl font-semibold text-gray-800">Complaint Management</span>
        </div></Link>
        
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-300 flex items-center"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
            />
          </svg>
          Logout
        </button>
      </div>
    </header>
  );
}