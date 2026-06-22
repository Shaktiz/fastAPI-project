
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SavedPosts from "./pages/SavedPosts";
import LikedPosts from "./pages/LikedPosts";
function App() {
  const [search, setSearch] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              search={search}
              setSearch={setSearch}
            />
          }
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/saved-posts"element={<SavedPosts />} />
        <Route path="/liked-posts"element={<LikedPosts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;