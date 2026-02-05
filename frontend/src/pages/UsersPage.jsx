import { useEffect, useState, useContext } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await API.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setUsers(res.data);
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

  return (
    <div>
      <Navbar />
      <h2 style={{ padding: 20 }}>All Users</h2>

      {users.map((u) => (
        <div key={u._id} style={{ padding: 10 }}>
          {u.email} — Role: {u.role}

          <select
            onChange={(e) => updateRole(u._id, e.target.value)}
          >
            <option>Select Role</option>
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      ))}
    </div>
  );
}
