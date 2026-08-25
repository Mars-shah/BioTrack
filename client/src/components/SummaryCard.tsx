type SummaryCardProps = {
  title: string;
  value: string;
  icon: string;
};

function SummaryCard({
  title,
  value,
  icon,
}: SummaryCardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-red-100 p-6 shadow-sm">
      <span className="text-3xl">{icon}</span>
      <p className="mt-2 text-sm font-semibold text-slate-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </section>
  );
}
export default SummaryCard;