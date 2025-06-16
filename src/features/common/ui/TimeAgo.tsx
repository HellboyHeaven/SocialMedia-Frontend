import {
  format,
  formatDistanceToNow,
  isToday,
  isYesterday,
  differenceInDays,
} from "date-fns";
import { enGB } from "date-fns/locale";

interface TimeAgoProps {
  iso: string;
}

export default function TimeAgo({ iso }: TimeAgoProps) {
  const date = new Date(iso);
  const now = new Date();
  const daysDiff = differenceInDays(now, date);

  const fullDate = format(date, "d MMMM yyyy, HH:mm", { locale: enGB });

  if (daysDiff === 0) {
    if (isToday(date)) {
      const secondsAgo = (now.getTime() - date.getTime()) / 1000;
      if (secondsAgo < 10) return <span title={fullDate}>now</span>;
      return (
        <span title={fullDate}>
          {formatDistanceToNow(date, { addSuffix: true, locale: enGB })}
        </span>
      );
    }
  }

  if (isYesterday(date)) return <span title={fullDate}>yesterday</span>;
  if (daysDiff <= 7)
    return (
      <span title={fullDate}>
        {formatDistanceToNow(date, { addSuffix: true, locale: enGB })}
      </span>
    );

  const formatString =
    date.getFullYear() === now.getFullYear() ? "d MMMM" : "d MMMM yyyy";
  return (
    <span title={fullDate}>{format(date, formatString, { locale: enGB })}</span>
  );
}
