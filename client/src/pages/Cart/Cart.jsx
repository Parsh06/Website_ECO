import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Cart.module.css';
import Bill from '../Bill/Bill';

function Cart({ cart, setCart }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure every item in the cart has at least a quantity of 1 when the component is first loaded
    const updatedCart = cart.map(item => ({
      ...item,
      quantity: item.quantity ? item.quantity : 1
    }));
    setCart(updatedCart);
  }, [cart, setCart]);

  const handleRemoveFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  const handleQuantityChange = (index, quantity) => {
    const newCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(newCart);
  };

  const handleVisitItem = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleBuyCart = () => {
    navigate('/Bill');
  };

  return (
    <div className={styles.cartPage}>
      <header className={`bg-light py-3 mb-4 ${styles.header}`}>
        <div className="container text-center">
          <h1>Your Cart</h1>
        </div>
      </header>
      <div className="container">
        {cart.length === 0 ? (
          <>
            <div className="text-center">Your cart is empty.</div>
            <div className="text-center mt-4">
              <button className={styles.shopButton} onClick={() => navigate('/shop')}>Shop Now</button>
            </div>
          </>
        ) : (
          cart.map((item, index) => (
            <div key={index} className={styles.cartItem}>
              <img src={item.imageUrls[0]} alt={item.title} className={styles.cartItemImage} />
              <div className={styles.cartItemDetails}>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <p>Color: {item.selectedColor}</p>
                <p>Material: {item.selectedMaterial}</p>
                <p>Category: {item.selectedCategory}</p>
                <p className={styles.cartItemPrice}>${item.price}</p>
                <div className={styles.cartItemActions}>
                  <button onClick={() => handleQuantityChange(index, item.quantity - 1)}>-</button>
                  <span className={styles.quantityBox}>{item.quantity}</span>
                  <button onClick={() => handleQuantityChange(index, item.quantity + 1)}>+</button>
                  <button onClick={() => handleVisitItem(item.id)}>Visit Item</button>
                </div>
              </div>
              <button onClick={() => handleRemoveFromCart(index)} className={styles.removeButton}>X</button>
            </div>
          ))
        )}
        {cart.length > 0 && (
          <div className="text-center mt-4">
            <button className={styles.buyButton} onClick={handleBuyCart}>Buy Cart</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
