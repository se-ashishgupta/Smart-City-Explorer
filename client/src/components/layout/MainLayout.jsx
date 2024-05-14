import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className=" text-blue-gray-400 pt-20  bg-gray-100">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
