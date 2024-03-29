import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SelectedContext } from "../../../context/SelectedContext";
import { OnCartContext } from "../../../context/OnCartContext";
import "./style/singleCard.css";
import Card from "react-bootstrap/Card";
import { FaShoppingCart } from "react-icons/fa";

function SingleCard({ img, title, category, price, btnSeeMore, asin }) {
  const [successAddToCart, setSuccessAddToCart] = useState(false);
  const { selected, handleSelect } = useContext(SelectedContext);
  const isSelected = selected.asin === asin;

  const { onCart, handleSelectOnCart } = useContext(OnCartContext);

  useEffect(() => {
    if (successAddToCart) {
      const timer = setTimeout(() => {
        setSuccessAddToCart(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [successAddToCart]);

  const handleShow = () => {
    handleSelect(asin, title);
  };

  const handleAddToCart = () => {
    handleSelectOnCart({ title, category, price, img });
    console.log("Product added to cart:", title);
    console.log("Cart items:", onCart);
    setSuccessAddToCart(true);
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
            <button className="btn btn-outline-primary" onClick={handleAddToCart}>
              <FaShoppingCart />
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
