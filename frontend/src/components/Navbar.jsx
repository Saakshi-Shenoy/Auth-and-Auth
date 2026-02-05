import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

export default function Navbar() {
  const { user, logout, accessToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post(
        "/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }
      );
    } catch (err) {
      console.log("Logout error:", err.response?.data);
    }

    logout(); // clear frontend state
    navigate("/login");
  };

  return (
    <nav style={{ padding: 20, background: "#eee" }}>
      <Link to="/admin/dashboard">Dashboard</Link> |{" "}
      <Link to="/admin/users">Users</Link> |{" "}
      <Link to="/admin/logs">Audit Logs</Link>

      {(user?.role === "manager" || user?.role === "admin") && (
        <>
          {" | "}
          <Link to="/manager/analytics">Manager Analytics</Link>
        </>
      )}

      {/* Logout Button */}
      {user && (
        <>
          {" | "}
          <button
            onClick={handleLogout}
            style={{
              marginLeft: 10,
              padding: "6px 12px",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
