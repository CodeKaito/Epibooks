import React from "react";
import { leftFooterPanelLinks, rightFooterPanelLinks } from "./data/myfooter";
import generateUniqueId from "../../generator/IDgenerator";
import './myfooter.css'

const MyFooter = () => {
  return (
    <footer className="footer page-footer font-small pt-4 bg-dark text-light mt-5 overflow-hidden">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <h5 className="text-uppercase">EpiBooks</h5>
            <p>Where Every Request Finds its Perfect Solution!</p>
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled">
              {leftFooterPanelLinks.map((link, index) => {
                return (
                  <a href="/" key={generateUniqueId()} className="footer-anchor">
                    <li key={index}>{link.title}</li>
                  </a>
                );
              })}
            </ul>
          </div>

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Links</h5>
            <ul className="list-unstyled">
              {rightFooterPanelLinks.map((link, index) => {
                return (
                  <a href="/" key={generateUniqueId()} className="footer-anchor">
                    <li key={index}>{link.title}</li>
                  </a>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-copyright text-center py-3">
        © 2023 Copyright:
        <a href="/" className="footer-anchor"> EpiBooks.com</a>
      </div>
    </footer>
  );
};

export default MyFooter;
