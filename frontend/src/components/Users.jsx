
import { useEffect, useState } from "react";
import axios from "axios";

function Users({ darkMode }) {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  const API_URL =
    "https://fastapi-project-1-j38l.onrender.com";

  const loadUsers = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/users/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="container-fluid">
      <table
        className={`table table-bordered table-hover ${
          darkMode ? "table-dark" : ""
        }`}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Profile</th>
            <th>Email</th>
            <th>Bio</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>

              <td>
                <img
                  src={
                    u.profile_image
                      // ? `${API_URL}${u.profile_image}`
                      ? `${API_URL}${u.profile_image?.startsWith("/") ? "" : "/"}${u.profile_image}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  width="50"
                  height="50"
                  className="rounded-circle border shadow-sm"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </td>

              <td>{u.email}</td>

              <td>{u.bio || "No Bio"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;