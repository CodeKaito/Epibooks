import React, { useContext, useEffect, useState } from "react";
import useFetchComments from "../hooks/useFetchComments";

import { Link, useParams } from "react-router-dom";
import { QueryProvider } from "../context/QueryContext";
import { SelectCategoryContext } from "../context/SelectCategoryContext";
import { ThemeContext } from "../context/ThemeContext";
import MyNav from "../components/navigationBar/MyNav";
import MyFooter from "../components/MyFooter/MyFooter";
import CommentArea from "../components/MainContent/LatestReleases/CommentArea";
import { Container, Row, Col, Button } from "react-bootstrap";
import './style/bookdetail.css'

import { useLocation } from "react-router-dom";

const BookDetails = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const { asin } = useParams();

  const { theme } = useContext(ThemeContext);
  const { selectedCategory } = useContext(SelectCategoryContext);

  const commentsEndpoint = `https://striveschool-api.herokuapp.com/api/comments/${asin}`;

  const { loading, data: comments, error } = useFetchComments(commentsEndpoint);

  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await import(`../../public/data/${selectedCategory}.json`);
        const booksCategory = response.default;
        const foundBook = booksCategory.find((item) => item.asin === asin);
        if (foundBook) {
          setBook(foundBook);
        } else {
          throw new Error("Book not found");
        }
      } catch (error) {
        console.error("Error fetching book data: ", error);
        setBook(null);
      }
    };

    fetchData();
  }, [selectedCategory, asin]);

  return (
    <QueryProvider>
      <div className={`${theme === "light" ? "bg-light" : "bg-dark text-light"}`}>
        <MyNav />
        {loading ? (
          <h5 className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
            Loading...
          </h5>
        ) : error ? (
          <h5 className="d-flex justify-content-center align-items-center" style={{ minHeight: "70vh" }}>
            {error}
          </h5>
        ) : book ? (
          <Container style={{ paddingTop: "8rem", minHeight: "90vh" }}>
            <Row>
              <Col>
                <div className="d-flex flex-column align-items-center justify-content-center gap-3 ">
                  <h2 className="text-center">{book.title}</h2>
                  <img src={book.img} alt={book.title} style={{ width: "400px" }} />
                  <h3>
                    € <span style={{ fontSize: "2rem" }}>{book.price}</span>
                  </h3>
                  <p>
                    Category: <em>{book.category}</em>
                  </p>
                </div>
              </Col>
              <Col>
                <div className="mainContainer-scrollable">
                  <CommentArea comments={comments} />
                </div>
              </Col>
            </Row>
            <div className="d-flex justify-content-center mt-5">
              <Link to={"/"}>
                <Button variant={`${theme === "light" ? "outline-dark" : "outline-light"}`}>
                  <i className="bi bi-arrow-left-square"></i>&nbsp;&nbsp;Back to Homepage
                </Button>
              </Link>
            </div>
          </Container>
        ) : null}
        <MyFooter />
      </div>
    </QueryProvider>
  );
};

export default BookDetails;
