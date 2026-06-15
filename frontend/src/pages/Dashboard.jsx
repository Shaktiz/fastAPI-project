
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/DashboardTheme.css";
// import Navbar from "../components/Navbar";
// import Posts from "../components/Posts";
// import Users from "../components/Users";

// function Dashboard() {
//   const navigate = useNavigate();

//   const [search, setSearch] = useState("");

//   const [darkMode, setDarkMode] = useState(
//     localStorage.getItem("darkMode") === "true"
//   );

//   const [currentUser, setCurrentUser] =
//     useState(null);
//   const API_URL =
//     "https://fastapi-project-1-j38l.onrender.com";

//   // Check Login
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please login first");
//       navigate("/");
//       return;
//     }

//     fetchCurrentUser();
//   }, [navigate]);

//   const fetchCurrentUser = async () => {
//   try {
//     const token = localStorage.getItem("token");

//     const response = await fetch(
//       `${API_URL}/users/me`,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     const data = await response.json();

//     console.log("Current User:", data);

//     setCurrentUser(data);
//   } catch (error) {
//     console.log(error);
//   }
// };

//   // Dark Mode
//   useEffect(() => {
//     localStorage.setItem(
//       "darkMode",
//       darkMode
//     );

//     if (darkMode) {
//       document.body.classList.add("dark-mode");
//       document.body.classList.remove(
//         "light-mode"
//       );
//     } else {
//       document.body.classList.remove(
//         "dark-mode"
//       );
//       document.body.classList.add(
//         "light-mode"
//       );
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

//       {/* <div className="container-fluid mt-4"> */}
//       <div className="container-fluid py-4">
      
//         {/* Current User Card */}
//         {currentUser && (
//   <div className="welcome-glass-card mb-4">
//     <div className="d-flex align-items-center">

//       <img
//         src={
//           currentUser.profile_image
//             ? `${API_URL}${
//                 currentUser.profile_image?.startsWith("/")
//                   ? ""
//                   : "/"
//               }${currentUser.profile_image}`
//             : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//         }
//         alt=""
//         className="profile-avatar-lg"
//       />

//       <div className="ms-4">
//         <h2 className="mb-1">
//           Welcome Back 👋
//         </h2>

//         <h5>{currentUser.email}</h5>

//         <p className="mb-0">
//           {currentUser.bio || "Tell people about yourself"}
//         </p>
//       </div>

//     </div>
//   </div>
// )}
//         <div className="row">

//           {/* POSTS */}
//           <div className="col-lg-8 mb-4">
//             <Posts
//               search={search}
//               darkMode={darkMode}
//             />
//           </div>

//           {/* USERS */}
//           {/* <div className="col-lg-4">

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

//           </div> */}
    
//             <div className="col-lg-4">
//               <div className="users-panel">
//                 <div className="users-header">
//                   👥 Community Members
//                 </div>

//                 <Users darkMode={darkMode} />
//               </div>
//             </div>
//         </div>

//       </div>
//     </>
//   );
// }

// export default Dashboard;



import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/DashboardTheme.css";

import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import Users from "../components/Users";

function Dashboard() {
const navigate = useNavigate();

const [search, setSearch] = useState("");

const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

const [currentUser, setCurrentUser] =
useState(null);

const API_URL = "https://fastapi-project-1-j38l.onrender.com";

const fetchCurrentUser = useCallback( async () => {
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

          const data =
            await response.json();

          setCurrentUser(data);
        } catch (error) {
          console.log(error);
        }
      },
      [API_URL]

      );

      useEffect(() => { const token = localStorage.getItem("token");


      if (!token) {
        alert("Please login first");
        navigate("/");
        return;
      }

      fetchCurrentUser();

      }, [navigate, fetchCurrentUser]);

      useEffect(() => {
      localStorage.setItem(
      "darkMode",
      darkMode
      );

      if (darkMode) {
        document.body.classList.add(
          "dark-mode"
        );
      } else {
        document.body.classList.remove(
          "dark-mode"
        );
      }

      }, [darkMode]);

      return (
      <> <Navbar
          search={search}
          setSearch={setSearch}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div className="container-fluid py-4">

          {/* HERO USER CARD */}

          {currentUser && (
            <div className="welcome-glass-card mb-4">

              <div className="d-flex align-items-center">

                <img
                  src={
                    currentUser.profile_image
                      ? `${API_URL}${
                          currentUser.profile_image?.startsWith(
                            "/"
                          )
                            ? ""
                            : "/"
                        }${
                          currentUser.profile_image
                        }`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  className="profile-avatar-lg"
                />

                <div className="ms-4">

                  <h2 className="welcome-title">
                    Welcome Back 👋
                  </h2>

                  <h5 className="welcome-email">
                    {currentUser.email}
                  </h5>

                  <p className="welcome-bio">
                    {currentUser.bio ||
                      "Share your thoughts with the community."}
                  </p>

                </div>

              </div>

            </div>
          )}

          <div className="row g-4">

            {/* POSTS */}

            <div className="col-lg-8">
              <Posts
                search={search}
                darkMode={darkMode}
              />
            </div>

            {/* USERS */}

            <div className="col-lg-4">

              {/* <div className="users-panel"> */}

                {/* <div className="users-header">

                  <span>
                    👥 Community Members
                  </span>

                </div> */}

                
              {/* </div> */}
                  <Users darkMode={darkMode} />
            </div>

          </div>

        </div>
      </>
  );
}

export default Dashboard;
