import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import WelcomePage from 'pages/welcom-page';
import DrawerButton from 'common/drawer-button';
import BranchForm from './branch-form';
import useBranches from 'hooks/use-branch';
import useUsers from 'hooks/use-users';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './branch-columns';

export const metadata = {
  ...metaObject('Enhanced Table'),
};

const options = {
  CreatedOn: true,
  IsActive: true,
};
const pageHeader = {
  title: 'Branches List',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'List',
    },
    {
      name: 'Branches',
    },
  ],
};

export default function BranchListPage() {
  const { allBranches, listLoading } = useBranches({ list: true });
  const { loginUser } = useUsers();

  if (listLoading) {
    return <Spinner />;
  }

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {allBranches.length < loginUser.NoOfBranches && (
          <DrawerButton title="Create New Branch">
            <BranchForm />
          </DrawerButton>
        )}
      </TableLayout>
      {allBranches.length > 0 ? (
        <CommonTable
          getColumns={getColumns}
          scrollx={1600}
          options={options}
          fileName="Branches"
          header="Id,SubscriberName,ShortName,NoOfBranches,Email,MobileNo,UserName,LandLineNo,Address1,Address2,LandMark,GstNo,CityId,IsActive,PointOfContact,CreatedOn,StartDate,EndDate"
          data={allBranches}
        />
      ) : (
        <WelcomePage />
      )}
    </>
  );
}
