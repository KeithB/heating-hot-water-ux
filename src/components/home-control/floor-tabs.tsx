import { cn } from "@/lib/utils";

interface FloorTabsProps {
  selectedFloor: string;
  onFloorChange: (floor: string) => void;
  className?: string;
}

const floors = [
  { key: "ground", label: "Ground Floor" },
  { key: "first", label: "First Floor" },
];

export function FloorTabs({ selectedFloor, onFloorChange, className }: FloorTabsProps) {
  return (
    <div className={cn("flex bg-secondary rounded-lg p-1", className)}>
      {floors.map((floor) => (
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
          {floor.label}
        </button>
      ))}
    </div>
  );
}