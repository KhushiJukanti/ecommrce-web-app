import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: 0, category: '', imageUrl: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios.get('http://localhost:5000/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const validateFormFields = () => {
    let errors = {};
    if (!newProduct.name.trim()) {
      errors.name = "Product name is required";
    }
    if (newProduct.price <= 0) {
      errors.price = "Price must be greater than zero";
    }
    if (!newProduct.category.trim()) {
      errors.category = "Category is required";
    }
    if (!newProduct.imageUrl.trim()) {
      errors.imageUrl = "Image URL is required";
    }
    return errors;
  };

  const addProduct = () => {
    const validationErrors = validateFormFields();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios.post('http://localhost:5000/products', newProduct)
      .then(response => {
        setProducts([...products, response.data]);
        setNewProduct({ name: '', price: 0, category: '', imageUrl: '' }); // Reset form fields
        setErrors({}); // Clear errors
      })
      .catch(error => console.error('Error adding product:', error));
  };

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:5000/products/${id}`)
      .then(() => setProducts(products.filter(product => product.id !== id)))
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div className='container mt-5'>
      <h2 className='text-center mb-4'>Admin Page - Product Management</h2>
      <div className='card p-4 mb-4'>
        <h3>Add New Product</h3>
        <div className='mb-3'>
          <input
            type='text'
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            placeholder='Product Name'
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
        </div>
        <div className='mb-3'>
          <input
            type='number'
            className={`form-control ${errors.price ? 'is-invalid' : ''}`}
            placeholder='Price'
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
          />
          {errors.price && <div className='invalid-feedback'>{errors.price}</div>}
        </div>
        <div className='mb-3'>
          <input
            type='text'
            className={`form-control ${errors.category ? 'is-invalid' : ''}`}
            placeholder='Category'
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
          />
          {errors.category && <div className='invalid-feedback'>{errors.category}</div>}
        </div>
        <div className='mb-3'>
          <input
            type='text'
            className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
            placeholder='Image URL'
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
          />
          {errors.imageUrl && <div className='invalid-feedback'>{errors.imageUrl}</div>}
        </div>
        <button className='btn btn-primary' onClick={addProduct}>Add Product</button>
      </div>

      <h3 className='mb-4'>Existing Products</h3>
      <div className='row'>
        {products.map(product => (
          <div className='col-md-3 mb-4' key={product.id}>
            <div className='card'>
              <img src={product.imageUrl} className='card-img-top' alt={product.name} style={{ height: '200px', objectFit: 'cover' }} />
              <div className='card-body'>
                <h5 className='card-title'>{product.name}</h5>
                <p className='card-text'>Price: ${product.price}</p>
                <p className='card-text'>Category: {product.category}</p>
                <button className='btn btn-danger' onClick={() => deleteProduct(product.id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
