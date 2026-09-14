import { useState } from "react";
import type { FormEvent } from "react";

import { Link, useNavigate } from "react-router-dom";
import { HeartPulse } from "lucide-react";

import { loginUser } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      const data = await loginUser(email, password);

      localStorage.setItem("access_token", data.access_token);

      navigate("/dashboard");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to log in. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-[calc(100vh-73px)] items-center justify-center overflow-hidden bg-[var(--background)] px-6 py-12">
      <div
        className="login-heart-pulse pointer-events-none absolute text-[var(--danger)]"
        aria-hidden="true"
      >
        <HeartPulse
          strokeWidth={0.9}
          className="h-[430px] w-[430px] sm:h-[500px] sm:w-[500px] lg:h-[540px] lg:w-[540px]"
        />
      </div>

      <div className="fade-up relative z-10 w-full max-w-md border border-[var(--border)] bg-[var(--surface)]/95 p-8 shadow-sm backdrop-blur-md">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
          BioTrack
        </p>

        <h1 className="fade-up fade-up-delay-1 mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
          Welcome back
        </h1>

        <p className="fade-up fade-up-delay-2 mt-2 text-[var(--muted)]">
          Log in to view your health dashboard.
        </p>

        <form
          className="fade-up fade-up-delay-3 mt-8 space-y-5"
          onSubmit={handleSubmit}
        >
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[var(--foreground)]"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
              className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[var(--foreground)]"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
              className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
            />
          </div>

          {error && (
            <p className="rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-[var(--primary)] px-4 py-3 font-semibold text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-[var(--primary)] transition hover:opacity-80"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;