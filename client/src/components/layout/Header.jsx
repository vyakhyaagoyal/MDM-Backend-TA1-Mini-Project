import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";

export function Header({ search, setSearch, active, onMenu }) {
  const title = active === "dashboard" ? "Dashboard" : active === "events" ? "Events" : "Attendees";
  return (
    <header className="sticky top-0 z-20 flex h-20 items-center gap-4 border-b bg-white/90 px-4 backdrop-blur md:px-6">
      <button className="rounded-lg p-2 hover:bg-muted lg:hidden" onClick={onMenu}><Menu className="h-5 w-5" /></button>
      <div className="min-w-0 flex-1">
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className="hidden text-xs text-muted-foreground sm:block">RBU Clubs & Events Operations</p>
      </div>
      {active !== "dashboard" && (
        <div className="relative hidden w-full max-w-sm md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={`Search ${active}...`} className="pl-9" />
        </div>
      )}
      <button className="rounded-lg border p-2.5 hover:bg-muted"><Bell className="h-4 w-4" /></button>
      <div className="hidden h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-bold sm:flex">RBU</div>
    </header>
  );
}
