import { Link } from "react-router-dom";

function AuthNavbar() {
  return (
    <nav
      className="navbar navbar-expand-lg fixed-top"
      style={{
        background: "rgba(255,255,255,0.08)",
        backdropFilter: "blur(25px)",
        WebkitBackdropFilter: "blur(25px)",
        borderBottom:
          "1px solid rgba(255,255,255,0.15)",
        boxShadow:
          "0 8px 30px rgba(0,0,0,.15)",
        zIndex: 999,
      }}
    >
      <div className="container">

        {/* LOGO */}

        <div
          className="d-flex align-items-center"
          style={{
            cursor: "pointer",
          }}
        >
          <span
            style={{
              fontSize: "2rem",
            }}
          >
            🚀
          </span>

          <span
            className="ms-2 fw-bold"
            style={{
              fontSize: "1.8rem",
              color: "white",
              letterSpacing: "1px",
              textShadow:
                "0 0 20px rgba(255,255,255,.3)",
            }}
          >
            SocialConnect
          </span>
        </div>

        {/* CENTER TEXT */}

        <div
          className="d-none d-lg-block"
          style={{
            color: "rgba(255,255,255,.85)",
            fontWeight: "500",
            fontSize: "15px",
          }}
        >
          🌍 Connect • Share • Discover
        </div>

        {/* ACTION BUTTONS */}

        <div className="d-flex gap-2">

          <Link
            to="/"
            className="btn"
            style={{
              background:
                "rgba(255,255,255,.12)",
              backdropFilter: "blur(15px)",
              color: "white",
              border:
                "1px solid rgba(255,255,255,.15)",
              borderRadius: "14px",
              padding: "10px 20px",
              transition: ".3s",
            }}
          >
            🔑 Login
          </Link>

          <Link
            to="/register"
            className="btn"
            style={{
              background:
                "linear-gradient(135deg,#8b5cf6,#6366f1)",
              color: "white",
              border: "none",
              borderRadius: "14px",
              padding: "10px 20px",
              fontWeight: "600",
              boxShadow:
                "0 8px 20px rgba(139,92,246,.35)",
            }}
          >
            ✨ Register
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default AuthNavbar;