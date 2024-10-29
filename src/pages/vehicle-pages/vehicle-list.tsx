import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import WelcomePage from 'pages/welcom-page';
import DrawerButton from 'common/drawer-button';
import VehicleForm from './vehicle-form';
import useVehicles from 'hooks/use-vehicle';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './vehicle-columns';

export const metadata = {
  ...metaObject('Enhanced Table'),
};

const options = {
  CreatedOn: true,
  IsActive: true,
};

const pageHeader = {
  title: 'Vehicles List',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'List',
    },
    {
      name: 'Vehicles',
    },
  ],
};

export default function VehicleListPage() {
  const { allVehicles, listLoading } = useVehicles({ list: true });

  if (listLoading) {
    return <Spinner />;
  }

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <DrawerButton customSize="540px" title="Create New Vehicle">
          <VehicleForm />
        </DrawerButton>
      </TableLayout>
      {allVehicles.length > 0 ? (
        <CommonTable
          getColumns={getColumns}
          scrollx={1300}
          options={options}
          fileName="Vehicles"
          header="Id,SubscriberName,ShortName,NoOfBranches,Email,MobileNo,UserName,LandLineNo,Address1,Address2,LandMark,GstNo,CityId,IsActive,PointOfContact,CreatedOn,StartDate,EndDate"
          data={allVehicles}
        />
      ) : (
        <WelcomePage />
      )}
    </>
  );
}
