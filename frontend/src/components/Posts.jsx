

import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";

function Posts({ search }) {
const [posts, setPosts] = useState([]);
const [likedPosts, setLikedPosts] = useState([]);

const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const [comments, setComments] = useState({});
const [commentText, setCommentText] = useState({});

const [savedPosts, setSavedPosts] = useState([]);
const token = localStorage.getItem("token");
const currentUserId = Number(localStorage.getItem("user_id"));
const [openPostMenu, setOpenPostMenu] = useState(null);
const [openCommentMenu, setOpenCommentMenu] = useState(null);
const [users, setUsers] = useState({});
const API_URL = "https://fastapi-project-1-j38l.onrender.com";

const getRelativeTime = (dateString) => {
  if (!dateString) return "";

  const now = new Date();
  const created = new Date(dateString);

  const diff = Math.floor(
    (now - created) / 1000
  );

  if (diff < 60)
    return `${diff} sec ago`;

  if (diff < 3600)
    return `${Math.floor(diff / 60)} min ago`;

  if (diff < 86400)
    return `${Math.floor(diff / 3600)} hr ago`;

  if (diff < 2592000)
    return `${Math.floor(diff / 86400)} day ago`;

  return created.toLocaleDateString();
};

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
        res.data.forEach((p) => {
          loadComments(p.Post.id);
        });
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
      const loadLikedPosts = async () => {
          try {

            const res = await axios.get(
              `${API_URL}/vote/liked-post-ids`,
              authConfig
            );

            setLikedPosts(
              (res.data || []).map((id) => Number(id))
            );

          } catch (err) {
            console.log(err);
          }
        };

        useEffect(() => {
          loadPosts();
          loadLikedPosts();
        }, [loadPosts]);

    const toggleVote = async (postId) => {
        try {

          const liked =
            likedPosts.includes(Number(postId));

          await axios.post(
            `${API_URL}/vote/`,
            {
              post_id: postId,
              dir: liked ? 0 : 1,
            },
            authConfig
          );

          if (liked) {

            setLikedPosts((prev) =>
              prev.filter(
                (id) => Number(id) !== Number(postId)
              )
            );

          } else {

            setLikedPosts((prev) => [
              ...prev,
              Number(postId),
            ]);

          }

          loadPosts();

        } catch (err) {
          console.log(err);

          if (
            err?.response?.data?.detail
          ) {
            alert(err.response.data.detail);
          }
        }
      };

      const loadSavedPosts = async () => {
          try {
            const res = await axios.get(
              `${API_URL}/saved-posts/ids`,
              authConfig
            );

            setSavedPosts(res.data || []);
          } catch (err) {
            console.log(err);
          }
        };
        useEffect(() => {
          loadPosts();
          loadSavedPosts();
        }, []);

      const savePost = async (postId) => {
            try {
              const res = await axios.post(
                `${API_URL}/saved-posts/${postId}`,
                {},
                authConfig
              );

              if (
                res.data.message ===
                "Post Saved Successfully"
              ) {
                setSavedPosts((prev) => [
                  ...prev,
                  postId,
                ]);
              }

              alert(res.data.message);
            } catch (err) {
              console.log(err);
            }
          };

        const toggleSavePost = async (postId) => {

        const alreadySaved =
          savedPosts.includes(postId);

        try {

          if (alreadySaved) {

            await axios.delete(
              `${API_URL}/saved-posts/${postId}`,
              authConfig
            );

            setSavedPosts(prev =>
              prev.filter(id => id !== postId)
            );

          } else {

            await axios.post(
              `${API_URL}/saved-posts/${postId}`,
              {},
              authConfig
            );

            setSavedPosts(prev => [
              ...prev,
              postId
            ]);
          }

        } catch (err) {
          console.log(err);
        }
      };

        const loadComments = async (postId) => {
          try {

            const res = await axios.get(
              `${API_URL}/comments/${postId}`,
              authConfig
            );

            setComments((prev) => ({
              ...prev,
              [postId]: res.data || [],
            }));

          } catch (err) {
            console.log(err);
          }
        };

        const addComment = async (postId) => {
          try {

            await axios.post(
              `${API_URL}/comments/${postId}`,
              {
                content: commentText[postId],
              },
              authConfig
            );

            setCommentText((prev) => ({
              ...prev,
              [postId]: "",
            }));

            await loadComments(postId);

          } catch (err) {
            console.log(err);

            console.log(
              "COMMENT ERROR:",
              err.response?.data
            );

            alert("Failed to add comment");
          }
        };

        const updateComment = async (commentId, oldContent, postId) => {

          const newContent = prompt(
            "Edit Comment",
            oldContent
          );

          if (!newContent) return;

          try {

            await axios.put(
              `${API_URL}/comments/${commentId}`,
              {
                content: newContent
              },
              authConfig
            );

            loadComments(postId);

          } catch (err) {
            console.log(err);
          }
        };
        const deleteComment = async (
            commentId,
            postId
          ) => {

            if (
              !window.confirm(
                "Delete this comment?"
              )
            )
              return;

            try {

              await axios.delete(
                `${API_URL}/comments/${commentId}`,
                authConfig
              );

              loadComments(postId);

            } catch (err) {
              console.log(err);
            }
          };
          const loadUsers = async () => {
            try {
              const res = await axios.get(
                `${API_URL}/users`,
                authConfig
              );

              const usersMap = {};

              res.data.forEach((user) => {
                usersMap[user.id] = user.email;
              });

              setUsers(usersMap);

            } catch (err) {
              console.log(err);
            }
          };
          useEffect(() => {
              loadUsers();
            }, []);
      const filteredPosts = posts.filter((p) => {
      if (!search?.trim()) return true;

      const query = search.toLowerCase();

      return (
        p.Post.title?.toLowerCase().includes(query) ||
        p.Post.content?.toLowerCase().includes(query)
      );


      });

      return ( 
      // <div className="social-card">
      
        <div className="d-flex justify-content-center">
          <div
            className="social-card"
            style={{
              width: "100%",
              maxWidth: "950px",
            }}>

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
  const liked = likedPosts.includes(p.Post.id);
  const saved = savedPosts.includes(p.Post.id);

  return (
    <div
      key={p.Post.id}
      className="post-glass-card mb-4 position-relative"
    >
      {/* HEADER */}

      <div className="d-flex justify-content-between align-items-start">

        <div className="d-flex align-items-center">

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

            <h4
              className="fw-bold mb-1"
              style={{ color: "white" }}
            >
              {p.Post.title}
            </h4>

            <div
              style={{
                color: "#fff",
                fontSize: "14px",
              }}
            >
              <strong>
                Posted by : {p.Post.owner?.email?.split("@")[0] ||
                  "Unknown User"}
              </strong>
            </div>

            <small className="text-light opacity-75">
             🕒 {getRelativeTime(
                p.Post.created_at
              )}
            </small>

          </div>

        </div>

        {/* POST OWNER MENU */}

        {p.Post.owner_id === currentUserId && (
          <div className="dropdown">

            <button
              className="btn btn-sm btn-dark"
              data-bs-toggle="dropdown"
            >
              ⋮
            </button>

            <ul className="dropdown-menu dropdown-menu-end">

              <li>
                <button
                  className="dropdown-item"
                  onClick={() =>
                    updatePost(p)
                  }
                >
                  ✏️ Edit Post
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() =>
                    deletePost(p)
                  }
                >
                  🗑 Delete Post
                </button>
              </li>

            </ul>

          </div>
        )}

      </div>

      <hr />

      {/* CONTENT */}

      <p
        style={{
          color: "rgba(255,255,255,.95)",
          lineHeight: "1.8",
        }}
      >
        {p.Post.content}
      </p>

      {/* ACTIONS */}

      <div className="d-flex flex-wrap align-items-center gap-2 mb-4">

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

        <button
          className={`btn ${
            saved
              ? "btn-success"
              : "btn-outline-success"
          }`}
          onClick={() =>
            toggleSavePost(p.Post.id)
          }
        >
          {saved
            ? "✅ Saved"
            : "🔖 Save"}
        </button>

        <span className="badge bg-success">
          👍 {p.votes || 0}
        </span>

      </div>

      {/* COMMENTS SECTION */}

      {/* <div className="comments-section"> */}
        <div
          key={p.id}
          className="comments-section p-3 rounded mb-2 position-relative"
        >

        <h6
          className="mb-3"
          style={{
            color: "white",
            fontWeight: "600",
          }}
        >
          💬 Comments
        </h6>

        {/* ADD COMMENT */}

        <div className="mb-4">

          <input
            type="text"
            className="form-control"
            placeholder="Write a comment..."
            value={
              commentText[p.Post.id] || ""
            }
            onChange={(e) =>
              setCommentText({
                ...commentText,
                [p.Post.id]:
                  e.target.value,
              })
            }
          />

          <button
            className="btn btn-info mt-2"
            onClick={() =>
              addComment(p.Post.id)
            }
          >
            Add Comment
          </button>

        </div>

        {/* COMMENTS LIST */}

        {comments[p.Post.id]?.length >
        0 ? (
          comments[p.Post.id].map(
            (c) => (
              <div
                key={c.id}
                className="comment-card p-3 rounded mb-2 d-flex justify-content-between align-items-start"
              >

                <div>

                  <div
                    style={{
                      fontSize: "13px",
                      color: "#bbb",
                    }}
                  >
                    👤 {users[c.user_id]?.split("@")[0] || "Unknown User"}
                  </div>

                  <div
                    style={{
                      fontSize: "15px",
                    }}
                  >
                    {c.content}
                  </div>

                </div>

                {/* COMMENT MENU */}

                {c.user_id ===
                  currentUserId && (
                  <div className="dropdown">

                    <button
                      className="btn btn-sm btn-secondary"
                      data-bs-toggle="dropdown"
                    >
                      ⋮
                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">

                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() =>
                            updateComment(
                              c.id,
                              c.content,
                              p.Post.id
                            )
                          }
                        >
                          ✏️ Edit Comment
                        </button>
                      </li>

                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() =>
                            deleteComment(
                              c.id,
                              p.Post.id
                            )
                          }
                        >
                          🗑 Delete Comment
                        </button>
                      </li>

                    </ul>

                  </div>
                )}

              </div>
            )
          )
        ) : (
          <div
            className="text-light opacity-75"
            style={{
              fontSize: "14px",
            }}
          >
            No comments yet...
          </div>
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
    </div>
  );
}

export default Posts;
