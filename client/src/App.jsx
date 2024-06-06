import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './App.css';
import Home from './pages/Home/Home';
import Shop from './pages/Shop/Shop';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Product from './pages/Product/Product';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/Product/:productId" component={Product} />
        </Routes>
       
      </Router>
    </div>
  );
}

export default App;
