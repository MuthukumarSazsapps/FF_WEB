'use client';
import { Text } from 'rizzui';
import { Badge } from 'rizzui';
import { HeaderCell } from 'common/table';
import { useNavigate } from 'react-router-dom';
import { PiEyeBold } from 'react-icons/pi';

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

export const getColumns = ({ sortConfig, onHeaderCellClick, data }: Columns) => {
  const navigate = useNavigate();

  return [
    {
      title: <HeaderCell title="View" />,
      dataIndex: 'Id',
      key: 'id',
      width: 20,
      render: (_: string, row: any) => (
        <PiEyeBold
          onClick={() => navigate(`/customer/due-view/${row.LoanId}`)}
          className="me-2 h-[18px] w-[18px] ml-2 text-gray-500"
        />
      ),
    },
    {
      title: <HeaderCell title="No" />,
      dataIndex: 'Id',
      key: 'id',
      width: 50,
      render: (_: string, row: Loan, index: number) => <span>{index + 1}</span>,
    },
    {
      title: <HeaderCell title="LoanId" />,
      dataIndex: 'LoanId',
      key: 'LoanId',
      width: 130,
      render: (value: string) => value,
    },
    {
      title: <HeaderCell title="CustomerName" />,
      dataIndex: 'CustomerName',
      key: 'CustomerName',
      width: 100,
      render: (value: string) => value,
    },
    {
      title: <HeaderCell title="MobileNo" />,
      dataIndex: 'CustomerPhoneNo',
      key: 'CustomerPhoneNo',
      width: 100,
      render: (value: string) => value,
    },
    {
      title: <HeaderCell title="Vehicle Number" />,
      dataIndex: 'RegisterNumber',
      key: 'RegisterNumber',
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
      title: <HeaderCell title="Due Amount" />,
      dataIndex: 'ActualEmiAmount',
      key: 'ActualEmiAmount',
      width: 100,
      render: (value: string) => value,
    },
    {
      title: <HeaderCell title="PaidDue" />,
      dataIndex: 'PaidDue',
      key: 'PaidDue',
      width: 100,
      render: (_: string, row: any) => `${row.PaidDue} / ${row.Tenure}`,
    },
    {
      title: <HeaderCell title="IsActive" />,
      dataIndex: 'IsActive',
      key: 'IsActive',
      width: 80,
      render: (value: boolean) => getStatusBadge(value),
    },
  ];
};
