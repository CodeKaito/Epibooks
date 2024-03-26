import React, { useContext, useState, useEffect } from "react";

import { SelectedContext } from "../../../context/SelectedContext";

import Spinner from "react-bootstrap/Spinner";

import "../LatestReleases/style/commentArea.css";

import AddComment from "./AddComment";
import CommentList from "./CommentList";

import { useLocation } from "react-router-dom";

import { nanoid } from "nanoid";
import useFetchComments from "../../../hooks/useFetchComments";

const CommentArea = () => {
  const location = useLocation();

  const isBookDetailsPage = location.pathname.includes("/book/");

  const { selected } = useContext(SelectedContext);

  const [bookComments, setBookComments] = useState(null);

  const getCommentsFromApi = async () => {
    try {
      const data = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${selected.asin}`,
        {
          headers: {
            Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNkZGU5MGUwZWVkODAwMWEzY2FkNjEiLCJpYXQiOjE3MTE0NDg0MTgsImV4cCI6MTcxMjY1ODAxOH0.7JsncRqW6mP05TsAJBeX2OuY8bKxv-vlJStutqXRjrI",
          }
        }
      );
      const response = await data.json();
      setBookComments(response);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (selected.asin || (isBookDetailsPage && selected.asin)) {
      getCommentsFromApi();
    }
  }, [selected.asin, isBookDetailsPage]);

  const handleDeleteComment = () => {
    getCommentsFromApi();
  };

  const handleAddNewComment = () => {
    getCommentsFromApi();
  };

  return (
    <>
      {!selected.asin && !isBookDetailsPage ? (
        <>
          <Spinner
            animation="grow"
            key={nanoid()}
            className="d-flex justify-content-center mx-auto align-items-center mt-5"
          />
          <p
            key={nanoid()}
            className="d-flex justify-content-center mx-auto align-items-center mt-3"
          >
            Click on a book to load contents...
          </p>
        </>
      ) : null}

      {selected.asin || isBookDetailsPage ? (
        <div
          className="d-flex flex-column justify-content-center align-items-start m-0 p-0 commentArea"
          key={nanoid()}
        >
          {isBookDetailsPage ? (
            <>
              <h3 key={nanoid()} className="mb-5 align-self-center">
                Reviews:
              </h3>
            </>
          ) : (
            <>
              <h3 key={nanoid()}>Comments for:</h3>
              <h5 key={nanoid()} className="mb-5">
                {selected.title}
              </h5>
            </>
          )}

          {bookComments && bookComments.length > 0 ? (
            bookComments.map((comment) => (
              <>
                <CommentList
                  comment={comment}
                  title={comment.title}
                  key={nanoid()}
                  handleDeleteComment={handleDeleteComment}
                  getCommentsFromApi={getCommentsFromApi}
                />
              </>
            ))
          ) : (
            <p
              className="d-flex justify-content-center align-items-center mx-auto p-0 m-0"
              key={nanoid()}
            >
              No comments here yet 😟 Be the first one!
            </p>
          )}

          <AddComment
            title={selected.title}
            asin={selected.asin}
            handleAddNewComment={handleAddNewComment}
            key={nanoid()}
          />
        </div>
      ) : null}
    </>
  );
};

export default CommentArea;