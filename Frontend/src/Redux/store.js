import { configureStore } from "@reduxjs/toolkit";

import commonStatesReducer from "./Slice/CommonStatesSlice"
import userReducer from "./Slice/userSlice"
import tripReducer from "./slice/tripSlice";

const store = configureStore({
  reducer: {
   commonStates:commonStatesReducer,
   user:userReducer,
   trip:tripReducer,
   
  },
});

export default store;
