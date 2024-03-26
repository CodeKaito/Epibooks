import React from "react";

import "./style/deleteComment.css";

const DeleteComment = ({ bookId, handleDeleteComment }) => {
  const deleteCommentFunc = async () => {
    try {
      await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${bookId}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNkZGU5MGUwZWVkODAwMWEzY2FkNjEiLCJpYXQiOjE3MTE0NDg0MTgsImV4cCI6MTcxMjY1ODAxOH0.7JsncRqW6mP05TsAJBeX2OuY8bKxv-vlJStutqXRjrI",
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => {
        handleDeleteComment();
      }, 1000);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <i
      className="bi bi-trash ms-5"
      role="button"
      onClick={deleteCommentFunc}
    ></i>
  );
};

export default DeleteComment;