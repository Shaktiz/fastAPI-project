import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function SavedPosts() {

  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem("token");

  const API_URL =
    "https://fastapi-project-1-j38l.onrender.com";

  useEffect(() => {
    loadSavedPosts();
  }, []);

  const loadSavedPosts = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/saved-posts/`,
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

  return (
    <>
      <Navbar />

      <div className="container mt-4">

        <h2 className="mb-4">
          🔖 Saved Posts
        </h2>

        {posts.map((p) => (

          <div
            key={p.id}
            className="card p-3 mb-3"
          >

            <h4>{p.title}</h4>

            <p>{p.content}</p>

          </div>

        ))}

      </div>
    </>
  );
}

export default SavedPosts;