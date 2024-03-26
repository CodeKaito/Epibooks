import React, { useContext } from "react";
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
import { SelectCategoryContext } from "../../context/SelectCategoryContext"; // Import SelectCategoryContext

const MyNav = () => {
  const { setQuery } = useContext(QueryContext);
  const { toggleTheme } = useContext(ThemeContext);
  const { selectedCategory, setSelectedCategory } = useContext(SelectCategoryContext); // Get selectedCategory and setSelectedCategory from SelectCategoryContext

  const handleCategorySelect = (category) => {
    setSelectedCategory(category); // Set the selected category
  };

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
