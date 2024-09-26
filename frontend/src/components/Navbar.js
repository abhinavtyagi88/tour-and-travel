import React, { useEffect } from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom'; 


function Navbar() {
  useEffect(() => {
    const showNavbar = (toggleId, navId, bodyId, headerId) => {
      const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId),
        bodypd = document.getElementById(bodyId),
        headerpd = document.getElementById(headerId);

      if (toggle && nav && bodypd && headerpd) {
        toggle.addEventListener('click', () => {
          nav.classList.toggle('show');
          toggle.classList.toggle('bx-x');
          bodypd.classList.toggle('body-pd');
          headerpd.classList.toggle('body-pd');
        });
      }
    };

    showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');

    const linkColor = document.querySelectorAll('.nav_link');
    function colorLink() {
      linkColor.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    }
    linkColor.forEach(l => l.addEventListener('click', colorLink));
  }, []);

  return (
    <>
        <div className="header" id="header">
          <div className="header_toggle d-flex">
            <i className="bx bx-menu me-5" id="header-toggle">icon</i>
            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search"  />
            <button className="btn text-white bg-danger" >X</button>

          </div>
          {/* <div className="d-flex ">  
                <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search"  />
                <button className="btn text-white bg-danger" >X</button>
          </div> */}
          <div className="header_img">
            <img src="https://i.imgur.com/hczKIze.jpg" alt="profile" />
          </div>
        </div>

        <div className="l-navbar" id="nav-bar">
          <nav className="nav">
            <div>
              <Link to="/" className="nav_logo">
                <i className="bx bx-layer nav_logo-icon"></i>
                <span className="nav_logo-name">BBBootstrap</span>
              </Link>
              <div className="nav_list">
                <Link to="/dashboard" className="nav_link active">
                  <i className="bx bx-grid-alt nav_icon"></i>
                  <span className="nav_name">Dashboard</span>
                </Link>
                <Link to="/users" className="nav_link">
                  <i className="bx bx-user nav_icon"></i>
                  <span className="nav_name">Users</span>
                </Link>
                <Link to="/messages" className="nav_link">
                  <i className="bx bx-message-square-detail nav_icon"></i>
                  <span className="nav_name">Messages</span>
                </Link>
                <Link to="/bookmark" className="nav_link">
                  <i className="bx bx-bookmark nav_icon"></i>
                  <span className="nav_name">Bookmark</span>
                </Link>
                <Link to="/files" className="nav_link">
                  <i className="bx bx-folder nav_icon"></i>
                  <span className="nav_name">Files</span>
                </Link>
                <Link to="/stats" className="nav_link">
                  <i className="bx bx-bar-chart-alt-2 nav_icon"></i>
                  <span className="nav_name">Stats</span>
                </Link>
              </div>
            </div>
            <Link to="/signout" className="nav_link">
              <i className="bx bx-log-out nav_icon"></i>
              <span className="nav_name">SignOut</span>
            </Link>
          </nav>
        </div>
    </>
  );
}

export default Navbar;
