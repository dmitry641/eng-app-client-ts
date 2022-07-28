import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "../../hooks/useAppSelector";
import { privateRoutes, publicRoutes, RoutesEnum } from "../../routes";

export const AppRouter: React.FC = () => {
  const user = useAppSelector((state) => state.user);
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
            <Navigate to={user.isAuth ? RoutesEnum.HOME : RoutesEnum.SIGNIN} />
          }
        />
      </Routes>
    </>
  );
};
