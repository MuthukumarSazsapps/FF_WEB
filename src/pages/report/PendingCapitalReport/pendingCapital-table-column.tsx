'use client';
import { Text } from 'rizzui';
import { Badge } from 'rizzui';
import { HeaderCell } from 'common/table';
import DateCell from 'common/date-cell';

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
    title: <HeaderCell title="CustomerId" />,
    dataIndex: 'CustomerId',
    key: 'CustomerId',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Customer Name" />,
    dataIndex: 'CustomerName',
    key: 'CustomerName',
    width: 100,
    render: (value: string, row: any) => value,
  },

  {
    title: <HeaderCell title="Loan Id" />,
    dataIndex: 'LoanId',
    key: 'LoanId',
    width: 100,
    render: (value: Number) => value,
  },
  {
    title: <HeaderCell title="Loan No" />,
    dataIndex: 'LoanNo',
    width: 100,
    render: (value: Number) => value,
  },
  {
    title: <HeaderCell title="Pending Capital Amount" />,
    dataIndex: 'PendingCapital',
    key: 'PendingCapital',
    width: 100,
    render: (value: number) => <span className="font-bold">₹ {value}</span>,
  },
];
