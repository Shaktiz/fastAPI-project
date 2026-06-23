

import {useState,useEffect,useCallback,useMemo,} from "react";
import axios from "axios";

function Users() {
const [users, setUsers] = useState([]);

const token = localStorage.getItem("token");

const API_URL = "https://fastapi-project-1-j38l.onrender.com";

const authConfig = useMemo(() => 
  ({
      headers: {
      Authorization: `Bearer ${token}`,
      },
      }),
      [token]
      );

      const loadUsers = useCallback(async () => {
      try {
      const res = await axios.get(
      `${API_URL}/users/`,
      authConfig
      );


        setUsers(res.data || []);
      } catch (err) {
        console.log(err);
      }


      }, [authConfig]);

      useEffect(() => {
      loadUsers();
      }, [loadUsers]);

      return ( 
      <div className="users-glass-card">
        <div className="d-flex justify-content-between align-items-center mb-4">

          <h4
            className="fw-bold mb-0"
            style={{ color: "white" }}
          >
            👥 Community Members
          </h4>

          <span className="badge bg-primary">
            {users.length} Users
          </span>

        </div>

        {users.map((u) => (
          <div
            key={u.id}
            className="user-item-card mb-3"
          >

            <div className="d-flex align-items-center">

              <img
                src={
                  u.profile_image
                    ? `${API_URL}${u.profile_image?.startsWith("/") ? "" : "/"}${u.profile_image}`
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="profile-avatar"
              />

              <div className="ms-3 flex-grow-1">

                <h6
                  className="mb-1"
                  style={{
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  {u.email}
                </h6>

                <small
                  style={{
                    color:
                      "rgba(255,255,255,.7)",
                  }}
                >
                  ID: {u.id}
                </small>

                <p
                  className="mb-0 mt-2"
                  style={{
                    color:
                      "rgba(255,255,255,.85)",
                    fontSize: "14px",
                  }}
                >
                  {u.bio || "No bio added"}
                </p>

              </div>

            </div>

          </div>
        ))}

        {users.length === 0 && (
          <div className="text-center py-4">
            <h5 style={{ color: "white" }}>
              No Users Found
            </h5>
          </div>
        )}

      </div>
  );
}

export default Users;
