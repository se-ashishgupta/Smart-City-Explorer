import axios from "axios";
import { getItemFromStore } from "../utils";
import { store } from "../redux/store";
import toast from "react-hot-toast";
import { logoutThunkMiddleware } from "../redux/features/user";

const getToken = () => {
  return getItemFromStore("ayurveda");
};

const setCustomizedHeaders = (contentType = "application/json") => {
  const token = getToken();
  return {
    "Content-Type": contentType,
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const createAxiosInstance = (config = {}) => {
  const {
    base = import.meta.env.VITE_SERVER_URL,
    initialLoader = false,
    showAlert = true,
  } = config;

  const axiosInstance = axios.create({
    baseURL: base,
    headers: setCustomizedHeaders(),
    credentials: "include",
    ...config,
  });

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (requestConfig) => {
      const contentType =
        requestConfig.headers["Content-Type"] || "application/json";
      requestConfig.headers = setCustomizedHeaders(contentType);
      return requestConfig;
    },
    (error) => Promise.reject(error)
  );

  let hasForbiddenErrorOccurred = false;
  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => response,

    async (error) => {
      console.log(error);

      if (error.response?.status === 403 && !hasForbiddenErrorOccurred) {
        hasForbiddenErrorOccurred = true;
        // toast.error("Token Expired, Login Now!");
        store.dispatch(logoutThunkMiddleware());
      } else if (hasForbiddenErrorOccurred) {
        return new Promise(() => {}); // This creates a promise that neither resolves nor rejects, effectively halting further processing.
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default createAxiosInstance;
