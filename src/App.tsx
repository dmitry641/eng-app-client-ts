import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AppRouter } from "./components/app/AppRouter";
import { Loader } from "./components/misc/Loader";
import { useAppDispatch } from "./hooks/useAppDispatch";
import { useAppSelector } from "./hooks/useAppSelector";
import { useTheme } from "./hooks/useTheme";
import { appInit } from "./redux/actions/app-actions";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  useEffect(() => {
    dispatch(appInit());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      />
      <AppComponent />
    </ThemeProvider>
  );
};

const AppComponent = () => {
  const app = useAppSelector((state) => state.app);
  if (app.loading === null) return null; // logo
  if (app.loading) return <Loader />;
  if (app.redirect) return <Navigate to={app.redirect} />;
  return <AppRouter />;
};

export default App;
