import React, { useState } from 'react';
import styles from './Filter.module.css';

function Filter({ addFilter }) {
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [material, setMaterial] = useState('');
  const [product, setProduct] = useState('');

  const handleFilterChange = (e, setFilter) => {
    setFilter(e.target.value);
  };

  const handleAddFilter = (filter) => {
    if (filter) {
      addFilter(filter);
      setColor('');
      setPrice('');
      setMaterial('');
      setProduct('');
    }
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterSection}>
        <h4>Color</h4>
        <select value={color} onChange={(e) => handleFilterChange(e, setColor)}>
          <option value="">Select Color</option>
          <option value="Blue">Blue</option>
          <option value="Green">Green</option>
          <option value="Red">Red</option>
          <option value="Orange">Orange</option>
        </select>
        <button className="btn btn-secondary" onClick={() => handleAddFilter(color)}>Add</button>
      </div>
      <div className={styles.filterSection}>
        <h4>Price</h4>
        <select value={price} onChange={(e) => handleFilterChange(e, setPrice)}>
          <option value="">Select Price</option>
          <option value="$0 - $50">$0 - $50</option>
          <option value="$50 - $100">$50 - $100</option>
          <option value="$100 - $200">$100 - $200</option>
          <option value="$200+">$200+</option>
        </select>
        <button className="btn btn-secondary" onClick={() => handleAddFilter(price)}>Add</button>
      </div>
      <div className={styles.filterSection}>
        <h4>Material</h4>
        <select value={material} onChange={(e) => handleFilterChange(e, setMaterial)}>
          <option value="">Select Material</option>
          <option value="Cotton">Cotton</option>
          <option value="Wool">Wool</option>
          <option value="Polyester">Polyester</option>
          <option value="Silk">Silk</option>
        </select>
        <button className="btn btn-secondary" onClick={() => handleAddFilter(material)}>Add</button>
      </div>
      <div className={styles.filterSection}>
        <h4>Product</h4>
        <select value={product} onChange={(e) => handleFilterChange(e, setProduct)}>
          <option value="">Select Product</option>
          <option value="Shirts">Shirts</option>
          <option value="Pants">Pants</option>
          <option value="Dresses">Dresses</option>
          <option value="Shoes">Shoes</option>
        </select>
        <button className="btn btn-secondary" onClick={() => handleAddFilter(product)}>Add</button>
      </div>
    </div>
  );
}

export default Filter;
