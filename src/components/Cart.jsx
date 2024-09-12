import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/cart').then((response) => setCart(response.data));
  }, []);

  const updateCart = (id, quantity) => {
    axios.patch(`http://localhost:5000/cart/${id}`, { quantity }).then((response) => {
      setCart(cart.map((item) => (item.id === id ? response.data : item)));
    });
  };

  const removeFromCart = (id) => {
    axios.delete(`http://localhost:5000/cart/${id}`).then(() => {
      setCart(cart.filter((item) => item.id !== id));
    });
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>
          <button onClick={() => updateCart(item.id, item.quantity + 1)}>+</button>
          <button onClick={() => updateCart(item.id, item.quantity - 1)}>-</button>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}
      <h3>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
    </div>
  );
};

export default Cart;
