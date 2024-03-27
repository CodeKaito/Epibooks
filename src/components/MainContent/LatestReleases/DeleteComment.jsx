import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "./style/deleteComment.css";

const DeleteComment = ({ bookId, handleDeleteComment }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const deleteCommentFunc = async () => {
    try {
      await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${bookId}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNkZGU5MGUwZWVkODAwMWEzY2FkNjEiLCJpYXQiOjE3MTE0NjM1NTcsImV4cCI6MTcxMjY3MzE1N30.whnXUzpEpxDxQlBm2xQ8IF25jBhlm6X4VSxtwbK1XlY",
            "Content-Type": "application/json",
          },
        }
      );
      handleClose(); // Chiudi il modal dopo aver eliminato il commento
      handleDeleteComment(); // Richiama la funzione per aggiornare i commenti
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <i className="bi bi-trash ms-3" role="button" onClick={handleShow}></i>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete confermation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure to delete this comment?
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
