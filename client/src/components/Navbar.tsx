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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4 lg:px-6">
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="BioTrack"
            className="h-20 w-auto lg:-ml-8"
          />
        </Link>

        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-slate-600 transition hover:text-red-600"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-sm font-medium text-slate-600 transition hover:text-red-600"
              >
                Home
              </Link>

              <Link
                to="/login"
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;