import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeartPulse } from "lucide-react";

import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [heightCm, setHeightCm] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      await registerUser({
        name,
        email,
        password,
        date_of_birth: dateOfBirth || undefined,
        height_cm: heightCm
          ? Number(heightCm)
          : undefined,
      });

      navigate("/login");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to create account.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)] px-6 py-12">
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
          Create your account
        </h1>

        <p className="fade-up fade-up-delay-2 mt-2 text-[var(--muted)]">
          Start tracking your health data with BioTrack.
        </p>

        <form
          onSubmit={handleSubmit}
          className="fade-up fade-up-delay-3 mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-[var(--foreground)]"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              required
              className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]"
            />
          </div>

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
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
              autoComplete="email"
              className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]"
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
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              minLength={8}
              autoComplete="new-password"
              className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]"
            />
          </div>

          <div>
            <label
              htmlFor="date-of-birth"
              className="mb-2 block text-sm font-medium text-[var(--foreground)]"
            >
              Date of birth
            </label>

            <input
              id="date-of-birth"
              type="date"
              value={dateOfBirth}
              onChange={(event) =>
                setDateOfBirth(event.target.value)
              }
              className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]"
            />
          </div>

          <div>
            <label
              htmlFor="height"
              className="mb-2 block text-sm font-medium text-[var(--foreground)]"
            >
              Height (cm)
            </label>

            <input
              id="height"
              type="number"
              value={heightCm}
              onChange={(event) =>
                setHeightCm(event.target.value)
              }
              min="1"
              max="300"
              step="0.1"
              className="w-full rounded-md border border-[var(--border)] bg-[var(--background)] px-4 py-3 text-[var(--foreground)] outline-none transition focus:border-[var(--primary)]"
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
            {isLoading
              ? "Creating account..."
              : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[var(--primary)] transition hover:opacity-80"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;