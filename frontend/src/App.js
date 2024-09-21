
import React ,{ useEffect } from 'react';
import Signup from './sreenPages/Signup';
import Navbar from './components/Navbar';
import { Navbarcss } from './Navbar.css';

// import Login from './sreenPages/Login';

function App() {
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
    <div id="body-pd">
        <div className="header" id="header">
          <div className="header_toggle">
            <i className="bx bx-menu" id="header-toggle"></i>
          </div>
          <div className="header_img">
            <img src="https://i.imgur.com/hczKIze.jpg" alt="profile" />
          </div>
        </div>

        <div className="l-navbar" id="nav-bar">
          <nav className="nav">
            <div>
              <a href="#" className="nav_logo">
                <i className="bx bx-layer nav_logo-icon"></i>
                <span className="nav_logo-name">BBBootstrap</span>
              </a>
              <div className="nav_list">
                <a href="#" className="nav_link active">
                  <i className="bx bx-grid-alt nav_icon"></i>
                  <span className="nav_name">Dashboard</span>
                </a>
                <a href="#" className="nav_link">
                  <i className="bx bx-user nav_icon"></i>
                  <span className="nav_name">Users</span>
                </a>
                <a href="#" className="nav_link">
                  <i className="bx bx-message-square-detail nav_icon"></i>
                  <span className="nav_name">Messages</span>
                </a>
                <a href="#" className="nav_link">
                  <i className="bx bx-bookmark nav_icon"></i>
                  <span className="nav_name">Bookmark</span>
                </a>
                <a href="#" className="nav_link">
                  <i className="bx bx-folder nav_icon"></i>
                  <span className="nav_name">Files</span>
                </a>
                <a href="#" className="nav_link">
                  <i className="bx bx-bar-chart-alt-2 nav_icon"></i>
                  <span className="nav_name">Stats</span>
                </a>
              </div>
            </div>
            <a href="#" className="nav_link">
              <i className="bx bx-log-out nav_icon"></i>
              <span className="nav_name">SignOut</span>
            </a>
          </nav>
        </div>
        {/* <div className="height-100 bg-light">
        </div> */}
      </div>
    </>
    
  );
}

export default App;
