import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './Product.module.css';

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/api/products')
      .then(response => {
        const products = response.data.items;
        const foundProduct = products.find(p => p.id === parseInt(productId));
        setProduct(foundProduct);
        setLoading(false);
        if (foundProduct) {
          setSelectedColor(foundProduct.colors[0]);
          setSelectedMaterial(foundProduct.materials[0]);
          setSelectedCategory(foundProduct.products[0]);
        }
      })
      .catch(error => {
        console.error('Error fetching the product data:', error);
        setLoading(false);
      });
  }, [productId]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleMaterialChange = (material) => {
    setSelectedMaterial(material);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.imageUrls.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.imageUrls.length) % product.imageUrls.length);
  };

  const handleAddToCart = () => {
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
    }, 2000); // Hide confirmation after 2 seconds
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      {showConfirmation && (
        <div className={styles.confirmationOverlay}>
          <div className={styles.confirmationBox}>
            <p>Done</p>
            
          </div>
        </div>
      )}
      <div className={`${styles.headPage} ${showConfirmation ? styles.hidden : ''}`}>
        <header className={`bg-light py-3 mb-4 ${styles.head}`}>
          <div className="container1">
            <h1 className="text-center">Product Details</h1>
          </div>
        </header>
        <div className={styles.productPage}>
          <div className={styles.imagesGrid}>
            <button onClick={handlePreviousImage} className={styles.imageNavButton}>Previous</button>
            <div className={styles.imageContainer}>
              <img src={product.imageUrls[currentImageIndex]} alt={product.title} className={styles.productImage} />
            </div>
            <button onClick={handleNextImage} className={styles.imageNavButton}>Next</button>
          </div>
          <div className={styles.productDetails}>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p className={styles.productPrice}>${product.price}</p>
            <div className={styles.productDetail}>
              <strong>Colors:</strong>
              <div className={styles.optionsRow}>
                {product.colors.map(color => (
                  <label key={color} className={styles.colorOption}>
                    <input 
                      type="checkbox" 
                      value={color} 
                      checked={selectedColor === color} 
                      onChange={() => handleColorChange(color)} 
                    />
                    {color}
                  </label>
                ))}
              </div>
            </div>
            <div className={styles.productDetail}>
              <strong>Materials:</strong>
              <div className={styles.optionsRow}>
                {product.materials.map(material => (
                  <label key={material} className={styles.colorOption}>
                    <input 
                      type="checkbox" 
                      value={material} 
                      checked={selectedMaterial === material} 
                      onChange={() => handleMaterialChange(material)} 
                    />
                    {material}
                  </label>
                ))}
              </div>
            </div>
            <div className={styles.productDetail}>
              <strong>Categories:</strong>
              <div className={styles.optionsRow}>
                {product.products.map(category => (
                  <label key={category} className={styles.colorOption}>
                    <input 
                      type="checkbox" 
                      value={category} 
                      checked={selectedCategory === category} 
                      onChange={() => handleCategoryChange(category)} 
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>
            <button className={styles.addToCartButton} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
