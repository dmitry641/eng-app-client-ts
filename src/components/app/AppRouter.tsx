import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes, RoutesEnum } from "../../routes";
import { RedirectHandler } from "../misc/RedirectHandler";

export const AppRouter: React.FC = () => {
  const user = { isAuth: true }; // FIXME
  const routes = user.isAuth ? privateRoutes : publicRoutes;

  return (
    <>
      {user.isAuth && <AuthComponents />}
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
        <Route
          path="*"
          element={
            <Navigate to={user.isAuth ? RoutesEnum.HOME : RoutesEnum.SINGIN} />
          }
        />
      </Routes>
    </>
  );
};

const AuthComponents: React.FC = () => {
  return (
    <>
      {/* <ReduxInit /> FIXME */}
      <RedirectHandler />
    </>
  );
};
