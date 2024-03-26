import React from "react";

import MyNav from "../components/navigationBar/MyNav";
import MyFooter from "../components/MyFooter/MyFooter";

import { QueryProvider } from "../context/QueryContext";
import { SelectedProvider } from "../context/SelectedContext";

import NotFound from "../components/NotFound/NotFound";

const ErrorPage = () => {
  return (
    <>
      <QueryProvider>
        <SelectedProvider>
          <MyNav />
          <NotFound />
          <MyFooter />
        </SelectedProvider>
      </QueryProvider>
    </>
  );
};

export default ErrorPage;