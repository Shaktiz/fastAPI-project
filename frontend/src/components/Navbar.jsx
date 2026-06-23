
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({
  search = "",
  setSearch = () => {},
  darkMode,
  setDarkMode,
}) {

  const [showSearch, setShowSearch] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    if (darkMode) {

      document.body.classList.add(
        "dark-mode"
      );

      localStorage.setItem(
        "theme",
        "dark"
      );

    } else {

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

  return (

    <nav className="navbar glass-navbar navbar-expand-lg">

      <div className="container-fluid">

        {/* LOGO */}

        <div
          className="brand-logo"
          style={{ cursor: "pointer" }}
          onClick={() =>
            navigate("/dashboard")
          }
        >
          🚀 Social Connect
        </div>

        {/* RIGHT SIDE */}

        <div className="navbar-actions d-flex align-items-center gap-2 flex-wrap">

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
            onClick={() =>
              navigate("/myposts")
            }
          >
            📝 My Posts
          </button>

          <button
            className="nav-glass-btn"
            onClick={() =>
              navigate("/users")
            }
          >
            👥 Users
          </button>

          {/* <button
            className="nav-glass-btn"
            onClick={() =>
              navigate("/saved-posts")
            }
          >
            🔖 Saved Posts
          </button> */}

          {/* <button
            className="nav-glass-btn"
            onClick={() =>
              navigate("/liked-posts")
            }
          >
            ❤️ Liked Posts
          </button> */}

          {/* SEARCH */}

          <button
            className="nav-glass-btn"
            onClick={() =>
              setShowSearch(!showSearch)
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

          {/* THEME */}

          <button
            className="nav-glass-btn theme-btn"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode
              ? "☀️"
              : "🌙"}
          </button>

          {/* LOGOUT */}

          <button
            className="logout-btn"
            onClick={logout}
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </nav>
  );
}

export default Navbar;