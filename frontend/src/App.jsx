import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import UsersPage from "./pages/UsersPage";
import LogsPage from "./pages/LogsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import ManagerAnalytics from "./pages/ManagerAnalytics";
import UserHome from "./pages/UserHome";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import RegisterPage from "./pages/RegisterPage";
import VerifyEmail from "./pages/VerifyEmail";
import OAuthSuccess from "./pages/OAuthSuccess";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="/verify-email" element={<VerifyEmail />} />

        <Route path="/oauth-success" element={<OAuthSuccess />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/users"
          element={
            <ProtectedRoute role="admin">
              <UsersPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/logs"
          element={
            <ProtectedRoute role="admin">
              <LogsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/login" />} />

        <Route
          path="/manager/analytics"
          element={
            <ProtectedRoute roles={["admin", "manager"]}>
              <ManagerAnalytics />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/home"
          element={
            <ProtectedRoute roles={["user", "admin", "manager"]}>
              <UserHome />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

      </Routes>
    </BrowserRouter>
  );
}
