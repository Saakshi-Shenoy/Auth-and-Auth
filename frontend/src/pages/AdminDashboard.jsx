import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function AdminDashboard() {
  const { accessToken } = useContext(AuthContext);

  const [stats, setStats] = useState(null);
  const [recentLogins, setRecentLogins] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      // Fetch stats
      const statsRes = await API.get("/admin/stats", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      setStats(statsRes.data);

      // Fetch recent login logs
      const logsRes = await API.get("/admin/recent-logins", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      setRecentLogins(logsRes.data);
    };

    fetchDashboardData();
  }, [accessToken]);

  return (
    <div>
      <Navbar />

      <div style={{ padding: 30 }}>
        <h1 style={{ fontSize: 28 }}>Admin Dashboard</h1>
        <p>Welcome back! Here’s an overview of your system.</p>

        {/* Stats Cards */}
        {stats && (
          <div
            style={{
              display: "flex",
              gap: 20,
              marginTop: 30
            }}
          >
            <div style={cardStyle}>
              <h2>Total Users</h2>
              <p style={numberStyle}>{stats.totalUsers}</p>
            </div>

            <div style={cardStyle}>
              <h2>Total Admins</h2>
              <p style={numberStyle}>{stats.totalAdmins}</p>
            </div>

            <div style={cardStyle}>
              <h2>Total Managers</h2>
              <p style={numberStyle}>{stats.totalManagers}</p>
            </div>
          </div>
        )}

        {/* Recent Logins */}
        <div style={{ marginTop: 50 }}>
          <h2>Recent Login Activity</h2>

          {recentLogins.length === 0 ? (
            <p>No recent logins found.</p>
          ) : (
            recentLogins.map((log) => (
              <div
                key={log._id}
                style={{
                  padding: 12,
                  marginTop: 10,
                  border: "1px solid #ddd",
                  borderRadius: 8
                }}
              >
                <strong>{log.user?.email}</strong> logged in at{" "}
                {new Date(log.createdAt).toLocaleString()}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

/* Simple Card Styling */
const cardStyle = {
  flex: 1,
  padding: 20,
  borderRadius: 12,
  border: "1px solid #ddd",
  background: "#fafafa",
  textAlign: "center"
};

const numberStyle = {
  fontSize: 32,
  fontWeight: "bold",
  marginTop: 10
};
