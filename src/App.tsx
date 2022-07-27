import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AppRouter } from "./components/app/AppRouter";
import { Loader } from "./components/misc/Loader";
import { useActions } from "./hooks/useActions";
import { useAppSelector } from "./hooks/useAppSelector";

let counter = 0;

const App: React.FC = () => {
  const app = useAppSelector((state) => state.app);

  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(appActions.appSetLoading(false));
  //   }, 3000);
  // }, [dispatch]);

  const { appSetLoading } = useActions();
  useEffect(() => {
    setTimeout(() => {
      appSetLoading(false);
    }, 3000);
  }, [appSetLoading]);

  console.log(counter++);

  if (app.loading) return <Loader />;
  if (app.redirect) return <Navigate to={app.redirect} />;
  return <AppRouter />;
};

export default App;
