// import { useEffect, useState } from "react";
// import axios from "axios";

// function Posts() {
//   const [posts, setPosts] = useState([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const token = localStorage.getItem("token");
//   const currentUserId = Number(localStorage.getItem("user_id"));

//   const API_URL =
//     "https://fastapi-project-1-j38l.onrender.com";

//   const loadPosts = async () => {
//     try {
//       const res = await axios.get(
//         `${API_URL}/posts/`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       console.log("Posts:", res.data);

//       setPosts(res.data);
//     } catch (err) {
//       console.log(err);
//       alert("Failed to load posts");
//     }
//   };

//   useEffect(() => {
//     loadPosts();
//   }, []);

//   const createPost = async () => {
//     if (!title.trim() || !content.trim()) {
//       alert("Please enter title and content");
//       return;
//     }

//     try {
//       await axios.post(
//         `${API_URL}/posts/`,
//         {
//           title,
//           content,
//           published: true,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setTitle("");
//       setContent("");

//       loadPosts();
//     } catch (err) {
//       console.log(err);
//       alert("Failed to create post");
//     }
//   };

//   const deletePost = async (post) => {
//     if (post.Post.owner_id !== currentUserId) {
//       alert("You can only delete your own posts");
//       return;
//     }

//     if (!window.confirm("Delete this post?")) {
//       return;
//     }

//     try {
//       await axios.delete(
//         `${API_URL}/posts/${post.Post.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       loadPosts();
//     } catch (err) {
//       console.log(err);
//       alert("Delete failed");
//     }
//   };

//   const updatePost = async (post) => {
//     if (post.Post.owner_id !== currentUserId) {
//       alert("You can only update your own posts");
//       return;
//     }

//     const newTitle = prompt(
//       "Enter New Title",
//       post.Post.title
//     );

//     if (newTitle === null) return;

//     const newContent = prompt(
//       "Enter New Content",
//       post.Post.content
//     );

//     if (newContent === null) return;

//     try {
//       await axios.put(
//         `${API_URL}/posts/${post.Post.id}`,
//         {
//           title: newTitle,
//           content: newContent,
//           published: true,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       loadPosts();
//     } catch (err) {
//       console.log(err);
//       alert("Update failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Posts</h2>

//       <input
//         className="form-control mb-2"
//         placeholder="Post Title"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <textarea
//         className="form-control mb-2"
//         placeholder="Post Content"
//         value={content}
//         onChange={(e) => setContent(e.target.value)}
//       />

//       <button
//         className="btn btn-success"
//         onClick={createPost}
//       >
//         Create Post
//       </button>

//       <hr />

//       {posts.map((p) => (
//         <div
//           key={p.Post.id}
//           className="card p-3 mb-3"
//         >
//           <h4>{p.Post.title}</h4>

//           <p>
//             <strong>Content:</strong>
//             <br />
//             {p.Post.content}
//           </p>

//           <p>
//             <strong>Owner ID:</strong>{" "}
//             {p.Post.owner_id}
//           </p>

//           <p>
//             <strong>Votes:</strong>{" "}
//             {p.votes ?? 0}
//           </p>

//           {p.Post.owner_id === currentUserId ? (
//             <>
//               <button
//                 className="btn btn-warning me-2"
//                 onClick={() => updatePost(p)}
//               >
//                 Update
//               </button>

//               <button
//                 className="btn btn-danger"
//                 onClick={() => deletePost(p)}
//               >
//                 Delete
//               </button>
//             </>
//           ) : (
//             <span className="badge bg-secondary">
//               Other User Post
//             </span>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Posts;

// import { useEffect, useState } from "react";
// import axios from "axios";

// function Posts() {
//   const [posts, setPosts] = useState([]);
//   const [likedPosts, setLikedPosts] = useState([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const token = localStorage.getItem("token");
//   const currentUserId = Number(localStorage.getItem("user_id"));

//   const API_URL =
//     "https://fastapi-project-1-j38l.onrender.com";

