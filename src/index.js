import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import { SelectCategoryProvider } from "./context/SelectCategoryContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SelectedProvider } from "./context/SelectedContext";
import { OffCanvassProvider } from "./context/OffCanvassContext";
import { CartProvider } from "./context/CartContext";

ReactDOM.render(
  <React.StrictMode>
    <CartProvider>
      <SelectCategoryProvider>
        <ThemeProvider>
          <SelectedProvider>
            <OffCanvassProvider>
              <App />
            </OffCanvassProvider>
          </SelectedProvider>
        </ThemeProvider>
      </SelectCategoryProvider>
    </CartProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
