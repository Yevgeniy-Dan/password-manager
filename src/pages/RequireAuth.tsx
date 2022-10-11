import { useAppSelector } from "../hooks/redux";
import { Navigate, useLocation } from "react-router-dom";
import React from "react";

const RequireAuth: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RequireAuth;
