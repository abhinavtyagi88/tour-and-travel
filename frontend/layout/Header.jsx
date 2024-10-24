import React from "react";
import "./Navbar.css"; // Import your CSS file for Navbar styles
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="header" id="header">
        <div className="header_toggle d-flex">
          <i className="bx bx-menu me-5" id="header-toggle">
            icon
          </i>
          <input
            className="form-control me-2 w-75 bg-white text-dark"
            type="search"
            placeholder="Search in here..."
            aria-label="Search"
          />
          <button className="btn text-white bg-danger">X</button>
        </div>
        <div className="header_img">
          <img src="https://i.imgur.com/hczKIze.jpg" alt="profile" />
        </div>
      </div>

      <div className="l-navbar" id="nav-bar">
        <nav className="nav">
          <div>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav_link active" : "nav_link"
              }
            >
              <i className="bx bx-layer nav_logo-icon"></i>
              <span className="nav_logo-name">BBBootstrap</span>
            </NavLink>
            <div className="nav_list">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav_link active" : "nav_link"
                }
              >
                <i className="bx bx-grid-alt nav_icon"></i>
                <span className="nav_name">Home</span>
              </NavLink>
              <NavLink
                to="/locations"
                className={({ isActive }) =>
                  isActive ? "nav_link active" : "nav_link"
                }
              >
                <i className="bx bx-user nav_icon"></i>
                <span className="nav_name">Location</span>
              </NavLink>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "nav_link active" : "nav_link"
                }
              >
                <i className="bx bx-message-square-detail nav_icon"></i>
                <span className="nav_name">Profile</span>
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive ? "nav_link active" : "nav_link"
                }
              >
                <i className="bx bx-bookmark nav_icon"></i>
                <span className="nav_name">Sign Up</span>
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "nav_link active" : "nav_link"
                }
              >
                <i className="bx bx-folder nav_icon"></i>
                <span className="nav_name">Login</span>
              </NavLink>
            </div>
          </div>
          <NavLink
            to="/signout"
            className={({ isActive }) =>
              isActive ? "nav_link active" : "nav_link"
            }
          >
            <i className="bx bx-log-out nav_icon"></i>
            <span className="nav_name">SignOut</span>
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Header;
