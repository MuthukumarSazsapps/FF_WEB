// import TableLayout from 'common/table & form/table-layout';
// import { metaObject } from 'config/site.config';
// import Spinner from 'common/spinner';
// import WelcomePage from 'pages/welcom-page';
// import useSubMenus from 'hooks/use-submenu';
// import SupplierForm from './Supplier-form';
// import DrawerButton from 'common/drawer-button';
// import CommonTable from 'common/table & form/common-table';
// import { getColumns } from './submenu-table-columns';

// export const metadata = {
//   ...metaObject('SubMenu Table'),
// };

// const options = {
//   CreatedOn: true,
//   IsActive: true,
// };

// const pageHeader = {
//   title: 'SubMenu List',
//   breadcrumb: [
//     {
//       href: '/',
//       name: 'Home',
//     },
//     {
//       name: 'List',
//     },
//     {
//       name: 'SubMenu',
//     },
//   ],
// };

// export default function SubMenuListPage() {
//   const { allSubMenus, listLoading } = useSubMenus({ list: true });
//   if (listLoading) {
//     return <Spinner />;
//   }

//   return (
//     <>
//       <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
//         <DrawerButton title="Create New SubMenu" customSize="540px">
//           <SubMenuForm />
//         </DrawerButton>
//       </TableLayout>
//       {allSubMenus.length > 0 ? (
//         <CommonTable
//           getColumns={getColumns}
//           scrollx={1200}
//           options={options}
//           fileName="SubMenu_List"
//           header="Id,SubMenuName,MenuName,Path,IsActive,CreatedOn"
//           data={allSubMenus}
//         />
//       ) : (
//         <WelcomePage />
//       )}
//     </>
//   );
// }
