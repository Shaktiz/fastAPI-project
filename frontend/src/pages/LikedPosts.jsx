import { useEffect, useState } from "react";
import axios from "axios";

function LikedPosts() {

const [posts,setPosts]=useState([]);

const token =
localStorage.getItem("token");

const API_URL =
"https://fastapi-project-1-j38l.onrender.com";

useEffect(() => {

loadPosts();

}, []);

const loadPosts = async () => {

    const res = await axios.get(
        `${API_URL}/vote/liked-posts`,
        {
        headers:{
        Authorization:
        `Bearer ${token}`
        }
        }
        );

        setPosts(res.data);

        };
        return (

        <div className="container mt-4">

        <h2>❤️ Liked Posts</h2>

        {posts.map(post => (

        <div
        className="card p-3 mb-3"
        key={post.id}
        >

        <h4>{post.title}</h4>

        <p>{post.content}</p>

        </div>

        ))}

        </div>

    );
}

export default LikedPosts;