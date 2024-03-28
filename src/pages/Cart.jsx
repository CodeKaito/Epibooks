import React, { useContext, useEffect, useState } from 'react';
import { OnCartContext } from '../context/OnCartContext';
import { Card, Button } from 'react-bootstrap';

const Cart = () => {
  const { onCart } = useContext(OnCartContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(onCart);
  }, [onCart]);

  const handleRemoveFromCart = (asin) => {
    const updatedCart = cartItems.filter(item => item.asin !== asin);
    setCartItems(updatedCart);
  };

  return (
    <div className='container text-light d-flex align-items-center h-100 justify-content-center'>
      <div>
        <h1>Cart</h1>
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {cartItems.map((item, index) => (
            <div key={index} className="col">
              <Card>
                <Card.Img variant="top" src={item.img} alt={item.title} />
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    Category: {item.category}
                  </Card.Text>
                  <Card.Text>
                    Price: {item.price}
                  </Card.Text>
                  <Button variant="danger" onClick={() => handleRemoveFromCart(item.asin)}>Rimuovi dal carrello</Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
