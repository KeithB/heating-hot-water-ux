import { cn } from "@/lib/utils";
import { TimeState } from "./timeline";

interface VerticalTimelineProps {
  states: TimeState[];
  onSlotClick?: (index: number) => void;
  className?: string;
}

export function VerticalTimeline({ states, onSlotClick, className }: VerticalTimelineProps) {
  const getStateStyle = (state: TimeState) => {
    switch (state) {
      case "empty":
        return "bg-muted border-border";
      case "in-use":
        return "bg-destructive border-destructive";
      case "sleeping":
        return "bg-primary border-primary";
      case "off":
        return "bg-muted border-border";
      case "immersion":
        return "bg-success border-success";
      case "peak":
        return "bg-warning border-warning";
      default:
        return "bg-muted border-border";
    }
  };

  const formatTime = (index: number) => {
    const hour = Math.floor(index / 2);
    const minute = (index % 2) * 30;
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  };

  return (
    <div className={cn("space-y-1", className)}>
      {states.map((state, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center gap-3 p-2 rounded-lg border-2 transition-smooth",
            getStateStyle(state),
            onSlotClick && "cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          )}
          onClick={() => onSlotClick?.(index)}
        >
          <div className="text-sm font-mono text-foreground/80 w-12">
            {formatTime(index)}
          </div>
          <div className="flex-1 h-2 rounded-full bg-current opacity-60" />
          <div className="text-xs text-foreground/60 capitalize">
            {state === "in-use" ? "In Use" : state}
          </div>
        </div>
      ))}
    </div>
  );
}