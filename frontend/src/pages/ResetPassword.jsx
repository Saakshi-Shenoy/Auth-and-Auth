import { useState } from "react";
import API from "../services/api";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(`/auth/reset-password/${token}`, {
        password
      });

      setMessage(res.data.message);

      // Redirect to login after success
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage("Invalid or expired reset token.");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Reset Password</h1>

      {!token ? (
        <p>Reset token missing.</p>
      ) : (
        <form onSubmit={handleReset}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <br /><br />

          <button type="submit">Reset Password</button>
        </form>
      )}

      <p style={{ marginTop: 20, color: "blue" }}>{message}</p>
    </div>
  );
}
