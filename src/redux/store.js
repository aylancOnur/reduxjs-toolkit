import { configureStore } from "@reduxjs/toolkit";
import serviceReducer from "./services/serviceSlice";

export default configureStore({
  reducer: {
    services: serviceReducer,
  },
});
