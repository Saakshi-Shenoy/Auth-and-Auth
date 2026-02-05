import { useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/forgot-password", {
        email
      });

      setMessage(res.data.message);
    } catch (err) {
      setMessage("Something went wrong.");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Forgot Password</h1>

      <form onSubmit={handleForgot}>
        <input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <button type="submit">Send Reset Link</button>
      </form>

      <p style={{ marginTop: 20, color: "green" }}>{message}</p>

      <br />
      <Link to="/login">Back to Login</Link>
    </div>
  );
}
