/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import useFetchComments from "../hooks/useFetchComments";

import { Link, useParams } from "react-router-dom";
import fantasyJson from "../components/MainContent/LatestReleases/data/Fantasy.json";
import horrorJson from "../components/MainContent/LatestReleases/data/Horror.json";
import scifiJson from "../components/MainContent/LatestReleases/data/Sci-Fi.json";
import historyJson from "../components/MainContent/LatestReleases/data/History.json";
import romanceJson from "../components/MainContent/LatestReleases/data/Romance.json";

import { QueryProvider } from "../context/QueryContext";
import { SelectCategoryContext } from "../context/SelectCategoryContext";

import { ThemeContext } from "../context/ThemeContext";

import MyNav from "../components/navigationBar/MyNav";
import MyFooter from "../components/MyFooter/MyFooter";
import CommentArea from "../components/MainContent/LatestReleases/CommentArea";
import { Container, Row, Col, Button } from "react-bootstrap";

import { useLocation } from "react-router-dom";

const BookDetails = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { asin } = useParams();

  const { theme } = useContext(ThemeContext);

  const { selectedCategory } = useContext(SelectCategoryContext);

  const [comments, setComments] = useState([]);

  // const { selected } = useContext(SelectedContext);

  let booksCategory = [];
  const loading = false;
  const error = null;

  switch (selectedCategory) {
    case "horror":
      booksCategory = horrorJson;
      break;

    case "Sci-Fi":
      booksCategory = scifiJson;
      break;

    case "history":
      booksCategory = historyJson;
      break;

    case "romance":
      booksCategory = romanceJson;
      break;

    case "fantasy":
      booksCategory = fantasyJson;
      break;

    default:
      break;
  }

  const book = booksCategory.find((item) => item.asin === asin);
  const { data } = useFetchComments(
    `https://striveschool-api.herokuapp.com/api/comments/${asin}`
  );

  useEffect(() => {
    if (!loading && !error) {
      setComments(data);
    }
  }, [book.asin, selectedCategory, loading, error, data]);

  console.log(book);
  return (
    <QueryProvider>
      <div
        className={`${theme === "light" ? "bg-light" : "bg-dark text-light"}`}
      >
        <MyNav />
        {book ? (
          <Container style={{ paddingTop: "8rem", minHeight: "90vh" }}>
            <Row>
              <Col>
                <div className="d-flex flex-column align-items-center justify-content-center gap-3 ">
                  <h2 className="text-center">{book.title}</h2>
                  <img
                    src={book.img}
                    alt={book.title}
                    style={{ width: "400px" }}
                  />
                  <h3>
                    € <span style={{ fontSize: "2rem" }}>{book.price}</span>
                  </h3>
                  <p>
                    Category: <em>{book.category}</em>
                  </p>
                </div>
              </Col>

              <Col>
                <CommentArea />
              </Col>
            </Row>
            <div className="d-flex justify-content-center mt-5">
              <Link to={"/"}>
                <Button
                  variant={`${
                    theme === "light" ? "outline-dark" : "outline-light"
                  }`}
                >
                  <i className="bi bi-arrow-left-square"></i>
                  &nbsp;&nbsp;Back to Homepage
                </Button>
              </Link>
            </div>
          </Container>
        ) : (
          <h5
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "70vh" }}
          >
            Book not found.
          </h5>
        )}
        <MyFooter />
      </div>
    </QueryProvider>
  );
};

export default BookDetails;