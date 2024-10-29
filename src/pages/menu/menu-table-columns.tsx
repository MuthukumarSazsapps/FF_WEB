'use client';
import { Text } from 'rizzui';
import { Badge } from 'rizzui';
import { HeaderCell } from 'common/table';
import DateCell from 'common/date-cell';
import { UpdateDrawer } from 'common/table & form/update-drawer';
import MenuForm from './menu-form';

export type Menu = {
  Menuid: string;
  MenuOrder: string;
  Icon: string;
  MenuName: string;
  IsActive: boolean;
  CreatedBy: string;
  ModifiedBy: string;
  CreatedOn: Date;
  ModifiedOn: Date;
};

function getStatusBadge(IsActive: boolean) {
  switch (IsActive) {
    case false:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">inactive</Text>
        </div>
      );
    case true:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">active</Text>
        </div>
      );
  }
}

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
    width: 20,
    render: (_: string, row: Menu, index: number) => <span>{index + 1}</span>,
  },
  {
    title: <HeaderCell title="Menu Name" />,
    dataIndex: 'MenuName',
    key: 'MenuName',
    width: 100,
    hidden: 'MenuName',

    render: (_: string, row: any) => (
      <div className="flex items-center">
        <>{row.MenuName}</>
        <UpdateDrawer title="Update Menu" customSize="540px">
          <MenuForm data={row} />
        </UpdateDrawer>
      </div>
    ),
  },
  {
    title: <HeaderCell title="MenuId" />,
    dataIndex: 'MenuId',
    key: 'MenuId',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Order" />,
    dataIndex: 'MenuOrder',
    key: 'MenuOrder',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="CreatedBy" />,
    dataIndex: 'CreatedBy',
    key: 'CreatedBy',
    width: 100,
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
    width: 150,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="ModifiedBy" />,
    dataIndex: 'ModifiedBy',
    key: 'ModifiedBy',
    width: 150,
    render: (value: string) => (value ? value : '----'),
  },
  {
    title: (
      <HeaderCell
        title="Modified Date"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'ModifiedOn'}
        descending={sortConfig?.direction === 'desc' && sortConfig?.key === 'ModifiedOn'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('ModifiedOn'),
    dataIndex: 'ModifiedOn',
    key: 'ModifiedOn',
    width: 150,
    render: (value: Date) => (value ? <DateCell date={value} /> : '----'),
  },
  {
    title: <HeaderCell title="IsActive" />,
    dataIndex: 'IsActive',
    key: 'IsActive',
    width: 80,
    render: (value: boolean) => getStatusBadge(value),
  },
];
