'use client';
import { Text } from 'rizzui';
import { Badge } from 'rizzui';
import { HeaderCell } from 'common/table';
import DateCell from 'common/date-cell';
import { UpdateDrawer } from 'common/table & form/update-drawer';
import PendingForm from './pendingremarks-form';

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
    render: (_: string, row: Location, index: number) => <span>{index + 1}</span>,
  },
  {
    title: <HeaderCell title="Customer Name" />,
    dataIndex: 'CustomerName',
    key: 'CustomerName',
    width: 130,
    render: (value: string, row: any) => (
      <div className="flex items-center">
        <p>{value}</p>
        <UpdateDrawer title="Update Pending Remarks" customSize="540px">
          <PendingForm data={row} />
        </UpdateDrawer>
      </div>
    ),
  },
  {
    title: <HeaderCell title="CustomerId" />,
    dataIndex: 'CustomerId',
    key: 'CustomerId',
    width: 200,
    render: (value: string) => value,
  },
  {
    title: (
      <HeaderCell
        title="Due Date"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'DueDate'}
        descending={sortConfig?.direction === 'desc' && sortConfig?.key === 'DueDate'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('DueDate'),
    dataIndex: 'DueDate',
    key: 'DueDate',
    width: 250,
    render: (value: Date) => (value ? <DateCell date={value} time={false} /> : '----'),
  },
  {
    title: <HeaderCell title="Due Amount" width={200} />,
    dataIndex: 'EmiAmount',
    key: 'EmiAmount',
    width: 200,
    render: (value: Number) => '₹ ' + value,
  },
  {
    title: <HeaderCell title="Pending Due" />,
    dataIndex: 'P.Due',
    key: 'P.Due',
    width: 150,
    render: (value: Number) => value,
  },
  {
    title: <HeaderCell title="Due.No" />,
    dataIndex: 'CurrentDue',
    key: 'CurrentDue',
    width: 250,
    render: (value: Number) => value,
  },
  {
    title: <HeaderCell title="Tenure" />,
    dataIndex: 'Tenure',
    key: 'Tenure',
    width: 150,
    render: (value: Number) => value,
  },

  {
    title: <HeaderCell title="LoanType" />,
    dataIndex: 'LoanType',
    key: 'LoanType',
    width: 200,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Register No" />,
    dataIndex: 'RegNumber',
    key: 'RegNumber',
    width: 200,
    render: (value: string) => value ?? '---',
  },
  {
    title: <HeaderCell title="VehicleName" />,
    dataIndex: 'VehicleName',
    key: 'VehicleName',
    width: 200,
    render: (value: string) => value ?? '----',
  },
  // {
  //   title: <HeaderCell title="Contact" />,
  //   dataIndex: 'Contact',
  //   key: 'Contact',
  //   width: 300,
  //   render: (value: string, row: any) =>
  //     row.Contact2 ? row.Contact1 + ','+ row.Contact2 : row.Contact1,
  // },
  {
    title: <HeaderCell title="Contact" />,
    dataIndex: 'Contact',
    key: 'Contact',
    width: 300,
    render: (value: string, row: any) =>
      row.Contact2 ? (
        <>
          {row.Contact1}
          <br />
          {row.Contact2}
        </>
      ) : (
        row.Contact1
      ),
  },
  {
    title: <HeaderCell title="Remarks" />,
    dataIndex: 'Remarks',
    key: 'Remarks',
    width: 200,
    render: (value: string) => value ?? '---',
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
    width: 200,
    render: (value: Date) => (value ? <DateCell date={value} /> : '----'),
  },
];
