import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: "good" | "warning" | "error";
  onClick?: () => void;
  className?: string;
}

export function StatusIndicator({ status, onClick, className }: StatusIndicatorProps) {
  const statusConfig = {
    good: {
      color: "bg-status-good",
      label: "System OK"
    },
    warning: {
      color: "bg-status-warning", 
      label: "System Degraded"
    },
    error: {
      color: "bg-status-error",
      label: "System Error"
    }
  };

  const config = statusConfig[status];

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-2 rounded-lg transition-smooth",
        "hover:bg-secondary/50 active:scale-95",
        className
      )}
      aria-label={config.label}
    >
      <div className={cn("w-3 h-3 rounded-full", config.color)} />
      <span className="text-sm font-medium text-foreground/80">
        {config.label}
      </span>
    </button>
  );
}