import React, { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Home from './sreenPages/Home';
import Signup from './sreenPages/Signup';
import Profile from './sreenPages/Profile';
import Location from './sreenPages/TouristPlaces';
import Login from './sreenPages/sign/Login';
import './Navbar.css'; // Import your CSS file for Navbar styles

function App() {
  const navigate = useNavigate();

  const getUserFromLS = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : {};
  };

  const [user, setUser] = useState(getUserFromLS());

  const signOut = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    localStorage.removeItem('user'); 
    setUser({}); // Clear user state
    navigate('/login');  // Redirect to login page
  };

  return (
    <>
      {/* Navbar Section */}
      <div className="header" id="header">
        <div className="header_toggle d-flex">
          <i className="bx bx-menu me-5" id="header-toggle">icon</i>
          <input
            className="form-control me-2 w-75 bg-white text-dark"
            type="search"
            placeholder="Search in here..."
            aria-label="Search"
          />
          <button className="btn text-white bg-danger">X</button>
        </div>
        <div className="header_img">
          <img 
            src={user.img || "https://previews.123rf.com/images/kritchanut/kritchanut1407/kritchanut140700335/29898193-male-avatar-profile-picture-vector-icon.jpg"} 
            alt="profile" 
          />
        </div>
      </div>

      <div className="l-navbar" id="nav-bar">
        <nav className="nav">
          <div>
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav_link active" : "nav_link")}>
              <i className="bx bx-layer nav_logo-icon"></i>
              <span className="nav_logo-name">BBBootstrap</span>
            </NavLink>
            <div className="nav_list">
              <NavLink to="/" className={({ isActive }) => (isActive ? "nav_link active" : "nav_link")}>
                <i className="bx bx-grid-alt nav_icon"></i>
                <span className="nav_name">Home</span>
              </NavLink>
              <NavLink to="/locations" className={({ isActive }) => (isActive ? "nav_link active" : "nav_link")}>
                <i className="bx bx-user nav_icon"></i>
                <span className="nav_name">Location</span>
              </NavLink>
              <NavLink to="/profile" className={({ isActive }) => (isActive ? "nav_link active" : "nav_link")}>
                <i className="bx bx-message-square-detail nav_icon"></i>
                <span className="nav_name">Profile</span>
              </NavLink>
              
              {!localStorage.getItem('token') && (
                <>
                  <NavLink to="/signup" className={({ isActive }) => (isActive ? "nav_link active" : "nav_link")}>
                    <i className="bx bx-bookmark nav_icon"></i>
                    <span className="nav_name">Sign Up</span>
                  </NavLink>
                  <NavLink to="/login" className={({ isActive }) => (isActive ? "nav_link active" : "nav_link")}>
                    <i className="bx bx-folder nav_icon"></i>
                    <span className="nav_name">Login</span>
                  </NavLink>
                </>
              )}
            </div>
          </div>
          {localStorage.getItem('token') && (
            <div className="nav_link" onClick={signOut}>
              <i className="bx bx-log-out nav_icon"></i>
              <span className="nav_name">SignOut</span>
            </div>
          )}
        </nav>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home id = {user.id} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/locations" element={<Location />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
