'use client';
import { Text } from 'rizzui';
import { Badge } from 'rizzui';
import { HeaderCell } from 'common/table';
import DateCell from 'common/date-cell';
import LoanForm from './loan-form';
import { UpdateDrawer } from 'common/table & form/update-drawer';

export type Loan = {
  Id: string;
  LoanId: string;
  BranchId: string;
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
    width: 20,
    render: (_: string, row: Location, index: number) => <span>{index + 1}</span>,
  },
  {
    title: <HeaderCell title="CustomerName" />,
    dataIndex: 'CustomerName',
    key: 'CustomerName',
    width: 100,
    render: (value: string, row: any) => (
      <div className="flex items-center">
        <p>{value}</p>
        <UpdateDrawer title="Update Loan">
          <LoanForm data={row} isEdit={true} />
        </UpdateDrawer>
      </div>
    ),
  },
  {
    title: <HeaderCell title="LoanId" />,
    dataIndex: 'LoanId',
    key: 'LoanId',
    width: 150,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Branch" />,
    dataIndex: 'BranchName',
    key: 'BranchName',
    width: 100,
    render: (value: string) => <p className="text-sm">{value}</p>,
  },
  {
    title: <HeaderCell title="ShowRoomName" />,
    dataIndex: 'ShowRoomName',
    key: 'ShowRoomName',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="LoanAmount" />,
    dataIndex: 'LoanAmount',
    key: 'LoanAmount',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="RegisterNumber" />,
    dataIndex: 'RegisterNumber',
    key: 'RegisterNumber',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Interest" />,
    dataIndex: 'Interest',
    key: 'Interest',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="LoanNo" />,
    dataIndex: 'LoanNo',
    key: 'LoanNo',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: (
      <HeaderCell
        title="Loan StartDate"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'LoanStartDate'}
        descending={sortConfig?.direction === 'desc' && sortConfig?.key === 'LoanStartDate'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('LoanStartDate'),

    dataIndex: 'LoanStartDate',
    key: 'LoanStartDate',
    width: 100,
    render: (value: Date) => <DateCell date={value} time={false} />,
  },
  {
    title: (
      <HeaderCell
        title="FCDate"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'FCDate'}
        descending={sortConfig?.direction === 'desc' && sortConfig?.key === 'FCDate'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('FCDate'),

    dataIndex: 'FCDate',
    key: 'FCDate',
    width: 100,
    render: (value: Date) => <DateCell date={value} time={false} />,
  },
  {
    title: (
      <HeaderCell
        title="PermitDate"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'PermitDate'}
        descending={sortConfig?.direction === 'desc' && sortConfig?.key === 'PermitDate'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('PermitDate'),
    dataIndex: 'PermitDate',
    key: 'PermitDate',
    width: 120,
    render: (value: Date) => <DateCell date={value} time={false} />,
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
