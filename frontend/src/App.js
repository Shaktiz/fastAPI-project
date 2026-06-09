// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
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
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;