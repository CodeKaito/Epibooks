import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { AlertSuccess, AlertDanger } from '../../Alerts/AlertComponent'; 
import "./style/deleteComment.css";

const DeleteComment = ({ bookId, handleDeleteComment }) => {

  const apiKey = process.env.REACT_APP_API_KEY;
  const [showModal, setShowModal] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false); 
  const [showErrorAlert, setShowErrorAlert] = useState(false); 
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const deleteCommentFunc = async () => {
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
      handleClose(); 
      handleDeleteComment();
      setShowSuccessAlert(true); 
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 3000);
    } catch (error) {
      console.log("error", error);
      setShowErrorAlert(true); 
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

      {showSuccessAlert && <AlertSuccess message="Comment deleted successfully!" />}
      {showErrorAlert && <AlertDanger message="Error deleting comment!" />}
    </>
  );
};

export default DeleteComment;
