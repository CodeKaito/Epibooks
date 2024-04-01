import React, { createContext, useState, useEffect } from 'react';
import generateUniqueId from '../generator/IDgenerator';

const OnCartContext = createContext();

const OnCartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem('cart')) || [];
  const [onCart, setOnCart] = useState(initialCart);

  const initialCartCount = JSON.parse(localStorage.getItem('cartCount')) || 0;
  const [onCartCount, setOnCartCount] = useState(initialCartCount);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(onCart));
    localStorage.setItem('cartCount', JSON.stringify(onCartCount));
  }, [onCart, onCartCount]);

  const handleSelectOnCart = (item) => {
    const existingProductIndex = onCart.findIndex(cartItem => cartItem.id === item.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...onCart];
      updatedCart[existingProductIndex].count += 1;
      setOnCart(updatedCart);
    } else {
      const productId = generateUniqueId();
      setOnCart(prevCart => [...prevCart, { ...item, id: productId, count: 1 }]);
    }

    setOnCartCount(prevCount => prevCount + 1);
  };

  const handleRemoveFromCart = (productId) => {
    const existingProductIndex = onCart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
      const updatedCart = [...onCart];
      if (updatedCart[existingProductIndex].count === 1) {
        updatedCart.splice(existingProductIndex, 1); 
      } else {
        updatedCart[existingProductIndex].count -= 1;
      }
      setOnCart(updatedCart);
      setOnCartCount(prevCount => prevCount - 1); 
    }
  };

  const handleClearCart = () => {
    setOnCart([]);
    setOnCartCount(0);
  };

  return (
    <OnCartContext.Provider value={{ onCart, setOnCart, handleSelectOnCart, handleRemoveFromCart, onCartCount, handleClearCart }}>
      {children}
    </OnCartContext.Provider>
  );
};

export { OnCartContext, OnCartProvider };
