import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Error.module.css';

function Error() {
  return (
    <div className={styles.errorPage}>
      <div className={styles.errorContent}>
        <h1 className={styles.errorTitle}>404</h1>
        <p className={styles.errorMessage}>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/">
          <button className={`${styles.homeButton} ${styles.blueButton}`}>Home</button>
        </Link>
      </div>
    </div>
  );
}

export default Error;