//   const loadPosts = async () => {
//     try {
//       const res = await axios.get(
//         `${API_URL}/posts/`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setPosts(res.data);
//     } catch (err) {
//       console.log(err);
//       alert("Failed to load posts");
//     }
//   };

//   const loadLikes = async () => {
//     try {
//       const res = await axios.get(
//         `${API_URL}/vote/my-votes`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       const likedIds = res.data.map(
//         (vote) => vote.post_id
//       );

//       setLikedPosts(likedIds);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     loadPosts();
//     loadLikes();
//   }, []);

//   const createPost = async () => {
//     if (!title.trim() || !content.trim()) {
//       alert("Please enter title and content");
//       return;
//     }

//     try {
//       await axios.post(
//         `${API_URL}/posts/`,
//         {
//           title,
//           content,
//           published: true,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setTitle("");
//       setContent("");

//       loadPosts();
//     } catch (err) {
//       console.log(err);
//       alert("Failed to create post");
//     }
//   };

//   const deletePost = async (post) => {
//     if (post.Post.owner_id !== currentUserId) {
//       alert("You can only delete your own posts");
//       return;
//     }

//     if (!window.confirm("Delete this post?")) {
//       return;
//     }

//     try {
//       await axios.delete(
//         `${API_URL}/posts/${post.Post.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       loadPosts();
//     } catch (err) {
//       console.log(err);
//       alert("Delete failed");
//     }
//   };

//   const updatePost = async (post) => {
//     if (post.Post.owner_id !== currentUserId) {
//       alert("You can only update your own posts");
//       return;
//     }

//     const newTitle = prompt(
//       "Enter New Title",
//       post.Post.title
//     );

//     if (newTitle === null) return;

//     const newContent = prompt(
//       "Enter New Content",
//       post.Post.content
//     );

//     if (newContent === null) return;

//     try {
//       await axios.put(
//         `${API_URL}/posts/${post.Post.id}`,
//         {
//           title: newTitle,
//           content: newContent,
//           published: true,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       loadPosts();
//     } catch (err) {
//       console.log(err);
//       alert("Update failed");
//     }
//   };

//   const toggleLike = async (postId) => {
//     try {
//       const alreadyLiked =
//         likedPosts.includes(postId);

//       await axios.post(
//         `${API_URL}/vote`,
//         {
//           post_id: postId,
//           dir: alreadyLiked ? 0 : 1,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       loadPosts();
//       loadLikes();
//     } catch (err) {
//       console.log(err);
//       alert("Vote failed");
//     }
//   };

//   return (
//     <div>
//       <h2>Posts</h2>

//       <input
//         className="form-control mb-2"
//         placeholder="Post Title"
//         value={title}
//         onChange={(e) =>
//           setTitle(e.target.value)
//         }
//       />

//       <textarea
//         className="form-control mb-2"
//         placeholder="Post Content"
//         value={content}
//         onChange={(e) =>
//           setContent(e.target.value)
//         }
//       />

//       <button
//         className="btn btn-success"
//         onClick={createPost}
//       >
//         Create Post
//       </button>

//       <hr />

//       {posts.map((p) => (
//         <div
//           key={p.Post.id}
//           className="card p-3 mb-3"
//         >
//           <h4>{p.Post.title}</h4>

//           <p>
//             <strong>Content:</strong>
//             <br />
//             {p.Post.content || "No Content"}
//           </p>

//           <p>
//             <strong>Owner ID:</strong>{" "}
//             {p.Post.owner_id}
//           </p>

//           <div className="mb-3">
//             <button
//               className={
//                 likedPosts.includes(
//                   p.Post.id
//                 )
//                   ? "btn btn-danger btn-sm"
//                   : "btn btn-outline-danger btn-sm"
//               }
//               onClick={() =>
//                 toggleLike(p.Post.id)
//               }
//             >
//               {likedPosts.includes(
//                 p.Post.id
//               )
//                 ? "❤️ Liked"
//                 : "🤍 Like"}
//             </button>

//             <span className="ms-3">
//               <strong>
//                 Votes:
//               </strong>{" "}
//               {p.votes || 0}
//             </span>
//           </div>

