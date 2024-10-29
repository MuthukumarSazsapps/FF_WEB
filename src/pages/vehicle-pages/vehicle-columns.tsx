'use client';
import { Text } from 'rizzui';
import { Badge } from 'rizzui';
import { HeaderCell } from 'common/table';
import DateCell from 'common/date-cell';
import { UpdateDrawer } from 'common/table & form/update-drawer';
import VehicleForm from './vehicle-form';

export type Vehicle = {
  Id: string;
  VehicleType: string;
  VehicleName: string;
  BranchId: string;
  Variant: string;
  Brand: string;
  IsActive: string;
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
    render: (_: string, row: Vehicle, index: number) => <span>{index + 1}</span>,
  },
  {
    title: <HeaderCell title="VehicleName" />,
    dataIndex: 'VehicleName',
    key: 'VehicleName',
    width: 140,
    hidden: 'VehicleName',

    render: (_: string, row: Vehicle) => (
      <div className="flex items-center">
        <>{row.VehicleName}</>
        <UpdateDrawer title="Update Vehicle" customSize="540px">
          <VehicleForm isEdit={true} data={row} />
        </UpdateDrawer>
      </div>
    ),
  },
  {
    title: <HeaderCell title="VehicleTypeId" />,
    dataIndex: 'VehicleTypeId',
    key: 'VehicleTypeId',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Brand" />,
    dataIndex: 'Brand',
    key: 'Brand',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Variant" />,
    dataIndex: 'Variant',
    key: 'Variant',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Wheel Base" />,
    dataIndex: 'WheelBase',
    key: 'WheelBase',
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
