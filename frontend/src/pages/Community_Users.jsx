import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const token =
    localStorage.getItem("token");

  const API_URL =
    "https://fastapi-project-1-j38l.onrender.com";

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.email
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      user.bio
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar
  search={search}
  setSearch={setSearch}
  darkMode={darkMode}
  setDarkMode={setDarkMode}
/>

      {/* <div className="container mt-4"> */}
      <div
  className="container mt-4"
  style={{
    color: darkMode ? "#fff" : "#000",
  }}
>

        {/* HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2
            className="fw-bold"
            style={{ color: "white" }}
          >
            👥 Community Members
          </h2>

          <span className="badge bg-primary fs-6">
            {users.length} Members
          </span>

        </div>

        {/* SEARCH */}

        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="🔍 Search Members..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* USERS */}

        <div className="row">

          {filteredUsers.length > 0 ? (

            filteredUsers.map((user) => (

              <div
                className="col-lg-4 col-md-6 mb-4"
                key={user.id}
              >

                <div className="community-user-card">

                  {/* PROFILE */}

                  <div className="text-center">

                    {user.profile_pic ? (

                      <img
                        src={user.profile_pic}
                        alt="Profile"
                        className="community-avatar"
                      />

                    ) : (

                      <div className="community-avatar-fallback">
                        {user.email
                          ?.charAt(0)
                          .toUpperCase()}
                      </div>

                    )}

                  </div>

                  {/* INFO */}

                  <div className="text-center mt-3">

                    <h5
                      className="fw-bold"
                      style={{
                        color: "white",
                      }}
                    >
                      {user.email}
                    </h5>

                    <div className="mb-2">

                      <span className="badge bg-info">
                        ID #{user.id}
                      </span>

                    </div>

                    <p
                      style={{
                        color:
                          "rgba(255,255,255,.85)",
                        minHeight: "40px",
                      }}
                    >
                      {user.bio ||
                        "Community Member"}
                    </p>

                  </div>

                </div>

              </div>

            ))

          ) : (

            <div className="col-12">

              <div className="community-user-card text-center">

                <h4
                  style={{
                    color: "white",
                  }}
                >
                  🔍 No Users Found
                </h4>

              </div>

            </div>

          )}

        </div>

      </div>
    </>
  );
}

export default Users;