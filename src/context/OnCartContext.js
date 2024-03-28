import React, { createContext, useState } from 'react';

const OnCartContext = createContext();

const OnCartProvider = ({ children }) => {
  const [onCart, setOnCart] = useState([]);

  const handleSelectOnCart = (item) => {
    setOnCart(prevCart => [...prevCart, item]);
  };

  const handleRemoveFromCart = (asin) => {
    const updatedCart = onCart.filter(item => item.asin !== asin);
    setOnCart(updatedCart);
  };

  return (
    <OnCartContext.Provider value={{ onCart, handleSelectOnCart, handleRemoveFromCart }}>
      {children}
    </OnCartContext.Provider>
  );
};

export { OnCartContext, OnCartProvider };
