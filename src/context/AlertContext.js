// AlertContext.js
import React, { createContext, useState, useContext } from 'react';

// Creazione del contesto per gli alert
const AlertContext = createContext();

// Hook personalizzato per utilizzare il contesto degli alert
export const useAlert = () => {
  return useContext(AlertContext);
};

// Provider degli alert
export const AlertProvider = ({ children }) => {
  // Stati per gli alert di successo e di errore
  const [successAlert, setSuccessAlert] = useState(null);
  const [errorAlert, setErrorAlert] = useState(null);

  // Funzione per mostrare un alert di successo
  const showSuccessAlert = (message) => {
    setSuccessAlert(message);
    // Nasconde automaticamente l'alert dopo 5 secondi
    setTimeout(() => setSuccessAlert(null), 5000);
  };

  // Funzione per mostrare un alert di errore
  const showErrorAlert = (message) => {
    setErrorAlert(message);
    // Nasconde automaticamente l'alert dopo 5 secondi
    setTimeout(() => setErrorAlert(null), 5000);
  };

  // Valori da passare al contesto degli alert
  const values = {
    showSuccessAlert,
    showErrorAlert,
  };

  return (
    <AlertContext.Provider value={values}>
      {/* Aggiungi classi di Bootstrap agli alert */}
      {successAlert && <div className="alert alert-success" role="alert">{successAlert}</div>}

      {errorAlert && <div className="alert alert-danger" role="alert">{errorAlert}</div>}

      {children}
    </AlertContext.Provider>
  );
};
