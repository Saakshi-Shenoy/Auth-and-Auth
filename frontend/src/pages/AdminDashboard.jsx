// import { useEffect, useState, useContext } from "react";
// import API from "../services/api";
// import Navbar from "../components/Navbar";
// import { AuthContext } from "../context/AuthContext";

// export default function AdminDashboard() {
//   const { accessToken } = useContext(AuthContext);

//   const [stats, setStats] = useState(null);
//   const [recentLogins, setRecentLogins] = useState([]);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       // Fetch stats
//       const statsRes = await API.get("/admin/stats", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       });

//       setStats(statsRes.data);

//       // Fetch recent login logs
//       const logsRes = await API.get("/admin/recent-logins", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       });

//       setRecentLogins(logsRes.data);
//     };

//     fetchDashboardData();
//   }, [accessToken]);

//   return (
//     <div>
//       <Navbar />

//       <div style={{ padding: 30 }}>
//         <h1 style={{ fontSize: 28 }}>Admin Dashboard</h1>
//         <p>Welcome back! Here’s an overview of your system.</p>

//         {/* Stats Cards */}
//         {stats && (
//           <div
//             style={{
//               display: "flex",
//               gap: 20,
//               marginTop: 30
//             }}
//           >
//             <div style={cardStyle}>
//               <h2>Total Users</h2>
//               <p style={numberStyle}>{stats.totalUsers}</p>
//             </div>

//             <div style={cardStyle}>
//               <h2>Total Admins</h2>
//               <p style={numberStyle}>{stats.totalAdmins}</p>
//             </div>

//             <div style={cardStyle}>
//               <h2>Total Managers</h2>
//               <p style={numberStyle}>{stats.totalManagers}</p>
//             </div>
//           </div>
//         )}

//         {/* Recent Logins */}
//         <div style={{ marginTop: 50 }}>
//           <h2>Recent Login Activity</h2>

//           {recentLogins.length === 0 ? (
//             <p>No recent logins found.</p>
//           ) : (
//             recentLogins.map((log) => (
//               <div
//                 key={log._id}
//                 style={{
//                   padding: 12,
//                   marginTop: 10,
//                   border: "1px solid #ddd",
//                   borderRadius: 8
//                 }}
//               >
//                 <strong>{log.user?.email}</strong> logged in at{" "}
//                 {new Date(log.createdAt).toLocaleString()}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* Simple Card Styling */
// const cardStyle = {
//   flex: 1,
//   padding: 20,
//   borderRadius: 12,
//   border: "1px solid #ddd",
//   background: "#fafafa",
//   textAlign: "center"
// };

// const numberStyle = {
//   fontSize: 32,
//   fontWeight: "bold",
//   marginTop: 10
// };


import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function AdminDashboard() {
  const { accessToken } = useContext(AuthContext);

  const [stats, setStats] = useState(null);
  const [recentLogins, setRecentLogins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch stats
        const statsRes = await API.get("/admin/stats", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setStats(statsRes.data);

        // Fetch recent login logs
        const logsRes = await API.get("/admin/recent-logins", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setRecentLogins(logsRes.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [accessToken]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Welcome back! Here's an overview of your system.</p>
        </div>

        {/* Stats Cards */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : stats ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Users Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-purple-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
                <div className="bg-purple-100 rounded-full p-3">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Admins Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-indigo-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Admins</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.totalAdmins}</p>
                </div>
                <div className="bg-indigo-100 rounded-full p-3">
                  <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Total Managers Card */}
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-6 border-l-4 border-pink-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Managers</p>
                  <p className="text-4xl font-bold text-gray-900">{stats.totalManagers}</p>
                </div>
                <div className="bg-pink-100 rounded-full p-3">
                  <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {/* Recent Login Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg p-2">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Recent Login Activity</h2>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                  <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentLogins.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-gray-500">No recent logins found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentLogins.map((log, index) => (
                <div
                  key={log._id}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                >
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-2 flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {log.user?.email || "Unknown User"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Logged in at {new Date(log.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}