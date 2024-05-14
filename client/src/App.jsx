import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "./router";
import Navbar from "./components/layout/Navbar";
import "./app.scss";
// Animation Library
import Aos from "aos";
import "aos/dist/aos.css";

const App = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
    });
  }, []);
  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
