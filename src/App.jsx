import React from "react";
import Mainroutes from "./routes/Mainroutes.jsx";
import { useDispatch } from "react-redux";
import { asyncCurrentUser } from "./store/actions/userActions.jsx";
import { useEffect } from "react";
import { asyncGetProducts } from "./store/actions/productActions.jsx";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncCurrentUser());
    dispatch(asyncGetProducts());
    const enableScrolling = () => {
      if (window.lenisScroll) {
        window.lenisScroll.start();
        window.lenisScroll.reset?.();
      }
    };
    const timers = [
      setTimeout(enableScrolling, 1000),
      setTimeout(enableScrolling, 2000),
      setTimeout(enableScrolling, 3000),
    ];
    return () => timers.forEach(timer => clearTimeout(timer));
  }, [dispatch]);

  return <div><Mainroutes/></div>;
};

export default App;
