import { Link, useNavigate } from "react-router-dom";

import logo from "../assets/biotrack-logo.svg";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("access_token") !== null;

  function handleLogout() {
    localStorage.removeItem("access_token");
    navigate("/login");
  }

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="BioTrack"
            className="h-28 w-auto"
          />
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-slate-600 hover:text-blue-600"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-slate-600 hover:text-blue-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;