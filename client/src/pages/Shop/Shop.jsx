import React from 'react';
import Card from '../../components/Card/Card';
import styles from './Shop.module.css';


function Shop() {
  return (
    <>
      <div className={styles.shopPage}>
        <header className={`bg-light py-3 mb-4 ${styles.header}`}>
          <div className="container">
            <h1 className="text-center">Shop With FashionHub</h1>
          </div>
        </header>
        <main className="container">
          <div className={styles.cardGrid}>
            {Array.from({ length: 9 }).map((_, index) => (
              <Card
                key={index}
                imageUrl="https://via.placeholder.com/300"
                title={`Product ${index + 1}`}
                description={`Description for product ${index + 1}`}
              />
            ))}
          </div>
        </main>
      </div>
    
    </>
  );
}

export default Shop;
