import React, { useContext, useEffect, useState } from "react";
import { OnCartContext } from "../context/OnCartContext";
import { ThemeContext } from "../context/ThemeContext";
import MyNav from "../components/navigationBar/MyNav";
import MyFooter from "../components/MyFooter/MyFooter";
import {
  Card,
  Button,
  Container,
  Alert,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { QueryProvider } from "../context/QueryContext";
import "./style/cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const [successRemoveFromCart, setSuccessRemoveFromCart] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [showClearModal, setShowClearModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const { onCart, handleRemoveFromCart, handleSelectOnCart, handleClearCart } =
    useContext(OnCartContext);

  const handleRemoveProduct = (productId) => {
    const existingProductIndex = onCart.findIndex(
      (item) => item.id === productId
    );
    if (existingProductIndex !== -1) {
      handleRemoveFromCart(productId);
      setSuccessRemoveFromCart(true);
    }
  };

  const handleClearFromCart = () => {
    handleClearCart();
    setShowClearModal(false);
  };

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  useEffect(() => {
    if (successRemoveFromCart) {
      const timer = setTimeout(() => {
        setSuccessRemoveFromCart(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [successRemoveFromCart]);

  const calculateTotal = () => {
    let total = 0;
    onCart.map((item) => {
      total += parseFloat(item.price) * item.count;
      return null;
    });
    return total.toFixed(2);
  };

  return (
    <QueryProvider>
      <div
        data-testid="cart-component"
        className={`${
          theme === "light" ? "bg-light" : "bg-dark text-light"
        } d-flex flex-column min-vh-100`}
      >
        <MyNav />
        <Container className="py-4 flex-grow-1 position-relative">
          <h1>Cart</h1>
          {successRemoveFromCart && (
            <Alert
              variant="success"
              onClose={() => setSuccessRemoveFromCart(false)}
              dismissible
              className="position-absolute top-50 start-50 translate-middle"
              style={{ zIndex: 999 }}
            >
              Item removed from cart successfully!
            </Alert>
          )}
          {onCart.length === 0 ? (
            <p className="d-flex align-items-center justify-content-center">
              No items in the cart.
            </p>
          ) : (
            <Row className="g-4">
              <Col md={8}>
                <div className="border p-3 mt-2">
                  {onCart.map((item) => (
                    <div
                      key={item.id}
                      className="mb-3"
                      style={{
                        maxWidth: "100px",
                        maxHeight: "300px",
                      }}
                    >
                      <Card>
                        <div className="d-flex justify-content-between">
                          <Card.Img
                            variant="top"
                            src={item.img}
                            alt={item.title}
                          />
                          <div className="flex-grow-1">
                            <Card.Body
                              style={{
                                width: "300px",
                                color: theme === "light" ? "black" : "white",
                              }}
                            >
                              <Card.Title
                                style={{
                                  color: theme === "light" ? "black" : "white",
                                }}
                              >
                                {item.title}
                              </Card.Title>
                                <Card.Text
                                  style={{
                                    color:
                                      theme === "light" ? "black" : "white",
                                  }}
                                >
                                  Price: ${item.price} x ({item.count} items)
                                </Card.Text>
                                  <Button
                                    variant="danger"
                                    onClick={() => handleRemoveProduct(item.id)}
                                    className="mt-2 me-2"
                                  >
                                    -
                                  </Button>
                                  <Button variant="secondary" className="mt-2 me-2">
                                  {item.count}
                                  </Button>
                                  <Button
                                    variant="primary"
                                    onClick={() => handleSelectOnCart(item)}
                                    className="mt-2"
                                  >
                                    +
                                  </Button>
                            </Card.Body>
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </Col>
              <Col md={4}>
                <div className="border p-3">
                  <h4>Checkout:</h4>
                  <ul>
                    {onCart.map((item) => (
                      <li key={item.id} className="item-list">
                        {item.title} x ({item.count} items)
                      </li>
                    ))}
                  </ul>
                  <h3>Total: ${calculateTotal()}</h3>
                  <Button
                    variant="danger"
                    onClick={() => setShowClearModal(true)}
                    className="mt-3 me-3"
                  >
                    Clear Cart
                  </Button>
                  <Button
                    variant="success"
                    className="mt-3"
                    onClick={handleCheckout}
                    disabled={onCart.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </Col>
              <Modal
                show={showClearModal}
                onHide={() => setShowClearModal(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Clear Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  Are you sure you want to clear your cart?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowClearModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="danger" onClick={handleClearFromCart}>
                    Clear
                  </Button>
                </Modal.Footer>
              </Modal>
              <Modal
                show={showCheckoutModal}
                onHide={() => setShowCheckoutModal(false)}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Checkout</Modal.Title>
                </Modal.Header>
                <Modal.Body>Your order has been accepted.</Modal.Body>
                <Modal.Footer>
                  <Link to="/">
                    <Button variant="primary" onClick={handleClearFromCart}>
                      Close
                    </Button>
                  </Link>
                </Modal.Footer>
              </Modal>
            </Row>
          )}
        </Container>
        <div className="d-flex justify-content-center mt-5">
          <Link to={"/"}>
            <Button
              variant={`${
                theme === "light" ? "outline-dark" : "outline-light"
              }`}
            >
              <i className="bi bi-arrow-left-square"></i>&nbsp;&nbsp;Back to
              Homepage
            </Button>
          </Link>
        </div>
        <MyFooter />
      </div>
    </QueryProvider>
  );
};

export default Cart;
