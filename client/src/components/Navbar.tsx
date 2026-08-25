import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-orange-600">
          BioTrack
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            Dashboard
          </Link>

          <Link
            to="/login"
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;