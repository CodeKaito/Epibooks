import React, { useContext, useState, useEffect, useCallback } from "react";
import { SelectedContext } from "../../../context/SelectedContext";
import Spinner from "react-bootstrap/Spinner";
import "../LatestReleases/style/commentArea.css";
import AddComment from "./AddComment";
import CommentList from "./CommentList";
import { useLocation } from "react-router-dom";
import { nanoid } from "nanoid";

const CommentArea = () => {
  const location = useLocation();
  const isBookDetailsPage = location.pathname.includes("/book/");
  const { selected } = useContext(SelectedContext);
  const [bookComments, setBookComments] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false); // State per tracciare lo scroll

  const getCommentsFromApi = useCallback(async () => {
    try {
      const data = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${selected.asin}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWNkZGU5MGUwZWVkODAwMWEzY2FkNjEiLCJpYXQiOjE3MTE0NjM1NTcsImV4cCI6MTcxMjY3MzE1N30.whnXUzpEpxDxQlBm2xQ8IF25jBhlm6X4VSxtwbK1XlY",
          },
        }
      );
      const response = await data.json();
      setBookComments(response);
    } catch (error) {
      console.log("error", error);
    }
  }, [selected.asin]);

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
      // Controlla se la finestra è stata scrollata verso il basso
      if (window.scrollY > 0) {
        setIsScrolled(true); // Imposta lo stato a true se è stato fatto lo scroll
      } else {
        setIsScrolled(false); // Imposta lo stato a false se lo scroll è tornato in cima
      }
    };

    window.addEventListener("scroll", handleScroll); // Aggiungi un event listener per lo scroll

    return () => {
      window.removeEventListener("scroll", handleScroll); // Rimuovi l'event listener quando il componente viene smontato
    };
  }, []);

  return (
    <>
      {!selected.asin && !isBookDetailsPage ? (
        <>
          <Spinner animation="grow" key={nanoid()} className="d-flex justify-content-center mx-auto align-items-center mt-5"/>
          <p key={nanoid()} className="d-flex justify-content-center mx-auto align-items-center mt-3">
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
              <div className={`sticky-top ${isScrolled ? "scrolled" : ""}`} style={{ padding: "10px", width: "100%", backdropFilter: "blur(8px)", backgroundColor: "rgba(255, 255, 255, 0.5)" }}>
                  <h3 key={nanoid()}>Comments for:</h3>
                  <h5 key={nanoid()} className="mb-5">
                    {selected.title}
                  </h5>
              </div>
              
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
