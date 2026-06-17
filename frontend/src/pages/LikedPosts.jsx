// import { useEffect, useState } from "react";
// import axios from "axios";

// function LikedPosts() {

// const [posts,setPosts]=useState([]);

// const token =
// localStorage.getItem("token");

// const API_URL =
// "https://fastapi-project-1-j38l.onrender.com";

// useEffect(() => {

// loadPosts();

// }, []);

// const loadPosts = async () => {

//     const res = await axios.get(
//         `${API_URL}/vote/liked-posts`,
//         {
//         headers:{
//         Authorization:
//         `Bearer ${token}`
//         }
//         }
//         );

//         setPosts(res.data);

//         };
//         return (

//         <div className="container mt-4">

//         <h2>❤️ Liked Posts</h2>

//         {posts.map(post => (

//         <div
//         className="card p-3 mb-3"
//         key={post.id}
//         >

//         <h4>{post.title}</h4>

//         <p>{post.content}</p>

//         </div>

//         ))}

//         </div>

//     );
// }

// export default LikedPosts;



import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function LikedPosts() {

const [posts, setPosts] = useState([]);
const [search, setSearch] = useState("");

const [darkMode, setDarkMode] = useState(
localStorage.getItem("darkMode") === "true"
);

const token = localStorage.getItem("token");

const API_URL =
"https://fastapi-project-1-j38l.onrender.com";

useEffect(() => {
loadPosts();
}, []);

const loadPosts = async () => {
try {


  const res = await axios.get(
    `${API_URL}/vote/liked-posts`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  setPosts(res.data);

} catch (err) {
  console.log(err);
}


};

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

    <h2
      className="fw-bold mb-4"
      style={{
        color: darkMode ? "#fff" : "#000",
      }}
    >
      ❤️ Liked Posts Details
    </h2>

    {filteredPosts.length === 0 ? (
      <div className="users-glass-card text-center p-4">
        <h4>No liked posts found</h4>
      </div>
    ) : (
      filteredPosts.map((post) => (
        <div
          key={post.id}
          className="post-glass-card mb-4"
        >
          <h4>{post.title}</h4>

          <hr />

          <p>{post.content}</p>

        </div>
      ))
    )}

  </div>
</>


);
}

export default LikedPosts;
