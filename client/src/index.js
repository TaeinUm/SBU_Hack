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
import "bootstrap-icons/font/bootstrap-icons.css";

import { RecoilRoot } from 'recoil';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);

reportWebVitals();
