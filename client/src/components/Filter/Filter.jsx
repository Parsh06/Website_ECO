import React, { useState, useEffect } from 'react';
import styles from './Filter.module.css';

function Filter({ products, addFilter, onApplyFilters }) {
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [material, setMaterial] = useState('');
  const [product, setProduct] = useState('');

  const uniqueValues = (key) => {
    return [...new Set(products.map(product => product[key]))].filter(value => value);
  };

  const handleFilterChange = (e, setFilter) => {
    setFilter(e.target.value);
  };

  const handleAddFilter = () => {
    const newFilter = {};
    if (color) newFilter.color = color;
    if (price) newFilter.price = price;
    if (material) newFilter.material = material;
    if (product) newFilter.product = product;
    addFilter(newFilter);
    setColor('');
    setPrice('');
    setMaterial('');
    setProduct('');
    onApplyFilters(); // Call the callback to hide filters
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterSection}>
        <h4>Color</h4>
        <select value={color} onChange={(e) => handleFilterChange(e, setColor)}>
          <option value="">Select Color</option>
          {uniqueValues('color').map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
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
      </div>
      <div className={styles.filterSection}>
        <h4>Material</h4>
        <select value={material} onChange={(e) => handleFilterChange(e, setMaterial)}>
          <option value="">Select Material</option>
          {uniqueValues('material').map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>
      <div className={styles.filterSection}>
        <h4>Product</h4>
        <select value={product} onChange={(e) => handleFilterChange(e, setProduct)}>
          <option value="">Select Product</option>
          {uniqueValues('product').map(value => (
            <option key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>
      <button className="btn btn-secondary" onClick={handleAddFilter}>Apply Filters</button>
    </div>
  );
}

export default Filter;
