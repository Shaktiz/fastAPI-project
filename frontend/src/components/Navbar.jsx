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

import { useState } from "react";

function Navbar({ search, setSearch }) {
  const [showSearch, setShowSearch] =
    useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">
        FastAPI Dashboard
      </span>

      <div className="d-flex align-items-center gap-2">

        {/* Search Toggle Button */}
        <button
          className="btn btn-outline-light"
          onClick={() =>
            setShowSearch(!showSearch)
          }
        >
          🔍
        </button>

        {/* Search Box */}
        {showSearch && (
          <input
            type="text"
            className="form-control"
            placeholder="Search Posts..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            style={{ width: "250px" }}
          />
        )}

        {/* Logout Button */}
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