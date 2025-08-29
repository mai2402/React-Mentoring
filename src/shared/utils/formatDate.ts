


export function formatDate(isoDate: string | null | undefined): string {

    if (!isoDate) return "Joined on N/A";



    const date = new Date(isoDate);

     if (isNaN(date.getTime())) return "Joined: —";

  return `Joined: ${date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",

    })}`;

}