import React, { useState } from "react";
import { Modal, Button, Form, Dropdown, Container, Row, Col } from "react-bootstrap";
import './style/addcomment.css';
import generateUniqueId from "../../../generator/IDgenerator";

const AddComment = ({ title, asin, handleAddNewComment, setShowSuccessAlert, setShowErrorAlert }) => {

  const apiKey = process.env.REACT_APP_API_KEY;

  const [openNewCommentModal, setOpenNewCommentModal] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleAddCommentShow = () => setOpenNewCommentModal(!openNewCommentModal);

  const handleRatingChange = (eventKey) => setSelectedRating(eventKey);

  const handleCommentChange = (event) => setComment(event.target.value);

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starClassName = i < selectedRating ? "bi bi-star-fill" : "bi bi-star";
      stars.push(<i className={starClassName} key={generateUniqueId()}></i>);
    }
    return (
      <div className="mb-5">
        {stars}
        <span>
          <span className="fs-5 ms-2">{selectedRating}</span>/5
        </span>
      </div>
    );
  };

  const addNewCommentFunc = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`https://striveschool-api.herokuapp.com/api/comments/`, {
        method: "POST",
        body: JSON.stringify({
          comment: comment,
          rate: selectedRating,
          elementId: asin,
        }),
        headers: {
          Authorization: apiKey,
          "Content-type": "application/json",
        },
      });
      if (res.ok) {
        console.log("Comment submitted successfully");
        setShowSuccessAlert(true);
        setTimeout(() => {
          handleAddNewComment();
          setOpenNewCommentModal(false);
          setShowSuccessAlert(false);
        }, 1000);
      } else {
        console.log("Error submitting comment");
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.log("error", error);
      setShowErrorAlert(true);
    }
  };

  return (
    <>
      
      <button className="btn btn-outline-primary mt-5 align-self-center addyourreview-button" onClick={handleAddCommentShow}>Add Your Review</button>

      {openNewCommentModal && (
        <Modal
          centered
          fade="true"
          show
          size="lg"
          onHide={handleAddCommentShow}
        >
          <Modal.Header closeButton onClick={handleAddCommentShow}>
            <Container>
              <Row>
                <Col xs={12}>
                  <Modal.Title className="mb-3">
                    Add your Review for:
                  </Modal.Title>
                </Col>
                <Col xs={12}>
                  <Modal.Title>{title}</Modal.Title>
                </Col>
              </Row>
            </Container>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column align-items-start justify-content-center">
            <Form onSubmit={addNewCommentFunc}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>What do you think about this book?</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  cols="100"
                  rows="10"
                  type="text"
                  placeholder="Your Comment..."
                  value={comment}
                  onChange={handleCommentChange}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group required className="mb-3" controlId="formBasicPassword">
                <Dropdown required onSelect={handleRatingChange}>
                  <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                    How would you rate this book?
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item eventKey="1">1</Dropdown.Item>
                    <Dropdown.Item eventKey="2">2</Dropdown.Item>
                    <Dropdown.Item eventKey="3">3</Dropdown.Item>
                    <Dropdown.Item eventKey="4">4</Dropdown.Item>
                    <Dropdown.Item eventKey="5">5</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              {renderStars()}

              <Button variant="primary" type="submit" disabled={!comment || !selectedRating}>
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default AddComment;
