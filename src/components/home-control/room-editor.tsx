import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TimeState } from "@/components/ui/timeline";
import { VerticalTimeline } from "@/components/ui/vertical-timeline";
import { StateLegend } from "./state-legend";
import { CopyToRoomsDialog } from "./copy-to-rooms-dialog";
import { CopyToDaysDialog } from "./copy-to-days-dialog";
import { Bed, Home } from "lucide-react";

interface RoomEditorProps {
  roomName: string;
  selectedDay: string;
  initialStates: TimeState[];
  onSave: (states: TimeState[]) => void;
  onCancel: () => void;
}

export function RoomEditor({ 
  roomName, 
  selectedDay, 
  initialStates, 
  onSave, 
  onCancel 
}: RoomEditorProps) {
  const [states, setStates] = useState<TimeState[]>(initialStates);
  const [showCopyDialog, setShowCopyDialog] = useState(false);
  const [showCopyDaysDialog, setShowCopyDaysDialog] = useState(false);
  
  const isBedroomType = roomName.toLowerCase().includes('bedroom') || roomName.toLowerCase().includes('bed');

  const handleSlotClick = (index: number) => {
    const newStates = [...states];
    // Cycle through states: empty -> in-use -> sleeping -> empty
    if (newStates[index] === "empty") {
      newStates[index] = "in-use";
    } else if (newStates[index] === "in-use") {
      newStates[index] = "sleeping";
    } else {
      newStates[index] = "empty";
    }
    setStates(newStates);
  };

  const handleCopyToOtherDays = () => {
    setShowCopyDaysDialog(true);
  };

  const handleCopyToOtherRooms = () => {
    setShowCopyDialog(true);
  };

  const handleCopyApply = (selectedRooms: string[]) => {
    // In real app, this would update the selected rooms with current states
    console.log("Copying schedule to rooms:", selectedRooms, states);
    setShowCopyDialog(false);
  };

  const handleCopyDaysApply = (selectedDays: string[]) => {
    // In real app, this would update the selected days with current states
    console.log("Copying schedule to days:", selectedDays, states);
    setShowCopyDaysDialog(false);
  };

  const handleSave = () => {
    onSave(states);
  };

  const formatDay = (day: string) => {
    if (day === "today") {
      return new Date().toLocaleDateString('en-US', { weekday: 'long' });
    }
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
              {isBedroomType ? (
                <Bed className="w-5 h-5 text-muted-foreground" />
              ) : (
                <Home className="w-5 h-5 text-muted-foreground" />
              )}
              <div>
                <h1 className="text-xl font-bold text-foreground">{roomName}</h1>
                <p className="text-sm text-muted-foreground">{formatDay(selectedDay)}</p>
              </div>
            </div>
          </div>

          {/* Legend */}
          <StateLegend type="room" />

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
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleCopyToOtherDays}
                className="w-full"
              >
                Copy to Other Days
              </Button>
              <Button
                variant="outline"
                onClick={handleCopyToOtherRooms}
                className="w-full"
              >
                Copy to Other Rooms
              </Button>
            </div>
            
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

      <CopyToRoomsDialog
        open={showCopyDialog}
        onOpenChange={setShowCopyDialog}
        onApply={handleCopyApply}
        currentRoom={roomName}
      />

      <CopyToDaysDialog
        open={showCopyDaysDialog}
        onOpenChange={setShowCopyDaysDialog}
        onApply={handleCopyDaysApply}
        currentDay={selectedDay}
      />
    </>
  );
}