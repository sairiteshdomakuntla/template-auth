import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold flex items-center">
            <span className="bg-white text-blue-700 rounded-full h-8 w-8 flex items-center justify-center mr-2">
              T
            </span>
            <span className="hidden sm:inline">Template App</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link to="/" className="hover:text-blue-200 transition-colors font-medium">Home</Link>
              <Link to="/about" className="hover:text-blue-200 transition-colors font-medium">About Us</Link>
              {token && (
                <Link to="/dashboard" className="hover:text-blue-200 transition-colors font-medium">Dashboard</Link>
              )}
            </div>
            
            {/* Auth Buttons */}
            <div>
              {token ? (
                <button 
                  onClick={handleLogout} 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md shadow transition-all hover:shadow-lg"
                >
                  Logout
                </button>
              ) : (
                <div className="space-x-3">
                  <Link 
                    to="/login" 
                    className="bg-white text-blue-700 hover:bg-gray-100 px-4 py-2 rounded-md shadow transition-all hover:shadow-lg font-medium"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md shadow transition-all hover:shadow-lg font-medium"
                  >
                    Signup
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-3">
            <Link 
              to="/" 
              className="block hover:bg-blue-800 px-3 py-2 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="block hover:bg-blue-800 px-3 py-2 rounded-md"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            {token && (
              <Link 
                to="/dashboard" 
                className="block hover:bg-blue-800 px-3 py-2 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            
            {token ? (
              <button 
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }} 
                className="w-full text-left bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md"
              >
                Logout
              </button>
            ) : (
              <div className="space-y-2 pt-2">
                <Link 
                  to="/login" 
                  className="block bg-white text-blue-700 hover:bg-gray-100 px-3 py-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Signup
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}