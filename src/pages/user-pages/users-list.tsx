import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import WelcomePage from 'pages/welcom-page';
import useUsers from 'hooks/use-users';
import DrawerButton from 'common/drawer-button';
import UserForm from './user-form';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './user-table-columns';

export const metadata = {
  ...metaObject('Users Table'),
};

const options = {
  CreatedOn: true,
  IsActive: true,
  CityId: true,
};

const pageHeader = {
  title: 'Users List',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'List',
    },
    {
      name: 'Users',
    },
  ],
};

export default function UsersListPage() {
  const { allUsers, listLoading } = useUsers({ list: true });

  if (listLoading) {
    return <Spinner />;
  }

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <DrawerButton title="Create New User" customSize="1080px">
          <UserForm />
        </DrawerButton>
      </TableLayout>
      {allUsers.length > 0 ? (
        <CommonTable
          getColumns={getColumns}
          scrollx={1500}
          options={options}
          fileName="Users"
          header="Id,UserId,DisplayName,Email,MobileNo,LandLineNo,Address1,Address2,LandMark,CreatedBy,CreatedOn,ModifiedBy,ModifiedOn,IsActive"
          data={allUsers}
        />
      ) : (
        <WelcomePage />
      )}
    </>
  );
}
