import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');  // Email state
  const [password, setPassword] = useState('');  // Password state
  const [error, setError] = useState('');  // Error state

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent form from reloading the page
    
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),  // Send email and password
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log(data.token);
        
        navigate('/');  // Navigate to homepage
      } else {
        setError(data.error || 'Login failed');  // Display error
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong.');
      alert('Something went wrong.');
    }
  };

  return (
    <div className='background'>
      <div className='wrapper'>
        <form onSubmit={handleSubmit}>  {/* Bind handleSubmit to form */}
          <h1>Login</h1>
          
          <div className='input-box'>
            <input 
              type="email" 
              placeholder='Email' 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}  // Update email state
              required
            />
            <FaUser className='icon'/>
          </div>
          
          <div className='input-box'>
            <input 
              type="password" 
              placeholder='Password' 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}  // Update password state
              required
            />
            <FaLock className='icon'/>
          </div>

          <div className='remember-forgot'>
            <label><input type="checkbox"/>Remember me </label>
            <a href='#'>Forgot password?</a>
          </div>

          <button type="submit">Login</button>  {/* Submit button */}
          
          {error && <p className="error-message">{error}</p>}  {/* Display error */}
          
          <div className='register-link'>
            <p>Don't have an account? <a href='#'>Register</a> </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
