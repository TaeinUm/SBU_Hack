import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    // user: localStorage.getItem("user")
    // ? JSON.parse(localStorage.getItem("user"))
    // : null,
  },
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload));
      console.log(action.payload);
    },
    logout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },
  },
});

export default authSlice.reducer;
export const { setCredentials, logout } = authSlice.actions;
