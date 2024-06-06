import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './Product.module.css';

const products = [
  { id: 1, title: 'Product 1', description: 'Description for product 1', images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300'], price: '$50' },
  { id: 2, title: 'Product 2', description: 'Description for product 2', images: ['https://via.placeholder.com/300', 'https://via.placeholder.com/300'], price: '$100' },
  // Add more products as needed
];

function Product() {
  const { productId } = useParams();
  const product = products.find(p => p.id === parseInt(productId));

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.productImages}>
        {product.images.map((image, index) => (
          <img key={index} src={image} alt={product.title} className={styles.productImage} />
        ))}
      </div>
      <div className={styles.productDetails}>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p className={styles.productPrice}>{product.price}</p>
      </div>
    </div>
  );
}

export default Product;
