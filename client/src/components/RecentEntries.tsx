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
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-slate-900">
          Recent entries
        </h2>

        <p className="mt-3 text-slate-500">
          No health entries yet.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold text-slate-900">
        Recent entries
      </h2>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="mt-6 space-y-4">
        {recentEntries.map((entry) => (
          <div
            key={entry.id}
            className="rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-medium text-slate-500">
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
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
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
                    className="text-sm font-medium text-red-600 hover:text-red-700 disabled:opacity-50"
                  >
                    {deletingId === entry.id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              )}
            </div>

            {editingId === entry.id ? (
              <div className="mt-4">
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
                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSaving
                      ? "Saving..."
                      : "Save"}
                  </button>

                  <button
                    type="button"
                    onClick={cancelEditing}
                    disabled={isSaving}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-center gap-3">
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

                <div className="flex items-center gap-3">
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

                <div className="flex items-center gap-3">
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

                <div className="flex items-center gap-3">
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
      <label className="mb-2 block text-sm font-medium text-slate-600">
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
        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
      />
    </div>
  );
}

export default RecentEntries;