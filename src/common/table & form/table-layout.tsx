'use client';

import PageHeader, { PageHeaderTypes } from 'common/table & form/page-header';

type TableLayoutProps = { children?: React.ReactNode } & PageHeaderTypes;

export default function TableLayout({
  children,
  ...props
}: React.PropsWithChildren<TableLayoutProps>) {
  return (
    <PageHeader {...props}>
      <div className="mt-4 flex items-center gap-3 @lg:mt-0">{children}</div>
    </PageHeader>
  );
}
