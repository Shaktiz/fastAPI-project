// import Navbar from "../components/Navbar";
// import Posts from "../components/Posts";
// import Users from "../components/Users";

// function Dashboard() {
//   return (
//     <>
//       <Navbar />

//       <div className="container mt-4">
//         <Posts />

//         <hr />

//         <Users />
//       </div>
//     </>
//   );
// }

// export default Dashboard;

// import Navbar from "../components/Navbar";
// import Posts from "../components/Posts";
// import Users from "../components/Users";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// function Dashboard() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       alert("Please login first");
//       navigate("/");
//     }
//   }, [navigate]);

//   return (
//     <>
//       <Navbar />

//       <div className="container mt-4">
//         <div className="row">
//           <div className="col-md-8">
//             <Posts />
//           </div>

//           <div className="col-md-4">
//             <Users />
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Dashboard;



import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import Users from "../components/Users";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ search, setSearch }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <div className="container mt-4">
        <div className="row">
          {/* Posts Section */}
          <div className="col-md-8">
            <Posts search={search} />
          </div>

          {/* Users Section */}
          <div className="col-md-4">
            <Users />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;