'use client';
import { Text } from 'rizzui';
import { Badge } from 'rizzui';
import { HeaderCell } from 'common/table';
import DateCell from 'common/date-cell';
import { UpdateDrawer } from 'common/table & form/update-drawer';
import DocsUpdateForm from './doc-report-form';

export type Loan = {
  Id: string;
  LoanId: string;
  BranchId: string;
  CreatedOn: Date;
  CreatedBy: string;
  IsActive: boolean;
};

function getStatusBadge(value: boolean) {
  switch (value) {
    case false:
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">Not Received</Text>
        </div>
      );
    case true:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">Received</Text>
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
        <UpdateDrawer customSize="540px" title="Update Loan">
          <DocsUpdateForm data={row} isEdit={true} />
        </UpdateDrawer>
      </div>
    ),
  },
  {
    title: <HeaderCell title="Contact" />,
    dataIndex: 'CustomerPhoneNo',
    key: 'CustomerPhoneNo',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="VehicleName" />,
    dataIndex: 'VehicleName',
    key: 'VehicleName',
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
        title="Loan EndDate"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'LoanEndDate'}
        descending={sortConfig?.direction === 'desc' && sortConfig?.key === 'LoanEndDate'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('LoanEndDate'),

    dataIndex: 'LoanEndDate',
    key: 'LoanEndDate',
    width: 100,
    render: (value: Date) => <DateCell date={value} time={false} />,
  },
  {
    title: <HeaderCell title="OriginalRC" />,
    dataIndex: 'OriginalRC',
    key: 'OriginalRC',
    width: 120,
    render: (value: boolean) => getStatusBadge(value),
  },
  {
    title: <HeaderCell title="DuplicateKey" />,
    dataIndex: 'DuplicateKey',
    key: 'DuplicateKey',
    width: 120,
    render: (value: boolean) => getStatusBadge(value),
  },
  {
    title: <HeaderCell title="Insurance" />,
    dataIndex: 'Insurance',
    key: 'Insurance',
    width: 120,
    render: (value: boolean) => getStatusBadge(value),
  },
  {
    title: <HeaderCell title="ModifiedBy" />,
    dataIndex: 'ModifiedBy',
    key: 'ModifiedBy',
    width: 160,
    render: (value: string) => value,
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
    render: (value: Date) => <DateCell date={value} />,
  },
];
