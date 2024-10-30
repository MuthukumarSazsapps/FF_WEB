import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import WelcomePage from 'pages/welcom-page';
import DrawerButton from 'common/drawer-button';
import useShowRooms from 'hooks/use-showroom';
import ShowRoomForm from './showroom-form';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './showroom-columns';

export const metadata = {
  ...metaObject('Enhanced Table'),
};

const options = {
  CreatedOn: true,
  IsActive: true,
  SubscriberCity: true,
};
const pageHeader = {
  title: 'ShowRooms List',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'List',
    },
    {
      name: 'ShowRooms',
    },
  ],
};

export default function ShowRoomListPage() {
  const { allShowRooms, listLoading } = useShowRooms({ list: true });

  if (listLoading) {
    return <Spinner />;
  }

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <DrawerButton customSize="540px" title="Create New ShowRoom">
          <ShowRoomForm />
        </DrawerButton>
      </TableLayout>
      {allShowRooms.length > 0 ? (
        <CommonTable
          getColumns={getColumns}
          scrollx={1100}
          options={options}
          fileName="ShowRooms"
          header="Id,SubscriberName,ShortName,NoOfBranches,Email,MobileNo,UserName,LandLineNo,Address1,Address2,LandMark,GstNo,CityId,IsActive,PointOfContact,CreatedOn,StartDate,EndDate"
          data={allShowRooms}
        />
      ) : (
        <WelcomePage />
      )}
    </>
  );
}
