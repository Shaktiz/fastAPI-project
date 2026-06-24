import { useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";
import "../styles/Auth.css";

function About() {

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

          <h1>About Social Connect</h1>

          <p>
            Social Connect is a modern platform
            designed to bring people together.
            Connect with communities, discover
            new ideas, share your thoughts and
            build meaningful relationships.
          </p>

        </div>

      </div>
    </>
  );
}

export default About;