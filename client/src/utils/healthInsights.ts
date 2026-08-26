type InsightData = {
  averageSteps: number | null;
  averageSleep: number | null;
  averageHeartRate: number | null;
  weeklyWeightChange: number | null;
};

export function generateInsights({
  averageSteps,
  averageSleep,
  averageHeartRate,
  weeklyWeightChange,
}: InsightData) {
  const insights: string[] = [];

  if (
    averageSleep !== null &&
    averageSleep < 7
  ) {
    insights.push(
      "Your average sleep this week is below 7 hours.",
    );
  }

  if (
    averageSteps !== null &&
    averageSteps < 7000
  ) {
    insights.push(
      "Your average daily steps are below 7,000 this week.",
    );
  }

  if (
    weeklyWeightChange !== null &&
    Math.abs(weeklyWeightChange) >= 2
  ) {
    insights.push(
      `Your weight changed by ${Math.abs(
        weeklyWeightChange,
      ).toFixed(1)} kg this week.`,
    );
  }

  if (averageHeartRate !== null) {
    insights.push(
      `Your average recorded heart rate this week is ${averageHeartRate} BPM.`,
    );
  }

  if (insights.length === 0) {
    insights.push(
      "Keep logging your health metrics to build more useful weekly insights.",
    );
  }

  return insights;
}