'use client';

import React, { useState } from 'react';
import { useTable } from 'hooks/use-table';
import { useColumn } from 'hooks/use-column';
import ControlledTable from 'common/table & form/controlled-table';
import FilterElement from './filter-element';

const filterState = {
  CreatedOn: [null, null],
  EndDate: [null, null],
  IsActive: '',
  CityId: '',
  CustomerCity: '',
  SubscriberCity: '',
};

export default function CommonTable({
  data = [],
  header,
  getColumns,
  onRowClick,
  scrollx = 1800,
  options,
  rowCount = 10,
  styleRow = false,
  fileName,
}: {
  data: any[];
  scrollx?: number;
  getColumns: any;
  onRowClick?: any;
  options: {};
  rowCount?: number;
  styleRow?: boolean;
  header: string;
  fileName: string;
}) {
  const [pageSize, setPageSize] = useState(rowCount);
  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });
  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
  } = useTable(data, pageSize, filterState);

  const columns = React.useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),

    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      handleRowSelect,
      handleSelectAll,
    ],
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } = useColumn(columns);

  const compareArrays = (checkedColumns: string[], data: any[]) => {
    return data.map(obj =>
      Object.keys(obj).reduce((acc: any, key) => {
        if (checkedColumns.includes(key)) {
          acc[key] = obj[key];
        }
        return acc;
      }, {}),
    );
  };

  const matchedValues = compareArrays(checkedColumns, data);
  return (
    <>
      <ControlledTable
        variant="modern"
        data={tableData}
        isLoading={isLoading}
        showLoadingText={true}
        // @ts-ignore
        columns={visibleColumns}
        onRowClick={onRowClick}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        styleRow={styleRow}
        scrollx={scrollx}
        filterOptions={{
          data:
            filters.CreatedOn[0] || filters.CreatedOn[1] || filters.IsActive
              ? tableData
              : matchedValues,
          header,
          fileName,
          filters: { filters },
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: event => {
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          columns,
          checkedColumns,
          setCheckedColumns,
        }}
        filterElement={
          <FilterElement
            options={options}
            isFiltered={isFiltered}
            filters={filters}
            updateFilter={updateFilter}
            handleReset={handleReset}
          />
        }
        className="overflow-hidden rounded-md border border-gray-200 text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"></ControlledTable>
    </>
  );
}
