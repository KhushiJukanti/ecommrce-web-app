import React from 'react';

const ProductList = ({ products, addToCart }) => {
  return (
    <div className='container'>
      <div className='row'>
        {products.map(product => (
          <div className='col-md-3 mt-3' key={product.id}>
            <div className='card' style={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)' }}>
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className='card-img-top' 
                style={{ height: '250px', objectFit: 'cover', padding: '5px' }} 
              />
              <div className='card-body'>
                <h5 className='card-title'>{product.name}</h5>
                <p className='card-text'>Category: {product.category}</p>
                <p className='card-text'>Price: ${product.price}</p>
                <button 
                  className='btn btn-primary'
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
