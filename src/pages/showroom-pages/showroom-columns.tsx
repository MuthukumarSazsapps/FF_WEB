'use client';
import { Text } from 'rizzui';
import { Badge } from 'rizzui';
import { HeaderCell } from 'common/table';
import DateCell from 'common/date-cell';
import { UpdateDrawer } from 'common/table & form/update-drawer';
import ShowRoomForm from './showroom-form';

export type ShowRoom = {
  Id: string;
  ShowRoomId: string;
  BranchId: string;
  ShowRoomName: string;
  ShowRoomPhoneNumber: string;
  CityId: string;
  CreatedOn: Date;
  CreatedBy: string;
  IsActive: boolean;
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
    width: 50,
    render: (_: string, row: ShowRoom, index: number) => <span>{index + 1}</span>,
  },
  {
    title: <HeaderCell title="ShowRoomName" />,
    dataIndex: 'ShowRoomName',
    key: 'ShowRoomName',
    width: 200,
    hidden: 'ShowRoomName',

    render: (_: string, row: ShowRoom) => (
      <div className="flex items-center">
        <>{row.ShowRoomName} </>
        <UpdateDrawer title="Update ShowRoom" customSize="540px">
          <ShowRoomForm isEdit={true} data={row} />
        </UpdateDrawer>
      </div>
    ),
  },
  {
    title: <HeaderCell title="ShowRoomId" />,
    dataIndex: 'ShowRoomId',
    key: 'ShowRoomId',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Phone No" />,
    dataIndex: 'ShowRoomPhoneNumber',
    key: 'ShowRoomPhoneNumber',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="City" />,
    dataIndex: 'CityName',
    key: 'CityName',
    width: 120,
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
    title: <HeaderCell title="CreatedBy" />,
    dataIndex: 'CreatedBy',
    key: 'CreatedBy',
    width: 200,
    render: (value: string) => value.toLowerCase(),
  },
  {
    title: <HeaderCell title="IsActive" />,
    dataIndex: 'IsActive',
    key: 'IsActive',
    width: 80,
    render: (value: boolean) => getStatusBadge(value),
  },
];
