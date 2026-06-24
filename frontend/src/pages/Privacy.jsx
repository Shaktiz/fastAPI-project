import { useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";
import "../styles/Auth.css";

function Privacy() {

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

          <h1>Privacy Policy</h1>

          <p>
            We respect your privacy and use
            industry-standard security practices
            to protect your information.
          </p>

        </div>

      </div>
    </>
  );
}

export default Privacy;