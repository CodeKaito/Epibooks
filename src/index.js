import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import { SelectCategoryProvider } from "./context/SelectCategoryContext";
import { ThemeProvider } from "./context/ThemeContext";
import { SelectedProvider } from "./context/SelectedContext";
import { OffCanvassProvider } from "./context/OffCanvassContext";

ReactDOM.render(
  <React.StrictMode>
      <SelectCategoryProvider>
        <ThemeProvider>
          <SelectedProvider>
            <OffCanvassProvider>
              <App />
            </OffCanvassProvider>
          </SelectedProvider>
        </ThemeProvider>
      </SelectCategoryProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
