import { cn } from "@/lib/utils";

interface DaySelectorProps {
  selectedDay: string;
  onDayChange: (day: string) => void;
  className?: string;
}

const days = [
  { key: "mon", label: "Mon" },
  { key: "tue", label: "Tue" },
  { key: "wed", label: "Wed" },
  { key: "thu", label: "Thu" },
  { key: "fri", label: "Fri" },
  { key: "sat", label: "Sat" },
  { key: "sun", label: "Sun" },
];

export function DaySelector({ selectedDay, onDayChange, className }: DaySelectorProps) {
  return (
    <div className={cn("flex gap-2 overflow-x-auto pb-2", className)}>
      {days.map((day) => (
        <button
          key={day.key}
          onClick={() => onDayChange(day.key)}
          className={cn(
            "px-4 py-2 rounded-lg font-medium text-sm transition-smooth whitespace-nowrap",
            selectedDay === day.key
              ? "bg-primary text-primary-foreground shadow-card"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          )}
        >
          {day.label}
        </button>
      ))}
    </div>
  );
}