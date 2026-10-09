import { Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function AttendeesTable({ attendees, onDelete }) {
  return (
    <Table>
      <TableHeader><TableRow><TableHead>Attendee</TableHead><TableHead>Event</TableHead><TableHead>Club</TableHead><TableHead>Ticket</TableHead><TableHead>Registered</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
      <TableBody>
        {attendees.length === 0 ? <TableRow><TableCell colSpan={6} className="py-12 text-center text-muted-foreground">No attendees found.</TableCell></TableRow> : attendees.map((a) => (
          <TableRow key={a.id}>
            <TableCell><div className="font-semibold">{a.name}</div><div className="text-xs text-muted-foreground">{a.email}</div></TableCell>
            <TableCell>{a.event_name}</TableCell>
            <TableCell><Badge variant="secondary">{a.club}</Badge></TableCell>
            <TableCell><Badge variant={a.ticket_type === "VIP" ? "warning" : "outline"}>{a.ticket_type}</Badge></TableCell>
            <TableCell>{new Date(a.created_at + "Z").toLocaleString("en-IN", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}</TableCell>
            <TableCell className="text-right"><Button size="icon" variant="ghost" onClick={() => onDelete(a)}><Trash2 className="h-4 w-4 text-red-500" /></Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
