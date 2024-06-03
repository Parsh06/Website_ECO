import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h4>FashionHub</h4>
            <p>Discover the latest trends in fashion. Shop with us for the best deals and quality products.</p>
          </div>
          <div className="col-md-3">
            <h4>Contact Us</h4>
            <p>Address: 123 Fashion St, New York, NY 10001</p>
            <p>Phone: +1 234 567 890</p>
            <p>Email: info@fashionhub.com</p>
          </div>
         
          <div className="col-md-5">
            <h4>Our Location</h4>
            <div className={styles.map}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3023.953536461692!2d-74.00601518459409!3d40.71277597933113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7d1c1d1c1c1d1d1c!2sFashionHub!5e0!3m2!1sen!2sus!4v1620831234567!5m2!1sen!2sus" 
                width="200%" 
                height="400" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy">
              </iframe>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <ul className={styles.socialLinks}>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <p className={styles.copyright}>© {new Date().getFullYear()} FashionHub. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
