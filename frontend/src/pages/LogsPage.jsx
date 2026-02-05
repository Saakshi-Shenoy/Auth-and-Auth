import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await API.get("/admin/logs", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      setLogs(res.data);
    };

    fetchLogs();
  }, [accessToken]);

  return (
    <div>
      <Navbar />
      <h2 style={{ padding: 20 }}>Audit Logs</h2>

      {logs.map((log) => (
        <div key={log._id} style={{ padding: 10 }}>
          {log.action} — {log.user?.email} —{" "}
          {new Date(log.createdAt).toLocaleString()}
        </div>
      ))}
    </div>
  );
}
