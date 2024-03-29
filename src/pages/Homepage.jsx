import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import MyNav from "../components/navigationBar/MyNav";
import Welcome from "../components/MainContent/Welcome/Welcome";
import AllBooks from "../components/MainContent/LatestReleases/AllBooks";
import MyFooter from "../components/MyFooter/MyFooter";
import { QueryProvider } from "../context/QueryContext";

const Homepage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <QueryProvider>
      <div className={`bg-${theme === "light" ? "light" : "dark"} text-${theme === "dark" ? "light" : "dark"}`}>
        <MyNav />
        <Welcome />
        <AllBooks />
        <MyFooter />
      </div>
    </QueryProvider>
  );
};

export default Homepage;
