import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/lottie/About1.json";
import { Button, Typography } from "@material-tailwind/react";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
const About = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex md:flex-row flex-col-reverse flew gap-4 p-2 md:p-4 ">
      <div
        className="md:w-[50%] flex flex-col gap-2  justify-center px-4 md:px-10 py-4"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <Typography className=" font-bold text-3xl md:text-5xl text-primaryColor">
          Smart City Explorer...
        </Typography>
        <p>
          Smart City Explorer is a comprehensive platform aimed at enhancing
          urban living by providing real-time, location-based information on
          various city services and amenities. The platform integrates city-wide
          data into an easily accessible, user-friendly web application that
          helps residents and visitors navigate the city more efficiently,
          access essential services, and participate in community activities.
        </p>
        <Link to={"/about"} className="py-4">
          <Button className=" w-fit flex items-center gap-2">
            Know More <BsBoxArrowInUpRight size={18} />
          </Button>
        </Link>
      </div>
      <div
        className="flex-1 flex items-center justify-center lottie-container"
        data-aos="fade-left"
        data-aos-delay="300"
      >
        <Lottie options={defaultOptions} />
      </div>
    </div>
  );
};

export default About;
