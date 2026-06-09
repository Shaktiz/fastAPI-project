import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Profile() {
  const [user, setUser] = useState({
    email: "",
    bio: "",
    profile_image: "",
  });

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const token = localStorage.getItem("token");

  const API_URL =
    "https://fastapi-project-1-j38l.onrender.com";

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/users/me`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfile = async () => {
    try {
      await axios.put(
        `${API_URL}/users/me`,
        {
          email: user.email,
          bio: user.bio,
          profile_image: user.profile_image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated Successfully");

      fetchProfile();
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <>
      <Navbar
        search=""
        setSearch={() => {}}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="container mt-5">

        <div
          className={`card shadow-lg border-0 ${
            darkMode
              ? "bg-dark text-light"
              : ""
          }`}
        >
          <div className="card-body p-5">

            <div className="text-center">

              <img
                src={
                  user.profile_image ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt=""
                width="180"
                height="180"
                className="rounded-circle border"
              />

              <h3 className="mt-3">
                {user.email}
              </h3>

            </div>

            <hr />

            <div className="mb-3">
              <label>Email</label>

              <input
                className="form-control"
                value={user.email}
                onChange={(e) =>
                  setUser({
                    ...user,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label>Profile Image URL</label>

              <input
                className="form-control"
                value={
                  user.profile_image || ""
                }
                onChange={(e) =>
                  setUser({
                    ...user,
                    profile_image:
                      e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label>Bio</label>

              <textarea
                rows="5"
                className="form-control"
                value={user.bio || ""}
                onChange={(e) =>
                  setUser({
                    ...user,
                    bio: e.target.value,
                  })
                }
              />
            </div>

            <button
              className="btn btn-primary w-100"
              onClick={updateProfile}
            >
              Save Profile
            </button>

          </div>
        </div>

      </div>
    </>
  );
}

export default Profile;