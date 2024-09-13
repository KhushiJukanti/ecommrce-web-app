import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Checkout = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/cart')
      .then(response => setCart(response.data))
      .catch(error => console.error('Error fetching cart:', error));
  }, []);

  const placeOrder = () => {
    if (cart.length === 0) {
      alert('Cart is empty!');
      return;
    }

    axios.post('http://localhost:5000/orders', { cart })
      .then(() => {
        alert('Order placed successfully!');
        
        // Delete each item in the cart one by one
        const deleteRequests = cart.map(item =>
          axios.delete(`http://localhost:5000/cart/${item.id}`)
        );

        Promise.all(deleteRequests)
          .then(() => setCart([]))  // Clear cart in state after all deletions
          .catch(error => console.error('Error clearing cart:', error));
      })
      .catch(error => console.error('Error placing order:', error));
  };

  return (
    <div className="container mt-5" style={{height:'85vh'}}>
      <h2>Checkout</h2>
      {cart.length > 0 ? (
        cart.map(item => (
          <div key={item.id} className="card mb-3">
            <div className="card-body">
              <h3 className="card-title">{item.name}</h3>
              <p className="card-text">Price: ${item.price}</p>
              <p className="card-text">Quantity: {item.quantity}</p>
            </div>
          </div>
        ))
      ) : (
        <p>Your cart is empty!</p>
      )}
      <h3>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
      <button className="btn btn-primary" onClick={placeOrder}>Place Order</button>
    </div>
  );
};

export default Checkout;
