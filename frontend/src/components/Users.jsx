
// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // function Users() {
// //   const [users, setUsers] = useState([]);

// //   const token = localStorage.getItem("token");

// //   const loadUsers = async () => {
// //     try {
// //       const res = await axios.get(
// //         "https://fastapi-project-ap5t.onrender.com/users/",
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setUsers(res.data);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };

// //   useEffect(() => {
// //     loadUsers();
// //   }, []);

// //   const deleteUser = async (id) => {
// //     const confirmDelete = window.confirm(
// //       "Are you sure you want to delete this user?"
// //     );

// //     if (!confirmDelete) return;

// //     try {
// //       await axios.delete(
// //         `https://fastapi-project-ap5t.onrender.com/users/${id}`,
// //         {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );

// //       setUsers(users.filter((u) => u.id !== id));
// //     } catch (error) {
// //       alert("You are not authorized to delete this user.");
// //       console.log(error);
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Users</h2>

// //       <table className="table table-bordered table-hover">
// //         <thead className="table-dark">
// //           <tr>
// //             <th>ID</th>
// //             <th>Email</th>
// //             <th>Address</th>
// //             <th>Actions</th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {users.map((u) => (
// //             <tr key={u.id}>
// //               <td>{u.id}</td>

// //               <td>{u.email}</td>

// //               <td>{u.address || "N/A"}</td>

// //               <td>
// //                 <button
// //                   className="btn btn-danger btn-sm"
// //                   onClick={() => deleteUser(u.id)}
// //                 >
// //                   Delete
// //                 </button>
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // export default Users;

// import { useEffect, useState } from "react";
// import axios from "axios";

// function Users() {
//   const [users, setUsers] = useState([]);

//   const token = localStorage.getItem("token");
//   const currentUserId = Number(localStorage.getItem("user_id"));

//   const loadUsers = async () => {
//     try {
//       const res = await axios.get(
//         "https://fastapi-project-1-j38l.onrender.com/users/",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setUsers(res.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     loadUsers();
//   }, []);

//   const deleteUser = async (id) => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete your account?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await axios.delete(
//         `https://fastapi-project-1-j38l.onrender.com/users/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Account deleted successfully");

//       localStorage.clear();

//       window.location.href = "/";
//     } catch (error) {
//       alert("Unable to delete account");
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <h2>Users</h2>

//       <table className="table table-bordered table-hover">
//         <thead className="table-dark">
//           <tr>
//             <th>ID</th>
//             <th>Email</th>
//             <th>Address</th>
//             <th>Update Details</th>
//             <th>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((u) => (
//             <tr key={u.id}>
//               <td>{u.id}</td>

//               <td>{u.email}</td>

//               <td>{u.address || "N/A"}</td>
              
//               <td>
//                 {u.id === currentUserId ? (
//                   <button
//                     className="btn btn-danger btn-sm"
//                     onClick={() => deleteUser(u.id)}
//                   >
//                     Delete My Account
//                   </button>
//                 ) : (
//                   <span className="badge bg-secondary">
//                     Other User
//                   </span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Users;

import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const token = localStorage.getItem("token");
  const currentUserId = Number(localStorage.getItem("user_id"));

  const API_URL = "https://fastapi-project-1-j38l.onrender.com";

  const loadUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const openEditForm = (user) => {
    setEditUser(user);
    setEmail(user.email);
    setAddress(user.address || "");
    setPhoneNumber(user.phone_number || "");
  };

  const updateUser = async () => {
    try {
      await axios.put(
        `${API_URL}/users/${editUser.id}`,
        {
          email: email,
          address: address,
          phone_number: phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated Successfully");

      setEditUser(null);
      loadUsers();
    } catch (error) {
      console.log(error);
      alert("Unable to update profile");
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Account deleted successfully");

      localStorage.clear();

      window.location.href = "/";
    } catch (error) {
      console.log(error);
      alert("Unable to delete account");
    }
  };

  return (
    <div className="container mt-3">
      <h2 className="mb-3">Users</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Update</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>

              <td>{u.email}</td>

              <td>{u.phone_number || "N/A"}</td>

              <td>{u.address || "N/A"}</td>

              <td>
                {u.id === currentUserId ? (
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => openEditForm(u)}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <span className="badge bg-secondary">
                    Other User
                  </span>
                )}
              </td>

              <td>
                {u.id === currentUserId ? (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete My Account
                  </button>
                ) : (
                  <span className="badge bg-secondary">
                    Other User
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editUser && (
        <div className="card shadow mt-4">
          <div className="card-header bg-warning">
            <h4 className="mb-0">Update My Profile</h4>
          </div>

          <div className="card-body">
            <div className="mb-3">
              <label className="form-label">Email</label>

              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>

              <input
                type="text"
                className="form-control"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Address</label>

              <input
                type="text"
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <button
              className="btn btn-success me-2"
              onClick={updateUser}
            >
              Save Changes
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setEditUser(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;