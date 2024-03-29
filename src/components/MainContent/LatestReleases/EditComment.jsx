import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const EditComment = ({ comment, title, getCommentsFromApi, setShowSuccessEditAlert, setShowErrorEditAlert }) => {

  const apiKey = process.env.REACT_APP_API_KEY;
  const [openEditCommentModal, setOpenEditCommentModal] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [editedRating, setEditedRating] = useState(0);

  useEffect(() => {
    setEditedComment(comment.comment);
    setEditedRating(comment.rate);
  }, [comment.comment, comment.rate]);

  const handleCommentChange = (e) => {
    setEditedComment(e.target.value);
  };

  const handleRatingChange = (e) => {
    setEditedRating(parseInt(e.target.value));
  };

  const handleEditComment = () => {
    setOpenEditCommentModal(!openEditCommentModal);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedComment = {
      comment: editedComment,
      rate: editedRating,
    };
    try {
      const res = await fetch(`https://striveschool-api.herokuapp.com/api/comments/${comment._id}`, {
        method: "PUT",
        headers: {
          Authorization: apiKey,
          "Content-type": "application/json",
        },
        body: JSON.stringify(updatedComment),
      });
      if (res.ok) {
        setShowSuccessEditAlert(true); 
        setTimeout(() => {
          getCommentsFromApi();
          setOpenEditCommentModal(false);
          setShowSuccessEditAlert(false);
        }, 2000);
      } else {
        setTimeout(() => {
          setShowErrorEditAlert(true); 
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      setShowErrorEditAlert(true);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      const starClassName =
        i < editedRating ? "bi bi-star-fill" : "bi bi-star";
      stars.push(<i className={starClassName} key={i}></i>);
    }
    return (
      <div className="mb-3">
        {stars}
        <span className="fs-5 ms-2">{editedRating}/5</span>
      </div>
    );
  };

  return (
    <>
      <i className="bi bi-pencil ms-3 me-2" role="button" onClick={handleEditComment}></i>

      {openEditCommentModal && (
        <Modal centered fade show size="md" onHide={handleEditComment}>
          <Modal.Header closeButton onClick={handleEditComment}>
            <Container>
              <Row>
                <Col xs={12}>
                  <Modal.Title className="mb-3">
                    Edit your Review for: 
                  </Modal.Title>
                </Col>
                <Col xs={12}>
                  <Modal.Title>{title}</Modal.Title>
                </Col>
              </Row>
            </Container>
          </Modal.Header>
          <Modal.Body className="d-flex flex-column align-items-start justify-content-center">
            <Form onSubmit={handleEditSubmit}>
              <Form.Group className="mb-3" controlId="">
                <Form.Label>What do you think about this book?</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  cols="70"
                  rows="5"
                  type="text"
                  placeholder="Your Comment..."
                  value={editedComment}
                  onChange={handleCommentChange}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="rating">
                <Form.Label>Rating:</Form.Label>
                <Form.Control
                  required
                  as="select"
                  value={editedRating}
                  onChange={handleRatingChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Form.Control>
              </Form.Group>

              {renderStars()}

              <Button variant="outline-success" type="submit">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default EditComment;
