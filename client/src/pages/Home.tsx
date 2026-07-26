import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50">
      <section className="mx-auto flex max-w-6xl flex-col items-center px-6 py-24 text-center">
        <span className="mb-5 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
          Smarter health tracking
        </span>

        <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-slate-900">
          Understand your health data in one simple dashboard
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
          Track health metrics, visualize trends, and review clear summaries of
          your progress over time.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            to="/dashboard"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            View dashboard
          </Link>

          <Link
            to="/login"
            className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            Create account
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Home;