//           {p.Post.owner_id ===
//           currentUserId ? (
//             <>
//               <button
//                 className="btn btn-warning me-2"
//                 onClick={() =>
//                   updatePost(p)
//                 }
//               >
//                 Update
//               </button>

//               <button
//                 className="btn btn-danger"
//                 onClick={() =>
//                   deletePost(p)
//                 }
//               >
//                 Delete
//               </button>
//             </>
//           ) : (
//             <span className="badge bg-secondary">
//               Other User Post
//             </span>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Posts;

// import { useEffect, useState } from "react";
// import axios from "axios";

// function Posts({ search }) {
//   const [posts, setPosts] = useState([]);
//   const [likedPosts, setLikedPosts] = useState([]);

//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const token = localStorage.getItem("token");
//   const currentUserId = Number(localStorage.getItem("user_id"));

//   const API_URL =
//     "https://fastapi-project-1-j38l.onrender.com";

//   const authConfig = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   // ==========================
//   // LOAD POSTS
//   // ==========================
//   const loadPosts = async () => {
//     try {
//       const res = await axios.get(
//         `${API_URL}/posts/`,
//         authConfig
//       );

//       setPosts(res.data);
//     } catch (err) {
//       console.log(err);
//       alert("Failed to load posts");
//     }
//   };

//   useEffect(() => {
//     loadPosts();
//   }, []);

//   // ==========================
//   // CREATE POST
//   // ==========================
//   const createPost = async () => {
//     if (!title.trim() || !content.trim()) {
//       alert("Please enter title and content");
//       return;
//     }

//     try {
//       await axios.post(
//         `${API_URL}/posts/`,
//         {
//           title,
//           content,
//           published: true,
//         },
//         authConfig
//       );

//       setTitle("");
//       setContent("");

//       loadPosts();
//     } catch (err) {
//       console.log(err);
//       alert("Failed to create post");
//     }
//   };

//   // ==========================
//   // DELETE POST
//   // ==========================
//   const deletePost = async (post) => {
//     if (post.Post.owner_id !== currentUserId) {
//       alert("You can only delete your own posts");
//       return;
//     }

//     if (!window.confirm("Delete this post?")) {
//       return;
//     }

//     try {
//       await axios.delete(
//         `${API_URL}/posts/${post.Post.id}`,
//         authConfig
//       );

//       loadPosts();
//     } catch (err) {
//       console.log(err);
//       alert("Delete failed");
//     }
//   };

//   // ==========================
//   // UPDATE POST
//   // ==========================
//   const updatePost = async (post) => {
//     if (post.Post.owner_id !== currentUserId) {
//       alert("You can only update your own posts");
//       return;
//     }

//     const newTitle = prompt(
//       "Enter New Title",
//       post.Post.title
//     );

//     if (newTitle === null) return;

//     const newContent = prompt(
//       "Enter New Content",
//       post.Post.content
//     );

//     if (newContent === null) return;

//     try {
//       await axios.put(
//         `${API_URL}/posts/${post.Post.id}`,
//         {
//           title: newTitle,
//           content: newContent,
//           published: true,
//         },
//         authConfig
//       );

//       loadPosts();
//     } catch (err) {
//       console.log(err);
//       alert("Update failed");
//     }
//   };

//   // ==========================
//   // LIKE / UNLIKE
//   // ==========================
//   const toggleVote = async (postId) => {
//     try {
//       const alreadyLiked =
//         likedPosts.includes(postId);

//       if (alreadyLiked) {
//         // REMOVE LIKE
//         await axios.post(
//           `${API_URL}/vote/`,
//           {
//             post_id: postId,
//             dir: 0,
//           },
//           authConfig
//         );

//         setLikedPosts((prev) =>
//           prev.filter((id) => id !== postId)
//         );

//         setPosts((prev) =>
//           prev.map((p) =>
//             p.Post.id === postId
//               ? {
//                   ...p,
//                   votes: Math.max(
//                     (p.votes || 0) - 1,
//                     0
//                   ),
//                 }
//               : p
//           )
//         );
//       } else {
//         // ADD LIKE
//         await axios.post(
//           `${API_URL}/vote/`,
//           {
//             post_id: postId,
//             dir: 1,
//           },
//           authConfig
//         );

