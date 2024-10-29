import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import WelcomePage from 'pages/welcom-page';
import useMenus from 'hooks/use-menu';
import DrawerButton from 'common/drawer-button';
import MenuForm from './menu-form';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './menu-table-columns';

export const metadata = {
  ...metaObject('Menu Table'),
};

const options = {
  CreatedOn: true,
  IsActive: true,
};

const pageHeader = {
  title: 'Menu List',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'List',
    },
    {
      name: 'Menu',
    },
  ],
};

export default function MenuListPage() {
  const { allMenus, listLoading } = useMenus({ list: true });

  if (listLoading) {
    return <Spinner />;
  }

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <DrawerButton title="Create New Menu" customSize="540px">
          <MenuForm />
        </DrawerButton>
      </TableLayout>
      {allMenus.length > 0 ? (
        <CommonTable
          getColumns={getColumns}
          scrollx={1400}
          options={options}
          fileName="Menu_List"
          header="Id,MenuName,Path,IsActive,
          CreatedOn"
          data={allMenus}
        />
      ) : (
        <WelcomePage />
      )}
    </>
  );
}
