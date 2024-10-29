import React, { useState } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar({ cart }) {
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    setShowLogin(!showLogin);
  };

  const handleRedirect = (path) => {
    setShowLogin(false); // Close dropdown after navigating
    navigate(path);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light fixed-top ${styles.navbar}`}>
      <div className="container-fluid">
        <a className={`navbar-brand ${styles.navbarBrand}`} href="/home">FashionHub</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/shop">Shop</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
              </li>
            </ul>
            <div className="d-flex">
              <Link to="/cart" className={`btn btn-primary me-3 ${styles.cartButton}`} type="button">
                <FaShoppingCart className={styles.cartIcon} />
                <span className={styles.cartCount}>{cartItemCount}</span>
              </Link>
              <div className={`dropdown ${styles.profileDropdown}`}>
                <button
                  className={`btn btn-primary ${styles.profileButton}`}
                  type="button"
                  onClick={handleLoginClick}
                  aria-expanded={showLogin}
                >
                  <FaUser className={styles.profileIcon} />
                </button>
                <div
                  className={`dropdown-menu ${styles.loginDropdown} ${showLogin ? 'show' : ''}`}
                  aria-labelledby="navbarDropdown"
                >
                  <button className="dropdown-item" type="button" onClick={() => handleRedirect('/login')}>
                    Login
                  </button>
                  <button className="dropdown-item" type="button" onClick={() => handleRedirect('/Signup')}>
                    Signup
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
