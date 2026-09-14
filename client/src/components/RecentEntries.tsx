import { useState } from "react";

import {
  Footprints,
  HeartPulse,
  Moon,
  Weight,
} from "lucide-react";

import {
  deleteHealthMetric,
  updateHealthMetric,
  type HealthMetric,
} from "../services/api";

type RecentEntriesProps = {
  entries: HealthMetric[];
  onChange: () => Promise<void>;
};

function RecentEntries({
  entries,
  onChange,
}: RecentEntriesProps) {
  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [deletingId, setDeletingId] =
    useState<number | null>(null);

  const [heartRate, setHeartRate] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [steps, setSteps] = useState("");
  const [sleepHours, setSleepHours] = useState("");

  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const recentEntries = entries.slice(0, 5);

  function startEditing(entry: HealthMetric) {
    setEditingId(entry.id);

    setHeartRate(
      entry.heart_rate !== null
        ? String(entry.heart_rate)
        : "",
    );

    setWeightKg(
      entry.weight_kg !== null
        ? String(entry.weight_kg)
        : "",
    );

    setSteps(
      entry.steps !== null
        ? String(entry.steps)
        : "",
    );

    setSleepHours(
      entry.sleep_hours !== null
        ? String(entry.sleep_hours)
        : "",
    );

    setError("");
  }

  function cancelEditing() {
    setEditingId(null);
    setHeartRate("");
    setWeightKg("");
    setSteps("");
    setSleepHours("");
    setError("");
  }

  async function handleSave(metricId: number) {
    if (!heartRate && !weightKg && !steps && !sleepHours) {
      setError("Enter at least one health metric.");
      return;
    }

    setError("");
    setIsSaving(true);

    try {
      await updateHealthMetric(metricId, {
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

      cancelEditing();
      await onChange();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to update entry.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(metricId: number) {
    const confirmed = window.confirm(
      "Delete this health entry?",
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setDeletingId(metricId);

    try {
      await deleteHealthMetric(metricId);
      await onChange();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete entry.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  if (recentEntries.length === 0) {
    return (
      <section className="border-y border-[var(--border)] py-8">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
          History
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
          Recent entries
        </h2>

        <p className="mt-3 text-[var(--muted)]">
          No health entries yet.
        </p>
      </section>
    );
  }

  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
        History
      </p>

      <h2 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
        Recent entries
      </h2>

      {error && (
        <p className="mt-4 rounded-md border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">
          {error}
        </p>
      )}

      <div className="mt-6 divide-y divide-[var(--border)] border-y border-[var(--border)]">
        {recentEntries.map((entry) => (
          <div
            key={entry.id}
            className="py-5"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-medium text-[var(--muted)]">
                {new Date(
                  entry.recorded_at,
                ).toLocaleDateString()}
              </p>

              {editingId !== entry.id && (
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() =>
                      startEditing(entry)
                    }
                    className="text-sm font-medium text-[var(--primary)] transition hover:opacity-70"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(entry.id)
                    }
                    disabled={
                      deletingId === entry.id
                    }
                    className="text-sm font-medium text-[var(--danger)] transition hover:opacity-70 disabled:opacity-50"
                  >
                    {deletingId === entry.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              )}
            </div>

            {editingId === entry.id ? (
              <div className="mt-5">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <EditInput
                    label="Heart rate"
                    value={heartRate}
                    onChange={setHeartRate}
                    placeholder="72"
                  />

                  <EditInput
                    label="Weight (kg)"
                    value={weightKg}
                    onChange={setWeightKg}
                    placeholder="74.5"
                    step="0.1"
                  />

                  <EditInput
                    label="Steps"
                    value={steps}
                    onChange={setSteps}
                    placeholder="8200"
                  />

                  <EditInput
                    label="Sleep (hours)"
                    value={sleepHours}
                    onChange={setSleepHours}
                    placeholder="7.5"
                    step="0.1"
                  />
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      handleSave(entry.id)
                    }
                    disabled={isSaving}
                    className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white transition hover:bg-[var(--primary-hover)] disabled:opacity-50"
                  >
                    {isSaving
                      ? "Saving..."
                      : "Save"}
                  </button>

                  <button
                    type="button"
                    onClick={cancelEditing}
                    disabled={isSaving}
                    className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--surface-secondary)]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-3 text-[var(--foreground)]">
                  <HeartPulse
                    size={20}
                    className="text-red-500"
                  />

                  <span>
                    {entry.heart_rate !== null
                      ? `${entry.heart_rate} BPM`
                      : "No data"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[var(--foreground)]">
                  <Weight
                    size={20}
                    className="text-blue-500"
                  />

                  <span>
                    {entry.weight_kg !== null
                      ? `${entry.weight_kg} kg`
                      : "No data"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[var(--foreground)]">
                  <Footprints
                    size={20}
                    className="text-green-500"
                  />

                  <span>
                    {entry.steps !== null
                      ? entry.steps.toLocaleString()
                      : "No data"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-[var(--foreground)]">
                  <Moon
                    size={20}
                    className="text-purple-500"
                  />

                  <span>
                    {entry.sleep_hours !== null
                      ? `${entry.sleep_hours} hours`
                      : "No data"}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

type EditInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  step?: string;
};

function EditInput({
  label,
  value,
  onChange,
  placeholder,
  step,
}: EditInputProps) {
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
        step={step}
        min="0"
        className="w-full rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
      />
    </div>
  );
}

export default RecentEntries;