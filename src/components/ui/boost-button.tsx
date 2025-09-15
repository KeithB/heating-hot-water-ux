import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Flame, Droplets } from "lucide-react";

interface BoostButtonProps {
  type: "heat" | "water";
  onClick: () => void;
  className?: string;
}

export function BoostButton({ type, onClick, className }: BoostButtonProps) {
  const config = {
    heat: {
      icon: Flame,
      label: "Boost Heat",
      color: "bg-boost-heat hover:bg-boost-heat/90",
    },
    water: {
      icon: Droplets,
      label: "Boost Water",
      color: "bg-boost-water hover:bg-boost-water/90",
    }
  };

  const { icon: Icon, label, color } = config[type];

  return (
    <Button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 text-white font-medium py-3 px-4 rounded-xl shadow-card transition-smooth active:scale-95",
        color,
        className
      )}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Button>
  );
}