import { cn } from "@/lib/utils";

export type TimeState = "empty" | "sleeping" | "in-use" | "off" | "on" | "peak";

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
  on: "bg-state-on",
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
  
  // Find state change points
  const getStateChanges = () => {
    const changes: number[] = [];
    for (let i = 1; i < states.length; i++) {
      if (states[i] !== states[i - 1]) {
        changes.push(i);
      }
    }
    
    // Filter out changes that are too close together (within 2 segments)
    const filteredChanges: number[] = [];
    for (let i = 0; i < changes.length; i++) {
      const current = changes[i];
      const next = changes[i + 1];
      
      if (!next || next - current > 2) {
        filteredChanges.push(current);
      } else {
        // Skip the close change and add the later one
        i++;
        if (next) filteredChanges.push(next);
      }
    }
    
    return filteredChanges;
  };
  
  const stateChanges = getStateChanges();
  
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
      
      {/* State change time labels */}
      {stateChanges.map((changeIndex) => {
        const hour = Math.floor(changeIndex / 2);
        const isHalfHour = changeIndex % 2 === 1;
        const timeLabel = `${hour.toString().padStart(2, '0')}:${isHalfHour ? '30' : '00'}`;
        
        return (
          <div
            key={`change-${changeIndex}`}
            className={cn(
              "absolute text-xs font-medium text-muted-foreground pointer-events-none",
              isVertical 
                ? "left-10 transform -translate-y-1/2" 
                : "top-10 transform -translate-x-1/2"
            )}
            style={
              isVertical 
                ? { top: `${(changeIndex / states.length) * 100}%` }
                : { left: `${(changeIndex / states.length) * 100}%` }
            }
          >
            {timeLabel}
          </div>
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