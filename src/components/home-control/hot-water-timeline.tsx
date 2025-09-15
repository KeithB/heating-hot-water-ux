import { Timeline, TimeState } from "@/components/ui/timeline";
import { cn } from "@/lib/utils";
import { Droplets } from "lucide-react";

interface HotWaterTimelineProps {
  states: TimeState[];
  onClick: () => void;
  className?: string;
}

export function HotWaterTimeline({ states, onClick, className }: HotWaterTimelineProps) {
  return (
    <div 
      className={cn(
        "bg-card rounded-xl p-4 shadow-card cursor-pointer transition-smooth hover:shadow-elevated active:scale-[0.98]",
        className
      )}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-3">
        <Droplets className="w-5 h-5 text-muted-foreground" />
        <h3 className="font-medium text-card-foreground">Hot Water</h3>
      </div>
      
      <Timeline 
        states={states} 
        orientation="horizontal"
        className="w-full"
      />
    </div>
  );
}