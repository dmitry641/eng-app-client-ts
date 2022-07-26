import React from "react";
import { Navigate } from "react-router-dom";

export const RedirectHandler: React.FC = () => {
  const app = { redirectTo: "" }; // FIXME

  if (app.redirectTo) {
    return <Navigate to={app.redirectTo} />;
  }
  return null;
};
