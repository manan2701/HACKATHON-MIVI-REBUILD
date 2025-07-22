import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import LenisWrapper from "./components/LenisWrapper.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
import { ToastContainer } from "react-toastify";


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
        <LenisWrapper>
          <App />
          <ToastContainer />
        </LenisWrapper>  
    </BrowserRouter>
  </Provider>
);
