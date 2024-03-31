import React, { createContext, useState } from 'react';
import generateUniqueId from '../generator/IDgenerator';

const OnCartContext = createContext();

const OnCartProvider = ({ children }) => {
  const [onCart, setOnCart] = useState([]);
  const [onCartCount, setOnCartCount] = useState(0); // Inizializzato a 0

  const handleSelectOnCart = (item) => {
    const existingProductIndex = onCart.findIndex(cartItem => cartItem.id === item.id);

    if (existingProductIndex !== -1) {
      const updatedCart = [...onCart];
      updatedCart[existingProductIndex].count += 1; // Incrementa il conteggio del prodotto esistente nel carrello
      setOnCart(updatedCart);
    } else {
      const productId = generateUniqueId();
      setOnCart(prevCart => [...prevCart, { ...item, id: productId, count: 1 }]);
    }

    setOnCartCount(prevCount => prevCount + 1); // Aggiorna il conteggio totale dei prodotti nel carrello
  };

  const handleRemoveFromCart = (productId) => {
    const existingProductIndex = onCart.findIndex(item => item.id === productId);
    if (existingProductIndex !== -1) {
      const updatedCart = [...onCart];
      if (updatedCart[existingProductIndex].count === 1) {
        updatedCart.splice(existingProductIndex, 1); // Rimuovi completamente il prodotto se il conteggio è 1
      } else {
        updatedCart[existingProductIndex].count -= 1; // Decrementa il conteggio del prodotto se è maggiore di 1
      }
      setOnCart(updatedCart);
      setOnCartCount(prevCount => prevCount - 1); // Aggiorna il conteggio totale dei prodotti nel carrello
    }
  };

  return (
    <OnCartContext.Provider value={{ onCart, setOnCart, handleSelectOnCart, handleRemoveFromCart, onCartCount }}>
      {children}
    </OnCartContext.Provider>
  );
};

export { OnCartContext, OnCartProvider };
