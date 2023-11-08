"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { configureStore } from "@reduxjs/toolkit";

import thunk from "redux-thunk";
import weatherReducer from "./features/weatherslice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
  middleware: [thunk],
});
