import { createRoot } from "react-dom/client";
import "./main.css";
import React, { Suspense, lazy } from "react";
const App = lazy(() => import("./App.jsx"));
const LenisWrapper = lazy(() => import("./components/LenisWrapper.jsx"));
const ToastContainer = lazy(() => import("./components/ui/CustomToast.jsx").then(mod => ({ default: mod.ToastContainer })));
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Suspense fallback={null}>
        <LenisWrapper>
          <Suspense fallback={null}>
            <App />
          </Suspense>
          <Suspense fallback={null}>
            <ToastContainer />
          </Suspense>
        </LenisWrapper>
      </Suspense>
    </BrowserRouter>
  </Provider>
);
