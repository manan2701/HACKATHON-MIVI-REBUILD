import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import LenisWrapper from "./components/LenisWrapper.jsx";


createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <LenisWrapper>
          <App />
        </LenisWrapper>  
    </BrowserRouter>
);
