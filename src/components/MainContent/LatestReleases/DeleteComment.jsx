import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./style/deleteComment.css";

const DeleteComment = ({ bookId, handleDeleteComment, setShowSuccessDeleteAlert, setShowErrorDeleteAlert }) => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  };
  
  const handleShow = () => setShowModal(true);

  const deleteCommentFunc = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${bookId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      setShowSuccessDeleteAlert(true);
      
      setTimeout(() => {
        setShowSuccessDeleteAlert(false);
      }, 2000);
      
  
      handleDeleteComment();

    } catch (error) {
      console.log("error", error);
      setShowErrorDeleteAlert(true);
    }
  };

  return (
    <>
      <i className="bi bi-trash ms-3" role="button" onClick={handleShow}></i>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this comment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Discard
          </Button>
          <Button variant="danger" onClick={deleteCommentFunc}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteComment;
