import { cn } from 'utils';

interface FormGroupProps {
  title?: React.ReactNode;
  className?: string;
  childrenclass?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function FormGroup({
  title,
  className,
  childrenclass,
  description,
  children,
}: FormGroupProps) {
  return (
    <div className={cn('grid gap-3 @3xl:grid-cols-12', className)}>
      {title && (
        <div className="col-span-full @4xl:col-span-4">
          <h4 className="text-medium text-violet-800 font-bold ">{title}</h4>
          {description && <p className="mt-2 text-violet-800 text-xs">{description}</p>}
        </div>
      )}
      {children && (
        <div
          className={cn(
            'col-span-full grid gap-4 @2xl:grid-cols-2 @4xl:col-span-12 @4xl:gap-5 xl:gap-7',
            childrenclass,
          )}>
          {children}
        </div>
      )}
    </div>
  );
}
