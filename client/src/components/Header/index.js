import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// display at top of page with nav bar that changes if user is logged in
// if logged out: display login and signup
// if logged in: display profile and logout
const Header = () => {
  // remove the token from localStorage
  // then refresh the application by taking the user back to the homepage
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  // user has to log in to gain access to user-based features in the nav bar
  return (
    <header className="mb-4 py-2 flex-row align-center">
      <Navbar expand="lg">
        <Container>
        <Navbar.Brand>
          <Link to="/">
          <h1 className="text-white">GitHub Lite<i class="fa-solid fa-hippo"></i></h1>
          </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
              {Auth.loggedIn() ? (
                <>
                <Nav.Link>
                  <Link to="/profile">
                    <div className="nav-link text-white">Profile</div>
                  </Link>
                  </Nav.Link>
                 
                  <Nav.Link>
                    <a href="/" onClick={logout} className="nav-link text-white logout">Logout</a>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link>
                    <Link to="/login">
                      <div className="nav-link text-white">Login</div>
                    </Link>
                  </Nav.Link>

                  <Nav.Link>
                    <Link to="/signup">
                      <div className="nav-link text-white">Signup</div>
                    </Link>
                  </Nav.Link>
                </>
              )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  );
};

export default Header;
