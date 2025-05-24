import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-xl font-bold">Template App</Link>
        
        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/about" className="hover:text-gray-300">About Us</Link>
          {token && (
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
          )}
        </div>
        
        {/* Auth Buttons */}
        <div>
          {token ? (
            <button 
              onClick={handleLogout} 
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
            >
              Logout
            </button>
          ) : (
            <div className="space-x-2">
              <Link 
                to="/login" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
              >
                Login
              </Link>
              <Link 
                to="/signup" 
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}