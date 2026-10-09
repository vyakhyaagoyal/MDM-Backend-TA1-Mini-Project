import { CalendarDays, Users, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav({ active, onNavigate }) {
  const items = [
    ["dashboard", "Home", LayoutDashboard],
    ["events", "Events", CalendarDays],
    ["attendees", "Attendees", Users]
  ];
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 grid grid-cols-3 border-t bg-white/95 p-2 backdrop-blur lg:hidden">
      {items.map(([id, label, Icon]) => (
        <button key={id} onClick={() => onNavigate(id)} className={cn("flex flex-col items-center gap-1 rounded-lg py-2 text-xs", active === id ? "text-primary" : "text-muted-foreground")}>
          <Icon className="h-5 w-5" />{label}
        </button>
      ))}
    </nav>
  );
}
