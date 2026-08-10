import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  theme: false,
  openLogin:false
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
    
    darkTheme:(state)=>{
        state.theme=true;
    },
    lightTheme:(state)=>{
        state.theme=false;
    },
    setOpenLogin:(state,action)=>{
       state.openLogin= action.payload;
    },

  }
});

export const {showLoading,hideLoading,darkTheme,lightTheme,setOpenLogin,setCloseLogin} =
  CommonStatesSlice.actions;

export default CommonStatesSlice.reducer;