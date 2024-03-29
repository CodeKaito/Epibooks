import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { myNavLinks } from "./data/myNavLinks";
import logo from "../../assets/logo.png";
import "../../assets/logo.css";
import { QueryContext } from "../../context/QueryContext";
import { ThemeContext } from "../../context/ThemeContext";
import { Button, NavDropdown } from "react-bootstrap";
import { nanoid } from "nanoid";
import { SelectCategoryContext } from "../../context/SelectCategoryContext"; 
import { FaShoppingCart } from "react-icons/fa";
import { OnCartContext } from "../../context/OnCartContext";
import './mynav.css';

const MyNav = () => {
  const { setQuery } = useContext(QueryContext);
  const { toggleTheme } = useContext(ThemeContext);
  const { selectedCategory, setSelectedCategory } = useContext(SelectCategoryContext); 
  const { onCart } = useContext(OnCartContext);

  const [cartItemCount, setCartItemCount] = useState(0);
  const [isCartJumping, setIsCartJumping] = useState(false);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); 
  };

  useEffect(() => {
    setCartItemCount(onCart.length);
    setIsCartJumping(true); // Attiva l'animazione
    setTimeout(() => {
      setIsCartJumping(false); // Disattiva l'animazione dopo 500ms
    }, 500);
  }, [onCart]);

  return (
    <>
      <Navbar
        fluid="true"
        bg="dark"
        variant="dark"
        expand="lg"
        className="fixed-top"
      >
        <Container fluid className="mx-0">
          <Navbar.Brand as={Link} to="/">
            EpiBooks <img className="logo" src={logo} alt="EpiBooks_logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              {myNavLinks.map((link) =>
                link.dropdown ? (
                  <NavDropdown
                    key={nanoid()}
                    title={link.title}
                    menuVariant="dark"
                    className={selectedCategory.toLowerCase() === link.title.toLowerCase() ? "active" : ""}
                  >
                    {link.dropdownItems.map((dropdownEl) => (
                      <NavDropdown.Item
                        href={dropdownEl.href}
                        key={dropdownEl.id}
                        className={dropdownEl.className}
                        onClick={() => handleCategorySelect(dropdownEl.title)}
                      >
                        {dropdownEl.title}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ) : (
                  <Nav.Link
                    key={link.id}
                    as={Link}
                    to={link.href}
                    className={link.className}
                  >
                    {link.title}
                  </Nav.Link>
                )
              )}
            </Nav>
            
            <Link to="/cart" className="btn btn-outline-light me-3 position-relative">
              Shopping Cart <FaShoppingCart />
              {cartItemCount > 0 && (
                <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger ${isCartJumping ? 'jump-animation' : ''}`}>
                  {cartItemCount}
                  <span className="visually-hidden">items in cart</span>
                </span>
              )}
            </Link>

            
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button
                variant="outline-warning"
                onClick={() => toggleTheme()}
                style={{ width: "100px" }}
                className="m-0 p-0 d-flex justify-content-center align-items-center gap-2"
              >
                <i className="bi bi-sun"></i>
                <i className="bi bi-moon"></i>
              </Button>
              
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MyNav;
