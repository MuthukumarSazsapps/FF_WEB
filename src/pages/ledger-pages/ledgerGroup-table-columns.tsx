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
    title: <HeaderCell title="LedgerId" />,
    dataIndex: 'LedgerId',
    key: 'LedgerId',
    width: 140,
    render: (value: string, row: any) => (
      <div className="flex items-center">
        {row.LedgerType === 'LedgerGroup' ? (
          <>
            <p>{row.LedgerGroupId}</p>
            <UpdateDrawer title="Update LedgerGroup" customSize="540px">
              <LedgerGroupForm data={row} />
            </UpdateDrawer>
          </>
        ) : (
          <>
            <p>{row.LedgerId}</p>
            <UpdateDrawer title="Update Ledger" customSize="540px">
              <LedgerForm data={row} />
            </UpdateDrawer>
          </>
        )}
      </div>
    ),
  },
  {
    title: <HeaderCell title="Type" />,
    dataIndex: 'LedgerType',
    key: 'LedgerType',
    width: 130,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'LedgerName',
    key: 'LedgerName',
    width: 150,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Balance" />,
    dataIndex: 'BalanceAmount',
    key: 'BalanceAmount',
    width: 150,
    render: (value: string, row: any) => (row.LedgerType != 'LedgerGroup' ? value : 'NA'),
  },
  {
    title: <HeaderCell title="Created By" />,
    dataIndex: 'CreatedBy',
    key: 'CreatedBy',
    width: 160,
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
    width: 160,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="ModifiedBy" />,
    dataIndex: 'ModifiedBy',
    key: 'ModifiedBy',
    width: 150,
    render: (value: string) => (value ? value : '----'),
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
    render: (value: Date) => (value ? <DateCell date={value} /> : '----'),
  },
  {
    title: <HeaderCell title="IsActive" />,
    dataIndex: 'IsActive',
    key: 'IsActive',
    width: 80,
    render: (value: boolean) => getStatusBadge(value),
  },
];