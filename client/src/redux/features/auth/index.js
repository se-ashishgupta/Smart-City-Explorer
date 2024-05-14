import { createSlice } from "@reduxjs/toolkit";
import { getItemFromStore, setItemToStore } from "../../../utils";

const initialState = {
  token: getItemFromStore("smartcityexplorer") || null,
  isAuthenticated: !!getItemFromStore("smartcityexplorer"),
  role:
    (getItemFromStore("smartcityexplorer") && getItemFromStore("role")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      const { token, isAuthenticated, role } = action.payload;
      state.token = token;
      state.isAuthenticated = isAuthenticated;
      state.role = role;

      setItemToStore("smartcityexplorer", token);
      setItemToStore("role", role);
    },
  },
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
