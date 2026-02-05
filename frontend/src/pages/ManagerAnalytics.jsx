import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function ManagerAnalytics() {
  const { accessToken } = useContext(AuthContext);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await API.get("/manager/analytics", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setMessage(res.data.message);
      } catch (error) {
        setMessage("Access denied or error fetching analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [accessToken]);

  return (
    <div>
      <Navbar />

      <div style={{ padding: 30 }}>
        <h1 style={{ fontSize: 28 }}>Manager Analytics</h1>

        {loading ? (
          <p>Loading analytics...</p>
        ) : (
          <div
            style={{
              marginTop: 20,
              padding: 20,
              borderRadius: 12,
              border: "1px solid #ddd",
              background: "#f9f9f9"
            }}
          >
            <h2>Status</h2>
            <p style={{ fontSize: 18 }}>{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
