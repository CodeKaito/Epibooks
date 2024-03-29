import React, { useContext } from "react";
import generateUniqueId from "../../../generator/IDgenerator";

import { ThemeContext } from "../../../context/ThemeContext";

import Carousel from "react-bootstrap/Carousel";

import { welcome } from "./data/welcome";
import "./style/welcome.css";

import logo from "../../../assets/logo.png";

const Welcome = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div data-testid="welcome-component"
        key={generateUniqueId()}
        className={`container d-flex flex-column align-items-center justify-content-center jumbotron overflow-hidden ${
          theme === "light" ? "bg-light" : "bg-dark text-light"
        }`}
      >
        <h1 key={generateUniqueId()} className="jumbotron_title">
          EpiBooks
          <img src={logo} alt="EpiBooks_logo" />
        </h1>
        <article key={generateUniqueId()} className="jumbotron_subtitle">
          Where Every Request Finds its Perfect Solution!
        </article>

        <Carousel fade key={generateUniqueId()}>
          {welcome.map((item) => {
            return (
              <Carousel.Item key={generateUniqueId()} className={item.className}>
                {<img src={item.src} alt={item.alt} className="carouselImg" />}
                <Carousel.Caption key={generateUniqueId()}>
                  <h2>{item.captionTitle}</h2>
                  <p>{item.captionDesc}</p>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </>
  );
};

export default Welcome;