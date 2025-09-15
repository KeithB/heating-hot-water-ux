import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Bed, Home } from "lucide-react";

interface CopyToRoomsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (selectedRooms: string[]) => void;
  currentRoom: string;
}

const roomsByFloor = {
  ground: [
    { name: "Living Room", type: "living" },
    { name: "Kitchen", type: "kitchen" },
    { name: "Study", type: "study" },
  ],
  first: [
    { name: "Master Bedroom", type: "bedroom" },
    { name: "Guest Bedroom", type: "bedroom" },
    { name: "Kids Bedroom", type: "bedroom" },
  ]
};

export function CopyToRoomsDialog({ 
  open, 
  onOpenChange, 
  onApply, 
  currentRoom 
}: CopyToRoomsDialogProps) {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  const handleRoomToggle = (roomName: string, checked: boolean) => {
    if (checked) {
      setSelectedRooms(prev => [...prev, roomName]);
    } else {
      setSelectedRooms(prev => prev.filter(name => name !== roomName));
    }
  };

  const handleApply = () => {
    onApply(selectedRooms);
    setSelectedRooms([]);
  };

  const handleCancel = () => {
    setSelectedRooms([]);
    onOpenChange(false);
  };

  const formatFloorName = (floor: string) => {
    return floor === "ground" ? "Ground Floor" : "First Floor";
  };

  const getRoomIcon = (type: string) => {
    return type === "bedroom" ? (
      <Bed className="w-4 h-4 text-muted-foreground" />
    ) : (
      <Home className="w-4 h-4 text-muted-foreground" />
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle>Copy Schedule to Other Rooms</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {Object.entries(roomsByFloor).map(([floor, rooms]) => (
            <div key={floor} className="space-y-3">
              <h3 className="font-medium text-foreground">
                {formatFloorName(floor)}
              </h3>
              
              <div className="space-y-3">
                {rooms
                  .filter(room => room.name !== currentRoom)
                  .map((room) => (
                    <div key={room.name} className="flex items-center space-x-3">
                      <Checkbox
                        id={room.name}
                        checked={selectedRooms.includes(room.name)}
                        onCheckedChange={(checked) => 
                          handleRoomToggle(room.name, checked as boolean)
                        }
                      />
                      <div className="flex items-center gap-2 flex-1">
                        {getRoomIcon(room.type)}
                        <label 
                          htmlFor={room.name}
                          className="text-sm font-medium cursor-pointer"
                        >
                          {room.name}
                        </label>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            disabled={selectedRooms.length === 0}
            className="flex-1 bg-accent hover:bg-accent/90"
          >
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}