import React from 'react';
import styles from './Card.module.css';

function Card({ imageUrl, title }) {
  const handleClick = () => {
    window.location.href = '/shopping-cart'; // Replace with the actual URL of your shopping cart page
  };

  return (
    <div className={styles.card}>
      <img src={imageUrl} className={styles.cardImgTop} alt={title} />
      <div className={styles.cardBody}>
        <a href="/shopping-cart" onClick={handleClick} className={styles.cardButton}>
          Shop Now
        </a>
      </div>
    </div>
  );
}

export default Card;
