import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import { AuthProvider } from "./context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
  <App />
</AuthProvider>

);
