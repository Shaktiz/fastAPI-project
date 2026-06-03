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

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (phoneNumber.length < 10) {
      alert("Please enter a valid phone number");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "https://fastapi-project-1-j38l.onrender.com/users/",
        {
          email,
          password,
          address,
          phone_number: phoneNumber,
        }
      );

      console.log(res.data);

      alert("Registration Successful!");

      navigate("/");
    } catch (err) {
      console.log(err);

      if (err.response) {
        alert(
          err.response.data.detail ||
            "Registration Failed"
        );
      } else {
        alert("Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <h2 className="mb-4 text-center">
          Register
        </h2>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Phone Number
            </label>

            <input
              type="tel"
              className="form-control"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              onChange={(e) =>
                setPhoneNumber(e.target.value)
              }
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Address
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter Address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading
              ? "Registering..."
              : "Register"}
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;