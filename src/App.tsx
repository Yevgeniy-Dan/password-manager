import React, { useEffect } from "react";
import { useAppDispatch } from "./hooks/redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import { getCurrentUser } from "./store/auth-actions";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./pages/Layout";
import RequireAuth from "./pages/RequireAuth";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="login" />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        <Route
          path="dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
