import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Login = ({ onClose }) => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // Loading state for the form submission
  const [error, setError] = useState(''); // Error state for handling error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); // Reset previous error message

    axios
    .post('http://localhost:5000/login', loginData)
    .then((response) => {
      console.log('Login Success:', response.data);
      localStorage.setItem('token', response.data.token); // This should save the token
      alert('Welcome back!');
      if (onClose) onClose(); // Close the modal upon successful login
      navigate('/profile'); // Redirect to profile page
    })
    .catch((error) => {
      setLoading(false);
      console.error('Login Error:', error);
      if (error.response) {
        const errorMessage = error.response.data.message;
        setError(errorMessage || 'Login failed. Please try again.');
      } else {
        setError('Network error. Please try again.');
      }
    });
  
  };

  return (
    <div className="auth-container">
      <button className="close-button" onClick={onClose}>X</button>
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        {error && <p className="error-message">{error}</p>}
        
        <input
          type="email" // Change type to 'email' for validation
          name="email" // Changed to 'email' for clarity
          placeholder="Email"
          value={loginData.email}
          onChange={handleChange}
          required
          className="auth-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginData.password}
          onChange={handleChange}
          required
          className="auth-input"
        />
        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