//         setLikedPosts((prev) => [
//           ...prev,
//           postId,
//         ]);

//         setPosts((prev) =>
//           prev.map((p) =>
//             p.Post.id === postId
//               ? {
//                   ...p,
//                   votes: (p.votes || 0) + 1,
//                 }
//               : p
//           )
//         );
//       }
//     } catch (err) {
//       console.log(err);

//       if (
//         err.response?.data?.detail ===
//         "user already voted on this post"
//       ) {
//         setLikedPosts((prev) => [
//           ...prev,
//           postId,
//         ]);
//       } else {
//         alert("Vote action failed");
//       }
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2>Posts</h2>

//       <input
//         className="form-control mb-2"
//         placeholder="Post Title"
//         value={title}
//         onChange={(e) =>
//           setTitle(e.target.value)
//         }
//       />

//       <textarea
//         className="form-control mb-2"
//         placeholder="Post Content"
//         rows="3"
//         value={content}
//         onChange={(e) =>
//           setContent(e.target.value)
//         }
//       />

//       <button
//         className="btn btn-success"
//         onClick={createPost}
//       >
//         Create Post
//       </button>

//       <hr />

//       {posts.map((p) => {
//         const liked =
//           likedPosts.includes(p.Post.id);

//         return (
//           <div
//             key={p.Post.id}
//             className="card p-3 mb-3 shadow-sm"
//           >
//             <h4>{p.Post.title}</h4>

//             <p>
//               <strong>Post ID:</strong>{" "}
//               {p.Post.id}
//             </p>

//             <p>
//               <strong>Content:</strong>
//               <br />
//               {p.Post.content}
//             </p>

//             <p>
//               <strong>Owner ID:</strong>{" "}
//               {p.Post.owner_id}
//             </p>

//             <div className="mb-2">
//               <button
//                 className={`btn ${
//                   liked
//                     ? "btn-danger"
//                     : "btn-outline-danger"
//                 }`}
//                 onClick={() =>
//                   toggleVote(p.Post.id)
//                 }
//               >
//                 {liked
//                   ? "❤️ Liked"
//                   : "🤍 Like"}
//               </button>

//               <span className="ms-3 fw-bold">
//                 Total Votes: {p.votes || 0}
//               </span>
//             </div>

//             {p.Post.owner_id ===
//             currentUserId ? (
//               <>
//                 <button
//                   className="btn btn-warning me-2"
//                   onClick={() =>
//                     updatePost(p)
//                   }
//                 >
//                   Update
//                 </button>

//                 <button
//                   className="btn btn-danger"
//                   onClick={() =>
//                     deletePost(p)
//                   }
//                 >
//                   Delete
//                 </button>
//               </>
//             ) : (
//               <span className="badge bg-secondary">
//                 Other User Post
//               </span>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// export default Posts;






import { useEffect, useState } from "react";
import axios from "axios";

