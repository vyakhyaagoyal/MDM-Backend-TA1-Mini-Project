import { useEffect, useState } from "react";
import { UserPlus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function AttendeeDrawer({ open, onOpenChange, events, selectedEventId, onRegister }) {
  const [form, setForm] = useState({ eventId: "", name: "", email: "", ticketType: "Student" });
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) setForm({ eventId: selectedEventId ? String(selectedEventId) : (events[0] ? String(events[0].id) : ""), name: "", email: "", ticketType: "Student" });
  }, [open, selectedEventId, events]);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await onRegister({ ...form, eventId: Number(form.eventId) });
      onOpenChange(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5" /> Register attendee</SheetTitle>
          <SheetDescription>Register an attendee without leaving the event manager.</SheetDescription>
        </SheetHeader>
        <form onSubmit={submit} className="space-y-5">
          {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          <div className="space-y-2">
            <Label>Event</Label>
            <Select value={form.eventId} onValueChange={(value) => setForm({...form, eventId: value})}>
              <SelectTrigger><SelectValue placeholder="Select event" /></SelectTrigger>
              <SelectContent>
                {events.map((event) => <SelectItem key={event.id} value={String(event.id)}>{event.name} · {event.seats_left} seats</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2"><Label htmlFor="attendee-name">Name</Label><Input id="attendee-name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} placeholder="Full name" /></div>
          <div className="space-y-2"><Label htmlFor="attendee-email">Email</Label><Input id="attendee-email" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} placeholder="student@rbunagpur.in" /></div>
          <div className="space-y-2">
            <Label>Ticket type</Label>
            <Select value={form.ticketType} onValueChange={(value) => setForm({...form, ticketType: value})}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="Student">Student</SelectItem><SelectItem value="General">General</SelectItem><SelectItem value="VIP">VIP</SelectItem></SelectContent>
            </Select>
          </div>
          <Button className="w-full" type="submit">Complete registration</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
