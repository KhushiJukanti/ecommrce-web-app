import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/cart').then((response) => setCart(response.data));
  }, []);

  const placeOrder = () => {
    axios.post('http://localhost:5000/orders', { cart }).then(() => {
      alert('Order placed successfully!');
      axios.delete('http://localhost:5000/cart').then(() => setCart([]));
    });
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
        </div>
      ))}
      <h3>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
