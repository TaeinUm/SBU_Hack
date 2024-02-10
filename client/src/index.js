import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";

import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import router from "./router.js";
import store from "./store/index.js";

import { ThemeProvider } from '@mui/material/styles';
import theme from './utils/theme.js'; // Import the theme


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
