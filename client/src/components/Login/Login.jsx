// Login.jsx
import React from 'react';
import styles from './Login.module.css';

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Redirect to Home page
    console.log('Form submitted'); // For testing purposes, you can replace this with the redirection logic
    // Redirect to Home page using Link component
    window.location.href = "/Home";
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" className={styles.input} />
        </div>
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  );
}

export default Login;
