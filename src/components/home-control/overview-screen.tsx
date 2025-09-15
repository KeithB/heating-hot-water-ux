import { useState } from "react";
import { StatusIndicator } from "@/components/ui/status-indicator";
import { BoostButton } from "@/components/ui/boost-button";
import { DaySelector } from "./day-selector";
import { FloorTabs } from "./floor-tabs";
import { RoomTimeline } from "./room-timeline";
import { HotWaterTimeline } from "./hot-water-timeline";
import { TimeState } from "@/components/ui/timeline";

interface OverviewScreenProps {
  onRoomEdit: (roomName: string) => void;
  onHotWaterEdit: () => void;
  onStatusClick: () => void;
  selectedDay: string;
  onDayChange: (day: string) => void;
}

// Mock data - in real app this would come from Home Assistant
const mockRoomData = {
  ground: [
    { name: "Living Room", states: Array(48).fill("empty").map((_, i) => i >= 16 && i <= 44 ? "in-use" : "empty") as TimeState[] },
    { name: "Kitchen", states: Array(48).fill("empty").map((_, i) => (i >= 14 && i <= 18) || (i >= 36 && i <= 42) ? "in-use" : "empty") as TimeState[] },
    { name: "Study", states: Array(48).fill("empty").map((_, i) => i >= 18 && i <= 36 ? "in-use" : "empty") as TimeState[] },
  ],
  first: [
    { name: "Master Bedroom", states: Array(48).fill("empty").map((_, i) => i >= 44 || i <= 14 ? "sleeping" : "empty") as TimeState[] },
    { name: "Guest Bedroom", states: Array(48).fill("empty") as TimeState[] },
    { name: "Kids Bedroom", states: Array(48).fill("empty").map((_, i) => i >= 42 || i <= 16 ? "sleeping" : "empty") as TimeState[] },
  ]
};

const mockHotWaterStates: TimeState[] = Array(48).fill("off").map((_, i) => {
  if ((i >= 12 && i <= 16) || (i >= 36 && i <= 40)) return "peak";
  if ((i >= 10 && i <= 12) || (i >= 16 && i <= 18) || (i >= 34 && i <= 36) || (i >= 40 && i <= 42)) return "on";
  return "off";
});

export function OverviewScreen({ onRoomEdit, onHotWaterEdit, onStatusClick, selectedDay, onDayChange }: OverviewScreenProps) {
  const [selectedFloor, setSelectedFloor] = useState("ground");
  const [systemStatus] = useState<"good" | "warning" | "error">("good");

  const currentRooms = mockRoomData[selectedFloor as keyof typeof mockRoomData];

  const handleBoostHeat = () => {
    // In real app, this would call Home Assistant API
    console.log("Boosting house heat for 1 hour");
  };

  const handleBoostWater = () => {
    // In real app, this would call Home Assistant API  
    console.log("Boosting hot water to peak for 1 hour");
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Home Control</h1>
          <StatusIndicator status={systemStatus} onClick={onStatusClick} />
        </div>

        {/* Boost Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <BoostButton type="heat" onClick={handleBoostHeat} />
          <BoostButton type="water" onClick={handleBoostWater} />
        </div>

        {/* Day Selector */}
        <DaySelector 
          selectedDay={selectedDay} 
          onDayChange={onDayChange}
        />

        {/* Floor Tabs */}
        <FloorTabs 
          selectedFloor={selectedFloor} 
          onFloorChange={setSelectedFloor}
        />

        {/* Room Timelines */}
        <div className="space-y-3">
          {currentRooms.map((room) => (
            <RoomTimeline
              key={room.name}
              roomName={room.name}
              states={room.states}
              onClick={() => onRoomEdit(room.name)}
            />
          ))}
        </div>

        {/* Hot Water Timeline */}
        <HotWaterTimeline
          states={mockHotWaterStates}
          onClick={onHotWaterEdit}
        />
      </div>
    </div>
  );
}