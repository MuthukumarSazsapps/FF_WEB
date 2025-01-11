'use client';
import { HeaderCell } from 'common/table';
import DateCell from 'common/date-cell';
import PencilIcon from 'components/icons/pencil';
import { UpdateDrawer } from 'common/table & form/update-drawer';

export type Loan = {
  Id: string;
  LoanId: string;
  BranchId: string;
  CreatedOn: Date;
  CreatedBy: string;
  IsActive: boolean;
};

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
    render: (_: string, row: any, index: number) => <span>{index + 1}</span>,
  },
  {
    title: (
      <HeaderCell
        title="ReceiptDate"
        sortable
        className="text-xs"
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
    title: <HeaderCell title="ReceiptNo" />,
    dataIndex: 'TransRefNo',
    key: 'TransRefNo',
    width: 80,
    render: (value: string) => value || 'NA',
  },
  {
    title: <HeaderCell title="Type" />,
    dataIndex: 'Type',
    key: 'Type',
    width: 80,
    render: (value: string) => value || 'NA',
  },
  {
    title: <HeaderCell title="LoanId" />,
    dataIndex: 'LoanId',
    key: 'LoanId',
    width: 120,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Customer" />,
    dataIndex: 'CustomerName',
    key: 'CustomerName',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Ledger" />,
    dataIndex: 'Ledger',
    key: 'Ledger',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Debit" />,
    dataIndex: 'Debit',
    key: 'Debit',
    width: 50,
    render: (value: string) => (value ? `₹ ${value}` : ''),
  },
  {
    title: <HeaderCell title="Credit" />,
    dataIndex: 'Credit',
    key: 'Credit',
    width: 50,
    render: (value: string) => (value ? `₹ ${value}` : ''),
  },
  {
    title: <HeaderCell title="Capital" />,
    dataIndex: 'Capital',
    key: 'Capital',
    width: 50,
    render: (value: string) => (value ? `₹ ${value}` : ''),
  },
  {
    title: <HeaderCell title="Interest" />,
    dataIndex: 'Interest',
    key: 'Interest',
    width: 50,
    render: (value: string) => (value ? `₹ ${value}` : ''),
  },
  {
    title: (
      <HeaderCell
        title="EMI Date"
        sortable
        className="text-xs"
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'emidate'}
        descending={sortConfig?.direction === 'desc' && sortConfig?.key === 'emidate'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('emidate'),
    dataIndex: 'emidate',
    key: 'emidate',
    width: 100,
    render: (value: Date) =>
      value ? <DateCell date={value} time={false} dateFormat="DD/MM" /> : 'N/A',
  },
  {
    title: <HeaderCell title="Particulars" />,
    dataIndex: 'Particulars',
    key: 'Particulars',
    width: 100,
    render: (value: string) => value || 'NA',
  },
  {
    title: <HeaderCell title="Re.Due" />,
    dataIndex: 'RemainingDue',
    key: 'RemainingDue',
    width: 50,
    render: (value: string, row: any) => row.PaidDue + '/' + row.Tenure,
  },
  {
    title: <HeaderCell title="Remarks" />,
    dataIndex: 'Remarks',
    key: 'Remarks',
    width: 150,
    render: (value: string) => value || 'NA',
  },
];
