import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

function Card({ id, imageUrl, title, description, price }) {
  return (
    <div className={styles.card}>
      <Link to={`/product/${id}`} className={styles.cardLink}>
        <div className={styles.cardImageContainer}>
          <img
            src={imageUrl}
            alt={title}
            className={styles.cardImage}
          />
          <div className={styles.moreInfo}>More Info</div>
        </div>
        <div className={styles.cardBody}>
          <h2 className={styles.cardTitle}>{title}</h2>
          <p className={styles.cardDescription}>{description}</p>
          <p className={styles.cardPrice}>${price}</p>
        </div>
      </Link>
    </div>
  );
}

export default Card;
