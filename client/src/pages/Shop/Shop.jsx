import React, { useState } from 'react';
import Card from '../../components/Card/Card';
import styles from './Shop.module.css';
import Filter from '../../components/Filter/Filter';

function Shop() {
  const [filters, setFilters] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  const handleAddFilter = (filter) => {
    setFilters([...filters, filter]);
  };

  const handleRemoveFilter = (filterToRemove) => {
    setFilters(filters.filter(filter => filter !== filterToRemove));
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const products = [
    { id: 1, title: 'Product 1', description: 'Description for product 1', imageUrl: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Product 2', description: 'Description for product 2', imageUrl: 'https://via.placeholder.com/300' },
    { id: 1, title: 'Product 1', description: 'Description for product 1', imageUrl: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Product 2', description: 'Description for product 2', imageUrl: 'https://via.placeholder.com/300' },
    { id: 1, title: 'Product 1', description: 'Description for product 1', imageUrl: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Product 2', description: 'Description for product 2', imageUrl: 'https://via.placeholder.com/300' },
    { id: 1, title: 'Product 1', description: 'Description for product 1', imageUrl: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Product 2', description: 'Description for product 2', imageUrl: 'https://via.placeholder.com/300' },
    { id: 2, title: 'Product 2', description: 'Description for product 2', imageUrl: 'https://via.placeholder.com/300' },
    // Add more products as needed
  ];

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
              {filters.map((filter, index) => (
                <button key={index} className={`btn btn-light ${styles.filterBadge}`}>
                  {filter} <span onClick={() => handleRemoveFilter(filter)}>&times;</span>
                </button>
              ))}
            </div>
          </div>
          {showFilters && <Filter addFilter={handleAddFilter} />}
          <main>
            <div className={styles.cardGrid}>
              {products.map(product => (
                <Card
                  key={product.id}
                  id={product.id}
                  imageUrl={product.imageUrl}
                 
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Shop;
