import { useContext, useEffect } from "react";
import API from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useAxios = () => {
  const { accessToken, setAccessToken, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    //Request interceptor → attach token
    const reqInterceptor = API.interceptors.request.use(
      (config) => {
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor → handle 401
    const resInterceptor = API.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // avoid infinite loop
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            // call refresh endpoint
            const res = await API.post("/auth/refresh");

            const newAccessToken = res.data.accessToken;

            // update context
            setAccessToken(newAccessToken);

            // retry original request
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return API(originalRequest);
          } catch (err) {
            // refresh failed → logout
            logout();
            navigate("/login");
          }
        }

        return Promise.reject(error);
      }
    );

    // cleanup interceptors
    return () => {
      API.interceptors.request.eject(reqInterceptor);
      API.interceptors.response.eject(resInterceptor);
    };
  }, [accessToken, setAccessToken, logout, navigate]);

  return API;
};

export default useAxios;