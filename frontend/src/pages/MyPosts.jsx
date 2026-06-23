import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
    const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const token = localStorage.getItem("token");
  const currentUserId = Number(
    localStorage.getItem("user_id")
  );

  const API_URL =
    "https://fastapi-project-1-j38l.onrender.com";

  useEffect(() => {
    loadMyPosts();
  }, []);

  const loadMyPosts = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/posts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const myPosts = res.data.filter(
        (post) =>
          post.Post.owner_id === currentUserId
      );

      setPosts(myPosts);
    } catch (err) {
      console.log(err);
    }
  };

  const deletePost = async (postId) => {
    const confirmDelete = window.confirm(
      "Delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API_URL}/posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadMyPosts();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  const updatePost = async (post) => {
    const title = prompt(
      "Edit Title",
      post.Post.title
    );

    if (!title) return;

    const content = prompt(
      "Edit Content",
      post.Post.content
    );

    if (!content) return;

    try {
      await axios.put(
        `${API_URL}/posts/${post.Post.id}`,
        {
          title,
          content,
          published: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadMyPosts();
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

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
      return `${Math.floor(diff / 86400)} days ago`;

    return created.toLocaleDateString();
  };

  const filteredPosts = posts.filter((p) =>
    p.Post.title
      ?.toLowerCase()
      .includes(search.toLowerCase()) ||
    p.Post.content
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalLikes = posts.reduce(
    (sum, p) => sum + (p.votes || 0),
    0
  );

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        />

      {/* <div className="container mt-4"> */}
      <div
            className="container mt-4"
            style={{
                color: darkMode ? "#fff" : "#000",
            }}
            >

        {/* PAGE HEADER */}

        <div className="d-flex justify-content-between align-items-center mb-4">

          <h2
            className="fw-bold"
            style={{ color: "white" }}
          >
            📝 My Posts
          </h2>

          <span className="badge bg-primary fs-6">
            {posts.length} Posts
          </span>

        </div>

        {/* STATS */}

        <div className="row mb-4">

          <div className="col-md-6 mb-3">

            <div className="post-glass-card text-center">

              <h2>{posts.length}</h2>

              <p className="mb-0">
                Total Posts
              </p>

            </div>

          </div>

          <div className="col-md-6 mb-3">

            <div className="post-glass-card text-center">

              <h2>{totalLikes}</h2>

              <p className="mb-0">
                Total Likes
              </p>

            </div>

          </div>

        </div>

        {/* SEARCH */}

        <input
          type="text"
          className="form-control mb-4"
          placeholder="🔍 Search your posts..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        {/* POSTS */}

        {filteredPosts.length === 0 ? (

          <div className="post-glass-card text-center">

            <h4>
              No Posts Found
            </h4>

          </div>

        ) : (

          filteredPosts.map((p) => (

            <div
              key={p.Post.id}
              className="post-glass-card mb-4"
              style={{
                transition: "0.3s",
              }}
            >

              {/* HEADER */}

              <div className="d-flex justify-content-between">

                <div className="d-flex">

                  <img
                    src={
                      p.profile_image ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="profile"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginRight: "15px",
                    }}
                  />

                  <div>

                    <h4 className="fw-bold">
                      {p.Post.title}
                    </h4>

                    <small>
                      {getRelativeTime(
                        p.Post.created_at
                      )}
                    </small>

                  </div>

                </div>

                {/* MENU */}

                <div>

                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() =>
                      updatePost(p)
                    }
                  >
                    ✏️ Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      deletePost(
                        p.Post.id
                      )
                    }
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>

              <hr />

              {/* CONTENT */}

              <p
                style={{
                  lineHeight: "1.8",
                }}
              >
                {p.Post.content}
              </p>

              <div className="d-flex gap-2">

                <span className="badge bg-success">
                  👍 {p.votes || 0}
                </span>

                <span className="badge bg-info">
                  Post ID #{p.Post.id}
                </span>

              </div>

            </div>

          ))
        )}

      </div>
    </>
  );
}

export default MyPosts;