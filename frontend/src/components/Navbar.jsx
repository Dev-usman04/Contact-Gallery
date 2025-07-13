import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setAuthToken }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthToken(null);
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-lg animate-slideInDown">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:scale-105 transition-transform duration-200 flex items-center">
          <span className="mr-2">📞</span>
          Contact Keeper
        </Link>
        <div>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center"
            >
              <span className="mr-2">🚪</span>
              Logout
            </button>
          ) : (
            <div className="space-x-4 flex items-center">
              <Link 
                to="/login" 
                className="text-white hover:text-blue-200 transition-colors duration-200 px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-20"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="text-white bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;