import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [allProducts, setAllProducts] = useState([]); // Store all products
  const [filteredProducts, setFilteredProducts] = useState([]); // Store filtered products

  useEffect(() => {
    // Fetch product data from the API
    axios.get('http://localhost:5000/products')
      .then(response => {
        setAllProducts(response.data);
        setFilteredProducts(response.data); // Initialize filteredProducts
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleLogout = () => {
    logout(); // Clear user context
    navigate('/'); // Navigate to the login page
  };

  const addToCart = (product) => {
    axios.post('http://localhost:5000/cart', { ...product, quantity: 1 })
      .then(() => alert(`${product.name} added to cart!`))
      .catch((error) => console.error('Error adding to cart:', error));
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProducts(allProducts); // Reset to original products
    } else {
      const lowercasedTerm = searchTerm.toLowerCase();
      const filtered = allProducts.filter(product =>
        product.name.toLowerCase().includes(lowercasedTerm) ||
        product.category.toLowerCase().includes(lowercasedTerm) ||
        product.price.toString().includes(lowercasedTerm)
      );
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="container mt-3">
      <header className="mb-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h1 className="display-4">Welcome to Our E-commerce Website</h1>
        </div>
        {user ? (
          <p className="lead text-muted">Hello, {user.username}!</p>
        ) : (
          <p className="lead text-muted">Please login to enjoy shopping!</p>
        )}
      </header>
      <main>
        <form className="d-flex mb-3" role="search" onSubmit={(e) => e.preventDefault()}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by name, category, or price"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>
        <h2 className="mb-3">Product List</h2>
        <div className="row">
          <ProductList addToCart={addToCart} products={filteredProducts} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
