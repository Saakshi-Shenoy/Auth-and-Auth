import { useEffect, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import useAxios from "../hooks/useAxios";

export default function OAuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const api = useAxios();


  useEffect(() => {
    const handleOAuth = async () => {
      const token = searchParams.get("token");

      if (!token) {
        navigate("/login");
        return;
      }

      // Fetch real user profile
      const res = await api.get("/auth/me");

      login({
        accessToken: token,
        user: res.data
      });

      // Redirect based on role
      if (res.data.role === "admin") navigate("/admin/dashboard");
      else if (res.data.role === "manager") navigate("/manager/analytics");
      else navigate("/user/home");
    };

    handleOAuth();
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, login, navigate]);

  return (
    <div style={{ padding: 40 }}>
      <h2>Signing you in with Google...</h2>
    </div>
  );
}
