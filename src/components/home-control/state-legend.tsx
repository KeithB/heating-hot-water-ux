import { cn } from "@/lib/utils";
import { TimeState } from "@/components/ui/timeline";

interface StateLegendProps {
  type: "room" | "water";
  className?: string;
}

const roomStates: { state: TimeState; label: string }[] = [
  { state: "empty", label: "Empty" },
  { state: "sleeping", label: "Sleeping" },
  { state: "in-use", label: "In-use" },
];

const waterStates: { state: TimeState; label: string }[] = [
  { state: "off", label: "Off" },
  { state: "on", label: "On" },
  { state: "peak", label: "Peak" },
];

const stateColors: Record<TimeState, string> = {
  empty: "bg-muted",
  sleeping: "bg-primary", 
  "in-use": "bg-destructive",
  off: "bg-muted",
  on: "bg-success",
  peak: "bg-warning",
};

export function StateLegend({ type, className }: StateLegendProps) {
  const states = type === "room" ? roomStates : waterStates;
  
  return (
    <div className={cn("bg-secondary/50 rounded-lg p-3", className)}>
      <h4 className="font-medium text-sm text-foreground mb-2">Legend:</h4>
      <div className="flex flex-wrap gap-3">
        {states.map(({ state, label }) => (
          <div key={state} className="flex items-center gap-2">
            <div className={cn("w-4 h-4 rounded-sm", stateColors[state])} />
            <span className="text-sm text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}