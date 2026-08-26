import { Link } from "react-router-dom";

import {
  Activity,
  ArrowRight,
  Footprints,
  HeartPulse,
  Moon,
  ShieldCheck,
  TrendingUp,
  Weight,
} from "lucide-react";

function Home() {
  return (
    <main className="bg-white">
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Personal health tracking
            </p>

            <h1 className="mt-4 text-5xl font-bold leading-tight text-slate-900">
              Your health data,
              <span className="text-blue-600"> made clearer.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
              Track heart rate, weight, steps, and sleep in one place.
              Review weekly summaries, follow trends, and keep your health
              history organized.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
              >
                Get started
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
              >
                Log in
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-500">
              <div className="flex items-center gap-2">
                <ShieldCheck size={17} />
                Secure account access
              </div>

              <div className="flex items-center gap-2">
                <TrendingUp size={17} />
                Track changes over time
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Health overview
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  Your dashboard
                </h2>
              </div>

              <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                <Activity size={24} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-red-100 bg-red-50 p-5">
                <HeartPulse size={24} className="text-red-500" />

                <p className="mt-4 text-sm font-medium text-slate-500">
                  Heart Rate
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  72 BPM
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <Weight size={24} className="text-blue-500" />

                <p className="mt-4 text-sm font-medium text-slate-500">
                  Weight
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  74.5 kg
                </p>
              </div>

              <div className="rounded-2xl border border-green-100 bg-green-50 p-5">
                <Footprints size={24} className="text-green-500" />

                <p className="mt-4 text-sm font-medium text-slate-500">
                  Steps
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  8,240
                </p>
              </div>

              <div className="rounded-2xl border border-purple-100 bg-purple-50 p-5">
                <Moon size={24} className="text-purple-500" />

                <p className="mt-4 text-sm font-medium text-slate-500">
                  Sleep
                </p>

                <p className="mt-1 text-2xl font-bold text-slate-900">
                  7.5 hrs
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-5">
              <TrendingUp size={22} className="text-blue-600" />

              <div>
                <p className="font-semibold text-slate-900">
                  Follow your trends
                </p>

                <p className="text-sm text-slate-500">
                  Compare your measurements across 7 days, 30 days,
                  or your full history.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 px-6 py-16">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            One simple dashboard
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            Track. Understand. Improve.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-600">
            BioTrack turns individual health measurements into an organized
            history you can actually follow.
          </p>

          <div className="mt-10 grid gap-6 text-left md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="inline-flex rounded-xl bg-blue-50 p-3 text-blue-600">
                <Activity size={25} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Track your health
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Record heart rate, weight, steps, and sleep whenever
                you need.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="inline-flex rounded-xl bg-blue-50 p-3 text-blue-600">
                <TrendingUp size={25} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Follow your progress
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Review weekly averages and trends across different
                time periods.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-7">
              <div className="inline-flex rounded-xl bg-blue-50 p-3 text-blue-600">
                <ShieldCheck size={25} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Keep it personal
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                Your health history is connected to your authenticated
                account.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-slate-900 px-8 py-12 text-center">
          <h2 className="text-3xl font-bold text-white">
            Ready to start tracking?
          </h2>

          <p className="mt-4 text-slate-300">
            Create an account and start building your health history.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Create account
            <ArrowRight size={18} />
          </Link>
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-5 text-slate-400">
          BioTrack is intended for personal health tracking and informational
          purposes only. It is not a substitute for professional medical
          advice, diagnosis, or treatment.
        </p>
      </section>
    </main>
  );
}

export default Home;