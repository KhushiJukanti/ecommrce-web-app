import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Form, Card } from 'react-bootstrap';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/cart')
      .then((response) => setCart(response.data))
      .catch((error) => console.error('Error fetching cart:', error));
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    axios.patch(`http://localhost:5000/cart/${id}`, { quantity: newQuantity })
      .then(() => setCart(cart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))))
      .catch((error) => console.error('Error updating quantity:', error));
  };

  const removeFromCart = (id) => {
    const itemExists = cart.some((item) => item.id === id);
    if (!itemExists) {
      console.error(`Item with id ${id} does not exist in the cart.`);
      return;
    }

    const url = `http://localhost:5000/cart/${id}`;
    console.log('Removing item from cart with URL:', url);

    axios.delete(url)
      .then(() => setCart(cart.filter((item) => item.id !== id)))
      .catch((error) => console.error('Error removing item from cart:', error));
  };

  return (
    <Container className="mt-5" style={{height:'85vh'}}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <Row>
          {cart.map((item) => (
            <Col md={6} lg={4} className="mb-4" key={item.id}>
              <Card>
                {/* Add image at the top of the card */}
                <Card.Img variant="top" src={item.image} alt={item.name} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>Price: ${item.price}</Card.Text>
                  <Form.Group className="d-flex align-items-center">
                    <Form.Label className="mr-2">Quantity:</Form.Label>
                    <Form.Control
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                      min="1"
                      className="mr-3"
                      style={{ width: '80px' }}
                    />
                  </Form.Group>
                  <Button variant="danger" onClick={() => removeFromCart(item.id)} className="mt-2">
                    Remove
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <Col md={12} className="text-right mt-4">
            <h3>Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
            <Button variant="success" onClick={() => window.location.href = '/checkout'}>
              Proceed to Checkout
            </Button>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;
