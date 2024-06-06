import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Contact.module.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    concern: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedback, setFeedback] = useState(0);
  const emojis = ['😡', '😟', '😐', '😊', '😁'];
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStarClick = (rating) => {
    setFeedback(rating);
    setSelectedEmoji(emojis[rating - 1]);
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    if (!formData.phone) errors.phone = 'Phone number is required';
    if (!formData.concern) errors.concern = 'Concern is required';
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setIsSubmitted(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.companyDetails}>
        <h2>Company Details</h2>
        <p><strong>Phone Number:</strong> (123) 456-7890</p>
        <p><strong>Email:</strong> contact@company.com</p>
        <p><strong>Location:</strong> 1234 Company Address, City, State, ZIP</p>
      </div>
      <div className={styles.contactPage}>
        <header className={styles.header}>
          <h1>Contact Us</h1>
        </header>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? styles.error : ''}
              />
              {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
            </div>
            <div className={styles.formGroup}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? styles.error : ''}
              />
              {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
            </div>
            <div className={styles.formGroup}>
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? styles.error : ''}
              />
              {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
            </div>
            <div className={styles.formGroup}>
              <label>What is your concern?</label>
              <textarea
                name="concern"
                value={formData.concern}
                onChange={handleChange}
                className={errors.concern ? styles.error : ''}
              />
              {errors.concern && <span className={styles.errorMessage}>{errors.concern}</span>}
            </div>
            <button type="submit" className={styles.submitButton}>Submit</button>
          </form>
        ) : (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Thank You for Contacting Us</h2>
              <p>We will get back to you shortly.</p>
              <div className={styles.formGroup}>
                <label>Feedback:</label>
                <div className={styles.stars}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`${styles.star} ${feedback >= star ? styles.selected : ''}`}
                      onClick={() => handleStarClick(star)}
                    >
                      ★
                    </span>
                  ))}
                  {selectedEmoji && <span className={styles.emoji}>{selectedEmoji}</span>}
                </div>
              </div>
              <Link to="/">
                <button className={`${styles.okButton} ${styles.blueButton}`}>OK</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contact;
