import { Timeline, TimeState } from "@/components/ui/timeline";
import { cn } from "@/lib/utils";
import { Bed, Home } from "lucide-react";

interface RoomTimelineProps {
  roomName: string;
  states: TimeState[];
  onClick: () => void;
  className?: string;
}

export function RoomTimeline({ roomName, states, onClick, className }: RoomTimelineProps) {
  const isBedroomType = roomName.toLowerCase().includes('bedroom') || roomName.toLowerCase().includes('bed');
  
  return (
    <div 
      className={cn(
        "bg-card rounded-xl p-4 shadow-card cursor-pointer transition-smooth hover:shadow-elevated active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        {isBedroomType ? (
          <Bed className="w-5 h-5 text-muted-foreground" />
        ) : (
          <Home className="w-5 h-5 text-muted-foreground" />
        )}
        <h3 className="font-medium text-card-foreground">{roomName}</h3>
      </div>
      
      <Timeline 
        states={states} 
        orientation="horizontal"
        className="w-full"
      />
    </div>
  );
}