export function timeAgo(iso: Date) {
  const now = new Date();

  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const diffDays = Math.round((startOfDay(now).getTime() - startOfDay(iso).getTime()) / 86_400_000);

  let relative: string;
  if (diffDays === 0) relative = "aujourd'hui";
  else if (diffDays === 1) relative = 'hier';
  else if (diffDays > 1) relative = `il y a ${diffDays} jours`;
  else if (diffDays === -1) relative = 'demain';
  else relative = `dans ${Math.abs(diffDays)} jours`;

  return relative;
}
