// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// function Register() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [address, setAddress] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "https://fastapi-project-1-j38l.onrender.com/users/",
//         {
//           email,
//           password,
//           address,
//         }
//       );

//       console.log(res.data);

//       alert("Registration Successful!");

//       navigate("/");
//     } catch (err) {
//       console.log(err);

//       if (err.response) {
//         alert(
//           err.response.data.detail ||
//             "Registration Failed"
//         );
//       } else {
//         alert("Server Error");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div
//         className="card shadow p-4 mx-auto" 
//         style={{ maxWidth: "500px" }}
//       >
//         <h2 className="mb-4 text-center">
//           Register
//         </h2>

//         <form onSubmit={handleRegister}>
//           <div className="mb-3">
//             <label className="form-label">
//               Email
//             </label>

//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) =>
//                 setEmail(e.target.value)
//               }
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">
//               Password
//             </label>

//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) =>
//                 setPassword(e.target.value)
//               }
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">
//               Address
//             </label>

//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter Address"
//               value={address}
//               onChange={(e) =>
//                 setAddress(e.target.value)
//               }
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn btn-success w-100"
//             disabled={loading}
//           >
//             {loading
//               ? "Registering..."
//               : "Register"}
//           </button>
//         </form>

//         <p className="mt-3 text-center">
//           Already have an account?{" "}
//           <Link to="/">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;

// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// function Register() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [address, setAddress] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (phoneNumber.length < 10 | phoneNumber.length > 10) {
//       alert("Please enter a valid phone number");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await axios.post(
//         "https://fastapi-project-1-j38l.onrender.com/users/",
//         {
//           email,
//           password,
//           address,
//           phone_number: phoneNumber,
//         }
//       );

//       console.log(res.data);

//       alert("Registration Successful!");

//       navigate("/");
//     } catch (err) {
//       console.log(err);

//       if (err.response) {
//         alert(
//           err.response.data.detail ||
//             "Registration Failed"
//         );
//       } else {
//         alert("Server Error");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div
//         className="card shadow p-4 mx-auto"
//         style={{ maxWidth: "500px" }}
//       >
//         <h2 className="mb-4 text-center">
//           Register
//         </h2>

//         <form onSubmit={handleRegister}>
//           <div className="mb-3">
//             <label className="form-label">
//               Email
//             </label>

//             <input
//               type="email"
//               className="form-control"
//               placeholder="Enter Email"
//               value={email}
//               onChange={(e) =>
//                 setEmail(e.target.value)
//               }
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">
//               Password
//             </label>

//             <input
//               type="password"
//               className="form-control"
//               placeholder="Enter Password"
//               value={password}
//               onChange={(e) =>
//                 setPassword(e.target.value)
//               }
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">
//               Phone Number
//             </label>

//             <input
//               type="tel"
//               className="form-control"
//               placeholder="Enter Phone Number"
//               value={phoneNumber}
//               onChange={(e) =>
//                 setPhoneNumber(e.target.value)
//               }
//               required
//             />
//           </div>

//           <div className="mb-3">
//             <label className="form-label">
//               Address
//             </label>

//             <input
//               type="text"
//               className="form-control"
//               placeholder="Enter Address"
//               value={address}
//               onChange={(e) =>
//                 setAddress(e.target.value)
//               }
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="btn btn-success w-100"
//             disabled={loading}
//           >
//             {loading
//               ? "Registering..."
//               : "Register"}
//           </button>
//         </form>

//         <p className="mt-3 text-center">
//           Already have an account?{" "}
//           <Link to="/">Login</Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Register;






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

        {/* <div className="auth-card"> */}
        <div
          className="auth-card"
          style={{ maxWidth: "460px" }}
        >

          <h2 className="text-center mb-4">
            🎉 Create Account
          </h2>

          <form onSubmit={handleRegister}>

            <input
              type="email"
              className="form-control mb-3"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <input
              type="password"
              className="form-control mb-3"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value)
              }
              required
            />

            <input
              type="text"
              className="form-control mb-3"
              placeholder="Address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              required
            />

            <button
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading
                ? "Registering..."
                : "Register"}
            </button>

          </form>

          <div className="text-center mt-3">
            Already have an account?
            <Link to="/">
              {" "}Login
            </Link>
          </div>

        </div>

      </div>
    </>
  );
}

export default Register;