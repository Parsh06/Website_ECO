import React, { useState } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import styles from './Navbar.module.css';

function Navbar() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(!showLogin);
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light fixed-top ${styles.navbar}`}>
      <div className="container-fluid">
        <a className={`navbar-brand ${styles.navbarBrand}`} href="/Home">FashionHub</a>
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
                <a className="nav-link active" aria-current="page" href="/Home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Shop">Shop</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Contact">Contact</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Men</a></li>
                  <li><a className="dropdown-item" href="#">Women</a></li>
                  <li><a className="dropdown-item" href="#">Kids</a></li>
                </ul>
              </li>
            </ul>
            <div className="d-flex">
              <button className={`btn btn-primary me-3 ${styles.cartButton}`} type="button">
                <FaShoppingCart className={styles.cartIcon} />
                <span className={styles.cartCount}>0</span>
              </button>
              <div className={`dropdown ${styles.profileDropdown}`}>
                <button className={`btn btn-primary ${styles.profileButton}`} type="button" onClick={handleLoginClick} data-bs-toggle="dropdown" aria-expanded={showLogin}>
                  <FaUser className={styles.profileIcon} />
                </button>
                {showLogin ? (
                  <div className={`dropdown-menu ${styles.loginDropdown}`} aria-labelledby="navbarDropdown">
                    <button className="dropdown-item" type="button" onClick={() => console.log('Login')}>Login</button>
                    <button className="dropdown-item" type="button" onClick={() => console.log('Signup')}>Signup</button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
