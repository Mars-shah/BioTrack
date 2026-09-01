import { Link } from "react-router-dom";
import logo from "../assets/biotrack-logoblack.svg";

function Footer() {
  return (
    <footer className="bg-black">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link to="/" className=" mt-4 inline-flex items-center">
              <img
                src={logo}
                alt="BioTrack"
                className="h-24 w-auto"
              />
            </Link>

            <p className="mt-3 text-sm text-neutral-400">
              Personal health tracking, made clearer.
            </p>
          </div>

          <div className="flex items-center gap-7 text-sm font-medium text-neutral-400">
            <Link
              to="/"
              className="transition hover:text-white"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="transition hover:text-white"
            >
              Login
            </Link>

            <a
              href="https://github.com/Mars-shah/BioTrack"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-7 border-t border-white/15 pt-5">
          <p className="text-xs leading-5 text-neutral-500">
            © {new Date().getFullYear()} BioTrack. Student project built by
            Marut Shah. BioTrack is intended for personal health tracking
            and informational purposes only. It is not a substitute for
            professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;