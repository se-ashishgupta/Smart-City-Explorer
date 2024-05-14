import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setToken } from "../../redux/features/auth";
import { setUser } from "../../redux/features/user";
import { jwtDecode } from "jwt-decode";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const GoogleLoginHandler = async () => {
    const token = new URLSearchParams(location.search).get("token");
    const user = await jwtDecode(token).user;
    dispatch(
      setToken({ isAuthenticated: true, token: token, role: user.role })
    );
    dispatch(setUser({ user }));
    navigate("/");
    alert("Login Successfully");
  };

  useEffect(() => {
    GoogleLoginHandler();
  }, []);

  return <></>;
};

export default Auth;
