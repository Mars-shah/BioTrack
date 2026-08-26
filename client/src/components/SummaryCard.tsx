import {
  Footprints,
  HeartPulse,
  Moon,
  Weight,
} from "lucide-react";

type CardColor = "red" | "blue" | "green" | "purple";

type SummaryCardProps = {
  title: string;
  value: string;
  color: CardColor;
};

const cardClasses: Record<CardColor, string> = {
  red: "bg-red-50 border-red-100",
  blue: "bg-blue-50 border-blue-100",
  green: "bg-green-50 border-green-100",
  purple: "bg-purple-50 border-purple-100",
};

const iconClasses: Record<CardColor, string> = {
  red: "text-red-500",
  blue: "text-blue-500",
  green: "text-green-500",
  purple: "text-purple-500",
};

function SummaryCard({
  title,
  value,
  color,
}: SummaryCardProps) {
  function getIcon() {
    const iconClass = iconClasses[color];

    switch (color) {
      case "red":
        return <HeartPulse size={24} className={iconClass} />;

      case "blue":
        return <Weight size={24} className={iconClass} />;

      case "green":
        return <Footprints size={24} className={iconClass} />;

      case "purple":
        return <Moon size={24} className={iconClass} />;
    }
  }

  return (
    <section
      className={`rounded-2xl border p-6 shadow-sm ${cardClasses[color]}`}
    >
      {getIcon()}

      <p className="mt-4 text-sm font-semibold text-slate-500">
        {title}
      </p>

      <p className="mt-1 text-2xl font-bold text-slate-900">
        {value}
      </p>
    </section>
  );
}

export default SummaryCard;