import { useEffect, useState } from "react";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  // Logged in User ID
  const currentUserId = Number(
    localStorage.getItem("user_id")
  );

  const loadPosts = async () => {
    try {
      const res = await axios.get(
        "https://fastapi-project-1-j38l.onrender.com/posts/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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

  const createPost = async () => {
    if (!title.trim()) {
      alert("Enter post title");
      return;
    }

    try {
      await axios.post(
        "https://fastapi-project-1-j38l.onrender.com/posts/",
        {
          title,
          content: "React Post",
          published: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      loadPosts();
    } catch (err) {
      console.log(err);
      alert("Failed to create post");
    }
  };

  const deletePost = async (post) => {
    const ownerId = post.Post.owner_id;

    if (ownerId !== currentUserId) {
      alert(
        "❌ You can only delete your own posts."
      );
      return;
    }

    try {
      await axios.delete(
        `https://fastapi-project-1-j38l.onrender.com/posts/${post.Post.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadPosts();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  const updatePost = async (post) => {
    const ownerId = post.Post.owner_id;

    if (ownerId !== currentUserId) {
      alert(
        "❌ You can only update your own posts."
      );
      return;
    }

    const newTitle = prompt(
      "Enter New Title",
      post.Post.title
    );

    if (!newTitle) return;

    try {
      await axios.put(
        `https://fastapi-project-1-j38l.onrender.com/posts/${post.Post.id}`,
        {
          title: newTitle,
          content: "Updated Content",
          published: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      loadPosts();
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <div>
      <h2>Posts</h2>

      <input
        className="form-control"
        placeholder="Post Title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br />

      <button
        className="btn btn-success"
        onClick={createPost}
      >
        Create Post
      </button>

      <hr />

      {posts.map((p) => (
        <div
          key={p.Post.id}
          className="card p-3 mb-3"
        >
          <h5>{p.Post.title}</h5>

          <p>
            <strong>Owner ID:</strong>{" "}
            {p.Post.owner_id}
          </p>

          {p.Post.owner_id === currentUserId ? (
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
            <div>
              <span className="badge bg-secondary">
                Other User Post
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Posts;