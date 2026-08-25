
type SummaryCardProps = {
  title: string;
  value: string;
  icon: string;
  color: CardColor;
};
type CardColor = "red" | "blue" | "green" | "purple";

const colorClasses: Record<CardColor, string> = {
  red: "bg-red-100",
  blue: "bg-blue-100",
  green: "bg-green-100",
  purple: "bg-purple-100",
};

function SummaryCard({
  title,
  value,
  icon,
  color,
}: SummaryCardProps) {
  return (
    <section className={`rounded-2xl border border-slate-200 p-6 shadow-sm ${colorClasses[color]}`}>
      <span className="text-3xl">{icon}</span>
      <p className="mt-2 text-sm font-semibold text-slate-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </section>
  );
}

export default SummaryCard;