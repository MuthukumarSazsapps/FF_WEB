import React, { useState } from 'react';
import { ToggleColumns } from 'common/table';
import { PiMagnifyingGlassBold, PiFunnel } from 'react-icons/pi';
import { Input } from 'rizzui';
import { cn } from 'utils';
import ExportButton from './export-button';
import ImportButton from './import-button';
import Button from 'common/button';
import FilterDrawerView from 'common/filterDrawerView';

export type TableFilterProps = {
  data: any[];
  tableData?: any[];
  header: string;
  fileName: string;
  searchTerm: string;
  filters?: any;
  onSearchClear: () => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  columns: { [key: string]: any }[];
  checkedColumns: string[];
  setCheckedColumns: React.Dispatch<React.SetStateAction<string[]>>;
  hideIndex?: number;
  children?: React.ReactNode;
  drawerTitle?: string;
  hasSearched?: boolean;
  showSearchOnTheRight?: boolean;
  enableDrawerFilter?: boolean;
  menu?: React.ReactNode;
};

export default function TableFilter({
  data,
  tableData,
  header,
  fileName,
  filters,
  searchTerm,
  onSearchClear,
  onSearchChange,
  columns,
  checkedColumns,
  setCheckedColumns,
  hideIndex,
  drawerTitle = 'Table Filters',
  hasSearched,
  enableDrawerFilter = false,
  showSearchOnTheRight = false,
  menu,
  children,
}: TableFilterProps) {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <div className="table-filter mb-4 flex items-center justify-between">
      <div className="flex flex-wrap items-center gap-4">
        {!showSearchOnTheRight ? (
          <Input
            type="search"
            placeholder="Search by anything..."
            value={searchTerm}
            onClear={onSearchClear}
            onChange={onSearchChange}
            inputClassName="h-9"
            clearable={true}
            prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          />
        ) : null}

        {showSearchOnTheRight && enableDrawerFilter ? <>{menu ? menu : null}</> : null}

        {children && (
          <>
            <FilterDrawerView
              isOpen={openDrawer}
              setOpenDrawer={setOpenDrawer}
              drawerTitle={drawerTitle}
              hasSearched={hasSearched}>
              {children}
            </FilterDrawerView>
          </>
        )}
      </div>

      <div className="ms-4 flex flex-shrink-0 items-center">
        {showSearchOnTheRight ? (
          <Input
            type="search"
            placeholder="Search by anything..."
            value={searchTerm}
            onClear={onSearchClear}
            onChange={onSearchChange}
            inputClassName="h-9"
            clearable={true}
            prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
            className="me-2.5"
          />
        ) : null}
        <ExportButton
          data={tableData?.length ? tableData : data}
          fileName={fileName}
          header={header}
          filters={filters}
        />
        <ImportButton title={'Import File'} />
        {children ? (
          <Button
            color="DEFAULT"
            label={<PiFunnel className="m-1 h-[18px] w-[18px]" strokeWidth={1.7} />}
            variant={'outline'}
            onClick={() => {
              setOpenDrawer(() => !openDrawer);
            }}
            className={cn('me-2.5 h-9 pe-3 ps-2.5')}
          />
        ) : null}

        <ToggleColumns
          columns={columns}
          checkedColumns={checkedColumns}
          setCheckedColumns={setCheckedColumns}
          hideIndex={hideIndex}
        />
      </div>
    </div>
  );
}
