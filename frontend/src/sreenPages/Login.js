import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import {FaUser, FaLock} from "react-icons/fa";
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div className='background'>
    <div className='wrapper'>
      <form action="">
        <h1>Login</h1>
        <div className='input-box'>
          <input type="text" placeholder='username' required/>
          <FaUser className='icon'/>

        </div>
        <div className='input-box'>
        <input type="password" placeholder='Password' required/>
        <FaLock className='icon'/>
        </div>

        <div className='remember-forgot'>
          <label><input type="checkbox"/>Remember me </label>
          <a href='#'>Forgot password?</a>
        </div>

        <button type="submit">Login</button>
        <div className='register-link'>
          <p>Don't have an account? <a href='#'>Register</a> </p>
        </div>
      </form>
    </div>
    </div>
  );
};

export default Login;
