import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scrolling effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };
  
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
      scrolled ? 'bg-white shadow-md backdrop-blur-lg bg-opacity-90' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-md">
              <span className="text-xl font-bold text-white">B</span>
            </div>
            <span className={`hidden sm:block text-lg font-semibold transition-colors ${scrolled ? 'text-gray-800' : 'text-indigo-700'}`}>
              Boiler Plate
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-2">
              <Link 
                to="/" 
                className={`px-3 py-2 rounded-lg font-medium transition-all ${
                  isActive('/') 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : `${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-indigo-700 hover:bg-white/20 backdrop-blur-sm'}`
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`px-3 py-2 rounded-lg font-medium transition-all ${
                  isActive('/about') 
                    ? 'bg-indigo-100 text-indigo-700' 
                    : `${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-indigo-700 hover:bg-white/20 backdrop-blur-sm'}`
                }`}
              >
                About
              </Link>
              {token && (
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-lg font-medium transition-all ${
                    isActive('/dashboard') 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : `${scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-indigo-700 hover:bg-white/20 backdrop-blur-sm'}`
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </div>
            
            {/* Auth Buttons */}
            <div>
              {token ? (
                <button 
                  onClick={handleLogout} 
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 
                            text-white px-4 py-2 rounded-lg shadow transition-all hover:shadow-md"
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </span>
                </button>
              ) : (
<div className="flex items-center space-x-3">
  <Link 
    to="/login" 
    className="inline-flex items-center px-4 py-2 rounded-lg border border-indigo-200 text-indigo-700 hover:bg-indigo-50
               transition-all shadow-sm hover:shadow font-medium"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
    </svg>
    Login
  </Link>

  <Link 
    to="/signup" 
    className="inline-flex items-center px-4 py-2 rounded-lg shadow-sm bg-gradient-to-r from-indigo-600 to-purple-600
               hover:from-indigo-700 hover:to-purple-700 text-white transition-all hover:shadow font-medium"
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
    Sign Up
  </Link>
</div>

              )}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 rounded-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${scrolled ? 'text-gray-800' : 'text-indigo-700'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          <div className="md:hidden mt-3 pb-3 space-y-2 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
            <Link 
              to="/" 
              className={`block px-4 py-2 rounded-lg ${isActive('/') ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`block px-4 py-2 rounded-lg ${isActive('/about') ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            {token && (
              <Link 
                to="/dashboard" 
                className={`block px-4 py-2 rounded-lg ${isActive('/dashboard') ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-100'}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            )}
            
            <div className="pt-2 mt-2 border-t border-gray-100">
              {token ? (
                <button 
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 text-white"
                >
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </span>
                </button>
              ) : (
                <div className="space-y-2">
                  <Link 
                    to="/login" 
                    className="block w-full px-4 py-2 text-center rounded-lg border border-indigo-200 text-indigo-700"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Login
                    </span>
                  </Link>
                  <Link 
                    to="/signup" 
                    className="block w-full px-4 py-2 text-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Sign Up
                    </span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}