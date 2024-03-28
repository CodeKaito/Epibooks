import React, { createContext, useState } from "react";

const OnCartContext = createContext();

const OnCartProvider = ({ children }) => {
  const [onCart, setOnCart] = useState([]);

  const handleSelectOnCart = (item) => {
    setOnCart(prevCart => [
      ...prevCart,
      item
    ]);
  };

  return (
    <OnCartContext.Provider value={{ onCart, handleSelectOnCart }}>
      {children}
    </OnCartContext.Provider>
  );
};

export { OnCartContext, OnCartProvider };
