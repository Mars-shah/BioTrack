import {
  useCallback,
  useEffect,
  useState,
} from "react";

import type { FormEvent } from "react";

import HealthTrendChart from "../components/HealthTrendChart";
import SummaryCard from "../components/SummaryCard";
import RecentEntries from "../components/RecentEntries";
import Footer from "../components/Footer";

import {
  createHealthMetric,
  getDashboard,
  getHealthMetrics,
  type HealthMetric,
} from "../services/api";

import {
  getAverageHeartRate,
  getAverageSleep,
  getAverageSteps,
  getWeeklyHistory,
  getWeeklyWeightChange,
} from "../utils/healthStats";

import { generateInsights } from "../utils/healthInsights";

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

type ChartRange = "7d" | "30d" | "all";

function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [healthHistory, setHealthHistory] = useState<HealthMetric[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [heartRate, setHeartRate] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [steps, setSteps] = useState("");
  const [sleepHours, setSleepHours] = useState("");

  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [chartRange, setChartRange] =
    useState<ChartRange>("30d");

  const loadDashboard = useCallback(async () => {
    try {
      const [dashboardData, historyData] = await Promise.all([
        getDashboard(),
        getHealthMetrics(),
      ]);

      setData(dashboardData);
      setHealthHistory(historyData);
      setError("");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to load dashboard.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  async function handleMetricSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!heartRate && !weightKg && !steps && !sleepHours) {
      setFormError("Enter at least one health metric.");
      return;
    }

    setFormError("");
    setIsSaving(true);

    try {
      await createHealthMetric({
        heart_rate: heartRate
          ? Number(heartRate)
          : undefined,

        weight_kg: weightKg
          ? Number(weightKg)
          : undefined,

        steps: steps
          ? Number(steps)
          : undefined,

        sleep_hours: sleepHours
          ? Number(sleepHours)
          : undefined,
      });

      setHeartRate("");
      setWeightKg("");
      setSteps("");
      setSleepHours("");

      await loadDashboard();
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Unable to save health metrics.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  const now = new Date();

  const filteredHistory = healthHistory.filter((metric) => {
    if (chartRange === "all") {
      return true;
    }

    const days = chartRange === "7d" ? 7 : 30;
    const startDate = new Date(now);

    startDate.setDate(
      startDate.getDate() - days,
    );

    return (
      new Date(metric.recorded_at) >= startDate
    );
  });

  const chronologicalHistory =
    [...filteredHistory].reverse();

  const weightChartData = chronologicalHistory
    .filter((metric) => metric.weight_kg !== null)
    .map((metric) => ({
      date: new Date(metric.recorded_at).toLocaleDateString(
        undefined,
        {
          month: "short",
          day: "numeric",
        },
      ),
      value: Number(metric.weight_kg),
    }));

  const heartRateChartData = chronologicalHistory
    .filter((metric) => metric.heart_rate !== null)
    .map((metric) => ({
      date: new Date(metric.recorded_at).toLocaleDateString(
        undefined,
        {
          month: "short",
          day: "numeric",
        },
      ),
      value: Number(metric.heart_rate),
    }));

  const weeklyHistory =
    getWeeklyHistory(healthHistory);

  const averageHeartRate =
    getAverageHeartRate(weeklyHistory);

  const weeklyWeightChange =
    getWeeklyWeightChange(weeklyHistory);

  const averageSteps =
    getAverageSteps(weeklyHistory);

  const averageSleep =
    getAverageSleep(weeklyHistory);

  const formattedWeightChange =
    weeklyWeightChange === null
      ? "Not enough data"
      : `${
          weeklyWeightChange > 0 ? "+" : ""
        }${weeklyWeightChange.toFixed(1)} kg`;

  const insights = generateInsights({
    averageSteps,
    averageSleep,
    averageHeartRate,
    weeklyWeightChange,
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-[var(--muted)]">
            Loading dashboard...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[var(--background)] px-6 py-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-red-500">
            {error}
          </p>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-[var(--background)] px-6 py-10 text-[var(--foreground)]">
        <div className="mx-auto max-w-6xl">
          <div className="fade-up">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
              Dashboard
            </p>

            <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--foreground)] md:text-4xl">
              Welcome back,{" "}
              {data?.user.name
                ? data.user.name.charAt(0).toUpperCase() +
                  data.user.name.slice(1)
                : "User"}
            </h1>

            <p className="mt-2 text-[var(--muted)]">
              Review your latest health measurements and track your progress.
            </p>
          </div>

          {!data?.latest_metrics ? (
            <div className="fade-up fade-up-delay-1 mt-8 border-y border-[var(--border)] py-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">
                No health data yet
              </h2>

              <p className="mt-2 text-[var(--muted)]">
                Add your first health measurement to begin tracking your
                progress.
              </p>
            </div>
          ) : (
            <section className="fade-up fade-up-delay-1 mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <SummaryCard
                title="Heart Rate"
                value={
                  data.latest_metrics.heart_rate !== null
                    ? `${data.latest_metrics.heart_rate} BPM`
                    : "No data"
                }
                color="red"
              />

              <SummaryCard
                title="Weight"
                value={
                  data.latest_metrics.weight_kg !== null
                    ? `${data.latest_metrics.weight_kg} kg`
                    : "No data"
                }
                color="blue"
              />

              <SummaryCard
                title="Steps"
                value={
                  data.latest_metrics.steps !== null
                    ? data.latest_metrics.steps.toLocaleString()
                    : "No data"
                }
                color="green"
              />

              <SummaryCard
                title="Sleep"
                value={
                  data.latest_metrics.sleep_hours !== null
                    ? `${data.latest_metrics.sleep_hours} hours`
                    : "No data"
                }
                color="purple"
              />
            </section>
          )}

          <section className="mt-14 border-t border-[var(--border)] pt-10">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
              This week
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
              Weekly summary
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <SummaryCard
                title="Average Heart Rate"
                value={
                  averageHeartRate === null
                    ? "No data"
                    : `${averageHeartRate} BPM`
                }
                color="red"
              />

              <SummaryCard
                title="Weight Change"
                value={formattedWeightChange}
                color="blue"
              />

              <SummaryCard
                title="Average Steps"
                value={
                  averageSteps === null
                    ? "No data"
                    : averageSteps.toLocaleString()
                }
                color="green"
              />

              <SummaryCard
                title="Average Sleep"
                value={
                  averageSleep === null
                    ? "No data"
                    : `${averageSleep.toFixed(1)} hours`
                }
                color="purple"
              />
            </div>
          </section>

          <section className="mt-14 border-y border-[var(--border)] py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
              Insights
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
              Weekly observations
            </h2>

            <p className="mt-2 max-w-2xl text-[var(--muted)]">
              These observations are based on the health data you entered
              and are not medical advice.
            </p>

            <div className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className="py-4 text-sm leading-6 text-[var(--foreground)]"
                >
                  <span className="mr-3 font-semibold text-[var(--primary)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {insight}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-14">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
                  Trends
                </p>

                <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
                  Your health history
                </h2>

                <p className="mt-2 text-[var(--muted)]">
                  Review how your measurements have changed over time.
                </p>
              </div>

              <div className="flex w-fit border border-[var(--border)] bg-[var(--surface)] p-1">
                <ChartRangeButton
                  label="7 Days"
                  value="7d"
                  selected={chartRange}
                  onChange={setChartRange}
                />

                <ChartRangeButton
                  label="30 Days"
                  value="30d"
                  selected={chartRange}
                  onChange={setChartRange}
                />

                <ChartRangeButton
                  label="All Time"
                  value="all"
                  selected={chartRange}
                  onChange={setChartRange}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <HealthTrendChart
                title="Weight trend"
                unit="kg"
                data={weightChartData}
              />

              <HealthTrendChart
                title="Heart-rate trend"
                unit="BPM"
                data={heartRateChartData}
              />
            </div>
          </section>

          <section className="mt-14 border-t border-[var(--border)] pt-10">
            <RecentEntries
              entries={healthHistory}
              onChange={loadDashboard}
            />
          </section>

          <section className="mt-14 mb-10 border-y border-[var(--border)] py-10">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
              New entry
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
              Add health metrics
            </h2>

            <p className="mt-2 text-[var(--muted)]">
              Record your latest measurements.
            </p>

            <form
              onSubmit={handleMetricSubmit}
              className="mt-7 grid gap-5 sm:grid-cols-2"
            >
              <MetricInput
                label="Heart rate"
                value={heartRate}
                onChange={setHeartRate}
                placeholder="72"
                min="20"
                max="250"
              />

              <MetricInput
                label="Weight (kg)"
                value={weightKg}
                onChange={setWeightKg}
                placeholder="74.5"
                min="0.1"
                max="500"
                step="0.1"
              />

              <MetricInput
                label="Steps"
                value={steps}
                onChange={setSteps}
                placeholder="8200"
                min="0"
                step="1"
              />

              <MetricInput
                label="Sleep (hours)"
                value={sleepHours}
                onChange={setSleepHours}
                placeholder="7.5"
                min="0"
                max="24"
                step="0.1"
              />

              {formError && (
                <p className="rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500 sm:col-span-2">
                  {formError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSaving}
                className="rounded-md bg-[var(--primary)] px-5 py-3 font-semibold text-white transition hover:bg-[var(--primary-hover)] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
              >
                {isSaving ? "Saving..." : "Save metrics"}
              </button>
            </form>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

type ChartRangeButtonProps = {
  label: string;
  value: ChartRange;
  selected: ChartRange;
  onChange: (value: ChartRange) => void;
};

function ChartRangeButton({
  label,
  value,
  selected,
  onChange,
}: ChartRangeButtonProps) {
  const isSelected = selected === value;

  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`rounded-sm px-3 py-2 text-sm font-medium transition ${
        isSelected
          ? "bg-[var(--primary)] text-white"
          : "text-[var(--muted)] hover:bg-[var(--surface-secondary)] hover:text-[var(--foreground)]"
      }`}
    >
      {label}
    </button>
  );
}

type MetricInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  min?: string;
  max?: string;
  step?: string;
};

function MetricInput({
  label,
  value,
  onChange,
  placeholder,
  min,
  max,
  step,
}: MetricInputProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[var(--foreground)]">
        {label}
      </label>

      <input
        type="number"
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
      />
    </div>
  );
}

export default Dashboard;