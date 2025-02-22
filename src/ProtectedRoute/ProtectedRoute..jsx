import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Check if the user is authenticated (you can change this logic based on your app)

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" />;
  }

  // Render the protected component if authenticated
  return children;
};

export default ProtectedRoute;
