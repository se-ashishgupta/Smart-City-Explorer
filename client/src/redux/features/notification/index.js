import { createSlice } from "@reduxjs/toolkit";
import createAxiosInstance from "../../../config/axiosConfig";

const axiosInstance = createAxiosInstance();
const initialState = {
  notifications: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState: initialState,
  reducers: {
    setNotification: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { setNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

export const getNotificationThunkMiddleware = () => {
  return async (dispatch) => {
    try {
      const response = await axiosInstance.get("/taskRoutes/remainderTask");

      if (response.status === 200) {
        const { taskReminder } = response.data;
        console.log(taskReminder);
        dispatch(
          setNotification({
            notifications: taskReminder,
          })
        );
      }
    } catch (error) {
      let message = "ERROR";
      if (error.hasOwnProperty("response")) {
        message = error.response.data;
      }
      toast.error(message);
    }
  };
};
