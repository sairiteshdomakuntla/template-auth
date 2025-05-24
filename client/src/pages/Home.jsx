import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to TaskApp</h1>
      <p className="text-xl mb-8 text-center max-w-2xl text-gray-600">
        Your simple solution for managing daily tasks and staying organized.
      </p>
      <div className="flex gap-4">
        <Link 
          to="/dashboard" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Get Started
        </Link>
        <Link 
          to="/about" 
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition-colors"
        >
          Learn More
        </Link>
      </div>
      
      {/* Featured section */}
      <div className="mt-16 w-full max-w-5xl">
        <h2 className="text-2xl font-bold mb-8 text-center">Why Choose TaskApp?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Simple</h3>
            <p className="text-gray-600">Easy to use interface that helps you get started quickly without a learning curve.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Fast</h3>
            <p className="text-gray-600">Optimized performance means your tasks are always just a click away.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Secure</h3>
            <p className="text-gray-600">JWT authentication ensures your data stays private and secure.</p>
          </div>
        </div>
      </div>
    </div>
  );
}