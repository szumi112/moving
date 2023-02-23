import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ImageGallery from "./image";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    <ImageGallery />
  </React.StrictMode>
);
