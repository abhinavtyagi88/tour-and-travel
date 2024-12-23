import React, { useState, useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import Home from "./sreenPages/Home";
import Signup from "./sreenPages/Signup";
import Profile from "./sreenPages/Profile";
import Location from "./sreenPages/TouristPlaces";
import Login from "./sreenPages/sign/Login";
// import TeamDetails from './sreenPages/TeamDetails';
import "./Navbar.css";
import TeamDetails from "./components/TeamDetails";

function App() {
  const navigate = useNavigate();

  const getUserFromLS = () => {
    const user = localStorage.getItem("user");
    
    try {
      return user ? JSON.parse(user) : {};
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      return {};
    }
  };
  

  const [user, setUser] = useState(getUserFromLS());
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const storedUser = getUserFromLS();
    const token = localStorage.getItem("token");
    setUser(storedUser);
    setIsAuthenticated(!!token);
  }, []);

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({});
    setIsAuthenticated(false);
    navigate("/login");
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
            src={
              user.img ||
              "https://previews.123rf.com/images/kritchanut/kritchanut1407/kritchanut140700335/29898193-male-avatar-profile-picture-vector-icon.jpg"
            }
            alt="profile"
          />
        </div>
      </div>

      <div className="l-navbar" id="nav-bar">
        <nav className="nav">
          <div>
            <NavLink to="/" className={({ isActive }) => (isActive ? "nav_link active" : "nav_link")}>
              <i className="bx bx-layer nav_logo-icon"></i>
              <span className="nav_logo-name">WanderMates</span>
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
              {!isAuthenticated && (
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
          {isAuthenticated && (
            <div className="nav_link" onClick={signOut}>
              <i className="bx bx-log-out nav_icon"></i>
              <span className="nav_name">Sign Out</span>
            </div>
          )}
        </nav>
      </div>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home id={user.id} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/locations" element={<Location />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teams/:teamId" element={<TeamDetails />} />
      </Routes>


    </>
  );
}

export default App;
