import React, { createContext, useState } from 'react';
import generateUniqueId from '../generator/IDgenerator';

const OnCartContext = createContext();

const OnCartProvider = ({ children }) => {
  const [onCart, setOnCart] = useState([]);

  const handleSelectOnCart = (item) => {
    const productId = generateUniqueId(); 
    setOnCart(prevCart => [...prevCart, { ...item, id: productId }]);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = onCart.filter(item => item.id !== productId);
    setOnCart(updatedCart);
  };

  return (
    <OnCartContext.Provider value={{ onCart, handleSelectOnCart, handleRemoveFromCart }}>
      {children}
    </OnCartContext.Provider>
  );
};

export { OnCartContext, OnCartProvider };
