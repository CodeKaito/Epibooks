import React, { createContext, useState } from "react";

const OffCanvassContext = createContext();

const OffCanvassProvider = ({ children }) => {
  const [show, setShow] = useState(false);

  return (
    <OffCanvassContext.Provider value={{ show, setShow }}>
      {children}
    </OffCanvassContext.Provider>
  );
};

export { OffCanvassContext, OffCanvassProvider };