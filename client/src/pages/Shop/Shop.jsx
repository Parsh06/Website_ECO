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
      </div>
    </>
  );
}

export default Shop;
