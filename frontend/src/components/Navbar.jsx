
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Navbar({
//   search,
//   setSearch,
//   darkMode,
//   setDarkMode,
// }) {
//   const [showSearch, setShowSearch] =
//     useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (darkMode) {
//       document.body.classList.add("dark-mode");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.body.classList.remove("dark-mode");
//       localStorage.setItem("theme", "light");
//     }
//   }, [darkMode]);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user_id");

//     navigate("/");
//   };

//   return (
//     // <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg px-4">
//     <nav className="navbar navbar-expand-lg glass-navbar shadow-lg">

//       <span
//         className="navbar-brand fw-bold fs-3"
//         style={{ cursor: "pointer" }}
//         onClick={() => navigate("/dashboard")}
//       >
//         🚀 SocialConnect
//       </span>

//       <div className="ms-auto d-flex align-items-center gap-2">

//         {/* Dashboard Button */}
//         <button
//           className="btn btn-light"
//           onClick={() => navigate("/dashboard")}
//         >
//           🏠 Dashboard
//         </button>

//         {/* Profile Button */}
//         <button
//           className="btn btn-info"
//           onClick={() => navigate("/profile")}>
//           👤 Profile
//         </button>

//         {/* Search Button */}
//         <button
//           className="btn btn-outline-light"
//           onClick={() =>
//             setShowSearch(!showSearch)
//           }
//         >
//           🔍
//         </button>

//         {/* Search Input */}
//         {showSearch && (
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search posts..."
//             value={search}
//             onChange={(e) =>
//               setSearch(e.target.value)
//             }
//             style={{ width: "250px" }}
//           />
//         )}

//         {/* Dark Mode */}
//         <button
//           className="btn btn-warning"
//           onClick={() =>
//             setDarkMode(!darkMode)
//           }
//         >
//           {darkMode
//             ? "☀️ Light"
//             : "🌙 Dark"}
//         </button>

//         {/* Logout */}
//         <button
//           className="btn btn-danger"
//           onClick={logout}
//         >
//           Logout
//         </button>

//       </div>
//     </nav>
//   );
// }

// export default Navbar;


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({search,setSearch,darkMode,setDarkMode,}) {
  const [showSearch, setShowSearch] = useState(false);

const navigate = useNavigate();

useEffect(() => {
      if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme","dark");
      } 
      else {
      document.body.classList.remove(
      "dark-mode"
      );
      localStorage.setItem(
      "theme",
      "light"
      );
      }
      }, [darkMode]);

      const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");


      navigate("/");

      };

      return ( <nav className="navbar glass-navbar navbar-expand-lg">


        <div className="container-fluid">

          {/* LOGO */}

          <div
            className="brand-logo"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            🚀 SocialConnect
          </div>

          {/* RIGHT SECTION */}

          <div className="navbar-actions">

            <button
              className="nav-glass-btn"
              onClick={() =>
                navigate("/dashboard")
              }
            >
              🏠 Dashboard
            </button>

            <button
              className="nav-glass-btn"
              onClick={() =>
                navigate("/profile")
              }
            >
              👤 Profile
            </button>
            
            <button
              className="nav-glass-btn"
              onClick={() => navigate("/saved-posts")}
              >
              🔖 Saved Posts
            </button>

            <button
              className="nav-glass-btn"
              onClick={() =>
                setShowSearch(
                  !showSearch
                )
              }
            >
              🔍 Search
            </button>

            {showSearch && (
              <input
                type="text"
                className="glass-search"
                placeholder="Search posts..."
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
              />
            )}

            <button
              className="nav-glass-btn theme-btn"
              onClick={() =>
                setDarkMode(
                  !darkMode
                )
              }
            >
              {darkMode
                ? "☀️ "
                : "🌙 "}
            </button>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
            
          </div>
        </div>
      </nav>
  );
}

export default Navbar;
