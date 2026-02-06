// import { useEffect, useState, useContext } from "react";
// import API from "../services/api";
// import Navbar from "../components/Navbar";
// import { AuthContext } from "../context/AuthContext";

// export default function UsersPage() {
//   const [users, setUsers] = useState([]);
//   const { accessToken } = useContext(AuthContext);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       const res = await API.get("/admin/users", {
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       });
//       setUsers(res.data);
//     };

//     fetchUsers();
//   }, [accessToken]);

//   const updateRole = async (id, role) => {
//     await API.put(
//       `/admin/users/${id}/role`,
//       { role },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`
//         }
//       }
//     );

//     alert("Role updated!");
//   };

//   return (
//     <div>
//       <Navbar />
//       <h2 style={{ padding: 20 }}>All Users</h2>

//       {users.map((u) => (
//         <div key={u._id} style={{ padding: 10 }}>
//           {u.email} — Role: {u.role}

//           <select
//             onChange={(e) => updateRole(u._id, e.target.value)}
//           >
//             <option>Select Role</option>
//             <option value="user">User</option>
//             <option value="manager">Manager</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const res = await API.get("/admin/users", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [accessToken]);

  const updateRole = async (id, role) => {
    await API.put(
      `/admin/users/${id}/role`,
      { role },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }
    );

    alert("Role updated!");
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "admin":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "manager":
        return "bg-pink-100 text-pink-800 border-pink-200";
      default:
        return "bg-purple-100 text-purple-800 border-purple-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            All Users
          </h2>
          <p className="text-gray-600">Manage user roles and permissions</p>
        </div>

        {/* Users List */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {isLoading ? (
            <div className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-6 animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      </div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded w-32"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-gray-500">No users found</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {users.map((u) => (
                <div
                  key={u._id}
                  className="p-6 hover:bg-purple-50 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* User Info */}
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-lg font-semibold">
                          {u.email?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-900 truncate">
                          {u.email}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-500">Role:</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRoleBadgeColor(u.role)}`}>
                            {u.role}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Role Select */}
                    <div className="sm:ml-auto">
                      <select
                        onChange={(e) => updateRole(u._id, e.target.value)}
                        className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition outline-none bg-white text-gray-700 font-medium cursor-pointer hover:border-purple-300"
                        defaultValue=""
                      >
                        <option value="" disabled>Select Role</option>
                        <option value="user">User</option>
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                      </select>
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