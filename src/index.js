import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./Css/components/loading.css";
import "./Css/components/button.css";
import "./Css/components/alerts.css";
import "./Css/components/google.css";
import "./Pages/Auth/Auth.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import MenuContext from "./Context/MenuContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <MenuContext>
      <Router>
      <App />
    </Router>
    </MenuContext>
  </React.StrictMode>
);
