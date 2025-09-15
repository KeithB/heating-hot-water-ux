import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { VerticalTimeline } from "@/components/ui/vertical-timeline";
import { TimeState } from "@/components/ui/timeline";
import { ChevronLeft, Droplets, Calendar, Save, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface HotWaterEditorProps {
  selectedDay: string;
  initialStates: TimeState[];
  onSave: (states: TimeState[]) => void;
  onCancel: () => void;
  onCopyToOtherDays: (states: TimeState[]) => void;
}

export function HotWaterEditor({
  selectedDay,
  initialStates,
  onSave,
  onCancel,
  onCopyToOtherDays,
}: HotWaterEditorProps) {
  const [states, setStates] = useState<TimeState[]>(initialStates);

  const handleSlotClick = (index: number) => {
    const newStates = [...states];
    const currentState = newStates[index];
    
    // Cycle through hot water states: off -> immersion -> peak -> off
    if (currentState === "off" || currentState === "empty") {
      newStates[index] = "immersion";
    } else if (currentState === "immersion") {
      newStates[index] = "peak";
    } else if (currentState === "peak") {
      newStates[index] = "off";
    }
    
    setStates(newStates);
  };

  const handleSave = () => {
    onSave(states);
  };

  const handleCopyToOtherDays = () => {
    onCopyToOtherDays(states);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Card className="rounded-none border-0 border-b bg-card shadow-sm">
        <div className="flex items-center gap-3 p-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Droplets className="w-5 h-5 text-primary" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-card-foreground">Hot Water</h1>
            <p className="text-sm text-muted-foreground">{selectedDay}</p>
          </div>
        </div>
      </Card>

      <div className="p-4 space-y-6">
        {/* Legend */}
        <Card className="p-4">
          <h3 className="text-sm font-medium text-card-foreground mb-3">States</h3>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-muted border-2 border-border" />
              <span className="text-foreground">Off</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-success border-2 border-success" />
              <span className="text-foreground">Immersion</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-warning border-2 border-warning" />
              <span className="text-foreground">Peak</span>
            </div>
          </div>
        </Card>

        {/* Timeline */}
        <Card className="p-4">
          <h3 className="text-sm font-medium text-card-foreground mb-4">Schedule</h3>
          <VerticalTimeline
            states={states}
            onSlotClick={handleSlotClick}
            className="max-h-[60vh] overflow-y-auto"
          />
        </Card>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
          
          <Button
            variant="outline"
            onClick={handleCopyToOtherDays}
            className="flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Copy Days
          </Button>
          
          <Button
            onClick={handleSave}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Bottom padding to account for fixed buttons */}
      <div className="h-20" />
    </div>
  );
}