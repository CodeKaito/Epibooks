import React, { createContext, useState } from "react";

const QueryContext = createContext();

const QueryProvider = ({ children }) => {
  const [query, setQuery] = useState("");

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

export { QueryContext, QueryProvider };