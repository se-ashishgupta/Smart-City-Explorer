import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { Button, Typography } from "@material-tailwind/react";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import About from "./About";

const Home = () => {
  return (
    <>
      <div className="home-background h-[100dvh] pt-[6rem] px-[2rem] flex items-center">
        <div
          className=" md:w-[50%] space-y-3"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          <Typography className="font-bold uppercase text-primaryColor text-2xl xsm:text-5xl">
            Smart City Explorer
          </Typography>
          <h1 className=" font-bold uppercase text-primaryColor"></h1>
          <p className=" text-lg">
            Welcome to Smart City Explorer, a web application that provides
            information and insights about cities and neighborhoods in the
            United States. Lorem ipsum, dolor sit amet consectetur adipisicing
            elit. Eaque, provident.
          </p>
          <div className="flex items-center gap-10">
            <Button
              //   variant="outlined"
              color="green"
              size="sm"
              className=" rounded-3xl border-2 py-3 flex items-center gap-1"
            >
              Get Started <BsBoxArrowInUpRight size={18} />
            </Button>
            <Button
              //   variant="outlined"
              color="black"
              size="sm"
              className=" rounded-3xl border-2 py-3 capitalize flex items-center gap-1"
            >
              Learn More <BsBoxArrowInUpRight size={18} />
            </Button>
          </div>
        </div>
      </div>
      <About />
    </>
  );
};

export default Home;
