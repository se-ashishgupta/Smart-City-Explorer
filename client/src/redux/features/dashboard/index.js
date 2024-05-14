import { createSlice } from "@reduxjs/toolkit";
import createAxiosInstance from "../../../config/axiosConfig";
import { setLoader } from "../loader";
import toast from "react-hot-toast";

const axiosInstance = createAxiosInstance();
const initialState = {
  dailyLead: null,
  weeklyLead: null,
  monthlyLead: null,

  monthClosure: null,
  monthWiseLead: null,

  salesExecutiveTeam: null,
};

const dashboardSlice = createSlice({
  name: "dashboardDetails",
  initialState: initialState,
  reducers: {
    setDashboard: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { setDashboard } = dashboardSlice.actions;
export default dashboardSlice.reducer;

export const dashboardStatsThunkMiddleware = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ dashboardStatsLoader: true }));

      const response = await axiosInstance.get("/dashboardRoutes/leadReport");

      if (response) {
        const { dailyLead, weeklyLead, monthlyLead } = response.data;
        dispatch(
          setDashboard({
            dailyLead,
            weeklyLead,
            monthlyLead,
          })
        );
      }
    } catch (error) {
      let message = "ERROR";
      if (error.hasOwnProperty("response")) {
        message = error.response.data;
      }
      toast.error(message);
    } finally {
      dispatch(setLoader({ dashboardStatsLoader: false }));
    }
  };
};

export const dashboardMonthWiseLeadsAndClosureThunkMiddleware = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ dashboardChartLoader: true }));

      const response = await axiosInstance.get("/dashboardRoutes/monthClosure");

      if (response.status === 200) {
        const monthClosure = response.data;
        dispatch(
          setDashboard({
            monthClosure,
          })
        );

        const response1 = await axiosInstance.get(
          "/dashboardRoutes/monthWiseLead"
        );

        if (response1.status === 200) {
          const monthWiseLead = response1.data;
          dispatch(
            setDashboard({
              monthWiseLead,
            })
          );
        }
      }
    } catch (error) {
      let message = "ERROR";
      if (error.hasOwnProperty("response")) {
        message = error.response.data;
      }
      toast.error(message);
    } finally {
      dispatch(setLoader({ dashboardChartLoader: false }));
    }
  };
};

export const dashboardTeamsThunkMiddleware = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoader({ dashboardListLoader: true }));

      const response = await axiosInstance.get("/dashboardRoutes/employees");

      if (response.status === 200) {
        const salesExecutiveTeam = response.data;
        dispatch(
          setDashboard({
            salesExecutiveTeam,
          })
        );
      }
    } catch (error) {
      let message = "ERROR";
      if (error.hasOwnProperty("response")) {
        message = error.response.data;
      }
      toast.error(message);
    } finally {
      dispatch(setLoader({ dashboardListLoader: false }));
    }
  };
};
