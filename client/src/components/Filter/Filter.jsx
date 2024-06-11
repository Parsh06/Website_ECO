import React, { useState, useEffect } from 'react';
import styles from './Filter.module.css';

function Filter({ products, addFilter, clearFilters, onApplyFilters }) {
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [price, setPrice] = useState('');

  useEffect(() => {
    setPrice('');
  }, [products]);

  const uniqueValues = (key) => {
    return [...new Set(products.flatMap(product => product[key]))].filter(value => value);
  };

  const handleCheckboxChange = (e, setFilter, selectedValues) => {
    const value = e.target.value;
    setFilter(selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value]);
  };

  const handleFilterChange = (e, setFilter) => {
    setFilter(e.target.value);
  };

  const handleAddFilter = () => {
    const newFilter = {};
    if (selectedColors.length) newFilter.colors = selectedColors;
    if (selectedMaterials.length) newFilter.materials = selectedMaterials;
    if (selectedCategories.length) newFilter.categories = selectedCategories;
    if (price) {
      const [minPrice, maxPrice] = price.split(' - ');
      newFilter.price = [parseInt(minPrice.replace('$', '')), parseInt(maxPrice.replace('$', ''))];
    }

    addFilter(newFilter);
    onApplyFilters(); // Notify parent component that filters have been applied
  };

  const handleClearFilters = () => {
    setSelectedColors([]);
    setSelectedMaterials([]);
    setSelectedCategories([]);
    setPrice('');
    clearFilters(); // Notify parent component that filters have been cleared
  };

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterSection}>
        <h4>Color</h4>
        <div className={styles.checkboxGrid}>
          {uniqueValues('colors').map(value => (
            <label key={value} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={value}
                checked={selectedColors.includes(value)}
                onChange={(e) => handleCheckboxChange(e, setSelectedColors, selectedColors)}
              />
              {value}
            </label>
          ))}
        </div>
      </div>
      <div className={styles.filterSection}>
        <h4>Material</h4>
        <div className={styles.checkboxGrid}>
          {uniqueValues('materials').map(value => (
            <label key={value} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={value}
                checked={selectedMaterials.includes(value)}
                onChange={(e) => handleCheckboxChange(e, setSelectedMaterials, selectedMaterials)}
              />
              {value}
            </label>
          ))}
        </div>
      </div>
      <div className={styles.filterSection}>
        <h4>Category</h4>
        <div className={styles.checkboxGrid}>
          {uniqueValues('categories').map(value => (
            <label key={value} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                value={value}
                checked={selectedCategories.includes(value)}
                onChange={(e) => handleCheckboxChange(e, setSelectedCategories, selectedCategories)}
              />
              {value}
            </label>
          ))}
        </div>
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
      <div className={styles.filterButtons}>
        <button className="btn btn-primary" onClick={handleAddFilter}>Apply Filters</button>
        <button className="btn btn-secondary" onClick={handleClearFilters}>Clear Filters</button>
      </div>
    </div>
  );
}

export default Filter;
