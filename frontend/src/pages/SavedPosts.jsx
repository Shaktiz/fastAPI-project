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

  const loadSavedPosts = useCallback(
    async () => {

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
    },
    [token]
  );

  useEffect(() => {
    loadSavedPosts();
  }, [loadSavedPosts]);

  const removeSavedPost = async (
    postId
  ) => {

    try {

      await axios.delete(
        `${API_URL}/saved-posts/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts((prev) =>
        prev.filter(
          (post) => post.id !== postId
        )
      );

    } catch (err) {
      console.log(err);

      alert(
        "Failed to remove saved post"
      );
    }
  };

  const getRelativeTime = (
    dateString
  ) => {

    if (!dateString) return "";

    const now = new Date();

    const created =
      new Date(dateString);

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

  const filteredPosts =
    posts.filter((post) => {

      if (!search.trim())
        return true;

      return (
        post.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||

        post.content
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );
    });

  return (
    <>
      <Navbar
        search={search}
        setSearch={setSearch}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="container py-4">

        {/* HERO */}

        <div className="welcome-glass-card mb-4">

          <div className="d-flex justify-content-between align-items-center">

            <div>

              <h2 className="welcome-title">
                🔖 Saved Posts
              </h2>

              <p className="welcome-bio mb-0">
                Posts you've saved for
                later reading.
              </p>

            </div>

            <span className="badge bg-success fs-6">
              {filteredPosts.length} Saved
            </span>

          </div>

        </div>

        {/* EMPTY STATE */}

        {filteredPosts.length === 0 ? (

          <div className="users-glass-card text-center p-5">

            <h2>
              📂 No Saved Posts
            </h2>

            <p className="mt-3 opacity-75">
              Save community posts and
              they will appear here.
            </p>

          </div>

        ) : (

          filteredPosts.map((post) => (

            <div
              key={post.id}
              className="post-glass-card mb-4"
            >

              {/* HEADER */}

              <div className="d-flex justify-content-between align-items-start">

                <div className="d-flex align-items-center">

                  <img
                    src={
                      post.profile_image
                        ? `${API_URL}${post.profile_image}`
                        : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="profile"
                    className="profile-avatar me-3"
                  />

                  <div>

                    <h4 className="mb-1">
                      {post.title}
                    </h4>

                    <div
                      style={{
                        fontSize:
                          "14px",
                        opacity:
                          ".85",
                      }}
                    >
                      👤{" "}
                      {post.owner_email
                        ? post.owner_email.split(
                            "@"
                          )[0]
                        : "Unknown User"}
                    </div>

                    <small>
                      🕒{" "}
                      {getRelativeTime(
                        post.created_at
                      )}
                    </small>

                  </div>

                </div>

                <button
                  className="btn btn-outline-warning"
                  onClick={() =>
                    removeSavedPost(
                      post.id
                    )
                  }
                >
                  ❌ Unsave
                </button>

              </div>

              <hr />

              {/* CONTENT */}

              <p
                style={{
                  lineHeight: "1.8",
                }}
              >
                {post.content}
              </p>

              {/* FOOTER */}

              <div className="d-flex gap-2 flex-wrap">

                <span className="badge bg-success">
                  🔖 Saved
                </span>

                {/* <span className="badge bg-primary">
                  👍 {post.votes || 0}
                </span> */}

              </div>

            </div>

          ))
        )}

      </div>
    </>
  );
}

export default SavedPosts;