'use client';
import { Text } from 'rizzui';
import { Badge } from 'rizzui';
import { HeaderCell } from 'common/table';
import AvatarCard from 'common/avatar-card';
import DateCell from 'common/date-cell';
import { UpdateDrawer } from 'common/table & form/update-drawer';
import UserForm from './user-form';

export type User = {
  Id: string;
  UserId: string;
  DisplayName: string;
  SubscriberId: string;
  Email: string;
  MobileNo: string;
  Address1: string;
  Address2: string;
  LandLineNo: String;
  IsActive: boolean;
  CreatedBy: string;
  CreatedOn: Date;
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
    render: (_: string, row: User, index: number) => <span>{index + 1}</span>,
  },
  {
    title: <HeaderCell title="DisplayName" />,
    dataIndex: 'DisplayName',
    key: 'DisplayName',
    width: 200,
    hidden: 'DisplayName',

    render: (_: string, row: User) => (
      <div className="flex items-center">
        <AvatarCard src={''} name={row.DisplayName} description={row.Id} path="users" />
        <UpdateDrawer title="Update User">
          <UserForm isEdit={true} data={row} />
        </UpdateDrawer>
      </div>
    ),
  },
  {
    title: <HeaderCell title="UserId" />,
    dataIndex: 'UserId',
    key: 'UserId',
    width: 200,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Email" />,
    dataIndex: 'Email',
    key: 'Email',
    width: 200,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="MobileNo" />,
    dataIndex: 'MobileNo',
    key: 'MobileNo',
    width: 200,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Address" />,
    dataIndex: 'Address1',
    key: 'Address1',
    width: 200,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="CreatedBy" />,
    dataIndex: 'CreatedBy',
    key: 'CreatedBy',
    width: 150,
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
    title: <HeaderCell title="IsActive" />,
    dataIndex: 'IsActive',
    key: 'IsActive',
    width: 80,
    render: (value: boolean) => getStatusBadge(value),
  },
];
