import React, { useContext, useEffect, useState } from "react";
import { QueryContext } from "../../../context/QueryContext";
import { ThemeContext } from "../../../context/ThemeContext";
import { OffCanvassContext } from "../../../context/OffCanvassContext";
import { SelectCategoryContext } from "../../../context/SelectCategoryContext";
import useWindowDimension from "../../../hooks/useWindowDimension";

import { Container, Row, Col, Alert, Offcanvas, Spinner } from "react-bootstrap";
import SingleCard from "./SingleCard";
import CommentArea from "./CommentArea";
import generateUniqueId from "../../../generator/IDgenerator";

import "./style/allbooks.css";

const AllBooks = () => {
  const { query, setQuery } = useContext(QueryContext);
  const { theme } = useContext(ThemeContext);
  const { selectedCategory } = useContext(SelectCategoryContext);
  const { show, setShow } = useContext(OffCanvassContext);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(false); // Stato per gestire il caricamento dei dati
  const { width } = useWindowDimension();

  const handleCloseCanvass = () => setShow(false);

  useEffect(() => {
    const fetchData = async () => {
      const category = selectedCategory;
      try {
        setLoading(true);
  
        const response = await import(`../../../../public/data/${category}.json`);
        let categoryBooks = response.default;
  
        categoryBooks = categoryBooks.sort(() => Math.random() - 0.5);
  
        setFilteredBooks(
          categoryBooks.filter((book) =>
            book.title.toLowerCase().includes(query.toLowerCase())
          )
        );
      } catch (error) {
        console.log("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [query, setFilteredBooks, setQuery, selectedCategory]);

  const renderBooks = filteredBooks.slice(0, 100).map((book) => (
    <Col
      xs={12}
      sm={6}
      lg={4}
      className="d-flex justify-content-center align-items-center"
      key={generateUniqueId()}
    >
      <SingleCard
        key={generateUniqueId()}
        img={book.img}
        title={book.title}
        price={book.price.toFixed(2)}
        btnSeeMore={<i className="bi bi-three-dots"></i>}
        category={book.category}
        asin={book.asin}
        xsHeight={width <= 576}
      />
    </Col>
  ));

  const renderErrorMsg = () => {
    if (filteredBooks.length === 0 && query !== "") {
      return (
        <Alert
          variant="danger"
          className="mt-5 mx-5"
          style={{ maxWidth: "700px" }}
          key={generateUniqueId()}
        >
          Ooops, sembra che non riesca a trovare nulla dalla tua ricerca, per favore riprova!
        </Alert>
      );
    }
    return null;
  };

  return (
    <>
      <Container
        className={`mainContainer  ${
          theme === "light" ? "bg-light" : "bg-dark text-light"
        }`}
        key={generateUniqueId()}
      >
        <Row key={generateUniqueId()}>
          <Col xs={12} sm={8} className="m-0 booksContainer" key={generateUniqueId()}>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <div className="mainContainer-scrollable" key={generateUniqueId()}>
                <Row className="g-5" key={generateUniqueId()}>
                  {renderBooks}
                  {renderErrorMsg()}
                </Row>
              </div>
            )}
          </Col>
          {width <= 576 ? (
            <>
              <Offcanvas
                onHide={handleCloseCanvass}
                show={show}
                className={`${
                  theme === "light" ? "bg-light" : "bg-dark text-light"
                }`}
              >
                <Offcanvas.Header closeButton></Offcanvas.Header>
                <Offcanvas.Body>
                  <CommentArea />
                </Offcanvas.Body>
              </Offcanvas>
            </>
          ) : (
            <Col
              xs={12}
              sm={4}
              className="m-0 commentsContainer"
              key={generateUniqueId()}
            >
              <div className="commentsContainer-scrollable" key={generateUniqueId()}>
                <CommentArea />
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </>
  );
};

export default AllBooks;
