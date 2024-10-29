import TableLayout from 'common/table & form/table-layout';
import { metaObject } from 'config/site.config';
import Spinner from 'common/spinner';
import useSubscribers from 'hooks/use-subscribers';
import WelcomePage from 'pages/welcom-page';
import DrawerButton from 'common/drawer-button';
import SubscriberForm from './subscriber-form';
import CommonTable from 'common/table & form/common-table';
import { getColumns } from './subscriber-columns';

export const metadata = {
  ...metaObject('Enhanced Table'),
};

const pageHeader = {
  title: 'Subscribers List',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'List',
    },
    {
      name: 'Subscribers',
    },
  ],
};

const options = {
  CreatedOn: true,
  EndDate: true,
  IsActive: true,
  CityId: true,
};
export default function SubscriberListPage() {
  const { allSubscribers, listLoading } = useSubscribers({ list: true });

  if (listLoading) {
    return <Spinner />;
  }

  return (
    <>
      <TableLayout title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <DrawerButton title="Create New Subscriber">
          <SubscriberForm />
        </DrawerButton>
      </TableLayout>
      {allSubscribers.length > 0 ? (
        <CommonTable
          getColumns={getColumns}
          options={options}
          scrollx={2800}
          fileName="Subscribers_List"
          header="Id,SubscriberName,ShortName,NoOfBranches,Email,MobileNo,UserName,LandLineNo,Address1,Address2,LandMark,GstNo,CityId,IsActive,PointOfContact,CreatedOn,StartDate,EndDate"
          data={allSubscribers}
        />
      ) : (
        <WelcomePage />
      )}
    </>
  );
}
