import React from "react";
import Mainroutes from "./routes/Mainroutes.jsx";
import { useDispatch } from "react-redux";
import { asyncCurrentUser } from "./store/actions/userActions.jsx";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncCurrentUser())
  }, []);

  return (
    <div>
      <Mainroutes/>
    </div>
  );
};

export default App;