function Posts({ search = "" }) {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const token = localStorage.getItem("token");
  const currentUserId = Number(localStorage.getItem("user_id"));

  const API_URL =
    "https://fastapi-project-1-j38l.onrender.com";

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // ==========================
  // LOAD POSTS
  // ==========================
  const loadPosts = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/posts/`,
        authConfig
      );

      setPosts(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load posts");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // ==========================
  // CREATE POST
  // ==========================
  const createPost = async () => {
    if (!title.trim() || !content.trim()) {
      alert("Please enter title and content");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/posts/`,
        {
          title,
          content,
          published: true,
        },
        authConfig
      );

      setTitle("");
      setContent("");

      loadPosts();
    } catch (err) {
      console.log(err);
      alert("Failed to create post");
    }
  };

  // ==========================
  // DELETE POST
  // ==========================
  const deletePost = async (post) => {
    if (post.Post.owner_id !== currentUserId) {
      alert("You can only delete your own posts");
      return;
    }

    if (!window.confirm("Delete this post?")) {
      return;
    }

    try {
      await axios.delete(
        `${API_URL}/posts/${post.Post.id}`,
        authConfig
      );

      loadPosts();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // ==========================
  // UPDATE POST
  // ==========================
  const updatePost = async (post) => {
    if (post.Post.owner_id !== currentUserId) {
      alert("You can only update your own posts");
      return;
    }

    const newTitle = prompt(
      "Enter New Title",
      post.Post.title
    );

    if (newTitle === null) return;

    const newContent = prompt(
      "Enter New Content",
      post.Post.content
    );

    if (newContent === null) return;

    try {
      await axios.put(
        `${API_URL}/posts/${post.Post.id}`,
        {
          title: newTitle,
          content: newContent,
          published: true,
        },
        authConfig
      );

      loadPosts();
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  // ==========================
  // LIKE / UNLIKE
  // ==========================
  const toggleVote = async (postId) => {
    try {
      const alreadyLiked =
        likedPosts.includes(postId);

      if (alreadyLiked) {
        await axios.post(
          `${API_URL}/vote/`,
          {
            post_id: postId,
            dir: 0,
          },
          authConfig
        );

        setLikedPosts((prev) =>
          prev.filter((id) => id !== postId)
        );

        setPosts((prev) =>
          prev.map((p) =>
            p.Post.id === postId
              ? {
                  ...p,
                  votes: Math.max(
                    (p.votes || 0) - 1,
                    0
                  ),
                }
              : p
          )
        );
      } else {
        await axios.post(
          `${API_URL}/vote/`,
          {
            post_id: postId,
            dir: 1,
          },
          authConfig
        );

        setLikedPosts((prev) => [
          ...prev,
          postId,
        ]);

        setPosts((prev) =>
          prev.map((p) =>
            p.Post.id === postId
              ? {
                  ...p,
                  votes: (p.votes || 0) + 1,
                }
              : p
          )
        );
      }
    } catch (err) {
      console.log(err);

      if (
        err.response?.data?.detail ===
        "user already voted on this post"
      ) {
        setLikedPosts((prev) => [
          ...prev,
          postId,
        ]);
      } else {
        alert("Vote action failed");
      }
    }
  };

  // ==========================
  // SEARCH FILTER
  // ==========================
  const filteredPosts = posts.filter(
    (p) =>
      p.Post.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      p.Post.content
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Posts</h2>

      <input
        className="form-control mb-2"
        placeholder="Post Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        className="form-control mb-2"
        rows="3"
        placeholder="Post Content"
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
      />

      <button
        className="btn btn-success"
        onClick={createPost}
      >
        Create Post
      </button>

      <hr />

      <h5 className="mb-3">
        Posts Found: {filteredPosts.length}
      </h5>

      {filteredPosts.map((p) => {
        const liked =
          likedPosts.includes(p.Post.id);

        return (
          <div
            key={p.Post.id}
            className="card p-3 mb-3 shadow-sm"
          >
            <h4>{p.Post.title}</h4>

            <p>
              <strong>Post ID:</strong>{" "}
              {p.Post.id}
            </p>

            <p>
              <strong>Content:</strong>
              <br />
              {p.Post.content}
            </p>

            <p>
              <strong>Owner ID:</strong>{" "}
              {p.Post.owner_id}
            </p>

            <div className="mb-3">
              <button
                className={`btn ${
                  liked
                    ? "btn-danger"
                    : "btn-outline-danger"
                }`}
                onClick={() =>
                  toggleVote(p.Post.id)
                }
              >
                {liked
                  ? "❤️ Liked"
                  : "🤍 Like"}
              </button>

              <span className="ms-3 fw-bold">
                Total Votes: {p.votes || 0}
              </span>
            </div>

            {p.Post.owner_id ===
            currentUserId ? (
              <>
                <button
                  className="btn btn-warning me-2"
                  onClick={() =>
                    updatePost(p)
                  }
                >
                  Update
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() =>
                    deletePost(p)
                  }
                >
                  Delete
                </button>
              </>
            ) : (
              <span className="badge bg-secondary">
                Other User Post
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Posts;