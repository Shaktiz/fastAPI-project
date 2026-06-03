
// import { useEffect, useState } from "react";
// import axios from "axios";

// function Users() {
//   const [users, setUsers] = useState([]);

//   const token = localStorage.getItem("token");

//   const loadUsers = async () => {
//     try {
//       const res = await axios.get(
//         "https://fastapi-project-ap5t.onrender.com/users/",
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
//       "Are you sure you want to delete this user?"
//     );

//     if (!confirmDelete) return;

//     try {
//       await axios.delete(
//         `https://fastapi-project-ap5t.onrender.com/users/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setUsers(users.filter((u) => u.id !== id));
//     } catch (error) {
//       alert("You are not authorized to delete this user.");
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
//                 <button
//                   className="btn btn-danger btn-sm"
//                   onClick={() => deleteUser(u.id)}
//                 >
//                   Delete
//                 </button>
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

  const token = localStorage.getItem("token");
  const currentUserId = Number(localStorage.getItem("user_id"));

  const loadUsers = async () => {
    try {
      const res = await axios.get(
        "https://fastapi-project-ap5t.onrender.com/users/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `https://fastapi-project-ap5t.onrender.com/users/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Account deleted successfully");

      localStorage.clear();

      window.location.href = "/";
    } catch (error) {
      alert("Unable to delete account");
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Users</h2>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>

              <td>{u.email}</td>

              <td>{u.address || "N/A"}</td>

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
    </div>
  );
}

export default Users;