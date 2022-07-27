import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes, RoutesEnum } from "../../routes";

export const AppRouter: React.FC = () => {
  const user = { isAuth: true }; // FIXME
  const routes = user.isAuth ? privateRoutes : publicRoutes;

  return (
    <>
      <Routes>
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
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
