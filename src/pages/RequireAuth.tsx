import { useAppSelector } from "../hooks/redux";
import { Navigate, useLocation } from "react-router-dom";
import React from "react";

const RequireAuth: React.FC<React.PropsWithChildren> = ({ children }) => {
  const auth = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (auth.loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {auth.isAuthenticated ? (
        children
      ) : (
        <Navigate to="/" replace state={{ from: location }} />
      )}
    </>
  );
};

export default RequireAuth;
