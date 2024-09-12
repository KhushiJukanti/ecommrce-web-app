import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    // Fetch cart items from the backend (JSON Server)
    axios.get('http://localhost:5000/cart')
      .then((response) => setCart(response.data))
      .catch((error) => console.error('Error fetching cart:', error));
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1

    // Update item quantity in the backend
    axios.patch(`http://localhost:5000/cart/${id}`, { quantity: newQuantity })
      .then((response) => {
        setCart(cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)));
      })
      .catch((error) => console.error('Error updating quantity:', error));
  };

  const removeFromCart = (id) => {
    // Remove item from the backend
    axios.delete(`http://localhost:5000/cart/${id}`)
      .then(() => {
        setCart(cart.filter((item) => item.id !== id));
      })
      .catch((error) => console.error('Error removing item from cart:', error));
  };

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>
                Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  min="1"
                />
              </p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
          <button onClick={() => window.location.href = '/checkout'}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
