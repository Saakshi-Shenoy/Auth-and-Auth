// import { useEffect, useState } from "react";
// import API from "../services/api";
// import { useSearchParams, Link } from "react-router-dom";

// export default function VerifyEmail() {
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get("token");

//   const [message, setMessage] = useState("Verifying your email...");
//   const [status, setStatus] = useState("loading");

//   useEffect(() => {
//     const verify = async () => {
//       if (!token) {
//         setMessage("Verification token missing.");
//         setStatus("error");
//         return;
//       }

//       try {
//         const res = await API.get(`/auth/verify/${token}`);
//         setMessage(res.data.message);
//         setStatus("success");
//       } catch (err) {
//         setMessage("Token invalid or expired.");
//         setStatus("error");
//       }
//     };

//     verify();
//   }, [token]);

//   return (
//     <div style={{ padding: 40 }}>
//       <h1>Email Verification</h1>

//       <p style={{ marginTop: 20, fontSize: 18 }}>
//         {message}
//       </p>

//       {status === "success" && (
//         <p style={{ color: "green" }}>
//           ✅ Your account is now verified!
//         </p>
//       )}

//       {status === "error" && (
//         <p style={{ color: "red" }}>
//           ❌ Verification failed.
//         </p>
//       )}

//       <br />
//       <Link to="/login">Go to Login</Link>
//     </div>
//   );
// }


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
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Branding */}
      <div className="lg:w-1/2 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex items-center justify-center p-8 lg:p-12">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
            AUTH-and-AUTH
          </h1>
          <p className="text-purple-200 text-lg lg:text-xl max-w-md">
            Secure authentication and authorization for modern applications
          </p>
        </div>
      </div>

      {/* Right Side - Verification Status */}
      <div className="lg:w-1/2 bg-white flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Email Verification</h2>
            <p className="text-gray-600">Confirming your email address</p>
          </div>

          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            {/* Loading State */}
            {status === "loading" && (
              <>
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center animate-pulse">
                  <svg className="w-8 h-8 text-white animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <p className="text-lg text-gray-700">{message}</p>
              </>
            )}

            {/* Success State */}
            {status === "success" && (
              <>
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Success!</h3>
                <p className="text-lg text-gray-700 mb-2">{message}</p>
                <p className="text-green-600 font-medium">
                  ✅ Your account is now verified!
                </p>
              </>
            )}

            {/* Error State */}
            {status === "error" && (
              <>
                <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Verification Failed</h3>
                <p className="text-lg text-gray-700 mb-2">{message}</p>
                <p className="text-red-600 font-medium">
                  ❌ Verification failed.
                </p>
              </>
            )}
          </div>

          {/* Go to Login Button */}
          <div className="mt-8 text-center">
            <Link 
              to="/login" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition shadow-md hover:shadow-lg"
            >
              Go to Login
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}