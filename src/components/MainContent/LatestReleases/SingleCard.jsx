import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SelectedContext } from "../../../context/SelectedContext";
import { OnCartContext } from "../../../context/OnCartContext";
import "./style/singleCard.css";
import Card from "react-bootstrap/Card";
import { FaShoppingCart } from "react-icons/fa";
import generateUniqueId from "../../../generator/IDgenerator"; 

function SingleCard({ img, title, category, price, btnSeeMore, asin }) {
  const [successAddToCart, setSuccessAddToCart] = useState(false);
  const [addToCartCount, setAddToCartCount] = useState(0);
  const { selected, handleSelect } = useContext(SelectedContext);
  const isSelected = selected.asin === asin;

  const { onCart, handleSelectOnCart, setOnCart } = useContext(OnCartContext);

  useEffect(() => {
    if (successAddToCart) {
      const timer = setTimeout(() => {
        setSuccessAddToCart(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [successAddToCart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(onCart));
  }, [onCart]);

  const handleShow = () => {
    handleSelect(asin, title);
  };

  const handleAddToCart = () => {
    const existingProductIndex = onCart.findIndex(item => item.asin === asin);
  
    if (existingProductIndex !== -1) {
      const updatedCart = [...onCart];
      updatedCart[existingProductIndex].count += 1; // Incrementa il conteggio del prodotto esistente nel carrello
      setOnCart(updatedCart);
    } else {
      const productId = generateUniqueId();
      handleSelectOnCart({ id: productId, title, category, price, img, asin, count: 1 }); // Aggiungi un nuovo prodotto al carrello con conteggio 1
    }
  
    console.log("Product added to cart:", title); // Console log del prodotto aggiunto
    console.log("Cart items:", onCart); // Console log dell'array del carrello
    setSuccessAddToCart(true);
    setAddToCartCount(prevCount => prevCount + 1); // Incrementa il conteggio di addToCartCount
  };
  

  return (
    <>
      <Card
        className={`singleCard ${
          isSelected ? "border border-2 border-warning" : ""
        }`}
        key={asin}
        onClick={handleShow}
      >
        <div className="imgContainer">
          <Card.Img variant="top" src={img} />
        </div>
        <Card.Body>
          <Card.Title className="cardTitle fs-6">{title}</Card.Title>
          <Card.Text>
            in <em>{category}</em>
          </Card.Text>
          <Card.Text>€ {price}</Card.Text>
          <div className="d-flex justify-content-between align-items-center">
            <Link to={`/details/${asin}`} className="btn btn-outline-success">
              Details {btnSeeMore}
            </Link>
            <button className="btn btn-outline-primary position-relative" onClick={handleAddToCart}>
              <FaShoppingCart />
              {addToCartCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 end-0 translate-middle">{addToCartCount}</span>
              )}
            </button>
          </div>
        </Card.Body>
      </Card>
      {successAddToCart && (
        <div className="alert alert-success position-fixed top-50 start-50 translate-middle" style={{ zIndex: 999 }} role="alert">
          Product added to cart successfully!
        </div>
      )}
    </>
  );
}

export default SingleCard;
