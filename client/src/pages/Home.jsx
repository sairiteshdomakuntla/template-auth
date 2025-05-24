import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full py-12 px-4 md:py-24 text-center bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 leading-tight max-w-4xl mx-auto">
          Build Your Next Project Faster with Our Template
        </h1>
        <p className="text-xl mb-8 text-gray-600 max-w-2xl mx-auto leading-relaxed">
          A modern web application template with authentication, protected routes, and beautifully designed components.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            to="/dashboard" 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:-translate-y-1 hover:shadow-lg"
          >
            Get Started
          </Link>
          <Link 
            to="/about" 
            className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-8 rounded-lg border border-gray-300 transition-all transform hover:-translate-y-1 hover:shadow-lg"
          >
            Learn More
          </Link>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="w-full max-w-5xl mx-auto mb-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <div className="bg-blue-100 text-blue-700 rounded-full h-14 w-14 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Secure Authentication</h3>
            <p className="text-gray-600">
              JWT authentication keeps user data secure, with login, signup, and protected routes already configured.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <div className="bg-indigo-100 text-indigo-700 rounded-full h-14 w-14 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Responsive Design</h3>
            <p className="text-gray-600">
              Looks great on all devices with a mobile-first approach using Tailwind CSS for flexible styling.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100">
            <div className="bg-green-100 text-green-700 rounded-full h-14 w-14 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Quick Setup</h3>
            <p className="text-gray-600">
              Start building features immediately with pre-configured routing, API connections, and user management.
            </p>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="w-full bg-blue-700 text-white py-16 px-4 rounded-xl">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Building?</h2>
          <p className="text-lg mb-8 opacity-90">
            Clone this template and start creating your next great project with all the foundations already in place.
          </p>
          <Link 
            to="/signup" 
            className="bg-white text-blue-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition-all transform hover:-translate-y-1 hover:shadow-lg inline-block"
          >
            Sign Up Now
          </Link>
        </div>
      </div>
    </div>
  );
}