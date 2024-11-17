import React, { useState } from 'react';
import axios from 'axios';
import './Auth.css'; // Make sure this file is correctly imported

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const [successMessege,setSuccessMessege] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sending data to the backend
    axios.post('http://localhost:5000/signup', signUpData)
      .then(response => {
        console.log('Sign Up Success:', response.data);
        setSuccessMessege('signup successful !');
        // Handle success, maybe redirect to another page or show a success message
      })
      .catch(error => {
        console.error('Error signing up:', error);
        setSuccessMessege('something went wrong ! ');
        // Handle error, show an error message
      });
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Sign Up</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={signUpData.name}
          onChange={handleChange}
          required
          className="auth-input"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={signUpData.phone}
          onChange={handleChange}
          required
          className="auth-input"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={signUpData.email}
          onChange={handleChange}
          required
          className="auth-input"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signUpData.password}
          onChange={handleChange}
          required
          className="auth-input"
        />
        <button type="submit" className="auth-button">Sign Up</button>
      </form>

        {successMessege && <p className='success-messege'>{successMessege}</p>}

    </div>
  );
};

export default SignUp;
