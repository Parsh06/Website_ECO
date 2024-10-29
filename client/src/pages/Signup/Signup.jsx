import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Signup.module.css';

function Signup() {
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();
    // Perform signup logic
    navigate('/login'); // Redirect to login page after signup
  };

  return (
    <div className={styles.signupContainer}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
