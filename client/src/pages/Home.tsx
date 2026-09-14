import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import clouds from "../assets/Clouds.jpg";

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
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section
        className="relative bg-cover bg-center bg-no-repeat px-6 py-10"
        style={{
          backgroundImage: `url(${clouds})`,
        }}
      >
        <div className="absolute inset-0 bg-[var(--background)]/55" />

        <div className="relative mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2">
          <div className="lg:pt-8">
            <p className="fade-up text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
              Personal health tracking
            </p>

            <h1 className="fade-up fade-up-delay-1 mt-4 max-w-xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-[var(--foreground)] md:text-6xl">
              Your health data,
              <span className="text-[var(--primary)]">
                {" "}
                made clearer.
              </span>
            </h1>

            <p className="fade-up fade-up-delay-2 mt-6 max-w-xl text-lg leading-8 text-[var(--muted)]">
              Track heart rate, weight, steps, and sleep in one place.
              Review weekly summaries, follow trends, and keep your health
              history organized.
            </p>

            <div className="fade-up fade-up-delay-3 mt-8 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-md bg-[var(--primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--primary-hover)]"
              >
                Get started
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="rounded-md border border-[var(--border)] bg-[var(--surface)]/75 px-6 py-3 font-semibold text-[var(--foreground)] backdrop-blur-sm transition hover:bg-[var(--surface-secondary)]"
              >
                Log in
              </Link>
            </div>

            <div className="fade-up fade-up-delay-3 mt-7 flex flex-wrap gap-6 text-sm text-[var(--muted)]">
              <div className="flex items-center gap-2">
                <ShieldCheck
                  size={17}
                  className="text-[var(--primary)]"
                />
                Secure account access
              </div>

              <div className="flex items-center gap-2">
                <TrendingUp
                  size={17}
                  className="text-[var(--primary)]"
                />
                Track changes over time
              </div>
            </div>
          </div>

          <div className="fade-up fade-up-delay-2 rounded-2xl border border-[var(--border)] bg-[var(--surface)]/90 p-8 shadow-sm backdrop-blur-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                  Health overview
                </p>

                <h2 className="mt-1 text-xl font-bold text-[var(--foreground)]">
                  Your dashboard
                </h2>
              </div>

              <div className="rounded-lg bg-[var(--surface-secondary)] p-3 text-[var(--primary)]">
                <Activity size={24} />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5">
                <HeartPulse
                  size={24}
                  className="text-red-500"
                />

                <p className="mt-4 text-sm font-medium text-[var(--muted)]">
                  Heart Rate
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">
                  72 BPM
                </p>
              </div>

              <div className="rounded-xl border border-blue-500/20 bg-blue-500/10 p-5">
                <Weight
                  size={24}
                  className="text-blue-500"
                />

                <p className="mt-4 text-sm font-medium text-[var(--muted)]">
                  Weight
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">
                  74.5 kg
                </p>
              </div>

              <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-5">
                <Footprints
                  size={24}
                  className="text-green-500"
                />

                <p className="mt-4 text-sm font-medium text-[var(--muted)]">
                  Steps
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">
                  8,240
                </p>
              </div>

              <div className="rounded-xl border border-purple-500/20 bg-purple-500/10 p-5">
                <Moon
                  size={24}
                  className="text-purple-500"
                />

                <p className="mt-4 text-sm font-medium text-[var(--muted)]">
                  Sleep
                </p>

                <p className="mt-1 text-2xl font-bold text-[var(--foreground)]">
                  7.5 hrs
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-5">
              <TrendingUp
                size={22}
                className="shrink-0 text-[var(--primary)]"
              />

              <div>
                <p className="font-semibold text-[var(--foreground)]">
                  Follow your trends
                </p>

                <p className="text-sm text-[var(--muted)]">
                  Compare your measurements across 7 days, 30 days,
                  or your full history.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border)] bg-[var(--surface-secondary)] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
              Why BioTrack
            </p>

            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)] md:text-4xl">
              Track. Understand. Improve.
            </h2>

            <p className="mt-4 text-[var(--muted)]">
              BioTrack turns individual health measurements into an organized
              history you can actually follow.
            </p>
          </div>

          <div className="mt-10 grid gap-0 border-y border-[var(--border)] md:grid-cols-3">
            <div className="border-b border-[var(--border)] py-8 md:border-b-0 md:border-r md:pr-8">
              <div className="text-sm font-semibold text-[var(--primary)]">
                01
              </div>

              <Activity
                size={26}
                className="mt-6 text-[var(--primary)]"
              />

              <h3 className="mt-5 text-lg font-bold text-[var(--foreground)]">
                Track your health
              </h3>

              <p className="mt-3 leading-7 text-[var(--muted)]">
                Record heart rate, weight, steps, and sleep whenever
                you need.
              </p>
            </div>

            <div className="border-b border-[var(--border)] py-8 md:border-b-0 md:border-r md:px-8">
              <div className="text-sm font-semibold text-[var(--primary)]">
                02
              </div>

              <TrendingUp
                size={26}
                className="mt-6 text-[var(--primary)]"
              />

              <h3 className="mt-5 text-lg font-bold text-[var(--foreground)]">
                Follow your progress
              </h3>

              <p className="mt-3 leading-7 text-[var(--muted)]">
                Review weekly averages and trends across different
                time periods.
              </p>
            </div>

            <div className="py-8 md:pl-8">
              <div className="text-sm font-semibold text-[var(--primary)]">
                03
              </div>

              <ShieldCheck
                size={26}
                className="mt-6 text-[var(--primary)]"
              />

              <h3 className="mt-5 text-lg font-bold text-[var(--foreground)]">
                Keep it personal
              </h3>

              <p className="mt-3 leading-7 text-[var(--muted)]">
                Your health history is connected to your authenticated
                account.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl border-y border-[var(--border)] py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
                Start tracking
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                Build a health history you can actually follow.
              </h2>

              <p className="mt-4 leading-7 text-[var(--muted)]">
                Create an account, add your first measurements, and start
                seeing your trends over time.
              </p>
            </div>

            <Link
              to="/register"
              className="inline-flex w-fit items-center gap-2 rounded-md bg-[var(--primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--primary-hover)]"
            >
              Create account
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

export default Home;