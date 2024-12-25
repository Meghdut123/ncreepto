import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App";


ReactDOM.render(
  <BrowserRouter>
    <App /> {/* Wrap your App component with BrowserRouter */}
  </BrowserRouter>,
  document.getElementById("root")
);
