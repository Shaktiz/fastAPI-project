
// import { useEffect, useState } from "react";
// import { useCallback, useMemo  } from "react";
// import axios from "axios";

// function Posts({ search, darkMode }) {
//   const [posts, setPosts] = useState([]);
//   const [likedPosts, setLikedPosts] = useState([]);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const token = localStorage.getItem("token");
//   const currentUserId = Number(localStorage.getItem("user_id"));

//   const API_URL =
//     "https://fastapi-project-1-j38l.onrender.com";

//   const authConfig = useMemo(
//       () => ({
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }),
//       [token]
//     );
  
//     // const loadPosts = async () => {
//   const loadPosts = useCallback(async () => {
//     try {
//       const res = await axios.get(
//         `${API_URL}/posts/`,
//         authConfig
//       );

//       setPosts(res.data || []);
//       } catch (err) {
//       console.log(err);
//       alert("Failed to load posts");}
//     }, [authConfig]);

//     useEffect(() => {
//       loadPosts();
//     }, [loadPosts]);

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

//   const updatePost = async (post) => {
//     if (post.Post.owner_id !== currentUserId) {
//       alert("You can only edit your own posts");
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

//   const toggleVote = async (postId) => {
//     try {
//       const alreadyLiked =
//         likedPosts.includes(postId);

//       await axios.post(
//         `${API_URL}/vote/`,
//         {
//           post_id: postId,
//           dir: alreadyLiked ? 0 : 1,
//         },
//         authConfig
//       );

//       if (alreadyLiked) {
//         setLikedPosts((prev) =>
//           prev.filter((id) => id !== postId)
//         );
//       } else {
//         setLikedPosts((prev) => [
//           ...prev,
//           postId,
//         ]);
//       }

//       loadPosts();
//     } catch (err) {
//       console.log(err);
//       alert("Vote action failed");
//     }
//   };

//   const filteredPosts = posts.filter((p) => {
//     if (!search?.trim()) return true;

//     const query = search.toLowerCase();

//     return (
//       p.Post.title?.toLowerCase().includes(query) ||
//       p.Post.content?.toLowerCase().includes(query)
//     );
//   });

//   return (
//     // <div className="container-fluid">
//     <div className="social-card mb-4">
//       <div className="d-flex justify-content-between align-items-center mb-4">
//         <h2 className="fw-bold text-primary">
//           📢 Community Posts
//         </h2>

//         <span className="badge bg-primary fs-6">
//           Total Posts: {filteredPosts.length}
//         </span>
//       </div>

//       {/* Create Post */}

//       <div
//         // className={`card shadow-lg border-0 rounded-4 p-4 mb-4 ${
//           className={`create-post-card mb-4 ${
//           darkMode ? "bg-dark text-light" : ""
//         }`}
//       >
//         <h5>✍️ Create New Post</h5>

//         <input
//           className="form-control my-2"
//           placeholder="Post Title"
//           value={title}
//           onChange={(e) =>
//             setTitle(e.target.value)
//           }
//         />

//         <textarea
//           className="form-control my-2"
//           rows="4"
//           placeholder="Write something..."
//           value={content}
//           onChange={(e) =>
//             setContent(e.target.value)
//           }
//         />

//         <button
//           className="btn btn-primary mt-2"
//           onClick={createPost}
//         >
//           🚀 Publish Post
//         </button>
//       </div>

//       {/* Posts List */}

//       {filteredPosts.map((p) => {
//         const liked = likedPosts.includes(
//           p.Post.id
//         );

//         return (
//           <div
//             key={p.Post.id}
//             className={`card shadow-lg border-0 rounded-4 p-4 mb-4 ${
//               darkMode
//                 ? "bg-dark text-light"
//                 : ""
//             }`}
//           >
//             <div className="d-flex justify-content-between align-items-center">

//               <h4 className="text-primary">
//                 {p.Post.title}
//               </h4>

//               <span className="badge bg-secondary">
//                 #{p.Post.id}
//               </span>

//             </div>

//             <hr />

//             <p>{p.Post.content}</p>

//               <div className="d-flex align-items-center mb-3">
//                 <img
//                   src={
//                     p.profile_image
//                       ? `${API_URL}${p.profile_image}`
//                       : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
//                   }
//                   alt="Profile"
//                   width="40"
//                   height="40"
//                   className="rounded-circle me-2"
//                 />

//                 <div>
//                   <strong>Posted by : User #{p.Post.owner_id}</strong>
//                 </div>
//               </div>

//             <div className="mb-3">

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

//               <span className="badge bg-success ms-3">
//                 👍 {p.votes || 0}
//               </span>

//             </div>
//             {p.Post.owner_id ===
//               currentUserId ? (
//                 <>
//                   <button
//                     className="btn btn-outline-warning me-2"
//                     onClick={() =>
//                       updatePost(p)
//                     }
//                   >
//                     ✏️ Edit
//                   </button>

//                   <button
//                     className="btn btn-outline-danger"
//                     onClick={() =>
//                       deletePost(p)
//                     }
//                   >
//                     🗑 Delete
//                   </button>
//                 </>
//               ) : (
//                 <span className="badge bg-secondary">
//                   Other User Post
//                 </span>
//               )}
//           </div>
//         );
//       })}

