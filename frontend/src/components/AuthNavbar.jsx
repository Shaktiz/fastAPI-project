import { Link } from "react-router-dom";

function AuthNavbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{
        background:
          "linear-gradient(135deg, #667eea, #764ba2)",
      }}
    >
      <div className="container">

        <span className="navbar-brand fw-bold fs-3">
          🚀 SocialConnect
        </span>

        <span className="text-white fw-semibold">
          Welcome to the Community Platform
        </span>

        <div>
          <Link
            to="/"
            className="btn btn-light me-2"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="btn btn-outline-light"
          >
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default AuthNavbar;