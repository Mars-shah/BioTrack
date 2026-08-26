import { useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

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
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          Create your account
        </h1>

        <p className="mt-2 text-slate-600">
          Start tracking your health data with BioTrack.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-700"
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
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-700"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
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
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-700"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
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
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-700"
            />
          </div>

          <div>
            <label
              htmlFor="date-of-birth"
              className="mb-2 block text-sm font-medium text-slate-700"
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
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-700"
            />
          </div>

          <div>
            <label
              htmlFor="height"
              className="mb-2 block text-sm font-medium text-slate-700"
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
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-teal-700"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-teal-700 px-4 py-3 font-semibold text-white hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading
              ? "Creating account..."
              : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-teal-600 hover:text-teal-700"
          >
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;