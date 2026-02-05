import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" />;

  // If roles array is provided, enforce it
  if (roles && !roles.includes(user.role)) {
    return <h2 style={{ padding: 30 }}>Access Denied ❌</h2>;
  }

  return children;
}
