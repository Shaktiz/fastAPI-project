import { useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";
import "../styles/Auth.css";

function Terms() {

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

          <h1>Terms & Conditions</h1>

          <p>
            By using Social Connect, you agree
            to follow our community guidelines
            and platform policies.
          </p>

        </div>

      </div>
    </>
  );
}

export default Terms;