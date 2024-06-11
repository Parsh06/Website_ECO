import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Admin.module.css';

function Admin() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    title: '',
    description: '',
    price: 0,
    feature: false,
    stocked: false,
    colour: '',
    material: '',
    category: '',
    image: null
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/products');
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'image') {
      setNewProduct({
        ...newProduct,
        image: e.target.files[0],
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const addProduct = async () => {
    const formData = new FormData();
    for (const key in newProduct) {
      formData.append(key, newProduct[key]);
    }

    try {
      await axios.post('http://localhost:3001/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchProducts();
      setNewProduct({
        name: '',
        title: '',
        description: '',
        price: 0,
        feature: false,
        stocked: false,
        colour: '',
        material: '',
        category: '',
        image: null
      });
      setMessage('Product added successfully');
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage(`Error adding product: ${error.message}`);
    }
  };

  const updateProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`http://localhost:3001/api/products/${id}`, updatedProduct);
      fetchProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Admin Page</h1>
      <div className={styles.addItem}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProduct.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newProduct.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="colour"
          placeholder="Colour"
          value={newProduct.colour}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="material"
          placeholder="Material"
          value={newProduct.material}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={newProduct.category}
          onChange={handleInputChange}
        />
        <input
          type="file"
          name="image"
          onChange={handleInputChange}
        />
        <label>
          <input
            type="checkbox"
            name="feature"
            checked={newProduct.feature}
            onChange={handleInputChange}
          />
          Featured
        </label>
        <label>
          <input
            type="checkbox"
            name="stocked"
            checked={newProduct.stocked}
            onChange={handleInputChange}
          />
          Stocked
        </label>
        <button onClick={addProduct}>Add Product</button>
        {message && <p>{message}</p>}
      </div>
      <ul className={styles.itemList}>
        {Array.isArray(products) && products.map(product => (
          <li key={product.id}>
            <input
              type="text"
              value={product.name}
              onChange={(e) => updateProduct(product.id, { ...product, name: e.target.value })}
            />
            <input
              type="number"
              value={product.price}
              onChange={(e) => updateProduct(product.id, { ...product, price: e.target.value })}
            />
            <label>
              <input
                type="checkbox"
                checked={product.feature}
                onChange={(e) => updateProduct(product.id, { ...product, feature: e.target.checked })}
              />
              Featured
            </label>
            <label>
              <input
                type="checkbox"
                checked={product.stocked}
                onChange={(e) => updateProduct(product.id, { ...product, stocked: e.target.checked })}
              />
              Stocked
            </label>
            <button onClick={() => deleteProduct(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin;
