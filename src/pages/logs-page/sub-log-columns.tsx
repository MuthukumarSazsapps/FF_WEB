'use client';
import { Text, Tooltip } from 'rizzui';
import { Badge } from 'rizzui';
import { HeaderCell } from 'common/table';
import DateCell from 'common/date-cell';
import { UpdateDrawer } from 'common/table & form/update-drawer';

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

export const getColumns = ({ sortConfig, onHeaderCellClick, data }: Columns) => [
  {
    title: <HeaderCell title="No" />,
    dataIndex: 'Id',
    key: 'id',
    width: 50,
    render: (_: string, row: any, index: number) => <span>{index + 1}</span>,
  },
  {
    title: <HeaderCell title="LogId" />,
    dataIndex: 'LogId',
    key: 'LogId',
    width: 150,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="UserName" />,
    dataIndex: 'UserName',
    key: 'UserName',
    width: 170,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="DisplayName" />,
    dataIndex: 'DisplayName',
    key: 'DisplayName',
    width: 170,
    render: (value: string) => value,
  },
  {
    title: (
      <HeaderCell
        title="Created Date"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'CreatedOn'}
        descending={sortConfig?.direction === 'desc' && sortConfig?.key === 'CreatedOn'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('CreatedOn'),
    dataIndex: 'CreatedOn',
    key: 'CreatedOn',
    width: 170,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="Event" />,
    dataIndex: 'Event',
    key: 'Event',
    width: 120,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="ApiCall" />,
    dataIndex: 'ApiCall',
    key: 'ApiCall',
    width: 150,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Result" />,
    dataIndex: 'Result',
    key: 'Result',
    width: 250,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Role" />,
    dataIndex: 'Role',
    key: 'Role',
    width: 100,
    render: (value: boolean) => (value === true ? 'Subscriber' : value === false ? 'User' : ''),
  },
];
