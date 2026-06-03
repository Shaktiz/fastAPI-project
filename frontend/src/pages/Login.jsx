// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);

//       const formData = new URLSearchParams();
//       formData.append("username", email);
//       formData.append("password", password);

//       const response = await axios.post(
//         "https://fastapi-project-ap5t.onrender.com/login",
//         formData,
//         {
//           headers: {
//             "Content-Type":
//               "application/x-www-form-urlencoded",
//           },
//         }
//       );

//       console.log(response.data);

//       localStorage.setItem(
//         "token",
//         response.data.access_token
//       );

//       alert("Login Successful!");
      
//       navigate("/dashboard");
//     } catch (error) {
//       console.error(error);

//       if (error.response) {
//         alert(
//           error.response.data.detail ||
//             "Invalid Email or Password"
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
//         <h2 className="text-center mb-4">
//           Login
//         </h2>

//         <form onSubmit={handleLogin}>
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

//           <button
//             type="submit"
//             className="btn btn-primary w-100"
//             disabled={loading}
//           >
//             {loading ? "Logging In..." : "Login"}
//           </button>
//         </form>

//         <div className="text-center mt-3">
//           <p>
//             Don't have an account?{" "}
//             <Link to="/register">
//               Register Here
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

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
        "https://fastapi-project-ap5t.onrender.com/login",
        formData,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

      const token = response.data.access_token;

      localStorage.setItem("token", token);

      // Decode JWT Token
      const payload = JSON.parse(
        atob(token.split(".")[1])
      );

      console.log("JWT Payload:", payload);
    
      // Store User ID
      localStorage.setItem(
        "user_id",
        payload.user_id
      );

      alert("Login Successful!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      if (error.response) {
        alert(
          error.response.data.detail ||
            "Invalid Email or Password"
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
        <h2 className="text-center mb-4">
          Login
        </h2>

        <form onSubmit={handleLogin}>
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

          <button
            type="submit"
            className="btn btn-primary w-100"
            disabled={loading}
          >
            {loading
              ? "Logging In..."
              : "Login"}
          </button>
        </form>

        <div className="text-center mt-3">
          <p>
            Don't have an account?{" "}
            <Link to="/register">
              Register Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;