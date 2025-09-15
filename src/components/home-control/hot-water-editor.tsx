import { useState } from "react";
import { Button } from "@/components/ui/button";
import { VerticalTimeline } from "@/components/ui/vertical-timeline";
import { TimeState } from "@/components/ui/timeline";
import { StateLegend } from "./state-legend";
import { CopyToDaysDialog } from "./copy-to-days-dialog";
import { Droplets } from "lucide-react";

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
  const [showCopyDaysDialog, setShowCopyDaysDialog] = useState(false);

  const handleSlotClick = (index: number) => {
    const newStates = [...states];
    const currentState = newStates[index];
    
    // Cycle through hot water states: off -> on -> peak -> off
    if (currentState === "off" || currentState === "empty") {
      newStates[index] = "on";
    } else if (currentState === "on") {
      newStates[index] = "peak";
    } else if (currentState === "peak") {
      newStates[index] = "off";
    }
    
    setStates(newStates);
  };

  const handleCopyToOtherDays = () => {
    setShowCopyDaysDialog(true);
  };

  const handleCopyDaysApply = (selectedDays: string[]) => {
    // In real app, this would update the selected days with current states
    console.log("Copying hot water schedule to days:", selectedDays, states);
    onCopyToOtherDays(states);
    setShowCopyDaysDialog(false);
  };

  const handleSave = () => {
    onSave(states);
  };

  const formatDay = (day: string) => {
    if (day === "today") return "Today";
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-subtle p-4">
        <div className="max-w-md mx-auto space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={onCancel}
              className="text-primary hover:text-primary/80 font-medium"
            >
              ← Back
            </button>
            <div className="flex items-center gap-3">
              <Droplets className="w-5 h-5 text-muted-foreground" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Hot Water</h1>
                <p className="text-sm text-muted-foreground">{formatDay(selectedDay)}</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <StateLegend type="water" />

          {/* Timeline */}
          <div className="bg-card rounded-xl p-4 shadow-card">
            <VerticalTimeline
              states={states}
              onSlotClick={handleSlotClick}
              className="mb-4"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={handleCopyToOtherDays}
              className="w-full"
            >
              Copy to Other Days
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={onCancel}
                className="w-full"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="w-full bg-accent hover:bg-accent/90"
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CopyToDaysDialog
        open={showCopyDaysDialog}
        onOpenChange={setShowCopyDaysDialog}
        onApply={handleCopyDaysApply}
        currentDay={selectedDay}
      />
    </>
  );
}