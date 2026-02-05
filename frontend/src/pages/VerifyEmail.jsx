import { useEffect, useState } from "react";
import API from "../services/api";
import { useSearchParams, Link } from "react-router-dom";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [message, setMessage] = useState("Verifying your email...");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setMessage("Verification token missing.");
        setStatus("error");
        return;
      }

      try {
        const res = await API.get(`/auth/verify/${token}`);
        setMessage(res.data.message);
        setStatus("success");
      } catch (err) {
        setMessage("Token invalid or expired.");
        setStatus("error");
      }
    };

    verify();
  }, [token]);

  return (
    <div style={{ padding: 40 }}>
      <h1>Email Verification</h1>

      <p style={{ marginTop: 20, fontSize: 18 }}>
        {message}
      </p>

      {status === "success" && (
        <p style={{ color: "green" }}>
          ✅ Your account is now verified!
        </p>
      )}

      {status === "error" && (
        <p style={{ color: "red" }}>
          ❌ Verification failed.
        </p>
      )}

      <br />
      <Link to="/login">Go to Login</Link>
    </div>
  );
}
