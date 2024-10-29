import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Footer from './components/Footer/Footer';
import Product from './pages/Product/Product';
import Contact from './pages/Contact/Contact';
import Error from './pages/Error/Error';
import Cart from './pages/Cart/Cart';  
import Admin from './pages/Admin/Admin';
import Bill from './pages/Bill/Bill';


function App() {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  return (
    <div className="App">
      <Router>
        <Navbar cart={cart}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/bill" element={<Bill />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
