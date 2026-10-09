import { CalendarDays, Users, LayoutDashboard, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar({ active, onNavigate }) {
  const items = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "events", label: "Events", icon: CalendarDays },
    { id: "attendees", label: "Attendees", icon: Users }
  ];

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-white lg:flex lg:flex-col">
      <div className="flex h-20 items-center gap-3 border-b px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white shadow-sm">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div>
          <p className="font-bold tracking-tight">RBU Event Manager</p>
          <p className="text-xs text-muted-foreground">RBU Clubs & Communities</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition",
                active === item.id ? "bg-slate-950 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="m-4 rounded-xl bg-slate-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Built for RBU</p>
        <p className="mt-1 text-sm font-medium">Manage every club event from one place.</p>
      </div>
    </aside>
  );
}
