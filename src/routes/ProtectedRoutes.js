import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { PATHS } from "configs/routesConfig";
import { CheckUserExpired } from "utils/function";

const useAuth = () => {
  if (localStorage.hasOwnProperty("IS_LOGGED_IN")) {
    return JSON.parse(localStorage.getItem("IS_LOGGED_IN"));
  } else {
    return false;
  }
};

export const ProtectedRoutes = () => {
  const location = useLocation();
  useEffect(() => {
    CheckUserExpired("Protected");
  }, [location]);

  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Navigate to={PATHS.DASHBOARD} />;
};
