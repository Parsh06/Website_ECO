import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/Card/Card';
import styles from './Shop.module.css';
import Filter from '../../components/Filter/Filter';

function Shop() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/api/products')
      .then(response => {
        setProducts(response.data.items);
      })
      .catch(error => {
        console.error('Error fetching the products:', error);
      });
  }, []);

  const handleAddFilter = (newFilters) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const handleRemoveFilter = (filterKey) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      delete newFilters[filterKey];
      return newFilters;
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const applyFilters = (products) => {
    return products.filter(product => {
      return Object.keys(filters).every(key => {
        if (key === 'price') {
          const priceRange = filters[key].match(/\d+/g).map(Number);
          const productPrice = parseFloat(product.price);
          return productPrice >= priceRange[0] && (priceRange[1] ? productPrice <= priceRange[1] : true);
        }
        return product[key] === filters[key];
      });
    });
  };

  const visibleProducts = applyFilters(products);

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
              {Object.entries(filters).map(([key, value], index) => (
                <button key={index} className={`btn btn-light ${styles.filterBadge}`}>
                  {`${key}: ${value}`} <span onClick={() => handleRemoveFilter(key)}>&times;</span>
                </button>
              ))}
            </div>
          </div>
          {showFilters && <Filter products={products} addFilter={handleAddFilter} onApplyFilters={() => setShowFilters(false)} />}
          <main>
            {visibleProducts.length === 0 ? (
              <div className="text-center">No products found</div>
            ) : (
              <div className={styles.cardGrid}>
                {visibleProducts.map((product) => (
                  <Card
                    key={product.id}
                    imageUrl={product.imageUrl}
                    title={product.title}
                    description={product.description}
                    price={product.price}
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
