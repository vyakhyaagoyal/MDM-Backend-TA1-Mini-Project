import { useState } from "react";
import { CalendarPlus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initial = { name: "", date: "", venue: "", club: "", capacity: 100 };

export function EventDrawer({ open, onOpenChange, onCreate }) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await onCreate({ ...form, capacity: Number(form.capacity) });
      setForm(initial);
      onOpenChange(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2"><CalendarPlus className="h-5 w-5" /> Create event</SheetTitle>
          <SheetDescription>Add an event for any RBU club or community.</SheetDescription>
        </SheetHeader>
        <form onSubmit={submit} className="space-y-5">
          {error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
          {[
            ["name", "Event name", "e.g. RBU Tech Fest"],
            ["date", "Date", ""],
            ["venue", "Venue", "e.g. RBU Main Auditorium"],
            ["club", "Club / community", "e.g. CodeBreakers Club"]
          ].map(([key, label, placeholder]) => (
            <div key={key} className="space-y-2">
              <Label htmlFor={key}>{label}</Label>
              <Input id={key} type={key === "date" ? "date" : "text"} placeholder={placeholder} value={form[key]} onChange={(e) => setForm({...form, [key]: e.target.value})} />
            </div>
          ))}
          <div className="space-y-2">
            <Label htmlFor="capacity">Maximum capacity</Label>
            <Input id="capacity" type="number" min="1" value={form.capacity} onChange={(e) => setForm({...form, capacity: e.target.value})} />
          </div>
          <Button className="w-full" type="submit">Create event</Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
