import { cn } from "@/lib/utils";

export type TimeState = "empty" | "sleeping" | "in-use" | "off" | "immersion" | "peak";

interface TimelineProps {
  states: TimeState[];
  onStateChange?: (index: number, state: TimeState) => void;
  className?: string;
  orientation?: "horizontal" | "vertical";
  showLabels?: boolean;
}

const stateColors: Record<TimeState, string> = {
  empty: "bg-state-empty",
  sleeping: "bg-state-sleeping", 
  "in-use": "bg-state-in-use",
  off: "bg-state-off",
  immersion: "bg-state-immersion",
  peak: "bg-state-peak",
};

export function Timeline({ 
  states, 
  onStateChange, 
  className, 
  orientation = "horizontal",
  showLabels = false 
}: TimelineProps) {
  const isVertical = orientation === "vertical";
  
  return (
    <div className={cn(
      "relative",
      isVertical ? "flex flex-col gap-1" : "flex gap-1",
      className
    )}>
      {states.map((state, index) => {
        const hour = Math.floor(index / 2);
        const isHalfHour = index % 2 === 1;
        
        return (
          <div
            key={index}
            className={cn(
              "transition-smooth cursor-pointer rounded-sm hover:scale-105 active:scale-95",
              stateColors[state],
              isVertical ? "h-4 w-8" : "h-8 w-4",
              onStateChange && "hover:brightness-110"
            )}
            onClick={() => onStateChange?.(index, state)}
            title={`${hour.toString().padStart(2, '0')}:${isHalfHour ? '30' : '00'}`}
          />
        );
      })}
      
      {showLabels && (
        <div className={cn(
          "absolute text-xs text-muted-foreground",
          isVertical ? "left-10 top-0" : "top-10 left-0",
          isVertical ? "flex flex-col gap-4" : "flex gap-4"
        )}>
          {[0, 6, 12, 18].map(hour => (
            <span key={hour} className="font-medium">
              {hour.toString().padStart(2, '0')}:00
            </span>
          ))}
        </div>
      )}
    </div>
  );
}