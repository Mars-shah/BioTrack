import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Moon, Sun, X } from "lucide-react";

import lightLogo from "../assets/biotrack-logo.svg";
import darkLogo from "../assets/biotrack-logoblack.svg";

function Navbar() {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const isLoggedIn =
    localStorage.getItem("access_token") !== null;

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    const shouldUseDark =
      savedTheme === "dark" ||
      (!savedTheme && prefersDark);

    setIsDark(shouldUseDark);

    document.documentElement.classList.toggle(
      "dark",
      shouldUseDark,
    );
  }, []);

  function toggleTheme() {
    const nextTheme = !isDark;

    setIsDark(nextTheme);

    document.documentElement.classList.toggle(
      "dark",
      nextTheme,
    );

    localStorage.setItem(
      "theme",
      nextTheme ? "dark" : "light",
    );
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    setIsMenuOpen(false);
    navigate("/login");
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center"
        >
          <img
            src={isDark ? darkLogo : lightLogo}
            alt="BioTrack"
            className="w-[105px] sm:w-[115px] lg:w-[130px]"
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--primary)]"
              >
                Dashboard
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="rounded-md bg-[var(--danger)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/"
                className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--primary)]"
              >
                Home
              </Link>

              <Link
                to="/login"
                className="rounded-md bg-[var(--danger)] px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Login
              </Link>
            </>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition hover:bg-[var(--surface-secondary)]"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun size={18} />
            ) : (
              <Moon size={18} />
            )}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-md text-[var(--foreground)] transition hover:bg-[var(--surface-secondary)]"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun size={20} />
            ) : (
              <Moon size={20} />
            )}
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-[var(--foreground)] transition hover:bg-[var(--surface-secondary)]"
            aria-label="Toggle navigation"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X size={23} />
            ) : (
              <Menu size={23} />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--surface)] md:hidden">
          <div className="flex flex-col px-5 py-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className="border-b border-[var(--border)] py-3 text-sm font-medium text-[var(--foreground)] transition hover:text-[var(--primary)]"
                >
                  Dashboard
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="py-3 text-left text-sm font-medium text-[var(--danger)]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  onClick={closeMenu}
                  className="border-b border-[var(--border)] py-3 text-sm font-medium text-[var(--foreground)] transition hover:text-[var(--primary)]"
                >
                  Home
                </Link>

                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="py-3 text-sm font-medium text-[var(--danger)]"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;