import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Navbar from "../components/layout/Navbar";
import MainLayout from "../components/layout/MainLayout";
import Services from "../pages/services/Services";
import HowItWorks from "../pages/howItWorks/HowItWorks";
import ContactUs from "../pages/contactus/ContactUs";
import { getItemFromStore } from "../utils";
import { jwtDecode } from "jwt-decode";
import { logoutThunkMiddleware, setUser } from "../redux/features/user";
import { setToken } from "../redux/features/auth";
import { setMiscellaneous } from "../redux/features/miscellaneous";
import Auth from "../pages/auth/Auth";
import DashboardLayout from "../components/layout/DashboardLayout";

const Routes = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  let element = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/services",
          element: <Services />,
        },
        {
          path: "/howitworks",
          element: <HowItWorks />,
        },
        {
          path: "/contactus",
          element: <ContactUs />,
        },
        {
          path: "/:user",
          element: <DashboardLayout />,
          children: [
            {
              index: true,
              // element: <Home />
            },
          ],
        },
      ],
    },
    {
      path: "/auth",
      element: <Auth />,
    },
  ]);

  const dispatch = useDispatch();
  const { isAuthenticated, token, role } = useSelector((state) => state.auth);

  useEffect(() => {
    const checkIsUserAuthenticated = async () => {
      try {
        const token = getItemFromStore("smartcityexplorer");
        if (token) {
          const user = await jwtDecode(token).user;
          const role = user.role ? user.role : null;

          dispatch(
            setToken({
              token,
              isAuthenticated: true,
              role,
            })
          );
          dispatch(setUser({ user }));
        } else {
          dispatch(logoutThunkMiddleware());
        }
      } catch (error) {
        dispatch(logoutThunkMiddleware());
      }
    };

    checkIsUserAuthenticated();
  }, [isAuthenticated, token, role, dispatch]);

  return element;
};

export default Routes;
