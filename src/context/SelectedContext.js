import React, { createContext, useState } from "react";

const SelectedContext = createContext();

const SelectedProvider = ({ children }) => {
  const [selected, setSelected] = useState({ asin: "", title: "" });
  // console.log(selected);

  const handleSelect = (asin, title) => {
    setSelected({ asin, title });
  };

  return (
    <SelectedContext.Provider value={{ selected, handleSelect }}>
      {children}
    </SelectedContext.Provider>
  );
};

export { SelectedContext, SelectedProvider };