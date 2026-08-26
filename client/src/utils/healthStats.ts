import type { HealthMetric } from "../services/api";

export function getWeeklyHistory(
  healthHistory: HealthMetric[],
) {
  const sevenDaysAgo = new Date();

  sevenDaysAgo.setDate(
    sevenDaysAgo.getDate() - 7,
  );

  return healthHistory.filter(
    (metric) =>
      new Date(metric.recorded_at) >= sevenDaysAgo,
  );
}

export function getAverageSteps(
  weeklyHistory: HealthMetric[],
) {
  const values = weeklyHistory
    .filter((metric) => metric.steps !== null)
    .map((metric) => metric.steps);

  if (values.length === 0) {
    return null;
  }

  const total = values.reduce(
    (sum, value) => sum + value,
    0,
  );

  return Math.round(total / values.length);
}

export function getAverageSleep(
  weeklyHistory: HealthMetric[],
) {
  const values = weeklyHistory
    .filter((metric) => metric.sleep_hours !== null)
    .map((metric) => Number(metric.sleep_hours));

  if (values.length === 0) {
    return null;
  }

  const total = values.reduce(
    (sum, value) => sum + value,
    0,
  );

  return total / values.length;
}

export function getAverageHeartRate(
  weeklyHistory: HealthMetric[],
) {
  const values = weeklyHistory
    .filter((metric) => metric.heart_rate !== null)
    .map((metric) => metric.heart_rate);

  if (values.length === 0) {
    return null;
  }

  const total = values.reduce(
    (sum, value) => sum + value,
    0,
  );

  return Math.round(total / values.length);
}

export function getWeeklyWeightChange(
  weeklyHistory: HealthMetric[],
) {
  const weights = weeklyHistory
    .filter((metric) => metric.weight_kg !== null)
    .map((metric) => ({
      weight: Number(metric.weight_kg),
      recordedAt: new Date(metric.recorded_at),
    }))
    .sort(
      (a, b) =>
        a.recordedAt.getTime() -
        b.recordedAt.getTime(),
    );

  if (weights.length < 2) {
    return null;
  }

  return (
    weights[weights.length - 1].weight -
    weights[0].weight
  );
}