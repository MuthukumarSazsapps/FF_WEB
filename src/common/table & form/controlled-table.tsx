import React, { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import Table, { type TableProps } from 'common/table';
import { Title } from 'rizzui';
import Spinner from 'common/spinner';
import type { TableFilterProps } from 'common/table & form/table-filter';
import type { TablePaginationProps } from 'common/table & form/table-pagination';
import { cn } from 'utils';
import TableFilter from 'common/table & form/table-filter';
import TablePagination from 'common/table & form/table-pagination';
import { usePresets } from 'config/color-presets';
import { useDirection } from 'hooks/use-direction';
import { useApplyColorPreset, useColorPresets } from 'hooks/use-theme-color';

type ControlledTableProps = {
  isLoading?: boolean;
  showLoadingText?: boolean;
  filterElement?: React.ReactElement;
  filterOptions?: TableFilterProps;
  paginatorOptions?: TablePaginationProps;
  tableFooter?: React.ReactNode;
  className?: string;
  headerTitle?: string;
  paginatorClassName?: string;
  scrollx?: number;
  styleRow?: boolean;
} & TableProps;

export default function ControlledTable({
  isLoading,
  filterElement,
  filterOptions,
  paginatorOptions,
  tableFooter,
  showLoadingText,
  paginatorClassName,
  className,
  headerTitle,
  scrollx = 1800,
  styleRow = false,
  ...tableProps
}: ControlledTableProps) {
  const COLOR_PRESETS = usePresets();
  const { direction } = useDirection();
  const { colorPresets } = useColorPresets();
  useApplyColorPreset<any>(colorPresets ?? COLOR_PRESETS[0].colors);

  useEffect(() => {
    document.documentElement.dir = direction ?? 'ltr';
  }, [direction]);
  const getRowClassName = (record: any) => {
    if (new Date(record.EmiDate) < new Date() && record.PaidIndicator != 'P') {
      return 'bg-red-100';
    }
    if (record.PaidIndicator === 'PNP') {
      return 'bg-orange-100';
    } else if (record.PaidIndicator === 'P') {
      return 'bg-green-100';
    }
    return '';
  };

  if (isLoading) {
    return (
      <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
        <Spinner size="xl" />
        {showLoadingText ? (
          <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
            Loading...
          </Title>
        ) : null}
      </div>
    );
  }

  return (
    <>
      {!isEmpty(filterOptions) && <TableFilter {...filterOptions}>{filterElement}</TableFilter>}

      <div className="relative">
        <Table
          {...(styleRow && {
            rowClassName: getRowClassName,
          })}
          scroll={{ x: scrollx }}
          rowKey={record => record.Id}
          className={cn(className)}
          {...tableProps}
        />

        {tableFooter ? tableFooter : null}
      </div>

      {!isEmpty(paginatorOptions) && (
        <TablePagination paginatorClassName={paginatorClassName} {...paginatorOptions} />
      )}
    </>
  );
}
