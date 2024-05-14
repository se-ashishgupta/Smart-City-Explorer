import React from "react";
import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = () => {
  return (
    <>
      <div className="h-[100dvh] flex gap-2 py-6 px-4 ">
        <div
          className="gradient-background w-[16rem] rounded-lg shadow-lg p-4"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          <DashboardSidebar />
        </div>
        <div
          className=" bg-white shadow-lg flex-1 rounded-xl p-4"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          Ashih
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
