import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "lucide-react";

interface CopyToDaysDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (selectedDays: string[]) => void;
  currentDay: string;
}

const daysOfWeek = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
];

export function CopyToDaysDialog({ 
  open, 
  onOpenChange, 
  onApply, 
  currentDay 
}: CopyToDaysDialogProps) {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleDayToggle = (dayKey: string, checked: boolean) => {
    if (checked) {
      setSelectedDays(prev => [...prev, dayKey]);
    } else {
      setSelectedDays(prev => prev.filter(key => key !== dayKey));
    }
  };

  const handleApply = () => {
    onApply(selectedDays);
    setSelectedDays([]);
  };

  const handleCancel = () => {
    setSelectedDays([]);
    onOpenChange(false);
  };

  const normalizeDay = (day: string) => {
    if (day === "today") return new Date().toLocaleDateString('en', { weekday: 'long' }).toLowerCase();
    return day.toLowerCase();
  };

  const currentDayNormalized = normalizeDay(currentDay);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm mx-auto">
        <DialogHeader>
          <DialogTitle>Copy Schedule to Other Days</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-3">
            {daysOfWeek.map((day) => {
              const isCurrentDay = day.key === currentDayNormalized;
              return (
                <div key={day.key} className="flex items-center space-x-3">
                  <Checkbox
                    id={day.key}
                    checked={selectedDays.includes(day.key)}
                    disabled={isCurrentDay}
                    onCheckedChange={(checked) => 
                      !isCurrentDay && handleDayToggle(day.key, checked as boolean)
                    }
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <Calendar className={`w-4 h-4 ${isCurrentDay ? 'text-muted-foreground/50' : 'text-muted-foreground'}`} />
                    <label 
                      htmlFor={day.key}
                      className={`text-sm font-medium ${
                        isCurrentDay 
                          ? 'text-muted-foreground/50 cursor-not-allowed' 
                          : 'cursor-pointer'
                      }`}
                    >
                      {day.label} {isCurrentDay && '(Current)'}
                    </label>
                  </div>
                </div>
              );
            })}
          </div>
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
            disabled={selectedDays.length === 0}
            className="flex-1 bg-accent hover:bg-accent/90"
          >
            Apply
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}