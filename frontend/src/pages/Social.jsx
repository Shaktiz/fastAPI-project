import { useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";
import "../styles/Auth.css";

function Social() {

  const navigate = useNavigate();

  return (
    <>
      <AuthNavbar />

      <div className="info-page">

        <div className="info-card">

          <button
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>

          <h1>Follow Us</h1>

          <div className="social-links">

            <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="social-link-item"
            >
                📘 Facebook
            </a>

            <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="social-link-item"
            >
                📸 Instagram
            </a>

            <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="social-link-item"
            >
                💼 LinkedIn
            </a>

            <a
                href="https://yourwebsite.com"
                target="_blank"
                rel="noreferrer"
                className="social-link-item"
            >
                🌐 Website
            </a>

            </div>

        </div>

      </div>
    </>
  );
}

export default Social;