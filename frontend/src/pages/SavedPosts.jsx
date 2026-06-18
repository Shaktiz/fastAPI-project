// import { useEffect, useState } from "react";
// import axios from "axios";
// import Navbar from "../components/Navbar";

// function SavedPosts() {

//   const [posts, setPosts] = useState([]);
//   const token = localStorage.getItem("token");

//   const API_URL =
//     "https://fastapi-project-1-j38l.onrender.com";

//   useEffect(() => {
//     loadSavedPosts();
//   }, []);

//   const loadSavedPosts = async () => {
//     try {
//       const res = await axios.get(
//         `${API_URL}/saved-posts/`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setPosts(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <>
//       <Navbar />

//       <div className="container mt-4">

//         <h2 className="mb-4">
//           🔖 Saved Posts
//         </h2>

//         {posts.map((p) => (

//           <div
//             key={p.id}
//             className="card p-3 mb-3"
//           >

//             <h4>{p.title}</h4>

//             <p>{p.content}</p>

//           </div>

//         ))}

//       </div>
//     </>
//   );
// }

// export default SavedPosts;



// import { useEffect, useState } from "react";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function SavedPosts() {

const [posts, setPosts] = useState([]);
const [search, setSearch] = useState("");

const [darkMode, setDarkMode] = useState(
localStorage.getItem("darkMode") === "true"
);

const token = localStorage.getItem("token");

const API_URL =
"https://fastapi-project-1-j38l.onrender.com";



const loadSavedPosts = useCallback(async () => {
  try {
    const res = await axios.get(
      `${API_URL}/saved-posts/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setPosts(res.data || []);
  } catch (err) {
    console.log(err);
  }
}, [token]);

useEffect(() => {
loadSavedPosts();
}, [loadSavedPosts]);
const filteredPosts = posts.filter((post) => {


if (!search.trim()) return true;

return (
  post.title
    ?.toLowerCase()
    .includes(search.toLowerCase()) ||

  post.content
    ?.toLowerCase()
    .includes(search.toLowerCase())
);


});

return (
<> <Navbar
     search={search}
     setSearch={setSearch}
     darkMode={darkMode}
     setDarkMode={setDarkMode}
   />


  <div className="container mt-4">

    <h2 className="mb-4">
      🔖 Saved Posts
    </h2>

    {filteredPosts.length === 0 ? (

      <div className="users-glass-card text-center p-4">
        <h4>No Saved Posts</h4>
      </div>

    ) : (

      filteredPosts.map((p) => (

        <div
          key={p.id}
          className="post-glass-card mb-4"
        >

          <h4>{p.title}</h4>

          <hr />

          <p>{p.content}</p>

        </div>

      ))

    )}

  </div>
</>


);
}

export default SavedPosts;
