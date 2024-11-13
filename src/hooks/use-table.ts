import { useState, useEffect, useMemo } from 'react';
import isString from 'lodash/isString';

interface AnyObject {
  [key: string]: any;
}

export function useTable<T extends AnyObject>(
  initialData: T[],
  countPerPage: number = 10,
  initialFilterState?: Partial<Record<string, any>>,
) {
  const [data, setData] = useState(initialData);
  const [filterState, setFilterState] = useState(initialFilterState);

  /*
   * Dummy loading state.
   */
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  /*
   * Handle row selection
   */
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const handleRowSelect = (recordKey: string) => {
    const selectedKeys = [...selectedRowKeys];
    if (selectedKeys.includes(recordKey)) {
      setSelectedRowKeys(selectedKeys.filter(key => key !== recordKey));
    } else {
      setSelectedRowKeys([...selectedKeys, recordKey]);
    }
  };
  const handleSelectAll = () => {
    if (selectedRowKeys.length === data.length) {
      setSelectedRowKeys([]);
    } else {
      setSelectedRowKeys(data.map(record => record.id));
    }
  };

  /*
   * Handle sorting
   */
  const [sortConfig, setSortConfig] = useState<AnyObject>({
    key: null,
    direction: null,
  });

  function sortData(data: T[], sortKey: string, sortDirection: string) {
    return [...data].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      } else if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const sortedData = useMemo(() => {
    const newData = data;
    if (!sortConfig.key) {
      return newData;
    }
    return sortData(newData, sortConfig.key, sortConfig.direction);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortConfig, data]);

  function handleSort(key: string) {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  }

  /*
   * Handle pagination
   */
  const [currentPage, setCurrentPage] = useState(1);
  function paginatedData(data: T[] = sortedData) {
    const start = (currentPage - 1) * countPerPage;
    const end = start + countPerPage;

    if (data.length > start) return data.slice(start, end);
    return data;
  }

  function handlePaginate(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  /*
   * Handle delete
   */
  function handleDelete(id: string | string[]) {
    const updatedData = Array.isArray(id)
      ? data.filter(item => !id.includes(item.id))
      : data.filter(item => item.id !== id);

    setData(updatedData);
  }

  /*
   * Handle Filters and searching
   */
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, any>>(initialFilterState ?? {});

  function updateFilter(columnId: string, filterValue: string | any[]) {
    if (!Array.isArray(filterValue) && !isString(filterValue)) {
      throw new Error('filterValue data type should be string or array of any');
    }

    if (Array.isArray(filterValue) && filterValue.length !== 2) {
      throw new Error('filterValue data must be an array of length 2');
    }

    setFilters(prevFilters => ({
      ...prevFilters,
      [columnId]: filterValue,
    }));
  }
  //----------------------------------------------------------------
  // function applyFilters() {
  //   const searchTermLower = searchTerm.toLowerCase();
  //   console.log("sortedData",filters,Object.entries(filters),sortedData);

  //   return (
  //     sortedData
  //       .filter(item => {
  //         const isMatchingItem = Object.entries(filters).some(([columnId, filterValue]) => {
  //           // debugger
  //           console.log("columnId",columnId,filterValue,Array.isArray(filterValue) && typeof filterValue[1] === 'object');

  //           if (Array.isArray(filterValue) && typeof filterValue[1] === 'object') {
  //             console.log("col",item[columnId]);

  //             const itemValue = new Date(item[columnId]);
  //             return (
  //               // @ts-ignore
  //               itemValue >= filterValue[0] && itemValue <= filterValue[1]
  //             );
  //           }
  //           if (Array.isArray(filterValue) && typeof filterValue[1] === 'string') {
  //             const itemPrice = Math.ceil(Number(item[columnId]));
  //             return itemPrice >= Number(filterValue[0]) && itemPrice <= Number(filterValue[1]);
  //           }
  //           if (isString(filterValue) && !Array.isArray(filterValue)) {
  //             const itemValue = item[columnId]?.toString().toLowerCase();
  //             if (itemValue !== filterValue.toString().toLowerCase()) {
  //               return false;
  //             }
  //             return true;
  //           }
  //         });
  //         return isMatchingItem;
  //       })
  //       // global search after running filters
  //       .filter(item =>
  //         Object.values(item).some(value =>
  //           typeof value === 'object'
  //             ? value &&
  //               Object.values(value).some(
  //                 nestedItem =>
  //                   nestedItem && String(nestedItem).toLowerCase().includes(searchTermLower),
  //               )
  //             : value && String(value).toLowerCase().includes(searchTermLower),
  //         ),
  //       )
  //   );
  // }
  //----------------------------------------------------------------
  // function applyFilters() {
  //   const searchTermLower = searchTerm.toLowerCase();
  //   //console.log("sortedData", filters, Object.entries(filters), sortedData);

  //   return (
  //     sortedData
  //       .filter(item => {
  //         const isMatchingItem = Object.entries(filters).some(([columnId, filterValue]) => {
  //           //console.log("columnId", columnId, filterValue, Array.isArray(filterValue) && typeof filterValue[1] === 'object');

  //           // Date range filter
  //           if (Array.isArray(filterValue) && typeof filterValue[1] === 'object') {
  //             const itemValue = item[columnId] ? new Date(item[columnId]) : null;
  //             if (itemValue && filterValue[0] && filterValue[1]) {
  //               return itemValue >= filterValue[0] && itemValue <= filterValue[1];
  //             }
  //             return false;
  //           }

  //           // Price range filter
  //           if (Array.isArray(filterValue) && typeof filterValue[1] === 'string') {
  //             const itemPrice = Math.ceil(Number(item[columnId]));
  //             return Number.isFinite(itemPrice) &&
  //                    itemPrice >= Number(filterValue[0]) &&
  //                    itemPrice <= Number(filterValue[1]);
  //           }

  //           // String filter
  //           if (typeof filterValue === 'string') {
  //             const itemValue = item[columnId]?.toString().toLowerCase();
  //             return itemValue === filterValue.toLowerCase();
  //           }

  //           return false;
  //         });
  //         return isMatchingItem;
  //       })
  //       // Global search
  //       .filter(item =>
  //         Object.values(item).some(value =>
  //           typeof value === 'object'
  //             ? value &&
  //               Object.values(value).some(
  //                 nestedItem =>
  //                   nestedItem && String(nestedItem).toLowerCase().includes(searchTermLower),
  //               )
  //             : value && String(value).toLowerCase().includes(searchTermLower),
  //         ),
  //       )
  //   );
  // }

  function applyFilters() {
    const searchTermLower = searchTerm.toLowerCase();

    return (
      sortedData
        .filter(item => {
          const isMatchingItem = Object.entries(filters).some(([columnId, filterValue]) => {
            // Check if the filter value is a date range array
            if (
              Array.isArray(filterValue) &&
              filterValue[0] instanceof Date &&
              filterValue[1] instanceof Date
            ) {
              const itemDate = new Date(item[columnId]); // Convert item value to Date object
              const startDate = new Date(filterValue[0]);
              const endDate = new Date(filterValue[1]);
              endDate.setDate(endDate.getDate() + 1);
              // Log the dates for debugging

              // Check if item date falls within start and end date (inclusive)
              return itemDate >= startDate && itemDate <= endDate;
            }

            // If the filter value is a number range (e.g., price)
            if (Array.isArray(filterValue) && typeof filterValue[1] === 'string') {
              const itemPrice = Math.ceil(Number(item[columnId]));
              return itemPrice >= Number(filterValue[0]) && itemPrice <= Number(filterValue[1]);
            }

            // Check for string equality (case-insensitive) for text filters
            if (typeof filterValue === 'string' && !Array.isArray(filterValue)) {
              const itemValue = item[columnId]?.toString().toLowerCase();
              return itemValue === filterValue.toLowerCase();
            }
          });

          // Return whether this item matches any of the filter criteria
          return isMatchingItem;
        })
        // Apply global search term filter after individual filters
        .filter(item =>
          Object.values(item).some(value =>
            typeof value === 'object'
              ? value &&
                Object.values(value).some(
                  nestedItem =>
                    nestedItem && String(nestedItem).toLowerCase().includes(searchTermLower),
                )
              : value && String(value).toLowerCase().includes(searchTermLower),
          ),
        )
    );
  }

  /*
   * Handle searching
   */
  function handleSearch(searchValue: string) {
    setSearchTerm(searchValue);
  }

  function searchedData() {
    if (!searchTerm) return sortedData;

    const searchTermLower = searchTerm.toLowerCase();

    return sortedData.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'object'
          ? value &&
            Object.values(value).some(
              nestedItem =>
                nestedItem && String(nestedItem).toLowerCase().includes(searchTermLower),
            )
          : value && String(value).toLowerCase().includes(searchTermLower),
      ),
    );
  }

  /*
   * Reset search and filters
   */
  function handleReset() {
    setData(() => initialData);
    handleSearch('');
    if (initialFilterState) return setFilters(initialFilterState);
  }

  /*
   * Set isFiltered and final filtered data
   */
  // const isFiltered = applyFilters().length > 0;
  const isFiltered = filters != filterState;
  function calculateTotalItems() {
    if (isFiltered) {
      return applyFilters().length;
    }
    if (searchTerm) {
      return searchedData().length;
    }
    return sortedData.length;
  }
  const filteredAndSearchedData =
    filters !== filterState
      ? applyFilters()
      : searchTerm || (sortConfig.key !== null && sortConfig.direction !== null)
        ? searchedData()
        : initialData;
  // console.log("filteredAndSearchedData",filteredAndSearchedData);
  // console.log("filters",filters!==filterState);

  const tableData = paginatedData(filteredAndSearchedData);

  /*
   * Go to first page when data is filtered and searched
   */
  useEffect(() => {
    handlePaginate(1);
  }, [isFiltered, searchTerm]);

  // useTable returns
  return {
    isLoading,
    isFiltered,
    tableData,
    // pagination
    currentPage,
    handlePaginate,
    totalItems: calculateTotalItems(),
    // sorting
    sortConfig,
    handleSort,
    // row selection
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    // searching
    searchTerm,
    handleSearch,
    // filters
    filters,
    updateFilter,
    applyFilters,
    handleDelete,
    handleReset,
  };
}
