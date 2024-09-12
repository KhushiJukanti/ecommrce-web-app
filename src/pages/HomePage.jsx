import React, { useContext } from 'react';
import ProductList from '../components/ProductList';
import { AuthContext } from '../context/AuthContext';

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);

  const addToCart = (product) => {
    // Logic to add product to cart goes here (e.g., make API call to update cart)
    console.log(`Added to cart: ${product.name}`);
  };

  return (
    <div>
      <header>
        <h1>Welcome to Our E-commerce Website</h1>
        {user ? (
          <div>
            <p>Hello, {user.username}!</p>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <p>Please login to enjoy shopping!</p>
        )}
      </header>
      
      <main>
        <h2>Product List</h2>
        <ProductList addToCart={addToCart} />
      </main>
    </div>
  );
};

export default HomePage;
