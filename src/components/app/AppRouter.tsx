import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../../hooks/useAppSelector";
import { privateRoutes, publicRoutes, RoutesEnum } from "../../routes";
import { ModulesInit } from "./ModulesInit";

export const AppRouter: React.FC = () => {
  const user = useAppSelector((state) => state.user);
  const routes = user.isAuth ? privateRoutes : publicRoutes;

  return (
    <>
      {user.isAuth && <ModulesInit />}
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
