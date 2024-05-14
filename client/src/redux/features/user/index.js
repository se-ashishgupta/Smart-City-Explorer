import { createSlice } from "@reduxjs/toolkit";
import { setToken } from "../auth";
import { setMiscellaneous } from "../miscellaneous";
import { persistor } from "../../store";
import toast from "react-hot-toast";
import { setLoader } from "../loader";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();
const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "userDetails",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

export const logoutThunkMiddleware = () => {
  return async (dispatch) => {
    try {
      persistor.purge();
      localStorage.clear();
      dispatch(
        setToken({
          token: null,
          isAuthenticated: false,
          role: null,
        })
      );
      dispatch(setUser({ user: null }));
      dispatch(setMiscellaneous({ userTypeRoute: null }));
    } catch (error) {
      let message = "ERROR";
      if (error.hasOwnProperty("response")) {
        message = error.response.data;
      }
      toast.error(message);
    }
  };
};

export const changePasswordThunkMiddleware = ({ payload }, callback) => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ addLoader: true }));

      const response = await axiosInstance.post(
        "/userRoutes/resetPassword",
        payload
      );

      if (response.status === 200) {
        const message = response.data;
        await callback(null);
        dispatch(logoutThunkMiddleware());
        toast.success(`${message}, Login Now!`);
      }
    } catch (error) {
      let message = "ERROR";
      if (error.hasOwnProperty("response")) {
        message = error.response.data;
      }

      toast.error(message);
    } finally {
      dispatch(setLoader({ addLoader: false }));
    }
  };
};
