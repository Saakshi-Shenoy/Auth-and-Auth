// import { useState } from "react";
// import API from "../services/api";
// import { useSearchParams, useNavigate } from "react-router-dom";

// export default function ResetPassword() {
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   const token = searchParams.get("token");

//   const handleReset = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await API.post(`/auth/reset-password/${token}`, {
//         password
//       });

//       setMessage(res.data.message);

//       // Redirect to login after success
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (err) {
//       setMessage("Invalid or expired reset token.");
//     }
//   };

//   return (
//     <div style={{ padding: 40 }}>
//       <h1>Reset Password</h1>

//       {!token ? (
//         <p>Reset token missing.</p>
//       ) : (
//         <form onSubmit={handleReset}>
//           <input
//             type="password"
//             placeholder="Enter new password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <br /><br />

//           <button type="submit">Reset Password</button>
//         </form>
//       )}

//       <p style={{ marginTop: 20, color: "blue" }}>{message}</p>
//     </div>
//   );
// }


import { useState } from "react";
import API from "../services/api";
import { useSearchParams, useNavigate, Link } from "react-router-dom";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const handleReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await API.post(`/auth/reset-password/${token}`, {
        password
      });

      setMessage(res.data.message);
      setIsSuccess(true);

      // Redirect to login after success
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMessage("Invalid or expired reset token.");
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Branding */}
      <div className="lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-8 lg:p-12">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
            AUTH
            <br />
            PLATFORM
          </h1>
          <p className="text-purple-200 text-lg lg:text-xl max-w-md">
            Secure authentication and authorization for modern applications
          </p>
        </div>
      </div>

      {/* Right Side - Reset Password Form */}
      <div className="lg:w-1/2 bg-white flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Reset Password</h2>
            <p className="text-gray-600">Enter your new password below</p>
          </div>

          {/* Success/Error Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg border ${
              isSuccess 
                ? "bg-green-50 border-green-200" 
                : "bg-red-50 border-red-200"
            }`}>
              <p className={`text-sm ${
                isSuccess ? "text-green-600" : "text-red-600"
              }`}>
                {message}
              </p>
            </div>
          )}

          {/* Form or Error */}
          {!token ? (
            <div className="text-center py-12">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <p className="text-gray-600 mb-6">Reset token missing.</p>
              <Link 
                to="/login" 
                className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Login
              </Link>
            </div>
          ) : (
            <>
              <form onSubmit={handleReset} className="space-y-6">
                {/* Password Input */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition outline-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 focus:ring-4 focus:ring-purple-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Resetting..." : isSuccess ? "Redirecting..." : "Reset Password"}
                </button>
              </form>

              {/* Back to Login Link */}
              <div className="mt-8 text-center">
                <Link 
                  to="/login" 
                  className="inline-flex items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
