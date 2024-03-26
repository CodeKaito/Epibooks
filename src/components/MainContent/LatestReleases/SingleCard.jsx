import React, { useContext, useState } from "react";

import { SelectedContext } from "../../../context/SelectedContext";

// import CommentModal from "./CommentModal";

import "./style/singleCard.css";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function SingleCard({ img, title, category, price, btnSeeMore, asin }) {
  // const [openCommentModal, setOpenCommentModal] = useState(false);

  const { selected, handleSelect } = useContext(SelectedContext);

  const isSelected = selected.asin === asin;

  const handleShow = () => {
    handleSelect(asin, title);
    // setOpenCommentModal(!openCommentModal);
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
          <Button variant="outline-success">{btnSeeMore}</Button>
        </Card.Body>
      </Card>

      {/* {openCommentModal && (
        <CommentModal asin={asin} handleShow={handleShow} title={title} />
      )} */}
    </>
  );
}

export default SingleCard;