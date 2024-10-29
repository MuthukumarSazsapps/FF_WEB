// 'use client';
// import { Text } from 'rizzui';
// import { Badge } from 'rizzui';
// import { HeaderCell } from 'common/table';
// import AvatarCard from 'common/avatar-card';
// import DateCell from 'common/date-cell';
// import SubMenuForm from './submenu-form';
// import { UpdateDrawer } from 'common/table & form/update-drawer';

// export type SubMenu = {
//   Id: string;
//   Icon: string;
//   SubMenuName: string;
//   SubMenuId: string;
//   MenuId: string;
//   Path: string;
//   IsActive: boolean;
//   CreatedOn: Date;
// };

// function getStatusBadge(isActive: boolean) {
//   switch (isActive) {
//     case false:
//       return (
//         <div className="flex items-center">
//           <Badge color="warning" renderAsDot />
//           <Text className="ms-2 font-medium text-orange-dark">inactive</Text>
//         </div>
//       );
//     case true:
//       return (
//         <div className="flex items-center">
//           <Badge color="success" renderAsDot />
//           <Text className="ms-2 font-medium text-green-dark">active</Text>
//         </div>
//       );
//   }
// }

// type Columns = {
//   data: any[];
//   sortConfig?: any;
//   handleSelectAll: any;
//   checkedItems: string[];
//   onHeaderCellClick: (value: string) => void;
//   onChecked?: (id: string) => void;
// };

// export const getColumns = ({ sortConfig, onHeaderCellClick, data }: Columns) => [
//   {
//     title: <HeaderCell title="No" />,
//     dataIndex: 'Id',
//     key: 'id',
//     width: 20,
//     render: (_: string, row: SubMenu, index: number) => <span>{index + 1}</span>,
//   },
//   {
//     title: <HeaderCell title="SubMenu Name" />,
//     dataIndex: 'SubMenuName',
//     key: 'SubMenuName',
//     width: 200,
//     hidden: 'SubMenuName',

//     render: (_: string, row: SubMenu) => (
//       <div className="flex items-center">
//         <AvatarCard src={row.Icon} name={row.SubMenuName} />
//         <UpdateDrawer title="Update SubMenu" customSize="540px">
//           <SubMenuForm data={row} />
//         </UpdateDrawer>
//       </div>
//     ),
//   },
//   {
//     title: <HeaderCell title="Menu Name" />,
//     dataIndex: 'MenuName',
//     key: 'MenuName',
//     width: 200,
//     render: (value: string) => value,
//   },
//   {
//     title: <HeaderCell title="Path" />,
//     dataIndex: 'Path',
//     key: 'Path',
//     width: 200,
//     render: (value: string) => value,
//   },
//   {
//     title: <HeaderCell title="SubMenuOrder" />,
//     dataIndex: 'SubMenuOrder',
//     key: 'SubMenuOrder',
//     width: 100,
//     render: (value: string) => value,
//   },
//   {
//     title: <HeaderCell title="CreatedBy" />,
//     dataIndex: 'CreatedBy',
//     key: 'CreatedBy',
//     width: 150,
//     render: (value: string) => (value ? value : '----'),
//   },
//   {
//     title: (
//       <HeaderCell
//         title="Created Date"
//         sortable
//         ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'CreatedOn'}
//         descending={sortConfig?.direction === 'desc' && sortConfig?.key === 'CreatedOn'}
//       />
//     ),
//     onHeaderCell: () => onHeaderCellClick('CreatedOn'),
//     dataIndex: 'CreatedOn',
//     key: 'CreatedOn',
//     width: 150,
//     render: (value: Date) => <DateCell date={value} />,
//   },
//   {
//     title: <HeaderCell title="ModifiedBy" />,
//     dataIndex: 'ModifiedBy',
//     key: 'ModifiedBy',
//     width: 150,
//     render: (value: string) => (value ? value : '----'),
//   },
//   {
//     title: (
//       <HeaderCell
//         title="Modified Date"
//         sortable
//         ascending={sortConfig?.direction === 'asc' && sortConfig?.key === 'ModifiedOn'}
//         descending={sortConfig?.direction === 'desc' && sortConfig?.key === 'ModifiedOn'}
//       />
//     ),
//     onHeaderCell: () => onHeaderCellClick('ModifiedOn'),
//     dataIndex: 'ModifiedOn',
//     key: 'ModifiedOn',
//     width: 150,
//     render: (value: Date) => (value ? <DateCell date={value} /> : '----'),
//   },
//   {
//     title: <HeaderCell title="IsActive" />,
//     dataIndex: 'IsActive',
//     key: 'IsActive',
//     width: 80,
//     render: (value: boolean) => getStatusBadge(value),
//   },
// ];
