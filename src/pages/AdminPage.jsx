import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', category: '', price: 0 });

  useEffect(() => {
    // Fetch products from the backend (JSON Server)
    axios.get('http://localhost:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleAddProduct = () => {
    // Add a new product to the backend (JSON Server)
    axios.post('http://localhost:5000/products', newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setNewProduct({ name: '', category: '', price: 0 });
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const handleDeleteProduct = (productId) => {
    // Delete a product from the backend (JSON Server)
    axios.delete(`http://localhost:5000/products/${productId}`)
      .then(() => {
        setProducts(products.filter(product => product.id !== productId));
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <div>
        <h3>Add New Product</h3>
        <input
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newProduct.category}
          onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <hr />
      <div>
        <h3>Manage Products</h3>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name} - ${product.price} ({product.category})
              <button onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
