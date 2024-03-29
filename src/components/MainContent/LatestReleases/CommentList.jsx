import React from "react";

import { nanoid } from "nanoid";
import { ListGroup } from "react-bootstrap";
import SingleComment from "./SingleComment";

const CommentList = ({ comment, handleDeleteComment, title, getCommentsFromApi, setShowSuccessDeleteAlert, setShowErrorDeleteAlert, setShowSuccessEditAlert, setShowErrorEditAlert }) => {
  return (
    <>
      <ListGroup
        className="d-flex justify-content-between align-items-start w-100 px-1"
        as="ol"
        numbered
        key={nanoid()}
      >
        <SingleComment
          comment={comment}
          title={title}
          handleDeleteComment={handleDeleteComment}
          getCommentsFromApi={getCommentsFromApi}
          key={nanoid()}
          setShowSuccessDeleteAlert={setShowSuccessDeleteAlert}
          setShowErrorDeleteAlert={setShowErrorDeleteAlert}
          setShowSuccessEditAlert={setShowSuccessEditAlert}
          setShowErrorEditAlert={setShowErrorEditAlert}
        />
      </ListGroup>
    </>
  );
};

export default CommentList;