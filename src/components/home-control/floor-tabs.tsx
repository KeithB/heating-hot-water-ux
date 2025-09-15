import { cn } from "@/lib/utils";
import { TimeState } from "@/components/ui/timeline";

interface FloorTabsProps {
  selectedFloor: string;
  onFloorChange: (floor: string) => void;
  roomData?: Record<string, Array<{ name: string; states: TimeState[] }>>;
  className?: string;
}

const floors = [
  { key: "ground", label: "Ground Floor" },
  { key: "first", label: "First Floor" },
];

export function FloorTabs({ selectedFloor, onFloorChange, roomData, className }: FloorTabsProps) {
  // Create mini timeline for each floor showing active periods
  const getFloorTimeline = (floorKey: string) => {
    if (!roomData?.[floorKey]) return [];
    
    const combinedStates = Array(48).fill(false);
    roomData[floorKey].forEach(room => {
      room.states.forEach((state, index) => {
        if (state === "in-use" || state === "sleeping") {
          combinedStates[index] = true;
        }
      });
    });
    
    return combinedStates;
  };
  return (
    <div className={cn("flex bg-secondary rounded-lg p-1", className)}>
      {floors.map((floor) => {
        const timeline = getFloorTimeline(floor.key);
        
        return (
          <button
            key={floor.key}
            onClick={() => onFloorChange(floor.key)}
            className={cn(
              "flex-1 px-4 py-2 rounded-md font-medium text-sm transition-smooth",
              selectedFloor === floor.key
                ? "bg-card text-card-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div className="flex flex-col items-center gap-1">
              <span>{floor.label}</span>
              <div className="flex gap-0.5">
                {timeline.map((isActive, index) => (
                  <div
                    key={index}
                    className={cn(
                      "w-1 h-2 rounded-sm",
                      isActive ? "bg-primary" : "bg-muted"
                    )}
                  />
                ))}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}