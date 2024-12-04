'use client';
import { Text } from 'rizzui';
import { Badge } from 'rizzui';
import { HeaderCell } from 'common/table';
import DateCell from 'common/date-cell';
import { UpdateDrawer } from 'common/table & form/update-drawer';
import LedgerGroupForm from './ledgerGroup-form';
import LedgerForm from './ledger-form';
export type City = {
  CityId: string;
  StateName: string;
  CityName: string;
  StateId: string;
  IsActive: boolean;
  CreatedBy: Date;
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
    render: (_: string, row: City, index: number) => <span>{index + 1}</span>,
  },
  {
    title: (
      <HeaderCell
        title="Issue Date"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'IssueDate'}
        descending={sortConfig?.direction === 'desc' && sortConfig?.key === 'IssueDate'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('IssueDate'),
    dataIndex: 'IssueDate',
    key: 'IssueDate',
    width: 100,
    render: (value: Date) => <DateCell date={value} time={false} />,
  },
  {
    title: <HeaderCell title="Amount" />,
    dataIndex: 'Amount',
    key: 'Amount',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Receipt To" />,
    dataIndex: 'LoanId',
    key: 'LoanId',
    width: 130,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="from" />,
    dataIndex: 'from',
    key: 'from',
    width: 150,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="To" />,
    dataIndex: 'To',
    key: 'To',
    width: 150,
    render: (value: string, row: any) => value,
  },
  {
    title: <HeaderCell title="particulars" />,
    dataIndex: 'particulars',
    key: 'particulars',
    width: 160,
    render: (value: string) => value,
  },
];
