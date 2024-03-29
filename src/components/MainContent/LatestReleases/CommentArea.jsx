import React, { useContext, useState, useEffect, useCallback } from "react";
import { SelectedContext } from "../../../context/SelectedContext";
import Spinner from "react-bootstrap/Spinner";
import "../LatestReleases/style/commentArea.css";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import { useLocation } from "react-router-dom";
import generateUniqueId from "../../../generator/IDgenerator";

const CommentArea = () => {
  const apiKey = process.env.REACT_APP_API_KEY;

  const location = useLocation();
  const isBookDetailsPage = location.pathname.includes("/book/");
  const { selected } = useContext(SelectedContext);
  const [bookComments, setBookComments] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessDeleteAlert, setShowSuccessDeleteAlert] = useState(false);
  const [showErrorDeleteAlert, setShowErrorDeleteAlert] = useState(false);
  const [showSuccessEditAlert, setShowSuccessEditAlert] = useState(false);
  const [showErrorEditAlert, setShowErrorEditAlert] = useState(false);

  const getCommentsFromApi = useCallback(async () => {
    try {
      const data = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${selected.asin}`,
        {
          headers: {
            Authorization: apiKey,
            "Content-Type": "application/json",
          },
        }
      );
      const response = await data.json();
      setBookComments(response);
    } catch (error) {
      console.log("error", error);
    }
  }, [selected.asin, apiKey]);

  useEffect(() => {
    if (selected.asin || (isBookDetailsPage && selected.asin)) {
      getCommentsFromApi();
    }
  }, [selected.asin, isBookDetailsPage, getCommentsFromApi]);

  const handleDeleteComment = () => {
    getCommentsFromApi();
  };

  const handleAddNewComment = () => {
    getCommentsFromApi();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showSuccessAlert && (
        <div className="alert alert-success" role="alert">
          Comment successfully added.
        </div>
      )}
      {showErrorAlert && (
        <div className="alert alert-danger" role="alert">
          Error while adding the comment, try again later.
        </div>
      )}

      {showSuccessDeleteAlert && (
        <div className="alert alert-success" role="alert">
          Comment successfully deleted.
        </div>
      )}
      {showErrorDeleteAlert && (
        <div className="alert alert-danger" role="alert">
          Error while deleting the comment, try again later.
        </div>
      )}
      {showSuccessEditAlert && (
        <div className="alert alert-success" role="alert">
          Comment successfully edited.
        </div>
      )}
      {showErrorEditAlert && (
        <div className="alert alert-danger" role="alert">
          Error while editing the comment, try again later.
        </div>
      )}

      {!selected.asin && !isBookDetailsPage ? (
        <div key={generateUniqueId()}>
          <Spinner
            animation="grow"
            className="d-flex justify-content-center mx-auto align-items-center mt-5"
          />
          <p className="d-flex justify-content-center mx-auto align-items-center mt-3">
            Click on a book to load contents...
          </p>
        </div>
      ) : null}

      {selected.asin || isBookDetailsPage ? (
        <div
          className="d-flex flex-column justify-content-center align-items-start m-0 p-0 commentArea"
          key={generateUniqueId()}
        >
          {isBookDetailsPage ? (
            <h3 key={generateUniqueId()} className="mb-5 align-self-center">
              Reviews:
            </h3>
          ) : (
            <div
              className={`sticky-top ${isScrolled ? "scrolled" : ""}`}
              style={{
                padding: "10px",
                width: "100%",
                backdropFilter: "blur(2px)",
                backgroundColor: "rgba(255, 255, 255, 0.0001)",
              }}
              key={generateUniqueId()}
            >
              <h3 key={generateUniqueId()}>Comments for:</h3>
              <h5 key={generateUniqueId()} className="mb-5">
                {selected.title}
              </h5>
            </div>
          )}

          {bookComments && bookComments.length > 0 ? (
            bookComments.map((comment) => (
              <CommentList
                comment={comment}
                title={selected.title}
                key={generateUniqueId()}
                handleDeleteComment={handleDeleteComment}
                getCommentsFromApi={getCommentsFromApi}
                setShowSuccessDeleteAlert={setShowSuccessDeleteAlert}
                setShowErrorDeleteAlert={setShowErrorDeleteAlert}
                setShowSuccessEditAlert={setShowSuccessEditAlert}
                setShowErrorEditAlert={setShowErrorEditAlert}
              />
            ))
          ) : (
            <p
              className="d-flex justify-content-center align-items-center mx-auto p-0 m-0"
              key={generateUniqueId()}
            >
              No comments here yet 😟 Be the first one!
            </p>
          )}

          <AddComment
            title={selected.title}
            asin={selected.asin}
            handleAddNewComment={handleAddNewComment}
            setShowSuccessAlert={setShowSuccessAlert}
            setShowErrorAlert={setShowErrorAlert}
            key={generateUniqueId()}
          />
        </div>
      ) : null}
    </>
  );
};

export default CommentArea;
