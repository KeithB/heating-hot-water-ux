import { useState } from "react";
import { OverviewScreen } from "@/components/home-control/overview-screen";

type Screen = "overview" | "room-edit" | "water-edit";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("overview");
  const [selectedRoom, setSelectedRoom] = useState<string>("");

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

  return (
    <div className="min-h-screen">
      {currentScreen === "overview" && (
        <OverviewScreen
          onRoomEdit={handleRoomEdit}
          onHotWaterEdit={handleHotWaterEdit}
          onStatusClick={handleStatusClick}
        />
      )}
      
      {currentScreen === "room-edit" && (
        <div className="min-h-screen bg-gradient-subtle p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={handleBackToOverview}
                className="text-primary hover:text-primary/80 font-medium"
              >
                ← Back
              </button>
              <h1 className="text-xl font-bold text-foreground">{selectedRoom} Editor</h1>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card text-center">
              <p className="text-muted-foreground">Room editor coming soon...</p>
            </div>
          </div>
        </div>
      )}

      {currentScreen === "water-edit" && (
        <div className="min-h-screen bg-gradient-subtle p-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <button 
                onClick={handleBackToOverview}
                className="text-primary hover:text-primary/80 font-medium"
              >
                ← Back
              </button>
              <h1 className="text-xl font-bold text-foreground">Hot Water Editor</h1>
            </div>
            <div className="bg-card rounded-xl p-6 shadow-card text-center">
              <p className="text-muted-foreground">Hot water editor coming soon...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;