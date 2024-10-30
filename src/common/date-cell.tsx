import { cn } from 'utils';
import { formatDate } from 'utils';

interface DateCellProps {
  date: Date;
  className?: string;
  dateFormat?: string;
  dateClassName?: string;
  timeFormat?: string;
  timeClassName?: string;
  time?: boolean;
}

export default function DateCell({
  date,
  className,
  timeClassName,
  dateClassName,
  dateFormat = 'DD/MM/YYYY',
  timeFormat = 'h:mm A',
  time = true,
}: DateCellProps) {
  return (
    <div className={cn(className, 'flex-col gap-2')}>
      <time
        dateTime={formatDate(date, 'YYYY-MM-DD')}
        className={cn('font-medium text-gray-700', dateClassName)}>
        {formatDate(date, dateFormat)}
      </time>
      {time && (
        <time
          dateTime={formatDate(date, 'HH:mm:ss')}
          className={cn('text-[13px] ml-1 font-medium text-gray-700', timeClassName)}>
          {formatDate(date, timeFormat)}
        </time>
      )}
    </div>
  );
}
