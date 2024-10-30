'use client';
import { Text, Tooltip } from 'rizzui';
import { Badge } from 'rizzui';
import { HeaderCell } from 'common/table';
import AvatarCard from 'common/avatar-card';
import DateCell from 'common/date-cell';
import { UpdateDrawer } from 'common/table & form/update-drawer';
import SubscriberForm from './subscriber-form';

export type Subscriber = {
  Id: string;
  Logo: string;
  SubscriberName: string;
  CompanyName: string;
  NoOfBranches: string;
  Email: string;
  GstNo: string;
  CityId: string;
  IsActive: boolean;
  PointOfContact: string;
  CreatedOn: Date;
  StartDate: Date;
  EndDate: Date;
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
    render: (_: string, row: Subscriber, index: number) => <span>{index + 1}</span>,
  },
  {
    title: <HeaderCell title="SubscriberName" />,
    dataIndex: 'SubscriberName',
    key: 'SubscriberName',
    width: 230,
    hidden: 'SubscriberName',

    render: (_: string, row: Subscriber) => (
      <div className="flex items-center">
        <AvatarCard src={row.Logo} name={row.SubscriberName} description={row.Id} />
        <UpdateDrawer title="Update Subscriber">
          <SubscriberForm isEdit={true} data={row} />
        </UpdateDrawer>
      </div>
    ),
  },
  {
    title: <HeaderCell title="SubscriberId" />,
    dataIndex: 'SubscriberId',
    key: 'SubscriberId',
    width: 100,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="SubscriberCode" />,
    dataIndex: 'SubscriberCode',
    key: 'SubscriberCode',
    width: 150,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="CompanyName" />,
    dataIndex: 'CompanyName',
    key: 'CompanyName',
    width: 200,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="UserName" />,
    dataIndex: 'UserName',
    key: 'UserName',
    width: 200,
    render: (value: string) => value.toLowerCase(),
  },

  {
    title: <HeaderCell title="NoOfBranches" />,
    dataIndex: 'NoOfBranches',
    key: 'NoOfBranches',
    width: 150,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="GstNo" />,
    dataIndex: 'GstNo',
    key: 'GstNo',
    width: 170,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="MobileNo" />,
    dataIndex: 'MobileNo',
    key: 'MobileNo',
    width: 120,
    render: (value: string) => value,
  },
  {
    title: <HeaderCell title="Email" />,
    dataIndex: 'Email',
    key: 'Email',
    width: 200,
    render: (value: string) => value.toLowerCase(),
  },

  {
    title: <HeaderCell title="City Name" />,
    dataIndex: 'CityName',
    key: 'CityName',
    width: 120,
    render: (value: string) => value,
  },

  {
    title: <HeaderCell title="PointOfContact" />,
    dataIndex: 'PointOfContact',
    key: 'PointOfContact',
    width: 150,
    render: (PointOfContact: string) => PointOfContact,
  },
  {
    title: (
      <HeaderCell
        title="Start Date"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'StartDate'}
        descending={sortConfig?.direction === 'desc' && sortConfig?.key === 'StartDate'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('StartDate'),
    dataIndex: 'StartDate',
    key: 'StartDate',
    width: 120,
    render: (value: Date) => <DateCell date={value} time={false} />,
  },
  {
    title: (
      <HeaderCell
        title="End Date"
        sortable
        ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'EndDate'}
        descending={sortConfig?.direction === 'desc' && sortConfig?.key === 'EndDate'}
      />
    ),
    onHeaderCell: () => onHeaderCellClick('EndDate'),
    dataIndex: 'EndDate',
    key: 'EndDate',
    width: 120,
    render: (value: Date) => <DateCell date={value} time={false} />,
  },
  {
    title: <HeaderCell title="CreatedBy" />,
    dataIndex: 'CreatedBy',
    key: 'CreatedBy',
    width: 150,
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
    width: 170,
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
    width: 170,
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
