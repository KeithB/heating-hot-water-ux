import { Timeline, TimeState } from "@/components/ui/timeline";
import { cn } from "@/lib/utils";
import { 
  Bed, 
  Sofa, 
  DoorOpen, 
  ChefHat, 
  Flower, 
  Settings, 
  Bath, 
  BookOpen 
} from "lucide-react";

interface RoomTimelineProps {
  roomName: string;
  states: TimeState[];
  onClick: () => void;
  className?: string;
}

export function RoomTimeline({ roomName, states, onClick, className }: RoomTimelineProps) {
  const getRoomIcon = () => {
    const name = roomName.toLowerCase();
    if (name.includes('bedroom')) return <Bed className="w-5 h-5 text-muted-foreground" />;
    if (name.includes('living')) return <Sofa className="w-5 h-5 text-muted-foreground" />;
    if (name.includes('hallway')) return <DoorOpen className="w-5 h-5 text-muted-foreground" />;
    if (name.includes('kitchen')) return <ChefHat className="w-5 h-5 text-muted-foreground" />;
    if (name.includes('conservatory')) return <Flower className="w-5 h-5 text-muted-foreground" />;
    if (name.includes('utility')) return <Settings className="w-5 h-5 text-muted-foreground" />;
    if (name.includes('toilet') || name.includes('bathroom') || name.includes('shower')) return <Bath className="w-5 h-5 text-muted-foreground" />;
    if (name.includes('study')) return <BookOpen className="w-5 h-5 text-muted-foreground" />;
    return <Sofa className="w-5 h-5 text-muted-foreground" />; // default fallback
  };
  
  return (
    <div 
      className={cn(
        "bg-card rounded-xl p-4 shadow-card cursor-pointer transition-smooth hover:shadow-elevated active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        {getRoomIcon()}
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