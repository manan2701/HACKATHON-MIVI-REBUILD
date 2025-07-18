import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import { BrowserRouter } from "react-router-dom";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
        <SmoothScroll>
          <App />
        </SmoothScroll>  
    </BrowserRouter>
  </StrictMode>
);
