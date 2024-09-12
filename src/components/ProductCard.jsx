import React from 'react';

const ProductCard = ({ product, addToCart }) => (
  <div className="product-card">
    <h3>{product.name}</h3>
    <p>Category: {product.category}</p>
    <p>Price: ${product.price}</p>
    <button onClick={() => addToCart(product)}>Add to Cart</button>
  </div>
);

export default ProductCard;
