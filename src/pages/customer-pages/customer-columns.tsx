'use client';
import { Text } from 'rizzui';
import { Badge } from 'rizzui';
import { HeaderCell } from 'common/table';
import AvatarCard from 'common/avatar-card';
import DateCell from 'common/date-cell';
import CustomerForm from './customer-form';
import { UpdateDrawer } from 'common/table & form/update-drawer';
import { Customer } from 'utils/types';

function getStatusBadge(IsActive: boolean) {
  switch (IsActive) {
    case true:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">YES</Text>
        </div>
      );
    case false:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">NO</Text>
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
  onChecked?: (Id: string) => void;
};

export const getColumns = ({ sortConfig, onHeaderCellClick, data }: Columns) => [
  {
    title: <HeaderCell title="No" />,
    dataIndex: 'Id',
    key: 'Id',
    width: 50,
    render: (_: string, row: Customer, index: number) => <span>{index + 1}</span>,
  },
  {
    title: <HeaderCell title="CustomerName" />,
    dataIndex: 'CustomerName',
    key: 'CustomerName',
    width: 180,
    hidden: 'CustomerName',

    render: (_: string, row: Customer) => (
      <div className="flex items-center">
        <AvatarCard
          src={row.CustomerPhotoURL}
          name={row.CustomerName}
          path="customer"
          description={row.Id}
        />
        <UpdateDrawer title="Update Customer">
          <CustomerForm isEdit={true} data={row} />
        </UpdateDrawer>
      </div>
    ),
  },
  {
    title: <HeaderCell title="CustomerId" />,
    dataIndex: 'CustomerId',
    key: 'CustomerId',
    width: 120,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Branch" />,
    dataIndex: 'BranchName',
    key: 'BranchName',
    width: 140,
    render: (value: string) => value,
  },

  {
    title: <HeaderCell title="CustomerCityName" />,
    dataIndex: 'CustomerCityName',
    key: 'CustomerCityName',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="CustomerAADHAAR" />,
    dataIndex: 'CustomerAADHAAR',
    key: 'CustomerAADHAAR',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="CustomerPhoneNo" />,
    dataIndex: 'CustomerPhoneNo',
    key: 'CustomerPhoneNo',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="CustomerPAN" />,
    dataIndex: 'CustomerPAN',
    key: 'CustomerPAN',
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
    title: <HeaderCell title="CreatedBy" />,
    dataIndex: 'CreatedBy',
    key: 'CreatedBy',
    width: 200,
    render: (value: string) => value.toLowerCase(),
  },
  {
    title: <HeaderCell title="Blocked?" />,
    dataIndex: 'CustomerIsBlocked',
    key: 'CustomerIsBlocked',
    width: 80,
    render: (value: boolean) => getStatusBadge(value),
  },
];
