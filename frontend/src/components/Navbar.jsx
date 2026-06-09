// function Navbar() {
//   const logout = () => {
//     localStorage.removeItem("token");
//     window.location.href = "/";
//   };

//   return (
//     <nav className="navbar navbar-dark bg-dark px-3">
//       <span className="navbar-brand">
//         FastAPI Dashboard
//       </span>

//       <button
//         className="btn btn-danger"
//         onClick={logout}
//       >
//         Logout
//       </button>
//     </nav>
//   );
// }

// export default Navbar;



// import { useState } from "react";

// function Navbar({ search, setSearch }) {
//   const [showSearch, setShowSearch] =
//     useState(false);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user_id");
//     window.location.href = "/";
//   };

//   return (
//     <nav className="navbar navbar-dark bg-dark px-3">
      
//       <span className="navbar-brand">
//         FastAPI Dashboard
//       </span>

//       <div className="d-flex align-items-center gap-2">

//         {/* Search Toggle Button */}
//         <button
//           className="btn btn-outline-light"
//           onClick={() =>
//             setShowSearch(!showSearch)
//           }
//         >
//           🔍
//         </button>

//         {/* Search Box */}
//         {showSearch && (
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search Posts..."
//             value={search}
//             onChange={(e) =>
//               setSearch(e.target.value)
//             }
//             style={{ width: "250px" }}
//           />
//         )}

//         {/* Logout Button */}
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


// import { useState, useEffect } from "react";

// function Navbar({
//   search,
//   setSearch,
//   darkMode,
//   setDarkMode,
// }) {
//   const [showSearch, setShowSearch] =
//     useState(false);

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

//     window.location.href = "/";
//   };

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg px-4">

//       <span className="navbar-brand fw-bold fs-3">
//         🚀 FastAPI Dashboard
//       </span>

//       <div className="ms-auto d-flex align-items-center gap-2">

//         <button
//           className="btn btn-outline-light"
//           onClick={() =>
//             setShowSearch(!showSearch)
//           }
//         >
//           🔍
//         </button>

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

function Navbar({
  search,
  setSearch,
  darkMode,
  setDarkMode,
}) {
  const [showSearch, setShowSearch] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");

    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-lg px-4">

      <span
        className="navbar-brand fw-bold fs-3"
        style={{ cursor: "pointer" }}
        onClick={() => navigate("/dashboard")}
      >
        🚀 FastAPI Dashboard
      </span>

      <div className="ms-auto d-flex align-items-center gap-2">

        {/* Dashboard Button */}
        <button
          className="btn btn-light"
          onClick={() => navigate("/dashboard")}
        >
          🏠 Dashboard
        </button>

        {/* Profile Button */}
        <button
          className="btn btn-info"
          onClick={() => navigate("/profile")}>
          👤 Profile
        </button>

        {/* Search Button */}
        <button
          className="btn btn-outline-light"
          onClick={() =>
            setShowSearch(!showSearch)
          }
        >
          🔍
        </button>

        {/* Search Input */}
        {showSearch && (
          <input
            type="text"
            className="form-control"
            placeholder="Search posts..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{ width: "250px" }}
          />
        )}

        {/* Dark Mode */}
        <button
          className="btn btn-warning"
          onClick={() =>
            setDarkMode(!darkMode)
          }
        >
          {darkMode
            ? "☀️ Light"
            : "🌙 Dark"}
        </button>

        {/* Logout */}
        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;