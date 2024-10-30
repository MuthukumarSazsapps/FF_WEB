'use client';
import { Text } from 'rizzui';
import { Badge } from 'rizzui';
import { HeaderCell } from 'common/table';
import DateCell from 'common/date-cell';
import AgentForm from './agent-form';
import { UpdateDrawer } from 'common/table & form/update-drawer';

export type Agent = {
  Id: string;
  AgentId: string;
  BranchId: string;
  AgentName: string;
  AgentPhoneNumber: string;
  CityId: string;
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
    width: 50,
    render: (_: string, row: Agent, index: number) => <span>{index + 1}</span>,
  },
  {
    title: <HeaderCell title="AgentName" />,
    dataIndex: 'AgentName',
    key: 'AgentName',
    width: 200,
    hidden: 'AgentName',
    render: (_: string, row: Agent) => (
      <div className="flex items-center">
        <>{row.AgentName} </>
        <UpdateDrawer title="Update Agent" customSize="540px">
          <AgentForm isEdit={true} data={row} />
        </UpdateDrawer>
      </div>
    ),
  },
  {
    title: <HeaderCell title="AgentId" />,
    dataIndex: 'AgentId',
    key: 'AgentId',
    width: 130,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="PhoneNo" />,
    dataIndex: 'AgentPhoneNumber',
    key: 'AgentPhoneNumber',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="City" />,
    dataIndex: 'CityName',
    key: 'CityName',
    width: 120,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="CreatedBy" />,
    dataIndex: 'CreatedBy',
    key: 'CreatedBy',
    width: 200,
    render: (value: string) => value.toLowerCase(),
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
