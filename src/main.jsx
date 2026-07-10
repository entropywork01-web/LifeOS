import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import LifeOSProvider from "./context/LifeOSContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LifeOSProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LifeOSProvider>
  </StrictMode>
);