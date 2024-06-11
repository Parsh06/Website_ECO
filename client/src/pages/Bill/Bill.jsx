import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './Bill.module.css';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';

function Bill({ cart = [] }) {
  const [coupon, setCoupon] = useState('');
  const [address, setAddress] = useState('');
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);
  const [codFee, setCodFee] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');

  const coupons = [
    { code: 'SAVE10', discount: 10 },
    { code: 'SAVE20', discount: 20 },
  ];

  useEffect(() => {
    calculateTotal();
  }, [cart, coupon, codFee]);

  const calculateTotal = () => {
    let subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let discountAmount = 0;
    if (coupon) {
      const appliedCoupon = coupons.find(c => c.code === coupon);
      if (appliedCoupon) {
        discountAmount = (appliedCoupon.discount / 100) * subtotal;
      }
    }
    const deliveryCharges = 80;
    const platformFee = 10;
    const gst = (subtotal - discountAmount + deliveryCharges + platformFee) * 0.05;
    const cgst = (subtotal - discountAmount + deliveryCharges + platformFee) * 0.025;
    const sgst = (subtotal - discountAmount + deliveryCharges + platformFee) * 0.025;

    const finalTotal = subtotal - discountAmount + deliveryCharges + platformFee + gst + cgst + sgst + codFee;
    setDiscount(discountAmount);
    setTotal(finalTotal);
  };

  const handleApplyCoupon = () => {
    calculateTotal();
  };

  const handlePaymentMethodChange = (e) => {
    const method = e.target.value;
    setPaymentMethod(method);
    if (method === 'COD') {
      setCodFee(10);
    } else {
      setCodFee(0);
    }
    calculateTotal();
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleAutoFillAddress = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetch(`https://geocode.xyz/${latitude},${longitude}?geoit=json`)
          .then(res => res.json())
          .then(data => {
            setAddress(`${data.staddress}, ${data.city}, ${data.state}, ${data.postal}`);
          });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <Container className={styles.billPage}>
      <h1>Billing Details</h1>
      <Row className={styles.billSection}>
        <Col>
          <h2>Items</h2>
          {cart.map((item, index) => (
            <div key={index} className={styles.billItem}>
              <p>{item.title} - {item.quantity} x ${item.price}</p>
            </div>
          ))}
        </Col>
      </Row>

      <Row className={styles.billSection}>
        <Col>
          <h2>Apply Coupon</h2>
          <Form.Select onChange={(e) => setCoupon(e.target.value)}>
            <option value="">Select Coupon</option>
            {coupons.map((c, index) => (
              <option key={index} value={c.code}>{c.code}</option>
            ))}
          </Form.Select>
          <Button onClick={handleApplyCoupon} className={styles.applyButton}>Apply</Button>
        </Col>
      </Row>

      <Row className={styles.billSection}>
        <Col>
          <h2>Address</h2>
          <Form.Control
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={handleAddressChange}
          />
          <Button onClick={handleAutoFillAddress} className={styles.autoFillButton}>Auto-Fill Address</Button>
        </Col>
      </Row>

      <Row className={styles.billSection}>
        <Col>
          <h2>Payment Method</h2>
          <Form.Select onChange={handlePaymentMethodChange}>
            <option value="">Select Payment Method</option>
            <option value="COD">Cash on Delivery</option>
            <option value="NetBanking">Net Banking</option>
            <option value="UPI">UPI</option>
            <option value="Card">Credit/Debit Card</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className={styles.billSection}>
        <Col>
          <h2>Summary</h2>
          <p>Subtotal: ${cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}</p>
          <p>Discount: -${discount.toFixed(2)}</p>
          <p>Delivery Charges: $80</p>
          <p>Platform Fee: $10</p>
          <p>GST: ${(total * 0.05).toFixed(2)}</p>
          <p>CGST: ${(total * 0.025).toFixed(2)}</p>
          <p>SGST: ${(total * 0.025).toFixed(2)}</p>
          <p>COD Convenience Fee: ${codFee}</p>
          <h3>Total: ${total.toFixed(2)}</h3>
          <Button className={styles.paymentButton}>Proceed to Payment</Button>
        </Col>
      </Row>
    </Container>
  );
}

Bill.propTypes = {
  cart: PropTypes.array
};

Bill.defaultProps = {
  cart: []
};

export default Bill;