//       {filteredPosts.length === 0 && (
//         <div className="card p-5 text-center">
//           <h4>🔍 No Posts Found</h4>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Posts;



import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";

function Posts({ search }) {
const [posts, setPosts] = useState([]);
const [likedPosts, setLikedPosts] = useState([]);
const [title, setTitle] = useState("");
const [content, setContent] = useState("");

const token = localStorage.getItem("token");
const currentUserId = Number(localStorage.getItem("user_id"));

const API_URL = "https://fastapi-project-1-j38l.onrender.com";

const authConfig = useMemo(
      () => ({
      headers: {
      Authorization: `Bearer ${token}`,
      },
      }),
      [token]
      );

      const loadPosts = useCallback(async () => {
      try {
      const res = await axios.get(
      `${API_URL}/posts/`,
      authConfig
      );


        setPosts(res.data || []);
      } catch (err) {
        console.log(err);
        alert("Failed to load posts");
      }


      }, [authConfig]);

      useEffect(() => {
      loadPosts();
      }, [loadPosts]);

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

      const updatePost = async (post) => {
      if (post.Post.owner_id !== currentUserId) {
      alert("You can only edit your own posts");
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

      const toggleVote = async (postId) => {
      try {
      const alreadyLiked =
      likedPosts.includes(postId);

        await axios.post(
          `${API_URL}/vote/`,
          {
            post_id: postId,
            dir: alreadyLiked ? 0 : 1,
          },
          authConfig
        );

        if (alreadyLiked) {
          setLikedPosts((prev) =>
            prev.filter((id) => id !== postId)
          );
        } else {
          setLikedPosts((prev) => [
            ...prev,
            postId,
          ]);
        }

        loadPosts();
      } catch (err) {
        console.log(err);
        alert("Vote action failed");
      }


      };

      const filteredPosts = posts.filter((p) => {
      if (!search?.trim()) return true;

      const query = search.toLowerCase();

      return (
        p.Post.title?.toLowerCase().includes(query) ||
        p.Post.content?.toLowerCase().includes(query)
      );


      });

      return ( 
      <div className="social-card">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2
            className="fw-bold"
            style={{ color: "#ffffff" }}
          >
            📢 Community Posts
          </h2>

          <span className="badge bg-primary fs-6">
            Total Posts: {filteredPosts.length}
          </span>
        </div>

        {/* CREATE POST */}

        <div className="create-post-card mb-4">

          <h5
            className="fw-bold mb-3"
            style={{ color: "white" }}
          >
            ✍️ Create New Post
          </h5>

          <input
            className="form-control mb-3"
            placeholder="Post Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <textarea
            className="form-control"
            rows="4"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
          />

          <button
            className="btn btn-primary mt-3 px-4"
            onClick={createPost}
          >
            🚀 Publish Post
          </button>

        </div>

        {/* POSTS */}

        {filteredPosts.map((p) => {
          const liked =
            likedPosts.includes(p.Post.id);

          return (
            <div
              key={p.Post.id}
              className="post-glass-card mb-4"
            >

              <div className="d-flex justify-content-between align-items-center">

                <h4
                  className="fw-bold mb-0"
                  style={{ color: "white" }}
                >
                  {p.Post.title}
                </h4>

                <span className="badge bg-dark">
                  #{p.Post.id}
                </span>

              </div>

              <hr />

              <p
                style={{
                  color: "rgba(255,255,255,.95)",
                  lineHeight: "1.8",
                }}
              >
                {p.Post.content}
              </p>

              <div className="d-flex align-items-center mb-3">

                <img
                  src={
                    p.profile_image
                      ? `${API_URL}${p.profile_image?.startsWith("/") ? "" : "/"}${p.profile_image}`
                      : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  }
                  alt="Profile"
                  className="profile-avatar me-3"
                />

                <div>
                  <strong
                    style={{ color: "white" }}
                  >
                    Posted by User #{p.Post.owner_id}
                  </strong>
                </div>

              </div>

              <div className="d-flex align-items-center gap-3 mb-4">

                <button
                  className="like-btn"
                  onClick={() =>
                    toggleVote(p.Post.id)
                  }
                >
                  {liked
                    ? "❤️ Liked"
                    : "🤍 Like"}
                </button>

                <span className="badge bg-success">
                  👍 {p.votes || 0}
                </span>

              </div>

              <div className="d-flex gap-2 flex-wrap">

                {p.Post.owner_id ===
                currentUserId ? (
                  <>
                    <button
                      className="btn btn-warning"
                      onClick={() =>
                        updatePost(p)
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        deletePost(p)
                      }
                    >
                      🗑 Delete
                    </button>
                  </>
                ) : (
                  <span className="badge bg-secondary">
                    Community Post
                  </span>
                )}

              </div>

            </div>
          );
        })}

        {filteredPosts.length === 0 && (
          <div className="post-glass-card text-center">
            <h4 style={{ color: "white" }}>
              🔍 No Posts Found
            </h4>
          </div>
        )}

      </div>
  );
}

export default Posts;
