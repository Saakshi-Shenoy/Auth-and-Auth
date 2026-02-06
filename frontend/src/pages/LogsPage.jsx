// import { useEffect, useState, useContext } from "react";
// import API from "../services/api";
// import Navbar from "../components/Navbar";
// import { AuthContext } from "../context/AuthContext";

// export default function LogsPage() {
//   const [logs, setLogs] = useState([]);
//   const { accessToken } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchLogs = async () => {
//       const res = await API.get("/admin/logs", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       });

//       setLogs(res.data);
//     };

//     fetchLogs();
//   }, [accessToken]);

//   return (
//     <div>
//       <Navbar />
//       <h2 style={{ padding: 20 }}>Audit Logs</h2>

//       {logs.map((log) => (
//         <div key={log._id} style={{ padding: 10 }}>
//           {log.action} — {log.user?.email} —{" "}
//           {new Date(log.createdAt).toLocaleString()}
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function LogsPage() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setIsLoading(true);
        const res = await API.get("/admin/logs", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });

        setLogs(res.data);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [accessToken]);

  const getActionIcon = (action) => {
    return "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Audit Logs
          </h2>
          <p className="text-gray-600">Track all system activities and user actions</p>
        </div>

        {/* Logs List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {isLoading ? (
            <div className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-6 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-500">No audit logs found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {logs.map((log) => (
                <div
                  key={log._id}
                  className="p-6 hover:bg-purple-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full p-2 flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={getActionIcon(log.action)} />
                      </svg>
                    </div>

                    {/* Log Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {log.action}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {log.user?.email || "Unknown User"}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {new Date(log.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
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