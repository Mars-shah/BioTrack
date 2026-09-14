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
  red: "border-red-500/20 bg-red-500/10",
  blue: "border-blue-500/20 bg-blue-500/10",
  green: "border-green-500/20 bg-green-500/10",
  purple: "border-purple-500/20 bg-purple-500/10",
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
      className={`rounded-lg border p-5 ${cardClasses[color]}`}
    >
      {getIcon()}

      <p className="mt-4 text-sm font-medium text-[var(--muted)]">
        {title}
      </p>

      <p className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-[var(--foreground)]">
        {value}
      </p>
    </section>
  );
}

export default SummaryCard;