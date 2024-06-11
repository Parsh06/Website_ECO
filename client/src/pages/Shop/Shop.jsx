import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/Card/Card';
import styles from './Shop.module.css';
import Filter from '../../components/Filter/Filter';

function Shop() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/products')
      .then(response => {
        setProducts(response.data.items);
        setFilteredProducts(response.data.items); // Initialize filtered products with all products
      })
      .catch(error => {
        console.error('Error fetching the products:', error);
      });
  }, []);

  const applyFilters = () => {
    let filtered = [...products];
    if (filters.colors && filters.colors.length) {
      filtered = filtered.filter(product => filters.colors.includes(product.colors));
    }
    if (filters.materials && filters.materials.length) {
      filtered = filtered.filter(product => filters.materials.includes(product.materials));
    }
    if (filters.categories && filters.categories.length) {
      filtered = filtered.filter(product => filters.categories.includes(product.categories));
    }
    if (filters.price && filters.price.length) {
      const [minPrice, maxPrice] = filters.price;
      filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice);
    }
    setFilteredProducts(filtered);
  };

  const handleAddFilter = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const handleRemoveFilter = (filterKey, filterValue) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      if (Array.isArray(newFilters[filterKey])) {
        newFilters[filterKey] = newFilters[filterKey].filter(value => value !== filterValue);
        if (newFilters[filterKey].length === 0) {
          delete newFilters[filterKey];
        }
      } else {
        delete newFilters[filterKey];
      }
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  useEffect(() => {
    applyFilters();
  }, [filters, products]); // Apply filters whenever filters or products change

  return (
    <>
      <div className={styles.shopPage}>
        <header className={`bg-light py-3 mb-4 ${styles.header}`}>
          <div className="container">
            <h1 className="text-center">Shop With FashionHub</h1>
          </div>
        </header>
        <div className="container">
          <div className="d-flex justify-content-between mb-4">
            <button className={`btn btn-primary ${styles.filterButton}`} onClick={toggleFilters}>
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
            <div className={styles.selectedFilters}>
              {Object.entries(filters).flatMap(([key, value], index) => (
                Array.isArray(value) ? value.map((val, i) => (
                  <button key={`${index}-${i}`} className={`btn btn-light ${styles.filterBadge}`}>
                    {`${key}: ${val}`} <span onClick={() => handleRemoveFilter(key, val)}>&times;</span>
                  </button>
                )) : (
                  <button key={index} className={`btn btn-light ${styles.filterBadge}`}>
                    {`${key}: ${value}`} <span onClick={() => handleRemoveFilter(key)}>&times;</span>
                  </button>
                )
              ))}
            </div>
          </div>
          {showFilters && 
            <Filter 
              products={products} 
              addFilter={handleAddFilter} 
              clearFilters={clearFilters} 
              onApplyFilters={() => setShowFilters(false)} 
            />}
          <main>
            {filteredProducts.length === 0 ? (
              <div className="text-center">No products found</div>
            ) : (
              <div className={styles.cardGrid}>
                {filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    id={product.id}
                    imageUrl={product.imageUrls[0]} // Use the first image from the array
                    title={product.title}
                    description={product.description}
                    price={product.price}
                    stocked={product.stocked} // Pass stocked prop
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default Shop;
