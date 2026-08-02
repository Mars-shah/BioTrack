import { useEffect, useState } from "react";

import { getDashboard } from "../services/api";

type DashboardData = {
  user: {
    name: string;
  };
  latest_metrics: {
    id: number;
    user_id: number;
    heart_rate: number | null;
    weight_kg: number | null;
    steps: number | null;
    sleep_hours: number | null;
    recorded_at: string;
  } | null;
};

function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const dashboardData = await getDashboard();
        setData(dashboardData);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Unable to load dashboard.",
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (isLoading) {
    return (
      <main className="p-8">
        <p>Dashboard is loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-8">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-slate-900">
          Welcome back, {data?.user.name}
        </h1>

        {!data?.latest_metrics ? (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8">
            <h2 className="text-xl font-semibold text-slate-900">
              No health data yet
            </h2>

            <p className="mt-2 text-slate-600">
              Add your first health measurement to begin tracking your progress.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Heart Rate"
              value={
                data.latest_metrics.heart_rate !== null
                  ? `${data.latest_metrics.heart_rate} BPM`
                  : "No data"
              }
            />

            <MetricCard
              title="Weight"
              value={
                data.latest_metrics.weight_kg !== null
                  ? `${data.latest_metrics.weight_kg} kg`
                  : "No data"
              }
            />

            <MetricCard
              title="Steps"
              value={
                data.latest_metrics.steps !== null
                  ? data.latest_metrics.steps.toLocaleString()
                  : "No data"
              }
            />

            <MetricCard
              title="Sleep"
              value={
                data.latest_metrics.sleep_hours !== null
                  ? `${data.latest_metrics.sleep_hours} hours`
                  : "No data"
              }
            />
          </div>
        )}
      </div>
    </main>
  );
}

type MetricCardProps = {
  title: string;
  value: string;
};

function MetricCard({ title, value }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{title}</p>
      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}

export default Dashboard;