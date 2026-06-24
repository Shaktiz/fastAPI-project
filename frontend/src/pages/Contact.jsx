import { useNavigate } from "react-router-dom";
import AuthNavbar from "../components/AuthNavbar";
import "../styles/Auth.css";

function Contact() {

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

          <h1>Contact Us</h1>

          <p>📧 support@socialconnect.com</p>

          <p>📞 +91 9876543210</p>

          <p>📍 Ahmedabad, Gujarat, India</p>

        </div>

      </div>
    </>
  );
}

export default Contact;