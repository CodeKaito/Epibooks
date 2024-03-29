import React, { useContext, useEffect, useState } from "react";
import { OnCartContext } from "../context/OnCartContext";
import { ThemeContext } from "../context/ThemeContext";
import MyNav from "../components/navigationBar/MyNav";
import MyFooter from "../components/MyFooter/MyFooter";
import { Card, Button, Container, Alert, Row, Col } from "react-bootstrap";
import { QueryProvider } from "../context/QueryContext";

const Cart = () => {
  const { onCart, handleRemoveFromCart } = useContext(OnCartContext);
  const [showAlert, setShowAlert] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {}, [onCart]);

  const calculateTotal = () => {
    let total = 0;
    onCart.forEach((item) => {
      total += parseFloat(item.price);
    });
    return total.toFixed(2);
  };

  return (
    <QueryProvider>
      <div
        className={`${
          theme === "light" ? "bg-light" : "bg-dark text-light"
        } d-flex flex-column min-vh-100`}
      >
        <MyNav />
        <Container className="py-4 flex-grow-1">
          <h1>Cart</h1>
          {showAlert && (
            <Alert
              variant="success"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              Item removed from cart.
            </Alert>
          )}
          {onCart.length === 0 ? (
            <p className="d-flex align-items-center justify-content-center">
              No items in the cart.
            </p>
          ) : (
            <Row className="g-4">
              <Col md={8}>
                <div className="border p-3">
                  {onCart.map((item) => (
                    <div
                      key={item.id} // Utilizza l'ID generato con nanoid come chiave univoca
                      className="mb-3"
                      style={{ maxWidth: "100px", maxHeight: "200px" }}
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
                                width: "500px",
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
                                  color: theme === "light" ? "black" : "white",
                                }}
                              >
                                Price: ${item.price}
                              </Card.Text>
                              <Button
                                variant="danger"
                                onClick={() => handleRemoveFromCart(item.id)}
                              >
                                Remove from Cart
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
                  <h2>Total:</h2>
                  <p>${calculateTotal()}</p>
                </div>
              </Col>
            </Row>
          )}
        </Container>
        <MyFooter />
      </div>
    </QueryProvider>
  );
};

export default Cart;
