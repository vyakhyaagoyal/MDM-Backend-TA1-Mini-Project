export function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div className="fixed bottom-5 right-5 z-[100] max-w-sm rounded-xl border bg-white p-4 shadow-xl">
      <p className="font-semibold">{toast.title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{toast.message}</p>
    </div>
  );
}
