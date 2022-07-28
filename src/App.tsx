import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AppRouter } from "./components/app/AppRouter";
import { Loader } from "./components/misc/Loader";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";
import { appInit } from "./redux/actions/app-actions";

const App: React.FC = () => {
  const app = useAppSelector((state) => state.app);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appInit());
  }, [dispatch]);

  if (app.loading === null) return null; // logo
  if (app.loading) return <Loader />;
  if (app.redirect) return <Navigate to={app.redirect} />;
  return <AppRouter />;
};

export default App;
