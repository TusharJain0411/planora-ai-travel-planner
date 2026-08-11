import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  theme: false, // false = light, true = dark
  openLogin: false,
};

const CommonStatesSlice = createSlice({
  name: "commonStates",
  initialState,

  reducers: {
    showLoading: (state) => {
      state.loading = true;
    },

    hideLoading: (state) => {
      state.loading = false;
    },

    setOpenLogin: (state, action) => {
      state.openLogin = action.payload;
    },

    setTheme: (state, action) => {
      state.theme = action.payload;
    },

    toggleTheme: (state) => {
      state.theme = !state.theme;
    },
  },
});

export const { showLoading, hideLoading, setOpenLogin, setTheme, toggleTheme } =
  CommonStatesSlice.actions;

export default CommonStatesSlice.reducer;
