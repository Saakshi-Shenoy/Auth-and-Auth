// import { useEffect, useState, useContext } from "react";
// import API from "../services/api";
// import Navbar from "../components/Navbar";
// import { AuthContext } from "../context/AuthContext";

// export default function ManagerAnalytics() {
//   const { accessToken } = useContext(AuthContext);

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAnalytics = async () => {
//       try {
//         const res = await API.get("/manager/analytics", {
//           headers: {
//             Authorization: `Bearer ${accessToken}`
//           }
//         });

//         setMessage(res.data.message);
//       } catch (error) {
//         setMessage("Access denied or error fetching analytics.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAnalytics();
//   }, [accessToken]);

//   return (
//     <div>
//       <Navbar />

//       <div style={{ padding: 30 }}>
//         <h1 style={{ fontSize: 28 }}>Manager Analytics</h1>

//         {loading ? (
//           <p>Loading analytics...</p>
//         ) : (
//           <div
//             style={{
//               marginTop: 20,
//               padding: 20,
//               borderRadius: 12,
//               border: "1px solid #ddd",
//               background: "#f9f9f9"
//             }}
//           >
//             <h2>Status</h2>
//             <p style={{ fontSize: 18 }}>{message}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Manager Analytics
          </h1>
        </div>

        {/* Content */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Status</h2>
            <p className="text-lg text-gray-700">{message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
