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
      <div>
        <Link to="/">
          <h1>GitHub Lite</h1>
        </Link>

        <nav>
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Profile</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
