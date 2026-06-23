
import "../styles/Auth.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AuthNavbar from "../components/AuthNavbar";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await axios.post(
        "https://fastapi-project-1-j38l.onrender.com/login",
        formData,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

      const token =
        response.data.access_token;

      localStorage.setItem(
        "token",
        token
      );

      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      localStorage.setItem(
        "user_id",
        payload.user_id
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.detail ||
          "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthNavbar />

      <div className="auth-page">

        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>

        {/* <div className="auth-card"> */}

          <div
            className="auth-card"
            style={{ maxWidth: "460px" }}
          >
            <div className="auth-logo">
              🚀
            </div>

            <div className="text-center mb-4">
              <h2>Welcome👋</h2>

              <p>
                Connect with your community and
                share your thoughts
              </p>
            </div>

            <form onSubmit={handleLogin}>

              <input
                type="email"
                className="form-control"
                placeholder="📧 Enter Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

              <input
                type="password"
                className="form-control"
                placeholder="🔒 Enter Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="submit"
                className="btn btn-primary w-100 mt-2"
                disabled={loading}
              >
                {loading
                  ? "Signing In..."
                  : "🚀 Login"}
              </button>

            </form>

            <div className="auth-divider">
              ───── OR ─────
            </div>

            <div className="text-center">
              Don't have an account?
              <Link to="/register">
                {" "}Register Now
              </Link>
            </div>
          </div>

      </div>
    </>
  );
}

export default Login;