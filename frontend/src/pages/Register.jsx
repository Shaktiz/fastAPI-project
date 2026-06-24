

import "../styles/Auth.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AuthNavbar from "../components/AuthNavbar";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [phoneNumber, setPhoneNumber] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (phoneNumber.length !== 10) {
      alert(
        "Phone number must be 10 digits"
      );
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "https://fastapi-project-1-j38l.onrender.com/users/",
        {
          email,
          password,
          address,
          phone_number: phoneNumber,
        }
      );

      alert(
        "Registration Successful"
      );

      navigate("/");
    } catch (err) {
      alert(
        err.response?.data?.detail ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
  <>
    <AuthNavbar />

    <div className="auth-page">
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>

      <div className="auth-layout-container">

        {/* LEFT SIDE - PROMOTION */}
        <div className="auth-showcase">

          <div className="showcase-content">

            <h1 className="showcase-title">
              🚀 Social Connect
            </h1>

            <p className="showcase-subtitle">
              Join thousands of users sharing ideas,
              building communities, and discovering
              amazing content every day.
            </p>

            <div className="showcase-image">
              <img
                src="/images/social-connect-banner.png"
                alt="Social Connect"
                className="img-fluid"
              />
            </div>

            <div className="feature-grid">

              <div className="feature-box">
                🌍 Connect Worldwide
              </div>

              <div className="feature-box">
                💬 Real-Time Discussions
              </div>

              <div className="feature-box">
                ❤️ Like & Save Posts
              </div>

              <div className="feature-box">
                👥 Build Communities
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE - REGISTER CARD */}
        <div className="auth-card-wrapper">

          <div className="auth-card register-card">

            <div className="auth-logo">
              ✨
            </div>

            <div className="text-center mb-4">
              <h2>Create Account</h2>

              <p>
                Join SocialConnect and start sharing
                with your community
              </p>
            </div>

            <form onSubmit={handleRegister}>

              <input
                type="email"
                className="form-control"
                placeholder="📧 Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />

              <input
                type="password"
                className="form-control"
                placeholder="🔒 Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <input
                type="text"
                className="form-control"
                placeholder="📱 Phone Number"
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(e.target.value)
                }
                required
              />

              <input
                type="text"
                className="form-control"
                placeholder="🏠 Address"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                required
              />

              <button
                type="submit"
                className="btn btn-primary w-100 mt-2"
                disabled={loading}
              >
                {loading
                  ? "Creating Account..."
                  : "🎉 Register"}
              </button>

            </form>

            <div className="auth-divider">
              ───── OR ─────
            </div>

            <div className="text-center">
              Already have an account?
              <Link to="/">
                {" "}Login
              </Link>
            </div>

          </div>

        </div>

      </div>

                {/* FOOTER */}

          <footer className="auth-footer">

            <div className="footer-links">

              <button
                className="footer-btn"
                onClick={() => navigate("/about")}
              >
                About
              </button>

              <button
                className="footer-btn"
                onClick={() => navigate("/contact")}
              >
                Contact Us
              </button>

              <button
                className="footer-btn"
                onClick={() => navigate("/privacy")}
              >
                Privacy Policy
              </button>

              <button
                className="footer-btn"
                onClick={() => navigate("/terms")}
              >
                Terms & Conditions
              </button>

              <button
                className="footer-btn"
                onClick={() => navigate("/social")}
              >
                Social Media
              </button>

            </div>
            <div className="footer-text">
              © 2026 Social Connect
            </div>
            
          </footer>

    </div>
  </>
);
}

export default Register;