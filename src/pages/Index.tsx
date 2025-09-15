import { useState } from "react";
import { OverviewScreen } from "@/components/home-control/overview-screen";
import { RoomEditor } from "@/components/home-control/room-editor";
import { HotWaterEditor } from "@/components/home-control/hot-water-editor";
import { TimeState } from "@/components/ui/timeline";

type Screen = "overview" | "room-edit" | "water-edit";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("overview");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState("today");

  // Mock room data - in real app this would come from Home Assistant
  const mockRoomStates: Record<string, TimeState[]> = {
    "Living Room": Array(48).fill("empty").map((_, i) => i >= 16 && i <= 44 ? "in-use" : "empty") as TimeState[],
    "Hallway": Array(48).fill("empty") as TimeState[],
    "Kitchen Diner": Array(48).fill("empty").map((_, i) => (i >= 14 && i <= 18) || (i >= 36 && i <= 42) ? "in-use" : "empty") as TimeState[],
    "Conservatory": Array(48).fill("empty") as TimeState[],
    "Utility Room": Array(48).fill("empty") as TimeState[],
    "Toilet": Array(48).fill("empty") as TimeState[],
    "Master Bedroom": Array(48).fill("empty").map((_, i) => i >= 44 || i <= 14 ? "sleeping" : "empty") as TimeState[],
    "Rhys' Bedroom": Array(48).fill("empty").map((_, i) => i >= 42 || i <= 16 ? "sleeping" : "empty") as TimeState[],
    "Zoes Bedroom": Array(48).fill("empty").map((_, i) => i >= 42 || i <= 16 ? "sleeping" : "empty") as TimeState[],
    "Study": Array(48).fill("empty").map((_, i) => i >= 18 && i <= 36 ? "in-use" : "empty") as TimeState[],
    "Bathroom": Array(48).fill("empty") as TimeState[],
    "Shower room": Array(48).fill("empty") as TimeState[],
  };

  // Mock hot water data - off/on/peak schedule
  const mockHotWaterStates: TimeState[] = Array(48).fill("off").map((_, i) => {
    // Morning peak: 6:00-8:30
    if (i >= 12 && i <= 17) return "peak";
    // Evening on: 17:00-21:00
    if (i >= 34 && i <= 42) return "on";
    return "off";
  }) as TimeState[];

  const handleRoomEdit = (roomName: string) => {
    setSelectedRoom(roomName);
    setCurrentScreen("room-edit");
  };

  const handleHotWaterEdit = () => {
    setCurrentScreen("water-edit");
  };

  const handleStatusClick = () => {
    // TODO: Show diagnostics popup
    console.log("Show system diagnostics");
  };

  const handleBackToOverview = () => {
    setCurrentScreen("overview");
  };

  const handleRoomSave = (states: TimeState[]) => {
    // In real app, this would save to Home Assistant
    console.log("Saving room states:", selectedRoom, states);
    setCurrentScreen("overview");
  };

  const handleHotWaterSave = (states: TimeState[]) => {
    // In real app, this would save to Home Assistant
    console.log("Saving hot water states:", states);
    setCurrentScreen("overview");
  };

  const handleHotWaterCopyToOtherDays = (states: TimeState[]) => {
    // In real app, this would copy to other days
    console.log("Copying hot water states to other days:", states);
    // For now, just show a message - could open a day selector dialog
    alert("Copy to other days functionality would be implemented here");
  };

  return (
    <div className="min-h-screen">
      {currentScreen === "overview" && (
        <OverviewScreen
          onRoomEdit={handleRoomEdit}
          onHotWaterEdit={handleHotWaterEdit}
          onStatusClick={handleStatusClick}
          selectedDay={selectedDay}
          onDayChange={setSelectedDay}
        />
      )}
      
      {currentScreen === "room-edit" && (
        <RoomEditor
          roomName={selectedRoom}
          selectedDay={selectedDay}
          initialStates={mockRoomStates[selectedRoom] || Array(48).fill("empty")}
          onSave={handleRoomSave}
          onCancel={handleBackToOverview}
        />
      )}

      {currentScreen === "water-edit" && (
        <HotWaterEditor
          selectedDay={selectedDay}
          initialStates={mockHotWaterStates}
          onSave={handleHotWaterSave}
          onCancel={handleBackToOverview}
          onCopyToOtherDays={handleHotWaterCopyToOtherDays}
        />
      )}
    </div>
  );
};

export default Index;