import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SelectedContext } from "../../../context/SelectedContext";
import "./style/singleCard.css";
import Card from "react-bootstrap/Card";
import { FaShoppingCart } from "react-icons/fa";

function SingleCard({ img, title, category, price, btnSeeMore, asin }) {
  const { selected, handleSelect } = useContext(SelectedContext);
  const isSelected = selected.asin === asin;

  const handleShow = () => {
    handleSelect(asin, title);
  };

  const handleAddToCart = () => {
    // setSelected([...selected, { img, title, category, price, asin }]);
    console.log("Product added to cart:", title);
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
            <button
              className="btn btn-outline-primary"
              onClick={handleAddToCart}
            >
              <FaShoppingCart />
            </button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default SingleCard;
