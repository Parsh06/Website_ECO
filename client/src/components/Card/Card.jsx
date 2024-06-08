import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Card.module.css';

function Card({ id, imageUrl, title, description }) {
  return (
    <div className={styles.card}>
      <img
        src={imageUrl}
        alt={title}
        className={styles.cardImage}
        onClick={() => window.open(imageUrl, '_blank')}
      />
      <div className={styles.cardBody}>
        <h2>{title}</h2>
        <h9>{description}</h9>
      </div>
      {/* <Link to={`/product/${id}`} className={styles.cardButton}>Shop Now</Link> */}
    </div>
  );
}

export default Card;