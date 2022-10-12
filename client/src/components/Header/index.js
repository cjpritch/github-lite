import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
  // remove the token from localStorage
  // then refresh the application by taking the user back to the homepage
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // user has to log in to gain access to user-based features in the nav bar
  return (
    <header>
      <nav className="navbar navbar-expand-lg border">
        <div className="container-fluid">
          <Link to="/">
            <h1 className="navbar-brand">GitHub Lite</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {Auth.loggedIn() ? (
                <>
                  <li className="nav-item">
                    <Link to="/profile">
                      <div className="nav-link">Profile</div>
                    </Link>
                  </li>
                  <li>
                    <a href="/" onClick={logout}>
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link to="/login">
                      <div className="nav-link">Login</div>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to="/signup">
                      <div className="nav-link">Signup</div>
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

// display at top of page with nav bar that changes if user is logged in
// if logged out: display login and signup
// if logged in: display profile and logout
