'use client';
import { HeaderCell } from 'common/table';
import DateCell from 'common/date-cell';
import PencilIcon from 'components/icons/pencil';
import { UpdateDrawer } from 'common/table & form/update-drawer';
import DueEdit from './due-edit';

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
    title: <HeaderCell title="Edit" />,
    dataIndex: 'Id',
    key: 'id',
    width: 20,
    render: (_: string, row: any) =>
      row.PaidIndicator != 'NP' ? (
        <UpdateDrawer title="Due Edit" customSize="540px">
          <DueEdit data={row} />
        </UpdateDrawer>
      ) : (
        ''
      ),
  },
  {
    title: <HeaderCell title="Due" />,
    dataIndex: 'Installment',
    key: 'Installment',
    width: 20,
    render: (value: string) => (
      <div className="flex items-center">
        <p>{value}</p>
      </div>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Due Date"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'EmiDate'}
        descending={sortConfig?.direction === 'desc' && sortConfig?.key === 'EmiDate'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('EmiDate'),
    dataIndex: 'EmiDate',
    key: 'EmiDate',
    width: 120,
    render: (value: Date) => <DateCell date={value} time={false} />,
  },
  {
    title: <HeaderCell title="Emi" />,
    dataIndex: 'EmiAmount',
    key: 'EmiAmount',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="ReceiptNo" />,
    dataIndex: 'ReceiptNo',
    key: 'ReceiptNo',
    width: 100,
    render: (value: string) => value || 'NA',
  },
  {
    title: <HeaderCell title="ReceiptDate" />,
    dataIndex: 'ReceiptDate',
    key: 'ReceiptDate',
    width: 100,
    render: (value: Date) => <DateCell date={value} time={false} />,
  },
  {
    title: <HeaderCell title="Paid" />,
    dataIndex: 'PaidAmount',
    key: 'PaidAmount',
    width: 50,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Balance" />,
    dataIndex: 'BalanceAmount',
    key: 'BalanceAmount',
    width: 50,
    render: (value: string) => value || 'NA',
  },
  {
    title: <HeaderCell title="LD" />,
    dataIndex: 'LateDays',
    key: 'LateDays',
    width: 50,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="LF" />,
    dataIndex: 'LateFees',
    key: 'LateFees',
    width: 50,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Paid LF" />,
    dataIndex: 'PaidLateFees',
    key: 'PaidLateFees',
    width: 50,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Pay Method" />,
    dataIndex: 'PaymentMethod',
    key: 'PaymentMethod',
    width: 100,
    render: (value: string) => value || 'NA',
  },
  {
    title: <HeaderCell title="Remarks" />,
    dataIndex: 'Remarks',
    key: 'Remarks',
    width: 100,
    render: (value: string) => value || 'NA',
  },
];
