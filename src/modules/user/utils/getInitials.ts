



export function getInitials (name: string){

    const s = ( name ?? "").trim();

    if (!s) return "??";

  const parts = s.replace(/[_.-]+/g, " ").split(/\s+/).filter(Boolean);
  const a = Array.from(parts[0] ?? "");
  const b = Array.from(parts[1] ?? "");
  return ((a[0] ?? "") + (b[0] ?? a[1] ?? "")).toUpperCase();


}