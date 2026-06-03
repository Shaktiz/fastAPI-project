function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">
        FastAPI Dashboard
      </span>

      <button
        className="btn btn-danger"
        onClick={logout}
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;