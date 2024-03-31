import React from "react";

import generateUniqueId from "../../../generator/IDgenerator";
import { ListGroup } from "react-bootstrap";
import SingleComment from "./SingleComment";

const CommentList = ({ comment, handleDeleteComment, title, getCommentsFromApi, setShowSuccessDeleteAlert, setShowErrorDeleteAlert, setShowSuccessEditAlert, setShowErrorEditAlert }) => {
  return (
    <>
      <ListGroup
        className="d-flex justify-content-between align-items-start w-100 px-1"
        as="ol"
        numbered
        key={generateUniqueId()}
      >
        <SingleComment
          comment={comment}
          title={title}
          handleDeleteComment={handleDeleteComment}
          getCommentsFromApi={getCommentsFromApi}
          key={generateUniqueId()}
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