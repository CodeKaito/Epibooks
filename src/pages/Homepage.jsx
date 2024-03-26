import React, { useContext } from "react";

import MyNav from "../components/navigationBar/MyNav";
import Welcome from "../components/MainContent/Welcome/Welcome";
import LatestReleases from "../components/MainContent/LatestReleases/LatestReleases";
import MyFooter from "../components/MyFooter/MyFooter";

import { QueryProvider } from "../context/QueryContext";
import { ThemeContext } from "../context/ThemeContext";

const Homepage = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <QueryProvider>
      <div
        className={`${theme === "light" ? "bg-light" : "bg-dark text-light"}`}
      >
        <MyNav />
        <Welcome />
        <LatestReleases />
        <MyFooter />
      </div>
    </QueryProvider>
  );
};

export default Homepage;