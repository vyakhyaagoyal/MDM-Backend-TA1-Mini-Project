import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ label, value, helper, icon: Icon }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{helper}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </Card>
  );
}
