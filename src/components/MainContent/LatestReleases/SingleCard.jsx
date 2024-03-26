import React, { useContext } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { SelectedContext } from "../../../context/SelectedContext";
import "./style/singleCard.css";
import Card from "react-bootstrap/Card";

function SingleCard({ img, title, category, price, btnSeeMore, asin }) {
  const { selected, handleSelect } = useContext(SelectedContext);
  const isSelected = selected.asin === asin;

  const handleShow = () => {
    handleSelect(asin, title);
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
          <div>
            <Link to={`/details/${asin}`} className="btn btn-outline-success">
              Details {btnSeeMore}
            </Link>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default SingleCard;
