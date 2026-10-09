import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Users, TrendingUp, Armchair, Plus, UserPlus, ArrowUpRight } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { StatCard } from "@/components/StatCard";
import { EventDrawer } from "@/components/events/EventDrawer";
import { AttendeeDrawer } from "@/components/attendees/AttendeeDrawer";
import { EventsTable } from "@/components/events/EventsTable";
import { AttendeesTable } from "@/components/attendees/AttendeesTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";
import { Toast } from "@/components/Toast";

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [stats, setStats] = useState({ events: 0, attendees: 0, upcomingEvents: 0, availableSeats: 0 });
  const [search, setSearch] = useState("");
  const [eventOpen, setEventOpen] = useState(false);
  const [attendeeOpen, setAttendeeOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  const notify = (title, message) => {
    setToast({ title, message });
    setTimeout(() => setToast(null), 3500);
  };

  const refresh = async () => {
    setLoading(true);
    try {
      const [s, e, a] = await Promise.all([api.getStats(), api.getEvents(), api.getAttendees()]);
      setStats(s.data); setEvents(e.data); setAttendees(a.data);
    } catch (err) {
      notify("Connection error", err.message);
    } finally { setLoading(false); }
  };

  useEffect(() => { refresh(); }, []);

  const filteredEvents = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return events;
    return events.filter(e => [e.name, e.club, e.venue].some(v => v.toLowerCase().includes(q)));
  }, [events, search]);

  const filteredAttendees = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return attendees;
    return attendees.filter(a => [a.name, a.email, a.event_name, a.club].some(v => v.toLowerCase().includes(q)));
  }, [attendees, search]);

  const createEvent = async (data) => {
    const res = await api.createEvent(data);
    notify("Event created", res.message);
    await refresh();
  };

  const registerAttendee = async (data) => {
    const res = await api.registerAttendee(data);
    notify("Registration complete", res.message);
    await refresh();
  };

  const deleteEvent = async (event) => {
    if (!confirm(`Delete "${event.name}"? All attendee records for this event will also be deleted.`)) return;
    try {
      const res = await api.deleteEvent(event.id);
      notify("Event deleted", res.message);
      await refresh();
    } catch (err) { notify("Could not delete event", err.message); }
  };

  const deleteAttendee = async (attendee) => {
    if (!confirm(`Delete registration for ${attendee.name}?`)) return;
    try {
      const res = await api.deleteAttendee(attendee.id);
      notify("Attendee removed", res.message);
      await refresh();
    } catch (err) { notify("Could not delete attendee", err.message); }
  };

  const viewEvent = async (event) => {
    try {
      const res = await api.getEvent(event.id);
      setSelectedEvent(res.data);
    } catch (err) { notify("Could not load event", err.message); }
  };

  const navigate = (page) => { setActive(page); setSearch(""); setSelectedEvent(null); };

  if (loading && events.length === 0) {
    return <div className="flex min-h-screen items-center justify-center bg-slate-50"><div className="text-center"><div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-slate-900" /><p className="mt-3 text-sm text-muted-foreground">Loading RBU Event Manager...</p></div></div>;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar active={active} onNavigate={navigate} />
      <div className="min-w-0 flex-1">
        <Header active={active} search={search} setSearch={setSearch} onMenu={() => {}} />
        <main className="mx-auto max-w-[1600px] p-4 pb-24 md:p-6 lg:p-8">
          {active === "dashboard" && (
            <>
              <div className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div><p className="text-sm font-medium text-primary">Welcome to RBU Event Manager</p><h2 className="mt-1 text-3xl font-bold tracking-tight">Everything happening at RBU.</h2><p className="mt-2 max-w-2xl text-muted-foreground">Manage events, registrations and attendee records across RBU clubs from one clean workspace.</p></div>
                <div className="flex gap-2"><Button variant="outline" onClick={() => { setActive("attendees"); setAttendeeOpen(true); }}><UserPlus className="mr-2 h-4 w-4" /> Register</Button><Button onClick={() => setEventOpen(true)}><Plus className="mr-2 h-4 w-4" /> New event</Button></div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Total events" value={stats.events} helper="Across all RBU clubs" icon={CalendarDays} />
                <StatCard label="Registrations" value={stats.attendees} helper="Confirmed attendees" icon={Users} />
                <StatCard label="Upcoming" value={stats.upcomingEvents} helper="Events still to come" icon={TrendingUp} />
                <StatCard label="Seats available" value={stats.availableSeats} helper="Across all capacities" icon={Armchair} />
              </div>
              <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
                <Card><CardHeader className="flex-row items-center justify-between"><div><CardTitle>Upcoming events</CardTitle><CardDescription>Latest event schedule across RBU clubs.</CardDescription></div><Button variant="ghost" size="sm" onClick={() => navigate("events")}>View all <ArrowUpRight className="ml-1 h-4 w-4" /></Button></CardHeader><CardContent><EventsTable events={events.slice(0,5)} onDelete={deleteEvent} onRegister={(e) => { setSelectedEventId(e.id); setAttendeeOpen(true); }} onView={viewEvent} /></CardContent></Card>
                <Card><CardHeader><CardTitle>Recent registrations</CardTitle><CardDescription>Latest attendees added.</CardDescription></CardHeader><CardContent className="space-y-4">{attendees.slice(0,6).map(a => <div key={a.id} className="flex items-center justify-between gap-3"><div className="min-w-0"><p className="truncate text-sm font-semibold">{a.name}</p><p className="truncate text-xs text-muted-foreground">{a.event_name}</p></div><span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[11px]">{a.ticket_type}</span></div>)}{attendees.length === 0 && <p className="py-8 text-center text-sm text-muted-foreground">No registrations yet.</p>}</CardContent></Card>
              </div>
            </>
          )}

          {active === "events" && (
            <>
              <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><h2 className="text-2xl font-bold">Events</h2><p className="mt-1 text-sm text-muted-foreground">Create and manage events for all RBU clubs.</p></div><Button onClick={() => setEventOpen(true)}><Plus className="mr-2 h-4 w-4" /> Create event</Button></div>
              <Card><CardContent className="p-0"><EventsTable events={filteredEvents} onDelete={deleteEvent} onRegister={(e) => { setSelectedEventId(e.id); setAttendeeOpen(true); }} onView={viewEvent} /></CardContent></Card>
              {selectedEvent && <Card className="mt-6 border-primary/20"><CardHeader><CardTitle>{selectedEvent.name}</CardTitle><CardDescription>{selectedEvent.club} · {selectedEvent.venue} · {selectedEvent.date}</CardDescription></CardHeader><CardContent><p className="text-sm font-medium">{selectedEvent.attendees.length} attendees</p><div className="mt-3 flex flex-wrap gap-2">{selectedEvent.attendees.map(a => <span key={a.id} className="rounded-full bg-slate-100 px-3 py-1 text-xs">{a.name}</span>)}</div></CardContent></Card>}
            </>
          )}

          {active === "attendees" && (
            <>
              <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center"><div><h2 className="text-2xl font-bold">Attendees</h2><p className="mt-1 text-sm text-muted-foreground">Search and manage all event registrations.</p></div><Button onClick={() => setAttendeeOpen(true)}><UserPlus className="mr-2 h-4 w-4" /> Register attendee</Button></div>
              <div className="mb-4 md:hidden"><Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search attendees..." /></div>
              <Card><CardContent className="p-0"><AttendeesTable attendees={filteredAttendees} onDelete={deleteAttendee} /></CardContent></Card>
            </>
          )}
        </main>
      </div>

      <MobileNav active={active} onNavigate={navigate} />
      <EventDrawer open={eventOpen} onOpenChange={setEventOpen} onCreate={createEvent} />
      <AttendeeDrawer open={attendeeOpen} onOpenChange={setAttendeeOpen} events={events} selectedEventId={selectedEventId} onRegister={registerAttendee} />
      <Toast toast={toast} />
    </div>
  );
}
