import React, { createContext, useState, useContext } from 'react';

// Creiamo il contesto del carrello
const CartContext = createContext();

// Creiamo il provider del carrello
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Funzione per aggiungere un elemento al carrello
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  // Funzione per rimuovere un elemento dal carrello
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  // Funzione per svuotare il carrello
  const clearCart = () => {
    setCartItems([]);
  };

  // Calcoliamo il totale del carrello
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook custom per utilizzare il contesto del carrello
export const useCart = () => {
  return useContext(CartContext);
};
