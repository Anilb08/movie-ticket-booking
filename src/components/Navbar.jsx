import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  // Check if token exists in localStorage (user is logged in)
  const token = localStorage.getItem('token');
  const navigate = useNavigate(); // Use the useNavigate hook for navigation

  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove token on logout
    navigate('/');  // Redirect to home after logout
  };

  return (
    <nav style={{ backgroundColor: '#DC3558' }} className="p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Name */}
        <div className="text-white text-2xl font-bold">Movie Booking</div>
        
        {/* Navbar Links */}
        <div className="flex space-x-6">
          <Link to="/" className="text-white hover:text-black">Home</Link>
          
          {/* Show Profile Link if user is logged in */}
          {token && (
            <Link to="/profile" className="text-white hover:text-black">Profile</Link>
          )}
        </div>
        
        {/* Sign Up and Login Buttons */}
        <div className="flex space-x-4">
          {!token ? (
            <>
              <Link to="/signup" style={{ backgroundColor: '#f16281' }} className="text-white px-4 py-2 rounded-md hover:text-black">
                Sign Up
              </Link>
              <Link to="/login" style={{ backgroundColor: '#f16281' }} className="text-white px-4 py-2 rounded-md hover:text-black">
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}  // Use handleLogout function
              style={{ backgroundColor: '#f16281' }}
              className="text-white px-4 py-2 rounded-md hover:text-black"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
