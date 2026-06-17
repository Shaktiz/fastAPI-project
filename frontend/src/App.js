
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SavedPosts from "./pages/SavedPosts";
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;