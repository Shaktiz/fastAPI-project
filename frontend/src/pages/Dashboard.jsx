// import Navbar from "../components/Navbar";
// import Posts from "../components/Posts";
// import Users from "../components/Users";

// function Dashboard() {
//   return (
//     <>
//       <Navbar />

//       <div className="container mt-4">
//         <Posts />

//         <hr />

//         <Users />
//       </div>
//     </>
//   );
// }

// export default Dashboard;

// import Navbar from "../components/Navbar";
// import Posts from "../components/Posts";
// import Users from "../components/Users";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please login first");
//       navigate("/");
//     }
//   }, [navigate]);

//   return (
//     <>
//       <Navbar />

//       <div className="container mt-4">
//         <div className="row">
//           <div className="col-md-8">
//             <Posts />
//           </div>

//           <div className="col-md-4">
//             <Users />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Dashboard;



// import Navbar from "../components/Navbar";
// import Posts from "../components/Posts";
// import Users from "../components/Users";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Dashboard({ search, setSearch }) {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please login first");
//       navigate("/");
//     }
//   }, [navigate]);

//   return (
//     <>
//       <Navbar
//         search={search}
//         setSearch={setSearch}
//       />

//       <div className="container mt-4">
//         <div className="row">
//           {/* Posts Section */}
//           <div className="col-md-8">
//             <Posts search={search} />
//           </div>

//           {/* Users Section */}
//           <div className="col-md-4">
//             <Users />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Dashboard;




// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import Navbar from "../components/Navbar";
// import Posts from "../components/Posts";
// import Users from "../components/Users";

// function Dashboard() {
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");

//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("theme") === "dark"
//   );

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please login first");
//       navigate("/");
//     }
//   }, [navigate]);

//   return (
//     <>
//       <Navbar
//         search={search}
//         setSearch={setSearch}
//         darkMode={darkMode}
//         setDarkMode={setDarkMode}
//       />

//       <div className="container-fluid mt-4">
//         <div className="row">

//           <div className="col-lg-8">
//             <Posts search={search} />
//           </div>

//           <div className="col-lg-4">
//             <Users />
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

// export default Dashboard;



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import Navbar from "../components/Navbar";
// import Posts from "../components/Posts";
// import Users from "../components/Users";
// document.body.classList.add("dark-mode");
// document.body.classList.remove("dark-mode");
// function Dashboard() {
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");

//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("darkMode") === "true"
//   );

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please login first");
//       navigate("/");
//     }
//   }, [navigate]);

//   useEffect(() => {
//     localStorage.setItem("darkMode", darkMode);

//     if (darkMode) {
//       document.body.classList.add("dark-mode");
//     } else {
//       document.body.classList.remove("dark-mode");
//     }
//   }, [darkMode]);

//   return (
//     <>
//       <Navbar
//         search={search}
//         setSearch={setSearch}
//         darkMode={darkMode}
//         setDarkMode={setDarkMode}
//       />

//       <div className="container-fluid mt-4">
//         <div className="row">
//           <div className="col-lg-8">
//             <Posts
//               search={search}
//               darkMode={darkMode}
//             />
//           </div>

//           <div className="col-lg-4">
//             <Users />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Dashboard;



// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import Navbar from "../components/Navbar";
// import Posts from "../components/Posts";
// import Users from "../components/Users";

// function Dashboard() {
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");

//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("darkMode") === "true"
//   );

//   // Check Login
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please login first");
//       navigate("/");
//     }
//   }, [navigate]);

//   // Dark Mode Toggle
//   useEffect(() => {
//     localStorage.setItem("darkMode", darkMode);

//     if (darkMode) {
//       document.body.classList.add("dark-mode");
//       document.body.classList.remove("light-mode");
//     } else {
//       document.body.classList.remove("dark-mode");
//       document.body.classList.add("light-mode");
//     }
//   }, [darkMode]);

//   return (
//     <>
//       <Navbar
//         search={search}
//         setSearch={setSearch}
//         darkMode={darkMode}
//         setDarkMode={setDarkMode}
//       />

//       <div className="container-fluid mt-4">
//         <div className="row">

//           {/* POSTS SECTION */}
//           <div className="col-lg-8 mb-4">
//             <Posts
//               search={search}
//               darkMode={darkMode}
//             />
//           </div>

//           {/* USERS SECTION */}
//           <div className="col-lg-4">
//             <div
//               className={`card shadow-lg border-0 ${
//                 darkMode
//                   ? "bg-dark text-light"
//                   : "bg-white"
//               }`}
//             >
//               <div className="card-header fw-bold fs-5">
//                 👥 Users
//               </div>

//               <div className="card-body">
//                 <Users />
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }

// export default Dashboard;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import Users from "../components/Users";

function Dashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [currentUser, setCurrentUser] =
    useState(null);
  const API_URL =
    "https://fastapi-project-1-j38l.onrender.com";

  // Check Login
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

    fetchCurrentUser();
  }, [navigate]);

  const fetchCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(
      `${API_URL}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    console.log("Current User:", data);

    setCurrentUser(data);
  } catch (error) {
    console.log(error);
  }
};

  // Dark Mode
  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      darkMode
    );

    if (darkMode) {
      document.body.classList.add("dark-mode");
      document.body.classList.remove(
        "light-mode"
      );
    } else {
      document.body.classList.remove(
        "dark-mode"
      );
      document.body.classList.add(
        "light-mode"
      );
    }
  }, [darkMode]);

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="container-fluid mt-4">

        {/* Current User Card */}
        {currentUser && (
          <div className="card shadow border-0 mb-4">
            <div className="card-body d-flex align-items-center">

              <img
                src={
                  currentUser.profile_image
                    // ? `${API_URL}${currentUser.profile_image}`
                    ? `${API_URL}${currentUser.profile_image?.startsWith("/") ? "" : "/"}${currentUser.profile_image}`
                    : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                width="80"
                height="80"
                className="rounded-circle me-3"
                style={{ objectFit: "cover" }}
                />

              <div>
                <h5 className="mb-1">
                  {currentUser.email}
                </h5>

                <p className="text-muted mb-0">
                  {currentUser.bio ||
                    "No bio added"}
                </p>
              </div>

            </div>
          </div>
        )}

        <div className="row">

          {/* POSTS */}
          <div className="col-lg-8 mb-4">
            <Posts
              search={search}
              darkMode={darkMode}
            />
          </div>

          {/* USERS */}
          <div className="col-lg-4">

            <div
              className={`card shadow-lg border-0 ${
                darkMode
                  ? "bg-dark text-light"
                  : "bg-white"
              }`}
            >

              <div className="card-header fw-bold fs-5">
                👥 Users
              </div>

              <div className="card-body">
                <Users />
              </div>

            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Dashboard;