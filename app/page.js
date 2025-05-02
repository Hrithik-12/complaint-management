'use client';
import React from 'react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="flex-1 bg-gradient-to-r from-blue-600 to-blue-900 flex flex-col items-center justify-center text-center text-white p-8">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Complaint Management System</h1>
        <p className="text-lg md:text-xl max-w-xl">
          Streamline the process of reporting, tracking, and resolving complaints efficiently and transparently.
        </p>
        <div className="mt-6 flex gap-4">
          <a
            href="/login"
            className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-full shadow hover:bg-gray-100 transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="px-6 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-700 transition"
          >
            Sign Up
          </a>
        </div>
      </header>

      {/* Features */}
      <section className="py-12 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
        <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Easy Reporting</h3>
            <p className="text-gray-600">Submit complaints online anytime, anywhere with a simple interface.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor the status of your complaint in real-time until resolution.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Faster Resolution</h3>
            <p className="text-gray-600">Our system ensures complaints are directed to the right department quickly.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        &copy; {new Date().getFullYear()} Hrithik. All rights reserved.
      </footer>
    </div>
  );
}
