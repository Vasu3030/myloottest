export function formatDate(date: Date) {
  // Format date to YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}


export function formatDateTimeline (dateStr: string) {
  const d = new Date(dateStr);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  // If the date is the first day of the year, include the year
  if (day === 1 && month === 1) {
    return `${day}/${month}/${year}`;
  }
  return `${day}/${month}`;
};
