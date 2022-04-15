import { configureStore } from '@reduxjs/toolkit';
import adminReducer from "./adminSlice";
import authReducer from "./authSlice";
import coursesReducer from "./coursesSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
    courses: coursesReducer
  },
});