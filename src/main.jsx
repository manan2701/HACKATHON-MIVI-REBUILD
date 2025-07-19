import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import LenisWrapper from "./components/LenisWrapper.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
        <LenisWrapper>
          <App />
        </LenisWrapper>  
    </BrowserRouter>
  </StrictMode>
);
