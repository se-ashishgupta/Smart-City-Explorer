import { createSlice } from "@reduxjs/toolkit";
import { getItemFromStore } from "../../../utils";

const initialState = {
  userTypeRoute:
    (getItemFromStore("ayurveda") && getItemFromStore("role")) || null,
  activeNav: null,
};

const leadsSlice = createSlice({
  name: "miscellaneousDetails",
  initialState: initialState,
  reducers: {
    setMiscellaneous(state, action) {
      Object.keys(action.payload).forEach((key) => {
        state[key] = action.payload[key];
      });
    },
  },
});

export const { setMiscellaneous } = leadsSlice.actions;
export default leadsSlice.reducer;
