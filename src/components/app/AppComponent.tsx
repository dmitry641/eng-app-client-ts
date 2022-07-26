import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Loader } from "../misc/Loader";
import { AppRouter } from "./AppRouter";

interface AppComponentProps {
  loading: boolean;
}

export const AppComponent: React.FC<AppComponentProps> = ({ loading }) => {
  if (loading) return <Loader />;
  return (
    <BrowserRouter>
      {/* <Notifier /> FIXME */}
      <AppRouter />
    </BrowserRouter>
  );
};
