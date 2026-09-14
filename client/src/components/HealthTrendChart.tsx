import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ChartDataPoint = {
  date: string;
  value: number;
};

type HealthTrendChartProps = {
  title: string;
  unit: string;
  data: ChartDataPoint[];
};

function HealthTrendChart({
  title,
  unit,
  data,
}: HealthTrendChartProps) {
  if (data.length === 0) {
    return (
      <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          {title}
        </h2>

        <p className="mt-6 text-sm text-[var(--muted)]">
          Add more measurements to see your trend.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6">
      <h2 className="text-lg font-semibold text-[var(--foreground)]">
        {title}
      </h2>

      <div className="mt-6 h-72 w-full text-[var(--primary)]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              stroke="var(--border)"
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="date"
              tick={{
                fill: "var(--muted)",
                fontSize: 12,
              }}
              axisLine={{
                stroke: "var(--border)",
              }}
              tickLine={false}
            />

            <YAxis
              unit={unit}
              tick={{
                fill: "var(--muted)",
                fontSize: 12,
              }}
              axisLine={{
                stroke: "var(--border)",
              }}
              tickLine={false}
            />

            <Tooltip
              formatter={(value) => [
                `${value} ${unit}`,
                title,
              ]}
              contentStyle={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                color: "var(--foreground)",
              }}
              labelStyle={{
                color: "var(--muted)",
              }}
            />

            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--primary)"
              strokeWidth={2.5}
              dot={{
                r: 3,
                fill: "var(--primary)",
                stroke: "var(--surface)",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 5,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default HealthTrendChart;